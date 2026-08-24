'use strict';

/** Capa 1200×630 — palavra dor (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/dor-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#140f10"/>
      <stop offset="48%" stop-color="#1c1416"/>
      <stop offset="100%" stop-color="#0c090a"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="40%" r="50%">
      <stop offset="0%" stop-color="rgba(200,140,130,0.26)"/>
      <stop offset="55%" stop-color="rgba(90,50,50,0.10)"/>
      <stop offset="100%" stop-color="rgba(35,20,20,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(200,150,140,0)"/>
      <stop offset="50%" stop-color="rgba(200,150,140,0.55)"/>
      <stop offset="100%" stop-color="rgba(200,150,140,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="380" ry="200" fill="url(#glow)"/>
  <rect x="280" y="338" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d0a090" letter-spacing="4">PALAVRAS · DOLŌREM · DOLĒRE</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="#f8ece8">dor</text>
  <text x="600" y="392" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,190,180,0.95)">doer dói · doído × doido · labravra</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c09080">pain ← poena · não esta casa</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d0a090">o étimo corta</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
