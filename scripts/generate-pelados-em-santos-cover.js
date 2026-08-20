'use strict';

/** Capa 1200×630 — Artes · Pelados em Santos (Mamonas Assassinas). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/pelados-em-santos-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#12263a"/>
      <stop offset="42%" stop-color="#1e6a8a"/>
      <stop offset="78%" stop-color="#f0c14a"/>
      <stop offset="100%" stop-color="#f4e8c0"/>
    </linearGradient>
    <radialGradient id="sun" cx="86%" cy="18%" r="28%">
      <stop offset="0%" stop-color="rgba(255,220,90,0.9)"/>
      <stop offset="100%" stop-color="rgba(255,220,90,0)"/>
    </radialGradient>
    <radialGradient id="sea" cx="50%" cy="92%" r="48%">
      <stop offset="0%" stop-color="rgba(20,80,110,0.55)"/>
      <stop offset="100%" stop-color="rgba(20,80,110,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1040" cy="110" r="170" fill="url(#sun)"/>
  <ellipse cx="600" cy="640" rx="520" ry="120" fill="url(#sea)"/>
  <path d="M80 430 Q220 390 360 420 Q520 460 700 410 Q860 360 1120 400 L1120 630 L80 630 Z" fill="rgba(236,210,140,0.55)"/>
  <path d="M320 430 L360 360 L820 360 L880 430 Z" fill="#e6c84a"/>
  <path d="M360 360 L400 318 L780 318 L820 360 Z" fill="#d4b43a"/>
  <rect x="430" y="328" width="70" height="28" rx="4" fill="#1a3a4a"/>
  <rect x="700" y="328" width="70" height="28" rx="4" fill="#1a3a4a"/>
  <ellipse cx="430" cy="438" rx="48" ry="20" fill="#1a1a1a"/>
  <ellipse cx="790" cy="438" rx="48" ry="20" fill="#1a1a1a"/>
  <rect x="470" y="372" width="260" height="18" rx="3" fill="#c9a22e" opacity="0.7"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#f6e27a" letter-spacing="6">ARTES · CANÇÃO 1995</text>
  <text x="600" y="522" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#f4f8fc">Pelados em Santos</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#f0e4c8">Mamonas Assassinas · Brasília amarela · ofício do riso</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
