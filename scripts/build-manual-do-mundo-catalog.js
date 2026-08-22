'use strict';

/**
 * Catálogo completo do canal Manual do Mundo (@manualdomundo).
 * Uso: node scripts/build-manual-do-mundo-catalog.js
 */

const { buildChannelCatalogFromUrl, saveCatalog } = require('../lib/youtube-channel-catalog.js');
const { stampCatalog } = require('../lib/manual-do-mundo-categories.js');

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(
    'https://www.youtube.com/@manualdomundo',
    { maxVideos: 8000, persist: false }
  );
  const stamped = stampCatalog(
    Object.assign({}, catalog, {
      mission:
        'Ciência e tecnologia em português, no ecrã. Destaque: Manual Maker (Arduino, 3D, laser). Pessoa ≠ canal: Iberê Thenório. Catalogar ≠ endosso de cada experiência.'
    })
  );
  saveCatalog(slug, stamped);
  const maker = (stamped.videos || []).filter((v) => v.category === 'maker').length;
  console.log(
    slug + '.json:',
    (stamped.videos || []).length,
    'vídeos (canal',
    stamped.channelId + ')',
    stamped.handle,
    '· Maker:',
    maker,
    '→',
    outPath
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
