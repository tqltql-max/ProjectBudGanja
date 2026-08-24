'use strict';

/** Capa 1200×630 — Guia de Astrologia. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/astrologia-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#050814"/>
      <stop offset="55%" stop-color="#101a2e"/>
      <stop offset="100%" stop-color="#1a1020"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="300" r="210" fill="none" stroke="rgba(232,197,90,0.28)" stroke-width="2"/>
  <circle cx="600" cy="300" r="150" fill="none" stroke="rgba(180,210,255,0.18)" stroke-width="1.5"/>
  <circle cx="600" cy="90" r="6" fill="#f4e2a8"/>
  <circle cx="790" cy="175" r="4" fill="#dfe8ff"/>
  <circle cx="410" cy="175" r="4" fill="#dfe8ff"/>
  <circle cx="860" cy="330" r="3" fill="#c8d4f0"/>
  <circle cx="340" cy="330" r="3" fill="#c8d4f0"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9ec4e8" letter-spacing="6">GUIAS · CÉU · ♈ PRIMEIRO</text>
  <text x="600" y="340" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4efe4">Astrologia</text>
  <text x="600" y="410" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#e8c8a0">Áries abre · ariana / ariano · céu verificável</text>
  <text x="600" y="470" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(200,210,230,0.75)">Aladin Lite · KML Google Earth · ≠ horóscopo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
