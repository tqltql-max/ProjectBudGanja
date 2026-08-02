'use strict';

/**
 * Injeta palavra «gesto» na série Palavras.
 * Uso: node scripts/upsert-palavra-gesto-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildGestoPost } = require('../lib/palavras-inspecoes-posts.js');

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
  const post = buildGestoPost();
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
    const sugId = 'palavra-gesto';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Gesto — acto mínimo do laboratório',
      titleEn: 'Gesto — minimal act of the lab',
      titleEs: 'Gesto — acto mínimo del laboratorio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: «gesto» (*gestus*) — mapa do projecto: Vida, cultivo, inspeções, ferramentas e rede.',
      whyEn: 'Words: “gesto” (*gestus*) — map of the project: Vida, grow, inspections, tools and network.',
      whyEs: 'Palabras: «gesto» (*gestus*) — mapa del proyecto: Vida, cultivo, inspecciones, herramientas y red.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        '/vida/',
        '/guia/cultivo-basico.html',
        '/biblioteca/inspecoes/',
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-palavra-criatividade.html'
      ],
      notes: 'Gesto ≠ pose — acto com método e cuidado.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-gesto)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'gesto',
      word: 'Gesto',
      simple:
        'Do latim *gestus* — acto mínimo; no BudGanja liga Vida, cultivo, inspeções, ferramentas e comunidade.',
      simpleEn:
        'From Latin *gestus* — minimal act; in BudGanja it links Vida, grow, inspections, tools and community.',
      simpleEs:
        'Del latín *gestus* — acto mínimo; en BudGanja une Vida, cultivo, inspecciones, herramientas y comunidad.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'verdade');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (gesto)');
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
