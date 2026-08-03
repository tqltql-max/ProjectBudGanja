'use strict';

/** Capa 1200×630 — inseto (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/inseto-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1610"/>
      <stop offset="40%" stop-color="#1a3020"/>
      <stop offset="100%" stop-color="#0c120e"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="45%" r="48%">
      <stop offset="0%" stop-color="rgba(140,200,90,0.32)"/>
      <stop offset="55%" stop-color="rgba(70,130,60,0.12)"/>
      <stop offset="100%" stop-color="rgba(30,50,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="300" rx="340" ry="220" fill="url(#glow)"/>
  <!-- stilized leaf -->
  <ellipse cx="720" cy="340" rx="90" ry="140" fill="rgba(60,120,50,0.35)" transform="rotate(25 720 340)"/>
  <!-- stilized beetle body -->
  <ellipse cx="480" cy="310" rx="55" ry="38" fill="rgba(40,80,40,0.55)"/>
  <ellipse cx="480" cy="310" rx="48" ry="32" fill="none" stroke="rgba(180,220,120,0.5)" stroke-width="2"/>
  <circle cx="430" cy="300" r="14" fill="rgba(50,90,50,0.6)"/>
  <line x1="410" y1="285" x2="395" y2="270" stroke="rgba(200,230,160,0.45)" stroke-width="2"/>
  <line x1="410" y1="315" x2="395" y2="330" stroke="rgba(200,230,160,0.45)" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9ec878" letter-spacing="4">PALAVRAS · INSECTUM · VIDA</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#e8f5d8">inseto</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,240,200,0.95)">vida · ecologia · cultura · insetos</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#a8d080">faça o melhor com a teia viva</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#9ec878">joaninha · abelha · animal · simbiose</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
