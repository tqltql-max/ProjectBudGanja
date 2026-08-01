'use strict';

/**
 * Injeta / actualiza The Matrix (Artes) + Keanu Reeves (Pessoas).
 * Uso: node scripts/upsert-matrix-keanu-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { buildTheMatrixPost } = require('../lib/artes-inspecoes-posts.js');
const { buildKeanuReevesPost } = require('../lib/pessoas-historia-inspecoes-posts.js');

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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

const matrix = buildTheMatrixPost();
const keanu = buildKeanuReevesPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

upsertPost(posts, matrix);
upsertPost(posts, keanu);

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
writeI18n(i18n, matrix);
writeI18n(i18n, keanu);
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

if (fs.existsSync(SUG_FILE)) {
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];

  upsertSug(items, {
    id: 'arte-the-matrix',
    title: 'The Matrix — cinema, simulação e verificação',
    titleEn: 'The Matrix — cinema, simulation and verification',
    titleEs: 'The Matrix — cine, simulación y verificación',
    tipo: 'arte',
    priority: 2,
    status: 'feita',
    why: 'Artes · cinema: The Matrix (1999) — obra; biografia do actor em Keanu Reeves (Pessoas).',
    whyEn: 'Arts · film: The Matrix (1999) — work; actor biography in Keanu Reeves (People).',
    whyEs: 'Artes · cine: The Matrix (1999) — obra; biografía del actor en Keanu Reeves (Personas).',
    suggestedSlug: matrix.slug,
    doneHref: '/posts/post-' + matrix.slug + '.html',
    seriesHint: 'artes-cultura',
    sources: [
      matrix.sourceUrl,
      'https://www.youtube.com/watch?v=vKQi3bBA1y8',
      '/posts/post-inspecao-figura-keanu-reeves.html'
    ],
    notes: 'Obra ≠ biografia Keanu; metáfora da pílula é simbólica.'
  });

  upsertSug(items, {
    id: 'figura-keanu-reeves',
    title: 'Keanu Reeves — presença, treino e elo com The Matrix',
    titleEn: 'Keanu Reeves — presence, training and link to The Matrix',
    titleEs: 'Keanu Reeves — presencia, entrenamiento y vínculo con The Matrix',
    tipo: 'pessoas',
    priority: 2,
    status: 'feita',
    why: 'Pessoas × Artes: método actoral de Keanu Reeves com elo principal em The Matrix.',
    whyEn: 'People × Arts: Keanu Reeves acting craft with primary link to The Matrix.',
    whyEs: 'Personas × Artes: oficio actoral de Keanu Reeves con vínculo principal en The Matrix.',
    suggestedSlug: keanu.slug,
    doneHref: '/posts/post-' + keanu.slug + '.html',
    seriesHint: 'pessoas-historia',
    sources: [keanu.sourceUrl, '/posts/post-inspecao-filme-the-matrix.html'],
    notes: 'Pessoas ≠ Legado; filme fica em Artes.'
  });

  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (Matrix + Keanu feitas)');
}

console.log('OK:', matrix.title);
console.log('OK:', keanu.title);
