'use strict';

/** Capa 1200×630 — ramela × ramelento ≠ remo lento (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/ramela-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1018"/>
      <stop offset="48%" stop-color="#16140e"/>
      <stop offset="100%" stop-color="#0a1214"/>
    </linearGradient>
    <radialGradient id="iris" cx="48%" cy="46%" r="58%">
      <stop offset="0%" stop-color="rgba(70,120,130,0.9)"/>
      <stop offset="55%" stop-color="rgba(28,58,64,0.75)"/>
      <stop offset="100%" stop-color="rgba(12,16,20,0.15)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="280" cy="250" rx="128" ry="78" fill="none" stroke="rgba(220,210,180,0.55)" stroke-width="4"/>
  <ellipse cx="280" cy="250" rx="72" ry="72" fill="url(#iris)"/>
  <circle cx="280" cy="250" r="26" fill="#0a0c0e"/>
  <circle cx="294" cy="236" r="8" fill="rgba(240,240,230,0.5)"/>
  <ellipse cx="368" cy="278" rx="10" ry="7" fill="rgba(210,180,90,0.85)"/>
  <ellipse cx="372" cy="280" rx="5" ry="3.5" fill="rgba(180,140,50,0.7)"/>
  <line x1="760" y1="168" x2="1060" y2="338" stroke="rgba(142,180,200,0.35)" stroke-width="12" stroke-linecap="round"/>
  <ellipse cx="748" cy="160" rx="36" ry="15" fill="none" stroke="rgba(196,163,90,0.45)" stroke-width="4" transform="rotate(-28 748 160)"/>
  <line x1="820" y1="200" x2="1040" y2="360" stroke="rgba(196,163,90,0.25)" stroke-width="2" stroke-dasharray="8 10"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8c090" letter-spacing="4">PALAVRAS · RAMELA · ≠ REMO LENTO</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f4f0e4">ramela</text>
  <text x="600" y="492" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,180,0.95)">ramelento · ramela + -ento</text>
  <text x="600" y="538" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.85)">≠ remo lento · origem obscura · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
