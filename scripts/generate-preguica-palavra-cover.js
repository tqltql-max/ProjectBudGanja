'use strict';

/** Capa 1200×630 — preguiça (Palavras). Mata lenta, não sermão. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/preguica-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#121a12"/>
      <stop offset="48%" stop-color="#1a2418"/>
      <stop offset="100%" stop-color="#0a0e0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="36%" r="44%">
      <stop offset="0%" stop-color="rgba(140,170,90,0.22)"/>
      <stop offset="100%" stop-color="rgba(140,170,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="620" cy="220" r="240" fill="url(#glow)"/>
  <path d="M180 80 Q320 200 280 420" fill="none" stroke="rgba(160,190,110,0.28)" stroke-width="10"/>
  <path d="M980 70 Q860 210 900 430" fill="none" stroke="rgba(160,190,110,0.22)" stroke-width="8"/>
  <ellipse cx="600" cy="268" rx="86" ry="36" fill="none" stroke="rgba(210,220,160,0.5)" stroke-width="2"/>
  <text x="600" y="84" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c5d49a" letter-spacing="3">PALAVRAS · PIGRITIA · ANIMAL × ESTADO</text>
  <text x="600" y="278" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f3f6e8">preguiça</text>
  <text x="600" y="348" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,230,190,0.95)">bicho-preguiça · acédia · ≠ nap</text>
  <text x="600" y="498" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8c878">ecologia lenta ≠ pecado</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#c5d49a">bode · animal · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
