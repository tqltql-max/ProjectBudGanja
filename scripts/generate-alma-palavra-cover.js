'use strict';

/** Capa 1200×630 — alma (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/alma-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#140e14"/>
      <stop offset="50%" stop-color="#241820"/>
      <stop offset="100%" stop-color="#0e1410"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="45%">
      <stop offset="0%" stop-color="rgba(220,140,160,0.25)"/>
      <stop offset="50%" stop-color="rgba(160,100,140,0.12)"/>
      <stop offset="100%" stop-color="rgba(40,20,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="310" rx="280" ry="200" fill="url(#glow)"/>
  <path d="M600 250 C520 250 480 310 480 360 C480 430 600 480 600 480 C600 480 720 430 720 360 C720 310 680 250 600 250 Z" fill="none" stroke="rgba(230,160,180,0.5)" stroke-width="4"/>
  <circle cx="600" cy="340" r="18" fill="rgba(240,180,200,0.35)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d0a0b0" letter-spacing="4">PALAVRAS · CENTRO · VIVO</text>
  <text x="600" y="220" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="84" font-weight="700" fill="#f8eef2">alma</text>
  <text x="600" y="295" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,220,230,0.95)">anima · sopro · chegar por dentro</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d0b0c0">faça o melhor até tocar</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#b090a0">tudo · coração · vida</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
