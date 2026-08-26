'use strict';

/** Capa 1200×630 — Palavras · Internet (lapso Intenet). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/internet-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c141c"/>
      <stop offset="50%" stop-color="#102028"/>
      <stop offset="100%" stop-color="#081018"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="48%">
      <stop offset="0%" stop-color="rgba(90,180,196,0.28)"/>
      <stop offset="100%" stop-color="rgba(12,20,28,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="240" rx="340" ry="170" fill="url(#glow)"/>
  <circle cx="430" cy="230" r="10" fill="#8ec8d0"/>
  <circle cx="600" cy="200" r="14" fill="#e8f4f0"/>
  <circle cx="770" cy="230" r="10" fill="#8ec8d0"/>
  <circle cx="500" cy="310" r="8" fill="#6aa8b0"/>
  <circle cx="700" cy="310" r="8" fill="#6aa8b0"/>
  <path d="M430 230 L600 200 L770 230 M600 200 L500 310 L700 310 L600 200" fill="none" stroke="rgba(160,216,220,0.55)" stroke-width="2"/>
  <text x="600" y="84" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#7ec8d0" letter-spacing="3">PALAVRAS · INTER- + NET · ≠ WWW ≠ DISCADA</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4efe6">Internet</text>
  <text x="600" y="468" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0c8b8">Intenet = lapso · cai o r de inter-</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#9aa8a0">a rede das redes · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
