'use strict';

function parsePayload(row) {
  try {
    return JSON.parse(row.payload_json || '{}');
  } catch (e) {
    return {};
  }
}

function mapEmailRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    template: row.template,
    toEmail: row.to_email,
    toName: row.to_name || '',
    subject: row.subject || '',
    payload: parsePayload(row),
    status: row.status,
    idempotencyKey: row.idempotency_key || '',
    attempts: Number(row.attempts) || 0,
    lastError: row.last_error || '',
    createdAt: row.created_at,
    sentAt: row.sent_at
  };
}

async function insertEmailJob(db, job) {
  await db.execute({
    sql: `INSERT INTO email_outbox (id, template, to_email, to_name, subject, payload_json, status, idempotency_key, attempts, last_error, created_at, sent_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, '', ?, NULL)`,
    args: [
      job.id,
      job.template,
      job.toEmail,
      job.toName || '',
      job.subject || '',
      JSON.stringify(job.payload || {}),
      job.status || 'pending',
      job.idempotencyKey || null,
      job.createdAt || new Date().toISOString()
    ]
  });
  return job;
}

async function findEmailByIdempotencyKey(db, key) {
  if (!key) return null;
  const result = await db.execute({
    sql: 'SELECT * FROM email_outbox WHERE idempotency_key = ? LIMIT 1',
    args: [key]
  });
  return mapEmailRow(result.rows[0]);
}

async function listPendingEmails(db, limit) {
  const max = Math.max(1, Math.min(Number(limit) || 20, 100));
  const result = await db.execute({
    sql: `SELECT * FROM email_outbox WHERE status = 'pending' ORDER BY created_at ASC LIMIT ?`,
    args: [max]
  });
  return result.rows.map(mapEmailRow);
}

async function listRecentEmails(db, limit, status) {
  const max = Math.max(1, Math.min(Number(limit) || 50, 200));
  const args = [max];
  let sql = 'SELECT * FROM email_outbox';
  if (status) {
    sql += ' WHERE status = ?';
    args.unshift(status);
  }
  sql += ' ORDER BY created_at DESC LIMIT ?';
  const result = await db.execute({ sql, args });
  return result.rows.map(mapEmailRow);
}

async function markEmailSent(db, id) {
  const now = new Date().toISOString();
  await db.execute({
    sql: `UPDATE email_outbox SET status = 'sent', sent_at = ?, last_error = '' WHERE id = ?`,
    args: [now, id]
  });
}

async function markEmailFailed(db, id, error, attempts) {
  const nextAttempts = Number(attempts) + 1;
  const status = nextAttempts >= 5 ? 'failed' : 'pending';
  await db.execute({
    sql: `UPDATE email_outbox SET status = ?, attempts = ?, last_error = ? WHERE id = ?`,
    args: [status, nextAttempts, String(error || '').slice(0, 500), id]
  });
  return status;
}

async function getEmailQueueStats(db) {
  const result = await db.execute({
    sql: `SELECT status, COUNT(*) AS c FROM email_outbox GROUP BY status`
  });
  const stats = { pending: 0, sent: 0, failed: 0, skipped: 0, total: 0 };
  for (const row of result.rows) {
    const key = row.status || 'pending';
    stats[key] = Number(row.c) || 0;
    stats.total += Number(row.c) || 0;
  }
  return stats;
}

module.exports = {
  insertEmailJob,
  findEmailByIdempotencyKey,
  listPendingEmails,
  listRecentEmails,
  markEmailSent,
  markEmailFailed,
  getEmailQueueStats
};
