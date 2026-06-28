'use strict';

require('../lib/load-env.js');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { DEFAULT_SITE } = require('../lib/content-store.js');
const { createSqlStore } = require('../lib/store-sql.js');

async function main() {
  const store = await createSqlStore(ROOT);
  const sitePath = path.join(ROOT, 'content', 'site.json');
  let site = Object.assign({}, DEFAULT_SITE);
  if (fs.existsSync(sitePath)) {
    try {
      site = Object.assign(site, JSON.parse(fs.readFileSync(sitePath, 'utf8')));
    } catch (e) { /* use defaults */ }
  }
  delete site.youtubeJardimUrl;
  delete site.youtubeJardimLabel;
  await store.setSite(site);
  fs.writeFileSync(sitePath, JSON.stringify(site, null, 2), 'utf8');
  console.log('site_settings → @InspetorBudGanja (sem Jardim Orgânico)');

  const pagesPath = path.join(ROOT, 'content', 'pages.json');
  if (fs.existsSync(pagesPath)) {
    const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
    await store.setPages(pages);
    console.log('pages →', Object.keys(pages).length, 'páginas');
  }

  const guiaPath = path.join(ROOT, 'content', 'guia-cultivo.json');
  if (fs.existsSync(guiaPath)) {
    const guia = JSON.parse(fs.readFileSync(guiaPath, 'utf8'));
    await store.setGuiaCultivo(guia);
    console.log('guia_cultivo →', guia.channelName);
  }

  const sorteioPath = path.join(ROOT, 'content', 'sorteio.json');
  if (fs.existsSync(sorteioPath)) {
    const sorteio = JSON.parse(fs.readFileSync(sorteioPath, 'utf8'));
    await store.setSorteioConfig(sorteio);
    console.log('sorteio_settings →', sorteio.titulo);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
