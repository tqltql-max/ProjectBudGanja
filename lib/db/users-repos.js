'use strict';

function mapUserRow(row) {
  if (!row) return null;
  let profile = {};
  try {
    profile = JSON.parse(row.profile_json || '{}');
  } catch (e) {
    profile = {};
  }
  return {
    id: row.id,
    email: row.email || '',
    name: row.name || '',
    picture: row.picture || '',
    provider: row.provider || 'google',
    isAdmin: !!(row.is_admin),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    profile: profile
  };
}

async function listUsersAdmin(db, query) {
  const q = String(query || '').trim().toLowerCase();
  let sql = `SELECT u.*,
    (SELECT COUNT(*) FROM cultivo_grows g WHERE g.user_id = u.id) AS grow_count,
    (SELECT COUNT(*) FROM cultivo_entries e WHERE e.user_id = u.id) AS entry_count,
    (SELECT COUNT(*) FROM cultivo_submissions s WHERE s.user_id = u.id) AS submission_count,
    (SELECT COUNT(*) FROM cultivo_plan_tasks t WHERE t.user_id = u.id) AS plan_task_count
    FROM users u`;
  const args = [];
  if (q) {
    sql += ` WHERE LOWER(u.email) LIKE ? OR LOWER(u.name) LIKE ? OR LOWER(u.id) LIKE ?`;
    const like = '%' + q + '%';
    args.push(like, like, like);
  }
  sql += ' ORDER BY u.created_at DESC';
  const result = await db.execute({ sql, args });
  return result.rows.map((row) => {
    const user = mapUserRow(row);
    return Object.assign(user, {
      growCount: Number(row.grow_count) || 0,
      entryCount: Number(row.entry_count) || 0,
      submissionCount: Number(row.submission_count) || 0,
      planTaskCount: Number(row.plan_task_count) || 0
    });
  });
}

async function getUserByIdAdmin(db, userId) {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE id = ?',
    args: [userId]
  });
  return mapUserRow(result.rows[0]);
}

async function setUserAdminFlag(db, userId, isAdmin) {
  const now = new Date().toISOString();
  await db.execute({
    sql: 'UPDATE users SET is_admin = ?, updated_at = ? WHERE id = ?',
    args: [isAdmin ? 1 : 0, now, userId]
  });
  return getUserByIdAdmin(db, userId);
}

async function countAdminUsers(db) {
  const result = await db.execute({
    sql: 'SELECT COUNT(*) AS c FROM users WHERE is_admin = 1'
  });
  return Number(result.rows[0] && result.rows[0].c) || 0;
}

async function listUserGrowsSummary(db, userId) {
  const result = await db.execute({
    sql: `SELECT g.id, g.name, g.phase, g.species, g.planted_at, g.plant_count, g.created_at,
          (SELECT COUNT(*) FROM cultivo_entries e WHERE e.grow_id = g.id) AS entry_count
          FROM cultivo_grows g WHERE g.user_id = ?
          ORDER BY g.updated_at DESC`,
    args: [userId]
  });
  return result.rows.map((row) => ({
    id: row.id,
    name: row.name || '',
    phase: row.phase || '',
    species: row.species || '',
    plantedAt: row.planted_at,
    plantCount: row.plant_count != null ? row.plant_count : 1,
    createdAt: row.created_at,
    entryCount: Number(row.entry_count) || 0
  }));
}

async function listUserSubmissionsSummary(db, userId) {
  const result = await db.execute({
    sql: `SELECT id, grow_id, grow_name, status, title, post_slug, submitted_at, reviewed_at
          FROM cultivo_submissions WHERE user_id = ? ORDER BY submitted_at DESC`,
    args: [userId]
  });
  return result.rows.map((row) => ({
    id: row.id,
    growId: row.grow_id,
    growName: row.grow_name || '',
    status: row.status,
    title: row.title || '',
    postSlug: row.post_slug || '',
    postUrl: row.post_slug ? '/posts/post-' + row.post_slug + '.html' : '',
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at
  }));
}

async function listSorteioEntriesByEmail(db, email) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) return [];
  const result = await db.execute({
    sql: `SELECT id, nome, email, premio_label, cidade, estado, created_at
          FROM sorteio_entries WHERE LOWER(email) = ? ORDER BY created_at DESC LIMIT 50`,
    args: [normalized]
  });
  return result.rows.map((row) => ({
    id: row.id,
    nome: row.nome || '',
    email: row.email || '',
    premioLabel: row.premio_label || '',
    cidade: row.cidade || '',
    estado: row.estado || '',
    createdAt: row.created_at
  }));
}

async function listLojaOrdersByEmail(db, email) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) return [];
  const result = await db.execute({
    sql: `SELECT id, product_title, package_label, nome, email, cidade, estado, status, created_at
          FROM loja_orders WHERE LOWER(email) = ? ORDER BY created_at DESC LIMIT 50`,
    args: [normalized]
  });
  return result.rows.map((row) => ({
    id: row.id,
    productTitle: row.product_title || '',
    packageLabel: row.package_label || '',
    nome: row.nome || '',
    email: row.email || '',
    cidade: row.cidade || '',
    estado: row.estado || '',
    status: row.status || '',
    createdAt: row.created_at
  }));
}

async function getSorteioAlertForUser(db, userId) {
  const result = await db.execute({
    sql: 'SELECT user_id, email, name, subscribed_at, active FROM sorteio_alert_subscribers WHERE user_id = ?',
    args: [userId]
  });
  const row = result.rows[0];
  if (!row || row.active === 0) return null;
  return {
    userId: row.user_id,
    email: row.email || '',
    name: row.name || '',
    subscribedAt: row.subscribed_at
  };
}

module.exports = {
  mapUserRow,
  listUsersAdmin,
  getUserByIdAdmin,
  setUserAdminFlag,
  countAdminUsers,
  listUserGrowsSummary,
  listUserSubmissionsSummary,
  listSorteioEntriesByEmail,
  listLojaOrdersByEmail,
  getSorteioAlertForUser
};
