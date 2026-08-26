'use strict';

/** Capa 1200×630 — miss (Palavras): alvo falhado, peça faltando, ERROR. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/miss-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0c10"/>
      <stop offset="48%" stop-color="#16141c"/>
      <stop offset="100%" stop-color="#2a1818"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="38%" r="38%">
      <stop offset="0%" stop-color="rgba(220,70,70,0.28)"/>
      <stop offset="55%" stop-color="rgba(120,40,40,0.10)"/>
      <stop offset="100%" stop-color="rgba(10,12,16,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="860" cy="230" rx="260" ry="180" fill="url(#glow)"/>
  <circle cx="860" cy="228" r="92" fill="none" stroke="rgba(220,200,190,0.55)" stroke-width="3"/>
  <circle cx="860" cy="228" r="58" fill="none" stroke="rgba(220,200,190,0.40)" stroke-width="2"/>
  <circle cx="860" cy="228" r="22" fill="none" stroke="rgba(200,80,80,0.85)" stroke-width="3"/>
  <line x1="980" y1="128" x2="910" y2="198" stroke="rgba(230,210,200,0.7)" stroke-width="3"/>
  <polygon points="910,198 902,186 922,190" fill="rgba(230,210,200,0.8)"/>
  <rect x="118" y="168" width="210" height="150" fill="none" stroke="rgba(180,190,200,0.55)" stroke-width="3" stroke-dasharray="14 10" rx="8"/>
  <text x="223" y="252" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(180,190,200,0.7)">faltando</text>
  <rect x="118" y="340" width="320" height="56" fill="rgba(40,12,12,0.85)" stroke="rgba(220,70,70,0.7)" stroke-width="2" rx="6"/>
  <text x="278" y="377" text-anchor="middle" font-family="Consolas, Courier New, monospace" font-size="28" font-weight="700" fill="#e06060">ERROR</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8a090" letter-spacing="4">PALAVRAS · MISSAN · FALLERE · ERRARE</text>
  <text x="600" y="478" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4e8e0">miss</text>
  <text x="600" y="528" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,200,0.95)">faltando · ERROR · falhar o alvo</text>
  <text x="600" y="574" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,170,160,0.9)">≠ titulo Miss · ≠ 500 · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
