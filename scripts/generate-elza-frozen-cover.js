'use strict';

/** Capa 1200×630 — Artes · Elza (Frozen, 2013). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/elza-frozen-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a1628"/>
      <stop offset="48%" stop-color="#1a3a58"/>
      <stop offset="100%" stop-color="#8ec8e8"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="38%" r="36%">
      <stop offset="0%" stop-color="rgba(220,245,255,0.55)"/>
      <stop offset="55%" stop-color="rgba(140,200,230,0.18)"/>
      <stop offset="100%" stop-color="rgba(10,22,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="620" cy="240" rx="260" ry="200" fill="url(#glow)"/>
  <polygon points="600,70 628,150 712,150 644,198 670,280 600,230 530,280 556,198 488,150 572,150" fill="rgba(236,248,255,0.88)"/>
  <path d="M600 300 L600 520" fill="none" stroke="rgba(200,230,250,0.45)" stroke-width="8"/>
  <path d="M0 520 C200 480, 400 560, 600 510 C800 460, 1000 540, 1200 500 L1200 630 L0 630 Z" fill="rgba(180,220,240,0.22)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8e8f8" letter-spacing="4">ARTES · DESENHO 2013 · FROZEN</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4fbff">Elza</text>
  <text x="600" y="490" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d0eaf8">o gelo e o oficio de nao esconder</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(210,235,250,0.9)">DisneyMusicVEVO · Let It Go · porta</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
