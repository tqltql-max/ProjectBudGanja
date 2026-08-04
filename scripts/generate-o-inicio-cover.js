'use strict';

/** Capa 1200×630 — Artes · O Início (cultivo / semente). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/o-inicio-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.15" y2="1">
      <stop offset="0%" stop-color="#0c1810"/>
      <stop offset="45%" stop-color="#1a3a22"/>
      <stop offset="100%" stop-color="#0a100c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="28%">
      <stop offset="0%" stop-color="rgba(190,210,90,0.28)"/>
      <stop offset="100%" stop-color="rgba(190,210,90,0)"/>
    </radialGradient>
    <linearGradient id="seed" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c4a574"/>
      <stop offset="100%" stop-color="#7a5a32"/>
    </linearGradient>
    <linearGradient id="root" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(230,220,190,0.85)"/>
      <stop offset="100%" stop-color="rgba(180,160,120,0.35)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="180" fill="url(#glow)"/>
  <ellipse cx="600" cy="250" rx="42" ry="58" fill="url(#seed)" stroke="rgba(240,220,170,0.35)" stroke-width="2"/>
  <ellipse cx="585" cy="230" rx="8" ry="14" fill="rgba(255,255,255,0.18)"/>
  <path d="M600 308 C595 340 590 380 592 430 C594 470 600 510 600 540" fill="none" stroke="url(#root)" stroke-width="4" stroke-linecap="round"/>
  <path d="M600 340 C560 360 540 400 530 450" fill="none" stroke="rgba(200,180,140,0.4)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M600 360 C640 380 655 420 665 470" fill="none" stroke="rgba(200,180,140,0.4)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M560 200 C570 160 590 130 600 110 C610 130 630 160 640 200" fill="none" stroke="rgba(120,180,90,0.55)" stroke-width="3" stroke-linecap="round"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#9ec47a" letter-spacing="7">ARTES · POESIA ORIGINAL</text>
  <text x="600" y="545" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f0f4e8">O Início</text>
  <text x="600" y="585" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#b8c8a8">semente · luz · fundação · ficar</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
