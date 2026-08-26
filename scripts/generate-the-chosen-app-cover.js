'use strict';

/** Capa 1200×630 — Artes · app The Chosen (Play / Come and See). */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('../lib/paths.js');
const { YT_ID } = require('../lib/the-chosen-inspecao-post.js');

const OUT = path.join(ROOT, 'imagens', 'inspecoes', 'the-chosen-app-cover.jpg');

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
      .modulate({ brightness: 0.42, saturation: 0.7 })
      .toBuffer();
  } catch (e) {
    const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
    baseBuf = await sharp(heroPath)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: 0.4, saturation: 0.85 })
      .toBuffer();
  }

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(12,18,28,0.35)"/>
      <stop offset="48%" stop-color="rgba(8,14,22,0.78)"/>
      <stop offset="100%" stop-color="rgba(6,10,16,0.96)"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3a5a78"/>
      <stop offset="55%" stop-color="#c4d8e8"/>
      <stop offset="100%" stop-color="#6a9080"/>
    </linearGradient>
    <rect id="phone" x="0" y="0" width="72" height="128" rx="12"/>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#line)"/>
  <g transform="translate(564 86)" opacity="0.85">
    <rect x="0" y="0" width="72" height="128" rx="14" fill="none" stroke="#c4d8e8" stroke-width="3"/>
    <rect x="26" y="8" width="20" height="5" rx="2" fill="#c4d8e8"/>
    <rect x="10" y="22" width="52" height="86" rx="4" fill="rgba(196,216,232,0.12)"/>
  </g>
  <text x="600" y="248" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#c4d8e8" letter-spacing="7">ARTES · APP OFICIAL · PLAY STORE</text>
  <text x="600" y="348" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#fff6e8">The Chosen</text>
  <text x="600" y="418" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d7e6f0">via gratuita · Come and See</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#9ad4c8">net.comeandsee.thechosen · ficha ≠ série</text>
</svg>`);

  await sharp(baseBuf)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(OUT);

  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
