'use strict';

/** Capa 1200×630 — tudo (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/tudo-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0c1018"/>
      <stop offset="50%" stop-color="#182030"/>
      <stop offset="100%" stop-color="#101810"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="48%">
      <stop offset="0%" stop-color="rgba(140,180,220,0.2)"/>
      <stop offset="55%" stop-color="rgba(100,140,120,0.1)"/>
      <stop offset="100%" stop-color="rgba(20,30,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="320" rx="340" ry="220" fill="url(#glow)"/>
  <circle cx="600" cy="330" r="90" fill="none" stroke="rgba(180,210,230,0.35)" stroke-width="3"/>
  <circle cx="600" cy="330" r="50" fill="none" stroke="rgba(160,200,160,0.4)" stroke-width="3"/>
  <circle cx="600" cy="330" r="12" fill="rgba(200,220,180,0.6)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8c0d8" letter-spacing="4">PALAVRAS · TOTALIDADE · FOCO</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="84" font-weight="700" fill="#f0f4f8">tudo</text>
  <text x="600" y="310" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,230,240,0.95)">totus · inteireza · o essencial</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8d0c0">faça o melhor neste tudo que cabe</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#90a8c0">objetos · alma · vida</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
