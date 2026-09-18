'use strict';

/** Capa 1200×630 — Artes · The Rolling Stones (nome × pedra). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/rolling-stones-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12080a"/>
      <stop offset="48%" stop-color="#1c1014"/>
      <stop offset="100%" stop-color="#2a1810"/>
    </linearGradient>
    <radialGradient id="glow" cx="58%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(200,60,50,0.28)"/>
      <stop offset="70%" stop-color="rgba(80,30,24,0.08)"/>
      <stop offset="100%" stop-color="rgba(20,10,10,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(220,90,70,0)"/>
      <stop offset="50%" stop-color="rgba(220,90,70,0.55)"/>
      <stop offset="100%" stop-color="rgba(220,90,70,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="720" cy="220" rx="340" ry="180" fill="url(#glow)"/>
  <ellipse cx="340" cy="390" rx="54" ry="36" fill="none" stroke="rgba(210,180,150,0.45)" stroke-width="3" transform="rotate(-18 340 390)"/>
  <ellipse cx="470" cy="360" rx="62" ry="40" fill="none" stroke="rgba(210,180,150,0.38)" stroke-width="3" transform="rotate(12 470 360)"/>
  <ellipse cx="620" cy="400" rx="70" ry="42" fill="none" stroke="rgba(210,180,150,0.50)" stroke-width="3" transform="rotate(-8 620 400)"/>
  <ellipse cx="780" cy="350" rx="58" ry="34" fill="none" stroke="rgba(210,180,150,0.32)" stroke-width="3" transform="rotate(22 780 350)"/>
  <path d="M260 420 C380 300, 540 460, 700 310 C820 220, 940 340, 1040 280" fill="none" stroke="rgba(220,90,70,0.35)" stroke-width="3"/>
  <rect x="220" y="448" width="760" height="2" fill="url(#bar)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e0a090" letter-spacing="4">ARTES · BANDA 1962 · NOME PRIMEIRO</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f6eee8">The Rolling Stones</text>
  <text x="600" y="318" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(236,220,210,0.95)">stone  ≠  πέτρα  ·  rock  ≠  rocha</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#e8c8b8">provérbio → Muddy Waters → Londres</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#e0a090">a orelha cola pedras · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
