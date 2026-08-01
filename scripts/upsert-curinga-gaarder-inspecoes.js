'use strict';

/**
 * Injeta O Dia do Curinga (Artes) + Jostein Gaarder (Pessoas).
 * Uso: node scripts/upsert-curinga-gaarder-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { buildODiaDoCuringaPost } = require('../lib/artes-inspecoes-posts.js');
const { buildJosteinGaarderPost } = require('../lib/pessoas-historia-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

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

async function syncSql(built) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  built.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', built.length, 'posts');
}

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

async function main() {
  const livro = buildODiaDoCuringaPost();
  const autor = buildJosteinGaarderPost();
  const built = [livro, autor];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  built.forEach((post) => upsertPost(posts, post));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'arte-o-dia-do-curinga',
      title: 'O Dia do Curinga — o livro de Gaarder e a pergunta do curinga',
      titleEn: 'The Solitaire Mystery — Gaarder’s book and the joker’s question',
      titleEs: 'El día del comodín — el libro de Gaarder y la pregunta del curinga',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes: O Dia do Curinga (1990) — livro primeiro; autor em Jostein Gaarder (Pessoas).',
      whyEn: 'Arts: The Solitaire Mystery (1990) — book first; author in Jostein Gaarder (People).',
      whyEs: 'Artes: O Dia do Curinga (1990) — libro primero; autor en Jostein Gaarder (Personas).',
      suggestedSlug: livro.slug,
      doneHref: '/posts/post-' + livro.slug + '.html',
      seriesHint: 'artes-cultura',
      sources: [livro.sourceUrl, '/posts/post-inspecao-figura-jostein-gaarder.html'],
      notes: 'Kabalmysteriet 1990; Bebida Púrpura = metáfora literária.'
    });
    upsertSug(items, {
      id: 'figura-jostein-gaarder',
      title: 'Jostein Gaarder — filosofia narrada e elo com O Dia do Curinga',
      titleEn: 'Jostein Gaarder — narrated philosophy and link to The Solitaire Mystery',
      titleEs: 'Jostein Gaarder — filosofía narrada y vínculo con O Dia do Curinga',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas × Artes: método filosófico-narrativo de Gaarder com elo em O Dia do Curinga.',
      whyEn: 'People × Arts: Gaarder’s narrative-philosophy method linked to The Solitaire Mystery.',
      whyEs: 'Personas × Artes: método filosófico-narrativo de Gaarder con vínculo en O Dia do Curinga.',
      suggestedSlug: autor.slug,
      doneHref: '/posts/post-' + autor.slug + '.html',
      seriesHint: 'pessoas-historia',
      sources: [autor.sourceUrl, '/posts/post-inspecao-arte-o-dia-do-curinga.html'],
      notes: 'Pessoas ≠ Legado; livro fica em Artes.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Curinga + Gaarder)');
  }

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', livro.title);
  console.log('OK:', autor.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
