'use strict';

/** Capa 1200×630 — multitask (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/multitask-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10141c"/>
      <stop offset="50%" stop-color="#151c28"/>
      <stop offset="100%" stop-color="#0a0e14"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="44%">
      <stop offset="0%" stop-color="rgba(100,160,220,0.22)"/>
      <stop offset="100%" stop-color="rgba(100,160,220,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="250" fill="url(#glow)"/>
  <text x="600" y="85" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#8ab4e0" letter-spacing="3">PALAVRAS · EMPRÉSTIMO · CORRECÇÃO</text>
  <text x="600" y="255" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#e8f0ff">multitask</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(180,200,230,0.95)">multitarefa · parece ≠ é</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#a8c0d8">uma coisa com método</text>
  <text x="600" y="545" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8ab4e0">anti-hype · faça o melhor neste gesto</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
