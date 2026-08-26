'use strict';

/**
 * Injeta Linha 10 · cerol (calibre de pipa + P de Perigo + pé direito).
 * Uso: node scripts/upsert-palavra-linha-10-cerol-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildLinha10CerolPost,
  poemPt,
  poemEn,
  poemEs,
  WIKI_CEROL,
  WIKT_LINHA
} = require('../lib/linha-10-cerol-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-linha-10-cerol.html';

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
    '    "linha 10": { tone: "caution", category: "Perigo", mundane: "Calibre 10 da linha de pipa BR.", gloss: "Número do fio (≠ CPTM Linha 10 ≠ pé-direito do teto); com cerol = P de Perigo; gatilho contato com objeto cortante · pé direito; ficha ≠ receita; Valeu !!!", href: "' +
    HREF +
    '", en: "kite line 10 (gauge)", es: "línea 10 (calibre de cometa)" },\n';
  gloss = replaceOrInsertAfter(gloss, '"linha 10"', main, 'cerol');
  const aliases = [
    [
      '"linha-10"',
      '    "linha-10": { tone: "caution", gloss: "Grafia hifenizada de linha 10 (calibre de pipa); ver linha 10.", href: "' +
        HREF +
        '", en: "line-10", es: "línea-10" },\n'
    ],
    [
      '"objeto cortante"',
      '    "objeto cortante": { tone: "caution", gloss: "Classe de atendimento (o que corta); nesta ficha o objecto próprio é linha 10 + cerol; pé direito = sítio; ≠ receita ≠ CID; Valeu !!!", href: "' +
        HREF +
        '", en: "cutting object", es: "objeto cortante" },\n'
    ],
    [
      '"pé direito"',
      '    "pé direito": { tone: "caution", gloss: "Pé do lado direito do corpo (gatilho desta ficha); ≠ pé-direito (altura do teto); ≠ CPTM; ver linha 10.", href: "' +
        HREF +
        '", en: "right foot", es: "pie derecho" },\n'
    ],
    [
      '"pé-direito"',
      '    "pé-direito": { gloss: "Arquitectura: altura do piso ao teto — homógrafo de pé direito (corpo); nesta ficha fica na sala cortada; ver linha 10.", href: "' +
        HREF +
        '", en: "ceiling height (storey height)", es: "altura libre (techo)" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, '"linha 10"');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-linha-10-cerol-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildLinha10CerolPost());
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
        id: 'palavra-linha-10-cerol',
        title: 'Linha 10 · Cerol — contato cortante, pé direito',
        titleEn: 'Line 10 · Cerol — cutting contact, right foot',
        titleEs: 'Línea 10 · Cerol — contacto cortante, pie derecho',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: linha 10 (calibre de pipa ≠ CPTM) + cerol; gatilho contato com objeto cortante · pé direito ≠ teto; P de Perigo; ficha ≠ receita.',
        whyEn: 'Words: kite line 10 (≠ train) + cerol; trigger cutting-object contact · right foot ≠ ceiling height; P for Danger; not a recipe.',
        whyEs: 'Palabras: línea 10 (≠ tren) + cerol; gatillo contacto cortante · pie derecho ≠ techo; P de Perigo; no es receta.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKI_CEROL,
          WIKT_LINHA,
          'https://pt.wikipedia.org/wiki/Pipa_(brinquedo)',
          'https://pt.wiktionary.org/wiki/p%C3%A9-direito',
          '/posts/post-inspecao-palavra-cola-colar.html',
          '/posts/post-inspecao-palavra-objetos.html',
          '/posts/post-inspecao-palavra-risco.html',
          '/posts/post-inspecao-expressao-mindinho.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes:
          'Cap. ' +
          post.seriesOrder +
          ' — calibre 10 × cerol × contato pé direito; sem fabrico; pipa sem linha cortante = brinquedo.'
      },
      ['palavra-cola-colar', 'palavra-risco']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const shared = {
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    upsertItem(
      items,
      {
        id: 'linha-10',
        word: 'linha 10',
        simple:
          'Calibre 10 da linha de pipa BR (número do fio). ≠ CPTM Linha 10 ≠ ônibus. Com cerol = P de Perigo. Gatilho: contato com objeto cortante · pé direito. Ficha ≠ receita. Valeu !!!',
        simpleEn:
          'Brazilian kite-string gauge 10. ≠ CPTM Line 10. With cerol = P for Danger. Trigger: contact with a cutting object, right foot. Not a recipe. Valeu !!!',
        simpleEs:
          'Calibre 10 del hilo de cometa BR. ≠ CPTM Línea 10. Con cerol = P de Perigo. Gatillo: contacto con objeto cortante, pie derecho. No es receta. ¡Valeu !!!',
        ...shared,
        history:
          'Na banca da pipa brasileira a linha vende-se com número (4, 6, 8, 10, 12…). Linha 10 é o calibre do fio, não o nome do cerol e não a Linha 10 Turquesa da CPTM.',
        curiosities:
          'O gatilho de campo veio em fala de atendimento: contato com objeto cortante, pé direito. Pé direito = membro; pé-direito (com hífen) = altura do teto. Ficha ≠ CID ≠ receita.',
        historyEn:
          'Brazilian kite shops number cotton line by thickness (4, 6, 8, 10, 12…). Line 10 is the gauge of the string, not the name of cerol and not CPTM Line 10.',
        curiositiesEn:
          'The field trigger arrived in clinic speech: contact with a cutting object, right foot. Right foot = body; pé-direito = ceiling height. Sheet ≠ ICD ≠ recipe.',
        historyEs:
          'En la banca brasileña la línea de cometa se vende con número (4, 6, 8, 10, 12…). Línea 10 es el calibre del hilo, no el nombre del cerol ni la Línea 10 de la CPTM.',
        curiositiesEs:
          'El gatillo de campo llegó en habla de atención: contacto con objeto cortante, pie derecho. Pie derecho = miembro; pé-direito = altura del techo. Ficha ≠ CIE ≠ receta.'
      },
      ['cerol', 'linha-pipa', 'cola']
    );
    upsertItem(
      items,
      {
        id: 'objeto-cortante',
        word: 'objeto cortante',
        simple:
          'Classe de atendimento: o que corta. Nesta ficha o objecto próprio é linha 10 + cerol; o sítio é o pé direito. ≠ faca como definição ≠ receita. Valeu !!!',
        simpleEn:
          'Clinic class: that which cuts. On this sheet the proper object is line 10 + cerol; the site is the right foot. ≠ knife-as-definition ≠ recipe. Valeu !!!',
        simpleEs:
          'Clase de atención: lo que corta. En esta ficha el objeto propio es línea 10 + cerol; el sitio es el pie derecho. ≠ cuchillo como definición ≠ receta. ¡Valeu !!!',
        ...shared
      },
      ['linha-10']
    );
    upsertItem(
      items,
      {
        id: 'pe-direito-corpo',
        word: 'pé direito',
        simple:
          'Pé do lado direito do corpo (gatilho desta ficha). ≠ pé-direito (altura do teto). Caso irmão: pé esquerdo × escada (mindinho). Valeu !!!',
        simpleEn:
          'Right foot of the body (this sheet’s trigger). ≠ pé-direito (ceiling height). Sister case: left foot × stairs (mindinho). Valeu !!!',
        simpleEs:
          'Pie derecho del cuerpo (gatillo de esta ficha). ≠ pé-direito (altura del techo). Caso hermano: pie izquierdo × escalera (mindinho). ¡Valeu !!!',
        ...shared
      },
      ['objeto-cortante', 'linha-10']
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
      id: 'linha-10-cerol',
      slug: 'linha-10-cerol',
      title: 'Linha 10 · Cerol',
      titleEn: 'Line 10 · Cerol',
      titleEs: 'Línea 10 · Cerol',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o número do fio, o P na rua, o pé direito; Valeu !!!',
      teaserEn: 'BudGanja echo — the number of the string, the P in the street, the right foot; Valeu !!!',
      teaserEs: 'Eco BudGanja — el número del hilo, la P en la calle, el pie derecho; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'linha 10', 'cerol', 'pipa', 'perigo']
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
