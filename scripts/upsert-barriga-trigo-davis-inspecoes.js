'use strict';

/**
 * Injeta Barriga de Trigo (Artes) + William Davis (Pessoas) + refresca Glúten.
 * Uso: node scripts/upsert-barriga-trigo-davis-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildBarrigaDeTrigoPost,
  buildWilliamDavisPost
} = require('../lib/william-davis-inspecoes-posts.js');
const { buildGlutenPost } = require('../lib/produtos-nocivos-inspecoes-posts.js');

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
  const livro = buildBarrigaDeTrigoPost();
  const autor = buildWilliamDavisPost();
  const gluten = buildGlutenPost();
  const built = [livro, autor, gluten];

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
      id: 'arte-barriga-de-trigo',
      title: 'Barriga de Trigo — o livro de William Davis e a tese do trigo moderno',
      titleEn: 'Wheat Belly — William Davis’s book and the modern-wheat thesis',
      titleEs: 'Barriga de Trigo — el libro de William Davis y la tesis del trigo moderno',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes: Barriga de Trigo / Wheat Belly (2011) — livro primeiro; autor em William Davis (Pessoas); elo Glúten.',
      whyEn: 'Arts: Wheat Belly (2011) — book first; author in William Davis (People); Gluten link.',
      whyEs: 'Artes: Barriga de Trigo (2011) — libro primero; autor en William Davis (Personas); vínculo Gluten.',
      suggestedSlug: livro.slug,
      doneHref: '/posts/post-' + livro.slug + '.html',
      seriesHint: 'artes-cultura',
      sources: [livro.sourceUrl, '/posts/post-inspecao-figura-william-davis.html'],
      notes: 'Wheat Belly 2011; indexar ≠ endossar claims máximos.'
    });
    upsertSug(items, {
      id: 'figura-william-davis',
      title: 'William Davis — cardiologista de Barriga de Trigo e o método anti-trigo',
      titleEn: 'William Davis — Wheat Belly cardiologist and the anti-wheat method',
      titleEs: 'William Davis — cardiólogo de Barriga de Trigo y el método anti-trigo',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas × Artes: método de divulgação clínica de Davis com elo em Barriga de Trigo.',
      whyEn: 'People × Arts: Davis clinical-outreach method linked to Wheat Belly.',
      whyEs: 'Personas × Artes: método de divulgación clínica de Davis con vínculo en Barriga de Trigo.',
      suggestedSlug: autor.slug,
      doneHref: '/posts/post-' + autor.slug + '.html',
      seriesHint: 'pessoas-historia',
      sources: [autor.sourceUrl, '/posts/post-inspecao-arte-barriga-de-trigo.html'],
      notes: 'Pessoas ≠ Legado; livro fica em Artes; proteína em Glúten.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Barriga + Davis)');
  }

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Barriga de Trigo + William Davis + Glúten');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
