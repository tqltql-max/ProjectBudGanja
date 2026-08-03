'use strict';

/** Capa 1200×630 — tempo (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/tempo-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/>
      <stop offset="50%" stop-color="#1a2228"/>
      <stop offset="100%" stop-color="#121820"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="46%" r="46%">
      <stop offset="0%" stop-color="rgba(150,170,210,0.24)"/>
      <stop offset="55%" stop-color="rgba(110,130,160,0.11)"/>
      <stop offset="100%" stop-color="rgba(20,24,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="330" rx="310" ry="200" fill="url(#glow)"/>
  <circle cx="600" cy="360" r="118" fill="none" stroke="rgba(180,200,225,0.5)" stroke-width="3"/>
  <circle cx="600" cy="360" r="4.5" fill="rgba(210,225,240,0.85)"/>
  <line x1="600" y1="360" x2="600" y2="280" stroke="rgba(210,225,240,0.85)" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="600" y1="360" x2="656" y2="392" stroke="rgba(210,225,240,0.7)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="600" cy="242" r="2.6" fill="rgba(180,200,225,0.55)"/>
  <circle cx="718" cy="360" r="2.6" fill="rgba(180,200,225,0.55)"/>
  <circle cx="600" cy="478" r="2.6" fill="rgba(180,200,225,0.55)"/>
  <circle cx="482" cy="360" r="2.6" fill="rgba(180,200,225,0.55)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8b8d8" letter-spacing="4">PALAVRAS · CRONOS · CLIMA · COMPASSO</text>
  <text x="600" y="222" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#eef2f8">Tempo</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,228,240,0.9)">kairós · chronos · o instante certo</text>
  <text x="600" y="546" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b0c0d8">faça o melhor com o tempo que se tem</text>
  <text x="600" y="586" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8898b0">sempre · passado · alma · gesto</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
