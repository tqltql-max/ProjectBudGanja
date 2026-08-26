'use strict';

/** Capa 1200×630 — Artes · Upside Down (Jack Johnson). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/upside-down-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#f4d98a"/>
      <stop offset="42%" stop-color="#7ec8c0"/>
      <stop offset="100%" stop-color="#0e2230"/>
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="78%" r="28%">
      <stop offset="0%" stop-color="rgba(255,214,90,0.85)"/>
      <stop offset="100%" stop-color="rgba(255,214,90,0)"/>
    </radialGradient>
    <radialGradient id="hat" cx="22%" cy="30%" r="22%">
      <stop offset="0%" stop-color="rgba(255,214,90,0.45)"/>
      <stop offset="100%" stop-color="rgba(255,214,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="500" r="180" fill="url(#sun)"/>
  <circle cx="260" cy="190" r="140" fill="url(#hat)"/>
  <ellipse cx="260" cy="168" rx="78" ry="22" fill="#f6e27a"/>
  <rect x="232" y="168" width="56" height="38" rx="8" fill="#e8c44a"/>
  <path d="M80 250 Q200 140 320 250 T560 250 T800 250 T1120 250" fill="none" stroke="rgba(14,34,48,0.22)" stroke-width="3"/>
  <path d="M140 420 L200 300 L230 360 L280 240 L320 330 L380 210" fill="none" stroke="rgba(14,80,64,0.45)" stroke-width="8" stroke-linecap="round"/>
  <path d="M860 200 Q920 80 980 200 T1100 200" fill="none" stroke="rgba(244,248,252,0.35)" stroke-width="6"/>
  <path d="M180 520 Q340 470 500 520 T820 520 T1100 480" fill="none" stroke="rgba(14,34,48,0.28)" stroke-width="3"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#f6e27a" letter-spacing="6">ARTES · CANÇÃO 2006</text>
  <text x="600" y="522" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f4f8fc">Upside Down</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#d5efe8">Jack Johnson · Curious George · inverter o olhar</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
