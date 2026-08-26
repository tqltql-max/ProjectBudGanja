'use strict';

/** Capa 1200×630 — os doze apóstolos (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/doze-apostolos-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const dots = [];
  for (let i = 0; i < 12; i++) {
    const a = (Math.PI * 2 * i) / 12 - Math.PI / 2;
    const x = (600 + Math.cos(a) * 168).toFixed(1);
    const y = (248 + Math.sin(a) * 108).toFixed(1);
    dots.push(
      `<circle cx="${x}" cy="${y}" r="12" fill="none" stroke="rgba(232,214,160,0.78)" stroke-width="2.2"/>`
    );
    dots.push(
      `<circle cx="${x}" cy="${y}" r="3.2" fill="rgba(245,232,190,0.9)"/>`
    );
  }

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12161c"/>
      <stop offset="50%" stop-color="#1a2230"/>
      <stop offset="100%" stop-color="#0a0c10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(210,190,140,0.28)"/>
      <stop offset="100%" stop-color="rgba(210,190,140,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="248" rx="210" ry="150" fill="url(#glow)"/>
  <ellipse cx="600" cy="248" rx="168" ry="108" fill="none" stroke="rgba(210,190,140,0.28)" stroke-width="1.5"/>
  ${dots.join('\n  ')}
  <circle cx="600" cy="248" r="18" fill="none" stroke="rgba(245,232,190,0.55)" stroke-width="2"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d2be8c" letter-spacing="4">EXPRESSÕES · CONJUNTO × ENVIO</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f5f0e4">os doze apóstolos</text>
  <text x="600" y="482" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,190,0.95)">enviados · não ídolos · Tomé inspecciona</text>
  <text x="600" y="545" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8a878">respeito à fé — sem catecismo</text>
  <text x="600" y="588" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#d2be8c">filho de deus · templo · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log(
    'OK',
    path.relative(ROOT, OUT),
    Math.round(fs.statSync(OUT).size / 1024) + 'KB'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
