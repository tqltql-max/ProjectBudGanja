'use strict';

/**
 * Catálogo do canal Dr. Samuel Dalle Laste.
 * Uso: YOUTUBE_CATALOG_FULL=1 node scripts/build-drsamueldallelaste-catalog.js
 */

const fs = require('fs');
const {
  buildChannelCatalogFromUrl,
  saveCatalog,
  catalogPath
} = require('../lib/youtube-channel-catalog.js');

const SLUG = 'drsamueldallelaste';
const CHANNEL_URL = 'https://www.youtube.com/c/DrSamuelDalleLaste';

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(CHANNEL_URL, {
    persist: false
  });
  saveCatalog(slug || SLUG, catalog);
  console.log(
    (slug || SLUG) + '.json:',
    (catalog.videos || []).length,
    'vídeos (canal',
    catalog.channelId + ')',
    '→',
    outPath || catalogPath(slug || SLUG)
  );
}

main().catch((err) => {
  console.error('build:dallelaste falhou:', err.message);
  const out = catalogPath(SLUG);
  if (fs.existsSync(out)) {
    console.warn('Mantendo catálogo existente.');
    process.exit(0);
  }
  process.exit(1);
});
