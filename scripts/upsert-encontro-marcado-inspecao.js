'use strict';

/**
 * Injeta Encontro Marcado (Artes).
 * Uso: node scripts/upsert-encontro-marcado-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildEncontroMarcadoPost } = require('../lib/encontro-marcado-inspecao-post.js');
const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');

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

function upsertEntry(items, key, entry) {
  const i = items.findIndex((x) => x[key] === entry[key]);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else items.push(entry);
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-encontro-marcado-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 40000
    });
  } catch (e) {
    console.warn('Aviso capa', e.message);
  }

  const post = buildEncontroMarcadoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertEntry(items, 'id', {
      id: 'arte-filme-encontro-marcado',
      title: 'Encontro Marcado — a peça de 1924 e o filme de 1998',
      titleEn: 'Meet Joe Black — the 1924 play and the 1998 film',
      titleEs: 'Meet Joe Black — la obra de 1924 y el filme de 1998',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes: Encontro Marcado (1998) — peça Casella 1924 primeiro; remake de Death Takes a Holiday.',
      whyEn: 'Arts: Meet Joe Black (1998) — Casella 1924 play first; remake of Death Takes a Holiday.',
      whyEs: 'Artes: Encontro Marcado (1998) — obra Casella 1924 primero; remake de Death Takes a Holiday.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [post.sourceUrl, 'https://en.wikipedia.org/wiki/Death_Takes_a_Holiday', 'https://www.youtube.com/watch?v=_zIOjl93WrU'],
      notes: 'Teatro primeiro. Ficção da Morte ≠ manual. Pessoa ≠ personagem.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertEntry(items, 'id', {
      id: 'encontro-marcado',
      word: 'Encontro Marcado',
      simple:
        'Filme de 1998 (Meet Joe Black); no site, inspeção em Artes com génese na peça de Alberto Casella (1924).',
      simpleEn:
        '1998 film (Meet Joe Black); on the site, an Arts inspection rooted in Alberto Casella’s 1924 play.',
      simpleEs:
        'Filme de 1998 (Meet Joe Black); en el sitio, inspección en Artes con origen en la obra de Alberto Casella (1924).',
      group: 'lexico',
      fromTitle: false,
      href: href
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado');
  }

  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);

  try {
    const { publishStaticAssets } = require('../lib/publish-static.js');
    publishStaticAssets(ROOT);
    console.log('Listagens actualizadas');
  } catch (e) {
    console.warn('Aviso listagens', e.message);
  }

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
