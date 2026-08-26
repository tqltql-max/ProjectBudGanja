'use strict';

/** Capa 1200×630 para inspeção ração para animais. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

function kibbleDots() {
  const dots = [];
  const rng = (n) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 0; i < 48; i += 1) {
    const x = 70 + rng(i) * 1060;
    const y = 40 + rng(i + 40) * 200;
    const r = 6 + rng(i + 80) * 10;
    const fill = rng(i + 3) > 0.45 ? '#c4a574' : '#8b6914';
    dots.push(
      `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 0.72).toFixed(1)}" fill="${fill}" opacity="0.45"/>`
    );
  }
  return dots.join('');
}

async function main() {
  const sharp = require('sharp');
  const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
  const outPath = path.join(ROOT, 'imagens', 'inspecoes', 'racao-animais-cover.jpg');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const base = await sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.58, saturation: 0.9 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(18,12,6,0.25)"/>
      <stop offset="50%" stop-color="rgba(12,10,8,0.55)"/>
      <stop offset="100%" stop-color="rgba(8,8,7,0.88)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  ${kibbleDots()}
  <text x="600" y="250" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#d4af37" letter-spacing="7">PRODUTOS NOCIVOS</text>
  <text x="600" y="340" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="58" font-weight="800" fill="#fff8e0">Ração para animais</text>
  <text x="600" y="410" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d7d7d7">Pet food · extrusão · milho / soja · comedouro</text>
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
