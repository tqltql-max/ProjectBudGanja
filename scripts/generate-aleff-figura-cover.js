'use strict';

/** Capa 1200×630 — Pessoas · Aleff (Aliffe). Terra mineira, não CRT de canal. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
  const outPath = path.join(ROOT, 'imagens', 'inspecoes', 'aleff-cover.jpg');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const base = await sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.56, saturation: 1.05 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(18,10,6,0.32)"/>
      <stop offset="48%" stop-color="rgba(18,10,6,0.58)"/>
      <stop offset="100%" stop-color="rgba(12,8,5,0.92)"/>
    </linearGradient>
    <linearGradient id="earth" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8b5a2b"/>
      <stop offset="55%" stop-color="#c4a35a"/>
      <stop offset="100%" stop-color="#2f6b3a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#earth)"/>
  <text x="600" y="168" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#c4a35a" letter-spacing="7">PESSOAS · MACHADO · MINAS</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="#fff6e4">Aleff</text>
  <text x="600" y="378" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#e8d7b0">Aliffe Henrique de Carvalho</text>
  <text x="600" y="460" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d4c4a0">pessoa · nome · rosto · caminho</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c4a35a">antes do ecrã · crédito ao homem</text>
</svg>`);

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);

  console.log('OK', path.relative(ROOT, outPath), Math.round(fs.statSync(outPath).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
