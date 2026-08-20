'use strict';

/**
 * Injeta o Caderno de jogo 2 — STORY OF SEASONS: Grand Bazaar.
 * Uso: node scripts/upsert-caderno-jogo-sos-grand-bazaar.js
 */

const fs = require('fs');
const path = require('path');
const { buildSosGrandBazaarCadernoPost } = require('../lib/sos-grand-bazaar-caderno-jogo-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-jogo-sos-grand-bazaar');
  const seriesOrder = existing ? Number(existing.seriesOrder) || 2 : nextJogoOrder(posts);
  const post = buildSosGrandBazaarCadernoPost(seriesOrder || 2);

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
    const sugId = 'jogo-sos-grand-bazaar-caderno-2';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Story of Seasons Grand Bazaar — caderno 2, a quinta legal',
      titleEn: 'Story of Seasons Grand Bazaar — notebook 2, the legal farm',
      titleEs: 'Story of Seasons Grand Bazaar — cuaderno 2, la granja legal',
      tipo: 'jogo',
      priority: 2,
      status: 'feita',
      why: 'Caderno de jogo 2: indicação legal SoS Grand Bazaar (Zephyr Town) — Steam/Nintendo oficiais; elo Vida/cultivo; sem dump.',
      whyEn: 'Game notebook 2: legal SoS Grand Bazaar pointer (Zephyr Town) — official Steam/Nintendo; Vida/cultivation; no dump.',
      whyEs: 'Cuaderno 2: indicación legal SoS Grand Bazaar (Zephyr Town) — Steam/Nintendo oficiales; Vida/cultivo; sin dump.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'cadernos-jogo',
      sources: [
        post.sourceUrl,
        'https://store.steampowered.com/app/2508780/STORY_OF_SEASONS_Grand_Bazaar/',
        'https://www.nintendo.com/us/store/products/story-of-seasons-grand-bazaar-switch/',
        'https://en.wikipedia.org/wiki/Harvest_Moon_DS:_Grand_Bazaar',
        'https://www.youtube.com/watch?v=TkMvN7PciFc'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — indicação de cópia legal.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (jogo-sos-grand-bazaar-caderno-2)');
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
