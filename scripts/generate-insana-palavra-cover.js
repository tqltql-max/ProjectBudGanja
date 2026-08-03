'use strict';

/** Capa 1200×630 — insana (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/insana-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#140e18"/>
      <stop offset="50%" stop-color="#1e1424"/>
      <stop offset="100%" stop-color="#0e1210"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="45%">
      <stop offset="0%" stop-color="rgba(200,120,160,0.22)"/>
      <stop offset="55%" stop-color="rgba(120,100,160,0.12)"/>
      <stop offset="100%" stop-color="rgba(30,20,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="310" rx="300" ry="200" fill="url(#glow)"/>
  <path d="M420 400 Q520 280 600 380 Q680 480 780 320" fill="none" stroke="rgba(220,160,180,0.4)" stroke-width="4"/>
  <circle cx="520" cy="300" r="6" fill="rgba(240,180,200,0.55)"/>
  <circle cx="680" cy="340" r="5" fill="rgba(200,160,220,0.5)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d0a0c0" letter-spacing="4">PALAVRAS · INTENSIDADE · CUIDADO</text>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f8eef4">insana</text>
  <text x="600" y="310" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,220,230,0.95)">in- + sanus · excesso · ≠ diagnóstico</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d0b8c8">faça o melhor com medida</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#b090a8">verdade · respeito · risco</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
