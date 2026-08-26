'use strict';

/** Capa 1200×630 — Artes · Vira-Vira (Mamonas Assassinas). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/vira-vira-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a2744"/>
      <stop offset="38%" stop-color="#2d5a8a"/>
      <stop offset="72%" stop-color="#c43c3c"/>
      <stop offset="100%" stop-color="#f0c14a"/>
    </linearGradient>
    <pattern id="tile" width="48" height="48" patternUnits="userSpaceOnUse">
      <rect width="48" height="48" fill="none"/>
      <path d="M24 6 L42 24 L24 42 L6 24 Z" fill="none" stroke="rgba(244,232,192,0.22)" stroke-width="1.5"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#tile)"/>
  <ellipse cx="600" cy="340" rx="210" ry="78" fill="none" stroke="rgba(244,232,192,0.55)" stroke-width="6"/>
  <ellipse cx="600" cy="340" rx="140" ry="48" fill="none" stroke="rgba(240,193,74,0.7)" stroke-width="3" stroke-dasharray="14 12"/>
  <circle cx="600" cy="340" r="14" fill="#f4e8c0"/>
  <circle cx="810" cy="340" r="10" fill="#f6e27a"/>
  <circle cx="390" cy="340" r="10" fill="#f6e27a"/>
  <circle cx="600" cy="262" r="10" fill="#e8d4a0"/>
  <circle cx="600" cy="418" r="10" fill="#e8d4a0"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#f6e27a" letter-spacing="6">ARTES · CANÇÃO 1995</text>
  <text x="600" y="522" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4f8fc">Vira-Vira</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#f0e4c8">Mamonas Assassinas · o vira · primeiro clipe</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
