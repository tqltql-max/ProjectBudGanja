'use strict';

/** Capa 1200×630 — Artes · Encontro Marcado (1998). */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('../lib/paths.js');
const { YT_ID } = require('../lib/encontro-marcado-inspecao-post.js');

const OUT = path.join(ROOT, 'imagens', 'inspecoes', 'encontro-marcado-cover.jpg');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
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

async function main() {
  const sharp = require('sharp');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  let baseBuf;
  try {
    const thumb = await fetchBuffer('https://i.ytimg.com/vi/' + YT_ID + '/maxresdefault.jpg');
    baseBuf = await sharp(thumb)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: 0.54, saturation: 0.82 })
      .toBuffer();
  } catch (e) {
    const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
    baseBuf = await sharp(heroPath)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: 0.5, saturation: 0.98 })
      .toBuffer();
  }

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(16,18,28,0.3)"/>
      <stop offset="50%" stop-color="rgba(12,14,22,0.62)"/>
      <stop offset="100%" stop-color="rgba(8,8,14,0.93)"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6a7a9a"/>
      <stop offset="55%" stop-color="#e8d4b0"/>
      <stop offset="100%" stop-color="#c4a070"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#line)"/>
  <text x="600" y="168" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#e8d4b0" letter-spacing="7">ARTES · CINEMA · 1998</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#fff6e8">Encontro Marcado</text>
  <text x="600" y="368" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d7e6f0">peça 1924 · Casella · Meet Joe Black</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#9ad4c8">a Morte tira férias · teatro primeiro</text>
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
