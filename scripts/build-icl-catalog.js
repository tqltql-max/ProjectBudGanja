'use strict';

/**
 * Catálogo do canal Instituto Conhecimento Liberta.
 * Recorte recente (não o arquivo completo — o canal tem dezenas de milhares de lives).
 * Uso: node scripts/build-icl-catalog.js
 */

const { buildChannelCatalogFromUrl, saveCatalog } = require('../lib/youtube-channel-catalog.js');
const { stampCatalog } = require('../lib/icl-categories.js');

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(
    'https://www.youtube.com/@institutoconhecimentoliberta',
    { maxVideos: 350 }
  );
  const stamped = stampCatalog(
    Object.assign({}, catalog, {
      mission:
        'Instituto Conhecimento Liberta — jornalismo ao vivo no YouTube; cursos na plataforma paga (icl.com.br). Cursos ≠ canal. Catalogar ≠ endosso político.'
    })
  );
  saveCatalog(slug, stamped);
  console.log(
    slug + '.json:',
    (stamped.videos || []).length,
    'vídeos (canal',
    stamped.channelId + ')',
    stamped.handle,
    '→',
    outPath
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
