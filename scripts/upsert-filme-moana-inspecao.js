'use strict';

/**
 * Injeta / actualiza Moana (2016) na série Artes · desenho / cinema.
 * Uso: node scripts/upsert-filme-moana-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMoanaPost } = require('../lib/moana-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

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
  const post = buildMoanaPost();
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
    const sugId = 'arte-filme-moana';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Moana — o desenho do oceano, da vocação e da ilha',
      titleEn: 'Moana — the ocean, vocation, and the island cartoon',
      titleEs: 'Moana — el dibujo del océano, la vocación y la isla',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes · desenho: Moana (2016, Disney) — oceano, navegar e cuidado da ilha; elos mar/caminho/Vida.',
      whyEn: 'Arts · animation: Moana (2016, Disney) — ocean, sailing and island care; links mar/caminho/Vida.',
      whyEs: 'Artes · dibujo: Moana (2016, Disney) — océano, navegar y cuidado de la isla; vínculos mar/caminho/Vida.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        post.sourceUrl,
        'https://en.wikipedia.org/wiki/Moana_(2016_film)',
        'https://www.youtube.com/watch?v=LKFuXEt8JUA',
        '/posts/post-inspecao-palavra-mar.html',
        '/posts/post-inspecao-palavra-navegar.html',
        '/posts/post-inspecao-amyr-klink.html'
      ],
      notes: 'Génese 2016; Moana 2 / live-action = ecos.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-filme-moana)');
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
