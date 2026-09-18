'use strict';

/** Capa 1200×630 — cruzamento farinha branca × cocaína × Branca de Neve. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const out = path.join(
    ROOT,
    'imagens',
    'inspecoes',
    'cruzamento-farinha-branca-neve-cover.jpg'
  );
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1520"/>
      <stop offset="50%" stop-color="#2a2430"/>
      <stop offset="100%" stop-color="#1c1810"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="32%" r="36%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="920" cy="200" r="70" fill="rgba(248,244,236,0.88)"/>
  <circle cx="920" cy="200" r="48" fill="#8b1e2d"/>
  <ellipse cx="260" cy="420" rx="90" ry="28" fill="rgba(244,240,230,0.55)"/>
  <ellipse cx="420" cy="400" rx="70" ry="22" fill="rgba(244,240,230,0.35)"/>
  <text x="600" y="155" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#c8b89a" letter-spacing="7">ARTES · CRUZAMENTO · RISCO</text>
  <text x="600" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#f6f1e6">farinha branca · cocaína</text>
  <text x="600" y="350" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="700" fill="#f0e4d0">Branca de Neve</text>
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#d0c4b0">o branco do refino · a gíria neve · a maçã do conto</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#a89880">colunas separadas — comida ≠ droga</text>
</svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
