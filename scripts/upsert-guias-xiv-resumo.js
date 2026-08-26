'use strict';

/**
 * Upsert dos guias XIV a partir dos resumos de aula (quimiotipos, canabiméticos, Farmácia Viva).
 * Uso: node scripts/upsert-guias-xiv-resumo.js
 */

const fs = require('fs');
const path = require('path');
const { buildGuiaQuimiotiposCannabisPost, GUIA_QUIMIOTIPOS_ITEMS } = require('../lib/guia-quimiotipos-cannabis-inspecao-post.js');
const { buildGuiaCanabimeticosModulacaoPost, GUIA_CANABIMETICOS_ITEMS } = require('../lib/guia-canabimeticos-modulacao-inspecao-post.js');
const { buildGuiaFarmaciaVivaPost, GUIA_FARMACIA_VIVA_ITEMS } = require('../lib/guia-farmacia-viva-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

const BUNDLES = [
  { post: buildGuiaQuimiotiposCannabisPost(), items: GUIA_QUIMIOTIPOS_ITEMS },
  { post: buildGuiaCanabimeticosModulacaoPost(), items: GUIA_CANABIMETICOS_ITEMS },
  { post: buildGuiaFarmaciaVivaPost(), items: GUIA_FARMACIA_VIVA_ITEMS }
];

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const after = posts.findIndex((p) => p.slug === 'inspecao-guia-meditacao-endocanabinoidoma');
  if (after >= 0) posts.splice(after + 1, 0, post);
  else posts.unshift(post);
  console.log('Inserido', post.slug);
}

const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
if (!Array.isArray(guia.items)) guia.items = [];

let added = 0;
let updated = 0;

for (const bundle of BUNDLES) {
  upsertPost(posts, bundle.post);
  i18n[bundle.post.slug] = {
    titleEn: bundle.post.titleEn,
    titleEs: bundle.post.titleEs,
    excerptEn: bundle.post.excerptEn,
    excerptEs: bundle.post.excerptEs,
    contentEn: bundle.post.contentEn,
    contentEs: bundle.post.contentEs
  };
  for (const item of bundle.items) {
    const gi = guia.items.findIndex((x) => x.id === item.id);
    if (gi >= 0) {
      guia.items[gi] = Object.assign({}, guia.items[gi], item);
      updated += 1;
    } else {
      guia.items.push(item);
      added += 1;
    }
  }
}

guia.items.sort((a, b) =>
  String(a.word || '').localeCompare(String(b.word || ''), 'pt', { sensitivity: 'base' })
);
guia.updatedAt = new Date().toISOString();

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');
fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');

console.log('OK: 3 guias XIV | guia +' + added + ' ~' + updated + ' | total palavras', guia.items.length);
