'use strict';

/** Capa 1200×630 — Artes · Animatrix (desenho 2003). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/animatrix-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#03140c"/>
      <stop offset="45%" stop-color="#0a2a18"/>
      <stop offset="100%" stop-color="#163d24"/>
    </linearGradient>
    <linearGradient id="rain" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(90,220,140,0.55)"/>
      <stop offset="100%" stop-color="rgba(90,220,140,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g fill="none" stroke="rgba(90,220,140,0.22)" stroke-width="2">
    <line x1="80" y1="0" x2="80" y2="630"/>
    <line x1="200" y1="0" x2="200" y2="630"/>
    <line x1="340" y1="0" x2="340" y2="630"/>
    <line x1="860" y1="0" x2="860" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/>
    <line x1="1120" y1="0" x2="1120" y2="630"/>
  </g>
  <g fill="#5ad48c">
    <circle cx="80" cy="70" r="3" opacity="0.7"/>
    <circle cx="200" cy="140" r="3" opacity="0.5"/>
    <circle cx="340" cy="40" r="3" opacity="0.8"/>
    <circle cx="860" cy="90" r="3" opacity="0.6"/>
    <circle cx="1000" cy="200" r="3" opacity="0.7"/>
    <circle cx="1120" cy="50" r="3" opacity="0.5"/>
  </g>
  <rect x="330" y="168" width="540" height="268" rx="8" fill="rgba(4,20,12,0.55)" stroke="rgba(120,230,160,0.55)" stroke-width="2"/>
  <g fill="rgba(10,40,22,0.9)" stroke="rgba(90,220,140,0.45)" stroke-width="1.5">
    <rect x="360" y="198" width="140" height="88" rx="4"/>
    <rect x="530" y="198" width="140" height="88" rx="4"/>
    <rect x="700" y="198" width="140" height="88" rx="4"/>
    <rect x="360" y="310" width="140" height="88" rx="4"/>
    <rect x="530" y="310" width="140" height="88" rx="4"/>
    <rect x="700" y="310" width="140" height="88" rx="4"/>
  </g>
  <g fill="none" stroke="rgba(180,255,210,0.35)" stroke-width="1.2">
    <path d="M380 250 L420 230 L470 255 L500 240"/>
    <path d="M550 240 L600 268 L640 248"/>
    <path d="M720 250 L760 235 L820 260"/>
    <path d="M390 355 L430 340 L480 370"/>
    <path d="M560 360 L610 340 L650 365"/>
    <path d="M730 350 L780 375 L830 345"/>
  </g>
  <rect x="445" y="248" width="70" height="8" rx="2" fill="rgba(90,220,140,0.25)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#7dcea0" letter-spacing="6">ARTES · DESENHO 2003 · ANIME</text>
  <text x="600" y="490" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#e8ffe8">Animatrix</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c8e8d4">nove portas · o mesmo ecrã a verificar</text>
  <text x="600" y="585" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(180,230,200,0.85)">The Animatrix · Wachowski · Matrix 1999 primeiro</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
