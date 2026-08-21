'use strict';

/** Capas 1200×630 — Richard Rasmussen (Legado + Canais). Mata, não roxo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function jpegFromSvg(svg, outRel) {
  const sharp = require('sharp');
  const out = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

function coverSvg(opts) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${opts.c1}"/>
      <stop offset="55%" stop-color="${opts.c2}"/>
      <stop offset="100%" stop-color="${opts.c3}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="980" cy="90" rx="240" ry="150" fill="rgba(120,200,90,0.10)"/>
  <ellipse cx="180" cy="540" rx="280" ry="170" fill="rgba(0,0,0,0.22)"/>
  <g opacity="0.28" fill="none" stroke="#7dff9a" stroke-width="2">
    <path d="M820 520 C860 380, 920 360, 980 420 C1040 480, 1100 400, 1160 460"/>
    <path d="M780 560 C840 420, 900 400, 960 470"/>
    <ellipse cx="1020" cy="210" rx="70" ry="88"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#7dff9a" letter-spacing="5">${opts.eyebrow}</text>
  <text x="80" y="270" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#e8ffe8">${opts.title}</text>
  <text x="80" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="rgba(200,240,210,0.92)">${opts.sub}</text>
  <text x="80" y="520" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#9ad4a8">${opts.foot}</text>
</svg>`;
}

async function main() {
  await jpegFromSvg(
    coverSvg({
      c1: '#07140c',
      c2: '#0e2414',
      c3: '#1a2010',
      eyebrow: 'LEGADO · CAP. 10',
      title: 'Richard Rasmussen',
      sub: 'biólogo · ecrã · selvagem',
      foot: 'CRBio 068861/01-D · pessoa ≠ canal'
    }),
    'imagens/inspecoes/richard-rasmussen-cover.jpg'
  );
  await jpegFromSvg(
    coverSvg({
      c1: '#061208',
      c2: '#102818',
      c3: '#1c2410',
      eyebrow: 'CANAIS · SELVAGEM',
      title: 'Rasmussen',
      sub: 'fauna · expedições · arquivo YouTube',
      foot: '@RichardRasmussenSelvagem · desde 2016'
    }),
    'imagens/inspecoes/richard-rasmussen-canal-cover.jpg'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
