'use strict';

/** Capa 1200×630 — linha 10 · cerol (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/linha-10-cerol-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120c0c"/>
      <stop offset="48%" stop-color="#1a1410"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="42%" r="46%">
      <stop offset="0%" stop-color="rgba(223,194,98,0.18)"/>
      <stop offset="55%" stop-color="rgba(180,70,50,0.12)"/>
      <stop offset="100%" stop-color="rgba(18,12,12,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="480" cy="270" rx="300" ry="210" fill="url(#glow)"/>
  <path d="M470 128 L590 258 L470 388 L350 258 Z" fill="none" stroke="rgba(223,194,98,0.88)" stroke-width="6" stroke-linejoin="round"/>
  <path d="M470 128 L470 388" fill="none" stroke="rgba(223,194,98,0.32)" stroke-width="2"/>
  <path d="M350 258 L590 258" fill="none" stroke="rgba(223,194,98,0.32)" stroke-width="2"/>
  <path d="M470 388 C458 430 492 452 470 498 C448 536 480 554 470 590" fill="none" stroke="rgba(200,160,90,0.5)" stroke-width="3" stroke-linecap="round"/>
  <line x1="40" y1="430" x2="1160" y2="510" stroke="rgba(232,120,90,0.72)" stroke-width="4"/>
  <line x1="40" y1="424" x2="1160" y2="504" stroke="rgba(232,120,90,0.28)" stroke-width="10"/>
  <ellipse cx="860" cy="470" rx="70" ry="28" fill="none" stroke="rgba(232,180,140,0.45)" stroke-width="3"/>
  <path d="M800 470 Q830 430 860 442 Q890 430 920 470" fill="none" stroke="rgba(232,180,140,0.4)" stroke-width="3"/>
  <circle cx="980" cy="200" r="58" fill="none" stroke="rgba(232,120,90,0.92)" stroke-width="4"/>
  <text x="980" y="220" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#e8785a">P</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#dfc262" letter-spacing="5">PALAVRAS · CALIBRE · CORTANTE</text>
  <text x="600" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="rgba(244,239,230,0.12)">10</text>
  <text x="600" y="528" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="46" font-weight="700" fill="#f4efe6">linha 10 · cerol</text>
  <text x="600" y="572" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">contato com objeto cortante · pé direito</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
