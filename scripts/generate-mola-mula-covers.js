'use strict';

/** Capas 1200×630 — mola (objecto) e mula (animal). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

function coilPath() {
  const pts = [];
  const cx = 600;
  const top = 168;
  const coils = 7;
  const amp = 78;
  const step = 28;
  for (let i = 0; i <= coils * 20; i += 1) {
    const t = i / 20;
    const y = top + t * step;
    const x = cx + Math.sin(t * Math.PI * 2) * amp;
    pts.push((i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1));
  }
  return pts.join(' ');
}

async function jpegFromSvg(svg, relOut) {
  const sharp = require('sharp');
  const out = path.join(ROOT, relOut);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

async function main() {
  const coil = coilPath();

  const molaSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12140e"/>
      <stop offset="48%" stop-color="#1a2214"/>
      <stop offset="100%" stop-color="#0a0c08"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="46%">
      <stop offset="0%" stop-color="rgba(196,170,90,0.24)"/>
      <stop offset="100%" stop-color="rgba(196,170,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="280" rx="340" ry="180" fill="url(#glow)"/>
  <line x1="522" y1="158" x2="678" y2="158" stroke="#d8c48a" stroke-width="10" stroke-linecap="round"/>
  <path d="${coil}" fill="none" stroke="#e8d9a8" stroke-width="9" stroke-linecap="round"/>
  <line x1="522" y1="364" x2="678" y2="364" stroke="#d8c48a" stroke-width="10" stroke-linecap="round"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c4b070" letter-spacing="3.2">OBJECTO · MOLLIS · CEDE E VOLTA</text>
  <text x="600" y="455" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4ead0">mola</text>
  <text x="600" y="518" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(232,197,71,0.95)">molas · feixe · Hooke</text>
  <text x="600" y="572" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c4b070">≠ mula · ≠ mó · Valeu !!!</text>
</svg>`;

  const mulaSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16120e"/>
      <stop offset="50%" stop-color="#241c14"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="40%" r="48%">
      <stop offset="0%" stop-color="rgba(160,120,70,0.26)"/>
      <stop offset="100%" stop-color="rgba(160,120,70,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="580" cy="250" rx="300" ry="170" fill="url(#glow)"/>
  <ellipse cx="620" cy="268" rx="150" ry="88" fill="none" stroke="#d4b896" stroke-width="7"/>
  <ellipse cx="720" cy="248" rx="70" ry="48" fill="none" stroke="#d4b896" stroke-width="7"/>
  <line x1="545" y1="210" x2="500" y2="130" stroke="#d4b896" stroke-width="8" stroke-linecap="round"/>
  <line x1="600" y1="205" x2="575" y2="118" stroke="#d4b896" stroke-width="8" stroke-linecap="round"/>
  <line x1="500" y1="330" x2="470" y2="400" stroke="#c4a070" stroke-width="7" stroke-linecap="round"/>
  <line x1="560" y1="345" x2="545" y2="410" stroke="#c4a070" stroke-width="7" stroke-linecap="round"/>
  <line x1="640" y1="345" x2="655" y2="410" stroke="#c4a070" stroke-width="7" stroke-linecap="round"/>
  <line x1="700" y1="328" x2="740" y2="400" stroke="#c4a070" stroke-width="7" stroke-linecap="round"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d4b896" letter-spacing="3.2">ANIMAL · MŪLA · EQUIDAE</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4ead0">mula</text>
  <text x="600" y="528" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(232,197,71,0.95)">híbrido · trabalho · ≠ mola</text>
  <text x="600" y="578" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d4b896">jumento × égua · Valeu !!!</text>
</svg>`;

  await jpegFromSvg(molaSvg, 'imagens/inspecoes/mola-objeto-cover.jpg');
  await jpegFromSvg(mulaSvg, 'imagens/inspecoes/mula-animal-cover.jpg');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
