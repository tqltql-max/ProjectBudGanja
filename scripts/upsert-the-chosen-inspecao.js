'use strict';

/**
 * Injeta / actualiza The Chosen (Os Escolhidos) na série Artes · televisão.
 * Uso: node scripts/upsert-the-chosen-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildTheChosenPost, YT, WIKI, WIKI_EN, WATCH } = require('../lib/the-chosen-inspecao-post.js');
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
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-the-chosen-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 40000
    });
  } catch (e) {
    console.warn('Aviso capa', e.message);
  }

  const post = buildTheChosenPost();
  const paixao = buildPaixaoDeCristoPost();
  const list = [post, paixao];
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const paixaoHref = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertEntry(items, 'id', {
      id: 'arte-serie-the-chosen',
      title: 'The Chosen — a série sobre Jesus, os escolhidos e onde assistir',
      titleEn: 'The Chosen — the Jesus series, the called, and where to watch',
      titleEs: 'The Chosen — la serie sobre Jesús, los elegidos y dónde verla',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes · série: The Chosen / Os Escolhidos (2019–, Jenkins) — Evangelhos primeiro; app oficial como via legal; distinta de A Paixão de Cristo.',
      whyEn: 'Arts · series: The Chosen (2019–, Jenkins) — Gospels first; official app as legal path; distinct from The Passion of the Christ.',
      whyEs: 'Artes · serie: The Chosen (2019–, Jenkins) — Evangelios primero; app oficial como vía legal; distinta de A Paixão de Cristo.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [WIKI, WIKI_EN, YT, WATCH, paixaoHref, '/posts/post-inspecao-expressao-filho-de-deus.html'],
      notes: 'Separado de A Paixão de Cristo. Dramatização ≠ catecismo. Sem pirataria.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-serie-the-chosen)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertEntry(items, 'id', {
      id: 'the-chosen',
      word: 'The Chosen',
      simple:
        'Série de 2019– sobre o ministério de Jesus (Os Escolhidos); no site, inspeção em Artes — Dallas Jenkins; Evangelhos primeiro. Onde assistir: app e site oficiais. Ficha própria, distinta de A Paixão de Cristo.',
      simpleEn:
        '2019– series on Jesus’s ministry (The Chosen); on the site, an Arts inspection — Dallas Jenkins; Gospels first. Watch: official app and site. Own sheet, distinct from The Passion of the Christ.',
      simpleEs:
        'Serie de 2019– sobre el ministerio de Jesús (Os Escolhidos); en el sitio, inspección en Artes — Dallas Jenkins. Dónde ver: app y web oficiales. Ficha propia, distinta de A Paixão de Cristo.',
      group: 'lexico',
      fromTitle: false,
      href
    });
    upsertEntry(items, 'id', {
      id: 'os-escolhidos',
      word: 'Os Escolhidos',
      simple:
        'Título BR/PT de The Chosen; no site, a mesma inspeção em Artes — série sobre Jesus; app oficial para assistir. Distinta de A Paixão de Cristo.',
      simpleEn:
        'BR/PT title of The Chosen; same Arts inspection on the site — Jesus series; official app to watch. Distinct from The Passion of the Christ.',
      simpleEs:
        'Título BR/PT de The Chosen; la misma inspección en Artes — serie sobre Jesús; app oficial para ver. Distinta de A Paixão de Cristo.',
      group: 'lexico',
      fromTitle: false,
      href
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (the-chosen)');
  }

  list.forEach(writeHtml);

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
