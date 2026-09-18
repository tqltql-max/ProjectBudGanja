'use strict';

/**
 * Injeta palavra «etimologia» na série Palavras e recita o cluster irmão.
 * Uso: node scripts/upsert-palavra-etimologia-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildEtimologiaPost } = require('../lib/etimologia-inspecao-post.js');
const { buildTrocadilhoPost } = require('../lib/trocadilho-inspecao-post.js');
const { buildAglutinacaoPost } = require('../lib/aglutinacao-inspecao-post.js');
const { buildPolimorfismoPost } = require('../lib/polimorfismo-inspecao-post.js');
const { buildLinguaPortuguesaPost } = require('../lib/lingua-portuguesa-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

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

function patchGlossary(gloss, mainKey, mainLine, aliases, afterKey) {
  if (new RegExp(mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{').test(gloss)) {
    gloss = gloss.replace(
      new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
  } else {
    const inserted = insertAfterKey(gloss, afterKey, mainLine + aliases);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção falhou para', mainKey);
  }
  return gloss;
}

function replaceGlossEntry(gloss, key, line) {
  const re = new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},');
  if (!re.test(gloss)) return gloss;
  return gloss.replace(re, line.trimEnd().replace(/,$/, '') + ',');
}

const LANGS =
  'fr: "étymologie", it: "etimologia", de: "Etymologie", el: "ετυμολογία", la: "etymologia", yo: "itumo oro", sw: "asili ya neno", gez: "etymology", nl: "etymologie", pl: "etymologia", ru: "этимология", uk: "етимологія", zh: "词源学", ja: "語源学", ko: "어원학", ar: "علم أصول الكلمات", he: "אטימולוגיה", hi: "व्युत्पत्ति", tr: "etimoloji", sv: "etymologi", da: "etymologi", no: "etymologi", fi: "etymologia", cs: "etymologie", ro: "etimologie", hu: "etimologia", ca: "etimologia", gl: "etimoloxia", eu: "etimologia", gn: "ñe\'e rape", qu: "simi paqarimuynin", eo: "etimologio", vi: "tu nguyen hoc", id: "etimologi", th: "นิรุกติศาสตร์", hr: "etimologija", sk: "etymologia", ga: "feiniceolaiocht", cy: "etymoleg", ha: "ilimin asalin kalma", am: "የቃላት ምንጭ", fa: "ریشه‌شناسی", bn: "ব্যুৎপত্তি", zu: "umselo wegama"';

const GLOSS_MAIN =
  '    etimologia: { tone: "craft", gloss: "Étymon + lógos — ofício de perguntar de onde veio; étimo ≠ etimologia popular (cara+alho); método da série Palavras; Faça o melhor!", href: "/posts/post-inspecao-palavra-etimologia.html", en: "etymology", es: "etimología", ' +
  LANGS +
  ' },\n';

const GLOSS_ALIASES =
  '    etymology: { gloss: "EN de etimologia — o ofício da origem; ≠ folk etymology.", href: "/posts/post-inspecao-palavra-etimologia.html", en: "etymology", es: "etimología" },\n' +
  '    "etimologia popular": { gloss: "História falsa que encaixa demais — fenómeno; ≠ étimo. Ex. cara+alho → trocadilho.", href: "/posts/post-inspecao-palavra-etimologia.html", en: "folk etymology", es: "etimología popular" },\n' +
  '    "folk etymology": { gloss: "EN de etimologia popular — ver ficha etimologia / trocadilho.", href: "/posts/post-inspecao-palavra-etimologia.html", en: "folk etymology", es: "etimología popular" },\n' +
  '    etymon: { gloss: "EN de étimo — a origem verdadeira (ou a melhor hipótese); peça da ficha etimologia.", href: "/posts/post-inspecao-palavra-etimologia.html", en: "etymon", es: "étimo" },\n';

const ETIMO_LINE =
  '    étimo: { tone: "craft", gloss: "Origem verdadeira da palavra (ou a melhor hipótese); ≠ etimologia popular; ver ficha etimologia.", href: "/posts/post-inspecao-palavra-etimologia.html", en: "etymon", es: "étimo", fr: "étymon", it: "etimo", de: "Etymon", yo: "orísun ọ̀rọ̀", sw: "asili ya neno", gez: "mənbäʾ qal", el: "έτυμον", la: "etymon", nl: "etymon", pl: "etymon", ru: "этимон", uk: "етимон", zh: "词源", ja: "語源", ko: "어원", ar: "أثيم", he: "אטימון", hi: "व्युत्पत्ति-मूल", tr: "etimon", sv: "etymon", da: "etymon", no: "etymon", fi: "etymon", cs: "etymon", ro: "etimon", hu: "etimon", ca: "etimon", gl: "etimo", eu: "etimo", gn: "ñe\'e rape", qu: "simi saphi", eo: "etimono", vi: "tu nguyen", id: "etimon", th: "รูปเดิม", hr: "etimon", sk: "etymon", ga: "eitimeon", cy: "etymon", ha: "asalin kalma", am: "ምንጭ ቃል", fa: "ریشه واژه", bn: "মূলশব্দ", zu: "umsuka wegama" },\n';

const ETIMO_ASCII =
  '    etimo: { gloss: "Grafia sem acento de étimo — a origem; ver etimologia.", href: "/posts/post-inspecao-palavra-etimologia.html", en: "etymon", es: "étimo" },\n';

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const href = '/posts/post-' + post.slug + '.html';
  const si = items.findIndex((x) => x.id === 'palavra-etimologia');
  const entry = {
    id: 'palavra-etimologia',
    title: 'Etimologia — o ofício de perguntar de onde veio',
    titleEn: 'Etymology — the craft of asking where it came from',
    titleEs: 'Etimología — el oficio de preguntar de dónde vino',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: etimologia (étymon + lógos) — método da série; étimo ≠ popular (cara+alho); Faça o melhor!',
    whyEn: 'Words: etymology (étymon + lógos) — method of the series; etymon ≠ folk (cara+alho); Do your best!',
    whyEs: 'Palabras: etimología (étymon + lógos) — método de la serie; étimo ≠ popular (cara+alho); ¡Haz lo mejor!',
    suggestedSlug: post.slug,
    doneHref: href,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      '/posts/post-inspecao-palavra-trocadilho.html',
      '/posts/post-inspecao-palavra-aglutinacao.html',
      '/posts/post-inspecao-palavra-polimorfismo.html',
      '/posts/post-inspecao-palavra-lingua-portuguesa.html',
      '/posts/post-inspecao-expressao-faca-o-melhor.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — ficha do método da série; cita cluster cara+alho.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, post) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const href = '/posts/post-' + post.slug + '.html';
  const entry = {
    id: 'etimologia',
    word: 'Etimologia',
    simple:
      'Étymon + lógos — ofício de perguntar de onde veio; étimo ≠ etimologia popular (cara+alho); método da série Palavras; irmãs aglutinação e polimorfismo.',
    simpleEn:
      'Étymon + lógos — craft of asking where a word came from; etymon ≠ folk etymology; method of the Palavras series.',
    simpleEs:
      'Étymon + lógos — oficio de preguntar de dónde vino; étimo ≠ etimología popular; método de la serie Palabras.',
    group: 'lexico',
    fromTitle: false,
    href,
    history:
      'Do grego etymología: étymon (sentido verdadeiro) + lógos (palavra / estudo). O laboratório usa este ofício em todas as fichas Palavras; a palavra ela mesma passa a ter ficha própria.',
    curiosities:
      'Etimologia popular é o mecanismo de cara+alho (história que encaixa demais) — não é o étimo. Aglutinação escolar (planalto) é fusão que é origem. Polimorfismo é outro mapa.',
    historyEn:
      'From Greek etymología: étymon (true sense) + lógos (word / study). The lab uses this craft on every Palavras sheet; the word itself now has its own file.',
    curiositiesEn:
      'Folk etymology is the cara+alho mechanism (a story that fits too well) — not the etymon. School agglutination (planalto) is fusion that is origin. Polymorphism is another map.',
    historyEs:
      'Del griego etymología: étymon (sentido verdadero) + lógos (palabra / estudio). El laboratorio usa este oficio en todas las fichas Palabras.',
    curiositiesEs:
      'Etimología popular es el mecanismo de cara+alho (historia que encaja demasiado) — no es el étimo. Aglutinación escolar (planalto) es fusión que es origen.'
  };
  const gi = items.findIndex((x) => x.id === 'etimologia' || x.word === 'Etimologia');
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    let after = -1;
    for (const id of ['polimorfismo', 'aglutinacao', 'trocadilho', 'lingua-portuguesa']) {
      after = items.findIndex((x) => x.id === id);
      if (after >= 0) break;
    }
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const main = stampFiles(buildEtimologiaPost());
  const sisters = [
    stampFiles(buildTrocadilhoPost()),
    stampFiles(buildAglutinacaoPost()),
    stampFiles(buildPolimorfismoPost()),
    stampFiles(buildLinguaPortuguesaPost())
  ];

  upsertPost(posts, main);
  sisters.forEach((p) => upsertPost(posts, p));
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(main);
    sisters.forEach((p) => writeHtml(p));
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  writeI18n(i18n, main);
  sisters.forEach((p) => writeI18n(i18n, p));
  await writeJsonRetry(I18N_FILE, i18n);

  upsertSug(sug, main);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);

  upsertGuia(guia, main);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);

  if (gloss) {
    gloss = patchGlossary(gloss, 'etimologia', GLOSS_MAIN, GLOSS_ALIASES, 'polimorfismo');
    gloss = replaceGlossEntry(gloss, 'étimo', ETIMO_LINE);
    gloss = replaceGlossEntry(gloss, 'etimo', ETIMO_ASCII);
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (etimologia · étimo · popular)');
  }

  try {
    await syncSql(main);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', main.title, '· Cap.', main.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
