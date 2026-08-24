'use strict';

/**
 * Injeta o Caderno de jogo 5 — Metal Slug.
 * Uso: node scripts/upsert-caderno-jogo-metal-slug.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildMetalSlugCadernoPost,
  poemMetalSlugPt,
  poemMetalSlugEn,
  poemMetalSlugEs,
  YT,
  WIKI_1996,
  WIKI_EN,
  SNK_MSAR
} = require('../lib/metal-slug-caderno-jogo-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const JOGO_HREF = '/posts/post-inspecao-jogo-metal-slug.html';

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

function upsertItem(items, entry) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else items.push(entry);
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

function nextJogoOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'cadernos-jogo')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function glossLine(key, href, gloss, en, es) {
  return (
    '    ' +
    key +
    ': { tone: "caution", category: "Jogo", mundane: "' +
    gloss.replace(/"/g, '\\"') +
    '", gloss: "' +
    gloss.replace(/"/g, '\\"') +
    '", href: "' +
    href +
    '", en: "' +
    en +
    '", es: "' +
    es +
    '" },\n'
  );
}

function patchGlossary(gloss) {
  const block =
    glossLine(
      '"metal slug"',
      JOGO_HREF,
      'Caderno 5 — Nazca/SNK 1996; tanque SV-001; boca Meteal; sem ROM; Valeu !!!',
      'Metal Slug',
      'Metal Slug'
    ) +
    glossLine(
      'metalslug',
      JOGO_HREF,
      'Forma colada de Metal Slug — ver caderno 5.',
      'Metal Slug (glued)',
      'Metal Slug (pegado)'
    ) +
    glossLine(
      'meteal',
      JOGO_HREF,
      'Fala viva de Metal (Slug) — ver caderno 5.',
      'Metal (living Meteal)',
      'Meteal'
    ) +
    glossLine(
      'slug',
      JOGO_HREF,
      'EN projétil / lesma; no jogo = tanque SV-001; ver caderno Metal Slug.',
      'slug (tank / projectile)',
      'slug / babosa de metal'
    );

  if (/"metal slug":\s*\{/.test(gloss)) {
    gloss = gloss.replace(
      /    "metal slug":\s*\{[\s\S]*?slug:\s*\{[\s\S]*?\},\r?\n/,
      block
    );
  } else if (/    konbat:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    konbat:\s*\{[\s\S]*?\},\r?\n)/, '$1' + block);
  } else {
    console.warn('Aviso: glossário — ponto konbat não encontrado');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-metal-slug-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-jogo-metal-slug');
  const seriesOrder = existing ? Number(existing.seriesOrder) || 5 : nextJogoOrder(posts);
  const post = stampFiles(buildMetalSlugCadernoPost(seriesOrder || 5));

  upsertPost(posts, post);
  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);

  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const sugItems = Array.isArray(sug.items) ? sug.items : [];
  upsertItem(sugItems, {
    id: 'jogo-metal-slug-caderno-5',
    title: 'Metal Slug — caderno 5, o tanque e o Hey!',
    titleEn: 'Metal Slug — notebook 5, the tank and the Hey!',
    titleEs: 'Metal Slug — cuaderno 5, el tanque y el Hey!',
    tipo: 'jogo',
    priority: 1,
    status: 'feita',
    why: 'Caderno 5: Metal Slug 1996 (Nazca/SNK); SV-001; Mission Complete / HURRY UP! / POW Hey!; sem ROM.',
    whyEn: 'Notebook 5: Metal Slug 1996 (Nazca/SNK); SV-001 lexicon; no ROM dump.',
    whyEs: 'Cuaderno 5: Metal Slug 1996 (Nazca/SNK); léxico SV-001; sin ROM.',
    suggestedSlug: post.slug,
    doneHref: JOGO_HREF,
    seriesHint: 'cadernos-jogo',
    sources: [WIKI_1996, WIKI_EN, SNK_MSAR, YT, JOGO_HREF],
    notes: 'Cap. ' + post.seriesOrder + ' — fala viva Meteal; cópia legal.'
  });
  sug.items = sugItems;
  sug.updatedAt = new Date().toISOString();

  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  const guiaItems = Array.isArray(guia.items) ? guia.items : [];
  upsertItem(guiaItems, {
    id: 'metal-slug',
    word: 'Metal Slug',
    simple:
      'Run and gun da Nazca / SNK (1996). No site, caderno de jogo 5 — tanque SV-001, Mission Complete / Hey!; cópia legal, sem ROM. Fala viva: Meteal.',
    simpleEn:
      'Nazca / SNK run and gun (1996). On the site, game notebook 5 — SV-001 tank, Mission Complete / Hey!; legal copy, no ROM. Living mouth: Meteal.',
    simpleEs:
      'Run and gun de Nazca / SNK (1996). En el sitio, cuaderno 5 — tanque SV-001, Mission Complete / Hey!; copia legal, sin ROM. Habla viva: Meteal.',
    group: 'lexico',
    fromTitle: false,
    href: JOGO_HREF
  });
  guia.items = guiaItems;
  guia.updatedAt = new Date().toISOString();

  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';
  if (gloss) gloss = patchGlossary(gloss);

  const vida = fs.existsSync(VIDA_FILE) ? JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8')) : { poems: [] };
  upsertVidaPoem(vida, {
    id: 'metal-slug',
    slug: 'metal-slug',
    title: 'Metal Slug',
    titleEn: 'Metal Slug',
    titleEs: 'Metal Slug',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'Eco BudGanja do fliperama — o tanque, o pixel e o Hey!, sem colar a ROM; Valeu !!!',
    teaserEn: 'BudGanja echo of the cabinet — the tank, the pixel and the Hey!, without pasting the ROM; Valeu !!!',
    teaserEs: 'Eco BudGanja del fliperama — el tanque, el píxel y el Hey!, sin pegar la ROM; ¡Valeu !!!',
    body: poemMetalSlugPt(),
    bodyEn: poemMetalSlugEn(),
    bodyEs: poemMetalSlugEs(),
    inspectionHref: JOGO_HREF,
    tags: ['poesia', 'vida', 'jogo', 'metal', 'slug', 'snk']
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

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
