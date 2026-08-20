'use strict';

/** Capa 1200×630 — Caderno de jogo 2 · Story of Seasons Grand Bazaar. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/sos-grand-bazaar-caderno-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c2218"/>
      <stop offset="48%" stop-color="#163528"/>
      <stop offset="100%" stop-color="#1a2a12"/>
    </linearGradient>
    <radialGradient id="sun" cx="82%" cy="18%" r="42%">
      <stop offset="0%" stop-color="rgba(223,194,98,0.42)"/>
      <stop offset="100%" stop-color="rgba(223,194,98,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="980" cy="110" r="230" fill="url(#sun)"/>
  <path d="M0 470 L180 390 L360 450 L540 360 L720 430 L900 350 L1080 420 L1200 380 L1200 630 L0 630 Z" fill="rgba(110,180,90,0.22)"/>
  <path d="M0 540 L220 500 L440 560 L660 490 L880 545 L1200 500 L1200 630 L0 630 Z" fill="rgba(212,175,55,0.16)"/>
  <rect x="980" y="250" width="18" height="160" fill="rgba(244,237,216,0.35)"/>
  <circle cx="989" cy="250" r="46" fill="rgba(223,194,98,0.28)"/>
  <rect x="80" y="70" width="9" height="490" fill="rgba(223,194,98,0.38)"/>
  <text x="120" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#dfc262" letter-spacing="3">CADERNO DE JOGO · 2</text>
  <text x="120" y="228" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4f8fc">Grand Bazaar</text>
  <text x="120" y="286" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,244,255,0.92)">Story of Seasons · a quinta legal</text>
  <text x="120" y="400" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c8e8b0">Zephyr Town · bazar · cultivo de ecrã</text>
  <text x="120" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#dfc262">Steam · Nintendo · loja oficial · sem dump</text>
  <text x="120" y="545" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(223,194,98,0.82)">Vida · cultivo · Faça o melhor!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
