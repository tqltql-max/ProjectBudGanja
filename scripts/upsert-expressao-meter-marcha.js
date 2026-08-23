'use strict';

/**
 * Injeta a expressão «meter marcha».
 * Uso: node scripts/upsert-expressao-meter-marcha.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildMeterMarchaPost } = require('../lib/meter-marcha-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-meter-marcha.html';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, payload, 'utf8');
      return;
    } catch (e) {
      last = e;
      await sleep(250 * (i + 1));
    }
  }
  throw last;
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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss) {
  const mainLine =
    '    "meter marcha": { tone: "craft", category: "Arranque", mundane: "Engatar a caixa do carro; por extensão, pôr o ofício a andar.", gloss: "Meter + marcha — sair do ponto morto; ≠ carnaval ≠ ré ≠ flerte-manual ≠ Senna; Valeu !!!", href: "' +
    HREF +
    '", en: "put it in gear / get going", es: "meter la marcha / ponerse en marcha" },\n';
  const aliases =
    '    "meter a marcha": { gloss: "Variante com artigo — ver meter marcha.", href: "' +
    HREF +
    '", en: "put it in gear", es: "meter la marcha" },\n' +
    '    "mete marcha": { gloss: "Imperativo oral — ver meter marcha.", href: "' +
    HREF +
    '", en: "get in gear (oral)", es: "mete marcha" },\n' +
    '    "bora meter marcha": { gloss: "Convite de ofício — sair do idle; ver meter marcha.", href: "' +
    HREF +
    '", en: "let’s get going", es: "vamos a ponernos en marcha" },\n' +
    '    "engatar a marcha": { gloss: "Variante técnica da caixa — mesma sala que meter marcha.", href: "' +
    HREF +
    '", en: "engage the gear", es: "engranar la marcha" },\n' +
    '    marcha: { tone: "caution", category: "Passo / caixa", mundane: "Passo em ordem; no BR também dente da caixa de velocidades.", gloss: "Nesta ficha: peça de meter marcha; ≠ desfile como âncora ≠ Senna; Valeu !!!", href: "' +
    HREF +
    '", en: "gear / march", es: "marcha / cambio" },\n';

  if (gloss.includes('"meter marcha":')) {
    return gloss;
  }
  const inserted = insertAfterKey(gloss, 'mindinho', mainLine + aliases);
  if (inserted) return inserted;
  console.warn('Aviso: glossário — inserção após mindinho falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'expressao-meter-marcha';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Meter marcha — engatar o ofício',
    titleEn: 'Meter marcha — put the craft in gear',
    titleEs: 'Meter marcha — meter el oficio en marcha',
    tipo: 'expressao',
    priority: 2,
    status: 'feita',
    why: 'Expressões: meter marcha — sair do ponto morto; ≠ carnaval ≠ ré ≠ flerte-manual; Valeu !!!',
    whyEn: 'Sayings: meter marcha — leave idle; ≠ carnival ≠ reverse ≠ pickup guide; Valeu !!!',
    whyEs: 'Dichos: meter marcha — salir del punto muerto; ≠ carnaval ≠ marcha atrás; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'expressoes-ditados',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/meter',
      '/posts/post-inspecao-palavra-gesto.html',
      '/posts/post-inspecao-palavra-caminho.html',
      '/posts/post-inspecao-palavra-respeito.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — caixa × ofício; flerte só como corte.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'meter-marcha',
    word: 'meter marcha',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Locução BR — engatar a caixa / sair do ponto morto do dia; ≠ carnaval ≠ ré ≠ flerte-manual; Valeu !!!',
    simpleEn:
      'BR saying — put it in gear / leave idle; ≠ carnival ≠ reverse ≠ pickup guide; Valeu !!!',
    simpleEs:
      'Dicho BR — meter la marcha / salir del punto muerto; ≠ carnaval ≠ marcha atrás; ¡Valeu !!!'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'mindinho');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-meter-marcha-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildMeterMarchaPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia);
  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (meter marcha)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
