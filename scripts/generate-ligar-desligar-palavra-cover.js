'use strict';

/** Capa 1200×630 — ligar × desligar (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/ligar-desligar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0e14"/>
      <stop offset="50%" stop-color="#141c28"/>
      <stop offset="100%" stop-color="#080c12"/>
    </linearGradient>
    <radialGradient id="on" cx="32%" cy="45%" r="38%">
      <stop offset="0%" stop-color="rgba(255,220,90,0.45)"/>
      <stop offset="55%" stop-color="rgba(180,140,40,0.12)"/>
      <stop offset="100%" stop-color="rgba(20,20,10,0)"/>
    </radialGradient>
    <radialGradient id="off" cx="72%" cy="45%" r="38%">
      <stop offset="0%" stop-color="rgba(90,120,180,0.28)"/>
      <stop offset="55%" stop-color="rgba(40,50,80,0.1)"/>
      <stop offset="100%" stop-color="rgba(10,12,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="380" cy="290" rx="220" ry="160" fill="url(#on)"/>
  <ellipse cx="860" cy="290" rx="220" ry="160" fill="url(#off)"/>
  <rect x="290" y="230" width="120" height="160" rx="14" fill="rgba(50,58,70,0.95)" stroke="rgba(220,200,120,0.5)" stroke-width="3"/>
  <rect x="318" y="270" width="64" height="50" rx="8" fill="rgba(255,230,120,0.9)"/>
  <rect x="318" y="330" width="64" height="40" rx="8" fill="rgba(28,34,46,0.95)" stroke="rgba(140,150,160,0.35)" stroke-width="2"/>
  <rect x="790" y="230" width="120" height="160" rx="14" fill="rgba(36,42,54,0.95)" stroke="rgba(120,140,180,0.45)" stroke-width="3"/>
  <rect x="818" y="270" width="64" height="40" rx="8" fill="rgba(28,34,46,0.95)" stroke="rgba(100,110,130,0.4)" stroke-width="2"/>
  <rect x="818" y="320" width="64" height="50" rx="8" fill="rgba(60,80,120,0.55)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e0c878" letter-spacing="4">PALAVRAS · CIRCUITO · GESTO</text>
  <text x="600" y="165" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#fff8e0">ligar × desligar</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,220,190,0.95)">ligāre · interruptor · clique</text>
  <text x="600" y="555" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d0b870">faça o melhor com o clique certo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
