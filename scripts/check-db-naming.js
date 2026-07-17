'use strict';

require('../lib/load-env.js');

const { ROOT } = require('../lib/paths.js');
const { initDatabaseOnce, getDbClient } = require('../lib/db/client.js');

const NAME_PATTERN = /^[a-z][a-z0-9_]*$/;

function isValidName(name) {
  return NAME_PATTERN.test(String(name || ''));
}

async function listTables(db) {
  const result = await db.execute(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
  );
  return result.rows.map((row) => String(row.name || '')).filter(Boolean);
}

async function listColumns(db, table) {
  const info = await db.execute("PRAGMA table_info('" + table + "')");
  return (info.rows || []).map((row) => String(row.name || '')).filter(Boolean);
}

async function run() {
  await initDatabaseOnce(ROOT);
  const db = getDbClient(ROOT);

  const invalid = [];
  const tables = await listTables(db);

  for (const table of tables) {
    if (!isValidName(table)) {
      invalid.push({ type: 'table', table, name: table });
    }
    const columns = await listColumns(db, table);
    for (const column of columns) {
      if (!isValidName(column)) {
        invalid.push({ type: 'column', table, name: column });
      }
    }
  }

  if (!invalid.length) {
    console.log('OK: schema naming follows snake_case in all tables and columns.');
    return;
  }

  console.error('FAIL: invalid schema names found:');
  for (const item of invalid) {
    if (item.type === 'table') {
      console.error(' - table: ' + item.name);
    } else {
      console.error(' - column: ' + item.table + '.' + item.name);
    }
  }
  process.exit(1);
}

run().catch((error) => {
  console.error(error && error.message ? error.message : error);
  process.exit(1);
});