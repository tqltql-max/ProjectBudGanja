'use strict';

/** Capa 1200×630 — Artes · Bitter Sweet Symphony (The Verve). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/bitter-sweet-symphony-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1208"/>
      <stop offset="48%" stop-color="#3d2a12"/>
      <stop offset="100%" stop-color="#0d1a22"/>
    </linearGradient>
    <radialGradient id="gold" cx="28%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(244,197,106,0.42)"/>
      <stop offset="100%" stop-color="rgba(244,197,106,0)"/>
    </radialGradient>
    <radialGradient id="blue" cx="78%" cy="58%" r="38%">
      <stop offset="0%" stop-color="rgba(94,200,255,0.22)"/>
      <stop offset="100%" stop-color="rgba(94,200,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="340" cy="240" r="250" fill="url(#gold)"/>
  <circle cx="920" cy="380" r="230" fill="url(#blue)"/>
  <path d="M80 420 C180 280 260 500 360 340 C460 180 540 480 640 320 C740 160 820 460 920 300 C1020 140 1100 400 1180 260" fill="none" stroke="rgba(244,197,106,0.45)" stroke-width="3"/>
  <path d="M80 450 C180 310 260 530 360 370 C460 210 540 510 640 350 C740 190 820 490 920 330 C1020 170 1100 430 1180 290" fill="none" stroke="rgba(200,244,255,0.22)" stroke-width="2"/>
  <ellipse cx="600" cy="300" rx="70" ry="160" fill="none" stroke="rgba(244,197,106,0.35)" stroke-width="4"/>
  <ellipse cx="600" cy="300" rx="40" ry="120" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#f6e27a" letter-spacing="6">ARTES · CANÇÃO 1997</text>
  <text x="600" y="518" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="38" font-weight="700" fill="#f4f8fc">Bitter Sweet Symphony</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#e8d7b0">The Verve · Urban Hymns · doce e amargo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
