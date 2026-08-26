'use strict';

/** Capa 1200×630 — o templo de Cristo, corpo e alma (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(
    ROOT,
    'imagens/inspecoes/templo-de-cristo-corpo-e-alma-cover.jpg'
  );
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12161c"/>
      <stop offset="50%" stop-color="#1a2230"/>
      <stop offset="100%" stop-color="#0a0c10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="48%">
      <stop offset="0%" stop-color="rgba(210,190,140,0.26)"/>
      <stop offset="100%" stop-color="rgba(210,190,140,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="230" r="270" fill="url(#glow)"/>
  <path d="M600 118 L720 188 L480 188 Z" fill="none" stroke="rgba(220,200,150,0.55)" stroke-width="3"/>
  <rect x="508" y="188" width="28" height="92" fill="none" stroke="rgba(220,200,150,0.45)" stroke-width="2.5"/>
  <rect x="586" y="188" width="28" height="92" fill="none" stroke="rgba(220,200,150,0.45)" stroke-width="2.5"/>
  <rect x="664" y="188" width="28" height="92" fill="none" stroke="rgba(220,200,150,0.45)" stroke-width="2.5"/>
  <rect x="478" y="278" width="244" height="12" fill="none" stroke="rgba(220,200,150,0.5)" stroke-width="2.5"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d2be8c" letter-spacing="4">EXPRESSÕES · MORADA × INTEIREZA</text>
  <text x="600" y="360" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="700" fill="#f5f0e4">o templo de Cristo</text>
  <text x="600" y="412" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="32" font-style="italic" fill="#e8dcc4">corpo e alma</text>
  <text x="600" y="475" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,190,0.95)">templum · corpus · anima — sem fender a pessoa</text>
  <text x="600" y="545" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8a878">respeito à fé — sem catecismo</text>
  <text x="600" y="588" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#d2be8c">alma · filho de deus · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
