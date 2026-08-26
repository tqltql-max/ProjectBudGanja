'use strict';

/**
 * Injeta a palavra Maria cruzada com for (para).
 * Uso: node scripts/upsert-palavra-maria-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildMariaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_MARIA,
  WIKT_FOR_EN,
  WIKT_FOR_PT,
  WIKT_PARA,
  WIKT_MIRYAM,
  WIKT_FORMARIA
} = require('../lib/maria-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-maria.html';

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
  const langs =
    'en: "Mary / Maria", es: "María", fr: "Marie", it: "Maria", de: "Maria", el: "Μαρία", la: "Maria", yo: "Maria", sw: "Maria", gez: "Māryām", nl: "Maria", pl: "Maria", ru: "Мария", uk: "Марія", zh: "玛丽亚", ja: "マリア", ko: "마리아", ar: "مريم", he: "מרים", hi: "मारिया", tr: "Meryem", sv: "Maria", da: "Maria", no: "Maria", fi: "Maria", cs: "Marie", ro: "Maria", hu: "Mária", ca: "Maria", gl: "María", eu: "Maria", gn: "Maria", qu: "Mariya", eo: "Maria", vi: "Maria", id: "Maria", th: "มาเรีย", hr: "Marija", sk: "Mária", ga: "Máire", cy: "Mair", ha: "Maryamu", am: "ማርያም", fa: "ماریا", bn: "মারিয়া", zu: "uMaria"';
  const main =
    '    maria: { tone: "craft", category: "Léxico", mundane: "Nome próprio feminino — hebr. Miryam via lat. Maria.", gloss: "Hebr. Miryam → lat. Maria; cruzada com for (EN for ≈ PT para — a partícula aponta); ≠ for conjuntivo ≠ formaria ≠ marijuana; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langs +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'maria', main, 'mãe');
  const aliases = [
    [
      '"for"',
      '    "for": { tone: "craft", category: "Léxico", mundane: "EN preposição de destino; PT homógrafo = conjuntivo de ser/ir.", gloss: "EN for ≈ PT para — aponta a Maria nesta ficha; ≠ PT for (ser/ir) ≠ formaria ≠ por; Valeu !!!", href: "' +
        HREF +
        '", en: "for", es: "para / por (según sala)", fr: "pour", it: "per", de: "für", el: "για", la: "pro / ad", yo: "fún", sw: "kwa", gez: "la-", nl: "voor", pl: "dla", ru: "для", uk: "для", zh: "为了", ja: "のために", ko: "위하여", ar: "لـ", he: "עבור", hi: "के लिए", tr: "için" },\n'
    ],
    [
      'para',
      '    para: { gloss: "Irmã PT de EN for (destino / beneficiário); nesta ficha aponta a Maria; ≠ por; ver maria.", href: "' +
        HREF +
        '", en: "to / for (destination)", es: "para" },\n'
    ],
    [
      'formaria',
      '    formaria: { gloss: "Condicional de formar (lat. fōrmāre) — cola de orelha com for+Maria; não é composto; ver maria.", href: "' +
        HREF +
        '", en: "would form (not for+Maria)", es: "formaría (cola, no compuesto)" },\n'
    ],
    [
      'miryam',
      '    miryam: { gloss: "Hebr. מִרְיָם — âncora de Maria; miolo interno aberto; ver maria.", href: "' +
        HREF +
        '", en: "Miryam / Miriam", es: "Miryam / Miriam" },\n'
    ],
    [
      'miriam',
      '    miriam: { gloss: "Forma EN/internacional de Miryam — ver maria.", href: "' +
        HREF +
        '", en: "Miriam", es: "Miriam" },\n'
    ],
    [
      'forem',
      '    forem: { gloss: "3.ª pl. do futur. conjuntivo de ser/ir — sala B da ficha maria (homógrafo for).", href: "' +
        HREF +
        '", en: "if they are / go (PT subjunctive)", es: "si fueren / fueren" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'maria');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-maria-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildMariaPost());
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
        id: 'palavra-maria',
        title: 'Maria — Miryam; cruzada com for (para)',
        titleEn: 'Maria — Miryam; crossed with for (para)',
        titleEs: 'Maria — Miryam; cruzada con for (para)',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: Maria (hebr. Miryam → lat. Maria) × for (EN for ≈ PT para); ≠ conjuntivo ≠ formaria ≠ marijuana.',
        whyEn: 'Words: Maria (Heb. Miryam → Lat. Maria) × for (EN for ≈ PT para); ≠ subjunctive ≠ formaria ≠ marijuana.',
        whyEs: 'Palabras: Maria (hebr. Miryam → lat. Maria) × for (EN for ≈ PT para); ≠ conjuntivo ≠ formaria ≠ marijuana.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT_MARIA,
          WIKT_MIRYAM,
          WIKT_FOR_EN,
          WIKT_FOR_PT,
          WIKT_PARA,
          WIKT_FORMARIA,
          '/posts/post-inspecao-personagem-dona-maria.html',
          '/posts/post-inspecao-palavra-mae.html',
          '/posts/post-inspecao-palavra-marijuana.html',
          '/posts/post-inspecao-palavra-conjugacao.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — aterra em Maria; for aponta (para); homógrafo e formaria cortados.'
      },
      ['palavra-mae', 'palavra-marijuana', 'palavra-conjugacao']
    );
    upsertItem(
      items,
      {
        id: 'palavra-for',
        title: 'for — para; cruzado na ficha Maria',
        titleEn: 'for — para; crossed in the Maria sheet',
        titleEs: 'for — para; cruzado en la ficha Maria',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'EN for ≈ PT para (destino); homógrafo PT = conjuntivo de ser/ir; cola formaria cortada; ver Maria.',
        whyEn: 'EN for ≈ PT para (destination); PT homograph = ser/ir subjunctive; formaria glue cut; see Maria.',
        whyEs: 'EN for ≈ PT para (destino); homógrafo PT = subjuntivo de ser/ir; cola formaria cortada; ver Maria.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [HREF, WIKT_FOR_EN, WIKT_FOR_PT, WIKT_PARA],
        notes: 'Cap. ' + post.seriesOrder + ' — mesma ficha que Maria.'
      },
      ['palavra-maria']
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
        id: 'maria',
        word: 'Maria',
        simple:
          'Hebr. Miryam → lat. Maria. Cruzada com for (EN for ≈ PT para: a partícula aponta). ≠ for conjuntivo ≠ formaria ≠ marijuana. Valeu !!!',
        simpleEn:
          'Heb. Miryam → Lat. Maria. Crossed with for (EN for ≈ PT para: the particle points). ≠ subjunctive for ≠ formaria ≠ marijuana. Valeu !!!',
        simpleEs:
          'Hebr. Miryam → lat. Maria. Cruzada con for (EN for ≈ PT para: la partícula apunta). ≠ for conjuntivo ≠ formaria ≠ marijuana. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Maria vem do hebraico Miryam, pelo grego Μαρία / Μαριάμ e o latim Maria. A rota é estável; o miolo hebraico (amada / amarga / outro) permanece aberto. O pedido cruze para maria lê o inglês for como a preposição que aponta — irmã portuguesa para, não por.',
        curiosities:
          'A orelha cola for+Maria em formaria (condicional de formar). O for português (quando eu for) é homógrafo: futuro do conjuntivo de ser e ir. Marijuana e Dona Maria são salas vizinhas, não étimos.',
        historyEn:
          'Maria comes from Hebrew Miryam via Greek Μαρία / Μαριάμ and Latin Maria. The path is stable; the inner Hebrew etymon stays open. Cross toward maria reads English for as the pointing preposition — Portuguese sister para, not por.',
        curiositiesEn:
          'The ear glues for+Maria into formaria (conditional of formar). Portuguese for (quando eu for) is a homograph: future subjunctive of ser and ir. Marijuana and Dona Maria are neighbouring rooms, not etymons.',
        historyEs:
          'Maria viene del hebreo Miryam, por el griego y el latín Maria. La ruta es estable; el meollo hebreo queda abierto. Cruza hacia maria lee el inglés for como la preposición que apunta — hermana portuguesa para, no por.',
        curiositiesEs:
          'El oído pega for+Maria en formaria (condicional de formar). El for portugués es homógrafo: subjuntivo de ser e ir. Marijuana y Dona Maria son salas vecinas, no étimos.'
      },
      ['mae', 'marijuana', 'conjugacao']
    );
    upsertItem(
      items,
      {
        id: 'for',
        word: 'for',
        simple:
          'EN for ≈ PT para — aponta (nesta ficha: para Maria). Homógrafo PT = conjuntivo de ser/ir. ≠ formaria ≠ por. Valeu !!!',
        simpleEn:
          'EN for ≈ PT para — it points (in this sheet: to Maria). PT homograph = ser/ir subjunctive. ≠ formaria ≠ por. Valeu !!!',
        simpleEs:
          'EN for ≈ PT para — apunta (en esta ficha: a Maria). Homógrafo PT = subjuntivo de ser/ir. ≠ formaria ≠ por. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['maria']
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
      id: 'maria',
      slug: 'maria',
      title: 'Maria',
      titleEn: 'Maria',
      titleEs: 'Maria',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — Miryam; cruzada com for (para); a partícula aponta; Valeu !!!',
      teaserEn: 'BudGanja echo — Miryam; crossed with for (para); the particle points; Valeu !!!',
      teaserEs: 'Eco BudGanja — Miryam; cruzada con for (para); la partícula apunta; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'maria', 'for', 'para']
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
