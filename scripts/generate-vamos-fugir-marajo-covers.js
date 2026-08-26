'use strict';

/** Capas 1200×630 — Vamos Fugir · Marajó · Guaporé · Céu Azul. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function jpeg(svg, outRel) {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

async function main() {
  await jpeg(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a2a18"/>
      <stop offset="55%" stop-color="#123018"/>
      <stop offset="100%" stop-color="#1a3a20"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="920" cy="140" r="70" fill="rgba(240,210,80,0.35)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="2.2">ARTES · GIL + LIMINHA 1984 · SKANK 2004</text>
  <text x="600" y="210" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4eee4">Vamos Fugir</text>
  <text x="600" y="280" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,230,210,0.95)">Irajá · Marajó · Guaporé</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,190,0.95)">céu azul = o céu · ≠ Céu Azul do Chorão</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">Spotify pedido = Skank</text>
</svg>`,
    'imagens/inspecoes/vamos-fugir-cover.jpg'
  );

  await jpeg(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a3048"/>
      <stop offset="45%" stop-color="#0e4a3a"/>
      <stop offset="100%" stop-color="#0a2830"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <ellipse cx="600" cy="340" rx="380" ry="90" fill="rgba(30,80,90,0.45)"/>
  <text x="600" y="70" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="3">PALAVRAS · ILHA · ≠ CIDADE</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4eee4">Marajó</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">Maraj = lapso · Pará · marajoara</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">rio + mar · não um município único</text>
</svg>`,
    'imagens/inspecoes/marajo-palavra-cover.jpg'
  );

  await jpeg(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g3" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#143028"/>
      <stop offset="100%" stop-color="#1a2030"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g3)"/>
  <path d="M80 360 Q 300 280 600 340 T 1120 320" fill="none" stroke="rgba(120,180,200,0.55)" stroke-width="8"/>
  <text x="600" y="70" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="3">PALAVRAS · RIO × MUNICÍPIO</text>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4eee4">Guaporé</text>
  <text x="600" y="320" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">fronteira BR/BO · cidade no RS</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">a canção não escolhe o qual</text>
</svg>`,
    'imagens/inspecoes/guapore-palavra-cover.jpg'
  );

  await jpeg(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a7ec8"/>
      <stop offset="55%" stop-color="#2a5aa0"/>
      <stop offset="100%" stop-color="#1a3060"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g4)"/>
  <circle cx="600" cy="200" r="52" fill="rgba(255,230,120,0.85)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#f0e0b0" letter-spacing="2.2">ARTES · CHARLIE BROWN JR. · 2011</text>
  <text x="600" y="360" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4eee4">Céu Azul</text>
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,240,255,0.95)">Chorão · Castanho · ≠ Vamos Fugir</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#d8c090">Liminha na mesa · sem colar a letra</text>
</svg>`,
    'imagens/inspecoes/ceu-azul-cover.jpg'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
