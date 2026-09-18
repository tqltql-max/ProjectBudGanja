'use strict';

/** Capa 1200×630 — palavra craque (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/craque-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/>
      <stop offset="48%" stop-color="#1a1612"/>
      <stop offset="100%" stop-color="#08090a"/>
    </linearGradient>
    <radialGradient id="glow" cx="36%" cy="42%" r="48%">
      <stop offset="0%" stop-color="rgba(90,200,120,0.28)"/>
      <stop offset="55%" stop-color="rgba(40,80,50,0.1)"/>
      <stop offset="100%" stop-color="rgba(20,24,20,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="72%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(180,140,90,0.22)"/>
      <stop offset="100%" stop-color="rgba(20,16,12,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(160,180,150,0)"/>
      <stop offset="50%" stop-color="rgba(160,180,150,0.5)"/>
      <stop offset="100%" stop-color="rgba(160,180,150,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="430" cy="250" rx="280" ry="180" fill="url(#glow)"/>
  <ellipse cx="820" cy="290" rx="240" ry="160" fill="url(#glow2)"/>
  <path d="M520 120 L640 310 L500 300 Z" fill="rgba(210,200,180,0.14)"/>
  <path d="M200 380 Q400 300 600 390 T1000 360" fill="none" stroke="rgba(220,210,190,0.35)" stroke-width="3"/>
  <rect x="280" y="348" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9ec8a8" letter-spacing="4">PALAVRAS · CRACK · PEDRA</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4fff6">craque</text>
  <text x="600" y="402" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,220,200,0.95)">excelência no campo · a orelha cola a droga</text>
  <text x="600" y="508" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c8b898">pedra mineral × pedra-gíria</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#9ec8a8">o étimo corta</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
