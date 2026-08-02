'use strict';

/** Capa 1200×630 — cruzamento Raiva × Venom × Vida × Divertida Mente. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const out = path.join(
    ROOT,
    'imagens',
    'inspecoes',
    'cruzamento-raiva-venom-vida-cover.jpg'
  );
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1420"/>
      <stop offset="35%" stop-color="#2a1820"/>
      <stop offset="70%" stop-color="#1e2a24"/>
      <stop offset="100%" stop-color="#142028"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="200" cy="200" r="58" fill="#f5d76e" opacity="0.9"/>
  <circle cx="340" cy="170" r="48" fill="#6eb5e0" opacity="0.9"/>
  <circle cx="480" cy="200" r="52" fill="#e07070" opacity="0.95"/>
  <circle cx="620" cy="170" r="46" fill="#9b7ed9" opacity="0.9"/>
  <circle cx="760" cy="200" r="50" fill="#7bc96f" opacity="0.9"/>
  <circle cx="980" cy="420" r="120" fill="#2a3a28" opacity="0.55"/>
  <text x="600" y="320" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#9bc86a" letter-spacing="8">ARTES · CRUZAMENTO</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f0f4f0">Raiva · Emoção · Venom · Vida</text>
  <text x="600" y="470" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c8d0c8">no mapa de Divertida Mente</text>
  <text x="600" y="540" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#a0a8a0">sala de comando · ofício vs veneno · ficar</text>
</svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
