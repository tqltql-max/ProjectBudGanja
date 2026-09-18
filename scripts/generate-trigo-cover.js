'use strict';

/** Capa 1200×630 — planta trigo (*Triticum aestivum*). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/plantas/trigo-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2a2214"/>
      <stop offset="45%" stop-color="#5a4820"/>
      <stop offset="100%" stop-color="#1c1810"/>
    </linearGradient>
    <radialGradient id="glow" cx="74%" cy="40%" r="36%">
      <stop offset="0%" stop-color="rgba(244,220,140,0.32)"/>
      <stop offset="100%" stop-color="rgba(244,220,140,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <path d="M880 500 L880 240" fill="none" stroke="rgba(210,180,80,0.55)" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="880" cy="220" rx="18" ry="36" fill="rgba(232,200,90,0.75)"/>
  <ellipse cx="862" cy="248" rx="12" ry="22" fill="rgba(220,186,70,0.65)"/>
  <ellipse cx="898" cy="248" rx="12" ry="22" fill="rgba(220,186,70,0.65)"/>
  <ellipse cx="868" cy="278" rx="11" ry="20" fill="rgba(210,176,64,0.6)"/>
  <ellipse cx="892" cy="278" rx="11" ry="20" fill="rgba(210,176,64,0.6)"/>
  <path d="M820 500 L820 280" fill="none" stroke="rgba(200,170,70,0.35)" stroke-width="5"/>
  <ellipse cx="820" cy="260" rx="14" ry="28" fill="rgba(220,190,80,0.45)"/>
  <ellipse cx="890" cy="530" rx="80" ry="16" fill="rgba(80,60,20,0.4)"/>
  <text x="600" y="148" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#e8d090" letter-spacing="7">PLANTA · TRITICUM AESTIVUM</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#fff8e8">trigo</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#f0e4c0">grão · farinha branca · glúten · risco</text>
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b888">espiga ≠ saco da prateleira</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
