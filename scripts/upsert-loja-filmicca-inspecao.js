'use strict';

/**
 * Injeta inspeção da FILMICCA (loja / streaming).
 * Uso: node scripts/upsert-loja-filmicca-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildFilmiccaPost } = require('../lib/filmicca-loja-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const HREF = '/posts/post-inspecao-loja-filmicca.html';
const SITE = 'https://www.filmicca.com.br/';

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const afterPrincipia = posts.findIndex((p) => p.slug === 'inspecao-loja-principia');
  if (afterPrincipia >= 0) {
    posts.splice(afterPrincipia + 1, 0, post);
    console.log('Inserido', post.slug, 'após Principia');
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug);
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-filmicca-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildFilmiccaPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'loja-filmicca';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'FILMICCA — streaming com curadoria, site e catálogo declarado',
      titleEn: 'FILMICCA — curated streaming, the site, and the declared catalogue',
      titleEs: 'FILMICCA — streaming con curaduría, el sitio y el catálogo declarado',
      tipo: 'loja',
      priority: 2,
      status: 'feita',
      why: 'Lojas · streaming: filmicca.com.br — plataforma BR (ex-Supo Mungam, 2021); curadoria humana é claim; catálogo/preços datados; só Brasil; sem endosso.',
      whyEn: 'Shops · streaming: filmicca.com.br — BR platform (ex-Supo Mungam, 2021); human curation is a claim; dated catalogue/prices; Brazil only; no endorsement.',
      whyEs: 'Tiendas · streaming: filmicca.com.br — plataforma BR (ex-Supo Mungam, 2021); la curaduría humana es claim; catálogo/precios fechados; solo Brasil; sin endoso.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'loja-streaming',
      sources: [
        SITE,
        'https://www.filmicca.com.br/sobre',
        'https://www.filmicca.com.br/ajuda/o-que-e-a-filmicca',
        'https://www.filmicca.com.br/termos-de-uso',
        'https://loja.filmicca.com.br/pages/sobre',
        'https://pt.wikipedia.org/wiki/Filmicca',
        '/posts/post-inspecao-palavra-pipoca.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Site ≠ filme. Indexar ≠ endosso. FAQ ~400 vs imprensa ~630: datar.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (loja-filmicca)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!/filmicca:\s*\{/.test(gloss)) {
      const entry =
        '    filmicca: { gloss: "Streaming BR com curadoria (ex-Supo Mungam, 2021) — cinema autoral/cult; só Brasil; catálogo e preços datados; indexar ≠ endosso.", href: "/posts/post-inspecao-loja-filmicca.html", en: "FILMICCA (BR curated streaming)", es: "FILMICCA (streaming BR con curaduría)" },\n';
      const rePipoca = /(    pipoca:\s*\{[\s\S]*?\},?\r?\n)/;
      if (rePipoca.test(gloss)) {
        gloss = gloss.replace(rePipoca, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (filmicca)');
      } else {
        console.warn('Aviso: glossário — ponto pipoca não encontrado para FILMICCA');
      }
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '|', HREF);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
