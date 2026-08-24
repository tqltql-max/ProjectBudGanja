'use strict';

/** Capa 1200×630 — missão comprida (Expressões): o u do fecho × o o do comprimento. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/missao-comprida-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0e14"/>
      <stop offset="48%" stop-color="#142018"/>
      <stop offset="100%" stop-color="#1c2a22"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="40%" r="38%">
      <stop offset="0%" stop-color="rgba(90,200,140,0.30)"/>
      <stop offset="55%" stop-color="rgba(40,90,70,0.12)"/>
      <stop offset="100%" stop-color="rgba(8,12,18,0)"/>
    </radialGradient>
    <radialGradient id="pathglow" cx="36%" cy="52%" r="42%">
      <stop offset="0%" stop-color="rgba(210,170,80,0.22)"/>
      <stop offset="100%" stop-color="rgba(8,12,18,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="900" cy="250" rx="250" ry="180" fill="url(#glow)"/>
  <ellipse cx="430" cy="320" rx="320" ry="160" fill="url(#pathglow)"/>
  <path d="M80 390 C 220 360, 280 430, 400 400 S 560 330, 700 360 S 860 430, 980 300" fill="none" stroke="rgba(232,200,120,0.82)" stroke-width="8" stroke-linecap="round"/>
  <path d="M80 390 C 220 360, 280 430, 400 400 S 560 330, 700 360 S 860 430, 980 300" fill="none" stroke="rgba(120,80,30,0.35)" stroke-width="2" stroke-dasharray="10 14"/>
  <circle cx="980" cy="300" r="28" fill="none" stroke="rgba(140,230,180,0.95)" stroke-width="5"/>
  <path d="M968 300 l10 12 l22 -24" fill="none" stroke="rgba(140,230,180,0.95)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="248" cy="248" r="46" fill="none" stroke="rgba(232,200,120,0.75)" stroke-width="4"/>
  <text x="248" y="264" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#e8d090">o</text>
  <circle cx="348" cy="248" r="46" fill="none" stroke="rgba(140,230,180,0.75)" stroke-width="4"/>
  <text x="348" y="264" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#9ee0b8">u</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#9ec8a8" letter-spacing="3.2">EXPRESSÕES · CUMPRIR × COMPRIDO · COLA: U → O</text>
  <text x="600" y="488" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f2f7f4">missão comprida</text>
  <text x="600" y="536" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,230,210,0.95)">canónica: cumprida · cola: comprimento · étimo: complēre</text>
  <text x="600" y="578" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(170,200,180,0.9)">≠ régua · ≠ bandeira de palco · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
