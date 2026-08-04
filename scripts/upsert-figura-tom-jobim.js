'use strict';

/**
 * Injeta / actualiza Tom Jobim (Pessoas × dedicatória origami).
 * Uso: node scripts/upsert-figura-tom-jobim.js
 */

const fs = require('fs');
const path = require('path');
const { buildTomJobimPost } = require('../lib/tom-jobim-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'pessoas-historia')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

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
  const existing = posts.find((p) => p.slug === 'inspecao-figura-tom-jobim');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextOrder(posts)
    : nextOrder(posts);
  const post = buildTomJobimPost(seriesOrder);

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
    const sugId = 'figura-tom-jobim';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Tom Jobim — bossa, Águas de Março e «Adoro origami»',
      titleEn: 'Tom Jobim — bossa, Waters of March, and “I love origami”',
      titleEs: 'Tom Jobim — bossa, Águas de Março y «Adoro origami»',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas: método palavra-música; dedicatória lab origami (dobrar papel).',
      whyEn: 'People: word-music craft; lab origami dedication (fold paper).',
      whyEs: 'Personas: oficio palabra-música; dedicatoria lab origami (doblar papel).',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'pessoas-historia',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Origami',
        '/posts/post-inspecao-arte-aguas-e-lagrimas.html',
        '/posts/post-inspecao-palavra-agua.html'
      ],
      notes:
        '«Adoro origami» = dedicatória editorial BudGanja, não citação documentada de manuscrito Jobim.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else {
      const after = items.findIndex((x) => x.id === 'figura-renato-russo' || x.id === 'figura-chorao');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (figura-tom-jobim)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entries = [
      {
        id: 'tom-jobim',
        word: 'Tom Jobim',
        simple:
          'Compositor da bossa — palavra-música; Águas de Março; dedicatória lab «Adoro origami».',
        simpleEn:
          'Bossa composer — word-music; Waters of March; lab dedication “I love origami”.',
        simpleEs:
          'Compositor de la bossa — palabra-música; Águas de Março; dedicatoria lab «Adoro origami».',
        group: 'lexico',
        fromTitle: false,
        href
      },
      {
        id: 'origami',
        word: 'origami',
        simple:
          'Japonês ori (dobrar) + kami (papel) — arte de dobrar papel; dedicatória BudGanja a Tom Jobim.',
        simpleEn:
          'Japanese ori (fold) + kami (paper) — paper-folding art; BudGanja dedication to Tom Jobim.',
        simpleEs:
          'Japonés ori (doblar) + kami (papel) — arte de doblar papel; dedicatoria BudGanja a Tom Jobim.',
        group: 'lexico',
        fromTitle: false,
        href
      }
    ];
    entries.forEach((entry) => {
      const gi = items.findIndex((x) => x.id === entry.id);
      if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
      else {
        const after = items.findIndex((x) => x.id === 'aguas-e-lagrimas' || x.id === 'chorao');
        if (after >= 0) items.splice(after + 1, 0, entry);
        else items.push(entry);
      }
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia actualizado (tom-jobim · origami)');
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
