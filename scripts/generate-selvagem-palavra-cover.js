'use strict';

/** Capa 1200×630 — selvagem (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/selvagem-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a140c"/>
      <stop offset="45%" stop-color="#1a2e18"/>
      <stop offset="100%" stop-color="#0c100e"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="42%" r="52%">
      <stop offset="0%" stop-color="rgba(90,160,70,0.28)"/>
      <stop offset="55%" stop-color="rgba(40,90,50,0.12)"/>
      <stop offset="100%" stop-color="rgba(20,40,25,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="560" cy="290" rx="380" ry="240" fill="url(#glow)"/>
  <!-- stilized tree / silva -->
  <path d="M720 480 L720 340 L680 300 L720 280 L760 300 L720 340" fill="none" stroke="rgba(120,180,90,0.45)" stroke-width="3"/>
  <ellipse cx="720" cy="250" rx="70" ry="90" fill="rgba(50,110,55,0.4)"/>
  <ellipse cx="690" cy="220" rx="45" ry="55" fill="rgba(40,95,45,0.35)"/>
  <ellipse cx="755" cy="230" rx="40" ry="50" fill="rgba(55,120,60,0.32)"/>
  <!-- stilized wild silhouette (low contrast) -->
  <ellipse cx="420" cy="380" rx="70" ry="28" fill="rgba(30,50,30,0.45)"/>
  <ellipse cx="400" cy="350" rx="35" ry="22" fill="rgba(35,55,35,0.5)"/>
  <circle cx="385" cy="340" r="8" fill="rgba(180,200,120,0.25)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#8ec070" letter-spacing="4">PALAVRAS · SILVA · NATUREZA</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#e4f2d8">selvagem</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,240,200,0.95)">silva · silvaticus · selvagem × domesticado</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#a0c878">faça o melhor na margem da mata</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8ec070">planta · animal · inseto · sem romantizar dano</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
