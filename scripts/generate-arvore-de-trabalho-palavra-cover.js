'use strict';

/** Capa 1200×630 — árvore de trabalho / work tree (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/arvore-de-trabalho-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1410"/>
      <stop offset="48%" stop-color="#122018"/>
      <stop offset="100%" stop-color="#070c08"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="50%">
      <stop offset="0%" stop-color="rgba(90,170,110,0.30)"/>
      <stop offset="55%" stop-color="rgba(40,80,50,0.10)"/>
      <stop offset="100%" stop-color="rgba(20,30,22,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(140,200,150,0)"/>
      <stop offset="50%" stop-color="rgba(140,200,150,0.50)"/>
      <stop offset="100%" stop-color="rgba(140,200,150,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="240" rx="380" ry="200" fill="url(#glow)"/>
  <path d="M600 150 L600 340" fill="none" stroke="rgba(160,210,170,0.35)" stroke-width="4"/>
  <path d="M600 200 L520 260 M600 200 L680 260 M600 250 L540 310 M600 250 L660 310" fill="none" stroke="rgba(160,210,170,0.28)" stroke-width="3"/>
  <rect x="280" y="360" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#8fd4a0" letter-spacing="3">PALAVRAS · GIT · CHÃO DE FICHEIROS</text>
  <text x="600" y="318" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#e8f8ee">work tree</text>
  <text x="600" y="408" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(200,230,210,0.95)">árvore de trabalho  ≠  work three</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#98d0b0">working tree · ≠ worktree extra · ≠ Árvore da Vida</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8fd4a0">a orelha cola · o étimo corta</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
