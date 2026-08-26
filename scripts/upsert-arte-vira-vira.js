'use strict';

/**
 * Injeta / actualiza «Vira-Vira» (Artes · Mamonas Assassinas).
 * Uso: node scripts/upsert-arte-vira-vira.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildViraViraPost,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
} = require('../lib/vira-vira-inspecao-post.js');

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

function nextArtesOrder(posts, fallback, exceptSlug) {
  const taken = new Set(
    posts
      .filter((p) => p.series === 'artes-cultura' && p.slug !== exceptSlug)
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
  const post = buildViraViraPost();
  post.seriesOrder = nextArtesOrder(posts, post.seriesOrder, post.slug);
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-vira-vira';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Vira-Vira — Mamonas e o ofício de virar sem esmagar',
      titleEn: 'Vira-Vira — Mamonas and the craft of turning without crushing',
      titleEs: 'Vira-Vira — Mamonas y el oficio de virar sin aplastar',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Canção 1995: Mamonas / EMI — paródia do vira (género), não de um povo; par de Pelados (o outro clipe).',
      whyEn: '1995 song: Mamonas / EMI — parody of the vira (genre), not a people; pair with Pelados (the other clip).',
      whyEs: 'Canción 1995: Mamonas / EMI — parodia del vira (género), no de un pueblo; par de Pelados (el otro clip).',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [href, SPOTIFY, YT, YT_MUSIC, WIKI, '/posts/post-inspecao-arte-pelados-em-santos.html', '/vida/'],
      notes: 'Obra primeiro (1995); Spotify do álbum, não do filme 2023; sátira do género; eco poético distinto da letra.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-vira-vira)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'vira-vira',
      word: 'Vira-Vira',
      simple:
        'Canção Mamonas Assassinas (1995): paródia do vira (género), não de um povo — o outro clipe, par de Pelados em Santos.',
      simpleEn:
        'Mamonas Assassinas song (1995): parody of the vira (genre), not a people — the other clip, pair with Pelados em Santos.',
      simpleEs:
        'Canción Mamonas Assassinas (1995): parodia del vira (género), no de un pueblo — el otro videoclip, par de Pelados em Santos.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'pelados-em-santos');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (vira-vira)');
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
