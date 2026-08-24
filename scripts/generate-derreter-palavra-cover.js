'use strict';

/** Capa 1200×630 — Derreter (Palavras). Sólido que volta a água; campo «derver». */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/derreter-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#1a120c"/>
      <stop offset="42%" stop-color="#241810"/>
      <stop offset="100%" stop-color="#0c1824"/>
    </linearGradient>
    <radialGradient id="hot" cx="32%" cy="40%" r="40%">
      <stop offset="0%" stop-color="rgba(255,150,60,0.42)"/>
      <stop offset="60%" stop-color="rgba(160,70,20,0.12)"/>
      <stop offset="100%" stop-color="rgba(20,12,8,0)"/>
    </radialGradient>
    <radialGradient id="pool" cx="70%" cy="72%" r="36%">
      <stop offset="0%" stop-color="rgba(120,190,230,0.38)"/>
      <stop offset="70%" stop-color="rgba(40,90,130,0.12)"/>
      <stop offset="100%" stop-color="rgba(8,16,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="380" cy="250" rx="260" ry="170" fill="url(#hot)"/>
  <ellipse cx="820" cy="430" rx="280" ry="150" fill="url(#pool)"/>
  <ellipse cx="600" cy="210" rx="70" ry="28" fill="rgba(236,246,255,0.88)"/>
  <path d="M575 230 Q585 300 592 380" fill="none" stroke="rgba(210,236,250,0.75)" stroke-width="6" stroke-linecap="round"/>
  <path d="M600 232 Q612 310 640 400" fill="none" stroke="rgba(180,220,245,0.7)" stroke-width="5" stroke-linecap="round"/>
  <path d="M625 228 Q630 280 618 360" fill="none" stroke="rgba(160,210,240,0.55)" stroke-width="3.5" stroke-linecap="round"/>
  <ellipse cx="640" cy="430" rx="120" ry="28" fill="rgba(90,160,210,0.45)"/>
  <ellipse cx="640" cy="424" rx="90" ry="16" fill="rgba(180,220,245,0.35)"/>
  <text x="600" y="70" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8a060" letter-spacing="3">PALAVRAS · DERRETIR / DĒTERŌ × RĒTERŌ · GESTO</text>
  <text x="600" y="330" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4eee4">Derreter</text>
  <text x="600" y="392" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="rgba(220,210,190,0.92)">o sólido volta a água · campo: derver</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.9)">≠ dever · ≠ derrota · ≠ lava · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
