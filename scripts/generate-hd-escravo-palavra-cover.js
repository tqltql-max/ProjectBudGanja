'use strict';

/** Capa 1200×630 — HD escravo / slave (Palavras · hardware ATA). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/hd-escravo-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0c10"/>
      <stop offset="50%" stop-color="#161a22"/>
      <stop offset="100%" stop-color="#1c2428"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="44%">
      <stop offset="0%" stop-color="rgba(180,190,200,0.22)"/>
      <stop offset="60%" stop-color="rgba(72,160,180,0.10)"/>
      <stop offset="100%" stop-color="rgba(10,12,16,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="340" ry="190" fill="url(#glow)"/>
  <ellipse cx="600" cy="228" rx="150" ry="150" fill="none" stroke="rgba(200,210,220,0.4)" stroke-width="10"/>
  <ellipse cx="600" cy="228" rx="108" ry="108" fill="none" stroke="rgba(160,170,180,0.28)" stroke-width="6"/>
  <ellipse cx="600" cy="228" rx="64" ry="64" fill="none" stroke="rgba(72,201,232,0.4)" stroke-width="3"/>
  <circle cx="600" cy="228" r="18" fill="rgba(40,48,56,0.9)" stroke="rgba(220,230,240,0.5)" stroke-width="3"/>
  <rect x="430" y="200" width="22" height="56" rx="3" fill="rgba(72,201,232,0.25)" stroke="rgba(72,201,232,0.55)" stroke-width="2"/>
  <rect x="748" y="200" width="22" height="56" rx="3" fill="rgba(200,180,140,0.22)" stroke="rgba(200,180,140,0.5)" stroke-width="2"/>
  <text x="441" y="290" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="rgba(154,212,200,0.85)">0</text>
  <text x="759" y="290" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="11" fill="rgba(200,180,140,0.85)">1</text>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9ad4c8" letter-spacing="4">PALAVRAS · ATA/IDE · DEVICE 1</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4ebe0">HD escravo</text>
  <text x="600" y="488" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,220,230,0.95)">slave · slayr · jumper · nao pessoa</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#b8a070">≠ escravidao · ≠ SATA · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
