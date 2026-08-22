'use strict';

/** Capa 1200×630 — Palavras · apertar × espremer. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/apertar-espremer-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1210"/>
      <stop offset="50%" stop-color="#201816"/>
      <stop offset="100%" stop-color="#0e0c0a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="#c4a35a"/>
  <text x="600" y="148" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#c4a35a" letter-spacing="5">PALAVRAS · PECTUS × EXPRIMERE</text>
  <text x="600" y="268" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4efe6">apertar · espremer</text>
  <text x="600" y="340" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8c8c0">EXPREMMER → espremer</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c49080">cingir ≠ tirar para fora ≠ exprimir</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c4a35a">pressão · EXIT · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
