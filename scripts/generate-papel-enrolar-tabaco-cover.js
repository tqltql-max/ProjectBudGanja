'use strict';

/** Capa 1200×630 — papel de enrolar × tabaco (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/papel-enrolar-tabaco-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a140c"/>
      <stop offset="45%" stop-color="#2c2418"/>
      <stop offset="100%" stop-color="#12100c"/>
    </linearGradient>
    <linearGradient id="leaf" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6b8f3a"/>
      <stop offset="100%" stop-color="#3d5a22"/>
    </linearGradient>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(245,235,210,0.92)"/>
      <stop offset="100%" stop-color="rgba(220,205,170,0.75)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="380" cy="320" rx="90" ry="160" fill="url(#leaf)" transform="rotate(-25 380 320)" opacity="0.9"/>
  <ellipse cx="400" cy="300" rx="70" ry="130" fill="url(#leaf)" transform="rotate(15 400 300)" opacity="0.7"/>
  <path d="M620 180 L980 160 L1000 470 L640 500 Z" fill="url(#paper)" stroke="rgba(180,160,120,0.5)" stroke-width="2"/>
  <path d="M640 200 Q820 280 980 220" fill="none" stroke="rgba(160,120,60,0.35)" stroke-width="1.5"/>
  <path d="M650 260 Q840 340 990 280" fill="none" stroke="rgba(160,120,60,0.25)" stroke-width="1.5"/>
  <rect x="980" y="200" width="14" height="220" rx="2" fill="rgba(230,210,160,0.55)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4b080" letter-spacing="4">PALAVRAS · DUPLA ORIGEM</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="34" font-weight="700" fill="#f2ebe0">papel de enrolar × tabaco</text>
  <text x="600" y="585" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="17" fill="#b8a888">planta americana · mortalha europeia</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
