'use strict';

/**
 * Injeta expressão «Como os ricos transformam as coisas».
 * Uso: node scripts/upsert-expressao-como-os-ricos-transformam-as-coisas.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildComoOsRicosTransformamAsCoisasPost
} = require('../lib/como-os-ricos-transformam-as-coisas-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'expressoes-ditados')
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
  const slug = 'inspecao-expressao-como-os-ricos-transformam-as-coisas';
  const existing = posts.find((p) => p.slug === slug);
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextOrder(posts)
    : nextOrder(posts);
  const post = buildComoOsRicosTransformamAsCoisasPost(seriesOrder);

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
    const sugId = 'expressao-como-os-ricos-transformam-as-coisas';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Como os ricos transformam as coisas — ciclo e poder',
      titleEn: 'How the rich transform things — cycle and power',
      titleEs: 'Cómo los ricos transforman las cosas — ciclo y poder',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Frase-mapa do ciclo das coisas; elo História das Coisas / Annie Leonard.',
      whyEn: 'Map-phrase for the stuff cycle; link Story of Stuff / Annie Leonard.',
      whyEs: 'Frase-mapa del ciclo; vínculo Historia de las cosas / Annie Leonard.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        href,
        '/posts/post-inspecao-arte-a-historia-das-coisas.html',
        '/posts/post-inspecao-figura-annie-leonard.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — tipografia osricostramsorandascoisas → canónica; não panfleto de ódio.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'como-os-ricos-transformam-as-coisas',
      word: 'Como os ricos transformam as coisas',
      simple:
        'Frase-mapa: poder sobre o ciclo extrair→fazer→descartar; elo História das Coisas.',
      simpleEn:
        'Map-phrase: power over extract→make→dispose; link Story of Stuff.',
      simpleEs:
        'Frase-mapa: poder sobre el ciclo; vínculo Historia de las cosas.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'a-historia-das-coisas' || x.id === 'annie-leonard' || x.id === 'objetos'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia actualizado');
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
