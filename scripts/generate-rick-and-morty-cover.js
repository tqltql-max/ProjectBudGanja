'use strict';

/** Capa 1200×630 — Artes · Rick and Morty (desenho 2013). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const SRC = path.join(
  process.env.USERPROFILE || '',
  '.cursor/projects/c-Users-tiago-Desktop-ProjectBudGanja/assets',
  'c__Users_tiago_AppData_Roaming_Cursor_User_workspaceStorage_bd30f2c0ab7944756d38bfd6d705cd6e_images_rickemorte-c71fc39c-1f43-4340-8b83-b347ccafcc6e.jpg'
);

async function main() {
  const sharp = require('sharp');
  if (!fs.existsSync(SRC)) throw new Error('Capa fonte Rick and Morty não encontrada: ' + SRC);
  const src = SRC;
  const OUT = path.join(ROOT, 'imagens/inspecoes/rick-and-morty-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  // 1200×630 cheio e JPEG leve — o WhatsApp falha previews pesados ou com barras.
  await sharp(src)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(OUT);

  const meta = await sharp(OUT).metadata();
  console.log(
    'OK',
    path.relative(ROOT, OUT),
    Math.round(fs.statSync(OUT).size / 1024) + 'KB',
    `${meta.width}×${meta.height}`,
    'src=' + path.basename(src)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
