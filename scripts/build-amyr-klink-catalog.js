'use strict';

/**
 * Catálogo do canal Amyr Klink (@amyrklinkoficial).
 * Uso: node scripts/build-amyr-klink-catalog.js
 */

const { buildChannelCatalogFromUrl } = require('../lib/youtube-channel-catalog.js');

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(
    'https://www.youtube.com/@amyrklinkoficial'
  );
  console.log(
    slug + '.json:',
    (catalog.videos || []).length,
    'vídeos (canal',
    catalog.channelId + ')',
    '→',
    outPath
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
