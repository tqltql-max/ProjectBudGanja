'use strict';

/**
 * Injeta / actualiza as inspeções de Classificação legal + entradas no Guia.
 * Uso: node scripts/upsert-classificacao-legal-palavras.js
 */

const fs = require('fs');
const path = require('path');
const {
  CLASSIFICACAO_LEGAL_PALAVRAS_POSTS,
  CLASSIFICACAO_GUIA_ITEMS
} = require('../lib/classificacao-legal-palavras-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));

let inserted = 0;
let updated = 0;

for (const post of CLASSIFICACAO_LEGAL_PALAVRAS_POSTS) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    updated += 1;
  } else {
    const after = posts.findIndex((p) => p.slug === 'inspecao-palavra-entorpecente-narcotico');
    if (after >= 0) {
      // Keep series order: insert after the last classificação post already present.
      let insertAt = after + 1;
      while (
        insertAt < posts.length &&
        posts[insertAt].series === 'palavras-origem' &&
        (posts[insertAt].seriesOrder || 0) < (post.seriesOrder || 0)
      ) {
        insertAt += 1;
      }
      posts.splice(insertAt, 0, post);
    } else {
      posts.unshift(post);
    }
    inserted += 1;
  }

  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
}

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
if (!Array.isArray(guia.items)) guia.items = [];

let guiaAdded = 0;
let guiaUpdated = 0;
for (const item of CLASSIFICACAO_GUIA_ITEMS) {
  const idx = guia.items.findIndex((x) => x.id === item.id);
  if (idx >= 0) {
    guia.items[idx] = Object.assign({}, guia.items[idx], item);
    guiaUpdated += 1;
  } else {
    guia.items.push(item);
    guiaAdded += 1;
  }
}

guia.items.sort((a, b) =>
  String(a.word || '').localeCompare(String(b.word || ''), 'pt', { sensitivity: 'base' })
);
guia.updatedAt = new Date().toISOString();
fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');

console.log(
  'OK: posts +' +
    inserted +
    ' ~' +
    updated +
    ' | guia +' +
    guiaAdded +
    ' ~' +
    guiaUpdated +
    ' | total classificação posts',
  CLASSIFICACAO_LEGAL_PALAVRAS_POSTS.length
);
