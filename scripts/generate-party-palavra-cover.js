'use strict';

/** Capa 1200×630 — Palavras · party / paRTY (partire ≠ Parkinson ≠ parque). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/party-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1218"/>
      <stop offset="50%" stop-color="#1a1028"/>
      <stop offset="100%" stop-color="#181008"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="48%">
      <stop offset="0%" stop-color="rgba(220,90,140,0.32)"/>
      <stop offset="100%" stop-color="rgba(10,18,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="300" rx="380" ry="210" fill="url(#glow)"/>
  <circle cx="280" cy="180" r="14" fill="rgba(255,90,140,0.55)"/>
  <circle cx="920" cy="160" r="11" fill="rgba(90,180,255,0.50)"/>
  <circle cx="240" cy="420" r="9" fill="rgba(255,210,80,0.50)"/>
  <circle cx="980" cy="400" r="12" fill="rgba(140,255,180,0.40)"/>
  <circle cx="400" cy="120" r="7" fill="rgba(255,160,80,0.55)"/>
  <circle cx="800" cy="500" r="8" fill="rgba(200,120,255,0.45)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e0a070" letter-spacing="3">PALAVRAS · PARTIE / PARTIRE · ≠ PARKINSON · ≠ PARQUE</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="86" font-weight="700" fill="#f4efe6">paRTY</text>
  <text x="600" y="378" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">a parte que se junta · festa emprestada, avô partire</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">PAR- que a orelha cola no PARK</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a09070">festum traduz · não herda · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
