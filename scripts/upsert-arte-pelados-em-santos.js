'use strict';

/**
 * Injeta / actualiza «Pelados em Santos» (Artes · Mamonas Assassinas).
 * Uso: node scripts/upsert-arte-pelados-em-santos.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildPeladosEmSantosPost,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
} = require('../lib/pelados-em-santos-inspecao-post.js');

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

function nextArtesOrder(posts, fallback) {
  const taken = new Set(
    posts
      .filter((p) => p.series === 'artes-cultura')
      .map((p) => p.seriesOrder)
      .filter((n) => typeof n === 'number')
  );
  let order = fallback;
  while (taken.has(order)) order += 1;
  return order;
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
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const post = buildPeladosEmSantosPost();
  post.seriesOrder = nextArtesOrder(posts, post.seriesOrder);
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-pelados-em-santos';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Pelados em Santos — Mamonas e o ofício de rir sem esmagar',
      titleEn: 'Pelados em Santos — Mamonas and the craft of laughing without crushing',
      titleEs: 'Pelados em Santos — Mamonas y el oficio de reír sin aplastar',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Canção 1995: Mamonas / EMI — Brasília amarela × alegria / língua / objectos; sabiam e cairam no lugar certo — ou não.',
      whyEn: '1995 song: Mamonas / EMI — yellow Brasília × joy / language / objects; they knew and fell in the right place — or not.',
      whyEs: 'Canción 1995: Mamonas / EMI — Brasília amarilla × alegría / lengua / objetos; lo sabían y cayeron en el lugar justo — o no.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [href, SPOTIFY, YT, YT_MUSIC, WIKI, '/objetos/', '/vida/'],
      notes: 'Obra primeiro (1995); Spotify pedido; queda em tensão (ou não); eco poético distinto da letra.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-pelados-em-santos)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'pelados-em-santos',
      word: 'Pelados em Santos',
      simple:
        'Canção Mamonas Assassinas (1995): rir da ostentação sem esmagar — Brasília amarela no mapa; sabiam e cairam no lugar certo — ou não.',
      simpleEn:
        'Mamonas Assassinas song (1995): laugh at ostentation without crushing — yellow Brasília on the map; they knew and fell in the right place — or not.',
      simpleEs:
        'Canción Mamonas Assassinas (1995): reír de la ostentación sin aplastar — Brasília amarilla en el mapa; lo sabían y cayeron en el lugar justo — o no.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'the-middle');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (pelados-em-santos)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
