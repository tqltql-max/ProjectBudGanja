'use strict';

/** Capa 1200×630 — palavra mensagem (Palavras). Cover plural: mensagens. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mensagem-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c141c"/>
      <stop offset="45%" stop-color="#152636"/>
      <stop offset="100%" stop-color="#0a1016"/>
    </linearGradient>
    <radialGradient id="glow" cx="68%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(100,180,220,0.32)"/>
      <stop offset="100%" stop-color="rgba(100,180,220,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="820" cy="260" r="220" fill="url(#glow)"/>
  <!-- chat bubble stack (mensagens) -->
  <rect x="720" y="180" width="280" height="120" rx="28" fill="rgba(244,250,255,0.10)" stroke="rgba(150,200,230,0.40)" stroke-width="3"/>
  <circle cx="780" cy="230" r="8" fill="rgba(160,210,240,0.55)"/>
  <circle cx="810" cy="230" r="8" fill="rgba(160,210,240,0.40)"/>
  <circle cx="840" cy="230" r="8" fill="rgba(160,210,240,0.28)"/>
  <path d="M760 300 L740 340 L800 300 Z" fill="rgba(244,250,255,0.10)"/>
  <rect x="780" y="330" width="220" height="90" rx="22" fill="rgba(120,190,160,0.14)" stroke="rgba(140,210,180,0.35)" stroke-width="2.5"/>
  <text x="600" y="120" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#9ec8e0" letter-spacing="6">PALAVRAS · COMUNICAÇÃO</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f4faff">mensagens</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c8d8e4">mittere · message · SMS / chat · deixar rasto</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8a890">sm,enajsos → mensagem · sinal ≠ mensagem</text>
  <text x="600" y="545" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#9ec8e0">gesto · língua portuguesa · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
