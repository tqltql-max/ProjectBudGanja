'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const SOURCE_PNG = path.join(ROOT, 'imagens', 'iconsite.png');
const SOURCE_SVG = path.join(ROOT, 'imagens', 'app-icon.svg');
const SOURCE = fs.existsSync(SOURCE_PNG) ? SOURCE_PNG : SOURCE_SVG;
const OUT_DIR = path.join(ROOT, 'imagens');
const FAVICON_SVG = path.join(ROOT, 'favicon.svg');

/** Fundo alinhado ao tema do site / PWA. */
const BG = { r: 26, g: 26, b: 26, alpha: 1 };

/** Margem para ícones “any” / favicon / header (evita corte em cantos arredondados). */
const PAD_ANY = 0.12;
/** Safe zone maskable (Android): conteúdo no ~60% central. */
const PAD_MASKABLE = 0.22;
/** Favicon/aba: um pouco mais de ar para máscaras circulares do browser. */
const PAD_FAVICON = 0.16;

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

/**
 * Coloca a arte completa no canvas com padding — sem cover/crop.
 * iconsite.png já é o emblema (não o cartaz com texto).
 */
async function buildPaddedIcon(sharp, size, padRatio) {
  const pad = Math.max(2, Math.round(size * padRatio));
  const inner = Math.max(8, size - pad * 2);

  let logoBuf;
  if (SOURCE === SOURCE_SVG) {
    const { data, info } = await sharp(SOURCE)
      .ensureAlpha()
      .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const cleaned = stripNearWhite(data, info);
    logoBuf = await sharp(cleaned.pixels, {
      raw: { width: cleaned.info.width, height: cleaned.info.height, channels: 4 }
    })
      .png()
      .toBuffer();
  } else {
    logoBuf = await sharp(SOURCE)
      .ensureAlpha()
      .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  }

  return sharp({
    create: { width: size, height: size, channels: 4, background: BG }
  })
    .composite([{ input: logoBuf, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

function buildFaviconSvg(pngBase64) {
  // Rounded square clip (não círculo) — o emblema já é squircle dourado.
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
  <defs>
    <clipPath id="round"><rect x="2" y="2" width="60" height="60" rx="14" ry="14"/></clipPath>
  </defs>
  <rect x="0" y="0" width="64" height="64" rx="16" ry="16" fill="#1a1a1a"/>
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
    512: await buildPaddedIcon(sharp, 512, PAD_ANY),
    192: await buildPaddedIcon(sharp, 192, PAD_ANY),
    180: await buildPaddedIcon(sharp, 180, PAD_ANY)
  };
  const maskable = await buildPaddedIcon(sharp, 512, PAD_MASKABLE);
  const mark = {
    64: await buildPaddedIcon(sharp, 64, PAD_FAVICON),
    48: await buildPaddedIcon(sharp, 48, PAD_FAVICON),
    32: await buildPaddedIcon(sharp, 32, PAD_FAVICON),
    16: await buildPaddedIcon(sharp, 16, PAD_FAVICON)
  };

  fs.writeFileSync(path.join(OUT_DIR, 'icon-512.png'), app[512]);
  fs.writeFileSync(path.join(OUT_DIR, 'icon-512-maskable.png'), maskable);
  fs.writeFileSync(path.join(OUT_DIR, 'icon-192.png'), app[192]);
  fs.writeFileSync(path.join(OUT_DIR, 'apple-touch-icon.png'), app[180]);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon-48.png'), mark[48]);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon-32.png'), mark[32]);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon-16.png'), mark[16]);
  fs.writeFileSync(FAVICON_SVG, buildFaviconSvg(mark[64].toString('base64')));
  await writeIco(mark);

  // Header / menu: emblema completo com margem (não crop circular agressivo no ficheiro)
  fs.writeFileSync(path.join(OUT_DIR, 'app-icon.png'), await buildPaddedIcon(sharp, 192, PAD_FAVICON));

  console.log('Ícones gerados a partir de imagens/' + path.basename(SOURCE));
  console.log('  → icon-192/512 + apple-touch (padding ' + Math.round(PAD_ANY * 100) + '%)');
  console.log('  → icon-512-maskable (padding ' + Math.round(PAD_MASKABLE * 100) + '%)');
  console.log('  → favicon-*.png, favicon.svg, favicon.ico, app-icon.png');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
