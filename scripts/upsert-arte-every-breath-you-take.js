'use strict';

/**
 * Injeta / actualiza «Every Breath You Take» (Artes · The Police).
 * Uso: node scripts/upsert-arte-every-breath-you-take.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildEveryBreathYouTakePost,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
} = require('../lib/every-breath-you-take-inspecao-post.js');

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
  const post = buildEveryBreathYouTakePost();
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
    const sugId = 'arte-every-breath-you-take';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Every Breath You Take — The Police e o ofício de olhar sem possuir',
      titleEn: 'Every Breath You Take — The Police and the craft of looking without owning',
      titleEs: 'Every Breath You Take — The Police y el oficio de mirar sin poseer',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Canção 1983: The Police / Synchronicity — vigilância × perseguição / medo / coração.',
      whyEn: '1983 song: The Police / Synchronicity — surveillance × pursuit / fear / heart.',
      whyEs: 'Canción 1983: The Police / Synchronicity — vigilancia × persecución / miedo / corazón.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        href,
        YT,
        YT_MUSIC,
        SPOTIFY,
        WIKI,
        '/posts/post-inspecao-palavra-perseguicao.html',
        '/vida/'
      ],
      notes: 'Obra primeiro (1983); clipe oficial pedido; eco poético distinto da letra; não endossa vigilância.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-every-breath-you-take)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'every-breath-you-take',
      word: 'Every Breath You Take',
      simple:
        'Canção The Police (1983): o hino que o rádio ouviu como amor e Sting nomeou como vigilância — elo BudGanja com perseguição, medo e coração.',
      simpleEn:
        'The Police song (1983): the anthem radio heard as love and Sting named as surveillance — BudGanja link to pursuit, fear and heart.',
      simpleEs:
        'Canción The Police (1983): el himno que la radio oyó como amor y Sting nombró como vigilancia — vínculo BudGanja con persecución, miedo y corazón.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'bitter-sweet-symphony');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (every-breath-you-take)');
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
