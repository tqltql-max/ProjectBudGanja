'use strict';

/** Capa 1200×630 — cruzar os braços em cima da cabeça (Expressões · sinais). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/cruzar-os-bracos-cabeca-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#10141c"/>
      <stop offset="50%" stop-color="#1a2430"/>
      <stop offset="100%" stop-color="#121018"/>
    </linearGradient>
    <radialGradient id="glow" cx="28%" cy="46%" r="42%">
      <stop offset="0%" stop-color="rgba(180,210,230,0.28)"/>
      <stop offset="100%" stop-color="rgba(16,20,28,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="340" cy="300" rx="260" ry="210" fill="url(#glow)"/>
  <circle cx="340" cy="318" r="54" fill="none" stroke="rgba(230,220,200,0.88)" stroke-width="4"/>
  <path d="M250 250 Q340 160 430 250" fill="none" stroke="rgba(255,196,72,0.9)" stroke-width="8" stroke-linecap="round"/>
  <path d="M430 250 Q340 160 250 250" fill="none" stroke="rgba(140,190,220,0.55)" stroke-width="4" stroke-linecap="round"/>
  <path d="M268 258 Q310 210 340 198 Q370 210 412 258" fill="none" stroke="rgba(255,220,140,0.95)" stroke-width="7" stroke-linecap="round"/>
  <text x="760" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#b8c8dc" letter-spacing="4">SINAIS · GESTO · PAUSA DA CABEÇA</text>
  <text x="760" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f7fbff">cruzar os braços</text>
  <text x="760" y="312" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="700" fill="#e8dcc8">em cima da cabeça</text>
  <text x="760" y="390" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#d0dce8">peito aberto · crânio abrigado</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4d4e4">≠ X no peito · ≠ mãos na nuca</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
