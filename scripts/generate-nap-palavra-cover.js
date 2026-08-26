'use strict';

/** Capa 1200×630 — nap (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/nap-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0e1218"/>
      <stop offset="50%" stop-color="#1a2030"/>
      <stop offset="100%" stop-color="#121018"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="55%" r="42%">
      <stop offset="0%" stop-color="rgba(140,160,200,0.22)"/>
      <stop offset="55%" stop-color="rgba(100,120,160,0.1)"/>
      <stop offset="100%" stop-color="rgba(20,25,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="340" rx="280" ry="180" fill="url(#glow)"/>
  <ellipse cx="600" cy="400" rx="140" ry="40" fill="none" stroke="rgba(180,190,220,0.35)" stroke-width="3"/>
  <path d="M480 360 Q600 300 720 360" fill="none" stroke="rgba(160,180,220,0.35)" stroke-width="3"/>
  <circle cx="520" cy="280" r="4" fill="rgba(200,210,240,0.4)"/>
  <circle cx="600" cy="260" r="3" fill="rgba(200,210,240,0.35)"/>
  <circle cx="680" cy="280" r="4" fill="rgba(200,210,240,0.4)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8b8d8" letter-spacing="4">PALAVRAS · PAUSA · OFÍCIO</text>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="84" font-weight="700" fill="#eef2f8">nap</text>
  <text x="600" y="310" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,230,245,0.95)">sono curto · power nap · gesto de cuidado</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8c8e0">faça o melhor depois de parar</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#90a0c0">alma · gesto · vida</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
