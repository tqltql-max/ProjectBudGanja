'use strict';

function mapRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    growId: row.grow_id,
    growName: row.grow_name || '',
    status: row.status || 'pending',
    title: row.title || '',
    excerpt: row.excerpt || '',
    contentMd: row.content_md || '',
    reviewerNote: row.reviewer_note || '',
    postSlug: row.post_slug || '',
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at || null
  };
}

async function insertCultivoSubmission(db, submission) {
  await db.execute({
    sql: `INSERT INTO cultivo_submissions
          (id, user_id, grow_id, grow_name, status, title, excerpt, content_md, reviewer_note, post_slug, submitted_at, reviewed_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      submission.id,
      submission.userId,
      submission.growId,
      submission.growName || '',
      submission.status || 'pending',
      submission.title || '',
      submission.excerpt || '',
      submission.contentMd || '',
      submission.reviewerNote || '',
      submission.postSlug || '',
      submission.submittedAt,
      submission.reviewedAt || null
    ]
  });
  return submission;
}

async function getCultivoSubmissionById(db, id) {
  const result = await db.execute({
    sql: 'SELECT * FROM cultivo_submissions WHERE id = ?',
    args: [id]
  });
  return mapRow(result.rows[0]);
}

async function findActiveSubmissionForGrow(db, userId, growId) {
  const result = await db.execute({
    sql: `SELECT * FROM cultivo_submissions
          WHERE user_id = ? AND grow_id = ? AND status IN ('pending', 'approved')
          ORDER BY submitted_at DESC LIMIT 1`,
    args: [userId, growId]
  });
  return mapRow(result.rows[0]);
}

async function listCultivoSubmissionsByUser(db, userId, growId) {
  let sql = 'SELECT * FROM cultivo_submissions WHERE user_id = ?';
  const args = [userId];
  if (growId) {
    sql += ' AND grow_id = ?';
    args.push(growId);
  }
  sql += ' ORDER BY submitted_at DESC';
  const result = await db.execute({ sql, args });
  return result.rows.map(mapRow);
}

async function listCultivoSubmissionsAdmin(db, status) {
  let sql = 'SELECT * FROM cultivo_submissions';
  const args = [];
  if (status) {
    sql += ' WHERE status = ?';
    args.push(status);
  }
  sql += ' ORDER BY submitted_at DESC';
  const result = await db.execute({ sql, args });
  return result.rows.map(mapRow);
}

async function updateCultivoSubmission(db, id, patch) {
  const fields = [];
  const args = [];
  const allowed = {
    status: 'status',
    title: 'title',
    excerpt: 'excerpt',
    contentMd: 'content_md',
    reviewerNote: 'reviewer_note',
    postSlug: 'post_slug',
    reviewedAt: 'reviewed_at'
  };
  Object.keys(allowed).forEach((key) => {
    if (patch[key] !== undefined) {
      fields.push(allowed[key] + ' = ?');
      args.push(patch[key]);
    }
  });
  if (!fields.length) return getCultivoSubmissionById(db, id);
  args.push(id);
  await db.execute({
    sql: 'UPDATE cultivo_submissions SET ' + fields.join(', ') + ' WHERE id = ?',
    args
  });
  return getCultivoSubmissionById(db, id);
}

module.exports = {
  insertCultivoSubmission,
  getCultivoSubmissionById,
  findActiveSubmissionForGrow,
  listCultivoSubmissionsByUser,
  listCultivoSubmissionsAdmin,
  updateCultivoSubmission
};
