'use strict';

/**
 * Copia história e curiosidades para cada entrada do Guia de Palavras.
 * Uso: node scripts/fill-guia-palavras-historias.js
 */

const fs = require('fs');
const path = require('path');
const HIST = require('../lib/guia-palavras-historias-data.js');

const ROOT = path.join(__dirname, '..');
const GUIA = path.join(ROOT, 'content', 'guia-palavras.json');

const guia = JSON.parse(fs.readFileSync(GUIA, 'utf8'));
let applied = 0;
let missing = [];

guia.items = (guia.items || []).map((item) => {
  const row = HIST[item.id];
  if (!row || !row.history || !row.curiosities) {
    missing.push(item.id);
    return item;
  }
  applied += 1;
  return Object.assign({}, item, {
    history: row.history,
    curiosities: row.curiosities,
    historyEn: row.historyEn,
    curiositiesEn: row.curiositiesEn,
    historyEs: row.historyEs,
    curiositiesEs: row.curiositiesEs
  });
});

guia.updatedAt = new Date().toISOString();
fs.writeFileSync(GUIA, JSON.stringify(guia, null, 2) + '\n', 'utf8');
console.log('Aplicadas', applied, 'de', (guia.items || []).length);
if (missing.length) console.warn('Sem ficha:', missing.join(', '));
