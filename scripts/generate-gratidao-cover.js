'use strict';

/** Capa 1200×630 — Gratidão (Palavras · qualidade · ≠ obrigado). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/gratidao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#140c08"/>
      <stop offset="48%" stop-color="#2a1810"/>
      <stop offset="100%" stop-color="#081410"/>
    </linearGradient>
    <radialGradient id="warm" cx="42%" cy="42%" r="48%">
      <stop offset="0%" stop-color="rgba(255,186,90,0.36)"/>
      <stop offset="55%" stop-color="rgba(180,110,40,0.12)"/>
      <stop offset="100%" stop-color="rgba(255,186,90,0)"/>
    </radialGradient>
    <radialGradient id="cool" cx="78%" cy="62%" r="40%">
      <stop offset="0%" stop-color="rgba(80,180,140,0.18)"/>
      <stop offset="100%" stop-color="rgba(80,180,140,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="480" cy="250" r="270" fill="url(#warm)"/>
  <circle cx="900" cy="400" r="230" fill="url(#cool)"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e8c898" letter-spacing="3.2">PALAVRAS · GRĀTUS · ≠ OBRIGADO</text>
  <text x="600" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#fff4e0">gratidão</text>
  <text x="600" y="312" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(240,220,190,0.94)">qualidade de grato · não fórmula</text>
  <!-- palma aberta (receber, não conta) -->
  <g transform="translate(300,430)" fill="none" stroke="#e8c090" stroke-width="2.4">
    <path d="M18,48 C8,40 6,22 18,16 C28,12 34,22 34,34 L34,70"/>
    <path d="M34,34 C36,12 48,8 54,22 L54,70"/>
    <path d="M54,28 C58,10 70,10 74,26 L74,70"/>
    <path d="M74,32 C80,16 92,18 94,34 L90,70"/>
    <path d="M18,70 C28,86 70,90 90,70"/>
  </g>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d8b888">grat- + -idão · o bem entrou</text>
  <text x="600" y="590" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#8fd4b0">faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
