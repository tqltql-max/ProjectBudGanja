'use strict';

/**
 * Catálogo do canal @PaulinhoLOKOoficial para a página Games.
 * Uso: node scripts/build-paulinho-catalog.js
 * Full crawl: YOUTUBE_CATALOG_FULL=1 node scripts/build-paulinho-catalog.js
 */

const fs = require('fs');
const { buildChannelCatalogFromUrl, saveCatalog, catalogPath } = require('../lib/youtube-channel-catalog.js');
const { stampCatalog } = require('../lib/paulinho-categories.js');

const SLUG = 'paulinholoko';

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(
    'https://www.youtube.com/@PaulinhoLOKOoficial',
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
  console.error('build:paulinho falhou:', e.message);
  const out = catalogPath(SLUG);
  if (fs.existsSync(out)) {
    console.warn('Mantendo catálogo existente.');
    process.exit(0);
  }
  process.exit(1);
});
