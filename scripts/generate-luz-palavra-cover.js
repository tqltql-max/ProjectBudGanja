'use strict';

/** Capa 1200×630 — luz (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/luz-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0c12"/>
      <stop offset="40%" stop-color="#1a1830"/>
      <stop offset="100%" stop-color="#0c1018"/>
    </linearGradient>
    <radialGradient id="beam" cx="50%" cy="28%" r="55%">
      <stop offset="0%" stop-color="rgba(255,245,180,0.55)"/>
      <stop offset="35%" stop-color="rgba(255,210,90,0.22)"/>
      <stop offset="100%" stop-color="rgba(20,16,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="180" rx="320" ry="220" fill="url(#beam)"/>
  <circle cx="600" cy="160" r="48" fill="rgba(255,240,160,0.95)"/>
  <path d="M520 280 L600 160 L680 280 Z" fill="rgba(255,230,140,0.18)"/>
  <rect x="540" y="400" width="120" height="70" rx="12" fill="rgba(40,48,60,0.9)" stroke="rgba(220,200,120,0.4)" stroke-width="2"/>
  <rect x="570" y="418" width="60" height="34" rx="6" fill="rgba(255,230,120,0.75)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e0c878" letter-spacing="4">PALAVRAS · CIRCUITO · EFEITO</text>
  <text x="600" y="360" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#fff8e0">luz</text>
  <text x="600" y="520" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,220,190,0.95)">lūx · interruptor · ligar</text>
  <text x="600" y="565" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d0b870">faça o melhor com a luz certa</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
