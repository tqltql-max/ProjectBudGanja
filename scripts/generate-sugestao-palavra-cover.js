'use strict';

/** Capa 1200×630 — sugestão (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/sugestao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0e141c"/>
      <stop offset="50%" stop-color="#182428"/>
      <stop offset="100%" stop-color="#101810"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="50%" r="45%">
      <stop offset="0%" stop-color="rgba(120,180,200,0.22)"/>
      <stop offset="55%" stop-color="rgba(100,140,100,0.1)"/>
      <stop offset="100%" stop-color="rgba(20,30,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="580" cy="320" rx="300" ry="200" fill="url(#glow)"/>
  <rect x="380" y="300" width="180" height="120" rx="8" fill="none" stroke="rgba(180,210,220,0.45)" stroke-width="3"/>
  <line x1="400" y1="330" x2="540" y2="330" stroke="rgba(160,190,200,0.4)" stroke-width="3"/>
  <line x1="400" y1="360" x2="520" y2="360" stroke="rgba(160,190,200,0.35)" stroke-width="3"/>
  <line x1="400" y1="390" x2="500" y2="390" stroke="rgba(160,190,200,0.3)" stroke-width="3"/>
  <path d="M620 280 Q700 240 780 300 Q820 340 760 400" fill="none" stroke="rgba(160,200,140,0.45)" stroke-width="3"/>
  <circle cx="780" cy="300" r="8" fill="rgba(200,220,160,0.55)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8c8d0" letter-spacing="4">PALAVRAS · PROPOSTA · FILA</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#eef6f8">sugestão</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,235,240,0.95)">suggestio · propor · inspecionar</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8d0c0">faça o melhor nesta proposta</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#90b0b8">mensagem · objetos · inspiração</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
