'use strict';

/** Capa 1200×630 — palavra sinal (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/sinal-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14181f"/>
      <stop offset="45%" stop-color="#1e2a38"/>
      <stop offset="100%" stop-color="#0c1016"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="42%" r="32%">
      <stop offset="0%" stop-color="rgba(255,196,72,0.28)"/>
      <stop offset="100%" stop-color="rgba(255,196,72,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="860" cy="250" r="200" fill="url(#glow)"/>
  <!-- traffic light silhouette -->
  <rect x="780" y="160" width="90" height="220" rx="18" fill="rgba(20,28,36,0.85)" stroke="rgba(180,200,220,0.35)" stroke-width="3"/>
  <circle cx="825" cy="210" r="22" fill="rgba(220,70,60,0.85)"/>
  <circle cx="825" cy="270" r="22" fill="rgba(240,190,60,0.90)"/>
  <circle cx="825" cy="330" r="22" fill="rgba(70,180,100,0.55)"/>
  <rect x="812" y="380" width="26" height="90" rx="4" fill="rgba(140,160,180,0.35)"/>
  <!-- wave / mark stroke -->
  <path d="M180 420 Q320 280 460 400 T740 380" fill="none" stroke="rgba(255,196,72,0.18)" stroke-width="8" stroke-linecap="round"/>
  <path d="M200 460 Q340 340 480 450 T760 430" fill="none" stroke="rgba(140,190,220,0.12)" stroke-width="5" stroke-linecap="round"/>
  <text x="600" y="150" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#c9d8e8" letter-spacing="8">PALAVRAS · SIGNUM</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f7fbff">sinal</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0dce8">marca · aviso · gesto · dar sinal</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
