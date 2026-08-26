'use strict';

function mapRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    status: row.status || 'pending',
    characterName: row.character_name || '',
    role: row.role || '',
    youtubeUrl: row.youtube_url || '',
    youtubeHandle: row.youtube_handle || '',
    kickUrl: row.kick_url || '',
    kickHandle: row.kick_handle || '',
    twitchUrl: row.twitch_url || '',
    twitchHandle: row.twitch_handle || '',
    contactName: row.contact_name || '',
    contactEmail: row.contact_email || '',
    notes: row.notes || '',
    slug: row.slug || '',
    reviewerNote: row.reviewer_note || '',
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at || null
  };
}

async function insertGtarpApplication(db, row) {
  await db.execute({
    sql: `INSERT INTO gtarp_streamer_applications
          (id, status, character_name, role, youtube_url, youtube_handle, kick_url, kick_handle,
           twitch_url, twitch_handle, contact_name, contact_email, notes, slug, reviewer_note,
           submitted_at, reviewed_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      row.id,
      row.status || 'pending',
      row.characterName || '',
      row.role || '',
      row.youtubeUrl || '',
      row.youtubeHandle || '',
      row.kickUrl || '',
      row.kickHandle || '',
      row.twitchUrl || '',
      row.twitchHandle || '',
      row.contactName || '',
      row.contactEmail || '',
      row.notes || '',
      row.slug || '',
      row.reviewerNote || '',
      row.submittedAt,
      row.reviewedAt || null
    ]
  });
  return row;
}

async function getGtarpApplicationById(db, id) {
  const result = await db.execute({
    sql: 'SELECT * FROM gtarp_streamer_applications WHERE id = ?',
    args: [id]
  });
  return mapRow(result.rows[0]);
}

async function findGtarpApplicationDuplicate(db, youtubeUrl, kickUrl) {
  const yt = String(youtubeUrl || '').trim().toLowerCase();
  const kick = String(kickUrl || '').trim().toLowerCase();
  if (!yt && !kick) return null;
  const result = await db.execute({
    sql: `SELECT * FROM gtarp_streamer_applications
          WHERE status IN ('pending', 'approved')
            AND (
              (? <> '' AND lower(youtube_url) = ?)
              OR (? <> '' AND lower(kick_url) = ?)
            )
          ORDER BY submitted_at DESC LIMIT 1`,
    args: [yt, yt, kick, kick]
  });
  return mapRow(result.rows[0]);
}

async function listGtarpApplications(db, status) {
  let sql = 'SELECT * FROM gtarp_streamer_applications';
  const args = [];
  if (status) {
    sql += ' WHERE status = ?';
    args.push(status);
  }
  sql += ' ORDER BY submitted_at DESC';
  const result = await db.execute({ sql, args });
  return result.rows.map(mapRow);
}

async function updateGtarpApplication(db, id, patch) {
  const allowed = {
    status: 'status',
    characterName: 'character_name',
    role: 'role',
    youtubeUrl: 'youtube_url',
    youtubeHandle: 'youtube_handle',
    kickUrl: 'kick_url',
    kickHandle: 'kick_handle',
    twitchUrl: 'twitch_url',
    twitchHandle: 'twitch_handle',
    notes: 'notes',
    slug: 'slug',
    reviewerNote: 'reviewer_note',
    reviewedAt: 'reviewed_at'
  };
  const fields = [];
  const args = [];
  Object.keys(allowed).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(patch, key)) {
      fields.push(allowed[key] + ' = ?');
      args.push(patch[key]);
    }
  });
  if (!fields.length) return getGtarpApplicationById(db, id);
  args.push(id);
  await db.execute({
    sql: 'UPDATE gtarp_streamer_applications SET ' + fields.join(', ') + ' WHERE id = ?',
    args
  });
  return getGtarpApplicationById(db, id);
}

module.exports = {
  insertGtarpApplication,
  getGtarpApplicationById,
  findGtarpApplicationDuplicate,
  listGtarpApplications,
  updateGtarpApplication
};
