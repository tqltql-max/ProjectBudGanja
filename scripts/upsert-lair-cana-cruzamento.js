'use strict';

/**
 * Actualiza fichas Lair (Divulgação) + Cana (Derivados) com cruzamento açúcar/cana.
 * Uso: node scripts/upsert-lair-cana-cruzamento.js
 */

const fs = require('fs');
const path = require('path');
const { buildLairRibeiroPost } = require('../lib/divulgacao-inspecoes-posts.js');
const { buildCanaDeAcucarPost } = require('../lib/derivados-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const HITS_FILE = path.join(ROOT, 'content', 'channels', 'lair-sugar-hits.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'em índice', idx);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
  }
}

function writeI18n(i18n, post) {
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
}

const lair = buildLairRibeiroPost();
const cana = buildCanaDeAcucarPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

upsertPost(posts, lair);
upsertPost(posts, cana);
fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
writeI18n(i18n, lair);
writeI18n(i18n, cana);
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

if (fs.existsSync(HITS_FILE)) {
  const hits = JSON.parse(fs.readFileSync(HITS_FILE, 'utf8'));
  hits.editorialSummary = {
    updatedAt: new Date().toISOString(),
    portalCaneLink:
      'https://lairribeiro.com.br/parte-4-inflamacoes-cronica-causada-por-carboidratos/',
    portalNote:
      'Artigo Parte 4 define sacarose como açúcar branco de mesa proveniente da cana-de-açúcar ou beterraba.',
    titlesNamingCaneExplicitly: 0,
    coreVideoIds: [
      'UfPawBg7vXc',
      'oGhMcYmy-C4',
      '9S7mDGA_gCo',
      'rVS2M4wuseE',
      'ZvPCoIR26ns',
      'wju2nUtdvIw',
      'iU5KFy5UF40',
      'VItTyNMP_xg',
      'ZgLx3Mr1h3U'
    ],
    relatedPosts: [
      '/posts/post-inspecao-divulgacao-lair-ribeiro.html',
      '/posts/post-inspecao-derivado-cana-de-acucar.html'
    ]
  };
  fs.writeFileSync(HITS_FILE, JSON.stringify(hits, null, 2) + '\n', 'utf8');
  console.log('lair-sugar-hits.json: editorialSummary actualizado');
}

console.log('OK Lair', (lair.content_raw || '').length, 'chars');
console.log('OK Cana', (cana.content_raw || '').length, 'chars');
