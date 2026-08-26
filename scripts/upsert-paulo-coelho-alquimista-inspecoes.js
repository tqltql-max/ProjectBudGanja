'use strict';

/**
 * Injeta O Alquimista (Artes) + Paulo Coelho (Pessoas).
 * Uso: node scripts/upsert-paulo-coelho-alquimista-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { buildOAlquimistaPost } = require('../lib/o-alquimista-inspecao-post.js');
const { buildPauloCoelhoPost } = require('../lib/paulo-coelho-inspecao-post.js');

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

function upsertGuia(items, entry, afterId) {
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = afterId ? items.findIndex((x) => x.id === afterId) : -1;
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

async function main() {
  const livro = buildOAlquimistaPost();
  const autor = buildPauloCoelhoPost();
  const built = [livro, autor];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  built.forEach((post) => upsertPost(posts, post));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const livroHref = '/posts/post-' + livro.slug + '.html';
  const autorHref = '/posts/post-' + autor.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'arte-o-alquimista',
      title: 'O Alquimista — o livro de Paulo Coelho e a Lenda Pessoal',
      titleEn: 'The Alchemist — Paulo Coelho’s book and the Personal Legend',
      titleEs: 'El alquimista — el libro de Paulo Coelho y la Leyenda Personal',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes: O Alquimista (1988) — livro primeiro; autor em Paulo Coelho (Pessoas).',
      whyEn: 'Arts: The Alchemist (1988) — book first; author in Paulo Coelho (People).',
      whyEs: 'Artes: O Alquimista (1988) — libro primero; autor en Paulo Coelho (Personas).',
      suggestedSlug: livro.slug,
      doneHref: livroHref,
      seriesHint: 'artes-cultura',
      sources: [livro.sourceUrl, autorHref],
      notes: 'Alquimia = metáfora literária; ≠ protocolo; copyright — sem citação longa.'
    });
    upsertSug(items, {
      id: 'figura-paulo-coelho',
      title: 'Paulo Coelho — ofício de parábola e elo com O Alquimista',
      titleEn: 'Paulo Coelho — parable craft and link to The Alchemist',
      titleEs: 'Paulo Coelho — oficio de parábola y vínculo con El alquimista',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas × Artes: método de parábola de Coelho com elo em O Alquimista.',
      whyEn: 'People × Arts: Coelho’s parable method linked to The Alchemist.',
      whyEs: 'Personas × Artes: método de parábola de Coelho con vínculo en O Alquimista.',
      suggestedSlug: autor.slug,
      doneHref: autorHref,
      seriesHint: 'pessoas-historia',
      sources: [autor.sourceUrl, livroHref],
      notes: 'Pessoas ≠ Legado; ≠ léxico animal coelho; livro fica em Artes.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Alquimista + Coelho)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(
      items,
      {
        id: 'o-alquimista',
        word: 'O Alquimista',
        simple:
          'Romance de Paulo Coelho (1988) — parábola da Lenda Pessoal; no site, ficha em Artes (livro primeiro), autor em Pessoas.',
        simpleEn:
          'Paulo Coelho novel (1988) — Personal Legend parable; on the site, Arts sheet (book first), author in People.',
        simpleEs:
          'Novela de Paulo Coelho (1988) — parábola de la Leyenda Personal; en el sitio, ficha en Artes (libro primero), autor en Personas.',
        group: 'lexico',
        fromTitle: false,
        href: livroHref
      },
      'alvares-de-azevedo'
    );
    upsertGuia(
      items,
      {
        id: 'paulo-coelho',
        word: 'Paulo Coelho',
        simple:
          'Romancista e letrista brasileiro (n. 1947); no site, ficha em Pessoas com elo ao livro O Alquimista. Distinto do léxico animal «coelho».',
        simpleEn:
          'Brazilian novelist and lyricist (b. 1947); on the site, People sheet linked to The Alchemist. Distinct from the lab word «coelho» (rabbit).',
        simpleEs:
          'Novelista y letrista brasileño (n. 1947); en el sitio, ficha en Personas con vínculo a O Alquimista. Distinto del léxico animal «coelho».',
        group: 'lexico',
        fromTitle: false,
        href: autorHref
      },
      'patrao'
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (o-alquimista, paulo-coelho)');
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
