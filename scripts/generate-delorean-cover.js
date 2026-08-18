'use strict';

/** Capa 1200×630 — Artes · objecto DeLorean (inox, não CRT). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens', 'inspecoes', 'delorean-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1c20"/>
      <stop offset="45%" stop-color="#2a3038"/>
      <stop offset="100%" stop-color="#121418"/>
    </linearGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8a939c"/>
      <stop offset="50%" stop-color="#d5dde4"/>
      <stop offset="100%" stop-color="#6d767e"/>
    </linearGradient>
    <linearGradient id="neon" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff6a00"/>
      <stop offset="100%" stop-color="#3ec8ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#neon)"/>
  <g opacity="0.28" fill="none" stroke="#d5dde4" stroke-width="3">
    <path d="M720 360 L980 360 L1040 300 L1100 300 L1120 340 L1120 400 L720 400 Z"/>
    <path d="M980 300 L1020 250 L1080 250 L1100 300"/>
    <path d="M860 300 L900 250 L960 250 L980 300"/>
    <circle cx="800" cy="400" r="38"/>
    <circle cx="1040" cy="400" r="38"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a35a" letter-spacing="5">ARTES · OBJECTO</text>
  <text x="80" y="280" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="#e8eef4">DeLorean</text>
  <text x="80" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="rgba(210,220,230,0.92)">Dunmurry · inox · gull-wing</text>
  <text x="80" y="480" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#9ab0c0">carro real primeiro · 1985 é camada</text>
  <text x="80" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c4a35a">Giugiaro · DMC · 1981–82</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
