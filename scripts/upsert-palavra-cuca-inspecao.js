'use strict';

/**
 * Injeta palavra «cuca» (história infantil) na série Palavras.
 * Uso: node scripts/upsert-palavra-cuca-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildCucaPost } = require('../lib/cuca-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  const max = orders.length ? Math.max(...orders) : 0;
  return max + 1;
}

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
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
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-cuca-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-cuca');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildCucaPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const entry = {
      id: 'palavra-cuca',
      title: 'Cuca — história infantil, cantiga e o bicho do Sítio',
      titleEn: 'Cuca — children’s tale, lullaby and the Sítio bogey',
      titleEs: 'Cuca — historia infantil, nana y el bicho del Sítio',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: Cuca — folclore + Sítio; cantiga de ninar; cucuca diminutivo; medo com respeito.',
      whyEn: 'Words: Cuca — folklore + Sítio; lullaby; diminutive cucuca; fear with respect.',
      whyEs: 'Palabras: Cuca — folclore + Sítio; nana; diminutivo cucuca; miedo con respeto.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Cuca_(folclore)',
        '/posts/post-inspecao-palavra-medo.html',
        '/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — conto ≠ canal; cucuca = diminutivo da Cuca.'
    };
    const si = items.findIndex((x) => x.id === entry.id);
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-cuca)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'cuca',
      word: 'cuca',
      simple:
        'História infantil BR — cantiga de ninar e Cuca do Sítio; diminutivo cucuca; medo com respeito.',
      simpleEn:
        'Brazilian children’s lore — lullaby and Sítio’s Cuca; diminutive cucuca; fear with respect.',
      simpleEs:
        'Historia infantil BR — nana y Cuca del Sítio; diminutivo cucuca; miedo con respeto.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'cuca');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'medo' || x.id === 'pato' || x.id === 'animal');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (cuca)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    cuca: { gloss: "História infantil BR — cantiga e Cuca do Sítio; diminutivo cucuca; medo com respeito.", href: "/posts/post-inspecao-palavra-cuca.html", en: "Cuca (bogey)", es: "Cuca", fr: "Cuca", it: "Cuca", de: "Cuca", el: "Cuca", la: "Cuca", yo: "Cuca", sw: "Cuca", gez: "Cuca", nl: "Cuca", pl: "Cuca", ru: "Cuca", uk: "Cuca", zh: "Cuca", ja: "Cuca", ko: "Cuca", ar: "Cuca", he: "Cuca", hi: "Cuca", tr: "Cuca", sv: "Cuca", da: "Cuca", no: "Cuca", fi: "Cuca", cs: "Cuca", ro: "Cuca", hu: "Cuca", ca: "Cuca", gl: "Cuca", eu: "Cuca", gn: "Cuca", qu: "Cuca", eo: "Cuca", vi: "Cuca", id: "Cuca", th: "Cuca", hr: "Cuca", sk: "Cuca", ga: "Cuca", cy: "Cuca", ha: "Cuca", am: "Cuca", fa: "Cuca", bn: "Cuca", zu: "Cuca" },';
    if (/    cuca:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    cuca:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (cuca · existente)');
    } else if (/    medo:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(    medo:\s*\{[\s\S]*?\},)/, '$1\n' + entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (cuca · após medo)');
    } else {
      console.warn('Aviso: glossário — ponto de inserção não encontrado');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
