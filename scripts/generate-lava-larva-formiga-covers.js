'use strict';

/** Capas 1200×630 — lava · larva · formiga · formiga lava-pé. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function writeCover(rel, svg) {
  const sharp = require('sharp');
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

async function main() {
  await writeCover(
    'imagens/inspecoes/lava-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2a1008"/>
      <stop offset="100%" stop-color="#120806"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e08040" letter-spacing="2">PALAVRAS · VULCÃO · ≠ LAVAR ≠ LARVA</text>
  <text x="600" y="200" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f8e0c8">lava</text>
  <text x="600" y="480" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,200,170,0.95)">rocha fundida · larva de vulcão = lapso</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#d09050">não lava · não é o inseto</text>
</svg>`
  );

  await writeCover(
    'imagens/inspecoes/larva-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#161410"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c4a070" letter-spacing="2">PALAVRAS · INSETO JOVEM · ≠ LAVA</text>
  <text x="600" y="200" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f0e6d8">larva</text>
  <text x="600" y="480" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">lat. lārva · máscara · estádio</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">não mora na cratera</text>
</svg>`
  );

  await writeCover(
    'imagens/inspecoes/formiga-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a140c"/>
      <stop offset="100%" stop-color="#0c0a06"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c4a060" letter-spacing="2">PALAVRAS · FORMICIDAE · ≠ TUCANDEIRA</text>
  <text x="600" y="200" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f0e6d0">formiga</text>
  <text x="600" y="480" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">lat. formīca · o inseto do chão</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">lava-pé é o caso do pé</text>
</svg>`
  );

  await writeCover(
    'imagens/inspecoes/formiga-lava-pe-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#241208"/>
      <stop offset="100%" stop-color="#100806"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e09050" letter-spacing="2">EXPRESSÕES · SOLENOPSIS · ≠ RITO ≠ VULCÃO</text>
  <text x="600" y="220" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f8e8d0">formiga lava-pé</text>
  <text x="600" y="480" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,210,180,0.95)">ferroa o pé · não lava com água</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#d09050">≠ lava · ≠ larva · sem receita</text>
</svg>`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
