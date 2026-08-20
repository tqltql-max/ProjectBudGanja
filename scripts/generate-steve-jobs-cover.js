'use strict';

/** Capa 1200×630 — Steve Jobs (Pessoas). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/steve-jobs-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1012"/>
      <stop offset="50%" stop-color="#1a1c18"/>
      <stop offset="100%" stop-color="#0a0c0b"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="34%" r="46%">
      <stop offset="0%" stop-color="rgba(226,193,90,0.20)"/>
      <stop offset="100%" stop-color="rgba(226,193,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="210" r="260" fill="url(#glow)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e2c15a" letter-spacing="3">PESSOAS · OFÍCIO · CASA</text>
  <text x="600" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4efe4">Steve Jobs</text>
  <text x="600" y="318" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(232,220,180,0.95)">1955 — 2011 · limite em casa ≠ «aos 18»</text>
  <text x="600" y="455" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d8c890">iPad 2010: ainda não · mesa sem ecrã</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#e2c15a">meme inspecionado · faça o melhor nesta casa</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
