'use strict';

/**
 * Upsert da pesquisa-laboratório «Da molécula ao lixo».
 * Uso: node scripts/upsert-pesquisa-molecula-ao-lixo.js
 */

const fs = require('fs');
const path = require('path');
const { buildPesquisaMoleculaAoLixoPost } = require('../lib/pesquisa-molecula-ao-lixo-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');

const post = buildPesquisaMoleculaAoLixoPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));

const idx = posts.findIndex((p) => p.slug === post.slug);
if (idx >= 0) {
  posts[idx] = Object.assign({}, posts[idx], post);
  console.log('Actualizado', post.slug);
} else {
  const after = posts.findIndex((p) => p.slug === 'otimizacao-propagacao-vegetal');
  if (after >= 0) posts.splice(after + 1, 0, post);
  else posts.unshift(post);
  console.log('Inserido', post.slug);
}

i18n[post.slug] = {
  titleEn: post.titleEn,
  titleEs: post.titleEs,
  excerptEn: post.excerptEn,
  excerptEs: post.excerptEs,
  contentEn: post.contentEn,
  contentEs: post.contentEs
};

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');
console.log('OK: pesquisa', post.slug);
