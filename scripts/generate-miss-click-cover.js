'use strict';

/** Capa 1200×630 — Miss Click (Expressões): o clique ao lado do alvo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/miss-click-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#070b12"/>
      <stop offset="48%" stop-color="#101820"/>
      <stop offset="100%" stop-color="#1a2830"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="42%" r="36%">
      <stop offset="0%" stop-color="rgba(80,200,196,0.28)"/>
      <stop offset="55%" stop-color="rgba(40,90,100,0.12)"/>
      <stop offset="100%" stop-color="rgba(8,12,18,0)"/>
    </radialGradient>
    <radialGradient id="missglow" cx="46%" cy="48%" r="18%">
      <stop offset="0%" stop-color="rgba(232,120,90,0.42)"/>
      <stop offset="100%" stop-color="rgba(8,12,18,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="860" cy="268" rx="240" ry="180" fill="url(#glow)"/>
  <ellipse cx="548" cy="292" rx="90" ry="70" fill="url(#missglow)"/>
  <rect x="742" y="188" width="236" height="92" rx="18" fill="none" stroke="rgba(160,232,220,0.78)" stroke-width="6"/>
  <text x="860" y="246" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="rgba(200,244,236,0.92)" letter-spacing="3">ALVO</text>
  <circle cx="860" cy="234" r="0" fill="none"/>
  <path d="M548 292 l18 48 l-48 -14 z" fill="#e8f4f0" stroke="#0c1218" stroke-width="3"/>
  <circle cx="548" cy="292" r="16" fill="none" stroke="rgba(232,140,110,0.95)" stroke-width="5"/>
  <path d="M536 280 l24 24 M560 280 l-24 24" fill="none" stroke="rgba(232,140,110,0.95)" stroke-width="4" stroke-linecap="round"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#9ec8c4" letter-spacing="3.2">EXPRESSÕES · MIS- + CLICK · COLA: SENHORITA CLIQUE</text>
  <text x="600" y="478" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f2f7f4">Miss Click</text>
  <text x="600" y="528" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,230,226,0.95)">o clique que falhou o alvo · étimo mis- + click</text>
  <text x="600" y="574" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(170,200,196,0.9)">≠ mistress · ≠ clique social · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
