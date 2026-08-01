'use strict';

/** Capa 1200×630 — palavra animal (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/animal-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#142018"/>
      <stop offset="45%" stop-color="#1e3a28"/>
      <stop offset="100%" stop-color="#0c120e"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="55%" r="32%">
      <stop offset="0%" stop-color="rgba(109,184,92,0.28)"/>
      <stop offset="100%" stop-color="rgba(109,184,92,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="860" cy="340" r="200" fill="url(#glow)"/>
  <path d="M780 420 C810 300 900 260 940 340 C970 400 920 460 860 450 C820 442 790 460 780 420 Z" fill="rgba(244,255,248,0.08)" stroke="rgba(159,212,192,0.35)" stroke-width="3"/>
  <circle cx="900" cy="320" r="10" fill="rgba(244,255,248,0.55)"/>
  <path d="M200 480 Q360 200 520 480" fill="none" stroke="rgba(125,214,140,0.18)" stroke-width="8" stroke-linecap="round"/>
  <text x="600" y="160" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9fd4c0" letter-spacing="8">PALAVRAS · ALENTO</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4fff8">animal</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0e0d8">anima · vivo · duplo sentido</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
