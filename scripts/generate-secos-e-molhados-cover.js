'use strict';

/** Capa 1200×630 — secos e molhados (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/secos-e-molhados-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2a1c10"/>
      <stop offset="48%" stop-color="#161410"/>
      <stop offset="52%" stop-color="#101418"/>
      <stop offset="100%" stop-color="#081018"/>
    </linearGradient>
    <radialGradient id="dry" cx="26%" cy="48%" r="44%">
      <stop offset="0%" stop-color="rgba(210,160,70,0.42)"/>
      <stop offset="100%" stop-color="rgba(20,12,4,0)"/>
    </radialGradient>
    <radialGradient id="wet" cx="76%" cy="48%" r="44%">
      <stop offset="0%" stop-color="rgba(70,150,190,0.40)"/>
      <stop offset="100%" stop-color="rgba(4,10,18,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="320" cy="310" rx="250" ry="180" fill="url(#dry)"/>
  <ellipse cx="890" cy="310" rx="250" ry="180" fill="url(#wet)"/>
  <path d="M250 360 L250 250 Q320 210 390 250 L390 360 Q320 390 250 360 Z" fill="rgba(196,150,80,0.85)" stroke="rgba(230,190,110,0.6)" stroke-width="2"/>
  <ellipse cx="320" cy="248" rx="70" ry="22" fill="rgba(180,130,60,0.9)"/>
  <rect x="820" y="230" width="52" height="140" rx="8" fill="rgba(40,90,120,0.85)" stroke="rgba(140,200,220,0.55)" stroke-width="2"/>
  <ellipse cx="846" cy="228" rx="22" ry="10" fill="rgba(180,220,235,0.7)"/>
  <path d="M900 360 Q930 250 980 360 Q955 380 900 360 Z" fill="rgba(70,140,180,0.55)" stroke="rgba(150,210,230,0.5)" stroke-width="2"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="3">EXPRESSÕES · SEOS → SECOS · ARMAZÉM</text>
  <text x="600" y="160" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="46" font-weight="700" fill="#f4eee4">secos e molhados</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,190,0.95)">siccus × molliare · loja e mistura</text>
  <text x="600" y="555" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">não misturar o saco com o vidro sem ofício</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
