'use strict';

/** Capa 1200×630 — Enter (Palavras · intrāre × bem-vindos!!!). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/enter-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1210"/>
      <stop offset="45%" stop-color="#141c16"/>
      <stop offset="100%" stop-color="#0a1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="42%" r="42%">
      <stop offset="0%" stop-color="rgba(232,210,140,0.32)"/>
      <stop offset="55%" stop-color="rgba(124,179,66,0.10)"/>
      <stop offset="100%" stop-color="rgba(12,18,16,0)"/>
    </radialGradient>
    <linearGradient id="door" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(232,210,140,0.50)"/>
      <stop offset="100%" stop-color="rgba(124,179,66,0.28)"/>
    </linearGradient>
    <linearGradient id="key" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a3230"/>
      <stop offset="100%" stop-color="#1a201e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="420" cy="250" r="230" fill="url(#glow)"/>
  <!-- doorway -->
  <rect x="250" y="138" width="150" height="268" rx="6" fill="none" stroke="rgba(232,210,140,0.78)" stroke-width="8"/>
  <rect x="268" y="160" width="114" height="224" fill="url(#door)" opacity="0.55"/>
  <circle cx="360" cy="278" r="6" fill="rgba(232,210,140,0.92)"/>
  <!-- path into door -->
  <g stroke="rgba(124,179,66,0.42)" stroke-width="3" stroke-linecap="round" fill="none">
    <path d="M720 430 C600 400, 520 340, 418 290"/>
    <path d="M740 460 C620 420, 540 360, 430 320"/>
  </g>
  <!-- Enter key -->
  <rect x="760" y="188" width="280" height="168" rx="18" fill="url(#key)" stroke="rgba(200,220,170,0.7)" stroke-width="4"/>
  <rect x="772" y="200" width="256" height="144" rx="12" fill="none" stroke="rgba(232,210,140,0.28)" stroke-width="1.5"/>
  <text x="900" y="268" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="rgba(180,200,160,0.9)" letter-spacing="6">↵  RETURN</text>
  <text x="900" y="328" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="700" fill="#f4efe6" letter-spacing="4">ENTER</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c9a227" letter-spacing="5">PALAVRAS · INTRARE · BEM-VINDOS</text>
  <text x="420" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4efe4">Enter</text>
  <text x="420" y="518" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="rgba(232,210,140,0.95)">bem-vindos!!!</text>
  <text x="600" y="578" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.9)">tecla × verbo × limiar · ≠ EXIT · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
