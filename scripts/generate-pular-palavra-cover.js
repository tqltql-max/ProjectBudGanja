'use strict';

/** Capa 1200×630 — pular (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/pular-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0c1410"/>
      <stop offset="50%" stop-color="#1a2820"/>
      <stop offset="100%" stop-color="#0a1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="55%" cy="45%" r="48%">
      <stop offset="0%" stop-color="rgba(160,220,120,0.32)"/>
      <stop offset="55%" stop-color="rgba(90,150,80,0.12)"/>
      <stop offset="100%" stop-color="rgba(30,50,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="660" cy="290" rx="300" ry="200" fill="url(#glow)"/>
  <path d="M380 420 Q520 180 680 280 Q820 360 920 220" fill="none" stroke="rgba(190,240,150,0.5)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="920" cy="220" r="12" fill="rgba(220,255,180,0.85)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8d878" letter-spacing="4">PALAVRAS · SALTO · OMISSÃO</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4ffe8">pular</text>
  <text x="600" y="320" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,240,200,0.95)">pullāre · pulo · pulinho · skip</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8d890">faça o melhor com o pulo certo</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a8d878">passar · backspace · já · caminho</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
