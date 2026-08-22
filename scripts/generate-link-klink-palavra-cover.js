'use strict';

/** Capa 1200×630 — link × Klink (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/link-klink-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a141c"/>
      <stop offset="50%" stop-color="#122028"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="42%" r="42%">
      <stop offset="0%" stop-color="rgba(160,200,220,0.22)"/>
      <stop offset="55%" stop-color="rgba(223,194,98,0.10)"/>
      <stop offset="100%" stop-color="rgba(10,18,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="280" rx="300" ry="190" fill="url(#glow)"/>
  <!-- two chain links that do not fuse -->
  <ellipse cx="470" cy="270" rx="70" ry="42" fill="none" stroke="rgba(200,220,230,0.75)" stroke-width="10"/>
  <ellipse cx="610" cy="270" rx="70" ry="42" fill="none" stroke="rgba(223,194,98,0.85)" stroke-width="10"/>
  <!-- gap mark -->
  <line x1="540" y1="248" x2="540" y2="292" stroke="rgba(232,120,90,0.7)" stroke-width="3" stroke-linecap="round"/>
  <!-- K standing apart -->
  <text x="360" y="288" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#e8c97a">K</text>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8c8d8" letter-spacing="5">PALAVRAS · ORELHA COLA · ÉTIMO CORTA</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4efe6">link · Klink</text>
  <text x="600" y="490" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8b8a0">Tamara Klink · relação, não origem</text>
  <text x="600" y="545" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#90b8c8">tamaraklink.com soa a elo — o apelido é outro ofício</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
