'use strict';

/**
 * Injeta a palavra @ / arroba cruzada com olhos (relação).
 * Uso: node scripts/upsert-palavra-arroba-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildArrobaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_ARROBA,
  WIKT_AT_SIGN,
  WIKI_AT
} = require('../lib/arroba-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-arroba.html';
const OLHO_HREF = '/posts/post-inspecao-palavra-olho.html';

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
  if (!post.filename) post.filename = 'posts/post-inspecao-palavra-arroba.html';
  if (!post.url) post.url = HREF;
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
  const arroba =
    '    arroba: { tone: "craft", category: "Léxico", mundane: "Nome PT do glifo @ — peso ibérico, depois sítio (at) e menção.", gloss: "Ár. ar-rubʿ (o quarto / o peso); cruzar com olho (oculus) pelo método relação — o olho cola o pictograma, a orelha não; ≠ órgão ≠ caracol; Valeu !!!", href: "' +
    HREF +
    '", en: "at sign / arroba", es: "arroba", fr: "arobase", it: "chiocciola", de: "Klammeraffe", el: "παπάκι", la: "ad / arruba", yo: "ami at", sw: "alama ya at", gez: "at", nl: "apenstaartje", pl: "małpa", ru: "собака", uk: "равлик", zh: "艾特", ja: "アットマーク", ko: "골뱅이", ar: "آروبا", he: "שטרודל", hi: "एट साइन", tr: "kuyruklu a", sv: "snabel-a", da: "snabel-a", no: "krøllalfa", fi: "ät-merkki", cs: "zavináč", ro: "arond", hu: "kukac", ca: "arrova", gl: "arroba", eu: "bildu", gn: "arroba", qu: "arroba", eo: "heliko", vi: "a còng", id: "tanda at", th: "แอต", hr: "manji", sk: "zavináč", ga: "comhartha ag", cy: "malwen", ha: "alamar at", am: "አት", fa: "ات ساین", bn: "অ্যাট সাইন", zu: "uphawu lwe-at" },\n';
  gloss = replaceOrInsertAfter(gloss, 'arroba', arroba, 'olho');
  const atSign =
    '    "@": { tone: "craft", category: "Léxico", mundane: "Glifo U+0040 — at / arroba; o olho lê órbita + íris.", gloss: "Relação com olhos: pictograma, não étimo (ar-rubʿ × oculus); menção chama o olhar; ver arroba.", href: "' +
    HREF +
    '", en: "at sign", es: "arroba" },\n';
  gloss = replaceOrInsertAfter(gloss, '"@"', atSign, 'arroba');
  const aliases = [
    [
      '"at sign"',
      '    "at sign": { gloss: "EN do glifo @ — o sítio; ver arroba × olhos.", href: "' +
        HREF +
        '", en: "at sign", es: "arroba" },\n'
    ],
    [
      'atsign',
      '    atsign: { gloss: "Grafia colada de at sign — ver @ / arroba.", href: "' +
        HREF +
        '", en: "at sign", es: "arroba" },\n'
    ],
    [
      'arobase',
      '    arobase: { gloss: "FR do glifo @ — ver arroba.", href: "' +
        HREF +
        '", en: "at sign", es: "arroba" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'arroba');
  }
  return gloss;
}

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase().trim() === 'fs') return;
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-arroba-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildArrobaPost());
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
        id: 'palavra-arroba',
        title: '@ / arroba — *ar-rubʿ*; cruzar com olhos (*oculus*)',
        titleEn: '@ / arroba — *ar-rubʿ*; cross with eyes (*oculus*)',
        titleEs: '@ / arroba — *ar-rubʿ*; cruzar con ojos (*oculus*)',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: @ / arroba (peso, at) × olho / olhos — relação de pictograma, não de étimo; o olho cola, a orelha não.',
        whyEn: 'Words: @ / arroba (weight, at) × olho / eyes — pictogram relation, not etymon; the eye glues, the ear does not.',
        whyEs: 'Palabras: @ / arroba (peso, at) × olho / ojos — relación de pictograma, no de étimo; el ojo pega, el oído no.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          OLHO_HREF,
          WIKT_ARROBA,
          WIKT_AT_SIGN,
          WIKI_AT,
          '/posts/post-inspecao-palavra-relacao.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — cola de olho; étimo ar-rubʿ × oculus; sem manual de e-mail.'
      },
      ['palavra-olho', 'palavra-relacao', 'palavra-oculos']
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
        id: 'arroba',
        word: '@ / arroba',
        simple:
          'Ár. ar-rubʿ — o quarto / o peso; glifo @ = at (sítio, menção). Cruzar com olho (oculus): o olho cola o pictograma, a orelha não. ≠ órgão. Valeu !!!',
        simpleEn:
          'Ar. ar-rubʿ — the quarter / the weight; glyph @ = at (place, mention). Cross with olho (oculus): the eye glues the pictogram, the ear does not. ≠ organ. Valeu !!!',
        simpleEs:
          'Ár. ar-rubʿ — el cuarto / el peso; glifo @ = at (sitio, mención). Cruzar con olho (oculus): el ojo pega el pictograma, el oído no. ≠ órgano. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Arroba vem do árabe ar-rubʿ (o quarto), unidade de peso ibérica. O glifo @ serviu de «à razão de»; o inglês leu at. Em 1971 entrou no correio electrónico. O nome do carácter em PT/ES continua a ser o do peso.',
        curiosities:
          'A relação com olhos é de vista: órbita + a-íris. A orelha não cola (arroba ≠ olho). Alcunhas mundiais vêem caracol, macaco ou cão — não olho. Menção @chama o olhar; não é o órgão.',
        historyEn:
          'Arroba comes from Arabic ar-rubʿ (the quarter), an Iberian weight. The @ mark meant “at the rate of”; English read at. In 1971 it entered email. The PT/ES name of the character is still the weight’s name.',
        curiositiesEn:
          'The relation with eyes is visual: orbit + a-as-iris. The ear does not glue (arroba ≠ olho). World nicknames see a snail, a monkey or a dog — not an eye. A mention @calls the look; it is not the organ.',
        historyEs:
          'Arroba viene del árabe ar-rubʿ (el cuarto), unidad de peso ibérica. El @ sirvió de «a razón de»; el inglés leyó at. En 1971 entró en el correo. El nombre PT/ES del carácter sigue siendo el del peso.',
        curiositiesEs:
          'La relación con ojos es de vista: órbita + a-iris. El oído no pega (arroba ≠ olho). Los apodos mundiales ven caracol, mono o perro — no ojo. La mención llama la mirada; no es el órgano.'
      },
      ['olho', 'oculos', 'relacao']
    );
    upsertItem(
      items,
      {
        id: 'at-sign',
        word: 'at sign',
        simple:
          'EN do glifo @ — o sítio (at). Ver arroba. Relação com olhos: pictograma, não étimo. Valeu !!!',
        simpleEn:
          'EN name of the @ glyph — the place (at). See arroba. Relation with eyes: pictogram, not etymon. Valeu !!!',
        simpleEs:
          'Nombre EN del glifo @ — el sitio (at). Ver arroba. Relación con ojos: pictograma, no étimo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['arroba']
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
      id: 'arroba',
      slug: 'arroba',
      title: '@',
      titleEn: '@',
      titleEs: '@',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o olho cola o @; a orelha não; ar-rubʿ × oculus; Valeu !!!',
      teaserEn: 'BudGanja echo — the eye glues the @; the ear does not; ar-rubʿ × oculus; Valeu !!!',
      teaserEs: 'Eco BudGanja — el ojo pega el @; el oído no; ar-rubʿ × oculus; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'arroba', 'olho', 'relação']
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
