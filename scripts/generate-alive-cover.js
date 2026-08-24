'use strict';

/** Capa 1200×630 — Artes · Alive (Pearl Jam). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/alive-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120808"/>
      <stop offset="48%" stop-color="#2a140c"/>
      <stop offset="100%" stop-color="#081018"/>
    </linearGradient>
    <radialGradient id="pulse" cx="68%" cy="40%" r="42%">
      <stop offset="0%" stop-color="rgba(220,90,60,0.38)"/>
      <stop offset="100%" stop-color="rgba(220,90,60,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="820" cy="240" r="230" fill="url(#pulse)"/>
  <path d="M760 240 L790 240 L805 190 L830 300 L850 220 L870 240 L940 240" fill="none" stroke="rgba(255,190,160,0.75)" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#e0a090" letter-spacing="6">ARTES · CANÇÃO 1991</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4e8e0">Alive</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#d0b0a0">Pearl Jam · ficar · fecho da rádio</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
