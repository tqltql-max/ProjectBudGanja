'use strict';

/** Capa 1200×630 — VEVO (Canais · videoclipes oficiais). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/vevo-canal-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0618"/>
      <stop offset="40%" stop-color="#1a0a28"/>
      <stop offset="100%" stop-color="#2a1020"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="28%" r="42%">
      <stop offset="0%" stop-color="rgba(232,72,96,0.45)"/>
      <stop offset="100%" stop-color="rgba(20,10,30,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="22%" cy="70%" r="35%">
      <stop offset="0%" stop-color="rgba(90,140,255,0.28)"/>
      <stop offset="100%" stop-color="rgba(20,10,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="880" cy="160" rx="220" ry="150" fill="url(#glow)"/>
  <ellipse cx="240" cy="460" rx="180" ry="120" fill="url(#glow2)"/>
  <circle cx="520" cy="300" r="70" fill="rgba(255,255,255,0.06)"/>
  <circle cx="560" cy="270" r="36" fill="rgba(255,200,210,0.12)"/>
  <path d="M60 540 C260 480, 460 580, 660 520 C860 460, 1060 560, 1200 510" fill="none" stroke="rgba(255,160,180,0.32)" stroke-width="5"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#f0b8c4" letter-spacing="4">CANAIS · VIDEOCLIPES · VEVO</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#fff5f7">VEVO</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(255,235,240,0.92)">@VEVO · Three Little Birds · Artes / Rádio</text>
  <text x="600" y="550" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#d4a0ac">rede oficial · clipes licenciados · YouTube</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
