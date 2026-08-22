'use strict';

/** Capa 1200×630 — ausdhuashduas (Expressões · riso online). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/ausdhuashduas-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1218"/>
      <stop offset="45%" stop-color="#2a1c28"/>
      <stop offset="100%" stop-color="#0e0a10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="50%">
      <stop offset="0%" stop-color="rgba(255,180,120,0.26)"/>
      <stop offset="100%" stop-color="rgba(255,180,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="230" r="270" fill="url(#glow)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#f0b878" letter-spacing="4">EXPRESSÕES · RISO ONLINE BR</text>
  <text x="600" y="255" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#fff4e8">ausdhuashduas</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(235,210,190,0.95)">lab name — substitui kkkk… e «risas online»</text>
  <text x="600" y="490" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d0b090">depois do riso — faça o melhor</text>
  <text x="600" y="555" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#f0b878">aff · ausdhuashduas · jesusamado · meudeusdoceu</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
