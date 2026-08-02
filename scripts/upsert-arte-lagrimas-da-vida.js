'use strict';

/**
 * Injeta / actualiza «Lágrimas da Vida» na série Artes · poesia.
 * Uso: node scripts/upsert-arte-lagrimas-da-vida.js
 */

const fs = require('fs');
const path = require('path');
const { buildLagrimasDaVidaPost } = require('../lib/lagrimas-da-vida-inspecao-post.js');

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
  const post = buildLagrimasDaVidaPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-lagrimas-da-vida';
    const href = '/posts/post-' + post.slug + '.html';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Lágrimas da Vida — Álvares de Azevedo e a máscara que chora',
      titleEn: 'Lágrimas da Vida — Álvares de Azevedo and the mask that weeps',
      titleEs: 'Lágrimas da Vida — Álvares de Azevedo y la máscara que llora',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes · poesia: «Lágrimas da Vida» (*Lira*) — ultrarromantismo; elo com /vida/.',
      whyEn: 'Arts · poetry: “Lágrimas da Vida” (*Lira*) — ultra-romanticism; link to /vida/.',
      whyEs: 'Artes · poesía: «Lágrimas da Vida» (*Lira*) — ultrarromanticismo; vínculo con /vida/.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/%C3%81lvares_de_Azevedo',
        '/vida/',
        '/posts/post-inspecao-palavra-emocao.html',
        '/posts/post-inspecao-palavra-tristeza.html'
      ],
      notes: 'Poema ≠ culto da morte; literatura ultrarromântica com ponte ética a Vida.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-lagrimas-da-vida)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'lagrimas-da-vida',
      word: 'Lágrimas da Vida',
      simple:
        'Poema de Álvares de Azevedo (*Lira dos Vinte Anos*) — lágrima sob a máscara do sorriso; no site, inspeção de Artes com elo à trilha Vida.',
      simpleEn:
        'Poem by Álvares de Azevedo (*Lira dos Vinte Anos*) — a tear under a smiling mask; on the site, an Arts inspection linked to Vida.',
      simpleEs:
        'Poema de Álvares de Azevedo (*Lira dos Vinte Anos*) — lágrima bajo la máscara de la sonrisa; en el sitio, inspección de Artes con vínculo a Vida.',
      group: 'lexico',
      fromTitle: false,
      href: '/posts/post-inspecao-arte-lagrimas-da-vida.html'
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'lei-11-343');
      if (after >= 0) items.splice(after, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (lagrimas-da-vida)');
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
