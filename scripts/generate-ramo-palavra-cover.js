'use strict';

/** Capa 1200×630 — ramo / branch (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/ramo-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c120e"/>
      <stop offset="48%" stop-color="#162418"/>
      <stop offset="100%" stop-color="#080a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="42%" cy="34%" r="48%">
      <stop offset="0%" stop-color="rgba(110,170,90,0.32)"/>
      <stop offset="60%" stop-color="rgba(50,90,40,0.10)"/>
      <stop offset="100%" stop-color="rgba(20,30,18,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(170,210,130,0)"/>
      <stop offset="50%" stop-color="rgba(170,210,130,0.50)"/>
      <stop offset="100%" stop-color="rgba(170,210,130,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="520" cy="230" rx="360" ry="190" fill="url(#glow)"/>
  <path d="M430 360 L430 170 L520 120 M430 220 L360 160 M430 260 L560 200" fill="none" stroke="rgba(180,220,140,0.40)" stroke-width="4"/>
  <rect x="280" y="372" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="80" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#b4d48a" letter-spacing="3">PALAVRAS · PLANTA PRIMEIRO · LINHA DE RASTO</text>
  <text x="600" y="330" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#eef8e8">ramo</text>
  <text x="600" y="420" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,235,200,0.95)">branch  ≠  brunch  ≠  Árvore da Vida</text>
  <text x="600" y="505" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#b8d49a">lat. ramus · ≠ árvore de trabalho</text>
  <text x="600" y="562" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#b4d48a">faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
