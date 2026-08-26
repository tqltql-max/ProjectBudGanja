'use strict';

/** Capa 1200×630 — palavra verdade (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/verdade-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101820"/>
      <stop offset="45%" stop-color="#1a2218"/>
      <stop offset="100%" stop-color="#0c1410"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="38%">
      <stop offset="0%" stop-color="rgba(180,210,230,0.22)"/>
      <stop offset="55%" stop-color="rgba(223,194,98,0.12)"/>
      <stop offset="100%" stop-color="rgba(223,194,98,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="270" r="230" fill="url(#glow)"/>
  <!-- balance / lens mark -->
  <g fill="none" stroke="rgba(223,194,98,0.55)" stroke-width="4" stroke-linecap="round">
    <circle cx="600" cy="250" r="72"/>
    <circle cx="600" cy="250" r="28"/>
    <line x1="600" y1="178" x2="600" y2="160"/>
    <line x1="528" y1="250" x2="510" y2="250"/>
    <line x1="672" y1="250" x2="690" y2="250"/>
    <line x1="600" y1="322" x2="600" y2="340"/>
  </g>
  <path d="M560 360 L600 400 L700 300" fill="none" stroke="rgba(124,179,66,0.85)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#dfc262" letter-spacing="7">PALAVRAS · VERIFICAR</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4efe6">verdade</text>
  <text x="600" y="555" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">vērĭtās · método · evidência · limite</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
