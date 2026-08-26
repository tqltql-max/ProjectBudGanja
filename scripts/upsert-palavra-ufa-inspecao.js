'use strict';

/**
 * Actualiza a palavra «ufa» → Ufa!!! / que alívio.
 * Uso: node scripts/upsert-palavra-ufa-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildUfaPost } = require('../lib/ufa-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-ufa.html';

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

const UFA_LINE =
  '    ufa: { tone: "craft", category: "Alívio", mundane: "Sopro de alívio (interjeição BR).", gloss: "Ufa!!! — sopro; que alívio = a frase; alívio = o vocábulo; Valeu !!!", href: "' +
  HREF +
  '", en: "phew", es: "uf", fr: "ouf", it: "uffa", de: "uff", el: "αχ", la: "vah", yo: "yè", sw: "ahh", gez: "ʼǝff", nl: "foei", pl: "uff", ru: "ух", uk: "ух", zh: "呼", ja: "ふう", ko: "휴", ar: "أف", he: "אוף", hi: "उफ़", tr: "of", sv: "uff", da: "puha", no: "uff", fi: "huh", cs: "uff", ro: "uf", hu: "huh", ca: "uf", gl: "uf", eu: "uf", gn: "ái", qu: "alalaw", eo: "hu", vi: "phù", id: "huh", th: "เฮ้อ", hr: "uh", sk: "uf", ga: "och", cy: "och", ha: "kai", am: "ኧኝ", fa: "اوخ", bn: "উফ", zu: "hawu" },';

function patchGlossary(gloss) {
  if (/    ufa:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    ufa:\s*\{[\s\S]*?\},/, UFA_LINE);
  }
  const aliases = [
    '    "ufa !!!": { gloss: "Grito de ofício — ver ufa / Ufa!!!; locução que alívio.", href: "' +
      HREF +
      '", en: "phew!", es: "¡uf!" },\n',
    '    "Ufa!!!": { gloss: "Grito de ofício do sopro de alívio — ver ufa.", href: "' +
      HREF +
      '", en: "phew!", es: "¡uf!" },\n',
    '    "que alivio": { gloss: "Locução — nomeia o sopro Ufa!!!; vocábulo na ficha alívio.", href: "' +
      HREF +
      '", en: "what a relief", es: "qué alivio" },\n',
    '    "que alívio": { gloss: "Locução — nomeia o sopro Ufa!!!; vocábulo na ficha alívio.", href: "' +
      HREF +
      '", en: "what a relief", es: "qué alivio" },\n'
  ].join('');
  if (!gloss.includes('"Ufa!!!"')) {
    gloss = gloss.replace(/(    ufa:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + aliases);
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-ufa-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-ufa');
  const seriesOrder = existing ? Number(existing.seriesOrder) || 178 : 178;
  const post = stampFiles(buildUfaPost(seriesOrder));
  upsertPost(posts, post);
  writeHtml(post);
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-ufa';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Ufa!!! — o sopro, que alívio',
      titleEn: 'Ufa!!! — the puff, que alívio',
      titleEs: '¡Ufa!!! — el soplo, que alívio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: Ufa!!! — sopro de alívio; locução que alívio; vocábulo alívio; Valeu !!!',
      whyEn: 'Words: Ufa!!! — puff of relief; phrase que alívio; word alívio; Valeu !!!',
      whyEs: 'Palabras: ¡Ufa!!! — soplo de alivio; locución que alívio; vocablo alívio; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-alivio.html',
        '/posts/post-inspecao-expressao-desatar-o-no.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — trocar aff por ufa; Ufa!!!; que alívio.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-ufa)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'ufa',
      word: 'ufa',
      simple:
        'Ufa!!! — sopro de alívio BR; locução que alívio; vocábulo na ficha alívio; Valeu !!!',
      simpleEn:
        'Ufa!!! — BR phew of relief; phrase que alívio; word on the alívio sheet; Valeu !!!',
      simpleEs:
        '¡Ufa!!! — soplo BR de alivio; locución que alívio; vocablo en la ficha alívio; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === 'ufa' || x.word === 'ufa');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else items.push(entry);
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia actualizado (ufa)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (ufa)');
  }

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);

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
