'use strict';

/** Capa 1200×630 — Paulinho o LOKO (Canais · Games). CRT de canal, não terra de pessoa. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/paulinho-canal-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07110c"/>
      <stop offset="55%" stop-color="#0c1c14"/>
      <stop offset="100%" stop-color="#121008"/>
    </linearGradient>
    <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(110,220,140,0.07)"/>
      <stop offset="100%" stop-color="rgba(110,220,140,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#scan)"/>
  <g opacity="0.22" fill="none" stroke="#6edc8c" stroke-width="2">
    <rect x="820" y="160" width="220" height="140" rx="8"/>
    <path d="M850 300 L880 360 L980 360 L1010 300"/>
    <rect x="890" y="200" width="80" height="50" rx="4"/>
    <circle cx="930" cy="225" r="12"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#7dff9a" letter-spacing="5">CANAIS · GAMES</text>
  <text x="80" y="250" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#e8ffe8">PAULINHO</text>
  <text x="80" y="330" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#9ad4a8">o LOKO</text>
  <text x="80" y="420" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="rgba(200,240,210,0.92)">arquivo GTA RP / Anti-RP</text>
  <text x="80" y="500" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#9ad4a8">anti-rp · polícia · golpes de servidor · modo história</text>
  <text x="80" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#6edc8c">@PaulinhoLOKOoficial · desde 2015 · crédito ao ofício</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
