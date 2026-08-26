'use strict';

/** Capa 1200×630 — maçaneta (Palavras · cruzamento gesto/mãos/luz). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/macaneta-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12161c"/>
      <stop offset="50%" stop-color="#1c2430"/>
      <stop offset="100%" stop-color="#0e1014"/>
    </linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d8c8a0"/>
      <stop offset="50%" stop-color="#a89060"/>
      <stop offset="100%" stop-color="#7a6840"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="38%" r="22%">
      <stop offset="0%" stop-color="rgba(255,220,120,0.45)"/>
      <stop offset="100%" stop-color="rgba(255,220,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="860" cy="220" r="120" fill="url(#glow)"/>
  <rect x="280" y="140" width="28" height="360" rx="4" fill="rgba(180,190,200,0.25)"/>
  <circle cx="420" cy="320" r="58" fill="url(#metal)" stroke="rgba(240,230,200,0.4)" stroke-width="3"/>
  <circle cx="420" cy="320" r="18" fill="rgba(40,40,40,0.55)"/>
  <rect x="470" y="308" width="70" height="24" rx="8" fill="url(#metal)"/>
  <rect x="780" y="280" width="36" height="70" rx="6" fill="rgba(220,210,180,0.85)"/>
  <rect x="788" y="250" width="20" height="36" rx="4" fill="rgba(240,230,200,0.7)"/>
  <path d="M798 250 L798 200" stroke="rgba(255,230,140,0.7)" stroke-width="3" stroke-linecap="round"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9eb0c4" letter-spacing="4">PALAVRAS · GESTO · LIMIAR · LUZ</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#eef2f6">maçaneta</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="17" fill="#a8b8c8">torcer · abrir · mãos · porta/janela · ligar/desligar</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
