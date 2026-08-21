'use strict';

/**
 * Injeta / actualiza a inspeção do app oficial The Chosen (Play Store).
 * Uso: node scripts/upsert-the-chosen-app-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildTheChosenAppPost,
  PLAY,
  PLAY_BR,
  IOS,
  WATCH,
  SITE_BR,
  COME,
  PRIV
} = require('../lib/the-chosen-app-inspecao-post.js');
const { buildTheChosenPost } = require('../lib/the-chosen-inspecao-post.js');
const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const afterSerie = posts.findIndex((p) => p.slug === 'inspecao-serie-the-chosen');
  if (afterSerie >= 0) {
    posts.splice(afterSerie + 1, 0, post);
    console.log('Inserido', post.slug, 'após inspecao-serie-the-chosen');
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug);
}

function upsertEntry(items, key, entry) {
  const i = items.findIndex((x) => x[key] === entry[key]);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else items.push(entry);
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

function writeHtml(post) {
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-the-chosen-app-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 40000
    });
  } catch (e) {
    console.warn('Aviso capa', e.message);
  }

  const post = buildTheChosenAppPost();
  const serie = buildTheChosenPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, serie);
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, serie);
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const serieHref = '/posts/post-inspecao-serie-the-chosen.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertEntry(items, 'id', {
      id: 'app-the-chosen',
      title: 'app The Chosen — a via oficial gratuita',
      titleEn: 'The Chosen app — the official free watch path',
      titleEs: 'app The Chosen — la vía oficial gratuita',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes · app: player oficial Come and See (Play net.comeandsee.thechosen); distinto da série e de osescolhidos.tv.',
      whyEn: 'Arts · app: official Come and See player (Play net.comeandsee.thechosen); distinct from the series and osescolhidos.tv.',
      whyEs: 'Artes · app: reproductor oficial Come and See (Play net.comeandsee.thechosen); distinto de la serie y de osescolhidos.tv.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [PLAY, PLAY_BR, IOS, WATCH, SITE_BR, COME, PRIV, serieHref],
      notes: 'App ≠ série ≠ site BR. Livre de anúncios ≠ sem dados. Sem pirataria.'
    });
    const serieSug = items.find((x) => x.id === 'arte-serie-the-chosen');
    if (serieSug) {
      const sources = Array.isArray(serieSug.sources) ? serieSug.sources.slice() : [];
      if (!sources.includes(href)) sources.push(href);
      if (!sources.includes(PLAY)) sources.push(PLAY);
      serieSug.sources = sources;
    }
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (app-the-chosen)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertEntry(items, 'id', {
      id: 'the-chosen-app',
      word: 'app The Chosen',
      simple:
        'Aplicativo oficial gratuito para assistir The Chosen / Os Escolhidos (Come and See); na Play: net.comeandsee.thechosen. Distinto da ficha da série e do site osescolhidos.tv.',
      simpleEn:
        'Official free app to watch The Chosen (Come and See); on Play: net.comeandsee.thechosen. Distinct from the series sheet and osescolhidos.tv.',
      simpleEs:
        'App oficial gratuito para ver The Chosen (Come and See); en Play: net.comeandsee.thechosen. Distinto de la ficha de la serie y de osescolhidos.tv.',
      group: 'lexico',
      fromTitle: false,
      href
    });
    upsertEntry(items, 'id', {
      id: 'osescolhidos-tv',
      word: 'osescolhidos.tv',
      simple:
        'Site The Chosen Brasil — porta de anúncio, FAQ e igrejas; o player oficial é o app (Play/iOS) ou watch.thechosen.tv. Ver inspeção do app.',
      simpleEn:
        'The Chosen Brazil site — ads, FAQ and churches door; the official player is the app (Play/iOS) or watch.thechosen.tv. See the app inspection.',
      simpleEs:
        'Sitio The Chosen Brasil — puerta de anuncio, FAQ e iglesias; el reproductor oficial es el app (Play/iOS) o watch.thechosen.tv. Ver la inspección del app.',
      group: 'lexico',
      fromTitle: false,
      href
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (the-chosen-app)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!/the-chosen-app|app the chosen/.test(gloss) && !/"app the chosen":/.test(gloss)) {
      const entry =
        '    "app the chosen": { gloss: "Player oficial grátis (Come and See) — Play net.comeandsee.thechosen; distinto da série e de osescolhidos.tv.", href: "/posts/post-inspecao-app-the-chosen.html", en: "The Chosen app", es: "app The Chosen" },\n' +
        '    osescolhidos: { gloss: "Título BR/PT e porta osescolhidos.tv — o player é o app oficial.", href: "/posts/post-inspecao-app-the-chosen.html", en: "The Chosen (BR title / site)", es: "Os Escolhidos" },\n';
      const re = /(    principia:\s*\{[\s\S]*?\},?\r?\n)/;
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (app the chosen)');
      } else {
        console.warn('Aviso: glossário — ponto principia não encontrado');
      }
    }
  }

  writeHtml(serie);
  writeHtml(post);

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  try {
    const { publishStaticAssets } = require('../lib/publish-static.js');
    publishStaticAssets(ROOT);
    console.log('Listagens actualizadas');
  } catch (e) {
    console.warn('Aviso listagens', e.message);
  }

  console.log('OK:', post.title, '|', href);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
