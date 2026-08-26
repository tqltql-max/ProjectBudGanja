'use strict';

/**
 * Injeta / actualiza a inspeção-guia meditação × endocanabinoidoma (+ Guia técnico).
 * Uso: node scripts/upsert-guia-meditacao-endocanabinoidoma.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildGuiaMeditacaoEndocanabinoidomaPost,
  GUIA_MEDITACAO_ENDOCANABINOIDOMA_ITEMS
} = require('../lib/guia-meditacao-endocanabinoidoma-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(post) {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    const after = posts.findIndex((p) => p.slug === 'inspecao-guia-defensoria-acesso');
    if (after >= 0) posts.splice(after + 1, 0, post);
    else posts.unshift(post);
    console.log('Inserido', post.slug);
  }
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');
}

const post = buildGuiaMeditacaoEndocanabinoidomaPost();
upsertPost(post);

const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
if (!Array.isArray(guia.items)) guia.items = [];
let added = 0;
let updated = 0;
for (const item of GUIA_MEDITACAO_ENDOCANABINOIDOMA_ITEMS) {
  const gi = guia.items.findIndex((x) => x.id === item.id);
  if (gi >= 0) {
    guia.items[gi] = Object.assign({}, guia.items[gi], item);
    updated += 1;
  } else {
    guia.items.push(item);
    added += 1;
  }
}
guia.items.sort((a, b) =>
  String(a.word || '').localeCompare(String(b.word || ''), 'pt', { sensitivity: 'base' })
);
guia.updatedAt = new Date().toISOString();
fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');

console.log('OK:', post.title, '| guia +' + added + ' ~' + updated);
