'use strict';

/**
 * Injeta a revista Horizonte Geográfico (Artes) e actualiza o corte em Amyr.
 * Uso: node scripts/upsert-arte-horizonte-geografico.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildHorizonteGeograficoPost } = require('../lib/horizonte-geografico-inspecao-post.js');
const { buildAmyrKlinkInspecaoPost } = require('../lib/klink-legado-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-arte-horizonte-geografico.html';

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
    '    "horizonte geográfico": { tone: "craft", category: "Revista", mundane: "Revista BR de geografia e sustentabilidade (1987–2016); Amyr no conselho.", gloss: "Orizonte = o H; revolução × guerra entre plantas; ≠ NG ≠ Mancuso; Valeu !!!", href: "' +
    HREF +
    '", en: "Horizonte Geográfico magazine", es: "revista Horizonte Geográfico" },\n';
  const aliases =
    '    "orizonte geografico": { gloss: "Lapso de campo — a boca come o H; ver horizonte geográfico.", href: "' +
    HREF +
    '", en: "slip for Horizonte Geográfico", es: "lapsus de Horizonte Geográfico" },\n' +
    '    "orizonte geográfico": { gloss: "Mesma revista — grafia canónica Horizonte Geográfico.", href: "' +
    HREF +
    '", en: "Horizonte Geográfico (oral H)", es: "Horizonte Geográfico (H oral)" },\n' +
    '    "revista horizonte geografico": { gloss: "Forma completa — ver horizonte geográfico.", href: "' +
    HREF +
    '", en: "Horizonte Geográfico magazine", es: "revista Horizonte Geográfico" },\n' +
    '    "revolução das plantas": { gloss: "Nesta ficha: o verde chegou primeiro; ≠ livro Mancuso como âncora ≠ Revolução Verde; ver horizonte geográfico.", href: "' +
    HREF +
    '", en: "revolution of plants (this sheet)", es: "revolución de las plantas (esta ficha)" },\n' +
    '    "guerra entre plantas": { gloss: "Disputa de luz, água e solo; ≠ guerra humana ≠ herbicida; ver horizonte geográfico.", href: "' +
    HREF +
    '", en: "war among plants (competition)", es: "guerra entre plantas (competencia)" },\n' +
    '    horizonte: { tone: "caution", category: "Linha / revista", mundane: "Linha do olhar; também o título da revista HG.", gloss: "Léxico da travessia em mar; revista em horizonte geográfico; não fundir as salas; Valeu !!!", href: "' +
    HREF +
    '", en: "horizon / the magazine", es: "horizonte / la revista" },\n';

  if (gloss.includes('"horizonte geográfico":')) {
    return gloss;
  }
  const inserted = insertAfterKey(gloss, 'mar', mainLine + aliases);
  if (inserted) return inserted;
  console.warn('Aviso: glossário — inserção após mar falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'arte-horizonte-geografico';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Horizonte Geográfico — o mapa, a planta, o conselho de Amyr',
    titleEn: 'Horizonte Geográfico — the map, the plant, Amyr’s board',
    titleEs: 'Horizonte Geográfico — el mapa, la planta, el consejo de Amyr',
    tipo: 'arte',
    priority: 2,
    status: 'feita',
    why: 'Revista HG (1987–2016): Amyr no conselho; revolução e guerra entre plantas; Orizonte = o H; Valeu !!!',
    whyEn: 'HG magazine (1987–2016): Amyr on the board; plant revolution and plant war; Valeu !!!',
    whyEs: 'Revista HG (1987–2016): Amyr en el consejo; revolución y guerra entre plantas; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'artes-cultura',
    sources: [
      post.sourceUrl,
      'https://edhorizonte.com.br/quem-somos/',
      'https://pt.wikipedia.org/wiki/Amyr_Klink',
      '/posts/post-inspecao-amyr-klink.html',
      '/posts/post-inspecao-palavra-daninha.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — revista âncora; Mancuso e NG são cortes.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'horizonte-geografico',
    word: 'Horizonte Geográfico',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Revista BR 1987–2016; Amyr no conselho; revolução × guerra entre plantas; Orizonte = o H; ≠ NG ≠ Mancuso; Valeu !!!',
    simpleEn:
      'BR magazine 1987–2016; Amyr on the board; plant revolution × plant war; ≠ NG ≠ Mancuso; Valeu !!!',
    simpleEs:
      'Revista BR 1987–2016; Amyr en el consejo; revolución × guerra entre plantas; ≠ NG ≠ Mancuso; ¡Valeu !!!'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'mar' || x.word === 'mar');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-horizonte-geografico-cover.js')], {
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

  const magazine = stampFiles(buildHorizonteGeograficoPost());
  const amyr = stampFiles(buildAmyrKlinkInspecaoPost());
  const list = [magazine, amyr];

  list.forEach((p) => {
    upsertPost(posts, p);
    writeHtml(p);
    writeI18n(i18n, p);
  });
  upsertSug(sug, magazine);
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
    console.log('Glossário actualizado (horizonte geográfico)');
  }

  try {
    await syncSql(list);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', magazine.title, '· Cap.', magazine.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
