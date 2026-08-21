'use strict';

/**
 * Capa 1200×630 — Patinete eléctrico (Objetos · crianças · bateria).
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/patinete-eletrico-criancas-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12161c"/>
      <stop offset="48%" stop-color="#1a2420"/>
      <stop offset="100%" stop-color="#0e1210"/>
    </linearGradient>
    <linearGradient id="cell" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c8f06a"/>
      <stop offset="100%" stop-color="#3ecf8e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="#e6c15a"/>
  <g opacity="0.22" fill="none" stroke="#c8f06a" stroke-width="3">
    <rect x="780" y="210" width="280" height="90" rx="10"/>
    <line x1="790" y1="230" x2="1040" y2="230"/>
    <line x1="790" y1="255" x2="1040" y2="255"/>
    <line x1="790" y1="280" x2="1040" y2="280"/>
    <circle cx="860" cy="430" r="48"/>
    <circle cx="1080" cy="430" r="48"/>
    <path d="M860 382 L980 250 L1040 250 L1080 382"/>
    <path d="M980 250 L980 180 L1010 180"/>
  </g>
  <rect x="1048" y="218" width="22" height="74" rx="4" fill="url(#cell)" opacity="0.85"/>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e6c15a" letter-spacing="4">OBJECTOS · LOCOMOÇÃO A BATERIA</text>
  <text x="80" y="250" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4f7f0">Patinete</text>
  <text x="80" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="rgba(220,230,210,0.92)">eléctrico · crianças · perigos</text>
  <text x="80" y="460" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#9ecf9a">célula primeiro · via depois · não é brinquedo</text>
  <text x="80" y="530" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#e6c15a">INMETRO 24 V · CONTRAN 996 · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
