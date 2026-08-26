'use strict';

/** Capa 1200×630 — deixar na mão (Expressões · ausência; palma aberta e vazia). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/deixar-na-mao-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16120e"/>
      <stop offset="50%" stop-color="#221810"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="28%" cy="62%" r="50%">
      <stop offset="0%" stop-color="rgba(180,110,50,0.28)"/>
      <stop offset="100%" stop-color="rgba(12,10,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="340" cy="400" rx="300" ry="200" fill="url(#glow)"/>
  <ellipse cx="330" cy="490" rx="230" ry="62" fill="rgba(62,40,22,0.7)"/>
  <path d="M210 430 C 248 360, 278 310, 318 268 C 338 246, 372 250, 382 278 C 390 300, 372 334, 354 368" fill="rgba(186,142,96,0.88)" stroke="rgba(220,180,130,0.4)" stroke-width="3"/>
  <path d="M354 368 C 400 348, 448 358, 470 398 C 484 422, 462 446, 424 448 C 390 450, 366 424, 354 400 Z" fill="rgba(176,132,88,0.9)"/>
  <path d="M318 268 C 308 228, 318 188, 348 168 C 368 154, 392 168, 390 196 C 388 224, 368 256, 352 286" fill="rgba(198,154,108,0.82)"/>
  <path d="M352 286 C 372 248, 404 228, 438 236 C 460 242, 468 268, 450 288 C 428 314, 390 326, 362 322" fill="rgba(168,124,82,0.78)"/>
  <path d="M362 322 C 402 318, 444 338, 456 376 C 464 400, 442 418, 410 414 C 382 410, 366 386, 362 360 Z" fill="rgba(158,114,74,0.72)"/>
  <path d="M760 250 C 790 210, 830 190, 870 210" fill="none" stroke="rgba(160,120,80,0.28)" stroke-width="8" stroke-linecap="round"/>
  <circle cx="888" cy="218" r="8" fill="rgba(160,120,80,0.35)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8a070" letter-spacing="2.0">EXPRESSÕES · AUSÊNCIA · ≠ METER A MÃO ≠ CUIDADOS ≠ TUTORIAL</text>
  <text x="600" y="188" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4eee4">deixar na mão</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">a palma larga · a outra ainda pedia</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">lapso: deixar  na mao · espaço × til</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
