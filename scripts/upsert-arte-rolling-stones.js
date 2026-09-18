'use strict';

/**
 * Injeta / actualiza The Rolling Stones (Artes) e refresca elos pedra / Verve.
 * Uso: node scripts/upsert-arte-rolling-stones.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildRollingStonesPost,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI,
  WIKI_SONG,
  WIKI_PROVERB,
  WIKI_MAG
} = require('../lib/rolling-stones-inspecao-post.js');
const { buildPedraPost } = require('../lib/pedra-inspecao-post.js');
const { buildBitterSweetSymphonyPost } = require('../lib/bitter-sweet-symphony-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-arte-rolling-stones.html';

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

async function syncSql(list) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  list.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', list.map((p) => p.slug).join(', '));
}

function patchGlossary(gloss) {
  const block =
    '    "rolling stones": { tone: "craft", category: "Artes", mundane: "Banda de Londres, 1962; o nome pega o stone inglês.", gloss: "The Rolling Stones — stone germânico (provérbio / Muddy Waters 1950), não o lema πέτρα; rock de palco ≠ rocha; revista ≠ banda; irmã pedra; Faça o melhor!", href: "/posts/post-inspecao-arte-rolling-stones.html", en: "The Rolling Stones", es: "The Rolling Stones" },\n' +
    '    "rolling stone": { gloss: "Provérbio + blues de Muddy Waters (1950) + revista 1967. A banda é The Rolling Stones. Corte na ficha da banda.", href: "/posts/post-inspecao-arte-rolling-stones.html", en: "rolling stone (proverb / song / magazine)", es: "rolling stone (proverbio / canción / revista)" },\n' +
    '    stones: { gloss: "Alcunha da banda The Rolling Stones — ≠ lema pedra (πέτρα). Corte na ficha da banda.", href: "/posts/post-inspecao-arte-rolling-stones.html", en: "the Stones (band)", es: "the Stones (banda)" },\n' +
    '    stone: { gloss: "EN germânico stān — mesmo objecto de pedra, outro tronco. Banda: The Rolling Stones. Mineral: ficha pedra.", href: "/posts/post-inspecao-arte-rolling-stones.html", en: "stone", es: "piedra / stone" },\n';

  if (/    "rolling stones":\s*\{/.test(gloss)) {
    console.log('Glossário: rolling stones já existia — bloco não duplicado');
    return gloss;
  }
  if (/    petrologia:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    petrologia:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else if (/    pedra:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    pedra:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else {
    console.warn('Aviso: glossário — ponto de inserção não encontrado');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-rolling-stones-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildRollingStonesPost());
  const pedra = stampFiles(buildPedraPost());
  const bitter = stampFiles(buildBitterSweetSymphonyPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  upsertPost(posts, pedra);
  upsertPost(posts, bitter);
  await writeJsonRetry(POSTS_FILE, posts);

  for (const item of [post, pedra, bitter]) {
    try {
      writeHtml(item);
    } catch (e) {
      console.warn('Aviso HTML', item.slug, e.message);
    }
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, pedra);
  writeI18n(i18n, bitter);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-rolling-stones';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'The Rolling Stones — stone germânico; a orelha cola pedras',
      titleEn: 'The Rolling Stones — Germanic stone; the ear glues pedras',
      titleEs: 'The Rolling Stones — stone germánico; el oído pega pedras',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Banda 1962: nome ← provérbio / Muddy Waters. stone ≠ πέτρα; rock ≠ rocha; revista ≠ banda.',
      whyEn: '1962 band: name ← proverb / Muddy Waters. stone ≠ πέτρα; rock ≠ rock-as-stone; magazine ≠ band.',
      whyEs: 'Banda 1962: nombre ← proverbio / Muddy Waters. stone ≠ πέτρα; rock ≠ roca; revista ≠ banda.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'artes-cultura',
      sources: [
        HREF,
        WIKI,
        WIKI_SONG,
        WIKI_PROVERB,
        WIKI_MAG,
        YT,
        YT_MUSIC,
        SPOTIFY,
        '/posts/post-inspecao-palavra-pedra.html',
        '/posts/post-inspecao-arte-bitter-sweet-symphony.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — nome primeiro; pedra fica no lema πέτρα.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (arte-rolling-stones)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'rolling-stones',
        word: 'The Rolling Stones',
        simple:
          'Banda de Londres, 1962: o nome pega o stone inglês (provérbio / Muddy Waters), não o lema πέτρα. Rock de palco ≠ rocha. Revista ≠ banda. Irmã: pedra. Faça o melhor!',
        simpleEn:
          'London band, 1962: the name takes English stone (proverb / Muddy Waters), not the lemma πέτρα. Stage rock ≠ rock-as-stone. Magazine ≠ band. Sister: pedra. Do your best!',
        simpleEs:
          'Banda de Londres, 1962: el nombre toma el stone inglés (proverbio / Muddy Waters), no el lema πέτρα. Rock de escenario ≠ roca. Revista ≠ banda. Hermana: pedra. ¡Haz lo mejor!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['pedra', 'gesso', 'bitter-sweet-symphony']
    );
    upsertItem(
      items,
      {
        id: 'stone',
        word: 'stone',
        simple:
          'Inglês germânico (stān): mesmo objecto de pedra, outro tronco. A banda The Rolling Stones pega este inglês. Mineral: ficha pedra. Faça o melhor!',
        simpleEn:
          'Germanic English (stān): same object as pedra, other trunk. The Rolling Stones take this English. Mineral: pedra sheet. Do your best!',
        simpleEs:
          'Inglés germánico (stān): mismo objeto que pedra, otro tronco. The Rolling Stones toman este inglés. Mineral: ficha pedra. ¡Haz lo mejor!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['rolling-stones', 'pedra']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (rolling-stones · stone)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (rolling stones)');
    }
  }

  try {
    await syncSql([post, pedra, bitter]);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
