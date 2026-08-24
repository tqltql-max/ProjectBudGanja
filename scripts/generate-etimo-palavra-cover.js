'use strict';

/** Capa 1200×630 — palavra étimo (peça · étymon · espécime agere). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/etimo-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12100c"/>
      <stop offset="48%" stop-color="#2a2418"/>
      <stop offset="100%" stop-color="#0e0c0a"/>
    </linearGradient>
    <linearGradient id="root" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="rgba(180,150,70,0.12)"/>
      <stop offset="100%" stop-color="rgba(220,200,120,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <path d="M600 560 L560 420 L600 380 L640 420 Z" fill="url(#root)"/>
  <path d="M600 420 L480 280 L520 270 L600 360 L680 270 L720 280 Z" fill="none" stroke="rgba(220,200,120,0.45)" stroke-width="4"/>
  <circle cx="600" cy="240" r="16" fill="rgba(232,220,150,0.75)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d4c896" letter-spacing="5">PALAVRAS · ÉTYMON · ≠ OFÍCIO</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="84" font-weight="700" fill="#f6f2e6">étimo</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#ddd4b0">āctiō ← agere · fazer, impulsionar</text>
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(200,190,160,0.75)">peça · ação · ≠ etimologia popular</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
