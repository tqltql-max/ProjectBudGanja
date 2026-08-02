'use strict';

/**
 * Gera Markdown + HTML do Livro Vol. 1 (XIV) a partir do manifest de legendas.
 * Uso: node scripts/build-xiv-livro.js
 * (Corre fetch-xiv-transcripts.js antes se o manifest não existir.)
 */

const fs = require('fs');
const {
  MANIFEST_FILE,
  BOOK_MD,
  BOOK_HTML,
  ensureDirs,
  readManifest,
  buildBookFromManifest
} = require('../lib/xiv-transcript-book.js');

function main() {
  ensureDirs();
  let manifest = readManifest();
  if (!manifest) {
    console.error('Manifest em falta. Corre: node scripts/fetch-xiv-transcripts.js');
    process.exit(1);
  }
  const { md, html, okCount, failCount } = buildBookFromManifest(manifest);
  fs.writeFileSync(BOOK_MD, md, 'utf8');
  fs.writeFileSync(BOOK_HTML, html, 'utf8');
  console.log('OK Markdown:', BOOK_MD);
  console.log('OK HTML:', BOOK_HTML);
  console.log('Capítulos:', okCount, 'ok ·', failCount, 'falha');
}

main();
