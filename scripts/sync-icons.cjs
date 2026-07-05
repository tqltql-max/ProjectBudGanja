const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = process.cwd();
const source = path.join(root, 'favicon.svg');

if (!fs.existsSync(source)) {
  console.error('Arquivo base nao encontrado: favicon.svg');
  process.exit(1);
}

const outputs = [
  ['imagens/icon-192.png', 192],
  ['imagens/icon-512.png', 512],
  ['imagens/icon-512-maskable.png', 512],
  ['imagens/apple-touch-icon.png', 180],
  ['imagens/favicon-32.png', 32],
  ['imagens/favicon-16.png', 16]
];

(async () => {
  for (const [relPath, size] of outputs) {
    const out = path.join(root, relPath);
    await sharp(source, { density: 1024 })
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`ok ${relPath} (${size}x${size})`);
  }
  console.log('Icones sincronizados a partir de favicon.svg');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
