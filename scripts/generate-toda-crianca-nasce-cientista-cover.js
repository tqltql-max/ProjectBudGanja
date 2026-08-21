'use strict';

/** Capa 1200×630 — Toda criança nasce cientista (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(
    ROOT,
    'imagens/inspecoes/toda-crianca-nasce-cientista-cover.jpg'
  );
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ece8e2"/>
      <stop offset="55%" stop-color="#f4f1eb"/>
      <stop offset="100%" stop-color="#e4e0d8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="88" y="118" font-family="Georgia, Times New Roman, serif" font-size="96" font-weight="700" fill="#c62828">“</text>
  <text x="80" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#8a7060" letter-spacing="4">EXPRESSÕES · CAMPO · MENSAGEM DA MÃE</text>
  <text x="88" y="220" font-family="Georgia, Times New Roman, serif" font-size="34" font-style="italic" fill="#c62828">Toda criança nasce cientista,</text>
  <text x="88" y="268" font-family="Georgia, Times New Roman, serif" font-size="28" font-style="italic" fill="#c62828">pela necessidade de descoberta do mundo.</text>
  <text x="88" y="330" font-family="Georgia, Times New Roman, serif" font-size="22" font-style="italic" fill="#a33a3a">O trabalho de campo é voltar a ser</text>
  <text x="88" y="368" font-family="Georgia, Times New Roman, serif" font-size="22" font-style="italic" fill="#a33a3a">criança e cientista por natureza.</text>
  <text x="88" y="450" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#2a2a2a">Arleu Barbosa Viana-Junior · UEPB · predação</text>
  <text x="88" y="530" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#5a4030">faça o melhor com a pergunta intacta</text>
  <text x="88" y="575" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8a7060">mãe · mensagem · inseto · vida</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
