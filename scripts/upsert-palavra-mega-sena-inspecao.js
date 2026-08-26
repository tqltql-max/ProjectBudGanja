'use strict';

/**
 * Injeta Mega-Sena (nome + patrocínios; corte Senna) e 14 / catorze.
 * Actualiza também o HTML de Ayrton Senna (corte de orelha).
 * Uso: node scripts/upsert-palavra-mega-sena-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildMegaSenaPost } = require('../lib/mega-sena-inspecao-post.js');
const { buildCatorzePost } = require('../lib/catorze-inspecao-post.js');
const { buildZeroPost } = require('../lib/zero-inspecao-post.js');
const { buildAyrtonSennaPost } = require('../lib/ayrton-senna-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-mega-sena.html';
const HREF14 = '/posts/post-inspecao-palavra-catorze.html';
const HREF0 = '/posts/post-inspecao-palavra-zero.html';
const HREF_SENNA = '/posts/post-inspecao-figura-ayrton-senna.html';

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
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder || '');
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder || '');
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
  const megaLine =
    '    "mega-sena": { tone: "caution", category: "Nome", mundane: "Loteria da Caixa — 6 dezenas em 60.", gloss: "mega + sena (lat. sēnī = seis); ≠ Senna (Ayrton, dois n); patrocínios ≠ sorte; Valeu !!!", href: "' +
    HREF +
    '", en: "Mega-Sena (BR lottery name)", es: "Mega-Sena (lotería BR)" },\n';
  const aliases =
    '    megasena: { gloss: "Grafia colada — ver Mega-Sena; ≠ Senna.", href: "' +
    HREF +
    '", en: "Mega-Sena (glued)", es: "Mega-Sena (pegado)" },\n' +
    '    "mega sena": { gloss: "Forma partida — ver Mega-Sena.", href: "' +
    HREF +
    '", en: "Mega-Sena (split)", es: "Mega-Sena (partida)" },\n' +
    '    sena: { tone: "caution", category: "Seis", mundane: "Grupo de seis / prémio da loteria.", gloss: "Lat. sēnī — um n; ≠ Senna (Ayrton) ≠ senha ≠ cena; ver Mega-Sena.", href: "' +
    HREF +
    '", en: "sena (set of six)", es: "sena (seis)" },\n' +
    '    senna: { tone: "caution", category: "Apelido", mundane: "Apelido de Ayrton Senna da Silva (dois n).", gloss: "≠ sena da Mega-Sena (um n, o seis); ver ficha Ayrton Senna.", href: "' +
    HREF_SENNA +
    '", en: "Senna (surname)", es: "Senna (apellido)" },\n' +
    '    patrocinio: { gloss: "Sem acento — destinação × logo; nesta sala: Mega-Sena. Família patrão.", href: "' +
    HREF +
    '", en: "sponsorship", es: "patrocinio" },\n' +
    '    "patrocínio": { tone: "caution", category: "Apoio", mundane: "Dinheiro / logo que apoia; lat. patronus.", gloss: "Na Mega-Sena: destinação legal × marca ≠ sorte; ver Mega-Sena e patrão.", href: "' +
    HREF +
    '", en: "sponsorship", es: "patrocinio" },\n' +
    '    "patrocínios": { gloss: "Plural — ver patrocínio / Mega-Sena.", href: "' +
    HREF +
    '", en: "sponsorships", es: "patrocinios" },\n' +
    '    catorze: { tone: "craft", category: "Número", mundane: "Cardinal 14.", gloss: "Lat. quattuordecim — 2×7; composto; ≠ Fibonacci ≠ primo; na Mega-Sena é só dezena; Valeu !!!", href: "' +
    HREF14 +
    '", en: "fourteen", es: "catorce" },\n' +
    '    quatorze: { gloss: "Variante de catorze — o mesmo 14.", href: "' +
    HREF14 +
    '", en: "fourteen (variant spelling)", es: "catorce" },\n' +
    '    "14": { gloss: "Algarismo — ver catorze.", href: "' +
    HREF14 +
    '", en: "14", es: "14" },\n' +
    '    zero: { tone: "craft", category: "Número", mundane: "Cardinal nulo — nenhum.", gloss: "Ár. ṣifr → zero; a+0=a; ×0 apaga; ≠ dezena da Mega-Sena; ≠ letra O; Valeu !!!", href: "' +
    HREF0 +
    '", en: "zero", es: "cero" },\n' +
    '    "0": { gloss: "Algarismo — ver zero. Não é dezena da Mega-Sena.", href: "' +
    HREF0 +
    '", en: "0", es: "0" },\n';

  if (gloss.includes('"mega-sena":')) {
    return gloss;
  }
  const inserted = insertAfterKey(gloss, 'três', megaLine + aliases);
  if (inserted) return inserted;
  console.warn('Aviso: glossário — inserção após três falhou');
  return gloss;
}

function upsertSug(sug, mega, catorze, zero) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const entries = [
    {
      id: 'palavra-mega-sena',
      title: 'Mega-Sena — o nome (mega + sena) e os patrocínios',
      titleEn: 'Mega-Sena — the name and sponsorships',
      titleEs: 'Mega-Sena — el nombre y los patrocinios',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: nome mega + sena (seis); ≠ Senna (Ayrton); patrocínios ≠ sorte; Valeu !!!',
      whyEn: 'Words: mega + sena (six); ≠ Ayrton Senna; sponsorships ≠ luck; Valeu !!!',
      whyEs: 'Palabras: mega + sena (seis); ≠ Ayrton Senna; patrocinios ≠ suerte; ¡Valeu !!!',
      suggestedSlug: mega.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [mega.sourceUrl, HREF_SENNA, HREF14, '/posts/post-inspecao-palavra-patrao.html'],
      notes: 'Cap. ' + mega.seriesOrder + ' — um n = seis; dois n = o piloto.'
    },
    {
      id: 'palavra-catorze',
      title: '14 — catorze, dois setes',
      titleEn: '14 — catorze, two sevens',
      titleEs: '14 — catorze, dos sietes',
      tipo: 'palavra',
      priority: 3,
      status: 'feita',
      why: 'Palavras: 14 / catorze — 2×7; ≠ Fibonacci; na Mega-Sena é só dezena.',
      whyEn: 'Words: 14 — 2×7; not Fibonacci; in Mega-Sena just a number.',
      whyEs: 'Palabras: 14 — 2×7; no Fibonacci; en la Mega-Sena solo una decena.',
      suggestedSlug: catorze.slug,
      doneHref: HREF14,
      seriesHint: 'palavras-origem',
      sources: [catorze.sourceUrl, HREF],
      notes: 'Cap. ' + catorze.seriesOrder + ' — pedido 14; elo Mega-Sena.'
    },
    {
      id: 'palavra-zero',
      title: '0 — zero, o nulo que conta',
      titleEn: '0 — zero, the null that still counts',
      titleEs: '0 — zero, el nulo que cuenta',
      tipo: 'palavra',
      priority: 3,
      status: 'feita',
      why: 'Palavras: 0 / zero — identidade da soma; ≠ dezena da Mega-Sena; ≠ letra O.',
      whyEn: 'Words: 0 / zero — additive identity; not a Mega-Sena dezena; ≠ letter O.',
      whyEs: 'Palabras: 0 / zero — identidad de la suma; no es decena de la Mega-Sena; ≠ letra O.',
      suggestedSlug: zero.slug,
      doneHref: HREF0,
      seriesHint: 'palavras-origem',
      sources: [zero.sourceUrl, HREF, HREF14],
      notes: 'Cap. ' + zero.seriesOrder + ' — pedido 0; não joga na Mega.'
    }
  ];
  for (const entry of entries) {
    const si = items.findIndex((x) => x.id === entry.id);
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
  }
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entries = [
    {
      id: 'mega-sena',
      word: 'Mega-Sena',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Nome: mega + sena (lat. sēnī = seis). ≠ Senna (Ayrton, dois n). Patrocínios = destinação × logo ≠ sorte. Valeu !!!',
      simpleEn:
        'Name: mega + sena (Lat. sēnī = six). ≠ Ayrton Senna (two n). Sponsorships ≠ luck. Valeu !!!',
      simpleEs:
        'Nombre: mega + sena (lat. sēnī = seis). ≠ Ayrton Senna (dos n). Patrocinios ≠ suerte. ¡Valeu !!!'
    },
    {
      id: 'catorze',
      word: 'catorze',
      group: 'lexico',
      fromTitle: false,
      href: HREF14,
      simple: '14 — 2×7; composto; ≠ Fibonacci; na Mega-Sena é só dezena. Valeu !!!',
      simpleEn: '14 — 2×7; composite; not Fibonacci; in Mega-Sena just a number. Valeu !!!',
      simpleEs: '14 — 2×7; compuesto; no Fibonacci; en la Mega-Sena solo una decena. ¡Valeu !!!'
    },
    {
      id: 'zero',
      word: 'zero',
      group: 'lexico',
      fromTitle: false,
      href: HREF0,
      simple: '0 — nulo que conta; a+0=a; ×0 apaga; ≠ dezena da Mega-Sena; ≠ letra O. Valeu !!!',
      simpleEn: '0 — the null that counts; not a Mega-Sena dezena; ≠ letter O. Valeu !!!',
      simpleEs: '0 — el nulo que cuenta; no es decena de la Mega-Sena; ≠ letra O. ¡Valeu !!!'
    }
  ];
  for (const entry of entries) {
    const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'três' || x.word === 'três');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-mega-sena-catorze-covers.js')], {
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

  const mega = stampFiles(buildMegaSenaPost());
  const catorze = stampFiles(buildCatorzePost());
  const zero = stampFiles(buildZeroPost());
  const senna = stampFiles(buildAyrtonSennaPost());

  upsertPost(posts, mega);
  writeHtml(mega);
  writeI18n(i18n, mega);

  upsertPost(posts, catorze);
  writeHtml(catorze);
  writeI18n(i18n, catorze);

  upsertPost(posts, zero);
  writeHtml(zero);
  writeI18n(i18n, zero);

  upsertPost(posts, senna);
  writeHtml(senna);
  writeI18n(i18n, senna);

  upsertSug(sug, mega, catorze, zero);
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
    console.log('Glossário actualizado (Mega-Sena / 14 / Senna)');
  }

  for (const post of [mega, catorze, zero, senna]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', post.slug, e.message);
    }
  }

  console.log('OK:', mega.title, '· Cap.', mega.seriesOrder);
  console.log('OK:', catorze.title, '· Cap.', catorze.seriesOrder);
  console.log('OK:', zero.title, '· Cap.', zero.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
