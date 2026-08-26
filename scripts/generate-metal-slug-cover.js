'use strict';

/** Capa 1200×630 — Caderno de jogo 5 · Metal Slug. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/metal-slug-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a1408"/>
      <stop offset="48%" stop-color="#3a2c14"/>
      <stop offset="100%" stop-color="#12180e"/>
    </linearGradient>
    <radialGradient id="glow" cx="76%" cy="24%" r="42%">
      <stop offset="0%" stop-color="rgba(210,160,50,0.38)"/>
      <stop offset="100%" stop-color="rgba(210,160,50,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="920" cy="130" r="250" fill="url(#glow)"/>
  <rect x="72" y="64" width="10" height="500" fill="rgba(196,163,90,0.45)"/>
  <rect x="820" y="340" width="220" height="110" rx="8" fill="rgba(160,170,150,0.22)" stroke="rgba(200,210,180,0.35)" stroke-width="3"/>
  <rect x="848" y="368" width="48" height="22" rx="4" fill="rgba(80,90,70,0.55)"/>
  <rect x="910" y="360" width="96" height="14" rx="3" fill="rgba(90,100,80,0.5)"/>
  <text x="108" y="92" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a35a" letter-spacing="3">CADERNO DE JOGO · 5</text>
  <text x="108" y="268" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4ebe0">Metal Slug</text>
  <text x="108" y="338" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,210,170,0.95)">o tanque, o pixel e o Hey!</text>
  <text x="108" y="430" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4a35a">1996 · Nazca / SNK · SV-001</text>
  <text x="108" y="500" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d8c48a">Meteal · Mission Complete · sem ROM</text>
  <text x="108" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(196,163,90,0.8)">Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
