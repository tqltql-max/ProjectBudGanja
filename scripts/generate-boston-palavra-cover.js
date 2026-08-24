'use strict';

/** Capa 1200×630 — Palavras · Boston (cidade ≠ bosta). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/boston-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071018"/>
      <stop offset="45%" stop-color="#0c2438"/>
      <stop offset="100%" stop-color="#1a1810"/>
    </linearGradient>
    <radialGradient id="harbour" cx="28%" cy="58%" r="46%">
      <stop offset="0%" stop-color="rgba(40,110,160,0.50)"/>
      <stop offset="100%" stop-color="rgba(7,16,24,0)"/>
    </radialGradient>
    <radialGradient id="steeple" cx="72%" cy="40%" r="38%">
      <stop offset="0%" stop-color="rgba(200,180,140,0.28)"/>
      <stop offset="100%" stop-color="rgba(20,16,10,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="320" cy="380" rx="340" ry="200" fill="url(#harbour)"/>
  <ellipse cx="860" cy="250" rx="260" ry="180" fill="url(#steeple)"/>
  <path d="M140 420 L1060 420" fill="none" stroke="rgba(180,200,210,0.28)" stroke-width="3"/>
  <rect x="780" y="210" width="28" height="210" fill="rgba(210,190,160,0.35)"/>
  <polygon points="794,168 760,214 828,214" fill="rgba(220,200,170,0.40)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c4b070" letter-spacing="3">PALAVRAS · CIDADE · TŪN · ≠ BOSTA</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4efe6">Boston</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">Botolph's town · a vila atravessou o Atlântico</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">o -on que a piada apaga é a vila</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a09070">Lincolnshire → Massachusetts · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
