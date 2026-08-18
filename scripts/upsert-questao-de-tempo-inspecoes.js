'use strict';

/**
 * Injeta Questão de Tempo (Artes) + Richard Curtis (Pessoas · autor).
 * Uso: node scripts/upsert-questao-de-tempo-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildQuestaoDeTempoPost,
  buildRichardCurtisPost
} = require('../lib/questao-de-tempo-inspecoes-posts.js');

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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertGuia(items, entry) {
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else items.push(entry);
}

async function syncSql(list) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  list.forEach((p) => upsertPost(posts, p));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', list.map((p) => p.slug).join(', '));
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

async function main() {
  [
    'generate-questao-de-tempo-cover.js',
    'generate-richard-curtis-cover.js'
  ].forEach((script) => {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit'
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  });

  const filme = buildQuestaoDeTempoPost();
  const autor = buildRichardCurtisPost();
  const list = [filme, autor];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const filmeHref = '/posts/post-' + filme.slug + '.html';
  const autorHref = '/posts/post-' + autor.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'arte-filme-questao-de-tempo',
      title: 'Questão de Tempo — o filme de 2013 e o destaque para o autor',
      titleEn: 'About Time — the 2013 film and the highlight on the author',
      titleEs: 'About Time — el filme de 2013 y el destaque para el autor',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes: About Time / Questão de Tempo (2013) + crédito ao autor Richard Curtis.',
      whyEn: 'Arts: About Time (2013) + credit to author Richard Curtis.',
      whyEs: 'Artes: About Time / Questão de Tempo (2013) + crédito al autor Richard Curtis.',
      suggestedSlug: filme.slug,
      doneHref: filmeHref,
      seriesHint: 'artes-cultura',
      sources: [filme.sourceUrl, autorHref, 'https://www.youtube.com/watch?v=7lCDEYXw3mM'],
      notes: 'Destaque para o autor. Filme = texto (sem livro prévio). Pessoa ≠ personagem.'
    });
    upsertSug(items, {
      id: 'figura-richard-curtis',
      title: 'Richard Curtis — o autor, o ofício da escrita e Questão de Tempo',
      titleEn: 'Richard Curtis — the author, the craft of writing and About Time',
      titleEs: 'Richard Curtis — el autor, el oficio de la escritura y About Time',
      tipo: 'pessoas',
      priority: 1,
      status: 'feita',
      why: 'Pessoas × Artes: Richard Curtis — autor de Questão de Tempo; pessoa, não marca de rom-com.',
      whyEn: 'People × Arts: Richard Curtis — author of About Time; the person, not a rom-com brand.',
      whyEs: 'Personas × Artes: Richard Curtis — autor de About Time; la persona, no la marca rom-com.',
      suggestedSlug: autor.slug,
      doneHref: autorHref,
      seriesHint: 'pessoas-historia',
      sources: [autor.sourceUrl, filmeHref, 'https://www.comicrelief.com/meet-the-team/richard-curtis/']
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (filme + Curtis)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(items, {
      id: 'questao-de-tempo',
      word: 'Questão de Tempo',
      simple:
        'Filme de 2013 (About Time); no site, inspeção em Artes com destaque para o autor Richard Curtis.',
      simpleEn:
        '2013 film (About Time); on the site, an Arts inspection highlighting author Richard Curtis.',
      simpleEs:
        'Filme de 2013 (About Time); en el sitio, inspección en Artes con destaque para el autor Richard Curtis.',
      group: 'lexico',
      fromTitle: false,
      href: filmeHref
    });
    upsertGuia(items, {
      id: 'richard-curtis',
      word: 'Richard Curtis',
      simple:
        'Argumentista e realizador; no site, ficha em Pessoas com elo em Questão de Tempo — autor, não marca.',
      simpleEn:
        'Screenwriter and director; on the site, a People sheet linked to About Time — the author, not the brand.',
      simpleEs:
        'Guionista y director; en el sitio, ficha en Personas con vínculo en About Time — el autor, no la marca.',
      group: 'lexico',
      fromTitle: false,
      href: autorHref
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado');
  }

  try {
    await syncSql(list);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  list.forEach((p) => {
    try {
      writeHtml(p);
    } catch (e) {
      console.warn('Aviso HTML', p.slug, e.message);
    }
  });

  list.forEach((p) => console.log('OK:', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
