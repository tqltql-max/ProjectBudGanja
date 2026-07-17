'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const SOURCE_PNG = path.join(ROOT, 'imagens', 'iconsite.png');
const SOURCE_SVG = path.join(ROOT, 'imagens', 'app-icon.svg');
const SOURCE = fs.existsSync(SOURCE_PNG) ? SOURCE_PNG : SOURCE_SVG;
const OUT_DIR = path.join(ROOT, 'imagens');
const FAVICON_SVG = path.join(ROOT, 'favicon.svg');

const BG = { r: 26, g: 26, b: 26, alpha: 1 };

async function loadSharp() {
  try {
    return require('sharp');
  } catch (e) {
    console.error('Instale sharp: npm install sharp');
    throw e;
  }
}

function stripNearWhite(raw, info) {
  const pixels = Buffer.from(raw);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r > 235 && g > 235 && b > 235) {
      pixels[i + 3] = 0;
    }
  }
  return { pixels, info };
}

async function prepareLogo(sharp, maxSize) {
  const { data, info } = await sharp(SOURCE)
    .ensureAlpha()
    .resize(maxSize, maxSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = SOURCE === SOURCE_SVG ? stripNearWhite(data, info) : { pixels: data, info };
  return sharp(cleaned.pixels, {
    raw: { width: cleaned.info.width, height: cleaned.info.height, channels: 4 }
  }).png().toBuffer();
}

/** Ícone completo do app (logo + texto) — PWA / apple-touch. */
async function buildAppIcon(sharp, size) {
  if (SOURCE === SOURCE_PNG) {
    return sharp(SOURCE)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .png({ compressionLevel: 9 })
      .toBuffer();
  }

  const pad = Math.round(size * 0.08);
  const inner = size - pad * 2;
  const logo = await prepareLogo(sharp, inner);

  const glow = await sharp(logo)
    .blur(Math.max(2, Math.round(size * 0.03)))
    .modulate({ brightness: 1.15, saturation: 1.4 })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: BG }
  })
    .composite([
      { input: glow, gravity: 'centre', blend: 'screen' },
      { input: logo, gravity: 'centre' }
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Favicon pequeno: recorta só o emblema (topo do iconsite) para ler bem a 16–48px.
 * Sem o texto "INSPETOR BudGanja" que vira mancha na aba.
 */
async function buildFaviconMark(sharp, size) {
  if (SOURCE !== SOURCE_PNG) {
    return buildAppIcon(sharp, size);
  }

  const meta = await sharp(SOURCE).metadata();
  const w = meta.width || 512;
  const h = meta.height || 512;
  // Emblema ocupa ~ metade superior do cartaz
  const crop = Math.min(w, Math.round(h * 0.52));
  const left = Math.max(0, Math.round((w - crop) / 2));
  const top = Math.max(0, Math.round(h * 0.04));

  return sharp(SOURCE)
    .extract({ left, top, width: Math.min(crop, w - left), height: Math.min(crop, h - top) })
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

function buildFaviconSvg(pngBase64) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
  <defs>
    <clipPath id="round"><circle cx="32" cy="32" r="30"/></clipPath>
  </defs>
  <circle cx="32" cy="32" r="30" fill="#1a1a1a"/>
  <g clip-path="url(#round)">
    <image xlink:href="data:image/png;base64,${pngBase64}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>
  </g>
</svg>`;
}

async function writeIco(sizes) {
  const icoPath = path.join(ROOT, 'favicon.ico');
  try {
    const mod = require('png-to-ico');
    const pngToIco = typeof mod === 'function' ? mod : mod.default;
    if (typeof pngToIco !== 'function') throw new Error('png-to-ico sem export default');
    const ico = await pngToIco([sizes[16], sizes[32], sizes[48]]);
    fs.writeFileSync(icoPath, ico);
    console.log('  → favicon.ico (16/32/48)');
  } catch (e) {
    fs.writeFileSync(icoPath, sizes[32]);
    console.log('  → favicon.ico (png fallback:', e.message + ')');
  }
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error('Ficheiro em falta: imagens/iconsite.png ou imagens/app-icon.svg');
  }
  console.log(`Fonte de ícones: ${path.basename(SOURCE)}`);

  const sharp = await loadSharp();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const app = {
    512: await buildAppIcon(sharp, 512),
    192: await buildAppIcon(sharp, 192),
    180: await buildAppIcon(sharp, 180)
  };
  const mark = {
    64: await buildFaviconMark(sharp, 64),
    48: await buildFaviconMark(sharp, 48),
    32: await buildFaviconMark(sharp, 32),
    16: await buildFaviconMark(sharp, 16)
  };

  fs.writeFileSync(path.join(OUT_DIR, 'icon-512.png'), app[512]);
  fs.writeFileSync(path.join(OUT_DIR, 'icon-512-maskable.png'), app[512]);
  fs.writeFileSync(path.join(OUT_DIR, 'icon-192.png'), app[192]);
  fs.writeFileSync(path.join(OUT_DIR, 'apple-touch-icon.png'), app[180]);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon-48.png'), mark[48]);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon-32.png'), mark[32]);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon-16.png'), mark[16]);
  fs.writeFileSync(FAVICON_SVG, buildFaviconSvg(mark[64].toString('base64')));
  await writeIco(mark);

  // Header: mesma arte do emblema (não o cartaz completo com texto)
  fs.writeFileSync(path.join(OUT_DIR, 'app-icon.png'), await buildFaviconMark(sharp, 192));

  console.log('Ícones gerados a partir de imagens/' + path.basename(SOURCE));
  console.log('  → imagens/icon-192.png, icon-512.png, apple-touch-icon.png (app completo)');
  console.log('  → favicon-*.png, favicon.svg, favicon.ico, app-icon.png (emblema)');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
