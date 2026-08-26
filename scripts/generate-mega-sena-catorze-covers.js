'use strict';

/** Capas 1200×630 — Mega-Sena (nome) e 14 / catorze. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function jpeg(svg, outRel) {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

async function main() {
  await jpeg(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#062018"/>
      <stop offset="55%" stop-color="#101410"/>
      <stop offset="100%" stop-color="#1a1408"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="42%" r="48%">
      <stop offset="0%" stop-color="rgba(40,160,90,0.35)"/>
      <stop offset="100%" stop-color="rgba(8,12,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="280" rx="340" ry="200" fill="url(#glow)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="2.2">PALAVRAS · NOME · ≠ SENNA (AYRTON) · PATROCÍNIOS</text>
  <text x="600" y="200" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4eee4">Mega-Sena</text>
  <text x="600" y="270" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,230,210,0.95)">mega + sena · o seis grande</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,190,0.95)">um n = seis · dois n = o piloto</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">esta ficha não tem patrocinador</text>
</svg>`,
    'imagens/inspecoes/mega-sena-palavra-cover.jpg'
  );

  await jpeg(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#121018"/>
      <stop offset="100%" stop-color="#081418"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <circle cx="600" cy="290" r="118" fill="none" stroke="rgba(216,176,112,0.55)" stroke-width="3"/>
  <text x="600" y="70" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="3">PALAVRAS · MATEMÁTICA · 2 × 7</text>
  <text x="600" y="328" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="120" font-weight="700" fill="#f4eee4">14</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">catorze · composto · não é Fibonacci</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">na Mega-Sena é só dezena</text>
</svg>`,
    'imagens/inspecoes/catorze-palavra-cover.jpg'
  );

  await jpeg(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0c10"/>
      <stop offset="100%" stop-color="#101418"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g3)"/>
  <circle cx="600" cy="292" r="108" fill="none" stroke="rgba(200,210,220,0.55)" stroke-width="10"/>
  <text x="600" y="70" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="3">PALAVRAS · MATEMÁTICA · NULO QUE CONTA</text>
  <text x="600" y="328" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="120" font-weight="700" fill="#f4eee4">0</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">zero · a + 0 = a · ≠ letra O</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">não é dezena da Mega-Sena</text>
</svg>`,
    'imagens/inspecoes/zero-palavra-cover.jpg'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
