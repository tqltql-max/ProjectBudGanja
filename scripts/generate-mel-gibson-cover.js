'use strict';

/** Capa 1200×630 — Pessoas · Mel Gibson (ofício). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
  const outPath = path.join(ROOT, 'imagens', 'inspecoes', 'mel-gibson-cover.jpg');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const base = await sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.5, saturation: 0.88 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(16,12,8,0.38)"/>
      <stop offset="100%" stop-color="rgba(8,6,4,0.93)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <text x="600" y="170" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#c4a35a" letter-spacing="7">PESSOAS × ARTES · OFÍCIO</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#fff8e0">Mel Gibson</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d7d7d7">actor · realizador · as duas obras separadas</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#a8d5a2">Peekskill · 1956 · Icon · Coração Valente · Paixão</text>
</svg>`);

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);

  console.log('OK', path.relative(ROOT, outPath), Math.round(fs.statSync(outPath).size / 1024) + 'KB');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
