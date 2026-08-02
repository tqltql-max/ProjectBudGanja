'use strict';

/** Capa 1200×630 — palavra gesto (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/gesto-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#121a10"/>
      <stop offset="50%" stop-color="#1c2414"/>
      <stop offset="100%" stop-color="#0a120c"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="42%" r="40%">
      <stop offset="0%" stop-color="rgba(124,179,66,0.22)"/>
      <stop offset="50%" stop-color="rgba(223,194,98,0.14)"/>
      <stop offset="100%" stop-color="rgba(223,194,98,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="560" cy="270" r="240" fill="url(#glow)"/>
  <!-- open hand / care gesture -->
  <g fill="none" stroke="rgba(223,194,98,0.7)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M420 340 C420 280 450 240 500 230 C520 180 560 170 580 210"/>
    <path d="M500 230 C510 200 540 190 555 220"/>
    <path d="M555 220 C570 185 600 185 610 225"/>
    <path d="M610 225 C630 195 660 205 655 245"/>
    <path d="M655 245 C690 230 720 260 700 300 C680 360 620 400 540 400 C470 400 420 370 420 340"/>
  </g>
  <!-- small sprout above palm -->
  <path d="M560 210 C555 180 540 160 530 145" fill="none" stroke="rgba(124,179,66,0.9)" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="522" cy="140" rx="16" ry="10" transform="rotate(-40 522 140)" fill="rgba(124,179,66,0.85)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#dfc262" letter-spacing="7">PALAVRAS · ACTO MÍNIMO</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4efe6">gesto</text>
  <text x="600" y="555" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">gestus · Vida · cultivo · inspeção · rede</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
