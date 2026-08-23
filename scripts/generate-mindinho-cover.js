'use strict';

/** Capa 1200×630 — mindinho (Expressões · parlenda dos cinco). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mindinho-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="55%" stop-color="#12100e"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="48%">
      <stop offset="0%" stop-color="rgba(210,150,70,0.28)"/>
      <stop offset="100%" stop-color="rgba(12,10,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="280" rx="420" ry="200" fill="url(#glow)"/>
  <rect x="268" y="268" width="44" height="88" rx="14" fill="rgba(220,170,90,0.95)"/>
  <rect x="338" y="228" width="48" height="128" rx="14" fill="rgba(200,155,80,0.88)"/>
  <rect x="414" y="188" width="52" height="168" rx="15" fill="rgba(230,185,100,0.92)"/>
  <rect x="494" y="208" width="50" height="148" rx="15" fill="rgba(190,145,75,0.88)"/>
  <rect x="572" y="248" width="70" height="108" rx="22" fill="rgba(160,110,55,0.9)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#d8b070" letter-spacing="2.5">EXPRESSÕES · PARLENDA · MINDINHO × MUNDINHO × MUDINHO</text>
  <text x="600" y="148" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4eee4">mindinho</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="17" fill="rgba(220,210,190,0.95)">seu vizinho · pai de todos · fura-bolo · mata-piolho</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c8b080">a orelha cola o mundinho; o étimo corta o dedo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
