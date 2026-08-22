'use strict';

/** Capa 1200×630 — lemniscata (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/lemniscata-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1218"/>
      <stop offset="55%" stop-color="#121a22"/>
      <stop offset="100%" stop-color="#0e1612"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="48%">
      <stop offset="0%" stop-color="rgba(180,150,70,0.22)"/>
      <stop offset="100%" stop-color="rgba(10,18,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="270" rx="400" ry="200" fill="url(#glow)"/>
  <path d="M 340 280 C 340 170 500 170 600 280 C 700 390 860 390 860 280 C 860 170 700 170 600 280 C 500 390 340 390 340 280" fill="none" stroke="rgba(220,200,130,0.9)" stroke-width="12" stroke-linecap="round"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8b878" letter-spacing="4">PALAVRAS · FITA · CURVA</text>
  <text x="600" y="490" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4f0e4">lemniscata</text>
  <text x="600" y="540" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,230,220,0.95)">λημνίσκος → lemniscus «fita»</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#90c8b8">OCR lemeniscata · ≠ eternidade</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
