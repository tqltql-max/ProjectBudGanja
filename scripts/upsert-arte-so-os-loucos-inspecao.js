'use strict';

/**
 * Injeta / actualiza Só os Loucos Sabem + actualiza Send Me On My Way (série Artes).
 * Uso: node scripts/upsert-arte-so-os-loucos-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildSoOsLoucosSabemPost,
  buildSendMeOnMyWayPost
} = require('../lib/artes-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'em índice', idx);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'no início');
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

const loucos = buildSoOsLoucosSabemPost();
const sendMe = buildSendMeOnMyWayPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

upsertPost(posts, loucos);
upsertPost(posts, sendMe);

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
writeI18n(i18n, loucos);
writeI18n(i18n, sendMe);
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

if (fs.existsSync(SUG_FILE)) {
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'arte-so-os-loucos-sabem';
  const href = '/posts/post-' + loucos.slug + '.html';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Só os Loucos Sabem — CBJr e a segunda faixa da rádio',
    titleEn: 'Só os Loucos Sabem — CBJr and the radio’s second track',
    titleEs: 'Só os Loucos Sabem — CBJr y la segunda pista de la radio',
    tipo: 'arte',
    priority: 1,
    status: 'feita',
    why: 'Artes: segunda música da BudGanja Radio (ao vivo Chegou Quem Faltava).',
    whyEn: 'Arts: second BudGanja Radio track (live Chegou Quem Faltava).',
    whyEs: 'Artes: segunda canción de BudGanja Radio (en vivo Chegou Quem Faltava).',
    suggestedSlug: loucos.slug,
    doneHref: href,
    seriesHint: 'artes-cultura',
    sources: [
      loucos.sourceUrl,
      'https://www.youtube.com/watch?v=NFADwNLNSd4',
      '/radio/',
      '/posts/post-inspecao-figura-chorao.html'
    ],
    notes: 'Obra ≠ biografia Chorão; par da abertura Rusted Root.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (Só os Loucos Sabem feita)');
}

console.log('OK:', loucos.title, '|', (loucos.content_raw || '').length, 'chars');
