'use strict';

/**
 * Injeta Coração Valente e A Paixão de Cristo como fichas Artes SEPARADAS.
 * Uso: node scripts/upsert-coracao-valente-paixao-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildCoracaoValentePost } = require('../lib/coracao-valente-inspecao-post.js');
const { buildPaixaoDeCristoPost } = require('../lib/paixao-de-cristo-inspecao-post.js');
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

function writeHtml(post) {
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

async function main() {
  [
    'generate-coracao-valente-cover.js',
    'generate-paixao-de-cristo-cover.js'
  ].forEach((script) => {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 40000
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  });

  const valente = buildCoracaoValentePost();
  const paixao = buildPaixaoDeCristoPost();
  const list = [valente, paixao];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const valenteHref = '/posts/post-' + valente.slug + '.html';
  const paixaoHref = '/posts/post-' + paixao.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertEntry(items, 'id', {
      id: 'arte-filme-coracao-valente',
      title: 'Coração Valente — a lenda de Wallace e o filme de 1995',
      titleEn: 'Braveheart — the Wallace legend and the 1995 film',
      titleEs: 'Braveheart — la leyenda de Wallace y el filme de 1995',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes: Coração Valente (1995) — lenda/Blind Harry primeiro; épico ≠ crónica. Ficha própria.',
      whyEn: 'Arts: Braveheart (1995) — legend first; epic ≠ chronicle. Own sheet.',
      whyEs: 'Artes: Coração Valente (1995) — leyenda primero; épica ≠ crónica. Ficha propia.',
      suggestedSlug: valente.slug,
      doneHref: valenteHref,
      seriesHint: 'artes-cultura',
      sources: [valente.sourceUrl, paixaoHref, 'https://www.youtube.com/watch?v=nMft5QDOHek'],
      notes: 'Separado de A Paixão de Cristo. Ficção histórica ≠ manual.'
    });
    upsertEntry(items, 'id', {
      id: 'arte-filme-a-paixao-de-cristo',
      title: 'A Paixão de Cristo — os Evangelhos e o filme de 2004',
      titleEn: 'The Passion of the Christ — the Gospels and the 2004 film',
      titleEs: 'La Pasión de Cristo — los Evangelios y el filme de 2004',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes: A Paixão de Cristo (2004) — Evangelhos primeiro; adaptação ≠ catecismo. Ficha própria.',
      whyEn: 'Arts: The Passion of the Christ (2004) — Gospels first; adaptation ≠ catechism. Own sheet.',
      whyEs: 'Artes: A Paixão de Cristo (2004) — Evangelios primero; adaptación ≠ catecismo. Ficha propia.',
      suggestedSlug: paixao.slug,
      doneHref: paixaoHref,
      seriesHint: 'artes-cultura',
      sources: [paixao.sourceUrl, valenteHref, 'https://www.youtube.com/watch?v=4Aif1qEB_JU'],
      notes: 'Separado de Coração Valente. Sem proselitismo. Controvérsia = recepção.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (duas fichas separadas)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertEntry(items, 'id', {
      id: 'coracao-valente',
      word: 'Coração Valente',
      simple:
        'Filme de 1995 (Braveheart); no site, inspeção em Artes com génese na lenda de Wallace / Blind Harry. Ficha própria, distinta de A Paixão de Cristo.',
      simpleEn:
        '1995 film (Braveheart); on the site, an Arts inspection rooted in the Wallace / Blind Harry legend. Own sheet, distinct from The Passion of the Christ.',
      simpleEs:
        'Filme de 1995 (Braveheart); en el sitio, inspección en Artes con origen en la leyenda de Wallace. Ficha propia, distinta de A Paixão de Cristo.',
      group: 'lexico',
      fromTitle: false,
      href: valenteHref
    });
    upsertEntry(items, 'id', {
      id: 'a-paixao-de-cristo',
      word: 'A Paixão de Cristo',
      simple:
        'Filme de 2004; no site, inspeção em Artes com génese nos Evangelhos. Ficha própria, distinta de Coração Valente.',
      simpleEn:
        '2004 film; on the site, an Arts inspection rooted in the Gospels. Own sheet, distinct from Braveheart.',
      simpleEs:
        'Filme de 2004; en el sitio, inspección en Artes con origen en los Evangelios. Ficha propia, distinta de Braveheart.',
      group: 'lexico',
      fromTitle: false,
      href: paixaoHref
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado');
  }

  list.forEach(writeHtml);

  try {
    const { publishStaticAssets } = require('../lib/publish-static.js');
    publishStaticAssets(ROOT);
    console.log('Listagens actualizadas');
  } catch (e) {
    console.warn('Aviso listagens', e.message);
  }

  list.forEach((p) => console.log('OK:', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
