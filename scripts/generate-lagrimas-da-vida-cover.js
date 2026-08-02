'use strict';

/** Capa 1200×630 — Artes · Lágrimas da Vida (Álvares de Azevedo). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/lagrimas-da-vida-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1218"/>
      <stop offset="40%" stop-color="#1a2430"/>
      <stop offset="100%" stop-color="#0a0e12"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="35%">
      <stop offset="0%" stop-color="rgba(120,160,200,0.22)"/>
      <stop offset="100%" stop-color="rgba(120,160,200,0)"/>
    </radialGradient>
    <linearGradient id="tear" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(200,220,240,0.85)"/>
      <stop offset="100%" stop-color="rgba(80,120,160,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="280" r="220" fill="url(#glow)"/>
  <path d="M600 180 C560 260 540 320 540 360 C540 400 566 430 600 430 C634 430 660 400 660 360 C660 320 640 260 600 180 Z" fill="url(#tear)" stroke="rgba(220,235,250,0.35)" stroke-width="2"/>
  <ellipse cx="585" cy="300" rx="10" ry="18" fill="rgba(255,255,255,0.35)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9bc4e0" letter-spacing="8">ARTES · POESIA</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f4f0e8">Lágrimas da Vida</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8d0d8">Álvares de Azevedo · Lira dos Vinte Anos</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
