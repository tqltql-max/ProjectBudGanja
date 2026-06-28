'use strict';

const fs = require('fs');
const path = require('path');

function readJsonFile(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return fallback;
  }
}

function userToRow(user) {
  return {
    id: String(user.id),
    email: String(user.email || ''),
    name: String(user.name || ''),
    picture: String(user.picture || ''),
    provider: String(user.provider || 'google'),
    profile_json: JSON.stringify(user.profile || {}),
    created_at: user.createdAt || new Date().toISOString(),
    updated_at: user.updatedAt || new Date().toISOString()
  };
}

async function importUsersFromJson(db, root) {
  const usersPath = path.join(root, 'content', 'users.json');
  const users = readJsonFile(usersPath, {});
  const entries = Object.values(users || {});
  if (!entries.length) return 0;

  for (const user of entries) {
    if (!user || !user.id) continue;
    const row = userToRow(user);
    await db.execute({
      sql: `INSERT INTO users (id, email, name, picture, provider, profile_json, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO NOTHING`,
      args: [row.id, row.email, row.name, row.picture, row.provider, row.profile_json, row.created_at, row.updated_at]
    });
  }
  return entries.length;
}

async function importSessionsFromJson(db, root, table, fileName, mapToRow) {
  const filePath = path.join(root, 'content', fileName);
  const raw = readJsonFile(filePath, {});
  const entries = Object.entries(raw || {});
  if (!entries.length) return 0;

  for (const [key, value] of entries) {
    const row = mapToRow(key, value);
    if (!row) continue;
    await db.execute({
      sql: row.sql,
      args: row.args
    });
  }
  return entries.length;
}

async function importKvFromJson(db, root, key, relativePath, fallback) {
  const filePath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(root, relativePath);
  const value = readJsonFile(filePath, fallback);
  if (value == null) return false;
  await db.execute({
    sql: `INSERT INTO kv_store (key, value, updated_at) VALUES (?, ?, ?)
          ON CONFLICT(key) DO NOTHING`,
    args: [key, JSON.stringify(value), new Date().toISOString()]
  });
  return true;
}

async function migrateFromJsonIfEmpty(db, root) {
  const userCount = await tableCount(db, 'users');

  const report = { users: 0, userSessions: 0, adminSessions: 0, oauthStates: 0 };

  if (userCount === 0) {
    report.users = await importUsersFromJson(db, root);
  }

  const sessionCount = await db.execute('SELECT COUNT(*) AS c FROM user_sessions');
  if (Number(sessionCount.rows[0] && sessionCount.rows[0].c) === 0) {
    report.userSessions = await importSessionsFromJson(db, root, 'user_sessions', 'user-sessions.json', (token, session) => {
      if (!session || !session.userId) return null;
      return {
        sql: 'INSERT INTO user_sessions (token, user_id, expires_at) VALUES (?, ?, ?) ON CONFLICT(token) DO NOTHING',
        args: [token, String(session.userId), Number(session.expiresAt) || 0]
      };
    });
  }

  const adminCount = await db.execute('SELECT COUNT(*) AS c FROM admin_sessions');
  if (Number(adminCount.rows[0] && adminCount.rows[0].c) === 0) {
    report.adminSessions = await importSessionsFromJson(db, root, 'admin_sessions', 'sessions.json', (token, session) => {
      if (!session || !session.username) return null;
      return {
        sql: 'INSERT INTO admin_sessions (token, username, expires_at) VALUES (?, ?, ?) ON CONFLICT(token) DO NOTHING',
        args: [token, String(session.username), Number(session.expiresAt) || 0]
      };
    });
  }

  const oauthCount = await db.execute('SELECT COUNT(*) AS c FROM oauth_states');
  if (Number(oauthCount.rows[0] && oauthCount.rows[0].c) === 0) {
    report.oauthStates = await importSessionsFromJson(db, root, 'oauth_states', 'oauth-states.json', (state, entry) => {
      if (!entry) return null;
      return {
        sql: 'INSERT INTO oauth_states (state, return_to, created_at, expires_at) VALUES (?, ?, ?, ?) ON CONFLICT(state) DO NOTHING',
        args: [
          state,
          String(entry.returnTo || '/perfil.html'),
          Number(entry.createdAt) || Date.now(),
          Number(entry.expiresAt) || Date.now()
        ]
      };
    });
  }

  return report;
}

async function tableCount(db, table) {
  const r = await db.execute('SELECT COUNT(*) AS c FROM ' + table);
  return Number(r.rows[0] && r.rows[0].c) || 0;
}

module.exports = {
  migrateFromJsonIfEmpty,
  readJsonFile,
  userToRow
};
