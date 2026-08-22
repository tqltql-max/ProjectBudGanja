'use strict';

/**
 * Catálogo do canal @zangadoreview para a página Games.
 * Uso: node scripts/build-zangado-catalog.js
 * Full crawl: YOUTUBE_CATALOG_FULL=1 node scripts/build-zangado-catalog.js
 */

const fs = require('fs');
const { buildChannelCatalogFromUrl, saveCatalog, catalogPath } = require('../lib/youtube-channel-catalog.js');
const { stampCatalog } = require('../lib/zangado-categories.js');

const SLUG = 'zangadoreview';

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(
    'https://www.youtube.com/@zangadoreview',
    { slug: SLUG, includeShorts: false, persist: false }
  );
  const stamped = stampCatalog(catalog);
  saveCatalog(slug, stamped);
  const counts = {};
  (stamped.videos || []).forEach((v) => {
    counts[v.category] = (counts[v.category] || 0) + 1;
  });
  console.log(slug + '.json:', (stamped.videos || []).length, 'vídeos (canal', stamped.channelId + ')');
  console.log('categorias:', JSON.stringify(counts));
  console.log('→', outPath);
}

main().catch((e) => {
  console.error('build:zangado falhou:', e.message);
  const out = catalogPath(SLUG);
  if (fs.existsSync(out)) {
    console.warn('Mantendo catálogo existente.');
    process.exit(0);
  }
  process.exit(1);
});
