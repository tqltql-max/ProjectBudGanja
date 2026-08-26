'use strict';

/** Capa 1200×630 — Revoada (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/revoada-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="1" x2="0.15" y2="0">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="42%" stop-color="#1e3a4a"/>
      <stop offset="78%" stop-color="#3d6a88"/>
      <stop offset="100%" stop-color="#c4a070"/>
    </linearGradient>
    <radialGradient id="sun" cx="78%" cy="28%" r="28%">
      <stop offset="0%" stop-color="rgba(232,196,120,0.55)"/>
      <stop offset="100%" stop-color="rgba(30,40,48,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#sky)"/>
  <ellipse cx="940" cy="170" rx="220" ry="140" fill="url(#sun)"/>
  <path d="M80 520 Q 280 470 520 500 T 1120 470" fill="none" stroke="rgba(20,24,28,0.35)" stroke-width="48"/>
  <g fill="#0d1216" opacity="0.92">
    <path d="M210 390 l28 -8 l-10 14 l32 -6 l-48 22 z"/>
    <path d="M310 360 l36 -10 l-12 16 l40 -8 l-58 26 z"/>
    <path d="M430 330 l42 -12 l-14 18 l48 -9 l-68 30 z"/>
    <path d="M560 300 l46 -14 l-16 20 l52 -10 l-74 34 z"/>
    <path d="M700 268 l40 -12 l-14 18 l46 -8 l-64 28 z"/>
    <path d="M820 248 l34 -10 l-12 16 l38 -7 l-54 24 z"/>
    <path d="M390 410 l24 -7 l-8 12 l28 -5 l-42 18 z"/>
    <path d="M640 380 l30 -9 l-10 14 l34 -6 l-48 22 z"/>
    <path d="M760 340 l26 -8 l-9 13 l30 -5 l-44 20 z"/>
  </g>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e8d0a0" letter-spacing="2.6">EXPRESSÕES · RELAÇÃO · PÁSSARO / BIRDS · GESTO DE VOAR</text>
  <text x="600" y="168" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f6f0e6">Revoada</text>
  <text x="600" y="520" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(240,230,210,0.95)">o bando que levanta voo junto — o entre feito céu</text>
  <text x="600" y="568" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#d4c090">um pássaro voa · a revoada relaciona</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
