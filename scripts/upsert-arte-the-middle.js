'use strict';

/**
 * Injeta / actualiza «The Middle» (Artes · Jimmy Eat World).
 * Uso: node scripts/upsert-arte-the-middle.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildTheMiddlePost,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
} = require('../lib/the-middle-inspecao-post.js');

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
  const post = buildTheMiddlePost();
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
    const sugId = 'arte-the-middle';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'The Middle — Jimmy Eat World e o ofício de não se apagar',
      titleEn: 'The Middle — Jimmy Eat World and the craft of not writing yourself off',
      titleEs: 'The Middle — Jimmy Eat World y el oficio de no apagarse',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Canção 2001: Jimmy Eat World / Bleed American — o meio da viagem × caminho / já / esperança.',
      whyEn: '2001 song: Jimmy Eat World / Bleed American — the middle of the ride × path / já / hope.',
      whyEs: 'Canción 2001: Jimmy Eat World / Bleed American — el medio del viaje × camino / já / esperanza.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [href, SPOTIFY, YT, YT_MUSIC, WIKI, '/posts/post-inspecao-palavra-caminho.html', '/vida/'],
      notes: 'Obra primeiro (2001); Spotify como referência pedida; eco poético distinto da letra.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-the-middle)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'the-middle',
      word: 'The Middle',
      simple:
        'Canção Jimmy Eat World (2001): ficar no meio da viagem sem se escrever fora — génese em Bleed American; elo BudGanja com caminho, já e esperança.',
      simpleEn:
        'Jimmy Eat World song (2001): stay in the middle of the ride without writing yourself off — genesis on Bleed American; BudGanja link to path, já and hope.',
      simpleEs:
        'Canción Jimmy Eat World (2001): quedarse en medio del viaje sin escribirse fuera — génesis en Bleed American; vínculo BudGanja con camino, já y esperanza.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'every-breath-you-take');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (the-middle)');
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
