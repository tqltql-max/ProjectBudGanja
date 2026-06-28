'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const i18nDir = path.join(ROOT, 'content', 'i18n');
const outPath = path.join(ROOT, 'js', 'i18n-data.js');

const locales = {};
for (const file of fs.readdirSync(i18nDir)) {
  if (!file.endsWith('.json')) continue;
  const code = file.replace(/\.json$/, '');
  locales[code] = JSON.parse(fs.readFileSync(path.join(i18nDir, file), 'utf8'));
}

const output =
  '// Gerado por scripts/sync-i18n-data.js — não editar manualmente\n' +
  'window.__I18N_LOCALES__ = ' + JSON.stringify(locales, null, 2) + ';\n';

fs.writeFileSync(outPath, output, 'utf8');
console.log('i18n synced (' + Object.keys(locales).join(', ') + ').');
