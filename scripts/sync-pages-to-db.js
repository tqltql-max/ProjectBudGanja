'use strict';

require('../lib/load-env.js');

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { PAGE_REGISTRY } = require('../lib/content-store.js');
const { buildHtmlFromPage } = require('../lib/page-html.js');
const { getSqlStoreIfAvailable } = require('../lib/sync-db-files.js');

async function main() {
  const pagesPath = path.join(ROOT, 'content', 'pages.json');
  if (!fs.existsSync(pagesPath)) {
    console.warn('sync-pages-to-db: pages.json em falta');
    return;
  }

  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
  const store = await getSqlStoreIfAvailable(ROOT);
  if (!store || !store.setPages) {
    console.log('sync-pages-to-db: skip (sem store SQL)');
    return;
  }

  await store.setPages(pages);

  for (const entry of PAGE_REGISTRY) {
    const page = pages[entry.file];
    if (!page) continue;
    const html = buildHtmlFromPage(page);
    const filePath = path.join(ROOT, entry.file);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html, 'utf8');
  }

  console.log('sync-pages-to-db: ' + Object.keys(pages).length + ' páginas gravadas na base de dados');
}

main().catch(function (e) {
  console.error('sync-pages-to-db:', e.message);
  process.exit(1);
});
