'use strict';

/** Capa 1200×630 — palavra pedra (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/pedra-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141210"/>
      <stop offset="48%" stop-color="#1c1914"/>
      <stop offset="100%" stop-color="#0a0908"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="rgba(160,150,130,0.32)"/>
      <stop offset="55%" stop-color="rgba(80,70,55,0.12)"/>
      <stop offset="100%" stop-color="rgba(30,26,20,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(180,170,150,0)"/>
      <stop offset="50%" stop-color="rgba(180,170,150,0.55)"/>
      <stop offset="100%" stop-color="rgba(180,170,150,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="255" rx="370" ry="205" fill="url(#glow)"/>
  <polygon points="600,128 655,248 545,248" fill="rgba(200,190,170,0.22)"/>
  <polygon points="528,248 600,318 672,248" fill="rgba(140,130,110,0.28)"/>
  <rect x="280" y="348" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8b898" letter-spacing="4">PALAVRAS · ΠΈΤΡΑ · PEDRO</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#fff6e8">pedra</text>
  <text x="600" y="402" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,200,180,0.95)">mesmo tronco que Pedro · a orelha cola perdão</text>
  <text x="600" y="508" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8a888">geologia guarda · gesso segura</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c8b898">o étimo corta</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
