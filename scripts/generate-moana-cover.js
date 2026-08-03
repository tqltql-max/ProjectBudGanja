'use strict';

/** Capa 1200×630 — Moana (Artes · desenho). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/moana-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#0a2840"/>
      <stop offset="45%" stop-color="#0e4a5c"/>
      <stop offset="100%" stop-color="#1a3a28"/>
    </linearGradient>
    <radialGradient id="sun" cx="78%" cy="28%" r="28%">
      <stop offset="0%" stop-color="rgba(255,200,120,0.45)"/>
      <stop offset="55%" stop-color="rgba(255,160,80,0.12)"/>
      <stop offset="100%" stop-color="rgba(10,40,64,0)"/>
    </radialGradient>
    <linearGradient id="wave" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(120,210,230,0)"/>
      <stop offset="50%" stop-color="rgba(140,220,240,0.35)"/>
      <stop offset="100%" stop-color="rgba(120,210,230,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="920" cy="160" rx="180" ry="120" fill="url(#sun)"/>
  <path d="M0 420 C200 380, 400 460, 600 410 C800 360, 1000 440, 1200 400 L1200 630 L0 630 Z" fill="rgba(20,80,90,0.55)"/>
  <path d="M0 460 C220 430, 420 500, 620 450 C820 400, 1020 480, 1200 440" fill="none" stroke="url(#wave)" stroke-width="6"/>
  <path d="M0 500 C240 470, 440 540, 640 490 C840 440, 1040 520, 1200 480" fill="none" stroke="rgba(160,230,245,0.25)" stroke-width="4"/>
  <path d="M520 390 L600 250 L640 390 Z" fill="rgba(240,220,180,0.55)"/>
  <line x1="600" y1="250" x2="600" y2="200" stroke="rgba(250,230,200,0.7)" stroke-width="3"/>
  <path d="M600 200 L670 230 L600 218 Z" fill="rgba(250,230,200,0.65)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9ad4e0" letter-spacing="4">ARTES · DESENHO · OCEANO · VOCAÇÃO</text>
  <text x="600" y="210" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f2f8fa">Moana</text>
  <text x="600" y="545" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,245,250,0.92)">2016 · Disney Animation · Clements &amp; Musker</text>
  <text x="600" y="586" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#b8e0c8">mar · navegar · caminho · ilha</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
