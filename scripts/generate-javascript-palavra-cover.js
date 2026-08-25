'use strict';

/** Capa 1200×630 — Palavras · JavaScript (Java + Script; o + é cartaz). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/javascript-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1208"/>
      <stop offset="48%" stop-color="#0e1814"/>
      <stop offset="100%" stop-color="#07141c"/>
    </linearGradient>
    <radialGradient id="java" cx="22%" cy="46%" r="42%">
      <stop offset="0%" stop-color="rgba(248,152,32,0.32)"/>
      <stop offset="100%" stop-color="rgba(26,18,8,0)"/>
    </radialGradient>
    <radialGradient id="script" cx="78%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(126,232,210,0.26)"/>
      <stop offset="100%" stop-color="rgba(7,20,28,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="280" cy="300" rx="270" ry="190" fill="url(#java)"/>
  <ellipse cx="920" cy="310" rx="270" ry="190" fill="url(#script)"/>
  <text x="210" y="348" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="54" font-weight="700" fill="rgba(248,152,32,0.88)">Java</text>
  <text x="600" y="340" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" fill="rgba(232,220,180,0.92)">+</text>
  <text x="990" y="348" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="54" font-weight="700" fill="rgba(126,232,210,0.9)">Script</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c4b070" letter-spacing="3">PALAVRAS · JAVA + SCRIPT · ≠ JAVA A LÍNGUA</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4efe6">JavaScript</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">o + é cartaz de 1995 · não é sangue</text>
  <text x="600" y="560" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c8b080">duas línguas · o étimo corta · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
