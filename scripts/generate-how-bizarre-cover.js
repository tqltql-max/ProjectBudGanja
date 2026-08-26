'use strict';

/** Capa 1200×630 — Artes · How Bizarre (OMC). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/how-bizarre-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a0c18"/>
      <stop offset="38%" stop-color="#0a3d4a"/>
      <stop offset="72%" stop-color="#c45c3a"/>
      <stop offset="100%" stop-color="#f4c56a"/>
    </linearGradient>
    <radialGradient id="sun" cx="82%" cy="22%" r="32%">
      <stop offset="0%" stop-color="rgba(255,214,90,0.85)"/>
      <stop offset="100%" stop-color="rgba(255,214,90,0)"/>
    </radialGradient>
    <radialGradient id="glow" cx="28%" cy="58%" r="36%">
      <stop offset="0%" stop-color="rgba(94,200,255,0.28)"/>
      <stop offset="100%" stop-color="rgba(94,200,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="980" cy="140" r="200" fill="url(#sun)"/>
  <circle cx="320" cy="380" r="220" fill="url(#glow)"/>
  <ellipse cx="180" cy="520" rx="90" ry="18" fill="rgba(10,20,24,0.35)"/>
  <path d="M140 430 C150 300 210 250 240 430" fill="#0e2a28"/>
  <path d="M200 420 C210 280 280 230 310 430" fill="#163832"/>
  <path d="M260 425 C270 310 320 270 350 430" fill="#0e2a28"/>
  <path d="M160 520 L280 455 L420 500 L560 430 L720 490 L860 400 L1020 460 L1140 390" fill="none" stroke="rgba(244,197,106,0.45)" stroke-width="4"/>
  <path d="M220 470 H980 Q1000 470 1000 490 L980 510 H200 Q180 510 180 490 Q180 470 220 470 Z" fill="#1c1410" opacity="0.88"/>
  <ellipse cx="300" cy="510" rx="42" ry="16" fill="#0a0a0a"/>
  <ellipse cx="860" cy="510" rx="42" ry="16" fill="#0a0a0a"/>
  <path d="M260 470 Q360 430 520 448 Q700 430 900 455 L920 490 H240 Z" fill="#c9a36a" opacity="0.35"/>
  <path d="M760 210 Q790 140 820 210" fill="none" stroke="rgba(244,248,252,0.55)" stroke-width="5"/>
  <path d="M800 218 L808 268 L792 268 Z" fill="rgba(244,197,106,0.7)"/>
  <circle cx="810" cy="208" r="10" fill="none" stroke="rgba(244,248,252,0.7)" stroke-width="3"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#f6e27a" letter-spacing="6">ARTES · CANÇÃO 1995</text>
  <text x="600" y="522" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f4f8fc">How Bizarre</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#f0e4c8">OMC · Ōtara · nomear o estranho</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
