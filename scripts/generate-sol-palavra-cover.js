'use strict';

/** Capa 1200×630 — sol (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/sol-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a2838"/>
      <stop offset="45%" stop-color="#3a5068"/>
      <stop offset="100%" stop-color="#c87840"/>
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="38%" r="40%">
      <stop offset="0%" stop-color="rgba(255,240,160,1)"/>
      <stop offset="40%" stop-color="rgba(255,180,60,0.55)"/>
      <stop offset="100%" stop-color="rgba(200,100,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="240" rx="280" ry="220" fill="url(#sun)"/>
  <circle cx="600" cy="230" r="70" fill="#fff2a0"/>
  <g stroke="rgba(255,220,120,0.55)" stroke-width="6" stroke-linecap="round">
    <line x1="600" y1="90" x2="600" y2="130"/>
    <line x1="600" y1="330" x2="600" y2="370"/>
    <line x1="430" y1="230" x2="470" y2="230"/>
    <line x1="730" y1="230" x2="770" y2="230"/>
    <line x1="480" y1="130" x2="510" y2="155"/>
    <line x1="690" y1="305" x2="720" y2="330"/>
    <line x1="720" y1="130" x2="690" y2="155"/>
    <line x1="480" y1="330" x2="510" y2="305"/>
  </g>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#ffe8b0" letter-spacing="4">PALAVRAS · ASTRO · LUZ NATURAL</text>
  <text x="600" y="460" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#fff8e8">sol</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(255,240,220,0.95)">sōl · luz · cultivo</text>
  <text x="600" y="575" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#ffe0a0">faça o melhor com a luz do dia</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
