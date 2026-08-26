'use strict';

/**
 * Injeta a palavra olho (lat. oculus) cruzada com zaroio (zarolho).
 * Uso: node scripts/upsert-palavra-olho-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildOlhoPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_OLHO,
  WIKT_ZAROLHO,
  WIKT_OCULUS,
  WIKT_ZANOLHO
} = require('../lib/olho-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-olho.html';

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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || [])
      .map((id) => items.findIndex((x) => x.id === id))
      .find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const main =
    '    olho: { tone: "craft", category: "Léxico", mundane: "Órgão da visão; também olhar, abertura, broto.", gloss: "Lat. oculus × zaroio (voz de zarolho — o olho que não alinha); lh → i; ≠ eye ≠ ophthalmós ≠ xingo; Valeu !!!", href: "' +
    HREF +
    '", en: "eye", es: "ojo", fr: "œil", it: "occhio", de: "Auge", el: "μάτι", la: "oculus", yo: "ojú", sw: "jicho", gez: "ʿayn", nl: "oog", pl: "oko", ru: "глаз", uk: "око", zh: "眼睛", ja: "目", ko: "눈", ar: "عين", he: "עין", hi: "आँख", tr: "göz", sv: "öga", da: "øje", no: "øye", fi: "silmä", cs: "oko", ro: "ochi", hu: "szem", ca: "ull", gl: "ollo", eu: "begi", gn: "tesa", qu: "ñawi", eo: "okulo", vi: "mắt", id: "mata", th: "ตา", hr: "oko", sk: "oko", ga: "súil", cy: "llygad", ha: "ido", am: "ዓይን", fa: "چشم", bn: "চোখ", zu: "iso" },\n';
  gloss = replaceOrInsertAfter(gloss, 'olho', main, 'ver');
  const olhar =
    '    olhar: { gloss: "Verbo da família de olho ← lat. oculus / oculāre; eu olho é homógrafo do órgão; ver olho.", href: "' +
    HREF +
    '", en: "to look", es: "mirar", fr: "regarder", it: "guardare", de: "schauen", yo: "wò", sw: "kuangalia", gez: "näṣṣärä", el: "κοιτάζω", la: "oculare / aspicere", nl: "kijken", pl: "patrzeć", ru: "смотреть", uk: "дивитися", zh: "看", ja: "見る", ko: "보다", ar: "نظر", he: "להסתכל", hi: "देखना", tr: "bakmak", sv: "titta", da: "kigge", no: "se", fi: "katsoa", cs: "dívat se", ro: "a privi", hu: "nézni", ca: "mirar", gl: "ollar", eu: "begiratu", gn: "hecha", qu: "qaway", eo: "rigardi", vi: "nhìn", id: "melihat", th: "มอง", hr: "gledati", sk: "pozerať", ga: "amharc", cy: "edrych", ha: "duba", am: "መመልከት", fa: "نگاه کردن", bn: "তাকানো", zu: "buka" },\n';
  gloss = replaceOrInsertAfter(gloss, 'olhar', olhar, 'olho');
  const aliases = [
    [
      'olhos',
      '    olhos: { gloss: "Plural de olho — lat. oculus; ver olho.", href: "' +
        HREF +
        '", en: "eyes", es: "ojos" },\n'
    ],
    [
      'zaroio',
      '    zaroio: { gloss: "Voz de campo de zarolho (lh → i) — o olho que não alinha; ≠ xingo; ver olho.", href: "' +
        HREF +
        '", en: "cross-eyed (field spelling)", es: "bizco (voz de campo)" },\n'
    ],
    [
      'zarolho',
      '    zarolho: { gloss: "Estrábico / cego de um olho; lema de zaroio; via zanolho ← zanaga + olho (média); ver olho.", href: "' +
        HREF +
        '", en: "cross-eyed / one-eyed", es: "bizco / tuerto" },\n'
    ],
    [
      'zanolho',
      '    zanolho: { gloss: "Forma irmã de zarolho — blend zanaga + olho (hipótese de trabalho); ver olho.", href: "' +
        HREF +
        '", en: "one-eyed (zanolho)", es: "tuerto (zanolho)" },\n'
    ],
    [
      'caolho',
      '    caolho: { gloss: "Sinónimo de zarolho — cego de um olho; outra formação; ver olho.", href: "' +
        HREF +
        '", en: "one-eyed", es: "tuerto" },\n'
    ],
    [
      'vesgo',
      '    vesgo: { gloss: "Sinónimo vivo de zarolho — eixos que não alinham; ver olho.", href: "' +
        HREF +
        '", en: "cross-eyed / squinting", es: "bizco" },\n'
    ],
    [
      'oculus',
      '    oculus: { gloss: "Latim de olho — a peça; ver olho.", href: "' +
        HREF +
        '", en: "oculus (Lat. eye)", es: "oculus" },\n'
    ],
    [
      '"olho gordo"',
      '    "olho gordo": { gloss: "Inveja / mau-olhado — sala de folclore; ≠ étimo de olho; ver olho.", href: "' +
        HREF +
        '", en: "evil eye / envy (BR)", es: "mal de ojo / envidia" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'olho');
  }
  return gloss;
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-olho-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildOlhoPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-olho',
        title: 'Olho — oculus; cruzado com zaroio (zarolho)',
        titleEn: 'Olho — oculus; crossed with zaroio (zarolho)',
        titleEs: 'Olho — oculus; cruzado con zaroio (zarolho)',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: olho (lat. oculus) × zaroio (voz de zarolho — o olho que não alinha); lh → i; ≠ eye ≠ xingo.',
        whyEn: 'Words: olho (Lat. oculus) × zaroio (field voice of zarolho — the eye that does not line up); lh → i.',
        whyEs: 'Palabras: olho (lat. oculus) × zaroio (voz de zarolho — el ojo que no alinea); lh → i.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT_OLHO,
          WIKT_OCULUS,
          WIKT_ZAROLHO,
          WIKT_ZANOLHO,
          '/posts/post-inspecao-palavra-orelha.html',
          '/posts/post-inspecao-palavra-sinais.html',
          '/posts/post-inspecao-palavra-luz.html',
          '/posts/post-inspecao-palavra-miss.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes:
          'Cap. ' +
          post.seriesOrder +
          ' — olho × zaroio; zarolho no papel; prefixo via zanolho (média); ≠ xingo.'
      },
      ['palavra-orelha', 'palavra-sinais', 'palavra-luz']
    );
    upsertItem(
      items,
      {
        id: 'palavra-zaroio',
        title: 'Zaroio — voz de zarolho; cruzado na ficha olho',
        titleEn: 'Zaroio — field voice of zarolho; crossed in the olho sheet',
        titleEs: 'Zaroio — voz de zarolho; cruzado en la ficha olho',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: zaroio = zarolho no ouvido (lh → i); o olho que não alinha; ver ficha olho.',
        whyEn: 'Words: zaroio = zarolho in the ear (lh → i); the eye that does not line up; see olho.',
        whyEs: 'Palabras: zaroio = zarolho en el oído (lh → i); el ojo que no alinea; ver olho.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [HREF, WIKT_ZAROLHO, WIKT_ZANOLHO],
        notes: 'Cap. ' + post.seriesOrder + ' — mesma ficha que olho.'
      },
      ['palavra-olho']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'olho',
        word: 'olho',
        simple:
          'Lat. oculus — o órgão que vê, e o olhar. Cruzado com zaroio (voz de zarolho: o olho que não alinha). Lh → i. ≠ eye ≠ ophthalmós ≠ xingo. Valeu !!!',
        simpleEn:
          'Lat. oculus — the organ that sees, and the look. Crossed with zaroio (field voice of zarolho: the eye that does not line up). Lh → i. ≠ eye ≠ ophthalmós ≠ slur. Valeu !!!',
        simpleEs:
          'Lat. oculus — el órgano que ve, y la mirada. Cruzado con zaroio (voz de zarolho: el ojo que no alinea). Lh → i. ≠ eye ≠ ophthalmós ≠ insulto. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Olho vem do latim oculus (século XIII no galego-português). Família: olhar, óculo, ocular; espanhol ojo, francês œil, italiano occhio. O inglês eye é germânico — paralelo, não pai. O grego ophthalmós alimenta a oftalmologia, outra árvore. O verbo eu olho é homógrafo: mesma família, outra classe.',
        curiosities:
          'Zaroio é zarolho no ouvido (lh palatal vira i, como olho → oio). Hipótese de trabalho: zarolho via zanolho, blend de zanaga + olho — o segundo membro é olho; o prefixo fica aberto. Nomear não é xingar. Olho da planta é broto; olho gordo é folclore.',
        historyEn:
          'Portuguese olho is Latin oculus (13th c. in Galician-Portuguese). Family: olhar, óculo, ocular; Spanish ojo, French œil, Italian occhio. English eye is Germanic — a parallel, not a parent. Greek ophthalmós feeds ophthalmology, another tree. The verb eu olho is a homograph: same family, other class.',
        curiositiesEn:
          'Zaroio is zarolho in the ear (palatal lh becomes i, as olho → oio). Working hypothesis: zarolho via zanolho, a blend of zanaga + olho — the second member is olho; the prefix stays open. Naming is not mocking. Plant olho is a bud; olho gordo is folklore.',
        historyEs:
          'Olho viene del latín oculus (siglo XIII en gallego-portugués). Familia: olhar, óculo, ocular; español ojo, francés œil, italiano occhio. El inglés eye es germánico — paralelo, no padre. El griego ophthalmós alimenta la oftalmología, otro árbol. El verbo eu olho es homógrafo: misma familia, otra clase.',
        curiositiesEs:
          'Zaroio es zarolho en el oído (lh palatal vira i, como olho → oio). Hipótesis de trabajo: zarolho vía zanolho, blend de zanaga + olho. Nombrar no es insultar. Olho de la planta es brote; olho gordo es folclore.'
      },
      ['orelha', 'sinais', 'luz']
    );
    upsertItem(
      items,
      {
        id: 'zaroio',
        word: 'zaroio',
        simple:
          'Voz de campo de zarolho (lh → i) — o olho que não alinha. Cruzado na ficha olho. ≠ xingo. Valeu !!!',
        simpleEn:
          'Field voice of zarolho (lh → i) — the eye that does not line up. Crossed in the olho sheet. ≠ slur. Valeu !!!',
        simpleEs:
          'Voz de campo de zarolho (lh → i) — el ojo que no alinea. Cruzado en la ficha olho. ≠ insulto. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['olho']
    );
    upsertItem(
      items,
      {
        id: 'zarolho',
        word: 'zarolho',
        simple:
          'Lema de zaroio — estrábico / cego de um olho; via zanolho ← zanaga + olho (média). Ver olho. Valeu !!!',
        simpleEn:
          'Lemma of zaroio — cross-eyed / one-eyed; path zanolho ← zanaga + olho (medium). See olho. Valeu !!!',
        simpleEs:
          'Lema de zaroio — bizco / tuerto; vía zanolho ← zanaga + olho (media). Ver olho. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['zaroio']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss);
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'olho',
      slug: 'olho',
      title: 'Olho',
      titleEn: 'Olho',
      titleEs: 'Olho',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — oculus; cruzado com zaroio (zarolho); o olho que não alinha; Valeu !!!',
      teaserEn: 'BudGanja echo — oculus; crossed with zaroio (zarolho); the eye that does not line up; Valeu !!!',
      teaserEs: 'Eco BudGanja — oculus; cruzado con zaroio (zarolho); el ojo que no alinea; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'olho', 'zaroio', 'zarolho']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
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
