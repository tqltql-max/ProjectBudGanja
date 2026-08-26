'use strict';

/**
 * Catálogo do canal Tamara Klink (@TamaraKlink).
 * Uso: node scripts/build-tamara-klink-catalog.js
 */

const fs = require('fs');
const { buildChannelCatalogFromUrl, saveCatalog, catalogPath } = require('../lib/youtube-channel-catalog.js');
const { stampCatalog } = require('../lib/tamara-categories.js');

const SLUG = 'tamaraklink';

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(
    'https://www.youtube.com/@TamaraKlink',
    { persist: false }
  );
  const stamped = stampCatalog(catalog);
  saveCatalog(slug, stamped);
  console.log(
    slug + '.json:',
    (stamped.videos || []).length,
    'vídeos (canal',
    stamped.channelId + ')',
    '→',
    outPath
  );
}

main().catch((err) => {
  console.error('build:tamara falhou:', err.message);
  const out = catalogPath(SLUG);
  if (fs.existsSync(out)) {
    console.warn('Mantendo catálogo existente.');
    process.exit(0);
  }
  process.exit(1);
});
