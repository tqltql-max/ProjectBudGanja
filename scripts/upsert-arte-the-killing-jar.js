'use strict';

/**
 * Injeta / actualiza «The Killing Jar» (Artes · Siouxsie and the Banshees).
 * Uso: node scripts/upsert-arte-the-killing-jar.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildTheKillingJarPost,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
} = require('../lib/the-killing-jar-inspecao-post.js');

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
  const post = buildTheKillingJarPost();
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
    const sugId = 'arte-the-killing-jar';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'The Killing Jar — Siouxsie and the Banshees e o ofício de não pregar a vida',
      titleEn: 'The Killing Jar — Siouxsie and the Banshees and the craft of not pinning life',
      titleEs: 'The Killing Jar — Siouxsie and the Banshees y el oficio de no clavar la vida',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Canção 1988: Banshees / Peepshow — frasco de coleccionador × inseto / vida / objetos.',
      whyEn: '1988 song: Banshees / Peepshow — collector’s jar × insect / life / objects.',
      whyEs: 'Canción 1988: Banshees / Peepshow — frasco de coleccionista × insecto / vida / objetos.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        href,
        SPOTIFY,
        YT,
        YT_MUSIC,
        WIKI,
        '/posts/post-inspecao-palavra-inseto.html',
        '/posts/post-inspecao-arte-killing-in-the-name.html',
        '/vida/'
      ],
      notes: 'Obra primeiro (1988); Spotify como referência pedida; eco poético distinto da letra; sem protocolo de colecção.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-the-killing-jar)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'the-killing-jar',
      word: 'The Killing Jar',
      simple:
        'Canção Siouxsie and the Banshees (1988): o frasco do coleccionador — elo BudGanja com inseto, vida e objetos; inspecionar sem pregar.',
      simpleEn:
        'Siouxsie and the Banshees song (1988): the collector’s jar — BudGanja link to insect, life and objects; inspect without pinning.',
      simpleEs:
        'Canción Siouxsie and the Banshees (1988): el frasco del coleccionista — vínculo BudGanja con insecto, vida y objetos; inspeccionar sin clavar.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'how-bizarre');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (the-killing-jar)');
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
