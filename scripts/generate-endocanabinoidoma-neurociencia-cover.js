'use strict';

/** Capa 1200×630 — Endocanabinoidoma (Neurociências). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/endocanabinoidoma-neurociencia-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1018"/>
      <stop offset="50%" stop-color="#141c28"/>
      <stop offset="100%" stop-color="#0e1620"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="45%">
      <stop offset="0%" stop-color="rgba(100,180,200,0.28)"/>
      <stop offset="50%" stop-color="rgba(80,140,170,0.12)"/>
      <stop offset="100%" stop-color="rgba(20,30,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="300" rx="320" ry="200" fill="url(#glow)"/>
  <circle cx="600" cy="280" r="70" fill="none" stroke="rgba(140,200,220,0.45)" stroke-width="3"/>
  <circle cx="600" cy="280" r="38" fill="none" stroke="rgba(140,200,220,0.35)" stroke-width="2"/>
  <circle cx="520" cy="240" r="10" fill="rgba(160,210,230,0.5)"/>
  <circle cx="680" cy="240" r="10" fill="rgba(160,210,230,0.5)"/>
  <circle cx="540" cy="340" r="8" fill="rgba(140,190,210,0.4)"/>
  <circle cx="660" cy="340" r="8" fill="rgba(140,190,210,0.4)"/>
  <path d="M520 240 Q600 200 680 240" fill="none" stroke="rgba(140,200,220,0.35)" stroke-width="2"/>
  <path d="M540 340 Q600 380 660 340" fill="none" stroke="rgba(140,200,220,0.3)" stroke-width="2"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#8ec8d8" letter-spacing="4">NEUROCIÊNCIAS · CAP. 1</text>
  <text x="600" y="200" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#eef6fa">Endocanabinoidoma</text>
  <text x="600" y="420" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(210,230,240,0.95)">ECS · CB1 · CB2 · mapa de ofício</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#a8c8d8">faça o melhor ao ler o cérebro</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#7898a8">Sidarta · Carlini · Albaugh</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
