'use strict';

/**
 * Injeta expressão «a orelha cola o que a boca juntou».
 * Uso: node scripts/upsert-expressao-orelha-cola-boca-juntou.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildOrelhaColaPost } = require('../lib/orelha-cola-boca-juntou-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';

function nextOrder(posts, series) {
  const orders = posts
    .filter((p) => p.series === series)
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

function upsertPost(posts, post) {
  stampFiles(post);
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

function patchGlossary(gloss) {
  const entryLine =
    '    "a orelha cola o que a boca juntou": { tone: "craft", category: "Ofício", mundane: "O ouvido pega o par que a boca entregou no mesmo sopro.", gloss: "Ofício do lab — cola de frase, não de étimo; corte: duas frases; Valeu !!!", href: "/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html", en: "the ear glues what the mouth joined", es: "el oído pega lo que la boca juntó" },';

  if (/"a orelha cola o que a boca juntou":\s*\{/.test(gloss)) {
    return gloss.replace(/    "a orelha cola o que a boca juntou":\s*\{[\s\S]*?\},/, entryLine);
  }
  const reOrelha = /(    orelha:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
  if (reOrelha.test(gloss)) {
    return gloss.replace(reOrelha, '$1' + entryLine + '\n');
  }
  console.warn('Aviso: glossário — ponto de inserção não encontrado');
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-orelha-cola-boca-juntou-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou');
  const order = existing
    ? Number(existing.seriesOrder) || nextOrder(posts, 'expressoes-ditados')
    : nextOrder(posts, 'expressoes-ditados');
  const post = stampFiles(buildOrelhaColaPost(order));
  upsertPost(posts, post);
  writeHtml(post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-a-orelha-cola-o-que-a-boca-juntou';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'A orelha cola o que a boca juntou',
      titleEn: 'The ear glues what the mouth joined',
      titleEs: 'El oído pega lo que la boca juntó',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: a orelha cola o que a boca juntou — ofício do lab; dois eixos, duas frases; Valeu !!!',
      whyEn: 'Sayings: the ear glues what the mouth joined — lab craft; two axes, two sentences; Valeu !!!',
      whyEs: 'Dichos: el oído pega lo que la boca juntó — oficio del lab; dos ejes, dos frases; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'expressoes-ditados',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/boca',
        'https://pt.wiktionary.org/wiki/cola',
        '/posts/post-inspecao-palavra-cola-colar.html',
        '/posts/post-inspecao-palavra-escravidao.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' Expressões — cola de frase; corte: duas frases.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-a-orelha-cola-o-que-a-boca-juntou)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'a-orelha-cola-o-que-a-boca-juntou',
      word: 'a orelha cola o que a boca juntou',
      simple:
        'Ofício do lab — a boca junta dois objectos num sopro; a orelha cola; corte: duas frases. Valeu !!!',
      simpleEn:
        'Lab craft — the mouth joins two objects in one breath; the ear glues; cut: two sentences. Valeu !!!',
      simpleEs:
        'Oficio del lab — la boca junta dos objetos en un soplo; el oído pega; corte: dos frases. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'orelha' || x.id === 'cola');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (a orelha cola o que a boca juntou)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(glossPath, next);
      console.log('Glossário actualizado (a orelha cola o que a boca juntou)');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
