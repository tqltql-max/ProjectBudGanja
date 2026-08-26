'use strict';

/** Capa 1200×630 — relação (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/relacao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1218"/>
      <stop offset="45%" stop-color="#122028"/>
      <stop offset="100%" stop-color="#0c1410"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(90,170,150,0.26)"/>
      <stop offset="55%" stop-color="rgba(50,100,90,0.12)"/>
      <stop offset="100%" stop-color="rgba(10,18,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="300" rx="320" ry="200" fill="url(#glow)"/>
  <circle cx="420" cy="300" r="52" fill="none" stroke="rgba(160,220,200,0.45)" stroke-width="3"/>
  <circle cx="780" cy="300" r="52" fill="none" stroke="rgba(160,220,200,0.45)" stroke-width="3"/>
  <line x1="472" y1="300" x2="728" y2="300" stroke="rgba(180,230,210,0.55)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="600" cy="300" r="8" fill="rgba(200,240,220,0.75)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#90c8b8" letter-spacing="4">PALAVRAS · VÍNCULO · RELATO</text>
  <text x="600" y="220" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#eef8f4">relação</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,230,220,0.95)">relatĭō · o entre</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#a8d0c0">vínculo · relato · proporção</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#90c8b8">simbiose · respeito · gesto</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
