'use strict';

/**
 * Injeta a palavra «feio» na série Palavras (pedido Feio).
 * Uso: node scripts/upsert-palavra-feio-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildFeioPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT
} = require('../lib/feio-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-feio.html';

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

function langsFeio() {
  return 'en: "ugly / unsightly", es: "feo", fr: "laid", it: "brutto", de: "haesslich", el: "asximos", la: "foedus", yo: "ire", sw: "baya / mbaya", gez: "feio", nl: "lelijk", pl: "brzydki", ru: "urodlivyi", uk: "brydkyi", zh: "chou", ja: "minikui", ko: "chu-hada", ar: "qabih", he: "mechoar", hi: "badsoorat", tr: "cirkin", sv: "ful", da: "grim", no: "stygg", fi: "ruma", cs: "osklivy", ro: "urat", hu: "csunya", ca: "lleig", gl: "feo", eu: "itsusi", gn: "vai", qu: "millay", eo: "malbela", vi: "xau", id: "jelek", th: "na-gliat", hr: "ruzan", sk: "skaredy", ga: "gran", cy: "hyll", ha: "mugu", am: "መጥፎ", fa: "zesh", bn: "kutsit", zu: "mubi"';
}

function patchGlossary(gloss) {
  const main =
    '    feio: { tone: "caution", category: "Léxico", mundane: "O que desagrada o olhar; no pátio também que feio! (moral).", gloss: "Lat. foedus (adjectivo, não o tratado); Feio = maiúscula de campo; ≠ feito ≠ Patinho ≠ tempo feio ≠ insulto-manual; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langsFeio() +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'feio', main, 'respeito');
  const aliases = [
    [
      'feia',
      '    feia: { gloss: "Feminino de feio — mesma âncora; ver feio.", href: "' +
        HREF +
        '", en: "ugly (fem.)", es: "fea" },\n'
    ],
    [
      'feiura',
      '    feiura: { gloss: "Nome BR da qualidade — feio + -ura; ver feio.", href: "' +
        HREF +
        '", en: "ugliness", es: "fealdad / feiura" },\n'
    ],
    [
      'fealdade',
      '    fealdade: { gloss: "Irmã culta (via hispânica fealdad); âncora continua feio.", href: "' +
        HREF +
        '", en: "ugliness (learned)", es: "fealdad" },\n'
    ],
    [
      'feo',
      '    feo: { gloss: "Espanhol / galego — mesmo étimo foedus; lema PT feio.", href: "' +
        HREF +
        '", en: "Spanish/Galician feo", es: "feo" },\n'
    ],
    [
      '"que feio"',
      '    "que feio": { gloss: "Sala moral do pátio — vergonha do gesto, não só o olhar; ver feio.", href: "' +
        HREF +
        '", en: "how ugly / shame on you", es: "qué feo" },\n'
    ],
    [
      '"tempo feio"',
      '    "tempo feio": { gloss: "Sala climática — vive na ficha tempo; adjectivo emprestado, não âncora feio.", href: "' +
        HREF +
        '", en: "ugly weather", es: "tiempo feo" },\n'
    ],
    [
      '"patinho feio"',
      '    "patinho feio": { gloss: "Conto — usa a palavra; elo pato; âncora continua feio.", href: "' +
        HREF +
        '", en: "Ugly Duckling", es: "Patito Feo" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'feio');
  }
  return gloss;
}

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-feio-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildFeioPost());
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
        id: 'palavra-feio',
        title: 'Feio — lat. foedus; não o tratado nem o feito',
        titleEn: 'Feio — Lat. foedus; not the treaty and not feito',
        titleEs: 'Feio — lat. foedus; no el tratado ni o feito',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: feio ← lat. foedus (adjectivo); Feio = maiúscula de campo; ≠ feito ≠ Patinho ≠ tempo feio ≠ insulto-manual; Valeu !!!',
        whyEn: 'Words: feio ← Lat. foedus (adjective); Feio = field capital; ≠ feito ≠ Ugly Duckling ≠ ugly weather ≠ insult how-to; Valeu !!!',
        whyEs: 'Palabras: feio ← lat. foedus (adjetivo); Feio = mayúscula de campo; ≠ feito ≠ Patito ≠ tiempo feo ≠ tutorial de insulto; ¡Valeu !!!',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          WIKT,
          'https://en.wiktionary.org/wiki/foedus#Latin',
          '/posts/post-inspecao-palavra-respeito.html',
          '/posts/post-inspecao-palavra-pato.html',
          '/posts/post-inspecao-palavra-tempo.html',
          '/posts/post-inspecao-palavra-pessoas.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — pedido Feio; âncora feio; homónimo tratado cortado.'
      },
      ['palavra-respeito', 'palavra-pessoas', 'palavra-internet']
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
        id: 'feio',
        word: 'feio',
        simple:
          'Lat. foedus (adjectivo) — o que desagrada o olhar; que feio! no pátio. ≠ feito ≠ Patinho ≠ tempo feio ≠ insulto-manual. Valeu !!!',
        simpleEn:
          'Lat. foedus (adjective) — what displeases the eye; yard moral que feio!. ≠ feito ≠ Ugly Duckling ≠ ugly weather ≠ insult how-to. Valeu !!!',
        simpleEs:
          'Lat. foedus (adjetivo) — lo que desagrada la mirada; que feio! en el patio. ≠ feito ≠ Patito ≠ tiempo feo ≠ tutorial de insulto. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Do latim foedus, foeda, foedum «feio, sujo, desairoso» — não o homónimo foedus «tratado» (fidēs). PT ditonga (feio); ES fica feo. Pedido de campo 2026-08-26: inspecao da palavra Feio.',
        curiosities:
          'A orelha cola feio em feito (particípio de fazer). O Patinho Feio usa a palavra; não a é. Tempo feio vive na ficha tempo. Ficha ≠ tutorial de insulto.',
        historyEn:
          'From Latin foedus, foeda, foedum “ugly, foul” — not the homonym foedus “treaty” (fidēs). PT diphthong (feio); ES stays feo. Field 2026-08-26: inspect Feio.',
        curiositiesEn:
          'The ear glues feio to feito (past participle of fazer). The Ugly Duckling uses the word; it is not the word. Ugly weather lives on the tempo sheet. Sheet ≠ insult how-to.',
        historyEs:
          'Del latín foedus, foeda, foedum «feo, sucio» — no el homónimo foedus «tratado» (fidēs). PT diptonga (feio); ES queda feo. Pedido 2026-08-26: inspección de Feio.',
        curiositiesEs:
          'El oído pega feio con feito (participio de fazer). El Patito Feo usa la palabra; no la es. Tiempo feo vive en la ficha tempo. Ficha ≠ tutorial de insulto.'
      },
      ['respeito', 'pessoas', 'internet', 'tempo', 'pato']
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
      id: 'feio',
      slug: 'feio',
      title: 'Feio',
      titleEn: 'Feio',
      titleEs: 'Feio',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — lat. foedus; ≠ feito ≠ tratado ≠ Patinho; Valeu !!!',
      teaserEn: 'BudGanja echo — Lat. foedus; ≠ feito ≠ treaty ≠ duckling; Valeu !!!',
      teaserEs: 'Eco BudGanja — lat. foedus; ≠ feito ≠ tratado ≠ Patito; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'feio', 'foedus', 'respeito', 'palavra']
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
