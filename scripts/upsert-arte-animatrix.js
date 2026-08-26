'use strict';

/**
 * Injeta / actualiza Animatrix (Artes · desenho 2003) e liga ao filme Matrix.
 * Uso: node scripts/upsert-arte-animatrix.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildAnimatrixPost,
  YT,
  WIKI,
  WIKI_EN
} = require('../lib/animatrix-inspecao-post.js');
const { buildTheMatrixPost } = require('../lib/artes-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const SITE_FILE = path.join(ROOT, 'content', 'site.json');
const HREF = '/posts/post-inspecao-desenho-animatrix.html';
const MATRIX_HREF = '/posts/post-inspecao-filme-the-matrix.html';

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
  const animatrix =
    '    animatrix: { tone: "craft", category: "Desenho", mundane: "Antologia de anime 2003 no mundo de Matrix — nove portas, o mesmo ecrã.", gloss: "Artes · desenho The Animatrix; filme 1999 continua génese; ≠ sequelas live-action; Valeu !!!", href: "' +
    HREF +
    '", en: "The Animatrix", es: "Animatrix" },\n';
  const aliases = [
    '    theanimatrix: { gloss: "Lema EN — ver Animatrix (desenho 2003).", href: "' +
      HREF +
      '", en: "The Animatrix", es: "The Animatrix" },\n'
  ];
  if (/    animatrix:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    animatrix:\s*\{[\s\S]*?\},\r?\n/, animatrix);
  } else if (/    elza:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    elza:\s*\{[\s\S]*?\},\r?\n)/, '$1' + animatrix);
  } else if (/    frozen:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    frozen:\s*\{[\s\S]*?\},\r?\n)/, '$1' + animatrix);
  } else {
    console.warn('Aviso: glossário — ponto de inserção animatrix não encontrado');
    return gloss;
  }
  for (const line of aliases) {
    const key = line.match(/^\s+([a-z]+):/)[1];
    const re = new RegExp('    ' + key + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n');
    if (re.test(gloss)) gloss = gloss.replace(re, line);
    else if (/    animatrix:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(    animatrix:\s*\{[\s\S]*?\},\r?\n)/, '$1' + line);
    }
  }
  return gloss;
}

function patchMatrixPost(posts) {
  const mp = posts.find((p) => p.slug === 'inspecao-filme-the-matrix');
  if (!mp) {
    console.warn('Aviso: ficha The Matrix não encontrada para elo');
    return;
  }
  const marker = HREF;
  const ptBlock =
    '\n\n## Elo desenho — Animatrix (2003)\n\nA expansão em **anime** (nove curtas, **2003**) tem ficha própria: [Animatrix](' +
    HREF +
    '). **Não** substitui este filme (1999 = génese). *Reloaded* / *Revolutions* / *Resurrections* continuam sequelas de **cinema** (fila à parte).\n';
  const enBlock =
    '\n\n## Cartoon link — Animatrix (2003)\n\nThe **anime** expansion (nine shorts, **2003**) has its own sheet: [Animatrix](' +
    HREF +
    '). It does **not** replace this film (1999 = genesis). Live-action sequels stay a **cinema** queue.\n';
  const esBlock =
    '\n\n## Vínculo dibujo — Animatrix (2003)\n\nLa expansión en **anime** (nueve cortos, **2003**) tiene ficha propia: [Animatrix](' +
    HREF +
    '). **No** sustituye este filme (1999 = génesis). Las secuelas live-action siguen siendo cola de **cine**.\n';
  if (mp.content_raw && !mp.content_raw.includes(marker)) {
    if (mp.content_raw.includes('\n## Status\n')) {
      mp.content_raw = mp.content_raw.replace('\n## Status\n', ptBlock + '\n## Status\n');
    } else {
      mp.content_raw += ptBlock;
    }
  }
  if (mp.contentEn && !mp.contentEn.includes(marker)) {
    if (mp.contentEn.includes('\n## Status\n')) {
      mp.contentEn = mp.contentEn.replace('\n## Status\n', enBlock + '\n## Status\n');
    } else {
      mp.contentEn += enBlock;
    }
  }
  if (mp.contentEs && !mp.contentEs.includes(marker)) {
    if (mp.contentEs.includes('\n## Estado\n')) {
      mp.contentEs = mp.contentEs.replace('\n## Estado\n', esBlock + '\n## Estado\n');
    } else {
      mp.contentEs += esBlock;
    }
  }
  stampFiles(mp);
  try {
    writeHtml(mp);
  } catch (e) {
    console.warn('Aviso HTML Matrix:', e.message);
  }
  console.log('Elo Matrix ↔ Animatrix');
}

function patchSiteJson(raw) {
  if (raw.includes('"slug": "post-inspecao-desenho-animatrix"')) {
    console.log('site.json já tinha Animatrix');
    return raw;
  }
  const mega =
    /("slug": "post-inspecao-desenho-megamente",\s*"description": "[^"]*"\s*\},)/;
  const insert =
    '$1\n                {\n                  "label": "Inspeção: Animatrix — o desenho das nove portas e o ofício de verificar o ecrã",\n                  "tileLabel": "Inspeção: Animatrix — o desenho…",\n                  "href": "' +
    HREF +
    '",\n                  "icon": "🔍",\n                  "slug": "post-inspecao-desenho-animatrix",\n                  "description": "Artes · desenho 2003: Animatrix (The Animatrix) — nove curtas de anime no mundo de Matrix; o filme 1999 continua génese; sem colar o guião."\n                },';
  if (mega.test(raw)) {
    console.log('site.json: Animatrix após Megamente');
    return raw.replace(mega, insert);
  }
  console.warn('Aviso: site.json — bloco Megamente não encontrado');
  return raw;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-animatrix-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildAnimatrixPost());
  const matrixPost = stampFiles(buildTheMatrixPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  upsertPost(posts, matrixPost);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
    writeHtml(matrixPost);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, matrixPost);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-desenho-animatrix';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Animatrix — o desenho das nove portas e o ofício de verificar o ecrã',
      titleEn: 'Animatrix — the cartoon of nine doors and the craft of checking the screen',
      titleEs: 'Animatrix — el dibujo de las nueve puertas y el oficio de verificar la pantalla',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes · desenho 2003: Animatrix (The Animatrix) — nove curtas de anime; filme Matrix 1999 continua génese; sem colar guião.',
      whyEn: 'Arts · 2003 cartoon: The Animatrix — nine anime shorts; 1999 Matrix film stays genesis.',
      whyEs: 'Artes · dibujo 2003: Animatrix — nueve cortos de anime; el filme Matrix 1999 sigue siendo génesis.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'artes-cultura',
      sources: [HREF, YT, WIKI, WIKI_EN, MATRIX_HREF],
      notes: 'Cap. ' + post.seriesOrder + ' — antologia 2003; sequelas live-action = fila à parte.'
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
      id: 'animatrix',
      word: 'Animatrix',
      simple:
        'Antologia de anime 2003 (The Animatrix) — nove curtas no mundo de Matrix; o filme 1999 continua génese; ≠ sequelas live-action.',
      simpleEn:
        '2003 anime anthology (The Animatrix) — nine shorts in the Matrix world; the 1999 film stays genesis; ≠ live-action sequels.',
      simpleEs:
        'Antología de anime 2003 (The Animatrix) — nueve cortos en el mundo de Matrix; el filme 1999 sigue siendo génesis; ≠ secuelas live-action.',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'elza' || x.id === 'megamente');
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

  if (fs.existsSync(SITE_FILE)) {
    let site = fs.readFileSync(SITE_FILE, 'utf8');
    const next = patchSiteJson(site);
    if (next !== site) {
      await writeJsonRetry(SITE_FILE, next);
      console.log('site.json actualizado');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
