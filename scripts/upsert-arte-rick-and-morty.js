'use strict';

/**
 * Injeta / actualiza Rick and Morty (Artes · desenho 2013).
 * Uso: node scripts/upsert-arte-rick-and-morty.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildRickAndMortyPost,
  YT,
  WIKI,
  WIKI_EN
} = require('../lib/rick-and-morty-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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
  const post = buildRickAndMortyPost();
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
    const sugId = 'arte-desenho-rick-and-morty';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Rick and Morty — o desenho do portal e o ofício nesta linha',
      titleEn: 'Rick and Morty — the portal cartoon and the craft on this line',
      titleEs: 'Rick and Morty — el dibujo del portal y el oficio en esta línea',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes · desenho 2013: Rick and Morty — multiverso e portal; infinitas linhas nao cancelam faca o melhor nesta.',
      whyEn: 'Arts · 2013 cartoon: Rick and Morty — multiverse and portal; infinite lines do not cancel do your best here.',
      whyEs: 'Artes · dibujo 2013: Rick and Morty — multiverso y portal; las lineas infinitas no cancelan haz lo mejor aqui.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        href,
        YT,
        WIKI,
        WIKI_EN,
        '/posts/post-inspecao-expressao-faca-o-melhor.html',
        '/posts/post-inspecao-filme-de-volta-para-o-futuro.html',
        '/vida/'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — desenho primeiro (2013); Channel 101 2006; RikRok ≠ Rick; poema original.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-desenho-rick-and-morty)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'rick-and-morty',
      word: 'Rick and Morty',
      simple:
        'Desenho Adult Swim (2013, Harmon / Roiland) — portal e multiverso; elo BudGanja: faca o melhor nesta linha.',
      simpleEn:
        'Adult Swim cartoon (2013, Harmon / Roiland) — portal and multiverse; BudGanja link: do your best on this line.',
      simpleEs:
        'Dibujo Adult Swim (2013, Harmon / Roiland) — portal y multiverso; vínculo BudGanja: haz lo mejor en esta línea.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'moana' || x.id === 'how-bizarre');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (rick-and-morty)');
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
