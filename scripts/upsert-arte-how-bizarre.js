'use strict';

/**
 * Injeta / actualiza «How Bizarre» (Artes · OMC).
 * Uso: node scripts/upsert-arte-how-bizarre.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildHowBizarrePost,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
} = require('../lib/how-bizarre-inspecao-post.js');

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
  const post = buildHowBizarrePost();
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
    const sugId = 'arte-how-bizarre';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'How Bizarre — OMC e o ofício de nomear o estranho',
      titleEn: 'How Bizarre — OMC and the craft of naming the strange',
      titleEs: 'How Bizarre — OMC y el oficio de nombrar lo extraño',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Canção 1995: OMC / Ōtara — nomear o bizarro × criatividade / alegria / caminho.',
      whyEn: '1995 song: OMC / Ōtara — name the bizarre × creativity / joy / path.',
      whyEs: 'Canción 1995: OMC / Ōtara — nombrar lo bizarro × creatividad / alegría / camino.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        href,
        SPOTIFY,
        YT,
        YT_MUSIC,
        WIKI,
        '/posts/post-inspecao-palavra-criatividade.html',
        '/vida/'
      ],
      notes: 'Obra primeiro (1995); Spotify como referência pedida; eco poético distinto da letra.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-how-bizarre)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'how-bizarre',
      word: 'How Bizarre',
      simple:
        'Canção OMC (1995): nomear o bizarro da vida — génese em Ōtara; elo BudGanja com criatividade, alegria e caminho.',
      simpleEn:
        'OMC song (1995): naming life’s bizarre — genesis in Ōtara; BudGanja link to creativity, joy and path.',
      simpleEs:
        'Canción OMC (1995): nombrar lo bizarro de la vida — génesis en Ōtara; vínculo BudGanja con creatividad, alegría y camino.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'upside-down');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (how-bizarre)');
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
