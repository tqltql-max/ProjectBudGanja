'use strict';

/** Capa 1200×630 — Como os ricos transformam as coisas (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(
    ROOT,
    'imagens/inspecoes/como-os-ricos-transformam-as-coisas-cover.jpg'
  );
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="50%" stop-color="#2a2018"/>
      <stop offset="100%" stop-color="#0e0c0a"/>
    </linearGradient>
    <linearGradient id="box" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c4a574"/>
      <stop offset="100%" stop-color="#6a5030"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="180" y="200" width="140" height="100" rx="4" fill="url(#box)" opacity="0.85"/>
  <path d="M320 250 L420 200 L420 300 L320 350 Z" fill="rgba(180,140,80,0.5)"/>
  <path d="M420 200 L520 250 L520 350 L420 300 Z" fill="rgba(140,100,60,0.45)"/>
  <circle cx="780" cy="280" r="70" fill="none" stroke="rgba(200,160,100,0.4)" stroke-width="3"/>
  <path d="M780 220 L780 280 L830 310" fill="none" stroke="rgba(220,180,120,0.7)" stroke-width="4" stroke-linecap="round"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a880" letter-spacing="4">EXPRESSÕES · CICLO DAS COISAS</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" font-weight="700" fill="#f0e8dc">Como os ricos transformam as coisas</text>
  <text x="600" y="535" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="17" fill="#b8a888">perguntar o ciclo · Annie Leonard · Faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
