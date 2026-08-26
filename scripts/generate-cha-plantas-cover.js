'use strict';

/** Capa 1200×630 — guia chá de plantas. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/cha-plantas-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a120c"/>
      <stop offset="45%" stop-color="#2a1c14"/>
      <stop offset="100%" stop-color="#0f1410"/>
    </linearGradient>
    <radialGradient id="steam" cx="52%" cy="42%" r="40%">
      <stop offset="0%" stop-color="rgba(220,200,160,0.22)"/>
      <stop offset="60%" stop-color="rgba(140,160,100,0.1)"/>
      <stop offset="100%" stop-color="rgba(40,50,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="620" cy="280" rx="280" ry="180" fill="url(#steam)"/>
  <ellipse cx="600" cy="420" rx="140" ry="50" fill="none" stroke="rgba(210,180,120,0.55)" stroke-width="4"/>
  <path d="M460 400 Q460 340 600 330 Q740 340 740 400" fill="none" stroke="rgba(200,170,110,0.5)" stroke-width="3"/>
  <path d="M740 380 Q820 360 820 420 Q820 460 760 455" fill="none" stroke="rgba(200,170,110,0.45)" stroke-width="3"/>
  <path d="M560 300 Q570 250 555 210" fill="none" stroke="rgba(200,220,180,0.35)" stroke-width="2"/>
  <path d="M600 290 Q610 240 600 200" fill="none" stroke="rgba(200,220,180,0.4)" stroke-width="2"/>
  <path d="M640 300 Q655 255 645 215" fill="none" stroke="rgba(200,220,180,0.35)" stroke-width="2"/>
  <circle cx="420" cy="450" r="10" fill="rgba(120,160,80,0.55)"/>
  <circle cx="450" cy="470" r="7" fill="rgba(100,140,70,0.45)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8b080" letter-spacing="4">GUIA · OFÍCIO · PLANTAS</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f5efe0">chá de plantas</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,220,190,0.95)">infusão · decoção · medida · higiene</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c8d0a0">faça o melhor neste copo</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#b0a070">plantas · cultivo · farmácia viva</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
