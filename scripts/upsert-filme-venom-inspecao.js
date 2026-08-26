'use strict';

/**
 * Injeta / actualiza Venom (2018) na série Artes · cinema.
 * Uso: node scripts/upsert-filme-venom-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildVenomPost } = require('../lib/venom-inspecao-post.js');

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
  const venom = buildVenomPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  upsertPost(posts, venom);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, venom);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-filme-venom';
    const href = '/posts/post-' + venom.slug + '.html';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Venom — o filme de 2018, a simbiose e o «nós»',
      titleEn: 'Venom — the 2018 film, symbiosis and “we”',
      titleEs: 'Venom — el filme de 2018, la simbiosis y el «nosotros»',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes: Venom (2018, Fleischer/Hardy) — comics Marvel → entrada SSU; simbiose e «nós».',
      whyEn: 'Arts: Venom (2018) — Marvel comics → SSU entry; symbiosis and “we”.',
      whyEs: 'Artes: Venom (2018) — cómics Marvel → entrada SSU; simbiosis y «nosotros».',
      suggestedSlug: venom.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        venom.sourceUrl,
        'https://en.wikipedia.org/wiki/Venom_(2018_film)',
        'https://www.youtube.com/watch?v=u9Mv98Gr5pY',
        '/posts/post-inspecao-filme-the-matrix.html',
        '/posts/post-inspecao-filme-divertida-mente.html'
      ],
      notes: 'Comics primeiro (personagem); filme 2018 = entrada SSU; sequelas = eco.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Venom feita)');
  }

  try {
    await syncSql(venom);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', venom.title, '| cover', venom.coverImage);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
