'use strict';

/** Capa 1200×630 — Caderno de jogo 1 · GTA 6. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/gta6-caderno-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="45%" stop-color="#2a1812"/>
      <stop offset="100%" stop-color="#0c1a22"/>
    </linearGradient>
    <radialGradient id="sun" cx="78%" cy="22%" r="38%">
      <stop offset="0%" stop-color="rgba(232,168,72,0.35)"/>
      <stop offset="100%" stop-color="rgba(232,168,72,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="940" cy="140" r="210" fill="url(#sun)"/>
  <rect x="80" y="70" width="9" height="490" fill="rgba(212,184,150,0.35)"/>
  <text x="120" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d4b896" letter-spacing="3">CADERNO DE JOGO · 1</text>
  <text x="120" y="250" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4ebe0">GTA 6</text>
  <text x="120" y="320" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,210,180,0.95)">a cidade anunciada</text>
  <text x="120" y="430" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c4a070">Vice City · Leonida · Lucia + Jason</text>
  <text x="120" y="500" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d4b896">pré-estreia 19 nov. 2026 · sem walkthrough</text>
  <text x="120" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(212,184,150,0.8)">risco · verdade · caminho · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
