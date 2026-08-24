'use strict';

/** Capa 1200×630 — preso (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/preso-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0c0a0e"/>
      <stop offset="48%" stop-color="#1c1824"/>
      <stop offset="100%" stop-color="#3a2a22"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="42%">
      <stop offset="0%" stop-color="rgba(220,190,150,0.22)"/>
      <stop offset="55%" stop-color="rgba(90,70,55,0.12)"/>
      <stop offset="100%" stop-color="rgba(12,10,14,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="280" rx="280" ry="190" fill="url(#glow)"/>
  <rect x="430" y="120" width="14" height="280" fill="rgba(200,180,160,0.28)"/>
  <rect x="478" y="120" width="14" height="280" fill="rgba(200,180,160,0.22)"/>
  <rect x="526" y="120" width="14" height="280" fill="rgba(200,180,160,0.28)"/>
  <rect x="574" y="120" width="14" height="280" fill="rgba(200,180,160,0.22)"/>
  <rect x="622" y="120" width="14" height="280" fill="rgba(200,180,160,0.28)"/>
  <rect x="670" y="120" width="14" height="280" fill="rgba(200,180,160,0.22)"/>
  <rect x="718" y="120" width="14" height="280" fill="rgba(200,180,160,0.28)"/>
  <rect x="756" y="120" width="14" height="280" fill="rgba(200,180,160,0.18)"/>
  <rect x="418" y="118" width="360" height="12" fill="rgba(210,190,170,0.35)"/>
  <rect x="418" y="388" width="360" height="12" fill="rgba(210,190,170,0.35)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8b49a" letter-spacing="4">PALAVRAS · PREHENDERE · ESTADO</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4ebe0">preso</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,214,196,0.95)">prender · estado · nao identidade</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(200,180,160,0.9)">liberdade · prisao · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
