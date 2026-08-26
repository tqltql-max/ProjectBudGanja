'use strict';

/**
 * Injeta a palavra ramela (ramelento ≠ remo lento).
 * Uso: node scripts/upsert-palavra-ramela-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildRamelaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_RAMELA,
  WIKT_REMELA,
  WIKT_REMELA_EN,
  WIKT_RAMELENTO,
  WIKT_REMO,
  WIKT_LENTUS,
  AULETE_REMELA
} = require('../lib/ramela-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-ramela.html';

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
    '    ramela: { tone: "craft", category: "Léxico", mundane: "Secreção no canto do olho depois do sono; também remela.", gloss: "Ramela / remela (origem obscura) × ramelento (ramela + -ento) ≠ remo lento (lat. rēmus × lentus); Valeu !!!", href: "' +
    HREF +
    '", en: "rheum / sleep (eye)", es: "lagaña", fr: "chassie", it: "cispa", de: "Augenbutter", el: "κρίθη ματιού", la: "rheuma oculi", yo: "ìmí ojú", sw: "usingizi wa jicho", gez: "ramela", nl: "oogvuil", pl: "śpioch (oko)", ru: "глазной гной", uk: "сон в оці", zh: "眼屎", ja: "目やに", ko: "눈곱", ar: "رمص", he: "ליחה בעין", hi: "कीचड़ आँख", tr: "göz çapağı", sv: "ögonfrass", da: "øjenvrag", no: "øyesøvn", fi: "unihiekka", cs: "oční maz", ro: "lipici la ochi", hu: "szemgödörváladék", ca: "lleganya", gl: "remela", eu: "lo-malko", gn: "tesa tỹi", qu: "ñawi qhilli", eo: "okula krosto", vi: "ghèn mắt", id: "tahi mata", th: "ขี้ตา", hr: "san u oku", sk: "očný maz", ga: "súil-chodladh", cy: "cwd cwsg", ha: "kashin ido", am: "የዓይን ክስተት", fa: "خواب چشم", bn: "চোখের ময়লা", zu: "ubuthongo beso" },\n';
  gloss = replaceOrInsertAfter(gloss, 'ramela', main, 'rem');
  const aliases = [
    [
      'remela',
      '    remela: { gloss: "Lema irmão de ramela — secreção do canto do olho; origem obscura; ≠ remo; ver ramela.", href: "' +
        HREF +
        '", en: "rheum / sleep (eye)", es: "lagaña" },\n'
    ],
    [
      'ramelento',
      '    ramelento: { gloss: "Ramela + -ento — quem tem ramela; figurado vagaroso; ≠ remo lento; ver ramela.", href: "' +
        HREF +
        '", en: "rheumy / sluggish (from ramela)", es: "lagañoso" },\n'
    ],
    [
      'remelento',
      '    remelento: { gloss: "Variante de ramelento — remela + -ento; ≠ remo lento; ver ramela.", href: "' +
        HREF +
        '", en: "rheumy (remelento)", es: "lagañoso" },\n'
    ],
    [
      'remeloso',
      '    remeloso: { gloss: "O mesmo que ramelento / remelado — provido de remela; ver ramela.", href: "' +
        HREF +
        '", en: "rheumy", es: "lagañoso" },\n'
    ],
    [
      '"remo lento"',
      '    "remo lento": { gloss: "Sintagma náutico — remo (rēmus) + lento (lentus); cola de orelha com ramelento; ver ramela e remo.", href: "' +
        HREF +
        '", en: "slow oar", es: "remo lento" },\n'
    ],
    [
      'remelar',
      '    remelar: { gloss: "Verbo de remela — tirar a secreção; regional: demorar-se; ver ramela.", href: "' +
        HREF +
        '", en: "to wipe rheum / to dawdle (regional)", es: "quitar lagaña / entretenerse" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'ramela');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-ramela-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildRamelaPost());
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
        id: 'palavra-ramela',
        title: 'Ramela — ramelento ≠ remo lento',
        titleEn: 'Ramela — ramelento ≠ remo lento (slow oar)',
        titleEs: 'Ramela — ramelento ≠ remo lento',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: ramela / remela (canto do olho; origem obscura) × ramelento (ramela + -ento) ≠ remo lento (rēmus × lentus).',
        whyEn: 'Words: ramela / remela (eye rheum; obscure origin) × ramelento (ramela + -ento) ≠ remo lento (rēmus × lentus).',
        whyEs: 'Palabras: ramela / remela (lagaña; origen oscuro) × ramelento (ramela + -ento) ≠ remo lento (rēmus × lentus).',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT_RAMELA,
          WIKT_REMELA,
          WIKT_REMELA_EN,
          WIKT_RAMELENTO,
          WIKT_REMO,
          WIKT_LENTUS,
          AULETE_REMELA,
          '/posts/post-inspecao-palavra-remo.html',
          '/posts/post-inspecao-palavra-olho.html',
          '/posts/post-inspecao-palavra-sinais-rem.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes:
          'Cap. ' +
          post.seriesOrder +
          ' — ramela × ramelento; cola remo lento cortada; étimo de remela aberto.'
      },
      ['palavra-remo', 'palavra-olho', 'palavra-sinais-rem']
    );
    upsertItem(
      items,
      {
        id: 'palavra-ramelento',
        title: 'Ramelento — ramela + -ento; cola remo lento',
        titleEn: 'Ramelento — ramela + -ento; glue remo lento',
        titleEs: 'Ramelento — ramela + -ento; cola remo lento',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: ramelento = ramela + -ento; a orelha cola remo lento; ver ficha ramela.',
        whyEn: 'Words: ramelento = ramela + -ento; the ear glues remo lento; see ramela.',
        whyEs: 'Palabras: ramelento = ramela + -ento; el oído pega remo lento; ver ramela.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [HREF, WIKT_RAMELENTO],
        notes: 'Cap. ' + post.seriesOrder + ' — mesma ficha que ramela.'
      },
      ['palavra-ramela']
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
        id: 'ramela',
        word: 'ramela',
        simple:
          'Secreção no canto do olho (também remela; origem obscura). Ramelento = ramela + -ento. ≠ remo lento (rēmus × lentus). Valeu !!!',
        simpleEn:
          'Rheum in the eye corner (also remela; obscure origin). Ramelento = ramela + -ento. ≠ remo lento (rēmus × lentus). Valeu !!!',
        simpleEs:
          'Lagaña en el rincón del ojo (también remela; origen oscuro). Ramelento = ramela + -ento. ≠ remo lento (rēmus × lentus). ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Ramela e remela são variantes vivas da mesma secreção ocular. O Aulete marca origem obscura; o Wiktionary inglês diz unknown, com cognato galego remela. Vias folclóricas (diminutivo de remo / lat. mucilla) colam no ouvido e falham no étimo. Ramelento é ramela + sufixo -ento (provido de).',
        curiosities:
          'A orelha cola ramelento em remo lento: quatro sílabas quase iguais. Remo é lat. rēmus (a pá); lento é lat. lentus. Quem acorda com ramela rema devagar sem ser remo. No AL, ramela/remela também nomeia a polpa tenra do coco verde.',
        historyEn:
          'Ramela and remela are living variants of the same eye rheum. Aulete marks the origin obscure; English Wiktionary says unknown, with Galician cognate remela. Folk paths (diminutive of remo / Lat. mucilla) glue in the ear and fail as etymon. Ramelento is ramela + suffix -ento (provided with).',
        curiositiesEn:
          'The ear glues ramelento to remo lento: almost the same four syllables. Remo is Lat. rēmus (the oar); lento is Lat. lentus. Whoever wakes with ramela rows slowly without being an oar. In Alagoas the word also names tender green-coconut pulp.',
        historyEs:
          'Ramela y remela son variantes vivas de la misma lagaña. Aulete marca origen oscuro; el Wiktionary inglés dice unknown, con cognado gallego remela. Vías folclóricas (diminutivo de remo / lat. mucilla) pegan en el oído y fallan como étimo. Ramelento es ramela + sufijo -ento.',
        curiositiesEs:
          'El oído pega ramelento a remo lento: casi las mismas cuatro sílabas. Remo es lat. rēmus (la pala); lento es lat. lentus. Quien despierta con ramela rema despacio sin ser remo. En Alagoas la palabra también nombra la pulpa tierna del coco verde.'
      },
      ['remo', 'olho', 'sinais-rem']
    );
    upsertItem(
      items,
      {
        id: 'ramelento',
        word: 'ramelento',
        simple:
          'Ramela + -ento — quem tem ramela; figurado vagaroso. A orelha cola remo lento; o étimo corta. Ver ramela. Valeu !!!',
        simpleEn:
          'Ramela + -ento — having rheum; figuratively sluggish. The ear glues remo lento; the etymon cuts. See ramela. Valeu !!!',
        simpleEs:
          'Ramela + -ento — quien tiene ramela; figurado perezoso al despertar. El oído pega remo lento; el étimo corta. Ver ramela. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['ramela']
    );
    upsertItem(
      items,
      {
        id: 'remela',
        word: 'remela',
        simple:
          'Lema irmão de ramela — secreção do canto do olho; origem obscura. ≠ diminutivo de remo. Ver ramela. Valeu !!!',
        simpleEn:
          'Lemma twin of ramela — eye rheum; obscure origin. ≠ diminutive of remo. See ramela. Valeu !!!',
        simpleEs:
          'Lema hermano de ramela — lagaña; origen oscuro. ≠ diminutivo de remo. Ver ramela. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['ramela']
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
      id: 'ramela',
      slug: 'ramela',
      title: 'Ramela',
      titleEn: 'Ramela',
      titleEs: 'Ramela',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — ramela no canto do olho; ramelento ≠ remo lento; Valeu !!!',
      teaserEn: 'BudGanja echo — ramela in the eye corner; ramelento ≠ remo lento; Valeu !!!',
      teaserEs: 'Eco BudGanja — ramela en el rincón del ojo; ramelento ≠ remo lento; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'ramela', 'ramelento', 'remo']
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
