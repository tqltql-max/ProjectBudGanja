'use strict';

/** Capa 1200×630 — coração (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/coracao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#140810"/>
      <stop offset="48%" stop-color="#2a1020"/>
      <stop offset="100%" stop-color="#0a0810"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="55%" r="48%">
      <stop offset="0%" stop-color="rgba(220,70,100,0.42)"/>
      <stop offset="50%" stop-color="rgba(160,40,80,0.18)"/>
      <stop offset="100%" stop-color="rgba(80,20,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="340" rx="300" ry="220" fill="url(#glow)"/>
  <path d="M600 420 C600 420 480 340 480 280 C480 245 505 225 535 225 C565 225 590 250 600 270 C610 250 635 225 665 225 C695 225 720 245 720 280 C720 340 600 420 600 420 Z" fill="none" stroke="rgba(255,180,200,0.55)" stroke-width="3"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e890a8" letter-spacing="4">PALAVRAS · COR · CENTRO</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#ffe8ef">coração</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,200,210,0.95)">órgão · afeto · centro · coragem</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d890a8">faça o melhor de coração</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#e890a8">mãos · gesto · verdade</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
