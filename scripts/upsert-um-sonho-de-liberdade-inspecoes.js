'use strict';

/**
 * Injeta Um Sonho de Liberdade (Artes) + Stephen King (Pessoas · autor).
 * Uso: node scripts/upsert-um-sonho-de-liberdade-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildUmSonhoDeLiberdadePost,
  buildStephenKingPost
} = require('../lib/um-sonho-de-liberdade-inspecoes-posts.js');

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
    'generate-um-sonho-de-liberdade-cover.js',
    'generate-stephen-king-cover.js'
  ].forEach((script) => {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  });

  const filme = buildUmSonhoDeLiberdadePost();
  const autor = buildStephenKingPost();
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
      id: 'arte-filme-um-sonho-de-liberdade',
      title: 'Um Sonho de Liberdade — a novela de King e o filme de 1994',
      titleEn: 'The Shawshank Redemption — King’s novella and the 1994 film',
      titleEs: 'Cadena perpetua — la novela de King y el filme de 1994',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes: Um Sonho de Liberdade (1994) — novela King 1982 primeiro; Darabont adapta.',
      whyEn: 'Arts: The Shawshank Redemption (1994) — King 1982 novella first; Darabont adapts.',
      whyEs: 'Artes: Um Sonho de Liberdade (1994) — novela King 1982 primero; Darabont adapta.',
      suggestedSlug: filme.slug,
      doneHref: filmeHref,
      seriesHint: 'artes-cultura',
      sources: [filme.sourceUrl, autorHref, 'https://www.youtube.com/watch?v=6hB3S9bIacs'],
      notes: 'Literatura primeiro. Ficção de prisão ≠ manual. Pessoa ≠ personagem.'
    });
    upsertSug(items, {
      id: 'figura-stephen-king',
      title: 'Stephen King — o autor, a novela e Um Sonho de Liberdade',
      titleEn: 'Stephen King — the author, the novella and The Shawshank Redemption',
      titleEs: 'Stephen King — el autor, la novela y Cadena perpetua',
      tipo: 'pessoas',
      priority: 1,
      status: 'feita',
      why: 'Pessoas × Artes: Stephen King — autor da novela; pessoa, não marca de horror.',
      whyEn: 'People × Arts: Stephen King — novella author; the person, not a horror brand.',
      whyEs: 'Personas × Artes: Stephen King — autor de la novela; la persona, no la marca de terror.',
      suggestedSlug: autor.slug,
      doneHref: autorHref,
      seriesHint: 'pessoas-historia',
      sources: [autor.sourceUrl, filmeHref]
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (filme + King)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(items, {
      id: 'um-sonho-de-liberdade',
      word: 'Um Sonho de Liberdade',
      simple:
        'Filme de 1994 (The Shawshank Redemption); no site, inspeção em Artes com génese na novela de Stephen King (1982).',
      simpleEn:
        '1994 film (The Shawshank Redemption); on the site, an Arts inspection rooted in Stephen King’s 1982 novella.',
      simpleEs:
        'Filme de 1994 (The Shawshank Redemption); en el sitio, inspección en Artes con origen en la novela de Stephen King (1982).',
      group: 'lexico',
      fromTitle: false,
      href: filmeHref
    });
    upsertGuia(items, {
      id: 'stephen-king',
      word: 'Stephen King',
      simple:
        'Escritor; no site, ficha em Pessoas com elo em Um Sonho de Liberdade — autor, não marca de horror.',
      simpleEn:
        'Writer; on the site, a People sheet linked to The Shawshank Redemption — the author, not the horror brand.',
      simpleEs:
        'Escritor; en el sitio, ficha en Personas con vínculo en Um Sonho de Liberdade — el autor, no la marca de terror.',
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
