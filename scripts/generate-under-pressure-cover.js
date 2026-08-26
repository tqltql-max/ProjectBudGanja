'use strict';

/** Capa 1200×630 — Artes · Under Pressure (Queen + Bowie). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/under-pressure-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071018"/>
      <stop offset="42%" stop-color="#0e2230"/>
      <stop offset="100%" stop-color="#1a0e18"/>
    </linearGradient>
    <radialGradient id="pulse" cx="28%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(110,231,197,0.32)"/>
      <stop offset="100%" stop-color="rgba(110,231,197,0)"/>
    </radialGradient>
    <radialGradient id="bowie" cx="78%" cy="36%" r="34%">
      <stop offset="0%" stop-color="rgba(240,171,252,0.28)"/>
      <stop offset="100%" stop-color="rgba(240,171,252,0)"/>
    </radialGradient>
    <linearGradient id="street" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(94,200,255,0.08)"/>
      <stop offset="100%" stop-color="rgba(7,16,24,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="340" cy="270" r="240" fill="url(#pulse)"/>
  <circle cx="920" cy="230" r="210" fill="url(#bowie)"/>
  <rect x="0" y="380" width="1200" height="250" fill="url(#street)"/>
  <circle cx="600" cy="300" r="118" fill="none" stroke="rgba(200,244,255,0.22)" stroke-width="3"/>
  <circle cx="600" cy="300" r="78" fill="none" stroke="rgba(110,231,197,0.45)" stroke-width="4"/>
  <circle cx="600" cy="300" r="42" fill="none" stroke="rgba(240,171,252,0.55)" stroke-width="3"/>
  <circle cx="600" cy="300" r="10" fill="#c8f4ff"/>
  <path d="M600 300 L668 248" stroke="#7dffc3" stroke-width="5" stroke-linecap="round"/>
  <path d="M80 560 L220 430 L340 500 L480 390 L620 470 L760 360 L900 450 L1120 320" fill="none" stroke="rgba(94,200,255,0.35)" stroke-width="3"/>
  <path d="M80 580 L240 470 L360 530 L500 420 L640 500 L780 390 L920 470 L1120 360" fill="none" stroke="rgba(110,231,197,0.2)" stroke-width="2"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#7dffd0" letter-spacing="6">ARTES · CANÇÃO 1981</text>
  <text x="600" y="522" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#f4f8fc">Under Pressure</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c5d6e4">Queen · David Bowie · Montreux · medir sem esmagar</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
