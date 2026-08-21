'use strict';

/** Capa 1200×630 — palavra Cuca (história infantil). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/cuca-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1a14"/>
      <stop offset="50%" stop-color="#163028"/>
      <stop offset="100%" stop-color="#0a1210"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="960" cy="420" rx="180" ry="70" fill="rgba(40,90,70,0.35)"/>
  <path d="M880 390 Q940 330 1020 380 Q1060 400 1020 430 Q940 470 880 420 Z" fill="rgba(70,130,90,0.45)"/>
  <ellipse cx="980" cy="370" rx="55" ry="38" fill="rgba(90,150,100,0.5)"/>
  <circle cx="1005" cy="362" r="7" fill="rgba(240,220,120,0.75)"/>
  <path d="M1030 368 Q1075 358 1090 375" fill="none" stroke="rgba(120,170,110,0.7)" stroke-width="6" stroke-linecap="round"/>
  <path d="M200 480 Q400 440 600 470 Q800 500 1000 455" fill="none" stroke="rgba(180,210,170,0.12)" stroke-width="3"/>
  <circle cx="180" cy="110" r="90" fill="rgba(255,255,255,0.03)"/>
  <text x="600" y="155" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#a8d4b8" letter-spacing="8">PALAVRAS · INFÂNCIA</text>
  <text x="600" y="295" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="76" font-weight="700" fill="#f4faf6">cuca</text>
  <text x="600" y="375" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c5ddd0">história infantil · cantiga · Sítio</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
