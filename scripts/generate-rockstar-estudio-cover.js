'use strict';

/** Capa 1200×630 — Rockstar Games · estúdio (editorial, sem logótipo oficial). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/rockstar-estudio-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="55%" stop-color="#1a1208"/>
      <stop offset="100%" stop-color="#0d1a14"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="18%" r="42%">
      <stop offset="0%" stop-color="rgba(255,204,0,0.28)"/>
      <stop offset="100%" stop-color="rgba(255,204,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="980" cy="120" r="220" fill="url(#glow)"/>
  <polygon points="980,48 1002,108 1068,108 1014,146 1034,206 980,168 926,206 946,146 892,108 958,108" fill="rgba(255,204,0,0.55)"/>
  <rect x="80" y="70" width="9" height="490" fill="rgba(255,204,0,0.35)"/>
  <text x="120" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#ffcc00" letter-spacing="3">CADERNOS DE JOGO · ESTÚDIO</text>
  <text x="120" y="250" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f5f0e6">Rockstar Games</text>
  <text x="120" y="320" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,210,180,0.95)">estúdio das cidades de ecrã</text>
  <text x="120" y="420" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4a070">Nova Iorque · Take-Two · 1998</text>
  <text x="120" y="490" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d4b896">GTA · Red Dead · RAGE · rede de studios</text>
  <text x="120" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(212,184,150,0.8)">ficção ≠ manual · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
