'use strict';

/** Capa 1200×630 — Palavras · sonhar × sonar. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/sonhar-sonar-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101828"/>
      <stop offset="55%" stop-color="#162030"/>
      <stop offset="100%" stop-color="#0a1018"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="#8eb4d8"/>
  <ellipse cx="340" cy="250" rx="90" ry="48" fill="none" stroke="#c8d8e8" stroke-width="4"/>
  <ellipse cx="300" cy="268" rx="54" ry="32" fill="none" stroke="#a8c0d8" stroke-width="3"/>
  <path d="M780 200 q40 40 0 80" fill="none" stroke="#7ec8c0" stroke-width="4" stroke-linecap="round"/>
  <path d="M820 180 q60 60 0 120" fill="none" stroke="#7ec8c0" stroke-width="3" stroke-linecap="round"/>
  <path d="M860 160 q80 80 0 160" fill="none" stroke="#5aa8a0" stroke-width="2" stroke-linecap="round"/>
  <text x="600" y="118" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#8eb4d8" letter-spacing="4">PALAVRAS · SOMNIĀRE ≠ SONĀRE</text>
  <text x="600" y="310" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4efe6">sonhar × sonar</text>
  <text x="600" y="378" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8c8c0">o h e o ñ cortam</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#8eb4d8">sonho ≠ eco ≠ soar · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
