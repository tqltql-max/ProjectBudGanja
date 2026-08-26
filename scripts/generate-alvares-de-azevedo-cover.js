'use strict';

/** Capa 1200×630 — Pessoas · homenagem a Álvares de Azevedo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/alvares-de-azevedo-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="45%" stop-color="#2a2218"/>
      <stop offset="100%" stop-color="#0e0c0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="40%" r="38%">
      <stop offset="0%" stop-color="rgba(200,160,100,0.20)"/>
      <stop offset="100%" stop-color="rgba(200,160,100,0)"/>
    </radialGradient>
    <linearGradient id="ink" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(230,210,170,0.9)"/>
      <stop offset="100%" stop-color="rgba(140,110,70,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="580" cy="260" r="210" fill="url(#glow)"/>
  <!-- quill -->
  <path d="M420 420 L620 180 L640 200 L460 450 Z" fill="url(#ink)" opacity="0.85"/>
  <path d="M620 180 L655 155 L670 175 L640 200 Z" fill="rgba(240,220,180,0.75)"/>
  <line x1="430" y1="430" x2="700" y2="480" stroke="rgba(220,190,140,0.35)" stroke-width="2"/>
  <!-- open book suggestion -->
  <path d="M720 300 Q780 250 840 300 L840 420 Q780 380 720 420 Z" fill="rgba(230,210,170,0.12)" stroke="rgba(230,210,170,0.35)" stroke-width="2"/>
  <path d="M840 300 Q900 250 960 300 L960 420 Q900 380 840 420 Z" fill="rgba(230,210,170,0.08)" stroke="rgba(230,210,170,0.28)" stroke-width="2"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#d4b48a" letter-spacing="7">PESSOAS · HOMENAGEM</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#f4efe6">Álvares de Azevedo</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">1831–1852 · Lira dos Vinte Anos</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
