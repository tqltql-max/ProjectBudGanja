'use strict';

/**
 * Catálogo do canal Tamara Klink (@TamaraKlink).
 * Uso: node scripts/build-tamara-klink-catalog.js
 */

const { buildChannelCatalogFromUrl, saveCatalog } = require('../lib/youtube-channel-catalog.js');
const { stampCatalog } = require('../lib/tamara-categories.js');

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(
    'https://www.youtube.com/@TamaraKlink'
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
  console.error(err);
  process.exit(1);
});
