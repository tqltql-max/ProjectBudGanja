'use strict';

/** Capa 1200×630 — palavra criatividade (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/criatividade-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="40%" stop-color="#2a2418"/>
      <stop offset="100%" stop-color="#0e1812"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="36%">
      <stop offset="0%" stop-color="rgba(223,194,98,0.28)"/>
      <stop offset="100%" stop-color="rgba(223,194,98,0)"/>
    </radialGradient>
    <linearGradient id="sprout" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="rgba(124,179,66,0.75)"/>
      <stop offset="100%" stop-color="rgba(200,230,140,0.9)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="280" r="220" fill="url(#glow)"/>
  <!-- spark / idea rays -->
  <g stroke="rgba(223,194,98,0.45)" stroke-width="3" stroke-linecap="round">
    <line x1="600" y1="120" x2="600" y2="160"/>
    <line x1="480" y1="180" x2="510" y2="210"/>
    <line x1="720" y1="180" x2="690" y2="210"/>
    <line x1="440" y1="280" x2="480" y2="280"/>
    <line x1="760" y1="280" x2="720" y2="280"/>
  </g>
  <!-- sprout from soil -->
  <ellipse cx="600" cy="420" rx="140" ry="28" fill="rgba(80,60,40,0.55)"/>
  <path d="M600 420 C590 360 560 320 540 280" fill="none" stroke="url(#sprout)" stroke-width="8" stroke-linecap="round"/>
  <path d="M600 420 C610 360 640 320 660 280" fill="none" stroke="url(#sprout)" stroke-width="8" stroke-linecap="round"/>
  <ellipse cx="535" cy="270" rx="28" ry="16" transform="rotate(-35 535 270)" fill="rgba(124,179,66,0.85)"/>
  <ellipse cx="665" cy="270" rx="28" ry="16" transform="rotate(35 665 270)" fill="rgba(124,179,66,0.85)"/>
  <circle cx="600" cy="250" r="10" fill="rgba(223,194,98,0.85)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#dfc262" letter-spacing="7">PALAVRAS · FAZER NASCER</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4efe6">criatividade</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">creāre · cultivo · método · Vida</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
