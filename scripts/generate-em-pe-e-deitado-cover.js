'use strict';

/** Capa 1200×630 — em pé e deitado (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/em-pe-e-deitado-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1018"/>
      <stop offset="50%" stop-color="#141c24"/>
      <stop offset="100%" stop-color="#10140e"/>
    </linearGradient>
    <radialGradient id="glowL" cx="28%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(90,180,150,0.28)"/>
      <stop offset="100%" stop-color="rgba(10,16,20,0)"/>
    </radialGradient>
    <radialGradient id="glowR" cx="72%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(200,170,80,0.24)"/>
      <stop offset="100%" stop-color="rgba(10,16,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="340" cy="280" rx="220" ry="180" fill="url(#glowL)"/>
  <ellipse cx="860" cy="280" rx="220" ry="180" fill="url(#glowR)"/>
  <path d="M 340 140 C 250 140 250 250 340 315 C 430 380 430 490 340 490 C 250 490 250 380 340 315 C 430 250 430 140 340 140" fill="none" stroke="rgba(160,220,190,0.92)" stroke-width="10" stroke-linecap="round"/>
  <path d="M 700 300 C 700 200 800 200 860 300 C 920 400 1020 400 1020 300 C 1020 200 920 200 860 300 C 800 400 700 400 700 300" fill="none" stroke="rgba(220,200,130,0.9)" stroke-width="10" stroke-linecap="round"/>
  <text x="340" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#90c8b8" letter-spacing="3">EM PÉ</text>
  <text x="860" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#c8b878" letter-spacing="3">DEITADO</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b878" letter-spacing="4">EXPRESSÕES · LEMNISCATA · POSTURAS</text>
  <text x="600" y="575" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="32" font-weight="700" fill="#f4f0e4">em pé e deitado</text>
  <text x="600" y="610" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(210,230,220,0.9)">bodiado → deitado · o corpo endireita a fita</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
