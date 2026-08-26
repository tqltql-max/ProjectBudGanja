'use strict';

/**
 * Injeta a palavra inserção / inserir (derivação -ção).
 * Uso: node scripts/upsert-palavra-insercao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildInsercaoPost } = require('../lib/insercao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-insercao.html';

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
  if (gloss.includes('href: "' + HREF + '"')) return gloss;
  const block =
    '    inserção: { tone: "craft", category: "Léxico", mundane: "Nome do acto de inserir — o meter para dentro já nomeado.", gloss: "Lat. insertiō ← inserere (in- + serere, juntar); derivação inserir + -ção; ≠ inseto ≠ upsert; Valeu !!!", href: "' +
    HREF +
    '", en: "insertion", es: "inserción", fr: "insertion", it: "inserzione", de: "Einfügung", el: "εισαγωγή", la: "insertio", yo: "ìfipò", sw: "ingizo", gez: "insertio", nl: "invoeging", pl: "wstawienie", ru: "вставка", uk: "вставка", zh: "插入", ja: "挿入", ko: "삽입", ar: "إدراج", he: "הכנסה", hi: "प्रविष्टि", tr: "ekleme", sv: "infogning", da: "indsættelse", no: "innsetting", fi: "lisäys", cs: "vložení", ro: "inserție", hu: "beszúrás", ca: "inserció", gl: "inserción", eu: "txertaketa", gn: "moĩ", qu: "churay", eo: "enmeto", vi: "chèn", id: "sisipan", th: "การแทรก", hr: "umetanje", sk: "vloženie", ga: "ionsá", cy: "mewnosodiad", ha: "saka", am: "ማስገባት", fa: "درج", bn: "সন্নিবেশ", zu: "ukufaka" },\n' +
    '    insercao: { gloss: "Grafia sem cedilha de inserção — derivação de inserir; ver ficha.", href: "' +
    HREF +
    '", en: "insertion", es: "inserción" },\n' +
    '    inserir: { gloss: "Verbo — lat. inserere; o gesto de meter para dentro; o nome é inserção; ≠ inseto ≠ upsert; ver ficha.", href: "' +
    HREF +
    '", en: "to insert", es: "insertar" },\n' +
    '    insertar: { gloss: "Variante / cognato ES de inserir — mesma ficha inserção.", href: "' +
    HREF +
    '", en: "to insert (ES/PT variant)", es: "insertar" },\n' +
    '    inserido: { gloss: "Particípio de inserir — o que ficou dentro; ver inserção.", href: "' +
    HREF +
    '", en: "inserted", es: "insertado" },\n' +
    '    insert: { gloss: "EN insert — cognato de inserir; ≠ upsert (update+insert); ver ficha inserção.", href: "' +
    HREF +
    '", en: "insert", es: "insert / insertar" },\n' +
    '    derivação: { gloss: "Processo morfológico — exemplo fichado: inserir → inserção (-ção); ≠ aglutinação; ver ficha.", href: "' +
    HREF +
    '", en: "derivation (morphology)", es: "derivación" },\n' +
    '    derivacao: { gloss: "Grafia sem acento de derivação — ver inserção (exemplo -ção).", href: "' +
    HREF +
    '", en: "derivation", es: "derivación" },\n';

  const inserted = insertAfterKey(gloss, 'upsert', block);
  if (inserted) return inserted;
  console.warn('Aviso: glossário — inserção após upsert falhou');
  return gloss;
}

function upsertSugEntry(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const shared = {
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/inserir',
      'https://en.wiktionary.org/wiki/inserere#Latin',
      '/posts/post-inspecao-palavra-acao.html',
      '/posts/post-inspecao-palavra-upsert.html',
      '/posts/post-inspecao-palavra-inseto.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — derivação inserir + -ção; ≠ inseto ≠ upsert.'
  };
  upsertSugEntry(
    items,
    Object.assign(
      {
        id: 'palavra-insercao',
        title: 'Inserção — derivação de inserir (-ção), o gesto e o nome',
        titleEn: 'Inserção — derivation from inserir (-ção), the gesture and the name',
        titleEs: 'Inserção — derivación de inserir (-ção), el gesto y el nombre',
        why: 'Palavras: inserir → inserção (lat. inserere / insertiō) — sufixo -ção; ≠ inseto ≠ upsert; Valeu !!!',
        whyEn: 'Words: inserir → inserção (Lat. inserere / insertiō) — suffix -ção; ≠ insect ≠ upsert; Valeu !!!',
        whyEs: 'Palabras: inserir → inserção (lat. inserere / insertiō) — sufijo -ção; ≠ insecto ≠ upsert; ¡Valeu !!!'
      },
      shared
    )
  );
  upsertSugEntry(
    items,
    Object.assign(
      {
        id: 'palavra-inserir',
        title: 'Inserir — o verbo da inserção',
        titleEn: 'Inserir — the verb of inserção',
        titleEs: 'Inserir — el verbo de inserção',
        why: 'Alias do par inserir / inserção — mesma ficha; gesto de meter para dentro.',
        whyEn: 'Alias of the pair inserir / inserção — same sheet; gesture of putting in.',
        whyEs: 'Alias del par inserir / inserção — misma ficha; gesto de meter dentro.'
      },
      shared
    )
  );
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'insercao',
    word: 'Inserção',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Lat. insertiō ← inserere — derivação inserir + -ção; o gesto e o nome do acto; ≠ inseto ≠ upsert; Valeu !!!',
    simpleEn:
      'Lat. insertiō ← inserere — derivation inserir + -ção; the gesture and the named act; ≠ insect ≠ upsert; Valeu !!!',
    simpleEs:
      'Lat. insertiō ← inserere — derivación inserir + -ção; el gesto y el acto nombrado; ≠ insecto ≠ upsert; ¡Valeu !!!',
    history:
      'Inserção vem do latim insertiō, de inserere (in- + serere, juntar para dentro). Em português o nome alinha com o verbo inserir pelo sufixo -ção (o mesmo de ação e conjugação).',
    curiosities:
      'A orelha pode colar inserção em inseto — mas inseto vem de insecāre (cortar), não de serere (juntar). Upsert é outra sala: update+insert. Fecho: Valeu !!!',
    historyEn:
      'Portuguese inserção comes from Latin insertiō, from inserere (in- + serere, to join inward). The noun matches the verb inserir via the suffix -ção (the same piece as ação and conjugação).',
    curiositiesEn:
      'The ear may glue inserção to inseto — but inseto is from insecāre (to cut), not serere (to join). Upsert is another room: update+insert. Close: Valeu !!!',
    historyEs:
      'Inserção viene del latín insertiō, de inserere (in- + serere, juntar hacia dentro). En portugués el nombre alinea con el verbo inserir por el sufijo -ção (el mismo de ação y conjugação).',
    curiositiesEs:
      'El oído puede pegar inserção a inseto — pero inseto viene de insecāre (cortar), no de serere (juntar). Upsert es otra sala: update+insert. Cierre: Valeu !!!'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'upsert' || x.word === 'upsert');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-insercao-palavra-cover.js')], {
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

  const post = stampFiles(buildInsercaoPost());
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
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (inserção)');
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
