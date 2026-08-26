'use strict';

/**
 * Injeta / actualiza a homenagem a Álvares de Azevedo (série Pessoas).
 * Uso: node scripts/upsert-figura-alvares-de-azevedo.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildAlvaresDeAzevedoPost
} = require('../lib/alvares-de-azevedo-inspecao-post.js');

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
  const post = buildAlvaresDeAzevedoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const lagrimasHref = '/posts/post-inspecao-arte-lagrimas-da-vida.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'figura-alvares-de-azevedo';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Álvares de Azevedo — homenagem ao poeta da Lira',
      titleEn: 'Álvares de Azevedo — homage to the Lira poet',
      titleEs: 'Álvares de Azevedo — homenaje al poeta de la Lira',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas × Artes: homenagem a Álvares de Azevedo com elo em Lágrimas da Vida.',
      whyEn: 'People × Arts: homage to Álvares de Azevedo linked to Lágrimas da Vida.',
      whyEs: 'Personas × Artes: homenaje a Álvares de Azevedo con vínculo en Lágrimas da Vida.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'pessoas-historia',
      sources: [
        post.sourceUrl,
        lagrimasHref,
        'https://pt.wikipedia.org/wiki/Lira_dos_vinte_anos',
        '/vida/'
      ],
      notes: 'Homenagem literária; não romantizar morte precoce.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (figura-alvares-de-azevedo)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'alvares-de-azevedo',
      word: 'Álvares de Azevedo',
      simple:
        'Poeta ultrarromântico brasileiro (1831–1852), autor da *Lira dos Vinte Anos*; no site, homenagem em Pessoas com elo ao poema Lágrimas da Vida.',
      simpleEn:
        'Brazilian ultra-romantic poet (1831–1852), author of *Lira dos Vinte Anos*; on the site, a People homage linked to Lágrimas da Vida.',
      simpleEs:
        'Poeta ultrarromántico brasileño (1831–1852), autor de *Lira dos Vinte Anos*; en el sitio, homenaje en Personas con vínculo al poema Lágrimas da Vida.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'lagrimas-da-vida');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (alvares-de-azevedo)');
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
