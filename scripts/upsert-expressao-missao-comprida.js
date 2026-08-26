'use strict';

/**
 * Injeta a expressão missão comprida (cola comprimento × canónica cumprida).
 * Uso: node scripts/upsert-expressao-missao-comprida.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildMissaoCompridaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_CUMPRIR
} = require('../lib/missao-comprida-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-expressao-missao-comprida.html';

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
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    '    (?:"' + escaped + '"|' + escaped + '):\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterEsc = afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const afterRe = new RegExp(
    '(    (?:"' + afterEsc + '"|' + afterEsc + '):\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const main =
    '    "missão comprida": { tone: "craft", category: "Léxico", mundane: "Trocadilho BR — missão longa; cola sobre missão cumprida.", gloss: "missão comprida = cola (comprido/longo) sobre missão cumprida (complēre); comprido é primo (particípio arcaico); missão ← missiō (envio); comprimento × cumprimento; Valeu !!!", href: "' +
    HREF +
    '", en: "long mission (pun on mission accomplished)", es: "misión larga (juego con misión cumplida)", fr: "mission longue", it: "missione lunga", de: "lange Mission", el: "μακρά αποστολή", la: "missio longa", yo: "iṣẹ́ gígùn", sw: "dhamira ndefu", gez: "missão comprida", nl: "lange missie", pl: "długa misja", ru: "долгая миссия", uk: "довга місія", zh: "漫长任务", ja: "長い任務", ko: "긴 임무", ar: "مهمة طويلة", he: "משימה ארוכה", hi: "लंबा मिशन", tr: "uzun görev", sv: "lång mission", da: "lang mission", no: "lang misjon", fi: "pitkä tehtävä", cs: "dlouhá mise", ro: "misiune lungă", hu: "hosszú küldetés", ca: "missió llarga", gl: "misión longa", eu: "misio luzea", gn: "misión pukukue", qu: "hatun kachay", eo: "longa misio", vi: "nhiệm vụ dài", id: "misi panjang", th: "ภารกิจยาว", hr: "duga misija", sk: "dlhá misia", ga: "misean fada", cy: "cenhadaeth hir", ha: "aiki mai tsawo", am: "ረጅም ተልእኮ", fa: "ماموریت طولانی", bn: "দীর্ঘ মিশন", zu: "umsebenzi omude" },\n';
  gloss = replaceOrInsertAfter(gloss, 'missão comprida', main, "don't show again");
  const aliases = [
    [
      'missao comprida',
      '    "missao comprida": { gloss: "Sem acento — ver missão comprida.", href: "' +
        HREF +
        '", en: "long mission (pun)", es: "misión larga" },\n'
    ],
    [
      'missão cumprida',
      '    "missão cumprida": { tone: "craft", category: "Léxico", mundane: "Locução de fecho — o envio foi executado.", gloss: "Canónica de missão comprida; cumprir ← complēre (encher); missão ← missiō; ≠ comprimento; Valeu !!!", href: "' +
        HREF +
        '", en: "mission accomplished", es: "misión cumplida", fr: "mission accomplie", it: "missione compiuta", de: "Mission erfüllt", el: "αποστολή εξετελέσθη", la: "missio completa", yo: "iṣẹ́ ti parí", sw: "dhamira imetimia" },\n'
    ],
    [
      'missao cumprida',
      '    "missao cumprida": { gloss: "Sem acento — ver missão cumprida / missão comprida.", href: "' +
        HREF +
        '", en: "mission accomplished", es: "misión cumplida" },\n'
    ],
    [
      'cumprir',
      '    cumprir: { gloss: "Lat. complēre — encher / executar; peça de missão cumprida; primo de comprido; ver missão comprida.", href: "' +
        HREF +
        '", en: "to fulfill", es: "cumplir" },\n'
    ],
    [
      'comprido',
      '    comprido: { gloss: "Adjectivo «longo» — particípio arcaico de comprir (complēre); cola de missão comprida; ≠ cumprido; Valeu !!!", href: "' +
        HREF +
        '", en: "long", es: "largo" },\n'
    ],
    [
      'comprida',
      '    comprida: { gloss: "Feminino de comprido — cola da expressão missão comprida; ver a ficha.", href: "' +
        HREF +
        '", en: "long (fem.)", es: "larga" },\n'
    ],
    [
      'cumprida',
      '    cumprida: { gloss: "Particípio de cumprir — forma canónica de missão cumprida; ver missão comprida.", href: "' +
        HREF +
        '", en: "fulfilled (fem.)", es: "cumplida" },\n'
    ],
    [
      'cumprido',
      '    cumprido: { gloss: "Particípio de cumprir — feito / executado; ≠ comprido (longo); ver missão comprida.", href: "' +
        HREF +
        '", en: "fulfilled", es: "cumplido" },\n'
    ],
    [
      'comprimento',
      '    comprimento: { gloss: "Extensão medida — irmão o de cumprimento; sala do metro na ficha missão comprida.", href: "' +
        HREF +
        '", en: "length", es: "longitud" },\n'
    ],
    [
      'cumprimento',
      '    cumprimento: { gloss: "Acto de cumprir / saudação — irmão u de comprimento; ≠ origem de missão cumprida; ver missão comprida.", href: "' +
        HREF +
        '", en: "fulfillment / greeting", es: "cumplimiento / saludo" },\n'
    ],
    [
      'missão',
      '    "missão": { gloss: "Lat. missiō ← mittō «enviar» — encargo enviado; peça 1 de missão cumprida / comprida.", href: "' +
        HREF +
        '", en: "mission", es: "misión" },\n'
    ],
    [
      'mission accomplished',
      '    "mission accomplished": { gloss: "Calco EN paralelo (accomplēre) — sala de palco, não étimo BR; ver missão comprida.", href: "' +
        HREF +
        '", en: "mission accomplished", es: "misión cumplida" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'missão comprida');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-missao-comprida-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildMissaoCompridaPost());
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
        id: 'expressao-missao-comprida',
        title: 'missão comprida — cola do comprimento; canónica cumprida; primos de complēre',
        titleEn: 'missão comprida — length-glue; canonical cumprida; cousins of complēre',
        titleEs: 'missão comprida — cola de la longitud; canónica cumprida; primos de complēre',
        tipo: 'expressao',
        priority: 2,
        status: 'feita',
        why: 'Expressões: missão comprida — trocadilho sobre missão cumprida (complēre); comprido é primo (extensão); missão é envio.',
        whyEn: 'Sayings: missão comprida — pun on missão cumprida (complēre); comprido is a cousin (length); missão is sending.',
        whyEs: 'Dichos: missão comprida — juego sobre missão cumprida (complēre); comprido es primo (extensión); misión es envío.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'expressoes-ditados',
        sources: [
          HREF,
          WIKT_CUMPRIR,
          'https://pt.wiktionary.org/wiki/comprido',
          'https://pt.wiktionary.org/wiki/cumprido',
          'https://pt.wiktionary.org/wiki/miss%C3%A3o',
          'https://en.wiktionary.org/wiki/compleo#Latin',
          'https://en.wiktionary.org/wiki/missio#Latin',
          'https://pt.wiktionary.org/wiki/comprimento',
          'https://pt.wiktionary.org/wiki/cumprimento',
          'https://pt.wikipedia.org/wiki/Etimologia_popular',
          '/posts/post-inspecao-palavra-trocadilho.html',
          '/posts/post-inspecao-palavra-etimologia.html',
          '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html',
          '/posts/post-inspecao-expressao-miss-click.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — cola o/u × étimo comum complēre; sem briefing militar.'
      },
      ['expressao-dont-show-again', 'expressao-miss-click', 'palavra-trocadilho']
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
        id: 'missao-comprida',
        word: 'missão comprida',
        simple:
          'Trocadilho BR: cola comprida (longa) sobre a locução missão cumprida (feita). Cumprir e comprido vêm do lat. complēre. Missão é envio (missiō). Comprimento × cumprimento. Valeu !!!',
        simpleEn:
          'BR pun: glue comprida (long) on the locution missão cumprida (done). Cumprir and comprido come from Lat. complēre. Missão is a sending (missiō). Length × greeting. Valeu !!!',
        simpleEs:
          'Juego BR: cola comprida (larga) sobre la locución missão cumprida (hecha). Cumprir y comprido vienen del lat. complēre. Missão es envío (missiō). Longitud × saludo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Missão comprida é a boca do pátio que troca o u de cumprida pelo o de comprida. A locução canónica é missão cumprida: cumprir vem do latim complēre («encher por completo»), via latim vulgar complīre e português arcaico comprir; a vogal átona passou a u no verbo moderno. O adjectivo comprido é o particípio antigo que ficou na grafia com o e passou a significar «longo». Missão vem de missiō / mittō («enviar») — outra árvore. O par comprimento / cumprimento é o mesmo corte o × u (metro × saudação / acto de cumprir).',
        curiosities:
          'A orelha recupera a grafia antiga (comprir) e erra o ofício se toma comprida por origem da locução. Em espanhol misión cumplida não abre comprida (larga) — o trocadilho é português. Irmã de ofício: Miss Click (ali a senhorita é outra árvore; aqui os primos partilham raiz). Salas cortadas: faixa Mission Accomplished, régua, cumprimento como «olá».',
        historyEn:
          'Missão comprida is yard speech that swaps the u of cumprida for the o of comprida. The canonical locution is missão cumprida: cumprir is from Latin complēre (“to fill completely”), via VL complīre and Old Portuguese comprir; the unstressed vowel became u in the modern verb. The adjective comprido is the old participle that kept the o and came to mean “long”. Missão is from missiō / mittō (“to send”) — another tree. The pair comprimento / cumprimento is the same o × u cut (metre × greeting / act of fulfilling).',
        curiositiesEn:
          'The ear recovers the old spelling (comprir) and misses the office if it takes comprida as the origin of the locution. In Spanish misión cumplida does not open comprida (larga) — the pun is Portuguese. Sister of craft: Miss Click (there the young lady is another tree; here the cousins share a root). Rooms cut: the Mission Accomplished banner, the ruler, cumprimento as “hello”.',
        historyEs:
          'Missão comprida es habla de patio que cambia la u de cumprida por la o de comprida. La locución canónica es missão cumprida: cumprir viene del latín complēre («llenar por completo»), vía latín vulgar complīre y portugués arcaico comprir; la vocal átona pasó a u en el verbo moderno. El adjetivo comprido es el participio antiguo que quedó con o y pasó a significar «largo». Missão viene de missiō / mittō («enviar») — otro árbol. El par comprimento / cumprimento es el mismo corte o × u (metro × saludo / acto de cumplir).',
        curiositiesEs:
          'El oído recupera la grafía antigua (comprir) y yerra el oficio si toma comprida por origen de la locución. En español misión cumplida no abre comprida (larga) — el juego es portugués. Hermana de oficio: Miss Click. Salas cortadas: la franja Mission Accomplished, la regla, cumprimento como «hola».'
      },
      ['dont-show-again', 'miss-click', 'trocadilho']
    );
    upsertItem(
      items,
      {
        id: 'missao-cumprida',
        word: 'missão cumprida',
        simple:
          'Locução de fecho — o envio foi executado. Canónica de missão comprida. Cumprir ← complēre. Valeu !!!',
        simpleEn:
          'Closing locution — the sending was executed. Canonical form of missão comprida. Cumprir ← complēre. Valeu !!!',
        simpleEs:
          'Locución de cierre — el envío fue ejecutado. Canónica de missão comprida. Cumprir ← complēre. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['missao-comprida']
    );
    upsertItem(
      items,
      {
        id: 'comprido',
        word: 'comprido',
        simple:
          'Adjectivo «longo» — particípio arcaico de comprir (lat. complēre). Cola de missão comprida. ≠ cumprido. Valeu !!!',
        simpleEn:
          'Adjective “long” — old participle of comprir (Lat. complēre). Glue of missão comprida. ≠ cumprido. Valeu !!!',
        simpleEs:
          'Adjetivo «largo» — participio arcaico de comprir (lat. complēre). Cola de missão comprida. ≠ cumprido. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['missao-comprida']
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
      id: 'missao-comprida',
      slug: 'missao-comprida',
      title: 'Missão comprida',
      titleEn: 'Long mission',
      titleEs: 'Misión larga',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — a orelha troca o u pelo o; cumprir e comprido são primos; Valeu !!!',
      teaserEn: 'BudGanja echo — the ear swaps u for o; cumprir and comprido are cousins; Valeu !!!',
      teaserEs: 'Eco BudGanja — el oído cambia la u por la o; cumprir y comprido son primos; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'missao-comprida', 'cumprir', 'comprido']
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
