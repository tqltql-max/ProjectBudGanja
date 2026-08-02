'use strict';

/** Capa 1200×630 — Artes · Águas do Mar e Lágrimas. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/aguas-e-lagrimas-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#0a1520"/>
      <stop offset="55%" stop-color="#163048"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <linearGradient id="wave" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(120,180,210,0.35)"/>
      <stop offset="100%" stop-color="rgba(40,80,110,0.15)"/>
    </linearGradient>
    <linearGradient id="tear" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(210,230,245,0.9)"/>
      <stop offset="100%" stop-color="rgba(90,140,180,0.55)"/>
    </linearGradient>
    <radialGradient id="moon" cx="72%" cy="28%" r="18%">
      <stop offset="0%" stop-color="rgba(230,220,190,0.35)"/>
      <stop offset="100%" stop-color="rgba(230,220,190,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="860" cy="170" r="140" fill="url(#moon)"/>
  <path d="M0 380 Q150 340 300 380 T600 380 T900 380 T1200 380 L1200 630 L0 630 Z" fill="url(#wave)"/>
  <path d="M0 430 Q200 400 400 440 T800 420 T1200 450 L1200 630 L0 630 Z" fill="rgba(20,50,70,0.45)"/>
  <path d="M320 160 C280 250 260 320 260 370 C260 420 290 455 320 455 C350 455 380 420 380 370 C380 320 360 250 320 160 Z" fill="url(#tear)" stroke="rgba(220,235,250,0.4)" stroke-width="2"/>
  <ellipse cx="305" cy="290" rx="9" ry="16" fill="rgba(255,255,255,0.35)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#8ec4e0" letter-spacing="7">ARTES · POESIA ORIGINAL</text>
  <text x="600" y="530" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="38" font-weight="700" fill="#f0f4f8">Águas do Mar e Lágrimas</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#b8c8d4">mesmo sal · mesmo chamado · ficar</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
