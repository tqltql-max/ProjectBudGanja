'use strict';

/** Capa 1200×630 — Artes · Santa Ceia / A Última Ceia (Leonardo, 1495–1498). */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('../lib/paths.js');

const OUT = path.join(ROOT, 'imagens', 'inspecoes', 'santa-ceia-cover.jpg');
const UA =
  'InspetorBudGanjaBot/1.0 (https://inspetorbudganja.com.br; inspection covers; contact tql.tql@gmail.com)';

const WIKI_THUMBS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1280px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/The_Last_Supper_by_Leonardo_da_Vinci%2C_From_The_Wide_World_Magazine.jpg/1280px-The_Last_Supper_by_Leonardo_da_Vinci%2C_From_The_Wide_World_Magazine.jpg'
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': UA, Accept: 'image/*' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error('HTTP ' + res.statusCode + ' ' + url));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

function tableSvg() {
  return Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="45%" stop-color="#2c2218"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5a4030"/>
      <stop offset="50%" stop-color="#d4c4a0"/>
      <stop offset="100%" stop-color="#5a4030"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <polygon points="600,90 1180,430 20,430" fill="none" stroke="rgba(212,196,160,0.22)" stroke-width="2"/>
  <polygon points="600,90 900,430 300,430" fill="none" stroke="rgba(212,196,160,0.14)" stroke-width="1"/>
  <rect x="80" y="360" width="1040" height="28" fill="rgba(90,60,36,0.85)"/>
  <rect x="70" y="388" width="1060" height="14" fill="rgba(60,40,24,0.9)"/>
  <circle cx="600" cy="300" r="36" fill="none" stroke="rgba(240,220,180,0.55)" stroke-width="2"/>
  <circle cx="600" cy="300" r="8" fill="rgba(240,220,180,0.7)"/>
</svg>`);
}

async function muralBase(sharp) {
  for (const url of WIKI_THUMBS) {
    try {
      const buf = await fetchBuffer(url);
      return sharp(buf)
        .rotate()
        .resize(1200, 630, { fit: 'cover', position: 'attention' })
        .modulate({ brightness: 0.55, saturation: 0.75 })
        .toBuffer();
    } catch (e) {
      console.warn('Aviso capa Wikimedia', e.message);
    }
  }
  return sharp(tableSvg()).jpeg({ quality: 84 }).toBuffer();
}

async function main() {
  const sharp = require('sharp');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const baseBuf = await muralBase(sharp);

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(18,14,12,0.28)"/>
      <stop offset="48%" stop-color="rgba(12,10,10,0.62)"/>
      <stop offset="100%" stop-color="rgba(6,6,6,0.92)"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6a4038"/>
      <stop offset="55%" stop-color="#d4c4a0"/>
      <stop offset="100%" stop-color="#8a7060"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#line)"/>
  <text x="600" y="168" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#d4c4a0" letter-spacing="7">ARTES · PINTURA · 1495–1498</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#fff6e8">Santa Ceia</text>
  <text x="600" y="358" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d7e6f0">A Última Ceia · Leonardo da Vinci</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#9ad4c8">obra primeiro · mural ≠ sacramento</text>
</svg>`);

  await sharp(baseBuf)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(OUT);

  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
