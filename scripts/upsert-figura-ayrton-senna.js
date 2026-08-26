'use strict';

/**
 * Injeta / actualiza a homenagem a Ayrton Senna (série Pessoas).
 * Uso: node scripts/upsert-figura-ayrton-senna.js
 */

const fs = require('fs');
const path = require('path');
const { buildAyrtonSennaPost } = require('../lib/ayrton-senna-inspecao-post.js');

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
  const post = buildAyrtonSennaPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const mantraHref = '/posts/post-inspecao-palavra-valeu.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'figura-ayrton-senna';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Ayrton Senna — homenagem completa e Valeu !!!',
      titleEn: 'Ayrton Senna — full homage and Valeu !!!',
      titleEs: 'Ayrton Senna — homenaje completo y ¡Valeu !!!',
      tipo: 'pessoas',
      priority: 1,
      status: 'feita',
      why: 'Pessoas × Expressões: homenagem a Senna com elo no mantra Valeu !!!; ofício, Brasil, Instituto.',
      whyEn: 'People × Expressions: Senna homage linked to Valeu !!!; craft, Brazil, Instituto.',
      whyEs: 'Personas × Expresiones: homenaje a Senna con vínculo en ¡Valeu !!!; oficio, Brasil, Instituto.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'pessoas-historia',
      sources: [
        post.sourceUrl,
        mantraHref,
        'https://www.institutoayrtonsenna.org.br/',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Homenagem completa; não romantizar a morte em Ímola.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (figura-ayrton-senna)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'ayrton-senna',
      word: 'Ayrton Senna',
      simple:
        'Piloto brasileiro tricampeão de F1 (1960–1994); no site, homenagem em Pessoas com elo ao mantra Valeu !!! e ao Instituto.',
      simpleEn:
        'Brazilian three-time F1 champion (1960–1994); on the site, a People homage linked to Valeu !!! and the Instituto.',
      simpleEs:
        'Piloto brasileño tricampeón de F1 (1960–1994); en el sitio, homenaje en Personas con vínculo a ¡Valeu !!! y al Instituto.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'faca-o-melhor' || x.id === 'melhor');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (ayrton-senna)');
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
