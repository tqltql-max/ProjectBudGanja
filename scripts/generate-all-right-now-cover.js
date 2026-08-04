'use strict';

/** Capa 1200×630 — Artes · All Right Now (Free). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/all-right-now-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1208"/>
      <stop offset="45%" stop-color="#3a2814"/>
      <stop offset="100%" stop-color="#0c1018"/>
    </linearGradient>
    <radialGradient id="amp" cx="72%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(220,160,60,0.35)"/>
      <stop offset="100%" stop-color="rgba(220,160,60,0)"/>
    </radialGradient>
    <linearGradient id="stage" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,210,120,0.12)"/>
      <stop offset="100%" stop-color="rgba(255,210,120,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="860" cy="240" r="260" fill="url(#amp)"/>
  <rect x="0" y="0" width="1200" height="220" fill="url(#stage)"/>
  <ellipse cx="600" cy="520" rx="380" ry="48" fill="rgba(0,0,0,0.35)"/>
  <path d="M180 480 Q320 300 480 420 T780 380 T980 460" fill="none" stroke="rgba(240,200,120,0.45)" stroke-width="4"/>
  <path d="M220 500 Q360 340 520 440 T820 400 T1020 480" fill="none" stroke="rgba(180,140,80,0.25)" stroke-width="2"/>
  <circle cx="320" cy="360" r="8" fill="rgba(255,220,140,0.7)"/>
  <circle cx="640" cy="300" r="6" fill="rgba(255,200,100,0.55)"/>
  <circle cx="880" cy="340" r="7" fill="rgba(255,220,140,0.65)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#e0c070" letter-spacing="6">ARTES · CANÇÃO 1970</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f6f0e4">All Right Now</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b898">Free · Durham · o agora depois do silêncio</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
