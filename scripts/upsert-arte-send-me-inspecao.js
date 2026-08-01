'use strict';

/**
 * Injeta / actualiza a inspeção Send Me On My Way (série Artes).
 * Uso: node scripts/upsert-arte-send-me-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSendMeOnMyWayPost } = require('../lib/artes-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

const post = buildSendMeOnMyWayPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
const idx = posts.findIndex((p) => p.slug === post.slug);

if (idx >= 0) {
  posts[idx] = Object.assign({}, posts[idx], post);
  console.log('Actualizado', post.slug, 'em índice', idx);
} else {
  posts.unshift(post);
  console.log('Inserido', post.slug, 'no início');
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

if (fs.existsSync(SUG_FILE)) {
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'arte-send-me-on-my-way';
  const href = '/posts/post-' + post.slug + '.html';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Send Me On My Way — Rusted Root e abertura da rádio',
    titleEn: 'Send Me On My Way — Rusted Root and radio opening',
    titleEs: 'Send Me On My Way — Rusted Root y apertura de la radio',
    tipo: 'arte',
    priority: 1,
    status: 'feita',
    why: 'Ficha fundadora Artes: música de boas-vindas da BudGanja Radio.',
    whyEn: 'Founding Arts sheet: BudGanja Radio welcome track.',
    whyEs: 'Ficha fundadora Artes: pista de bienvenida de BudGanja Radio.',
    suggestedSlug: post.slug,
    doneHref: href,
    seriesHint: 'artes-cultura',
    sources: [
      post.sourceUrl,
      'https://www.youtube.com/watch?v=IGMabBGydC0',
      '/radio/'
    ],
    notes: 'Elo com /radio/ e Palavras (passar); faixa CBJr fica em Pessoas/Chorão.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (Send Me On My Way feita)');
}

console.log(
  'OK:',
  post.title,
  '| content_raw',
  (post.content_raw || '').length,
  'chars'
);
