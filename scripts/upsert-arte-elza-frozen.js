'use strict';

/**
 * Injeta Elza / Frozen (Artes · desenho 2013) e actualiza VEVO + Disney Jr.
 * Uso: node scripts/upsert-arte-elza-frozen.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildElzaFrozenPost,
  LET_IT_GO,
  DISNEY_VEVO,
  WIKI_ELSA
} = require('../lib/elza-frozen-inspecao-post.js');
const { buildVevoCanalPost } = require('../lib/vevo-canal-inspecao-post.js');
const { buildDisneyJrCanalPost } = require('../lib/disneyjr-canal-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-desenho-elza-frozen.html';

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

function patchGlossary(gloss) {
  const elza =
    '    elza: { tone: "craft", category: "Desenho", mundane: "Fala viva de Elsa (Frozen, 2013) — gelo que o medo trancou.", gloss: "Artes · personagem Frozen; Let It Go no DisneyMusicVEVO junto da ficha; ≠ invernagem Tamara; Valeu !!!", href: "' +
    HREF +
    '", en: "Elsa (living Elza)", es: "Elsa (habla Elza)" },\n';
  const aliases = [
    '    elsa: { gloss: "Nome oficial EN — ver Elza (Frozen).", href: "' +
      HREF +
      '", en: "Elsa of Arendelle", es: "Elsa de Arendelle" },\n',
    '    frozen: { gloss: "Desenho Disney 2013 — ficha da Elza; Uma Aventura Congelante.", href: "' +
      HREF +
      '", en: "Frozen (2013 film)", es: "Frozen (película 2013)" },\n'
  ];
  if (/    elza:\s*\{/.test(gloss)) gloss = gloss.replace(/    elza:\s*\{[\s\S]*?\},\r?\n/, elza);
  else if (/    gelo:\s*\{/.test(gloss)) gloss = gloss.replace(/(    gelo:\s*\{[\s\S]*?\},\r?\n)/, '$1' + elza);
  else gloss = gloss.replace(/(    inverno:\s*\{[\s\S]*?\},\r?\n)/, '$1' + elza);
  for (const line of aliases) {
    const key = line.match(/^\s+([a-z]+):/)[1];
    const re = new RegExp('    ' + key + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n');
    if (re.test(gloss)) gloss = gloss.replace(re, line);
    else if (/    elza:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(    elza:\s*\{[\s\S]*?\},\r?\n)/, '$1' + line);
    }
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-elza-frozen-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const elza = stampFiles(buildElzaFrozenPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existingVevo = posts.find((p) => p.slug === 'inspecao-canal-vevo');
  const existingJr = posts.find((p) => p.slug === 'inspecao-canal-disneyjr');
  const vevo = stampFiles(
    buildVevoCanalPost(
      existingVevo && Number(existingVevo.seriesOrder) ? Number(existingVevo.seriesOrder) : undefined
    )
  );
  const disneyJr = stampFiles(
    buildDisneyJrCanalPost(
      existingJr && Number(existingJr.seriesOrder) ? Number(existingJr.seriesOrder) : undefined
    )
  );
  upsertPost(posts, elza);
  upsertPost(posts, vevo);
  upsertPost(posts, disneyJr);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(elza);
    writeHtml(vevo);
    writeHtml(disneyJr);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, elza);
  writeI18n(i18n, vevo);
  writeI18n(i18n, disneyJr);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-desenho-elza-frozen';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Elza — Frozen, o gelo e o ofício de não esconder o poder',
      titleEn: 'Elsa — Frozen, the ice and the craft of not hiding the power',
      titleEs: 'Elza — Frozen, el hielo y el oficio de no esconder el poder',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes · desenho 2013: Elza (Frozen); Let It Go no DisneyMusicVEVO junto da ficha; sem colar letra.',
      whyEn: 'Arts · 2013 cartoon: Elsa (Frozen); Let It Go on DisneyMusicVEVO beside the sheet.',
      whyEs: 'Artes · dibujo 2013: Elza (Frozen); Let It Go en DisneyMusicVEVO junto a la ficha.',
      suggestedSlug: elza.slug,
      doneHref: HREF,
      seriesHint: 'artes-cultura',
      sources: [
        HREF,
        LET_IT_GO,
        DISNEY_VEVO,
        WIKI_ELSA,
        '/posts/post-inspecao-canal-vevo.html',
        '/posts/post-inspecao-desenho-megamente.html',
        '/posts/post-inspecao-palavra-gelo.html'
      ],
      notes: 'Cap. ' + elza.seriesOrder + ' — personagem primeiro; Frozen 2 = eco.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'elza',
      word: 'Elza',
      simple:
        'Personagem de Frozen (2013, Disney) — gelo que o medo trancou; Let It Go no DisneyMusicVEVO junto da ficha.',
      simpleEn:
        'Frozen character (2013, Disney) — ice that fear locked; Let It Go on DisneyMusicVEVO beside the sheet.',
      simpleEs:
        'Personaje de Frozen (2013, Disney) — hielo que el miedo cerró; Let It Go en DisneyMusicVEVO junto a la ficha.',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'gelo' || x.id === 'inverno' || x.id === 'moana');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
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

  try {
    await syncSql(elza);
    await syncSql(vevo);
    await syncSql(disneyJr);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', elza.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
