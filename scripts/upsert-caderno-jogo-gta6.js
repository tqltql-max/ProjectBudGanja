'use strict';

/**
 * Injeta o Caderno de jogo 1 — GTA 6.
 * Uso: node scripts/upsert-caderno-jogo-gta6.js
 */

const fs = require('fs');
const path = require('path');
const { buildGta6CadernoPost } = require('../lib/gta6-caderno-jogo-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function nextJogoOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'cadernos-jogo')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
  }
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
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-jogo-gta6');
  const seriesOrder = existing ? Number(existing.seriesOrder) || 1 : nextJogoOrder(posts);
  const post = buildGta6CadernoPost(seriesOrder || 1);

  upsertPost(posts, post);
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

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'jogo-gta6-caderno-1';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'GTA 6 — caderno 1, a cidade anunciada',
      titleEn: 'GTA 6 — notebook 1, the announced city',
      titleEs: 'GTA 6 — cuaderno 1, la ciudad anunciada',
      tipo: 'jogo',
      priority: 2,
      status: 'feita',
      why: 'Caderno de jogo 1: GTA 6 pré-estreia (19 nov. 2026) — Vice City / Leonida, Lucia e Jason; sem walkthrough.',
      whyEn: 'Game notebook 1: GTA 6 pre-release (19 Nov 2026) — Vice City / Leonida, Lucia and Jason; no walkthrough.',
      whyEs: 'Cuaderno 1: GTA 6 preestreno (19 nov. 2026) — Vice City / Leonida, Lucia y Jason; sin walkthrough.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'cadernos-jogo',
      sources: [
        post.sourceUrl,
        'https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI',
        'https://www.rockstargames.com/VI',
        'https://www.youtube.com/watch?v=QdBZYXl_BXg'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — primeiro caderno da série.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (jogo-gta6-caderno-1)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
