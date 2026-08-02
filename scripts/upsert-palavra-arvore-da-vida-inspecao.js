'use strict';

/**
 * Injeta palavra «Árvore da Vida» na série Palavras + refresca Bom dia, Inverno.
 * Uso: node scripts/upsert-palavra-arvore-da-vida-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildArvoreDaVidaPost } = require('../lib/palavras-inspecoes-posts.js');
const { buildBomDiaInvernoPost } = require('../lib/bom-dia-inverno-inspecao-post.js');

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
  const post = buildArvoreDaVidaPost();
  const bomDia = buildBomDiaInvernoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  upsertPost(posts, bomDia);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, bomDia);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-arvore-da-vida';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Árvore da Vida — fase sénior do arco',
      titleEn: 'Tree of Life — senior phase of the arc',
      titleEs: 'Árbol de la Vida — fase sénior del arco',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: «Árvore da Vida» — fecha o arco semente → mudinha → árvore no laboratório.',
      whyEn: 'Words: “Árvore da Vida” — closes the seed → seedling → tree arc in the lab.',
      whyEs: 'Palabras: «Árvore da Vida» — cierra el arco semilla → plantita → árbol en el laboratorio.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        'https://pt.wikipedia.org/wiki/%C3%81rvore_da_vida',
        '/posts/post-inspecao-arte-bom-dia-inverno.html',
        '/posts/post-inspecao-conto-vida-laboratorio.html',
        '/vida/'
      ],
      notes: 'Sénior ≠ fim do ofício — ainda há gesto e mãos.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-arvore-da-vida)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'arvore-da-vida',
      word: 'Árvore da Vida',
      simple:
        'Latim *arbor* — figura sénior do arco semente → mudinha → árvore no BudGanja; sombra e ofício contínuo.',
      simpleEn:
        'Latin *arbor* — senior figure of the seed → seedling → tree arc in BudGanja; shade and ongoing craft.',
      simpleEs:
        'Latín *arbor* — figura sénior del arco semilla → plantita → árbol en BudGanja; sombra y oficio continuo.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.id === 'arvore');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'mao' || x.id === 'sementinha');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (arvore-da-vida)');
  }

  try {
    await syncSql(post);
    await syncSql(bomDia);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
