'use strict';

/** Capa 1200×630 — virou carne de vaca (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/virou-carne-de-vaca-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a100c"/>
      <stop offset="48%" stop-color="#3a1814"/>
      <stop offset="100%" stop-color="#120e0c"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="42%" r="40%">
      <stop offset="0%" stop-color="rgba(180,70,50,0.28)"/>
      <stop offset="100%" stop-color="rgba(180,70,50,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <ellipse cx="880" cy="290" rx="88" ry="70" fill="none" stroke="rgba(220,170,140,0.4)" stroke-width="3"/>
  <ellipse cx="848" cy="268" rx="14" ry="18" fill="none" stroke="rgba(220,170,140,0.35)" stroke-width="2"/>
  <ellipse cx="912" cy="268" rx="14" ry="18" fill="none" stroke="rgba(220,170,140,0.35)" stroke-width="2"/>
  <rect x="820" y="400" width="120" height="72" rx="6" fill="rgba(90,40,32,0.55)" stroke="rgba(220,170,140,0.35)" stroke-width="2"/>
  <text x="880" y="442" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="700" fill="#e8d0c0" letter-spacing="3">COMUM PRA NÓS</text>
  <text x="600" y="128" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#d4b8a8" letter-spacing="6">EXPRESSÕES · O DE TODO O DIA</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4e8dc">virou carne de vaca</text>
  <text x="600" y="368" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#dcc8bc">especial · comum · mesa · todo o dia</text>
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#b89888">ficou comum pra nós</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
