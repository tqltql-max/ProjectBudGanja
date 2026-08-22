'use strict';

/** Capa 1200×630 + infografia completa — teoria das cordas (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const SRC_CANDIDATES = [
  path.join(ROOT, 'imagens/inspecoes/teoria-das-cordas-infografico.jpg'),
  path.join(
    process.env.USERPROFILE || '',
    '.cursor/projects/c-Users-tiago-Desktop-ProjectBudGanja/assets',
    'c__Users_tiago_AppData_Roaming_Cursor_User_workspaceStorage_bd30f2c0ab7944756d38bfd6d705cd6e_images_teoriadascordas-6c174c78-51dc-4aec-8f16-01b61609b3f2.jpg'
  )
];

function findSrc() {
  for (const p of SRC_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Infografia fonte não encontrada');
}

async function main() {
  const sharp = require('sharp');
  const src = findSrc();
  const dir = path.join(ROOT, 'imagens/inspecoes');
  fs.mkdirSync(dir, { recursive: true });

  const INFO = path.join(dir, 'teoria-das-cordas-infografico.jpg');
  const COVER = path.join(dir, 'teoria-das-cordas-palavra-cover.jpg');

  await sharp(src)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(INFO + '.tmp');
  fs.renameSync(INFO + '.tmp', INFO);

  const meta = await sharp(INFO).metadata();
  const bg = { r: 7, g: 18, b: 40, alpha: 1 };
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: bg }
  })
    .composite([
      {
        input: await sharp(INFO)
          .resize({ width: 1200, height: 630, fit: 'contain', background: bg })
          .jpeg({ quality: 86, mozjpeg: true })
          .toBuffer()
      }
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(COVER);

  const kb = (p) => Math.round(fs.statSync(p).size / 1024) + 'KB';
  console.log('OK infografico', path.relative(ROOT, INFO), kb(INFO), `${meta.width}×${meta.height}`);
  console.log('OK cover', path.relative(ROOT, COVER), kb(COVER));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
