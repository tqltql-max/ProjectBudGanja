'use strict';

/** Capa 1200×630 — retarget (Palavras): alvo + rato. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/retarget-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0c1018"/>
      <stop offset="48%" stop-color="#1a1612"/>
      <stop offset="100%" stop-color="#2c2218"/>
    </linearGradient>
    <radialGradient id="glow" cx="66%" cy="44%" r="38%">
      <stop offset="0%" stop-color="rgba(220,180,110,0.28)"/>
      <stop offset="55%" stop-color="rgba(90,70,40,0.12)"/>
      <stop offset="100%" stop-color="rgba(12,16,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="780" cy="278" rx="260" ry="200" fill="url(#glow)"/>
  <circle cx="780" cy="278" r="158" fill="none" stroke="rgba(232,208,160,0.22)" stroke-width="18"/>
  <circle cx="780" cy="278" r="118" fill="none" stroke="rgba(232,208,160,0.32)" stroke-width="16"/>
  <circle cx="780" cy="278" r="78" fill="none" stroke="rgba(232,208,160,0.48)" stroke-width="14"/>
  <circle cx="780" cy="278" r="42" fill="none" stroke="rgba(244,228,190,0.7)" stroke-width="12"/>
  <circle cx="780" cy="278" r="16" fill="rgba(244,228,190,0.92)"/>
  <ellipse cx="368" cy="312" rx="92" ry="48" fill="rgba(186,164,140,0.82)"/>
  <ellipse cx="292" cy="292" rx="42" ry="32" fill="rgba(186,164,140,0.86)"/>
  <ellipse cx="268" cy="268" rx="16" ry="22" fill="rgba(176,154,132,0.8)"/>
  <circle cx="312" cy="284" r="5" fill="rgba(28,24,20,0.85)"/>
  <path d="M250 300 Q210 360 168 402" fill="none" stroke="rgba(176,154,132,0.7)" stroke-width="8" stroke-linecap="round"/>
  <ellipse cx="348" cy="352" rx="14" ry="8" fill="rgba(160,140,118,0.7)"/>
  <ellipse cx="400" cy="350" rx="14" ry="8" fill="rgba(160,140,118,0.7)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8b49a" letter-spacing="4">PALAVRAS · RE- + TARGET · RATO + ALVO</text>
  <text x="600" y="478" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="62" font-weight="700" fill="#f4ebe0">retarget</text>
  <text x="600" y="528" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,214,196,0.95)">etimo = de novo ao alvo · cola = rato no alvo</text>
  <text x="600" y="574" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(200,180,160,0.9)">≠ anuncio · ≠ mouse · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
