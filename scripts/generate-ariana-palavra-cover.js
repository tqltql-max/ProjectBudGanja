'use strict';

/** Capa 1200×630 — palavra Ariana / Áries (1.º signo). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/ariana-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a0c08"/>
      <stop offset="48%" stop-color="#3a1810"/>
      <stop offset="100%" stop-color="#0c1018"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="210" cy="200" r="70" fill="none" stroke="rgba(232,180,90,0.45)" stroke-width="6"/>
  <path d="M175 175 Q210 120 245 175" fill="none" stroke="rgba(232,180,90,0.7)" stroke-width="7" stroke-linecap="round"/>
  <path d="M165 168 Q190 115 220 160" fill="none" stroke="rgba(232,180,90,0.45)" stroke-width="5" stroke-linecap="round"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8c55a" letter-spacing="6">PALAVRAS · 1.º SIGNO · ≠ HORÓSCOPO</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f7f0e4">Ariana</text>
  <text x="600" y="368" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#e8c8a0">Áries · ariano · arianos · carneiro</text>
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,200,170,0.8)">lat. ariēs · primeiro do ciclo · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
