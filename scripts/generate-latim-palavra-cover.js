'use strict';

/** Capa 1200×630 — palavra latim (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/latim-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1418"/>
      <stop offset="48%" stop-color="#122028"/>
      <stop offset="100%" stop-color="#080c0e"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="38%" r="52%">
      <stop offset="0%" stop-color="rgba(200,170,110,0.26)"/>
      <stop offset="55%" stop-color="rgba(80,60,30,0.10)"/>
      <stop offset="100%" stop-color="rgba(20,30,35,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(210,180,120,0)"/>
      <stop offset="50%" stop-color="rgba(210,180,120,0.55)"/>
      <stop offset="100%" stop-color="rgba(210,180,120,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="380" ry="200" fill="url(#glow)"/>
  <text x="430" y="278" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" fill="rgba(230,210,160,0.28)">SPQR</text>
  <ellipse cx="760" cy="250" rx="46" ry="38" fill="none" stroke="rgba(230,210,160,0.40)" stroke-width="3"/>
  <ellipse cx="818" cy="262" rx="22" ry="18" fill="none" stroke="rgba(230,210,160,0.32)" stroke-width="2.5"/>
  <circle cx="748" cy="242" r="4" fill="rgba(230,210,160,0.55)"/>
  <circle cx="772" cy="242" r="4" fill="rgba(230,210,160,0.55)"/>
  <path d="M790 236 Q818 220 838 228" fill="none" stroke="rgba(230,210,160,0.45)" stroke-width="2"/>
  <path d="M790 248 Q822 236 842 246" fill="none" stroke="rgba(230,210,160,0.35)" stroke-width="2"/>
  <rect x="280" y="338" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d4c08a" letter-spacing="4">PALAVRAS · LÍNGUA DO LÁCIO · SALA DO LATIM</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4efe4">latim</text>
  <text x="600" y="392" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,215,180,0.95)">a orelha cola latido · o cachorro</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4b07a">latīnus · latrāre · canis</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d4c08a">o étimo corta</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
