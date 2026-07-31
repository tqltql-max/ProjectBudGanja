'use strict';

/**
 * Injeta / actualiza a inspeção do artigo Albaugh et al. (JAMA Psychiatry 2021).
 * Uso: node scripts/upsert-artigo-albaugh-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildAlbaughCannabisNeurodesenvolvimentoPost
} = require('../lib/artigos-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');

const post = buildAlbaughCannabisNeurodesenvolvimentoPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
const idx = posts.findIndex((p) => p.slug === post.slug);

if (idx >= 0) {
  posts[idx] = Object.assign({}, posts[idx], post);
  console.log('Actualizado', post.slug, 'em índice', idx);
} else {
  const afterCurso = posts.findIndex(
    (p) => p.slug === 'inspecao-curso-unifesp-cannabis-medicinal'
  );
  if (afterCurso >= 0) {
    posts.splice(afterCurso + 1, 0, post);
    console.log('Inserido', post.slug, 'após curso UNIFESP');
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
  excerptEs: post.excerptEs
};
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

console.log(
  'OK:',
  post.title,
  '| content_raw',
  (post.content_raw || '').length,
  'chars | i18n overlay actualizado'
);
