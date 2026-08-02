'use strict';

/**
 * Injeta palavra «backspace» na série Palavras.
 * Uso: node scripts/upsert-palavra-backspace-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildBackspacePost } = require('../lib/palavras-inspecoes-posts.js');

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
  const post = buildBackspacePost();
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
    const sugId = 'palavra-backspace';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Backspace — invenção do apagar e «tudo de ruim»',
      titleEn: 'Backspace — invention of erase and “everything bad”',
      titleEs: 'Backspace — invención del borrar y «todo lo malo»',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: «backspace» (*back* + *space*) — tecla tipográfica e metáfora de apagar o difícil sem inspecionar.',
      whyEn: 'Words: “backspace” (*back* + *space*) — typewriter key and metaphor for erasing the hard without inspecting.',
      whyEs: 'Palabras: «backspace» (*back* + *space*) — tecla tipográfica y metáfora de borrar lo difícil sin inspeccionar.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        'https://en.wikipedia.org/wiki/Backspace',
        'https://www.etymonline.com/word/backspace',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-pesquisa-oficio-roubo-proibicao.html',
        '/vida/'
      ],
      notes: 'Backspace bom = rever; backspace mau = amnésia / silenciamento.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-backspace)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'backspace',
      word: 'Backspace',
      simple:
        'Inglês *back* + *space* (~1899) — tecla que volta/apaga; no BudGanja, ofício de rever × tentação de apagar tudo de ruim.',
      simpleEn:
        'English *back* + *space* (~1899) — key that steps back/erases; in BudGanja, craft of revision vs temptation to erase everything bad.',
      simpleEs:
        'Inglés *back* + *space* (~1899) — tecla que retrocede/borra; en BudGanja, oficio de revisar × tentación de borrar todo lo malo.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'balde');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (backspace)');
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
