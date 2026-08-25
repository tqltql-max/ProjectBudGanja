'use strict';

/** Capa 1200×630 — Palavras · JSON (notação; PARK parqueia; ≠ Jason). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/json-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07141c"/>
      <stop offset="50%" stop-color="#102018"/>
      <stop offset="100%" stop-color="#1a1810"/>
    </linearGradient>
    <radialGradient id="brace" cx="22%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(126,232,210,0.28)"/>
      <stop offset="100%" stop-color="rgba(7,20,28,0)"/>
    </radialGradient>
    <radialGradient id="park" cx="78%" cy="42%" r="40%">
      <stop offset="0%" stop-color="rgba(200,170,90,0.22)"/>
      <stop offset="100%" stop-color="rgba(26,24,16,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="280" cy="310" rx="280" ry="200" fill="url(#brace)"/>
  <ellipse cx="920" cy="250" rx="260" ry="180" fill="url(#park)"/>
  <text x="160" y="360" font-family="Georgia, Times New Roman, serif" font-size="180" fill="rgba(126,232,210,0.35)">{</text>
  <text x="980" y="360" font-family="Georgia, Times New Roman, serif" font-size="180" fill="rgba(126,232,210,0.35)">}</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c4b070" letter-spacing="3">PALAVRAS · NOTAÇÃO · PARK × JSON · ≠ JASON</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="#f4efe6">JSON</text>
  <text x="600" y="378" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">JavaScript Object Notation · o lab parqueia objectos</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">PARK é o recinto · jay-son não é o filho</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a09070">quatro letras · outro mapa · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
