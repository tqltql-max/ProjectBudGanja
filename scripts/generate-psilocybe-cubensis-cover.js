'use strict';

/** Capa 1200×630 — Psilocybe cubensis (catálogo de fungos). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/fungos/psilocybe-cubensis-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071018"/>
      <stop offset="48%" stop-color="#0c1c28"/>
      <stop offset="100%" stop-color="#081410"/>
    </linearGradient>
    <radialGradient id="aurora" cx="58%" cy="28%" r="48%">
      <stop offset="0%" stop-color="rgba(90,210,190,0.28)"/>
      <stop offset="45%" stop-color="rgba(70,140,200,0.14)"/>
      <stop offset="100%" stop-color="rgba(8,16,24,0)"/>
    </radialGradient>
    <radialGradient id="cap" cx="50%" cy="35%" r="62%">
      <stop offset="0%" stop-color="#d4b06a"/>
      <stop offset="55%" stop-color="#b8893a"/>
      <stop offset="100%" stop-color="#6e4a1c"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="700" cy="180" rx="360" ry="170" fill="url(#aurora)"/>
  <ellipse cx="600" cy="268" rx="118" ry="52" fill="url(#cap)"/>
  <path d="M482 268 Q600 318 718 268" fill="none" stroke="rgba(40,28,12,0.35)" stroke-width="3"/>
  <rect x="586" y="268" width="28" height="168" rx="12" fill="#cfc8b0"/>
  <rect x="592" y="300" width="16" height="90" rx="8" fill="rgba(90,150,200,0.28)"/>
  <ellipse cx="600" cy="442" rx="46" ry="10" fill="rgba(20,40,50,0.45)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#90c8b8" letter-spacing="4">FUNGOS · CAP. 1 · UNIFESP XIV</text>
  <text x="600" y="545" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="700" fill="#eef8f4">Psilocybe cubensis</text>
  <text x="600" y="586" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a8d0c0">identificação · listas controladas · não é cultivo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
