'use strict';

/**
 * Injeta a palavra variação (VRAIÇÃO / VAIRAÇÃO / VARIAÇAO LEGAL !!!).
 * Uso: node scripts/upsert-palavra-variacao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');
const variacao = require('../lib/variacao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-variacao.html';
const HREF_LEGAL = '/posts/post-inspecao-palavra-legal.html';
const HREF_VALEU = '/posts/post-inspecao-palavra-valeu.html';

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
  writeFileRetrySync(out, buildPostHtml(normalized), 'utf8');
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
    const after = (afterIds || []).map((id) => items.findIndex((x) => x.id === id)).find((n) => n >= 0);
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
  const re = new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n');
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
    'en: "variation", es: "variación", fr: "variation", it: "variazione", de: "Variation", el: "παραλλαγή", la: "variatio", yo: "ìyàtọ̀", sw: "tofauti", nl: "variatie", pl: "wariacja", ru: "вариация", uk: "варіація", zh: "变体", ja: "変奏 / 変異", ko: "변이", ar: "تنويع", he: "וריאציה", hi: "भिन्नता", tr: "varyasyon"';
  const main =
    '    variacao: { tone: "craft", category: "Léxico", mundane: "Mudança de forma sem deixar de ser a peça.", gloss: "Lat. varius / variātiō; bocas VRAIÇÃO × VAIRAÇÃO × VARIAÇAO; é nois; Legal !!! (bacana ≠ lei); Valeu !!!", href: "' +
    HREF +
    '", ' +
    langs +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'variacao', main, 'valeu');
  const aliases = [
    [
      '"variação"',
      '    "variação": { gloss: "Âncora com acento de variação — ver variacao.", href: "' +
        HREF +
        '", en: "variation", es: "variación" },\n'
    ],
    [
      'vraicao',
      '    vraicao: { gloss: "Boca de campo VRAIÇÃO — a variação na própria palavra; ver variacao.", href: "' +
        HREF +
        '", en: "variation (field spelling)", es: "variación (grafía de campo)" },\n'
    ],
    [
      'vairacao',
      '    vairacao: { gloss: "Boca de campo VAIRAÇÃO — ver variacao.", href: "' +
        HREF +
        '", en: "variation (field spelling)", es: "variación (grafía de campo)" },\n'
    ],
    [
      'nois',
      '    nois: { gloss: "Gíria BR de nós — é nois; par de variação; ver variacao.", href: "' +
        HREF +
        '", en: "us (BR slang)", es: "nosotros (jerga BR)" },\n'
    ],
    [
      '"é nois"',
      '    "é nois": { gloss: "É nós na rua — variação é nois; ver variacao.", href: "' +
        HREF +
        '", en: "its us (BR slang)", es: "somos nosotros (BR)" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'variacao');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-variacao-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(variacao.buildVariacaoPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);
  writeHtml(post);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-variacao',
        title: 'Variação — varius; é nois; Legal !!!',
        titleEn: 'Variação — varius; é nois; Legal !!!',
        titleEs: 'Variação — varius; é nois; Legal !!!',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: variação ← lat. varius — VRAIÇÃO × VAIRAÇÃO × VARIAÇAO; é nois; Legal !!! (bacana ≠ lei); Valeu !!!',
        whyEn: 'Words: variação ← Lat. varius — field mouths; é nois; Legal !!! slang ≠ law.',
        whyEs: 'Palabras: variação ← lat. varius — bocas de campo; é nois; Legal !!! bacán ≠ ley.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          HREF_LEGAL,
          HREF_VALEU,
          variacao.WIKT,
          variacao.WIKT_VARIUS,
          '/posts/post-inspecao-palavra-giria.html',
          '/posts/post-inspecao-palavra-boa.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — as bocas de campo são a variação encenada; Legal !!! = gíria.'
      },
      ['palavra-valeu', 'palavra-legal', 'palavra-giria']
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
        id: 'variacao',
        word: 'variação',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        simple:
          'Lat. varius / variātiō — mudar de forma sem deixar de ser a peça. Bocas VRAIÇÃO × VAIRAÇÃO × VARIAÇAO. É nois. Legal !!! = bacana, ≠ lei. Valeu !!!',
        simpleEn:
          'Lat. varius / variātiō — change form without leaving the piece. Mouths VRAIÇÃO × VAIRAÇÃO × VARIAÇAO. É nois. Legal !!! = cool, ≠ law. Valeu !!!',
        simpleEs:
          'Lat. varius / variātiō — cambiar de forma sin dejar la pieza. Bocas VRAIÇÃO × VAIRAÇÃO × VARIAÇAO. É nois. Legal !!! = bacán, ≠ ley. ¡Valeu !!!',
        history:
          'Pedido 2026-08-25: VRAIÇÃO É NOIS VAIRAÇÃO VALEU!!! · VARIAÇAO LEGAL!!!. Âncora variação; o campo encena o étimo.',
        curiosities:
          'Boa!!! já era variação quente de Valeu !!!. Aqui a palavra nomeia o ofício. É nois = é nós. Legal !!! neste pedido não é diploma.',
        historyEn:
          'Field 2026-08-25: VRAIÇÃO É NOIS VAIRAÇÃO VALEU!!! · VARIAÇAO LEGAL!!!. Anchor variação; the field stages the etymon.',
        curiositiesEn:
          'Boa!!! was already a warm variation of Valeu !!!. Here the word names the craft. É nois = it’s us. Legal !!! is not a statute here.',
        historyEs:
          'Pedido 2026-08-25: VRAIÇÃO É NOIS VAIRAÇÃO VALEU!!! · VARIAÇAO LEGAL!!!. Ancla variação; el campo representa el étimo.',
        curiositiesEs:
          'Boa!!! ya era variación cálida de Valeu !!!. Aquí la palabra nombra el oficio. É nois = somos nosotros. Legal !!! no es diploma aquí.'
      },
      ['valeu', 'legal', 'giria']
    );
    upsertItem(
      items,
      {
        id: 'e-nois',
        word: 'é nois',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        simple:
          'Gíria BR de é nós — pertença de grupo. Na ficha variação: a variação é nois. Valeu !!!',
        simpleEn:
          'BR slang for é nós — group belonging. On the variação sheet: the variation is us. Valeu !!!',
        simpleEs:
          'Jerga BR de é nós — pertenencia de grupo. En la ficha variação: la variación es nois. ¡Valeu !!!'
      },
      ['variacao', 'giria']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    writeFileRetrySync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'variacao',
      slug: 'variacao',
      title: 'Variação',
      titleEn: 'Variação',
      titleEs: 'Variação',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — três bocas, a mesma peça; é nois; Legal !!! bacana ≠ lei; Valeu !!!',
      teaserEn: 'BudGanja echo — three mouths, one piece; é nois; Legal !!! cool ≠ law; Valeu !!!',
      teaserEs: 'Eco BudGanja — tres bocas, la misma pieza; é nois; Legal !!! bacán ≠ ley; ¡Valeu !!!',
      body: variacao.poemPt(),
      bodyEn: variacao.poemEn(),
      bodyEs: variacao.poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'variacao', 'e-nois', 'legal']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
