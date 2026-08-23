'use strict';

/** Capa 1200×630 — Artes · Rick and Morty (desenho 2013). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/rick-and-morty-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070b12"/>
      <stop offset="48%" stop-color="#102418"/>
      <stop offset="100%" stop-color="#0a1014"/>
    </linearGradient>
    <radialGradient id="portal" cx="50%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(90,255,140,0.55)"/>
      <stop offset="42%" stop-color="rgba(30,180,90,0.22)"/>
      <stop offset="100%" stop-color="rgba(10,20,16,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="280" ry="210" fill="url(#portal)"/>
  <ellipse cx="600" cy="250" rx="118" ry="88" fill="none" stroke="rgba(140,255,180,0.85)" stroke-width="10"/>
  <ellipse cx="600" cy="250" rx="168" ry="126" fill="none" stroke="rgba(70,220,130,0.45)" stroke-width="4"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#8fe8b0" letter-spacing="4">ARTES · DESENHO 2013 · CAP. 09</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#e8fff2">Rick and Morty</text>
  <text x="600" y="524" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8e0c8">faca o melhor nesta linha</text>
  <text x="600" y="574" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(180,230,200,0.9)">portal · multiverso · Adult Swim</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
