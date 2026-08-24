'use strict';

/**
 * Injeta a palavra miss (germ. missan) cruzada com faltando e ERROR.
 * Uso: node scripts/upsert-palavra-miss-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildMissPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_MISS,
  WIKT_FALTAR,
  WIKT_ERROR
} = require('../lib/miss-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-miss.html';

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
    '    miss: { tone: "caution", category: "Léxico", mundane: "EN — falhar o alvo; sentir a falta; título Miss é outra árvore.", gloss: "Germ. missan (falhar o alvo) × lat. fallere (faltando) × lat. errāre (ERROR); três árvores, um campo; I miss you ≠ 500; ≠ título Miss; Valeu !!!", href: "' +
    HREF +
    '", en: "miss (fail to hit / feel absence)", es: "fallar / extrañar", fr: "manquer", it: "mancare / fallire", de: "verfehlen / vermissen", el: "αστοχώ / νοσταλγώ", la: "aberrare / desiderare", yo: "kùnà / ṣàìrí", sw: "kukosa", gez: "täḵəśəʼä", nl: "missen", pl: "chybić / tęsknić", ru: "промах / скучать", uk: "промах / сумувати", zh: "未击中 / 想念", ja: "外す / 恋しい", ko: "빗나가다 / 그립다", ar: "أخطأ / اشتاق", he: "להחטיא / להתגעגע", hi: "चूकना / याद आना", tr: "ıskalamak / özlemek", sv: "missa / sakna", da: "misse / savne", no: "bombe / savne", fi: "ohittaa / kaivata", cs: "minout / stýskat se", ro: "a rata / a-ți fi dor", hu: "elhibázni / hiányolni", ca: "fallar / enyorar", gl: "fallar / botar de menos", eu: "huts egin / falta izan", gn: "jejavy / heka", qu: "pantay / missing", eo: "maltrafi / sopiri", vi: "trượt / nhớ", id: "meleset / rindu", th: "พลาด / คิดถึง", hr: "promašiti / nedostajati", sk: "minúť / chýbať", ga: "teip / airím uaim", cy: "methu / hiraethu", ha: "kuskure / kewa", am: "ማጣት", fa: "از دست دادن / دلتنگ", bn: "মিস / মনে পড়া", zu: "phutha / khumbula" },\n';
  gloss = replaceOrInsertAfter(gloss, 'miss', main, 'buguei');
  const aliases = [
    [
      'missing',
      '    missing: { gloss: "EN — ausente do conjunto; PT faltando (fallere); ≠ ERROR 500; ver miss.", href: "' +
        HREF +
        '", en: "missing", es: "faltando / ausente" },\n'
    ],
    [
      '"i miss you"',
      '    "i miss you": { gloss: "Sentir a falta — peito, não log; PT fazes-me falta / saudades; ≠ está faltando você; ver miss.", href: "' +
        HREF +
        '", en: "I miss you", es: "te extraño" },\n'
    ],
    [
      'faltando',
      '    faltando: { gloss: "Gerúndio de faltar ← lat. fallere; estado do que não está; 404; ≠ I miss you; ver miss.", href: "' +
        HREF +
        '", en: "missing / lacking", es: "faltando" },\n'
    ],
    [
      'faltar',
      '    faltar: { gloss: "Verbo de faltando — lat. fallere (falhar, enganar); primo de fail/false; ver miss.", href: "' +
        HREF +
        '", en: "to lack / to be missing", es: "faltar" },\n'
    ],
    [
      'falta',
      '    falta: { gloss: "Nome de faltar — carência, ou infração no desporto (outra sala); ver miss.", href: "' +
        HREF +
        '", en: "lack / foul", es: "falta" },\n'
    ],
    [
      'error',
      '    error: { gloss: "Lat. error ← errāre (vagar); nome do desvio; caps ERROR = grito do log; ≠ miss ≠ 404; ver miss.", href: "' +
        HREF +
        '", en: "error", es: "error" },\n'
    ],
    [
      'erro',
      '    erro: { gloss: "PT de error ← errāre; errar o alvo junta miss+error num verbo; ver miss.", href: "' +
        HREF +
        '", en: "error / mistake", es: "error" },\n'
    ],
    [
      'errar',
      '    errar: { gloss: "Verbo de errāre — vagar / errar o alvo; cruzamento PT de miss e ERROR; ver miss.", href: "' +
        HREF +
        '", en: "to err / to miss the target", es: "errar" },\n'
    ],
    [
      '"cache miss"',
      '    "cache miss": { gloss: "A caixa não tinha o alvo — ofício normal; ≠ ERROR 500; ver miss.", href: "' +
        HREF +
        '", en: "cache miss", es: "fallo de caché" },\n'
    ],
    [
      '"miss (título)"',
      '    "miss (título)": { gloss: "Tratamento EN ← mistress / magister — outra árvore; não o verbo miss; ver miss.", href: "' +
        HREF +
        '", en: "Miss (title)", es: "señorita (título)" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'miss');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-miss-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildMissPost());
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
        id: 'palavra-miss',
        title: 'Miss — falhar o alvo; cruzado com faltando e ERROR',
        titleEn: 'Miss — fail to hit; crossed with faltando and ERROR',
        titleEs: 'Miss — fallar el blanco; cruzado con faltando y ERROR',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: miss (germ. missan) × faltando (lat. fallere) × ERROR (lat. errāre) — três árvores, um campo; I miss you ≠ 500.',
        whyEn: 'Words: miss (Gmc missan) × faltando (Lat. fallere) × ERROR (Lat. errāre) — three trees; I miss you ≠ 500.',
        whyEs: 'Palabras: miss (germ. missan) × faltando (lat. fallere) × ERROR (lat. errāre) — tres árboles; I miss you ≠ 500.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT_MISS,
          WIKT_FALTAR,
          WIKT_ERROR,
          'https://en.wiktionary.org/wiki/erro#Latin',
          'https://en.wiktionary.org/wiki/fallo#Latin',
          '/posts/post-inspecao-palavra-buguei.html',
          '/posts/post-inspecao-palavra-backspace.html',
          '/posts/post-inspecao-palavra-exit.html',
          '/posts/post-inspecao-palavra-caminho.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — miss × faltando × ERROR; três árvores; título Miss cortado.'
      },
      ['palavra-buguei', 'palavra-backspace', 'palavra-exit']
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
        id: 'miss',
        word: 'miss',
        simple:
          'EN germ. missan — falhar o alvo e sentir a falta. Cruzado com faltando (lat. fallere) e ERROR (lat. errāre): três árvores, um campo. I miss you ≠ 500. Título Miss (mistress) é outra sala. Valeu !!!',
        simpleEn:
          'EN Gmc missan — fail to hit and feel the absence. Crossed with faltando (Lat. fallere) and ERROR (Lat. errāre): three trees, one field. I miss you ≠ 500. Title Miss is another room. Valeu !!!',
        simpleEs:
          'EN germ. missan — fallar el blanco y sentir la falta. Cruzado con faltando (lat. fallere) y ERROR (lat. errāre): tres árboles, un campo. I miss you ≠ 500. Título Miss es otra sala. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Miss (verbo) vem do inglês antigo missan, germânico «falhar o alvo». I miss you é a mesma árvore (notar a ausência). O título Miss vem de mistress/magister — outra raiz. Faltando é gerúndio de faltar, latim fallere (falhar, enganar), primo de fail/false. ERROR vem de errāre (vagar fora da via). Em português, errar o alvo já junta miss e error num só verbo latino — cruzamento de ofício, não de sangue.',
        curiosities:
          'Cache miss muitas vezes é ofício normal (a caixa não tinha). 404 é faltando; 500 é ERROR. «Está faltando você» como calco de I miss you trata a pessoa como peça; o nativo é fazes-me falta / estou com saudades. Falta no desporto é outra sala.',
        historyEn:
          'Miss (verb) is Old English missan, Germanic “fail to hit”. I miss you is the same tree (noticing absence). The title Miss is from mistress/magister — another root. Faltando is the gerund of faltar, Latin fallere (fail, deceive), cousin of fail/false. ERROR is from errāre (wander off the path). Portuguese errar o alvo already joins miss and error in one Latin verb — office, not blood.',
        curiositiesEn:
          'A cache miss is often normal office (the box did not hold the target). 404 is missing; 500 is ERROR. “Está faltando você” as a calque of I miss you treats the person as a missing part; native PT puts the lack in the chest. Sports falta is another room.',
        historyEs:
          'Miss (verbo) viene del inglés antiguo missan, germánico «fallar el blanco». I miss you es el mismo árbol. El título Miss viene de mistress/magister — otra raíz. Faltando es gerundio de faltar, latín fallere. ERROR viene de errāre. En portugués, errar o alvo ya junta miss y error en un verbo latino.',
        curiositiesEs:
          'Un cache miss suele ser oficio normal. 404 es faltando; 500 es ERROR. «Está faltando você» como calco de I miss you trata a la persona como pieza; lo nativo es fazes-me falta. Falta de deporte es otra sala.'
      },
      ['buguei', 'backspace', 'exit']
    );
    upsertItem(
      items,
      {
        id: 'faltando',
        word: 'faltando',
        simple:
          'Gerúndio de faltar ← lat. fallere — o estado do que não está no conjunto. Cruzado com miss e ERROR. ≠ I miss you. Valeu !!!',
        simpleEn:
          'Gerund of faltar ← Lat. fallere — the state of what is not in the set. Crossed with miss and ERROR. ≠ I miss you. Valeu !!!',
        simpleEs:
          'Gerundio de faltar ← lat. fallere — el estado de lo que no está en el conjunto. Cruzado con miss y ERROR. ≠ I miss you. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['miss']
    );
    upsertItem(
      items,
      {
        id: 'error',
        word: 'ERROR',
        simple:
          'Lat. error ← errāre — o nome do desvio; caps-lock do log. Cruzado com miss e faltando. 500 ≠ 404 ≠ cache miss. Valeu !!!',
        simpleEn:
          'Lat. error ← errāre — the name of the wander; log caps-lock. Crossed with miss and faltando. 500 ≠ 404 ≠ cache miss. Valeu !!!',
        simpleEs:
          'Lat. error ← errāre — el nombre del desvío; mayúsculas del log. Cruzado con miss y faltando. 500 ≠ 404 ≠ cache miss. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['miss', 'faltando']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    let last;
    for (let i = 0; i < 8; i += 1) {
      try {
        fs.writeFileSync(GLOSS_FILE, gloss);
        last = null;
        break;
      } catch (e) {
        last = e;
        await sleep(300 * (i + 1));
      }
    }
    if (last) throw last;
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'miss',
      slug: 'miss',
      title: 'Miss',
      titleEn: 'Miss',
      titleEs: 'Miss',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — falhar o alvo; cruzado com faltando e ERROR; três árvores, um campo; Valeu !!!',
      teaserEn: 'BudGanja echo — fail to hit; crossed with faltando and ERROR; three trees, one field; Valeu !!!',
      teaserEs: 'Eco BudGanja — fallar el blanco; cruzado con faltando y ERROR; tres árboles, un campo; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'miss', 'faltando', 'error']
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
