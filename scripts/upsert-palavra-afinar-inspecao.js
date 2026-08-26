'use strict';

/**
 * Injeta palavra «afinar» na série Palavras.
 * Uso: node scripts/upsert-palavra-afinar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildAfinarPost } = require('../lib/afinar-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
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

function upsertGuia(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = items.findIndex((x) => afterIds.indexOf(x.id) >= 0);
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function glossHas(src, key) {
  return new RegExp('    ' + key + ': \\{').test(src);
}

function replaceGloss(src, key, line) {
  const re = new RegExp('    ' + key + ': \\{[\\s\\S]*?\\},\\r?\\n');
  if (re.test(src)) return src.replace(re, line);
  return src;
}

function insertAfterKey(src, afterKey, line) {
  const re = new RegExp('(    ' + afterKey + ': \\{[\\s\\S]*?\\},\\r?\\n)');
  if (re.test(src)) return src.replace(re, '$1' + line);
  return src + line;
}

async function main() {
  const post = buildAfinarPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-afinar';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Afinar — violão, passarinho assobiando e o tom justo',
      titleEn: 'Afinar — guitar, whistling bird and the right pitch',
      titleEs: 'Afinar — guitarra, pajarito silbando y el tono justo',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: afinar (a- + fino ← lat. fīnis) — objecto violão; passarinho assobiando; desafinar; asoviar = assobiar; Valeu !!!',
      whyEn: 'Words: afinar (a- + fino ← Lat. fīnis) — guitar object; whistling bird; desafinar; asoviar = whistle; Valeu !!!',
      whyEs: 'Palabras: afinar (a- + fino ← lat. fīnis) — objeto violão; pajarito silbando; desafinar; asoviar = silbar; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/fino',
        '/posts/post-inspecao-palavra-objetos.html',
        '/posts/post-inspecao-personagem-three-little-birds.html',
        '/vida/',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — violão (objecto) × passarinho assobiando (diapasão vivo).'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-afinar)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const after = ['skill', 'gesto', 'objetos', 'alegria'];
    upsertGuia(
      items,
      {
        id: 'afinar',
        word: 'afinar',
        simple:
          'A- + fino ← lat. fīnis — pôr no tom; objecto violão; passarinho assobiando como diapasão vivo; desafinar; asoviar = assobiar; Valeu !!!',
        simpleEn:
          'A- + fino ← Lat. fīnis — to tune; guitar object; whistling bird as living pitch; desafinar; asoviar = whistle; Valeu !!!',
        simpleEs:
          'A- + fino ← lat. fīnis — templar; objeto violão; pajarito silbando como diapasón vivo; desafinar; asoviar = silbar; ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href
      },
      after
    );
    upsertGuia(
      items,
      {
        id: 'violao',
        word: 'violão',
        simple:
          'Viola + -ão — objecto BR (guitarra clássica/acústica); ≠ guitarra eléctrica; cordas no braço; afinar = tónos; Valeu !!!',
        simpleEn:
          'Viola + -ão — BR object (classical/acoustic guitar); ≠ electric guitarra; strings on the neck; tuning = tónos; Valeu !!!',
        simpleEs:
          'Viola + -ão — objeto BR (guitarra clásica/acústica); ≠ guitarra eléctrica; cuerdas en el brazo; afinar = tónos; ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-palavra-violao.html'
      },
      ['afinar']
    );
    upsertGuia(
      items,
      {
        id: 'passarinho',
        word: 'passarinho',
        simple:
          'Bicho pequeno; o assobio é diapasão vivo — não aperta cravelha; elo violão / Three Little Birds; ver afinar.',
        simpleEn:
          'Little bird; the whistle is a living tuner — no peg to turn; guitar / Three Little Birds; see afinar.',
        simpleEs:
          'Pájaro chico; el silbido es diapasón vivo — no gira clavija; violão / Three Little Birds; ver afinar.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['violao', 'afinar']
    );
    upsertGuia(
      items,
      {
        id: 'assobiar',
        word: 'assobiar',
        simple:
          'Sopro no bico ou nos lábios — grafia viva asoviar/assoviar; no lab, o passarinho afina sem cravelha; ver afinar.',
        simpleEn:
          'Whistle from beak or lips — oral asoviar; in the lab the bird tunes without a peg; see afinar.',
        simpleEs:
          'Silbar con pico o labios — oral asoviar; el pajarito afina sin clavija; ver afinar.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['passarinho']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (afinar / violão / passarinho / assobiar)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const hrefA = '/posts/post-inspecao-palavra-afinar.html';
    const entries = {
      afinar:
        '    afinar: { tone: "caution", category: "Ofício", mundane: "Pôr no tom; tornar fino; aprimorar.", gloss: "A- + fino ← lat. fīnis — violão (objecto) × passarinho assobiando (diapasão vivo); desafinar; asoviar = assobiar; Valeu !!!", href: "' +
        hrefA +
        '", en: "to tune / refine", es: "afinar / templar", fr: "accorder / affiner", it: "accordare", de: "stimmen", el: "κουρδίζω", la: "temperare", yo: "tún", sw: "kurekebisha sauti", gez: "ʾaqänä", nl: "stemmen", pl: "stroić", ru: "настраивать", uk: "налаштовувати", zh: "调音", ja: "チューニングする", ko: "조율하다", ar: "يدوزن", he: "לכוון", hi: "सुर मिलाना", tr: "akort etmek", sv: "stämma", da: "stemme", no: "stemme", fi: "virittää", cs: "ladit", ro: "acorda", hu: "hangol", ca: "afinar", gl: "afinar", eu: "afinatu", gn: "moĩ porã", qu: "tunay", eo: "agordi", vi: "lên dây", id: "menyetem", th: "ตั้งสาย", hr: "ugoditi", sk: "ladiť", ga: "tiúin", cy: "tiwnio", ha: "daidaita murya", am: "ማስተካከል", fa: "کوک کردن", bn: "সুর করা", zu: "ulungisa" },\n',
      afinado:
        '    afinado: { gloss: "No tom — ver afinar (violão / passarinho).", href: "' +
        hrefA +
        '", en: "in tune", es: "afinado" },\n',
      desafinar:
        '    desafinar: { gloss: "Sair do tom — informação, não fracasso; ver afinar.", href: "' +
        hrefA +
        '", en: "to go out of tune", es: "desafinar" },\n',
      assobiar:
        '    assobiar: { gloss: "Sopro no bico/lábios; asoviar = esta forma; diapasão do passarinho — ver afinar.", href: "' +
        hrefA +
        '", en: "to whistle", es: "silbar", fr: "siffler", it: "fischiare", de: "pfeifen", el: "σφυρίζω", la: "sibilare" },\n',
      assobiando:
        '    assobiando: { gloss: "Gerúndio de assobiar — ver afinar.", href: "' +
        hrefA +
        '", en: "whistling", es: "silbando" },\n',
      assoviar:
        '    assoviar: { gloss: "Variante de assobiar — ver afinar.", href: "' +
        hrefA +
        '", en: "to whistle", es: "silbar" },\n',
      asoviar:
        '    asoviar: { gloss: "Grafia oral de assobiar (pedido de campo) — ver afinar.", href: "' +
        hrefA +
        '", en: "to whistle (oral spelling)", es: "silbar (grafía oral)" },\n',
      asoviando:
        '    asoviando: { gloss: "Gerúndio oral de assobiar — ver afinar.", href: "' +
        hrefA +
        '", en: "whistling (oral)", es: "silbando (oral)" },\n'
    };

    const chain = [
      ['skill', 'afinar'],
      ['afinar', 'afinado'],
      ['afinado', 'desafinar'],
      ['desafinar', 'assobiar'],
      ['assobiar', 'assobiando'],
      ['assobiando', 'assoviar'],
      ['assoviar', 'asoviar'],
      ['asoviar', 'asoviando']
    ];
    for (const [after, key] of chain) {
      if (glossHas(gloss, key)) gloss = replaceGloss(gloss, key, entries[key]);
      else gloss = insertAfterKey(gloss, after, entries[key]);
    }

    if (/    violão: \{ en: 'guitar'/.test(gloss)) {
      gloss = gloss.replace(
        /    violão: \{ en: 'guitar'/,
        '    violão: { gloss: "Objecto de corda — pede afinar; elo passarinho assobiando; ver ficha afinar.", href: "' +
          hrefA +
          '", en: \'guitar\''
      );
    }
    if (/    passarinho: \{ en: 'little bird'/.test(gloss)) {
      gloss = gloss.replace(
        /    passarinho: \{ en: 'little bird'/,
        '    passarinho: { gloss: "Bicho pequeno; o assobio é diapasão vivo — ver afinar.", href: "' +
          hrefA +
          '", en: \'little bird\''
      );
    }

    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (afinar · violão · passarinho · assobiar)');
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
