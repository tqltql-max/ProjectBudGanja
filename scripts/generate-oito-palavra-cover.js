'use strict';

/** Capa 1200×630 — oito / 8 em pé × ∞ deitado × * cortado. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/oito-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a121c"/>
      <stop offset="48%" stop-color="#142028"/>
      <stop offset="100%" stop-color="#0c1412"/>
    </linearGradient>
    <radialGradient id="glow" cx="42%" cy="46%" r="42%">
      <stop offset="0%" stop-color="rgba(180,160,90,0.22)"/>
      <stop offset="100%" stop-color="rgba(10,18,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="480" cy="290" rx="280" ry="200" fill="url(#glow)"/>
  <text x="430" y="420" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="320" font-weight="700" fill="rgba(244,240,228,0.92)">8</text>
  <text x="860" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" fill="rgba(220,200,130,0.85)">∞</text>
  <text x="860" y="390" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" fill="rgba(160,180,190,0.35)">*</text>
  <line x1="800" y1="350" x2="920" y2="430" stroke="rgba(200,120,110,0.55)" stroke-width="4"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b878" letter-spacing="3">PALAVRAS · OCTŌ · 8 EM PÉ · ≠ ASTERISCO</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f4f0e4">oito</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(210,230,220,0.95)">em pé = caminho · deitado = ∞ · cruzamento = elo</text>
  <text x="600" y="586" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#90c8b8">Shift+8 = * · outra sala</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
