'use strict';

/**
 * Injeta / actualiza «Águas do Mar e Lágrimas» (poesia original Artes).
 * Uso: node scripts/upsert-arte-aguas-e-lagrimas.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildAguasELagrimasPost
} = require('../lib/aguas-e-lagrimas-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
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

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  const post = buildAguasELagrimasPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-aguas-e-lagrimas';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Águas do Mar e Lágrimas — poesia original do laboratório',
      titleEn: 'Sea Waters and Tears — original lab poetry',
      titleEs: 'Aguas del Mar y Lágrimas — poesía original del laboratorio',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Poesia original: mar × lágrima × universo Vida / Álvares.',
      whyEn: 'Original poetry: sea × tear × Vida / Álvares universe.',
      whyEs: 'Poesía original: mar × lágrima × universo Vida / Álvares.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        href,
        '/posts/post-inspecao-arte-lagrimas-da-vida.html',
        '/posts/post-inspecao-figura-alvares-de-azevedo.html',
        '/vida/'
      ],
      notes: 'Texto do laboratório; diálogo com ultrarromantismo sem culto da morte.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-aguas-e-lagrimas)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'aguas-e-lagrimas',
      word: 'Águas do Mar e Lágrimas',
      simple:
        'Poesia original BudGanja: o sal do mar e o da lágrima; elo com Vida, Lágrimas da Vida e Álvares de Azevedo.',
      simpleEn:
        'Original BudGanja poem: sea salt and tear salt; links to Vida, Lágrimas da Vida, and Álvares de Azevedo.',
      simpleEs:
        'Poesía original BudGanja: sal del mar y de la lágrima; vínculo con Vida, Lágrimas da Vida y Álvares de Azevedo.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'alvares-de-azevedo');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (aguas-e-lagrimas)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
