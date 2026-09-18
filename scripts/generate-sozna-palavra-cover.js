'use strict';

/** Capa 1200×630 — sozna / sozinha (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/sozna-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16120f"/>
      <stop offset="50%" stop-color="#1a1612"/>
      <stop offset="100%" stop-color="#0b0908"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(196,160,110,0.20)"/>
      <stop offset="100%" stop-color="rgba(196,160,110,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="230" r="220" fill="url(#glow)"/>
  <circle cx="600" cy="248" r="18" fill="none" stroke="rgba(212,184,150,0.55)" stroke-width="2"/>
  <text x="600" y="85" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d4b896" letter-spacing="3">PALAVRAS · SOZINHO · FORMA ORAL</text>
  <text x="600" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4ebe0">sozinho</text>
  <text x="600" y="350" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,210,180,0.95)">sozna · sozinha · ≠ solitário</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c4a070">estado só, sem vergonha</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#d4b896">medo · caminho · Vida · Faça o melhor!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
