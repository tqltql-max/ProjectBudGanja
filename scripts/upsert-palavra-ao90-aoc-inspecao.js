'use strict';

/**
 * Injeta AO90 (acordo / ano) e AOC (monitor).
 * Uso: node scripts/upsert-palavra-ao90-aoc-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildAo90Post } = require('../lib/ao90-inspecao-post.js');
const { buildAocPost } = require('../lib/aoc-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF_AO90 = '/posts/post-inspecao-palavra-ao90.html';
const HREF_AOC = '/posts/post-inspecao-palavra-aoc.html';

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
  if (gloss.includes('href: "' + HREF_AO90 + '"')) return gloss;
  const block =
    '    ao90: { tone: "craft", category: "Sigla", mundane: "Acordo Ortográfico de 1990 — grafia, não étimo.", gloss: "AO = acordo; 90 = ano 1990; ≠ AOC ≠ 90 Hz; ação/objeto já BR; Valeu !!!", href: "' +
    HREF_AO90 +
    '", en: "AO90", es: "AO90", fr: "AO90", it: "AO90", de: "AO90", el: "AO90", la: "AO90", yo: "AO90", sw: "AO90", gez: "AO90", nl: "AO90", pl: "AO90", ru: "AO90", uk: "AO90", zh: "1990正字协议", ja: "AO90", ko: "AO90", ar: "AO90", he: "AO90", hi: "AO90", tr: "AO90", sv: "AO90", da: "AO90", no: "AO90", fi: "AO90", cs: "AO90", ro: "AO90", hu: "AO90", ca: "AO90", gl: "AO90", eu: "AO90", gn: "AO90", qu: "AO90", eo: "AO90", vi: "AO90", id: "AO90", th: "AO90", hr: "AO90", sk: "AO90", ga: "AO90", cy: "AO90", ha: "AO90", am: "AO90", fa: "AO90", bn: "AO90", zu: "i-AO90" },\n' +
    '    "ao-90": { gloss: "Grafia com hífen de AO90 — Acordo Ortográfico de 1990; ver ficha.", href: "' +
    HREF_AO90 +
    '", en: "AO-90", es: "AO-90" },\n' +
    '    "acordo ortografico": { gloss: "Expansão sem acento de AO90 — ver a sigla.", href: "' +
    HREF_AO90 +
    '", en: "1990 spelling agreement", es: "acuerdo ortográfico de 1990" },\n' +
    '    "acordo ortográfico": { gloss: "Expansão de AO90 — grafia ≠ étimo; 90 = 1990; ≠ AOC; Valeu !!!", href: "' +
    HREF_AO90 +
    '", en: "1990 Orthographic Agreement", es: "Acuerdo Ortográfico de 1990" },\n' +
    '    etimografia: { tone: "caution", category: "Cola", mundane: "Blend de campo: etimologia + ortografia.", gloss: "Não é termo técnico; AO90 muda a letra, não o étimo; ver ficha AO90.", href: "' +
    HREF_AO90 +
    '", en: "etymography (blend)", es: "etimografía (mezcla)" },\n' +
    '    aoc: { tone: "craft", category: "Sigla", mundane: "Admiral Overseas Corporation — marca de monitor.", gloss: "Sigla de fábrica; objeto electrónico na mesa; ≠ AO90 ≠ 90 Hz; Valeu !!!", href: "' +
    HREF_AOC +
    '", en: "AOC", es: "AOC", fr: "AOC", it: "AOC", de: "AOC", el: "AOC", la: "AOC", yo: "AOC", sw: "AOC", gez: "AOC", nl: "AOC", pl: "AOC", ru: "AOC", uk: "AOC", zh: "AOC显示器", ja: "AOC", ko: "AOC", ar: "AOC", he: "AOC", hi: "AOC", tr: "AOC", sv: "AOC", da: "AOC", no: "AOC", fi: "AOC", cs: "AOC", ro: "AOC", hu: "AOC", ca: "AOC", gl: "AOC", eu: "AOC", gn: "AOC", qu: "AOC", eo: "AOC", vi: "AOC", id: "AOC", th: "AOC", hr: "AOC", sk: "AOC", ga: "AOC", cy: "AOC", ha: "AOC", am: "AOC", fa: "AOC", bn: "AOC", zu: "i-AOC" },\n' +
    '    "90 hz": { gloss: "Hertz do ecrã — outra sala; o 90 do AO90 é o ano 1990; ver AO90 e AOC.", href: "' +
    HREF_AO90 +
    '", en: "90 Hz (not AO90)", es: "90 Hz (no es AO90)" },\n' +
    '    monitor: { gloss: "Ecrã — nesta cola, objeto electrónico da marca AOC; ≠ AO90; ver ficha AOC.", href: "' +
    HREF_AOC +
    '", en: "monitor", es: "monitor" },\n';

  const inserted = insertAfterKey(gloss, 'dsl', block);
  if (inserted) return inserted;
  console.warn('Aviso: glossário — inserção após dsl falhou');
  return gloss;
}

function upsertSug(sug, post, spec) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const si = items.findIndex((x) => x.id === spec.id);
  const entry = Object.assign(
    {
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      suggestedSlug: post.slug,
      doneHref: spec.href,
      seriesHint: 'palavras-origem',
      sources: spec.sources,
      notes: 'Cap. ' + post.seriesOrder + ' — ' + spec.notes
    },
    spec.fields
  );
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, entry, afterId) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === afterId);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-ao90-aoc-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const ao90 = stampFiles(buildAo90Post());
  upsertPost(posts, ao90);
  writeHtml(ao90);
  writeI18n(i18n, ao90);
  await writeJsonRetry(POSTS_FILE, posts);

  const aoc = stampFiles(buildAocPost());
  upsertPost(posts, aoc);
  writeHtml(aoc);
  writeI18n(i18n, aoc);

  upsertSug(sug, ao90, {
    id: 'palavra-ao90',
    href: HREF_AO90,
    notes: '90 = 1990; grafia ≠ étimo; corte AOC.',
    sources: [
      ao90.sourceUrl,
      'https://en.wikipedia.org/wiki/Portuguese_Language_Orthographic_Agreement_of_1990',
      HREF_AOC,
      '/posts/post-inspecao-palavra-objetos.html',
      '/posts/post-inspecao-palavra-acao.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    fields: {
      title: 'AO90 — o acordo, o ano e o que não é étimo',
      titleEn: 'AO90 — the agreement, the year, and what is not an etymon',
      titleEs: 'AO90 — el acuerdo, el año y lo que no es étimo',
      why: 'Palavras: AO90 = Acordo Ortográfico de 1990; 90 é o ano; grafia ≠ étimo; ≠ AOC; Valeu !!!',
      whyEn: 'Words: AO90 = 1990 Orthographic Agreement; 90 is the year; spelling ≠ etymon; ≠ AOC; Valeu !!!',
      whyEs: 'Palabras: AO90 = Acuerdo Ortográfico de 1990; 90 es el año; grafía ≠ étimo; ≠ AOC; ¡Valeu !!!'
    }
  });
  upsertSug(sug, aoc, {
    id: 'palavra-aoc',
    href: HREF_AOC,
    notes: 'Admiral Overseas Corporation; monitor ≠ AO90.',
    sources: [
      aoc.sourceUrl,
      HREF_AO90,
      '/posts/post-inspecao-palavra-objetos.html',
      '/posts/post-inspecao-palavra-eletrizante.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    fields: {
      title: 'AOC — a sigla do monitor, não do acordo',
      titleEn: 'AOC — the monitor acronym, not the agreement',
      titleEs: 'AOC — la sigla del monitor, no del acuerdo',
      why: 'Palavras: AOC = Admiral Overseas Corporation; monitor / objeto electrónico; ≠ AO90; Valeu !!!',
      whyEn: 'Words: AOC = Admiral Overseas Corporation; monitor / electronic object; ≠ AO90; Valeu !!!',
      whyEs: 'Palabras: AOC = Admiral Overseas Corporation; monitor / objeto electrónico; ≠ AO90; ¡Valeu !!!'
    }
  });

  upsertGuia(
    guia,
    {
      id: 'ao90',
      word: 'AO90',
      group: 'lexico',
      fromTitle: false,
      href: HREF_AO90,
      simple:
        'Sigla: Acordo Ortográfico de 1990. O 90 é o ano. Grafia ≠ étimo. ≠ AOC ≠ 90 Hz. Valeu !!!',
      simpleEn:
        'Acronym: 1990 Orthographic Agreement. 90 is the year. Spelling ≠ etymon. ≠ AOC ≠ 90 Hz. Valeu !!!',
      simpleEs:
        'Sigla: Acuerdo Ortográfico de 1990. El 90 es el año. Grafía ≠ étimo. ≠ AOC ≠ 90 Hz. ¡Valeu !!!',
      history:
        'AO90 nomeia o Acordo Ortográfico assinado em 1990. O Brasil já escrevia ação/objeto; o acordo alinha a letra (cai o c mudo). Não muda o étimo. A orelha cola em AOC (monitor).',
      curiosities:
        'Etimografia no campo = mistura de etimologia + ortografia. O acordo só toca a segunda. Fecho: Valeu !!!',
      historyEn:
        'AO90 names the 1990 spelling agreement. Brazil already wrote ação/objeto; the agreement aligns the letter (silent c drops). The etymon stays. The ear glues it to AOC (monitor brand).',
      curiositiesEn:
        'Field “etimografia” blends etymology + spelling. The agreement only touches spelling. Close: Valeu !!!',
      historyEs:
        'AO90 nombra el Acuerdo Ortográfico de 1990. Brasil ya escribía ação/objeto; el acuerdo alinea la letra. El étimo queda. La oreja pega en AOC (monitor).',
      curiositiesEs:
        'Etimografía en el campo = mezcla de etimología + ortografía. El acuerdo solo toca la segunda. Cierre: Valeu !!!'
    },
    'dsl'
  );
  upsertGuia(
    guia,
    {
      id: 'aoc',
      word: 'AOC',
      group: 'lexico',
      fromTitle: false,
      href: HREF_AOC,
      simple:
        'Sigla: Admiral Overseas Corporation. Monitor / objeto electrónico. ≠ AO90. Valeu !!!',
      simpleEn:
        'Acronym: Admiral Overseas Corporation. Monitor / electronic object. ≠ AO90. Valeu !!!',
      simpleEs:
        'Sigla: Admiral Overseas Corporation. Monitor / objeto electrónico. ≠ AO90. ¡Valeu !!!',
      history:
        'AOC nasceu como Admiral Overseas Corporation (1967, Taiwan) e ficou marca de ecrãs. Três letras no objeto da mesa. Não é o Acordo Ortográfico de 1990.',
      curiosities:
        'O C é de Corporation; o c que o AO90 largou em objecto é outra letra, outra história. Fecho: Valeu !!!',
      historyEn:
        'AOC began as Admiral Overseas Corporation (1967, Taiwan) and stayed a display brand. Three letters on a desk object. Not the 1990 spelling agreement.',
      curiositiesEn:
        'The C is from Corporation; the c AO90 dropped from objecto is another letter, another history. Close: Valeu !!!',
      historyEs:
        'AOC nació como Admiral Overseas Corporation (1967, Taiwán) y quedó marca de pantallas. Tres letras en el objeto de la mesa. No es el acuerdo de 1990.',
      curiositiesEs:
        'La C es de Corporation; la c que el AO90 soltó en objecto es otra letra, otra historia. Cierre: Valeu !!!'
    },
    'ao90'
  );

  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (AO90 / AOC)');
  }

  for (const post of [ao90, aoc]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  console.log('OK:', ao90.title, '· Cap.', ao90.seriesOrder);
  console.log('OK:', aoc.title, '· Cap.', aoc.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
