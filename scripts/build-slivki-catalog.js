'use strict';

/**
 * Catálogo do canal Slivki Show (@slivkishowen).
 * Uso: node scripts/build-slivki-catalog.js
 */

const { buildChannelCatalogFromUrl, saveCatalog } = require('../lib/youtube-channel-catalog.js');
const { stampCatalog } = require('../lib/slivki-categories.js');

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(
    'https://www.youtube.com/@slivkishowen'
  );
  const stamped = stampCatalog(
    Object.assign({}, catalog, {
      mission:
        'Arquivo EN de experiências visuais, life hacks e fauna de ecrã. Destaque: Aranha Rodrigo (saltadora). Aranha ≠ inseto. Catalogar ≠ endosso de cada experiência.'
    })
  );
  saveCatalog(slug, stamped);
  const rodrigo = (stamped.videos || []).filter((v) => v.category === 'rodrigo').length;
  console.log(
    slug + '.json:',
    (stamped.videos || []).length,
    'vídeos (canal',
    stamped.channelId + ')',
    stamped.handle,
    '· Rodrigo:',
    rodrigo,
    '→',
    outPath
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
