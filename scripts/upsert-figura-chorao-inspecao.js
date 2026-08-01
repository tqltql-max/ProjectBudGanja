'use strict';

/**
 * Injeta / actualiza a inspeção Chorão (série Pessoas × Palavras).
 * Uso: node scripts/upsert-figura-chorao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildChoraoPost } = require('../lib/pessoas-historia-inspecoes-posts.js');
const { buildMaconhaPost } = require('../lib/palavras-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const PLANTAS_FILE = path.join(ROOT, 'content', 'plantas.json');

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

const post = buildChoraoPost();
const maconha = buildMaconhaPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

upsertPost(posts, post);
upsertPost(posts, maconha);

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
writeI18n(i18n, post);
writeI18n(i18n, maconha);
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

if (fs.existsSync(SUG_FILE)) {
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'figura-chorao';
  const href = '/posts/post-' + post.slug + '.html';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Chorão — letra urbana, Charlie Brown Jr. e série Palavras',
    titleEn: 'Chorão — urban lyrics, Charlie Brown Jr. and Words series',
    titleEs: 'Chorão — letra urbana, Charlie Brown Jr. y serie Palabras',
    tipo: 'pessoas',
    priority: 2,
    status: 'feita',
    why: 'Pessoas × Palavras: letrista do CBJr — poesia urbana cruzada com a ficha maconha.',
    whyEn: 'People × Words: CBJr lyricist — urban poetry crossed with the maconha sheet.',
    whyEs: 'Personas × Palabras: letrista de CBJr — poesía urbana cruzada con la ficha maconha.',
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
  console.log('Sugestões actualizadas (Chorão feita)');
}

if (fs.existsSync(PLANTAS_FILE)) {
  const doc = JSON.parse(fs.readFileSync(PLANTAS_FILE, 'utf8'));
  const list = Array.isArray(doc.plants) ? doc.plants : [];
  const plant = list.find((p) => p && p.slug === 'cannabis-sativa');
  if (plant) {
    const href = '/posts/post-' + post.slug + '.html';
    const related = Array.isArray(plant.relatedInspections)
      ? plant.relatedInspections.slice()
      : [];
    const ri = related.findIndex((x) => x && x.href === href);
    const link = {
      href,
      label: 'Inspeção: Chorão — letra urbana, Charlie Brown Jr. e a série Palavras',
      labelEn: 'Inspection: Chorão — urban lyrics, Charlie Brown Jr. and the Words series',
      labelEs: 'Inspección: Chorão — letra urbana, Charlie Brown Jr. y la serie Palabras'
    };
    if (ri >= 0) related[ri] = Object.assign({}, related[ri], link);
    else related.push(link);
    plant.relatedInspections = related;
    fs.writeFileSync(PLANTAS_FILE, JSON.stringify(doc, null, 2) + '\n', 'utf8');
    console.log('Elo relatedInspections em plantas.json → cannabis-sativa');
  }
}

console.log(
  'OK:',
  post.title,
  '| content_raw',
  (post.content_raw || '').length,
  'chars'
);
