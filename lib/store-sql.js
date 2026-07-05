'use strict';

const {
  loadPosts,
  savePosts,
  loadPages,
  savePages,
  loadSite,
  saveSite,
  loadGuiaCultivo,
  saveGuiaCultivo,
  loadSorteioConfig,
  saveSorteioConfig,
  loadSorteios,
  saveSorteios,
  loadSorteioAlertSubscribers,
  getSorteioAlertSubscriberByUserId,
  upsertSorteioAlertSubscriber,
  deactivateSorteioAlertSubscriber,
  loadLojaOrders,
  saveLojaOrders,
  loadCalculators,
  loadYoutubeFeed,
  saveYoutubeFeed,
  loadSeriesOptions,
  upsertSeriesOption,
  deleteSeriesOption,
  ensureContentMigrated
} = require('./db/content-repos.js');
const {
  countCultivoGrows,
  loadCultivoState,
  saveCultivoState
} = require('./db/cultivo-repos.js');
const {
  insertCultivoSubmission,
  getCultivoSubmissionById,
  findActiveSubmissionForGrow,
  listCultivoSubmissionsByUser,
  listCultivoSubmissionsAdmin,
  updateCultivoSubmission
} = require('./db/cultivo-submissions-repos.js');
const {
  listUsersAdmin,
  getUserByIdAdmin,
  setUserAdminFlag,
  countAdminUsers,
  listUserGrowsSummary,
  listUserSubmissionsSummary,
  listSorteioEntriesByEmail,
  listLojaOrdersByEmail,
  getSorteioAlertForUser
} = require('./db/users-repos.js');
const { initDatabaseOnce } = require('./db/client.js');
const { migrateFromJsonIfEmpty } = require('./db/migrate-from-json.js');

function rowToUser(row) {
  let profile = {};
  try {
    profile = JSON.parse(row.profile_json || '{}');
  } catch (e) {
    profile = {};
  }
  return {
    id: row.id,
    googleId: row.google_id || '',
    email: row.email,
    name: row.name,
    picture: row.picture,
    provider: row.provider,
    localPasswordHash: row.local_password_hash || '',
    localPasswordUpdatedAt: row.local_password_updated_at || null,
    resetTokenHash: row.reset_token_hash || '',
    resetTokenExpiresAt: row.reset_token_expires_at || null,
    isAdmin: !!(row.is_admin),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    profile: profile
  };
}

async function ensureUserAuthColumns(db) {
  const info = await db.execute("PRAGMA table_info('users')");
  const cols = new Set((info.rows || []).map((row) => String(row.name || '').toLowerCase()));
  const add = async (name, sqlType) => {
    if (cols.has(name.toLowerCase())) return;
    await db.execute('ALTER TABLE users ADD COLUMN ' + name + ' ' + sqlType);
  };
  await add('google_id', "TEXT NOT NULL DEFAULT ''");
  await add('local_password_hash', "TEXT NOT NULL DEFAULT ''");
  await add('local_password_updated_at', 'TEXT');
  await add('reset_token_hash', "TEXT NOT NULL DEFAULT ''");
  await add('reset_token_expires_at', 'TEXT');
  try {
    await db.execute('CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id)');
  } catch (e) {
    // Keep startup resilient for legacy or partially migrated local databases.
  }
}

async function replaceUserSessions(db, sessions) {
  await db.execute('DELETE FROM user_sessions');
  for (const [token, session] of Object.entries(sessions || {})) {
    if (!session || !session.userId) continue;
    await db.execute({
      sql: 'INSERT INTO user_sessions (token, user_id, expires_at) VALUES (?, ?, ?)',
      args: [token, String(session.userId), Number(session.expiresAt) || 0]
    });
  }
}

async function replaceAdminSessions(db, sessions) {
  await db.execute('DELETE FROM admin_sessions');
  for (const [token, session] of Object.entries(sessions || {})) {
    if (!session || !session.username) continue;
    await db.execute({
      sql: 'INSERT INTO admin_sessions (token, username, expires_at) VALUES (?, ?, ?)',
      args: [token, String(session.username), Number(session.expiresAt) || 0]
    });
  }
}

async function replaceOAuthStates(db, states) {
  await db.execute('DELETE FROM oauth_states');
  for (const [state, entry] of Object.entries(states || {})) {
    if (!entry) continue;
    await db.execute({
      sql: 'INSERT INTO oauth_states (state, return_to, created_at, expires_at) VALUES (?, ?, ?, ?)',
      args: [
        state,
        String(entry.returnTo || '/perfil.html'),
        Number(entry.createdAt) || Date.now(),
        Number(entry.expiresAt) || Date.now()
      ]
    });
  }
}

function sessionsFromUserRows(rows) {
  const out = {};
  for (const row of rows) {
    out[row.token] = { userId: row.user_id, expiresAt: Number(row.expires_at) };
  }
  return out;
}

function sessionsFromAdminRows(rows) {
  const out = {};
  for (const row of rows) {
    out[row.token] = { username: row.username, expiresAt: Number(row.expires_at) };
  }
  return out;
}

function statesFromRows(rows) {
  const out = {};
  for (const row of rows) {
    out[row.state] = {
      returnTo: row.return_to,
      createdAt: Number(row.created_at),
      expiresAt: Number(row.expires_at)
    };
  }
  return out;
}

async function createSqlStore(root) {
  const db = await initDatabaseOnce(root);
  await ensureUserAuthColumns(db);
  await migrateFromJsonIfEmpty(db, root);
  await ensureContentMigrated(db, root);

  return {
    backend: 'sql',

    async getPosts() {
      return loadPosts(db);
    },
    async setPosts(posts) {
      await savePosts(db, posts);
    },
    async getPages() {
      return loadPages(db);
    },
    async setPages(pages) {
      await savePages(db, pages);
    },
    async getSite() {
      return loadSite(db);
    },
    async setSite(site) {
      await saveSite(db, site);
    },
    async getCalculators() {
      return loadCalculators(db);
    },
    async getSessions() {
      const result = await db.execute('SELECT token, username, expires_at FROM admin_sessions');
      return sessionsFromAdminRows(result.rows);
    },
    async setSessions(sessions) {
      await replaceAdminSessions(db, sessions);
    },
    async getUserSessions() {
      const result = await db.execute('SELECT token, user_id, expires_at FROM user_sessions');
      return sessionsFromUserRows(result.rows);
    },
    async setUserSessions(sessions) {
      await replaceUserSessions(db, sessions);
    },
    async getUsers() {
      const result = await db.execute(
        'SELECT id, google_id, email, name, picture, provider, local_password_hash, local_password_updated_at, reset_token_hash, reset_token_expires_at, profile_json, is_admin, created_at, updated_at FROM users'
      );
      const users = {};
      for (const row of result.rows) {
        const user = rowToUser(row);
        users[user.id] = user;
      }
      return users;
    },
    async setUsers(users) {
      for (const user of Object.values(users || {})) {
        if (!user || !user.id) continue;
        await db.execute({
          sql: `INSERT INTO users (id, google_id, email, name, picture, provider, local_password_hash, local_password_updated_at, reset_token_hash, reset_token_expires_at, profile_json, is_admin, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                  google_id = excluded.google_id,
                  email = excluded.email,
                  name = excluded.name,
                  picture = excluded.picture,
                  provider = excluded.provider,
                  local_password_hash = excluded.local_password_hash,
                  local_password_updated_at = excluded.local_password_updated_at,
                  reset_token_hash = excluded.reset_token_hash,
                  reset_token_expires_at = excluded.reset_token_expires_at,
                  profile_json = excluded.profile_json,
                  updated_at = excluded.updated_at`,
          args: [
            String(user.id),
            String(user.googleId || ''),
            String(user.email || ''),
            String(user.name || ''),
            String(user.picture || ''),
            String(user.provider || 'google'),
            String(user.localPasswordHash || ''),
            user.localPasswordUpdatedAt || null,
            String(user.resetTokenHash || ''),
            user.resetTokenExpiresAt || null,
            JSON.stringify(user.profile || {}),
            user.isAdmin ? 1 : 0,
            user.createdAt || new Date().toISOString(),
            user.updatedAt || new Date().toISOString()
          ]
        });
      }
    },
    async getOAuthStates() {
      const result = await db.execute(
        'SELECT state, return_to, created_at, expires_at FROM oauth_states'
      );
      return statesFromRows(result.rows);
    },
    async setOAuthStates(states) {
      await replaceOAuthStates(db, states);
    },
    async getSorteios() {
      return loadSorteios(db);
    },
    async setSorteios(entries) {
      await saveSorteios(db, entries);
    },
    async getSorteioConfig() {
      return loadSorteioConfig(db);
    },
    async setSorteioConfig(config) {
      await saveSorteioConfig(db, config);
    },
    async getSorteioAlertSubscribers() {
      return loadSorteioAlertSubscribers(db);
    },
    async getSorteioAlertSubscriber(userId) {
      return getSorteioAlertSubscriberByUserId(db, userId);
    },
    async subscribeSorteioAlert(subscriber) {
      await upsertSorteioAlertSubscriber(db, subscriber);
    },
    async unsubscribeSorteioAlert(userId) {
      await deactivateSorteioAlertSubscriber(db, userId);
    },
    async getLojaOrders() {
      return loadLojaOrders(db);
    },
    async setLojaOrders(orders) {
      await saveLojaOrders(db, orders);
    },
    async getGuiaCultivo() {
      return loadGuiaCultivo(db);
    },
    async setGuiaCultivo(guia) {
      await saveGuiaCultivo(db, guia);
    },
    async getYoutubeFeed() {
      return loadYoutubeFeed(db);
    },
    async setYoutubeFeed(feed) {
      await saveYoutubeFeed(db, feed);
    },
    async countCultivoGrows(userId) {
      return countCultivoGrows(db, userId);
    },
    async getCultivoState(userId) {
      return loadCultivoState(db, userId);
    },
    async setCultivoState(userId, state) {
      return saveCultivoState(db, userId, state);
    },
    async createCultivoSubmission(submission) {
      return insertCultivoSubmission(db, submission);
    },
    async getCultivoSubmissionById(id) {
      return getCultivoSubmissionById(db, id);
    },
    async findActiveCultivoSubmission(userId, growId) {
      return findActiveSubmissionForGrow(db, userId, growId);
    },
    async listCultivoSubmissionsByUser(userId, growId) {
      return listCultivoSubmissionsByUser(db, userId, growId);
    },
    async listCultivoSubmissionsAdmin(status) {
      return listCultivoSubmissionsAdmin(db, status);
    },
    async updateCultivoSubmission(id, patch) {
      return updateCultivoSubmission(db, id, patch);
    },
    async listUsersAdmin(query) {
      return listUsersAdmin(db, query);
    },
    async getUserByIdAdmin(userId) {
      return getUserByIdAdmin(db, userId);
    },
    async setUserAdminFlag(userId, isAdmin) {
      return setUserAdminFlag(db, userId, isAdmin);
    },
    async countAdminUsers() {
      return countAdminUsers(db);
    },
    async listUserGrowsSummary(userId) {
      return listUserGrowsSummary(db, userId);
    },
    async listUserSubmissionsSummary(userId) {
      return listUserSubmissionsSummary(db, userId);
    },
    async listSorteioEntriesByEmail(email) {
      return listSorteioEntriesByEmail(db, email);
    },
    async listLojaOrdersByEmail(email) {
      return listLojaOrdersByEmail(db, email);
    },
    async getSorteioAlertForUser(userId) {
      return getSorteioAlertForUser(db, userId);
    },
    async getSeriesOptions(category) {
      return loadSeriesOptions(db, category || null);
    },
    async upsertSeriesOption(item) {
      return upsertSeriesOption(db, item);
    },
    async deleteSeriesOption(id) {
      return deleteSeriesOption(db, id);
    }
  };
}

module.exports = { createSqlStore };
