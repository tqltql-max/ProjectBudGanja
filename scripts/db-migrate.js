'use strict';

require('../lib/load-env.js');
const { ROOT } = require('../lib/paths.js');
const { initDatabaseOnce, resolveDatabaseUrl } = require('../lib/db/client.js');
const { migrateFromJsonIfEmpty } = require('../lib/db/migrate-from-json.js');
const { ensureContentMigrated, contentTableCounts } = require('../lib/db/content-repos.js');

async function main() {
  console.log('Base de dados:', resolveDatabaseUrl(ROOT));
  const db = await initDatabaseOnce(ROOT);
  const usersReport = await migrateFromJsonIfEmpty(db, ROOT);
  const contentReport = await ensureContentMigrated(db, ROOT);
  const counts = await contentTableCounts(db);

  console.log('Utilizadores/sessões:', usersReport);
  console.log('Conteúdo (kv → tabelas):', contentReport.kv);
  console.log('Conteúdo (JSON → tabelas):', contentReport.json);
  console.log('Contagens por tabela:', counts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
