'use strict';

/** Capa 1200×630 — objetos (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/objetos-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0e1218"/>
      <stop offset="50%" stop-color="#1a2030"/>
      <stop offset="100%" stop-color="#101410"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="45%">
      <stop offset="0%" stop-color="rgba(120,160,200,0.22)"/>
      <stop offset="55%" stop-color="rgba(80,120,100,0.1)"/>
      <stop offset="100%" stop-color="rgba(20,30,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="310" rx="300" ry="200" fill="url(#glow)"/>
  <rect x="420" y="340" width="70" height="70" rx="6" fill="none" stroke="rgba(180,200,220,0.5)" stroke-width="3"/>
  <circle cx="560" cy="375" r="34" fill="none" stroke="rgba(160,190,160,0.5)" stroke-width="3"/>
  <polygon points="640,410 690,340 740,410" fill="none" stroke="rgba(200,180,140,0.5)" stroke-width="3"/>
  <rect x="780" y="350" width="55" height="55" rx="28" fill="none" stroke="rgba(180,160,200,0.45)" stroke-width="3"/>
  <line x1="300" y1="450" x2="900" y2="450" stroke="rgba(140,160,180,0.25)" stroke-width="2"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8c0d8" letter-spacing="4">PALAVRAS · FOCO · META-LAB</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f0f4f8">objetos</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,230,240,0.95)">obiectum · o que fica diante · inspeção</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8d0c0">faça o melhor neste objeto</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#90a8c0">verdade · caminho · gesto</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
