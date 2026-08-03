'use strict';

/** Capa 1200×630 — sempre (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/sempre-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1018"/>
      <stop offset="50%" stop-color="#1a2438"/>
      <stop offset="100%" stop-color="#0a0e14"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="50%">
      <stop offset="0%" stop-color="rgba(180,200,255,0.28)"/>
      <stop offset="55%" stop-color="rgba(100,120,180,0.12)"/>
      <stop offset="100%" stop-color="rgba(30,40,60,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="300" rx="340" ry="210" fill="url(#glow)"/>
  <circle cx="600" cy="300" r="90" fill="none" stroke="rgba(200,220,255,0.45)" stroke-width="3"/>
  <circle cx="600" cy="300" r="140" fill="none" stroke="rgba(160,180,230,0.22)" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8b8e0" letter-spacing="4">PALAVRAS · DURAÇÃO · HÁBITO</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f0f4ff">sempre</text>
  <text x="600" y="320" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(210,220,245,0.95)">semper · constância · nem sempre</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8c8e8">faça o melhor sempre que puder</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a8b8e0">já · prosseguir · caminho · verdade</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
