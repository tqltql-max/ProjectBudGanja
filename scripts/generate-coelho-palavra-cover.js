'use strict';

/** Capa 1200×630 — palavra coelho (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/coelho-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a2430"/>
      <stop offset="50%" stop-color="#243528"/>
      <stop offset="100%" stop-color="#0e1410"/>
    </linearGradient>
    <radialGradient id="hole" cx="78%" cy="62%" r="28%">
      <stop offset="0%" stop-color="rgba(0,0,0,0.55)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="920" cy="390" rx="210" ry="140" fill="url(#hole)"/>
  <ellipse cx="920" cy="390" rx="90" ry="58" fill="rgba(0,0,0,0.45)" stroke="rgba(159,212,192,0.25)" stroke-width="3"/>
  <path d="M780 250 Q860 200 900 280 Q940 360 980 320" fill="none" stroke="rgba(244,255,248,0.22)" stroke-width="6" stroke-linecap="round"/>
  <circle cx="200" cy="140" r="120" fill="rgba(255,255,255,0.04)"/>
  <text x="600" y="170" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9fd4c0" letter-spacing="8">PALAVRAS · ENTRADA</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4fff8">coelho</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0e0d8">toca · buraco · curiosidade</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
