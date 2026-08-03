'use strict';

/** Capa 1200×630 — pattern (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/pattern-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/>
      <stop offset="50%" stop-color="#1a2228"/>
      <stop offset="100%" stop-color="#121820"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="44%">
      <stop offset="0%" stop-color="rgba(120,170,150,0.22)"/>
      <stop offset="55%" stop-color="rgba(90,130,120,0.1)"/>
      <stop offset="100%" stop-color="rgba(20,30,28,0)"/>
    </radialGradient>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="8" cy="8" r="2.2" fill="rgba(160,190,170,0.28)"/>
      <circle cx="28" cy="28" r="1.6" fill="rgba(140,170,160,0.18)"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#dots)" opacity="0.55"/>
  <ellipse cx="600" cy="330" rx="300" ry="190" fill="url(#glow)"/>
  <rect x="420" y="350" width="60" height="60" rx="4" fill="none" stroke="rgba(160,200,180,0.45)" stroke-width="2.5"/>
  <rect x="500" y="350" width="60" height="60" rx="4" fill="none" stroke="rgba(160,200,180,0.35)" stroke-width="2.5"/>
  <rect x="580" y="350" width="60" height="60" rx="4" fill="none" stroke="rgba(160,200,180,0.45)" stroke-width="2.5"/>
  <rect x="660" y="350" width="60" height="60" rx="4" fill="none" stroke="rgba(160,200,180,0.35)" stroke-width="2.5"/>
  <rect x="740" y="350" width="40" height="60" rx="4" fill="none" stroke="rgba(160,200,180,0.25)" stroke-width="2.5"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8c8b8" letter-spacing="4">PALAVRAS · MOLDE · REPETIÇÃO</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#eef6f2">Pattern</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,235,228,0.95)">padrão · molde · design pattern</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8d0c4">faça o melhor com o molde certo</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#88a898">gesto · caminho · verdade</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
