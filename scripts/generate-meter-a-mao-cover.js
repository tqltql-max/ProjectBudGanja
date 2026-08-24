'use strict';

/** Capa 1200×630 — meter a mão (Expressões · ofício). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/meter-a-mao-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12180e"/>
      <stop offset="52%" stop-color="#1c2414"/>
      <stop offset="100%" stop-color="#0a100c"/>
    </linearGradient>
    <radialGradient id="glow" cx="32%" cy="58%" r="46%">
      <stop offset="0%" stop-color="rgba(160,140,60,0.34)"/>
      <stop offset="100%" stop-color="rgba(10,14,10,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="380" cy="390" rx="280" ry="180" fill="url(#glow)"/>
  <ellipse cx="360" cy="470" rx="210" ry="70" fill="rgba(70,52,28,0.72)"/>
  <path d="M250 430 C 280 360, 300 300, 318 250 C 328 222, 352 210, 372 232 C 388 250, 382 290, 370 330" fill="rgba(196,158,108,0.92)" stroke="rgba(232,204,150,0.55)" stroke-width="3"/>
  <path d="M370 330 C 400 300, 430 290, 455 318 C 470 336, 458 360, 430 372 C 410 382, 390 370, 370 352 Z" fill="rgba(196,158,108,0.92)"/>
  <path d="M318 250 C 300 210, 292 170, 310 140 C 322 120, 348 122, 356 148 C 364 172, 350 210, 340 240" fill="rgba(210,172,120,0.88)"/>
  <path d="M340 248 C 348 200, 368 168, 400 158 C 422 150, 440 168, 432 192 C 422 220, 392 248, 368 268" fill="rgba(186,148,98,0.9)"/>
  <path d="M368 268 C 400 248, 438 248, 462 278 C 478 298, 462 322, 432 328 C 404 334, 380 312, 368 292 Z" fill="rgba(176,138,90,0.9)"/>
  <circle cx="420" cy="455" r="10" fill="rgba(210,170,70,0.85)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b070" letter-spacing="2.4">EXPRESSÕES · OFÍCIO · ≠ FURTO ≠ TOQUE SEM PEDIDO ≠ BOLA</text>
  <text x="600" y="188" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4eee4">meter a mão</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">mão na massa · o gesto que entra</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">irmã de meter marcha · inverso de pedir a mão</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
