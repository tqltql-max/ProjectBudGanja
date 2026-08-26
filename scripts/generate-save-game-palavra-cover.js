'use strict';

/** Capa 1200×630 — Save Game (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/save-game-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#041208"/>
      <stop offset="50%" stop-color="#0c1c10"/>
      <stop offset="100%" stop-color="#020804"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(80,220,120,0.28)"/>
      <stop offset="100%" stop-color="rgba(80,220,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="380" ry="200" fill="url(#glow)"/>
  <rect x="340" y="168" width="520" height="168" rx="8" fill="none" stroke="rgba(120,255,160,0.45)" stroke-width="3"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#7dff9a" letter-spacing="4">PALAVRAS · MENU · SLOT 1</text>
  <text x="600" y="248" text-anchor="middle" font-family="Consolas, Courier New, monospace" font-size="52" font-weight="700" fill="#c8ffd4">SAVE GAME</text>
  <text x="600" y="390" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,255,210,0.95)">salve tudo · gravar a partida</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#8ed8a4">o rasto, não o milagre</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#7dff9a">Load · New · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
