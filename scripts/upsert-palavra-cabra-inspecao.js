'use strict';

/**
 * Injeta a palavra «cabra» e o corte com «abra» na série Palavras.
 * Uso: node scripts/upsert-palavra-cabra-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildCabraPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT
} = require('../lib/cabra-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-cabra.html';

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

function langsCabra() {
  return 'en: "goat / she-goat", es: "cabra", fr: "chèvre", it: "capra", de: "Ziege", el: "αίγα / κατσίκα", la: "capra", yo: "ewúrẹ́", sw: "mbuzi", gez: "ṭäli", nl: "geit", pl: "koza", ru: "коза", uk: "коза", zh: "山羊", ja: "ヤギ", ko: "염소", ar: "ماعز", he: "עז", hi: "बकरी", tr: "keçi", sv: "get", da: "ged", no: "geit", fi: "vuohi", cs: "koza", ro: "capră", hu: "kecske", ca: "cabra", gl: "cabra", eu: "ahuntz", gn: "kavara", qu: "cabra", eo: "kapro", vi: "dê", id: "kambing", th: "แพะ", hr: "koza", sk: "koza", ga: "gabhar", cy: "gafr", ha: "akuya", am: "ፍየል", fa: "بز", bn: "ছাগল", zu: "imbuzi"';
}

function patchGlossary(gloss) {
  const main =
    '    cabra: { tone: "craft", category: "Léxico", mundane: "Fêmea caprina; no NE também uma pessoa.", gloss: "Lat. capra — a orelha cola c+abra; abra ← abrir / aperīre; ≠ bode (étimo outro); ≠ abracadabra; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langsCabra() +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'cabra', main, 'bode');
  const aliases = [
    [
      'abra',
      '    abra: { gloss: "Forma de abrir (lat. aperīre) ou enseada — letras dentro de cabra, étimo outro; ver cabra.", href: "' +
        HREF +
        '", en: "open (form of abrir) / cove", es: "abra (de abrir) / ensenada" },\n'
    ],
    [
      'abrir',
      '    abrir: { tone: "craft", category: "Léxico", mundane: "Pôr aberto; a forma abra não gera a cabra.", gloss: "Lat. aperīre — abrir; abra ≠ cabra (capra). Corte na ficha cabra. Valeu !!!", href: "' +
        HREF +
        '", en: "to open", es: "abrir", fr: "ouvrir", it: "aprire", de: "öffnen", yo: "ṣí", sw: "kufungua", gez: "käśätä", el: "ανοίγω", la: "aperire", nl: "openen", pl: "otwierać", ru: "открывать", uk: "відкривати", zh: "打开", ja: "開ける", ko: "열다", ar: "يفتح", he: "לפתוח", hi: "खोलना", tr: "açmak", sv: "öppna", da: "åbne", no: "åpne", fi: "avata", cs: "otevřít", ro: "a deschide", hu: "kinyitni", ca: "obrir", gl: "abrir", eu: "ireki", gn: "pe", qu: "kichay", eo: "malfermi", vi: "mở", id: "membuka", th: "เปิด", hr: "otvoriti", sk: "otvoriť", ga: "oscail", cy: "agor", ha: "buɗe", am: "መክፈት", fa: "باز کردن", bn: "খোলা", zu: "vula" },\n'
    ],
    [
      'cabrito',
      '    cabrito: { gloss: "Cria da cabra — diminutivo de cabra (capra); ver cabra.", href: "' +
        HREF +
        '", en: "kid (young goat)", es: "cabrito" },\n'
    ],
    [
      'capra',
      '    capra: { gloss: "Latim / IT — a fêmea caprina; o vocábulo PT está em cabra.", href: "' +
        HREF +
        '", en: "she-goat (Lat. / IT)", es: "cabra (lat. capra)" },\n'
    ],
    [
      'caprino',
      '    caprino: { gloss: "Da família da cabra (capra); o macho PT é bode (étimo outro). Ver cabra.", href: "' +
        HREF +
        '", en: "caprine / goat (adj.)", es: "caprino" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'cabra');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-cabra-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildCabraPost());
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
        id: 'palavra-cabra',
        title: 'Cabra — capra; a orelha cola abra',
        titleEn: 'Cabra — capra; the ear glues abra',
        titleEs: 'Cabra — capra; la oreja pega abra',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: cabra ← lat. capra; relação com abra (← abrir / aperīre); ≠ bode; Valeu !!!',
        whyEn: 'Words: cabra ← Lat. capra; relation to abra (← abrir / aperīre); ≠ bode; Valeu !!!',
        whyEs: 'Palabras: cabra ← lat. capra; relación con abra (← abrir / aperīre); ≠ bode; ¡Valeu !!!',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          WIKT,
          'https://pt.wiktionary.org/wiki/abra',
          '/posts/post-inspecao-palavra-bode.html',
          '/posts/post-inspecao-palavra-relacao.html',
          '/posts/post-inspecao-palavra-abracadabra.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — pedido Cabra relação com abra; letras dentro, étimos fora.'
      },
      ['palavra-bode', 'palavra-abracadabra', 'palavra-relacao']
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
        id: 'cabra',
        word: 'cabra',
        simple:
          'Lat. capra — fêmea caprina. A orelha cola c+abra; abra vem de abrir (aperīre), não da cabra. ≠ bode. Valeu !!!',
        simpleEn:
          'Lat. capra — she-goat. The ear glues c+abra; abra comes from abrir (aperīre), not from the goat. ≠ bode. Valeu !!!',
        simpleEs:
          'Lat. capra — hembra caprina. La oreja pega c+abra; abra viene de abrir (aperīre), no de la cabra. ≠ bode. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Do latim capra o português herda cabra. Abra (forma de abrir, ou enseada) desce de aperīre. As letras coincidem; as raízes não. O macho é bode, étimo outro.',
        curiosities:
          'Inglês goat é germânico, não capra. Abracadabra começa em abra- e vive noutra ficha. No Nordeste cabra também nomeia uma pessoa.',
        historyEn:
          'From Latin capra Portuguese inherits cabra. Abra (a form of abrir, or a cove) comes from aperīre. Letters coincide; roots do not. The male is bode, another etymon.',
        curiositiesEn:
          'English goat is Germanic, not from capra. Abracadabra starts with abra- and lives on another sheet. In NE Brazil cabra can also name a person.',
        historyEs:
          'Del latín capra el portugués hereda cabra. Abra (forma de abrir, o ensenada) baja de aperīre. Las letras coinciden; las raíces no. El macho es bode, otro étimo.',
        curiositiesEs:
          'Inglés goat es germánico, no capra. Abracadabra empieza en abra- y vive en otra ficha. En el Nordeste cabra también nombra a una persona.'
      },
      ['bode', 'animal', 'abracadabra']
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
      id: 'cabra',
      slug: 'cabra',
      title: 'Cabra',
      titleEn: 'Cabra',
      titleEs: 'Cabra',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — capra, não abra; letras dentro, étimos fora; Valeu !!!',
      teaserEn: 'BudGanja echo — capra, not abra; letters inside, etymons apart; Valeu !!!',
      teaserEs: 'Eco BudGanja — capra, no abra; letras dentro, étimos aparte; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'cabra', 'abra', 'capra', 'palavra']
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
