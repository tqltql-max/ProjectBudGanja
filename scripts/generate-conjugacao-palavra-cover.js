'use strict';

/** Capa 1200×630 — palavra conjugação (3 pessoas · elos e elas). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/conjugacao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10161c"/>
      <stop offset="48%" stop-color="#1a2430"/>
      <stop offset="100%" stop-color="#0a0e12"/>
    </linearGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(210,180,120,0.20)"/>
      <stop offset="100%" stop-color="rgba(180,200,220,0.55)"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(210,180,120,0)"/>
      <stop offset="50%" stop-color="rgba(210,180,120,0.50)"/>
      <stop offset="100%" stop-color="rgba(210,180,120,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="430" cy="318" rx="92" ry="62" fill="none" stroke="url(#ring)" stroke-width="11"/>
  <ellipse cx="600" cy="318" rx="92" ry="62" fill="none" stroke="url(#ring)" stroke-width="11"/>
  <ellipse cx="770" cy="318" rx="92" ry="62" fill="none" stroke="url(#ring)" stroke-width="11"/>
  <text x="430" y="326" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="rgba(230,210,160,0.55)">eu · nós</text>
  <text x="600" y="326" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="rgba(230,210,160,0.55)">tu · vós</text>
  <text x="770" y="326" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="rgba(230,210,160,0.55)">eles · elas</text>
  <rect x="280" y="388" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="84" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d4c08a" letter-spacing="4">PALAVRAS · 3 ELOS · SALA COM LATIM</text>
  <text x="600" y="168" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4efe4">conjugação</text>
  <text x="600" y="448" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,215,180,0.95)">elos e elas · nós · vós · eles</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c4b07a">coniugātiō · iugum · nōs · vōs</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d4c08a">estudar português pelo projecto</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
