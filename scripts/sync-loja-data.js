'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { LOJA_CATALOG } = require('../lib/loja-catalog.js');

const jsPath = path.join(ROOT, 'js', 'loja-data.js');
const jsonPath = path.join(ROOT, 'content', 'loja.json');
const payload = JSON.stringify(LOJA_CATALOG, null, 2);
const js =
  '// Gerado por scripts/sync-loja-data.js — não editar manualmente\n' +
  'window.__LOJA_CATALOG__ = ' + payload + ';\n';
fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
fs.writeFileSync(jsPath, js, 'utf8');
fs.writeFileSync(jsonPath, payload + '\n', 'utf8');
console.log('Loja catalog synced (' + LOJA_CATALOG.projects.length + ' projetos).');
