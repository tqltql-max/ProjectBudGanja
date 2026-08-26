'use strict';

/** Capa 1200×630 — Artes · The Killing Jar (Siouxsie and the Banshees). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/the-killing-jar-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0814"/>
      <stop offset="42%" stop-color="#1a1230"/>
      <stop offset="78%" stop-color="#0d3a32"/>
      <stop offset="100%" stop-color="#6ec4a8"/>
    </linearGradient>
    <radialGradient id="glow" cx="28%" cy="40%" r="38%">
      <stop offset="0%" stop-color="rgba(126,90,210,0.45)"/>
      <stop offset="100%" stop-color="rgba(126,90,210,0)"/>
    </radialGradient>
    <radialGradient id="jar" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="rgba(160,255,210,0.22)"/>
      <stop offset="100%" stop-color="rgba(160,255,210,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="320" cy="250" r="260" fill="url(#glow)"/>
  <ellipse cx="780" cy="300" rx="170" ry="210" fill="url(#jar)"/>
  <path d="M700 168 H860 Q890 168 890 198 V430 Q890 490 780 500 Q670 490 670 430 V198 Q670 168 700 168 Z" fill="none" stroke="rgba(186,255,230,0.7)" stroke-width="6"/>
  <path d="M690 168 Q780 148 870 168" fill="none" stroke="rgba(232,210,255,0.85)" stroke-width="8"/>
  <ellipse cx="780" cy="198" rx="88" ry="16" fill="rgba(186,255,230,0.18)"/>
  <path d="M640 250 Q700 210 760 250 Q800 200 860 248 Q820 280 780 268 Q740 292 700 270 Q660 290 640 250 Z" fill="none" stroke="rgba(244,230,255,0.8)" stroke-width="3"/>
  <path d="M720 250 Q760 300 800 250" fill="none" stroke="rgba(244,230,255,0.55)" stroke-width="2"/>
  <circle cx="780" cy="248" r="5" fill="rgba(244,230,255,0.9)"/>
  <line x1="780" y1="200" x2="780" y2="268" stroke="rgba(232,210,255,0.45)" stroke-width="2"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#c9f5e4" letter-spacing="6">ARTES · CANÇÃO 1988</text>
  <text x="600" y="522" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#f4f8fc">The Killing Jar</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#d7c8f0">Siouxsie and the Banshees · inspecionar sem pregar</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
