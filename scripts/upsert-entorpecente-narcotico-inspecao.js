'use strict';

/**
 * Injeta / actualiza a inspeção Entorpecente × Narcótico em posts.json (+ i18n).
 * Uso: node scripts/upsert-entorpecente-narcotico-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildEntorpecenteNarcoticoPost } = require('../lib/entorpecente-narcotico-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

const post = buildEntorpecenteNarcoticoPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
const idx = posts.findIndex((p) => p.slug === post.slug);

if (idx >= 0) {
  posts[idx] = Object.assign({}, posts[idx], post);
  console.log('Actualizado', post.slug, 'em índice', idx);
} else {
  const afterDroga = posts.findIndex((p) => p.slug === 'inspecao-palavra-droga');
  if (afterDroga >= 0) {
    posts.splice(afterDroga + 1, 0, post);
    console.log('Inserido', post.slug, 'após droga');
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'no início');
  }
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

const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
const href = '/posts/post-inspecao-palavra-entorpecente-narcotico.html';
let guiaHits = 0;
for (const item of guia.items || []) {
  if (item.id === 'entorpecente' || item.id === 'narcotico') {
    item.href = href;
    guiaHits += 1;
  }
}
guia.updatedAt = new Date().toISOString();
fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');

console.log(
  'OK:',
  post.title,
  '| guia hrefs',
  guiaHits,
  '| content_raw',
  (post.content_raw || '').length,
  'chars'
);
