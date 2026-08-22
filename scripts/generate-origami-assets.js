'use strict';

/** Capa e diagrama do barquinho de papel (origami). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const outDir = path.join(ROOT, 'imagens', 'origami');
  fs.mkdirSync(outDir, { recursive: true });

  const coverSrc = path.join(
    process.env.USERPROFILE || '',
    '.cursor/projects/c-Users-tiago-Desktop-ProjectBudGanja/assets/origami-barquinho-cover.png'
  );
  const stepsSrc = path.join(
    process.env.USERPROFILE || '',
    '.cursor/projects/c-Users-tiago-Desktop-ProjectBudGanja/assets/c__Users_tiago_AppData_Roaming_Cursor_User_workspaceStorage_bd30f2c0ab7944756d38bfd6d705cd6e_images_urigamibarcodepapael-9f14bb36-69e6-43e7-8763-84ddae8d8c0d.jpg'
  );

  const coverOut = path.join(outDir, 'barquinho-de-papel-cover.jpg');
  const stepsOut = path.join(outDir, 'barquinho-de-papel-passos.jpg');

  if (fs.existsSync(coverSrc)) {
    await sharp(coverSrc)
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(coverOut);
    console.log('OK', path.relative(ROOT, coverOut));
  } else {
    console.warn('Capa gerada em falta:', coverSrc);
  }

  if (fs.existsSync(stepsSrc)) {
    await sharp(stepsSrc)
      .resize(1600, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(stepsOut);
    console.log('OK', path.relative(ROOT, stepsOut));
  } else {
    console.warn('Diagrama em falta:', stepsSrc);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
