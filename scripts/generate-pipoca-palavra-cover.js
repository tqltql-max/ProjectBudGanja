'use strict';

/** Capa 1200×630 — pipoca (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/pipoca-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1208"/>
      <stop offset="40%" stop-color="#2a1c0e"/>
      <stop offset="100%" stop-color="#120c06"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="40%" r="48%">
      <stop offset="0%" stop-color="rgba(240,200,120,0.32)"/>
      <stop offset="45%" stop-color="rgba(220,140,60,0.16)"/>
      <stop offset="100%" stop-color="rgba(40,30,15,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(230,190,120,0)"/>
      <stop offset="50%" stop-color="rgba(230,190,120,0.55)"/>
      <stop offset="100%" stop-color="rgba(230,190,120,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="320" ry="210" fill="url(#glow)"/>
  <circle cx="420" cy="200" r="10" fill="rgba(255,245,210,0.85)"/>
  <circle cx="480" cy="160" r="7" fill="rgba(255,230,180,0.7)"/>
  <circle cx="560" cy="190" r="12" fill="rgba(255,248,220,0.9)"/>
  <circle cx="640" cy="150" r="8" fill="rgba(255,235,190,0.75)"/>
  <circle cx="720" cy="195" r="11" fill="rgba(255,245,210,0.85)"/>
  <circle cx="780" cy="165" r="6" fill="rgba(255,220,160,0.65)"/>
  <circle cx="520" cy="240" r="9" fill="rgba(255,240,200,0.8)"/>
  <circle cx="680" cy="230" r="10" fill="rgba(255,245,215,0.85)"/>
  <rect x="360" y="320" width="480" height="2" fill="url(#bar)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e8c48a" letter-spacing="3">PALAVRAS · TUPI PI'POKA · ESTOURO</text>
  <text x="600" y="285" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#fff8e8">pipoca</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(240,220,180,0.95)">milho · calor · rua · cinema</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d4b888">transformação que se partilha</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#e8c48a">faça o melhor com o calor certo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
