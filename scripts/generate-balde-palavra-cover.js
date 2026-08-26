'use strict';

/** Capa 1200×630 — palavra balde (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/balde-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1620"/>
      <stop offset="45%" stop-color="#152418"/>
      <stop offset="100%" stop-color="#0a1210"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(90,160,200,0.20)"/>
      <stop offset="45%" stop-color="rgba(124,179,66,0.14)"/>
      <stop offset="100%" stop-color="rgba(124,179,66,0)"/>
    </radialGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(120,190,220,0.55)"/>
      <stop offset="100%" stop-color="rgba(70,140,180,0.75)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="300" r="250" fill="url(#glow)"/>
  <!-- bucket body -->
  <path d="M455 250 L475 430 Q600 455 725 430 L745 250 Z" fill="rgba(40,55,48,0.95)" stroke="rgba(223,194,98,0.75)" stroke-width="6"/>
  <!-- water fill -->
  <path d="M475 310 L490 415 Q600 438 710 415 L725 310 Q600 330 475 310 Z" fill="url(#water)"/>
  <!-- rim -->
  <ellipse cx="600" cy="250" rx="145" ry="28" fill="none" stroke="rgba(223,194,98,0.85)" stroke-width="7"/>
  <!-- handle -->
  <path d="M470 255 Q600 140 730 255" fill="none" stroke="rgba(223,194,98,0.8)" stroke-width="8" stroke-linecap="round"/>
  <!-- drip -->
  <path d="M640 445 Q648 475 640 500" fill="none" stroke="rgba(120,190,220,0.7)" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="640" cy="508" rx="8" ry="5" fill="rgba(120,190,220,0.65)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#dfc262" letter-spacing="6">PALAVRAS · VOLUME E REGAR</text>
  <text x="600" y="545" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4efe6">balde</text>
  <text x="600" y="590" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">recipiente · baldear · cultivo · litros</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
