'use strict';

/** Capa 1200×630 — plantar a semente (Expressões · gesto). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/plantar-a-semente-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14180e"/>
      <stop offset="48%" stop-color="#1e2616"/>
      <stop offset="100%" stop-color="#0c100a"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="62%" r="48%">
      <stop offset="0%" stop-color="rgba(150,170,70,0.32)"/>
      <stop offset="100%" stop-color="rgba(12,16,10,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="360" cy="410" rx="300" ry="190" fill="url(#glow)"/>
  <ellipse cx="340" cy="500" rx="250" ry="58" fill="rgba(72,52,28,0.78)"/>
  <path d="M160 500 C 220 430, 280 400, 360 408 C 430 416, 500 450, 560 508 C 500 530, 420 542, 340 538 C 250 534, 190 520, 160 500 Z" fill="rgba(86,62,32,0.92)"/>
  <path d="M250 470 C 300 440, 360 432, 420 458" fill="none" stroke="rgba(50,34,16,0.7)" stroke-width="10" stroke-linecap="round"/>
  <ellipse cx="338" cy="478" rx="16" ry="10" fill="rgba(196,158,70,0.95)" stroke="rgba(232,200,120,0.55)" stroke-width="2"/>
  <path d="M338 468 C 332 448, 338 428, 352 412 C 360 402, 372 408, 368 422 C 362 440, 350 456, 338 468 Z" fill="rgba(120,160,70,0.55)"/>
  <path d="M220 390 C 250 330, 268 280, 286 230 C 296 202, 322 192, 342 214 C 358 232, 350 274, 338 314" fill="rgba(196,158,108,0.92)" stroke="rgba(232,204,150,0.45)" stroke-width="3"/>
  <path d="M338 314 C 368 286, 402 278, 428 306 C 444 324, 430 350, 400 360 C 378 368, 356 354, 338 336 Z" fill="rgba(196,158,108,0.92)"/>
  <path d="M286 230 C 270 188, 278 148, 306 132 C 322 122, 342 132, 346 156 C 350 180, 334 214, 322 242" fill="rgba(210,172,120,0.88)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b070" letter-spacing="2.2">EXPRESSÕES · GESTO · ≠ GUIA DE CULTIVO ≠ FÁBRICA ≠ FOI PLANTADA</text>
  <text x="600" y="188" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4eee4">plantar a semente</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">a palma entrega · a terra fica</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">lapso: plantar a sementes · a × as</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
