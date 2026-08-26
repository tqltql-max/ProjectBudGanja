'use strict';

/** Capa 1200×630 — noite (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/noite-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#060810"/>
      <stop offset="55%" stop-color="#12182a"/>
      <stop offset="100%" stop-color="#1a2240"/>
    </linearGradient>
    <radialGradient id="moon" cx="68%" cy="32%" r="28%">
      <stop offset="0%" stop-color="rgba(230,235,255,0.85)"/>
      <stop offset="45%" stop-color="rgba(160,180,220,0.25)"/>
      <stop offset="100%" stop-color="rgba(20,24,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="820" cy="200" rx="180" ry="160" fill="url(#moon)"/>
  <circle cx="820" cy="200" r="54" fill="#e8ecf8"/>
  <circle cx="800" cy="188" r="48" fill="#12182a"/>
  <circle cx="220" cy="140" r="2" fill="#c8d0e8"/>
  <circle cx="340" cy="100" r="1.5" fill="#a8b4d0"/>
  <circle cx="480" cy="160" r="2" fill="#d0d8f0"/>
  <circle cx="160" cy="220" r="1.5" fill="#b0bcd8"/>
  <circle cx="520" cy="80" r="1.5" fill="#c0c8e0"/>
  <circle cx="980" cy="360" r="2" fill="#d8e0f4"/>
  <circle cx="1080" cy="120" r="1.5" fill="#a8b4d0"/>
  <rect x="540" y="420" width="120" height="70" rx="12" fill="rgba(36,44,60,0.95)" stroke="rgba(160,180,220,0.35)" stroke-width="2"/>
  <rect x="570" y="438" width="60" height="34" rx="6" fill="rgba(220,230,255,0.35)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8b8e0" letter-spacing="4">PALAVRAS · CICLO · ESCURO</text>
  <text x="600" y="380" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#e8ecf8">noite</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,210,235,0.95)">nox · sol · luz</text>
  <text x="600" y="575" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b0c0e8">faça o melhor com a noite certa</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
