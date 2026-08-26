'use strict';

/**
 * Catálogo do canal Richard Rasmussen Selvagem (@RichardRasmussenSelvagem).
 * Uso: node scripts/build-richard-rasmussen-catalog.js
 */

const { buildChannelCatalogFromUrl } = require('../lib/youtube-channel-catalog.js');

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(
    'https://www.youtube.com/@RichardRasmussenSelvagem'
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
