'use strict';

/**
 * Injeta / actualiza a inspeção Gregorio Duvivier (série Pessoas × Palavras).
 * Uso: node scripts/upsert-figura-duvivier-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildDuvivierPost } = require('../lib/pessoas-historia-inspecoes-posts.js');
const { buildMaconhaPost } = require('../lib/palavras-inspecoes-posts.js');

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

const post = buildDuvivierPost();
const maconha = buildMaconhaPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

upsertPost(posts, post);
// Reaplica maconha (complementaridade actualizada no builder Palavras, se houver)
upsertPost(posts, maconha);

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
writeI18n(i18n, post);
writeI18n(i18n, maconha);
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

if (fs.existsSync(SUG_FILE)) {
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'figura-duvivier';
  const href = '/posts/post-' + post.slug + '.html';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Gregorio Duvivier — método da palavra e série Palavras',
    titleEn: 'Gregorio Duvivier — method of the word and Words series',
    titleEs: 'Gregorio Duvivier — método de la palabra y serie Palabras',
    tipo: 'pessoas',
    priority: 2,
    status: 'feita',
    why: 'Pessoas × Palavras: Letras, O Céu da Língua, sátira — elo com a ficha maconha.',
    whyEn: 'People × Words: Literature degree, O Céu da Língua, satire — link to the maconha sheet.',
    whyEs: 'Personas × Palabras: Letras, O Céu da Língua, sátira — vínculo con la ficha maconha.',
    suggestedSlug: post.slug,
    doneHref: href,
    seriesHint: 'pessoas-historia',
    sources: [post.sourceUrl, '/posts/post-inspecao-palavra-maconha.html']
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);

  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (Duvivier feita)');
}

console.log(
  'OK:',
  post.title,
  '| content_raw',
  (post.content_raw || '').length,
  'chars'
);
