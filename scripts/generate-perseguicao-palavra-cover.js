'use strict';

/** Capa 1200×630 — perseguição (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/perseguicao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#140a0c"/>
      <stop offset="45%" stop-color="#2a1218"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="42%" r="46%">
      <stop offset="0%" stop-color="rgba(220,90,80,0.28)"/>
      <stop offset="55%" stop-color="rgba(120,40,50,0.12)"/>
      <stop offset="100%" stop-color="rgba(20,10,14,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="860" cy="280" rx="280" ry="190" fill="url(#glow)"/>
  <path d="M180 420 L340 300 L500 380 L660 240 L820 320 L980 180" fill="none" stroke="rgba(255,180,160,0.35)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="980" cy="180" r="10" fill="rgba(255,200,180,0.7)"/>
  <circle cx="340" cy="300" r="7" fill="rgba(255,160,140,0.45)"/>
  <circle cx="660" cy="240" r="7" fill="rgba(255,160,140,0.45)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8a090" letter-spacing="4">PALAVRAS · CAÇA · OPRESSÃO</text>
  <text x="600" y="220" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="54" font-weight="700" fill="#faf0ee">perseguição</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(235,200,190,0.95)">persequī · seguir que aperta</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d8a898">nomear · sair · fazer o melhor</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#e8a090">prosseguir · caminho · risco · EXIT</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
