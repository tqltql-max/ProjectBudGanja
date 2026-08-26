'use strict';

/**
 * Injeta a palavra «fantasia» na série Palavras.
 * Uso: node scripts/upsert-palavra-fantasia-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildFantasiaPost,
  poemPt,
  poemEn,
  poemEs
} = require('../lib/fantasia-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-fantasia.html';

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

const FANTASIA_LINE =
  '    fantasia: { tone: "craft", category: "Imaginação", mundane: "Faculdade de imaginar (gr. phantasía); também fato de Carnaval.", gloss: "Substantivo — phantasía; ≠ fantástico (elogio) ≠ fantasioso ≠ Disney ≠ fantasma; Valeu !!!", href: "' +
  HREF +
  '", en: "fantasy / fancy / costume", es: "fantasía / disfraz", fr: "fantaisie", it: "fantasia", de: "Fantasie", el: "φαντασία", la: "phantasia", yo: "ìrò", sw: "njozi", gez: "fantasía", nl: "fantasie", pl: "fantazja", ru: "фантазия", uk: "фантазія", zh: "幻想", ja: "空想", ko: "공상", ar: "خيال", he: "דמיון", hi: "कल्पना", tr: "hayal", sv: "fantasi", da: "fantasi", no: "fantasi", fi: "fantasia", cs: "fantazie", ro: "fantezie", hu: "fantázia", ca: "fantasia", gl: "fantasia", eu: "fantasia", gn: "fantasia", qu: "musquy", eo: "fantazio", vi: "tưởng tượng", id: "fantasi", th: "จินตนาการ", hr: "fantazija", sk: "fantázia", ga: "fantaisíocht", cy: "ffantasi", ha: "tunani", am: "ምናብ", fa: "فانتزی", bn: "কল্পনা", zu: "umcabango" },';

function replaceOrInsertBefore(gloss, key, line, beforeKey) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line + '\n');
  const beforeRe = new RegExp(
    '(    ' + beforeKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{)'
  );
  if (beforeRe.test(gloss)) return gloss.replace(beforeRe, line + '\n$1');
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  gloss = replaceOrInsertBefore(gloss, 'fantasia', FANTASIA_LINE, 'fantástico');
  const aliases = [
    '    "roupa de fantasia": { gloss: "Fato / Carnaval — um uso BR de fantasia, não o étimo inteiro; ver fantasia.", href: "' +
      HREF +
      '", en: "costume", es: "disfraz" },',
    '    "fantasia de carnaval": { gloss: "Sala da roupa — ver fantasia; ≠ faculdade phantasía sozinha.", href: "' +
      HREF +
      '", en: "carnival costume", es: "disfraz de carnaval" },',
    '    phantasía: { gloss: "Étimo grego de fantasia — aparição / imaginação; ver fantasia.", href: "' +
      HREF +
      '", en: "phantasía", es: "phantasía" },'
  ];
  for (const line of aliases) {
    const key = line.match(/^\s+("[^"]+"|[^\s:]+):/)[1];
    const re = new RegExp(
      '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
    );
    if (re.test(gloss)) {
      gloss = gloss.replace(re, line + '\n');
    } else {
      gloss = gloss.replace(/(    fantasia:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + line + '\n');
    }
  }
  return gloss;
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

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-fantasia-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';
  const vida = fs.existsSync(VIDA_FILE) ? JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8')) : { poems: [] };

  const post = stampFiles(buildFantasiaPost());
  upsertPost(posts, post);
  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML', e.message);
  }
  writeI18n(i18n, post);

  const sugItems = Array.isArray(sug.items) ? sug.items : [];
  upsertItem(sugItems, {
    id: 'palavra-fantasia',
    title: 'Fantasia — a faculdade; ≠ fantástico ≠ roupa ≠ filme',
    titleEn: 'Fantasia — the faculty; ≠ fantástico ≠ costume ≠ film',
    titleEs: 'Fantasia — la facultad; ≠ fantástico ≠ disfraz ≠ película',
    tipo: 'palavra',
    priority: 1,
    status: 'feita',
    why: 'Palavras: fantasia — phantasía; ≠ elogio fantástico ≠ fantasioso ≠ Carnaval ≠ Disney; Valeu !!!',
    whyEn: 'Words: fantasia — phantasía; ≠ praise fantástico ≠ fantasioso ≠ Carnival ≠ Disney; Valeu !!!',
    whyEs: 'Palabras: fantasia — phantasía; ≠ elogio fantástico ≠ fantasioso ≠ Carnaval ≠ Disney; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      '/posts/post-inspecao-palavra-fantastico.html',
      '/posts/post-inspecao-palavra-fantasioso.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — pedido Inepçao de Fantasia.'
  });
  sug.items = sugItems;
  sug.updatedAt = new Date().toISOString();

  const guiaItems = Array.isArray(guia.items) ? guia.items : [];
  upsertItem(
    guiaItems,
    {
      id: 'fantasia',
      word: 'fantasia',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Gr. phantasía — faculdade de imaginar; ≠ elogio fantástico ≠ fantasioso ≠ roupa de Carnaval ≠ filme Disney. Valeu !!!',
      simpleEn:
        'Gk. phantasía — faculty of imagining; ≠ praise fantástico ≠ fantasioso ≠ Carnival costume ≠ Disney film. Valeu !!!',
      simpleEs:
        'Gr. phantasía — facultad de imaginar; ≠ elogio fantástico ≠ fantasioso ≠ disfraz ≠ Disney. ¡Valeu !!!',
      history:
        'Fantasia vem do grego phantasía (aparição / imaginação). No BR a mesma palavra veste o Carnaval; o adjectivo fantástico elogia; fantasioso marca quem está cheio disso.',
      curiosities:
        'Pedido de campo: Inepçao de Fantasia. A ficha corta as salas e não trata o vocábulo como manual de fuga.',
      historyEn:
        'Portuguese fantasia comes from Greek phantasía (appearance / imagination). In Brazil the same word also names a Carnival costume; fantástico praises; fantasioso marks who is full of it.',
      curiositiesEn:
        'Field slip: Inepçao de Fantasia. The sheet cuts the rooms and is not an escape manual.',
      historyEs:
        'Fantasia viene del griego phantasía. En BR la misma palabra también nombra el disfraz de carnaval; fantástico elogia; fantasioso marca a quien está lleno de ello.',
      curiositiesEs:
        'Pedido: Inepçao de Fantasia. La ficha corta las salas y no es un manual de fuga.'
    },
    ['fantasioso']
  );
  guia.items = guiaItems;
  guia.updatedAt = new Date().toISOString();

  if (gloss) gloss = patchGlossary(gloss);

  upsertVidaPoem(vida, {
    id: 'fantasia',
    slug: 'fantasia',
    title: 'Fantasia',
    titleEn: 'Fantasia',
    titleEs: 'Fantasia',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'A faculdade de imaginar — não o uau, não a roupa, não o filme.',
    teaserEn: 'The faculty of imagining — not the wow, not the costume, not the film.',
    teaserEs: 'La facultad de imaginar — no el guau, no el disfraz, no la película.',
    body: poemPt(),
    bodyEn: poemEn(),
    bodyEs: poemEs(),
    inspectionHref: HREF,
    tags: ['poesia', 'vida', 'fantasia', 'imaginação']
  });

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) await writeJsonRetry(GLOSS_FILE, gloss);
  await writeJsonRetry(VIDA_FILE, vida);

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
