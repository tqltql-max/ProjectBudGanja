'use strict';

/**
 * Catálogo do canal @poderosobagual para a página GTA RP.
 * Uso: node scripts/build-bagual-catalog.js
 * Full crawl: YOUTUBE_CATALOG_FULL=1 node scripts/build-bagual-catalog.js
 */

const fs = require('fs');
const { buildChannelCatalogFromUrl, saveCatalog, catalogPath } = require('../lib/youtube-channel-catalog.js');
const { stampCatalog } = require('../lib/bagual-categories.js');

const SLUG = 'poderosobagual';

async function main() {
  const { catalog, slug, path: outPath } = await buildChannelCatalogFromUrl(
    'https://www.youtube.com/@poderosobagual',
    {
      slug: SLUG,
      includeShorts: false,
      persist: false,
      extras: {
        kickUrl: 'https://kick.com/poderosobagual',
        kickHandle: 'poderosobagual',
        mission:
          'Personagem Todo Poderoso Bagual — BOPE no GTA RP (Capital City). Arquivo YouTube; live no Kick. No BudGanja entra na página GTA RP. Sem afiliação. Personagem ≠ pessoa. Ficção de jogo ≠ manual de crime.'
      }
    }
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
  console.error('build:bagual falhou:', e.message);
  const out = catalogPath(SLUG);
  if (fs.existsSync(out)) {
    console.warn('Mantendo catálogo existente.');
    process.exit(0);
  }
  process.exit(1);
});
