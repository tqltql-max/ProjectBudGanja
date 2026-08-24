'use strict';

/** Capa 1200×630 — Artes · Wake Up (RATM). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/wake-up-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#061018"/>
      <stop offset="48%" stop-color="#0c2a22"/>
      <stop offset="100%" stop-color="#102008"/>
    </linearGradient>
    <radialGradient id="eye" cx="32%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(80,220,180,0.35)"/>
      <stop offset="100%" stop-color="rgba(80,220,180,0)"/>
    </radialGradient>
    <linearGradient id="slash" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(40,180,140,0.45)"/>
      <stop offset="100%" stop-color="rgba(40,180,140,0.04)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="380" cy="250" r="210" fill="url(#eye)"/>
  <path d="M0 630 L480 0 L580 0 L100 630 Z" fill="url(#slash)"/>
  <ellipse cx="380" cy="250" rx="150" ry="70" fill="none" stroke="rgba(180,255,220,0.45)" stroke-width="3"/>
  <circle cx="380" cy="250" r="28" fill="rgba(20,40,30,0.9)" stroke="rgba(200,255,220,0.7)" stroke-width="3"/>
  <circle cx="388" cy="242" r="8" fill="rgba(220,255,240,0.85)"/>
  <rect x="720" y="168" width="300" height="26" fill="rgba(40,180,130,0.8)"/>
  <rect x="760" y="226" width="260" height="16" fill="rgba(40,140,110,0.5)"/>
  <rect x="800" y="274" width="220" height="12" fill="rgba(30,110,90,0.35)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#7ee0c0" letter-spacing="6">ARTES · CANÇÃO 1992</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#e8f8f0">Wake Up</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#a8d0c0">Rage Against the Machine · acordar · não tanque</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
