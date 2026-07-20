'use strict';

const fs = require('fs');
const path = require('path');
const { createClient } = require('@libsql/client');
const { ROOT } = require('../paths.js');

const SCHEMA_VERSION = 21;
let client = null;
let initPromise = null;

function resolveDatabaseUrl(root) {
  const fromEnv = String(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || '').trim();
  if (fromEnv) return fromEnv;
  const dir = path.join(root || ROOT, 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const dbPath = path.join(dir, 'budganja.db').replace(/\\/g, '/');
  return 'file:' + dbPath;
}

function resolveAuthToken() {
  return String(process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN || '').trim() || undefined;
}

function getDbClient(root) {
  if (client) return client;
  const url = resolveDatabaseUrl(root);
  const authToken = resolveAuthToken();
  const opts = authToken ? { url, authToken } : { url };
  client = createClient(opts);
  return client;
}

async function applySchema(db) {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8').replace(/--[^\n]*/g, '');
  const statements = sql
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const statement of statements) {
    await db.execute(statement);
  }
}

async function ensureSchema(db) {
  await applySchema(db);
  const row = await db.execute('SELECT MAX(version) AS v FROM schema_migrations');
  let current = row.rows[0] && row.rows[0].v != null ? Number(row.rows[0].v) : 0;

  const incremental = [
    {
      version: 3,
      statements: [
        "ALTER TABLE guia_videos ADD COLUMN custom_title TEXT NOT NULL DEFAULT ''"
      ]
    },
    {
      version: 4,
      statements: [
        `CREATE TABLE IF NOT EXISTS sorteio_alert_subscribers (
          user_id TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          name TEXT NOT NULL DEFAULT '',
          subscribed_at TEXT NOT NULL,
          active INTEGER NOT NULL DEFAULT 1,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
        'CREATE UNIQUE INDEX IF NOT EXISTS idx_sorteio_alert_email ON sorteio_alert_subscribers(email)',
        "ALTER TABLE sorteio_entries ADD COLUMN user_id TEXT NOT NULL DEFAULT ''"
      ]
    },
    {
      version: 5,
      statements: [
        `CREATE TABLE IF NOT EXISTS loja_orders (
          id TEXT PRIMARY KEY,
          product_id TEXT NOT NULL,
          product_title TEXT NOT NULL DEFAULT '',
          nome TEXT NOT NULL DEFAULT '',
          email TEXT NOT NULL DEFAULT '',
          telefone TEXT NOT NULL DEFAULT '',
          cidade TEXT NOT NULL DEFAULT '',
          estado TEXT NOT NULL DEFAULT '',
          mensagem TEXT NOT NULL DEFAULT '',
          user_id TEXT NOT NULL DEFAULT '',
          status TEXT NOT NULL DEFAULT 'novo',
          created_at TEXT NOT NULL
        )`,
        'CREATE INDEX IF NOT EXISTS idx_loja_orders_product ON loja_orders(product_id)',
        'CREATE INDEX IF NOT EXISTS idx_loja_orders_created ON loja_orders(created_at)'
      ]
    },
    {
      version: 6,
      statements: [
        "ALTER TABLE loja_orders ADD COLUMN package_id TEXT NOT NULL DEFAULT ''",
        "ALTER TABLE loja_orders ADD COLUMN package_label TEXT NOT NULL DEFAULT ''",
        "ALTER TABLE loja_orders ADD COLUMN package_price_note TEXT NOT NULL DEFAULT ''"
      ]
    },
    {
      version: 7,
      statements: [
        `CREATE TABLE IF NOT EXISTS cultivo_settings (
          user_id TEXT PRIMARY KEY,
          phase TEXT NOT NULL DEFAULT '',
          phase_started_at TEXT,
          active_grow_id TEXT NOT NULL DEFAULT '',
          custom_guide TEXT NOT NULL DEFAULT '',
          guide_week_notes TEXT NOT NULL DEFAULT '{}',
          updated_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS cultivo_grows (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          name TEXT NOT NULL DEFAULT '',
          planted_at TEXT,
          phase TEXT NOT NULL DEFAULT 'germinacao',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
        'CREATE INDEX IF NOT EXISTS idx_cultivo_grows_user ON cultivo_grows(user_id)',
        `CREATE TABLE IF NOT EXISTS cultivo_entries (
          id TEXT PRIMARY KEY,
          grow_id TEXT NOT NULL,
          user_id TEXT NOT NULL,
          entry_date TEXT NOT NULL,
          text TEXT NOT NULL DEFAULT '',
          source TEXT NOT NULL DEFAULT 'manual',
          created_at TEXT NOT NULL,
          FOREIGN KEY (grow_id) REFERENCES cultivo_grows(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
        'CREATE INDEX IF NOT EXISTS idx_cultivo_entries_grow ON cultivo_entries(grow_id)',
        'CREATE INDEX IF NOT EXISTS idx_cultivo_entries_user ON cultivo_entries(user_id)',
        `CREATE TABLE IF NOT EXISTS cultivo_plan_tasks (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          label TEXT NOT NULL DEFAULT '',
          done INTEGER NOT NULL DEFAULT 0,
          tool_href TEXT NOT NULL DEFAULT '',
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
        'CREATE INDEX IF NOT EXISTS idx_cultivo_plan_tasks_user ON cultivo_plan_tasks(user_id)'
      ]
    },
    {
      version: 8,
      statements: [
        "ALTER TABLE cultivo_entries ADD COLUMN action_type TEXT NOT NULL DEFAULT 'obs'",
        "ALTER TABLE cultivo_entries ADD COLUMN metrics_json TEXT NOT NULL DEFAULT '{}'"
      ]
    },
    {
      version: 9,
      statements: [
        "ALTER TABLE cultivo_entries ADD COLUMN photos_json TEXT NOT NULL DEFAULT '[]'",
        "ALTER TABLE cultivo_plan_tasks ADD COLUMN due_at TEXT",
        "ALTER TABLE cultivo_plan_tasks ADD COLUMN action_type TEXT NOT NULL DEFAULT ''",
        "ALTER TABLE cultivo_plan_tasks ADD COLUMN grow_id TEXT NOT NULL DEFAULT ''"
      ]
    },
    {
      version: 10,
      statements: [
        'ALTER TABLE cultivo_grows ADD COLUMN plant_count INTEGER NOT NULL DEFAULT 1'
      ]
    },
    {
      version: 11,
      statements: [
        "ALTER TABLE cultivo_grows ADD COLUMN species TEXT NOT NULL DEFAULT ''"
      ]
    },
    {
      version: 12,
      statements: [
        `CREATE TABLE IF NOT EXISTS cultivo_submissions (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          grow_id TEXT NOT NULL,
          grow_name TEXT NOT NULL DEFAULT '',
          status TEXT NOT NULL DEFAULT 'pending',
          title TEXT NOT NULL DEFAULT '',
          excerpt TEXT NOT NULL DEFAULT '',
          content_md TEXT NOT NULL DEFAULT '',
          reviewer_note TEXT NOT NULL DEFAULT '',
          post_slug TEXT NOT NULL DEFAULT '',
          submitted_at TEXT NOT NULL,
          reviewed_at TEXT,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
        'CREATE INDEX IF NOT EXISTS idx_cultivo_submissions_status ON cultivo_submissions(status)',
        'CREATE INDEX IF NOT EXISTS idx_cultivo_submissions_user ON cultivo_submissions(user_id)',
        'CREATE INDEX IF NOT EXISTS idx_cultivo_submissions_grow ON cultivo_submissions(grow_id)'
      ]
    },
    {
      version: 13,
      statements: [
        'ALTER TABLE users ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0'
      ]
    },
    {
      version: 14,
      statements: [
        'ALTER TABLE cultivo_grows ADD COLUMN custom_guide TEXT NOT NULL DEFAULT \'\'',
        'ALTER TABLE cultivo_grows ADD COLUMN guide_week_notes TEXT NOT NULL DEFAULT \'{}\''
      ]
    },
    {
      version: 15,
      statements: [
        'ALTER TABLE cultivo_grows ADD COLUMN environment TEXT NOT NULL DEFAULT \'\'',
        'ALTER TABLE cultivo_grows ADD COLUMN substrate TEXT NOT NULL DEFAULT \'\''
      ]
    },
    {
      version: 16,
      statements: [
        "ALTER TABLE posts ADD COLUMN series TEXT NOT NULL DEFAULT ''",
        "ALTER TABLE posts ADD COLUMN series_label TEXT NOT NULL DEFAULT ''"
      ]
    },
    {
      version: 17,
      statements: [
        `CREATE TABLE IF NOT EXISTS post_series (
          id TEXT PRIMARY KEY,
          label TEXT NOT NULL DEFAULT '',
          category TEXT NOT NULL DEFAULT 'inspecao',
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL
        )`,
        `CREATE INDEX IF NOT EXISTS idx_post_series_category ON post_series(category)`,
        `INSERT OR IGNORE INTO post_series (id, label, category, sort_order, created_at) VALUES ('guia-cultivo-basico', 'Guia de Cultivo B\u00e1sico', 'inspecao', 1, '${new Date().toISOString()}')`,
        `INSERT OR IGNORE INTO post_series (id, label, category, sort_order, created_at) VALUES ('canal-jardimhg', 'Canal Jardim HG', 'inspecao', 2, '${new Date().toISOString()}')`,
        `INSERT OR IGNORE INTO post_series (id, label, category, sort_order, created_at) VALUES ('canal-inspetorbudganja', 'Canal Inspetor BudGanja', 'inspecao', 3, '${new Date().toISOString()}')`,
        `INSERT OR IGNORE INTO post_series (id, label, category, sort_order, created_at) VALUES ('verificacao-equipamento', 'Verifica\u00e7\u00e3o de Equipamentos', 'inspecao', 4, '${new Date().toISOString()}')`
      ]
    },
    {
      version: 18,
      statements: [
        'ALTER TABLE users ADD COLUMN email_verified_at TEXT',
        "ALTER TABLE users ADD COLUMN username TEXT NOT NULL DEFAULT ''",
        "ALTER TABLE users ADD COLUMN birth_date TEXT NOT NULL DEFAULT ''",
        "ALTER TABLE users ADD COLUMN registration_ip TEXT NOT NULL DEFAULT ''",
        'ALTER TABLE users ADD COLUMN last_login_at TEXT',
        "ALTER TABLE users ADD COLUMN last_login_ip TEXT NOT NULL DEFAULT ''",
        "ALTER TABLE users ADD COLUMN account_status TEXT NOT NULL DEFAULT 'pending_profile'",
        "ALTER TABLE users ADD COLUMN onboarding_stage TEXT NOT NULL DEFAULT 'initial'",
        "ALTER TABLE users ADD COLUMN activity_log_json TEXT NOT NULL DEFAULT '[]'",
        "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username_unique ON users(username) WHERE username <> ''"
      ]
    },
    {
      version: 19,
      statements: [
        `INSERT OR IGNORE INTO post_series (id, label, category, sort_order, created_at) VALUES ('formacao-academica', 'Cursos e forma\u00e7\u00e3o', 'inspecao', 6, '${new Date().toISOString()}')`
      ]
    },
    {
      version: 20,
      statements: [
        `CREATE TABLE IF NOT EXISTS community_posts (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          grow_id TEXT NOT NULL DEFAULT '',
          entry_id TEXT NOT NULL DEFAULT '',
          photo_url TEXT NOT NULL DEFAULT '',
          caption TEXT NOT NULL DEFAULT '',
          phase TEXT NOT NULL DEFAULT '',
          help_request INTEGER NOT NULL DEFAULT 0,
          status TEXT NOT NULL DEFAULT 'published',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
        'CREATE INDEX IF NOT EXISTS idx_community_posts_status_created ON community_posts(status, created_at)',
        'CREATE INDEX IF NOT EXISTS idx_community_posts_user ON community_posts(user_id)',
        `CREATE UNIQUE INDEX IF NOT EXISTS idx_community_posts_entry_photo
          ON community_posts(entry_id, photo_url) WHERE entry_id <> '' AND photo_url <> ''`,
        `CREATE TABLE IF NOT EXISTS community_comments (
          id TEXT PRIMARY KEY,
          post_id TEXT NOT NULL,
          user_id TEXT NOT NULL,
          body TEXT NOT NULL DEFAULT '',
          status TEXT NOT NULL DEFAULT 'published',
          created_at TEXT NOT NULL,
          FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
        'CREATE INDEX IF NOT EXISTS idx_community_comments_post ON community_comments(post_id, created_at)',
        'CREATE INDEX IF NOT EXISTS idx_community_comments_user ON community_comments(user_id)'
      ]
    },
    {
      version: 21,
      statements: [
        "ALTER TABLE community_posts ADD COLUMN kind TEXT NOT NULL DEFAULT 'diary'",
        'CREATE INDEX IF NOT EXISTS idx_community_posts_kind_created ON community_posts(kind, created_at)'
      ]
    }
  ];

  for (const step of incremental) {
    if (current >= step.version) continue;
    for (const statement of step.statements) {
      try {
        await db.execute(statement);
      } catch (e) {
        /* coluna já existe */
      }
    }
    await db.execute({
      sql: 'INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)',
      args: [step.version, new Date().toISOString()]
    });
    current = step.version;
  }

  if (current >= SCHEMA_VERSION) return;
  await db.execute({
    sql: 'INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)',
    args: [SCHEMA_VERSION, new Date().toISOString()]
  });
}

async function initDatabase(root) {
  const db = getDbClient(root);
  await ensureSchema(db);
  return db;
}

function initDatabaseOnce(root) {
  if (!initPromise) {
    initPromise = initDatabase(root);
  }
  return initPromise;
}

function resetDatabaseClient() {
  client = null;
  initPromise = null;
}

module.exports = {
  SCHEMA_VERSION,
  resolveDatabaseUrl,
  getDbClient,
  initDatabase,
  initDatabaseOnce,
  resetDatabaseClient
};
