'use strict';

/**
 * Injeta palavra «sonhar» (relação com sonar) na série Palavras.
 * Uso: node scripts/upsert-palavra-sonhar-sonar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildSonharSonarPost } = require('../lib/sonhar-sonar-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-sonhar.html';

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
  const entry =
    '    sonhar: { tone: "craft", category: "Verbo", mundane: "Verbo do sonho — viver ou produzir um sonho.", gloss: "Lat. somniāre ← somnium; relação com sonar (aparelho / ES soar); orelha cola o h; soñar leva ñ; Valeu !!!", href: "/posts/post-inspecao-palavra-sonhar.html", en: "to dream", es: "soñar", fr: "rêver", it: "sognare", de: "träumen", el: "ονειρεύομαι", la: "somniare", yo: "lá àlá", sw: "ota", gez: "ḥalama", nl: "dromen", pl: "śnić", ru: "мечтать", uk: "мріяти", zh: "做梦", ja: "夢を見る", ko: "꿈꾸다", ar: "يحلم", he: "לחלום", hi: "सपना देखना", tr: "rüya görmek", sv: "drömma", da: "drømme", no: "drømme", fi: "uneksia", cs: "snít", ro: "a visa", hu: "álmodni", ca: "somiar", gl: "soñar", eu: "amets egin", gn: "kecháramo", qu: "musquy", eo: "sonĝi", vi: "mơ", id: "bermimpi", th: "ฝัน", hr: "sanjati", sk: "snívať", ga: "aisling", cy: "breuddwydio", ha: "mafarki", am: "ምረት", fa: "خواب دیدن", bn: "স্বপ্ন দেখা", zu: "ukuphupha" },\n' +
    '    sonho: { gloss: "Nome de sonhar (lat. somnium); ≠ sonar-aparelho; filme Um sonho de liberdade é outra ficha.", href: "/posts/post-inspecao-palavra-sonhar.html", en: "dream", es: "sueño" },\n' +
    '    sonar: { gloss: "Não é sonhar: aparelho EN SONAR ou ES sonar (= PT soar). Ver sonhar × sonar.", href: "/posts/post-inspecao-palavra-sonhar.html", en: "sonar / to sound (ES)", es: "sonar" },\n' +
    '    soar: { gloss: "Lat. sonāre — emitir som; par do ES sonar; ≠ sonhar.", href: "/posts/post-inspecao-palavra-sonhar.html", en: "to sound / to ring", es: "sonar (emitir sonido)" },\n';

  if (/    sonhar:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    sonhar:\s*\{[\s\S]*?\},/, entry.split('\n')[0].replace(/,\s*$/, '') + ',');
  } else if (/    sono:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    sono:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entry);
  } else {
    console.warn('Aviso: glossário — ponto sono não encontrado');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-sonhar-sonar-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildSonharSonarPost());
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
    const sugId = 'palavra-sonhar-sonar';
    const si = items.findIndex((x) => x.id === sugId || x.id === 'palavra-sonhar');
    const entry = {
      id: sugId,
      title: 'Sonhar × sonar — o sonho, o eco, e o ñ que falta',
      titleEn: 'Sonhar × sonar — the dream, the echo, and the missing ñ',
      titleEs: 'Sonhar × sonar — el sueño, el eco, y la ñ que falta',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: sonhar (lat. somniāre) × sonar (aparelho / ES soar); orelha cola o h; Valeu !!!',
      whyEn: 'Words: sonhar (Lat. somniāre) × sonar (device / ES to sound); the ear glues the h; Valeu !!!',
      whyEs: 'Palabras: sonhar (lat. somniāre) × sonar (aparato / ES emitir sonido); la oreja pega la h; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/sonar',
        '/posts/post-inspecao-palavra-sinais-rem.html',
        '/posts/post-inspecao-palavra-relacao.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — sonho ≠ eco; ES soñar leva ñ.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-sonhar-sonar)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'sonhar',
      word: 'sonhar',
      simple:
        'Lat. somniāre — verbo do sonho. Relação com sonar (aparelho / ES soar). Orelha cola o h; soñar leva ñ. Valeu !!!',
      simpleEn:
        'Lat. somniāre — to dream. Relation to sonar (device / ES to sound). The ear glues the h; soñar keeps ñ. Valeu !!!',
      simpleEs:
        'Lat. somniāre — verbo del sueño. Relación con sonar (aparato / ES emitir sonido). La oreja pega la h; soñar lleva ñ. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.id === 'sonhar-sonar');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'nap' || x.id === 'sinais-rem' || x.id === 'noite');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (sonhar)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (sonhar)');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
