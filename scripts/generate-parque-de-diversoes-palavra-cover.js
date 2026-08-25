'use strict';

/** Capa 1200×630 — Palavras · parque de diversões (recinto ≠ Parkinson). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/parque-de-diversoes-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12081a"/>
      <stop offset="45%" stop-color="#1a1030"/>
      <stop offset="100%" stop-color="#201408"/>
    </linearGradient>
    <radialGradient id="lights" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="rgba(220,80,120,0.28)"/>
      <stop offset="55%" stop-color="rgba(80,140,220,0.18)"/>
      <stop offset="100%" stop-color="rgba(18,8,26,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="260" rx="420" ry="220" fill="url(#lights)"/>
  <circle cx="600" cy="250" r="110" fill="none" stroke="rgba(255,210,120,0.45)" stroke-width="6"/>
  <circle cx="600" cy="250" r="58" fill="none" stroke="rgba(255,180,90,0.30)" stroke-width="3"/>
  <path d="M600 140 L600 360 M490 250 L710 250 M522 172 L678 328 M678 172 L522 328" fill="none" stroke="rgba(255,210,120,0.35)" stroke-width="3"/>
  <circle cx="600" cy="140" r="10" fill="rgba(255,80,120,0.8)"/>
  <circle cx="710" cy="250" r="10" fill="rgba(80,180,255,0.8)"/>
  <circle cx="600" cy="360" r="10" fill="rgba(255,200,80,0.85)"/>
  <circle cx="490" cy="250" r="10" fill="rgba(120,255,180,0.75)"/>
  <rect x="160" y="430" width="880" height="8" fill="rgba(255,210,120,0.18)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e0c070" letter-spacing="3">PALAVRAS · PARRICUS + DIVERSÃO · ≠ PARKINSON</text>
  <text x="600" y="455" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f4efe6">Parque de diversões</text>
  <text x="600" y="510" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">o recinto da festa escolhida · a roda gira com bilhete</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c8b080">party pode entrar · não é o apelido · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
