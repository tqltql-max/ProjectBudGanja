'use strict';

/**
 * Gera capas OG compactas (1200×630 JPEG) a partir do hero.
 * WhatsApp/Facebook rejeitam o background-hero.png (~10MB).
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function loadSharp() {
  try {
    return require('sharp');
  } catch (e) {
    throw new Error('sharp em falta — npm install');
  }
}

async function makeBase(sharp, heroPath) {
  return sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.72, saturation: 0.95 })
    .toBuffer();
}

function overlaySvg(lines) {
  const title = lines.title || '';
  const kicker = lines.kicker || '';
  const sub = lines.sub || '';
  return Buffer.from(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,10,9,0.15)"/>
      <stop offset="55%" stop-color="rgba(8,10,9,0.45)"/>
      <stop offset="100%" stop-color="rgba(8,10,9,0.78)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <text x="600" y="250" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" fill="#d4af37" letter-spacing="10">${kicker}</text>
  <text x="600" y="340" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="800" fill="#fff8e0">${title}</text>
  <text x="600" y="410" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#d7d7d7">${sub}</text>
</svg>`
  );
}

async function writeJpeg(sharp, baseBuf, overlay, outPath) {
  await sharp(baseBuf)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(outPath);
  const size = fs.statSync(outPath).size;
  console.log('  →', path.relative(ROOT, outPath), '(' + Math.round(size / 1024) + ' KB)');
  if (size > 450 * 1024) {
    console.warn('    aviso: ficheiro acima de 450KB — WhatsApp pode falhar');
  }
}

async function main() {
  const sharp = await loadSharp();
  const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
  if (!fs.existsSync(heroPath)) {
    throw new Error('imagens/background-hero.png em falta');
  }

  const outDir = path.join(ROOT, 'imagens');
  fs.mkdirSync(outDir, { recursive: true });

  console.log('generate-og-images: a criar capas 1200×630…');
  const base = await makeBase(sharp, heroPath);

  await writeJpeg(
    sharp,
    base,
    overlaySvg({
      kicker: 'INSPETOR BUDGANJA',
      title: 'BudGanja Radio',
      sub: 'Playlist do laboratório'
    }),
    path.join(outDir, 'og-radio.jpg')
  );

  await writeJpeg(
    sharp,
    base,
    overlaySvg({
      kicker: 'LABORATÓRIO DIGITAL',
      title: 'Inspetor BudGanja',
      sub: 'Pesquisa, inspeções e cultivo'
    }),
    path.join(outDir, 'og-default.jpg')
  );

  // Capa do card da inspeção JAMA / Albaugh (também gerada por scripts/generate-jama-cover.js)
  try {
    require('child_process').execFileSync(process.execPath, [path.join(__dirname, 'generate-jama-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso generate-jama-cover:', e.message || e);
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
