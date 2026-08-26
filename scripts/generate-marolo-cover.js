'use strict';

/** Capa 1200×630 — marolo / araticum (Frutos · Cerrado). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/plantas/marolo-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2a2410"/>
      <stop offset="45%" stop-color="#1a1610"/>
      <stop offset="100%" stop-color="#12180c"/>
    </linearGradient>
    <radialGradient id="cerrado" cx="38%" cy="58%" r="48%">
      <stop offset="0%" stop-color="rgba(180,120,40,0.42)"/>
      <stop offset="100%" stop-color="rgba(16,12,8,0)"/>
    </radialGradient>
    <radialGradient id="pulp" cx="68%" cy="42%" r="40%">
      <stop offset="0%" stop-color="rgba(230,200,120,0.38)"/>
      <stop offset="100%" stop-color="rgba(16,14,10,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="420" cy="380" rx="300" ry="180" fill="url(#cerrado)"/>
  <ellipse cx="820" cy="260" rx="240" ry="170" fill="url(#pulp)"/>
  <ellipse cx="760" cy="300" rx="160" ry="120" fill="none" stroke="rgba(210,170,80,0.45)" stroke-width="3"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#d8b070" letter-spacing="2.2">FRUTOS · CERRADO · ARATIKU · ≠ MARACUJÁ ≠ MAMÃO ≠ PINHA</text>
  <text x="600" y="168" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4eee4">Marolo</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,190,0.95)">Annona crassiflora · araticum-do-cerrado</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c8b080">o fruto · não a palavra · polpa, não a receita da semente</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
