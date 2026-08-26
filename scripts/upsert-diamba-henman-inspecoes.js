'use strict';

/**
 * Injeta Diamba Sarabamba (Artes) + Anthony Henman (Pessoas).
 * Uso: node scripts/upsert-diamba-henman-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { buildDiambaSarabambaPost } = require('../lib/artes-inspecoes-posts.js');
const { buildAnthonyHenmanPost } = require('../lib/pessoas-historia-inspecoes-posts.js');

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
  const livro = buildDiambaSarabambaPost();
  const autor = buildAnthonyHenmanPost();
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
      id: 'arte-diamba-sarabamba',
      title: 'Diamba Sarabamba — a coletânea pioneira de 1986 sobre a maconha no Brasil',
      titleEn: 'Diamba Sarabamba — the pioneering 1986 Brazilian cannabis anthology',
      titleEs: 'Diamba Sarabamba — la antología pionera de 1986 sobre la marihuana en Brasil',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes: Diamba Sarabamba (Ground, 1986) — livro primeiro; organizador em Anthony Henman (Pessoas).',
      whyEn: 'Arts: Diamba Sarabamba (Ground, 1986) — book first; organizer in Anthony Henman (People).',
      whyEs: 'Artes: Diamba Sarabamba (Ground, 1986) — libro primero; organizador en Anthony Henman (Personas).',
      suggestedSlug: livro.slug,
      doneHref: '/posts/post-' + livro.slug + '.html',
      seriesHint: 'artes-cultura',
      sources: [livro.sourceUrl, '/posts/post-inspecao-figura-anthony-henman.html'],
      notes: 'Coletânea Henman & Pessoa Jr.; Carlini contribui (Legado).'
    });
    upsertSug(items, {
      id: 'figura-anthony-henman',
      title: 'Anthony Henman — antropologia da diamba e elo com Diamba Sarabamba',
      titleEn: 'Anthony Henman — diamba anthropology and link to Diamba Sarabamba',
      titleEs: 'Anthony Henman — antropología de la diamba y vínculo con Diamba Sarabamba',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas × Artes: método etnobotânico de Henman com elo em Diamba Sarabamba.',
      whyEn: 'People × Arts: Henman’s ethnobotanical method linked to Diamba Sarabamba.',
      whyEs: 'Personas × Artes: método etnobotánico de Henman con vínculo en Diamba Sarabamba.',
      suggestedSlug: autor.slug,
      doneHref: '/posts/post-' + autor.slug + '.html',
      seriesHint: 'pessoas-historia',
      sources: [autor.sourceUrl, '/posts/post-inspecao-arte-diamba-sarabamba.html'],
      notes: 'Pessoas ≠ Legado; livro fica em Artes. Pessoa Jr. = co-organizador (crédito no livro).'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Diamba + Henman)');
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
