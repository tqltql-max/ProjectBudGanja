'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const src = path.join(ROOT, 'content', 'page-translations.json');
const outPath = path.join(ROOT, 'js', 'page-translations-data.js');

let data = {};
try {
  data = JSON.parse(fs.readFileSync(src, 'utf8'));
} catch (e) {
  console.warn('sync-page-translations: ficheiro ausente ou inválido — a gerar stub.');
  data = {};
}

const output =
  '// Gerado por scripts/sync-page-translations.js — não editar manualmente\n' +
  'window.__PAGE_TRANSLATIONS__ = ' +
  JSON.stringify(data) +
  ';\n';

fs.writeFileSync(outPath, output, 'utf8');
console.log('page-translations synced (' + Object.keys(data).length + ' pages).');
