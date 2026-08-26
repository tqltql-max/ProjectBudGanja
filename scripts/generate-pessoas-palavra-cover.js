'use strict';

/** Capa 1200×630 — Palavras · pessoas (o vocábulo da série). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/pessoas-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10141c"/>
      <stop offset="48%" stop-color="#1a1814"/>
      <stop offset="100%" stop-color="#0c1010"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="48%">
      <stop offset="0%" stop-color="rgba(196,163,90,0.28)"/>
      <stop offset="100%" stop-color="rgba(16,20,28,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="340" ry="180" fill="url(#glow)"/>
  <circle cx="430" cy="268" r="54" fill="none" stroke="rgba(232,210,160,0.72)" stroke-width="3"/>
  <circle cx="600" cy="248" r="62" fill="none" stroke="rgba(244,239,230,0.88)" stroke-width="3.5"/>
  <circle cx="770" cy="268" r="54" fill="none" stroke="rgba(232,210,160,0.72)" stroke-width="3"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a35a" letter-spacing="4">PALAVRAS · PERSŌNA · ≠ CONJUGAÇÃO ≠ HUB</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4efe6">pessoas</text>
  <text x="600" y="468" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0c8b8">máscara → alguém · o vocábulo, não a lista</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#9aa8a0">Heródoto abre a porta · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
