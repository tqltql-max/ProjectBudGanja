'use strict';

/** Capa 1200×630 — cinzeiro (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/cinzeiro-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0e0e10"/>
      <stop offset="50%" stop-color="#1a1816"/>
      <stop offset="100%" stop-color="#12100e"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="55%" r="42%">
      <stop offset="0%" stop-color="rgba(200,120,60,0.22)"/>
      <stop offset="50%" stop-color="rgba(120,100,70,0.12)"/>
      <stop offset="100%" stop-color="rgba(30,30,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="340" rx="280" ry="180" fill="url(#glow)"/>
  <ellipse cx="600" cy="400" rx="120" ry="36" fill="none" stroke="rgba(180,170,150,0.55)" stroke-width="4"/>
  <ellipse cx="600" cy="388" rx="90" ry="24" fill="rgba(60,55,50,0.7)" stroke="rgba(160,150,130,0.4)" stroke-width="2"/>
  <circle cx="560" cy="385" r="5" fill="rgba(140,140,140,0.7)"/>
  <circle cx="590" cy="390" r="4" fill="rgba(120,120,120,0.65)"/>
  <circle cx="620" cy="386" r="3" fill="rgba(100,100,100,0.6)"/>
  <path d="M640 370 Q660 340 655 310" fill="none" stroke="rgba(220,140,70,0.45)" stroke-width="2"/>
  <path d="M650 365 Q675 330 670 300" fill="none" stroke="rgba(200,120,60,0.3)" stroke-width="2"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c0b090" letter-spacing="4">PALAVRAS · CINZA · FOGO</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f0ebe0">cinzeiro</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">cinza + -eiro · recipiente · contenção</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c8b8a0">faça o melhor no fim do fogo</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a89878">fogo · gesto · risco</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
