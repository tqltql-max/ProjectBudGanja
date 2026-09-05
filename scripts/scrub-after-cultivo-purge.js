'use strict';

/**
 * Limpa glossário e sugestões após purge de inspeções não-cultivo.
 * Uso: node scripts/scrub-after-cultivo-purge.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POSTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts.json'), 'utf8'));
const keepSlugs = new Set(POSTS.map((p) => p.slug));

function postHrefAlive(href) {
  if (!href || typeof href !== 'string') return false;
  const m = href.match(/\/posts\/post-([^/#?]+)/i);
  if (!m) return true; // non-post links ok
  const slug = m[1].replace(/\.html$/i, '');
  return keepSlugs.has(slug);
}

function scrubGuia() {
  const p = path.join(ROOT, 'content', 'guia-palavras.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const items = Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : null;
  if (!items) {
    console.log('guia-palavras: formato inesperado');
    return;
  }
  let cleared = 0;
  for (const it of items) {
    if (it.href && !postHrefAlive(it.href)) {
      delete it.href;
      cleared += 1;
    }
    if (it.inspecaoHref && !postHrefAlive(it.inspecaoHref)) {
      delete it.inspecaoHref;
      cleared += 1;
    }
    if (it.doneHref && !postHrefAlive(it.doneHref)) {
      delete it.doneHref;
      cleared += 1;
    }
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('guia-palavras: limpos', cleared, 'hrefs mortos; items', items.length);
}

function scrubSugestoes() {
  const p = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const keepTipos = new Set([
    'planta',
    'fruto',
    'animal',
    'fungo',
    'derivado',
    'equipamento',
    'producao',
    'objeto'
  ]);
  const before = (data.items || []).length;
  data.items = (data.items || []).filter((it) => {
    if (!keepTipos.has(String(it.tipo || '').toLowerCase())) return false;
    if (it.doneHref && !postHrefAlive(it.doneHref)) {
      delete it.doneHref;
      if (it.status === 'feita') it.status = 'sugerida';
    }
    if (it.suggestedSlug && !keepSlugs.has(it.suggestedSlug) && it.status === 'feita') {
      it.status = 'sugerida';
      delete it.doneHref;
    }
    return true;
  });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('sugestoes: antes', before, 'depois', data.items.length);
}

scrubGuia();
scrubSugestoes();
console.log('OK scrub');
