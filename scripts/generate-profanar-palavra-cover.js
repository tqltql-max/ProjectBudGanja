'use strict';

/** Capa 1200×630 — profanar (Palavras · umbral do templo). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/profanar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120e0c"/>
      <stop offset="52%" stop-color="#1a1610"/>
      <stop offset="100%" stop-color="#0a1214"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="48%">
      <stop offset="0%" stop-color="rgba(196,163,90,0.28)"/>
      <stop offset="55%" stop-color="rgba(90,154,138,0.10)"/>
      <stop offset="100%" stop-color="rgba(12,10,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="230" rx="380" ry="200" fill="url(#glow)"/>
  <path d="M430 310 L600 150 L770 310 Z" fill="none" stroke="rgba(196,163,90,0.55)" stroke-width="3"/>
  <rect x="470" y="310" width="260" height="110" fill="none" stroke="rgba(196,163,90,0.40)" stroke-width="2"/>
  <rect x="560" y="340" width="80" height="80" fill="rgba(10,18,20,0.65)" stroke="rgba(232,213,163,0.55)" stroke-width="2"/>
  <path d="M318 430 C330 390 350 370 368 400 C380 360 410 368 402 412" fill="none" stroke="rgba(90,170,150,0.70)" stroke-width="3"/>
  <circle cx="402" cy="412" r="5" fill="rgba(90,170,150,0.80)"/>
  <text x="790" y="400" font-family="Segoe UI, Consolas, monospace" font-size="28" fill="rgba(154,212,200,0.75)">&lt;/&gt;</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c4a35a" letter-spacing="3.5">PALAVRAS · PRO- + FANUM · UMBRAL</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f2ead4">profanar</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(210,220,210,0.95)">professor · profanacao · propagacao · programacao</text>
  <text x="600" y="590" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="16" fill="#9ad4c8">fora do templo · ligar tecnologia · Faca o seu melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
