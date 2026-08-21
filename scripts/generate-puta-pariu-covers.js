'use strict';

/** Capas 1200×630 — puta · pariu · puta que pariu. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function make(outRel, svg) {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

async function main() {
  await make(
    'imagens/inspecoes/puta-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#140e12"/><stop offset="55%" stop-color="#1c1418"/><stop offset="100%" stop-color="#101418"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(180,100,120,0.2)"/><stop offset="100%" stop-color="rgba(20,15,18,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="320" rx="280" ry="180" fill="url(#glow)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c890a0" letter-spacing="4">PALAVRAS · TABU · INTENSIDADE</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="84" font-weight="700" fill="#f5e8ec">puta</text>
  <text x="600" y="320" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(235,210,220,0.95)">putta · pejorativo · intensificador BR</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c8a0b0">faça o melhor também na boca</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#987888">respeito · pariu · PQP</text>
</svg>`
  );

  await make(
    'imagens/inspecoes/pariu-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/><stop offset="55%" stop-color="#181c22"/><stop offset="100%" stop-color="#121018"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(140,170,200,0.22)"/><stop offset="100%" stop-color="rgba(20,25,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="320" rx="280" ry="180" fill="url(#glow)"/>
  <circle cx="600" cy="300" r="50" fill="none" stroke="rgba(160,190,220,0.4)" stroke-width="3"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a0b8d0" letter-spacing="4">PALAVRAS · PARIŌ · NASCIMENTO</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="84" font-weight="700" fill="#eef2f8">pariu</text>
  <text x="600" y="320" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,230,245,0.95)">parir · latim pariō · peça do PQP</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b0c0d8">faça o melhor ao lembrar o berço</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8898b0">puta · vida · expressão</text>
</svg>`
  );

  await make(
    'imagens/inspecoes/puta-que-pariu-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#120e14"/><stop offset="50%" stop-color="#1a1420"/><stop offset="100%" stop-color="#101218"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="44%">
      <stop offset="0%" stop-color="rgba(200,120,100,0.25)"/><stop offset="55%" stop-color="rgba(140,90,80,0.1)"/><stop offset="100%" stop-color="rgba(20,15,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="300" rx="320" ry="200" fill="url(#glow)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d0a090" letter-spacing="4">EXPRESSÕES · VÁLVULA · PICO</text>
  <text x="600" y="220" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f8eee8">puta que pariu</text>
  <text x="600" y="290" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="700" fill="#e0b0a0" letter-spacing="8">PQP</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(235,220,210,0.95)">explosão · lonjura · ofício da boca</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d0b0a0">faça o melhor depois do sopro</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a08880">puta · pariu · respeito</text>
</svg>`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
