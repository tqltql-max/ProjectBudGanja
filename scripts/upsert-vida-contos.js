'use strict';

/**
 * Injeta série Vida (conto + personagens) a partir de Vida/*.txt.
 * Uso: node scripts/upsert-vida-contos.js
 */

const fs = require('fs');
const path = require('path');
const { buildVidaPosts } = require('../lib/vida-contos-posts.js');

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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

async function syncSql(built) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  built.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', built.length, 'posts');
}

async function main() {
  const built = buildVidaPosts();

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  built.forEach((post) => upsertPost(posts, post));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const historia = built[0];
    upsertSug(items, {
      id: 'conto-vida-laboratorio',
      title: 'Vida — O Laboratório e a Sementinha',
      titleEn: 'Vida — The Lab and the Little Seed',
      titleEs: 'Vida — El Laboratorio y la Semillita',
      tipo: 'conto',
      priority: 1,
      status: 'feita',
      why: 'Conto familiar: cuidar de plantas com ciência, natureza e amizade — série Vida.',
      whyEn: 'Family story: plant care with science, nature and friendship — Vida series.',
      whyEs: 'Cuento familiar: cuidar plantas con ciencia, naturaleza y amistad — serie Vida.',
      suggestedSlug: historia.slug,
      doneHref: '/posts/post-' + historia.slug + '.html',
      seriesHint: 'vida-contos',
      sources: ['/vida/', 'Vida/Historia.txt', 'Vida/Personagens.txt'],
      notes: 'Hub /vida/ + fichas de personagens.'
    });
    sug.items = items;
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  await syncSql(built);
  console.log('OK —', built.length, 'posts Vida');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
