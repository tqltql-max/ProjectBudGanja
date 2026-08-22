'use strict';

/** Capa 1200×630 — Mara (Palavras · nome · maravilha · barquinho). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mara-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1408"/>
      <stop offset="42%" stop-color="#2a2212"/>
      <stop offset="100%" stop-color="#0c1820"/>
    </linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(80,140,170,0)"/>
      <stop offset="100%" stop-color="rgba(40,90,120,0.45)"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="48%">
      <stop offset="0%" stop-color="rgba(255,210,120,0.32)"/>
      <stop offset="55%" stop-color="rgba(180,140,70,0.10)"/>
      <stop offset="100%" stop-color="rgba(255,210,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="210" r="280" fill="url(#glow)"/>
  <rect x="0" y="430" width="1200" height="200" fill="url(#water)"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e8d8a8" letter-spacing="3.2">PALAVRAS · NOME · MARAVILHA</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="#fff4d6">MARA</text>
  <text x="600" y="318" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(240,230,200,0.92)">o nome que chegou · cola em maravilha</text>
  <!-- barquinho de papel -->
  <g transform="translate(600,430)">
    <polygon points="-78,18 0,-38 78,18 42,18 0,52 -42,18" fill="#fff6e4" opacity="0.95"/>
    <polygon points="-42,18 0,-8 42,18 0,52" fill="#e8d4a8" opacity="0.85"/>
    <line x1="-90" y1="58" x2="90" y2="58" stroke="rgba(200,230,240,0.35)" stroke-width="2"/>
    <line x1="-70" y1="72" x2="70" y2="72" stroke="rgba(200,230,240,0.22)" stroke-width="1.5"/>
  </g>
  <text x="600" y="560" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d8c090">barquinhos de papel</text>
  <text x="600" y="598" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#a8c8e0">faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
