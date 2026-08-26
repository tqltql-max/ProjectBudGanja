'use strict';

/**
 * Injeta a palavra vinte e dois / 22 → s2.
 * Uso: node scripts/upsert-palavra-vinte-e-dois-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildVinteEDoisPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT
} = require('../lib/vinte-e-dois-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-vinte-e-dois.html';

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
  const main =
    '    "vinte e dois": { tone: "craft", category: "Número", mundane: "Cardinal 22; invertido no primeiro 2 vira s2, o coração de chat.", gloss: "Lat. vīgintī + duo — 22; 2×11; palíndromo; 2 invertido cola no S → s2 ≠ órgão coração ≠ Catch-22; Valeu !!!", href: "' +
    HREF +
    '", en: "twenty-two", es: "veintidós", fr: "vingt-deux", it: "ventidue", de: "zweiundzwanzig", el: "εικοσιδύο", la: "viginti duo", yo: "ogún méjì", sw: "ishirini na mbili", nl: "tweeëntwintig", pl: "dwadzieścia dwa", ru: "двадцать два", uk: "двадцять два", zh: "二十二", ja: "二十二", ko: "스물둘", ar: "اثنان وعشرون", he: "עשרים ושתיים", hi: "बाईस", tr: "yirmi iki", sv: "tjugotvå", pt: "vinte e dois", ca: "vint-i-dos", gl: "vinte e dous", eo: "dudek du" },\n';
  gloss = replaceOrInsertAfter(gloss, '"vinte e dois"', main, 'catorze');
  const aliases = [
    [
      'vinteedois',
      '    vinteedois: { gloss: "Grafia colada de vinte e dois — ver 22.", href: "' +
        HREF +
        '", en: "twenty-two", es: "veintidós" },\n'
    ],
    [
      '"22"',
      '    "22": { gloss: "Algarismo de vinte e dois — 2×11; invertido vira s2; ver ficha.", href: "' +
        HREF +
        '", en: "22", es: "22" },\n'
    ],
    [
      's2',
      '    s2: { gloss: "22 invertido (2→S) — coração de chat BR; ≠ órgão coração ≠ temporada S2; ver vinte e dois.", href: "' +
        HREF +
        '", en: "s2 (BR chat heart)", es: "s2 (corazón de chat)" },\n'
    ],
    [
      '"S2"',
      '    "S2": { gloss: "Maiúscula de s2 — recado de peito *ou* temporada; ver vinte e dois.", href: "' +
        HREF +
        '", en: "S2", es: "S2" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, '"vinte e dois"');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-vinte-e-dois-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildVinteEDoisPost());
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
        id: 'palavra-vinte-e-dois',
        title: '22 — vinte e dois; invertido vira s2',
        titleEn: '22 — vinte e dois; inverted becomes s2',
        titleEs: '22 — vinte e dois; invertido vira s2',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: 22 / vinte e dois (vīgintī + duo); 2×11; inverter 22 → s2 (coração de chat ≠ órgão); ≠ Catch-22.',
        whyEn: 'Words: 22 / vinte e dois; 2×11; invert 22 → s2 (chat heart ≠ organ); ≠ Catch-22.',
        whyEs: 'Palabras: 22 / vinte e dois; 2×11; invertir 22 → s2 (corazón de chat ≠ órgano); ≠ Catch-22.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          '/posts/post-inspecao-palavra-coracao.html',
          '/posts/post-inspecao-palavra-catorze.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — cardinal × inversão s2; poema Vida.'
      },
      ['palavra-catorze', 'palavra-oito', 'palavra-zero']
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
        id: 'vinte-e-dois',
        word: 'vinte e dois',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        simple:
          'Lat. vīgintī + duo — cardinal 22; 2×11; palíndromo; inverter o primeiro 2 cola no S → s2 (coração de chat ≠ órgão); ≠ Catch-22. Valeu !!!',
        simpleEn:
          'Lat. vīgintī + duo — cardinal 22; 2×11; invert first 2 into S → s2 (chat heart ≠ organ); ≠ Catch-22. Valeu !!!',
        simpleEs:
          'Lat. vīgintī + duo — cardinal 22; 2×11; invertir el primer 2 pega en S → s2 (corazón de chat ≠ órgano); ≠ Catch-22. ¡Valeu !!!',
        history:
          'Vinte vem do latim vīgintī; dois vem de duo. No laboratório o 22 é também o par de traços que, invertido, vira o recado s2 do chat brasileiro.',
        curiosities:
          's2 ≈ coração de ecrã (S + 2); Catch-22 é o romance de Heller — outra sala; S2 também é temporada.',
        historyEn:
          'Portuguese vinte e dois comes from Latin vīgintī + duo. In the lab 22 is also the pair of strokes that, inverted, becomes the Brazilian chat note s2.',
        curiositiesEn:
          's2 ≈ on-screen heart (S + 2); Catch-22 is Heller’s novel — another room; S2 is also a season.',
        historyEs:
          'Vinte e dois viene del latín vīgintī + duo. En el laboratorio el 22 es también el par de trazos que, invertido, vira el recado s2 del chat brasileño.',
        curiositiesEs:
          's2 ≈ corazón de pantalla (S + 2); Catch-22 es la novela de Heller — otra sala; S2 también es temporada.'
      },
      ['catorze', 'oito', 'zero']
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
      id: 'vinte-e-dois',
      slug: 'vinte-e-dois',
      title: 'Vinte e dois',
      titleEn: 'Twenty-two',
      titleEs: 'Veintidós',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — 22 em pé, invertido vira s2; o peito do chat sem fundir o órgão; Valeu !!!',
      teaserEn: 'BudGanja echo — 22 standing, inverted it becomes s2; the chat’s chest without fusing the organ; Valeu !!!',
      teaserEs: 'Eco BudGanja — 22 de pie, invertido vira s2; el pecho del chat sin fundir el órgano; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', '22', 'vinte e dois', 's2', 'coração']
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
