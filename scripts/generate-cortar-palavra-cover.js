'use strict';

/** Capa 1200×630 — cortar (o étimo corta). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes', 'cortar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14100c"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="40%" r="40%">
      <stop offset="0%" stop-color="rgba(232,176,80,0.28)"/>
      <stop offset="100%" stop-color="rgba(12,16,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="580" cy="240" rx="300" ry="160" fill="url(#glow)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8b050" letter-spacing="6">PALAVRAS · CURTĀRE / CURTUS</text>
  <line x1="220" y1="210" x2="980" y2="390" stroke="#5eb8ff" stroke-width="3" stroke-opacity="0.35"/>
  <line x1="200" y1="180" x2="1000" y2="420" stroke="#e8b050" stroke-width="8" stroke-linecap="square"/>
  <text x="600" y="340" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="#f4efe6">cortar</text>
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c8b8a0">o étimo corta o que a orelha cola</text>
  <text x="600" y="480" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#9aa7b6">≠ colar ≠ tesoura-caedere · Valeu !!!</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
