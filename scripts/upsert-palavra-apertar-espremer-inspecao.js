'use strict';

/**
 * Injeta apertar × espremer na série Palavras.
 * Uso: node scripts/upsert-palavra-apertar-espremer-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildApertarEspremerPost } = require('../lib/apertar-espremer-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-palavra-apertar-espremer.html';

function upsertPost(posts, post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
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

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename || 'posts/post-' + post.slug + '.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', path.relative(ROOT, out));
}

function patchGlossary(gloss) {
  const entryLine =
    '    apertar: { tone: "caution", category: "Gesto", mundane: "Cingir / fechar o vão; apertar parafuso, mão, prazo.", gloss: "VL appectorare ← pectus — apertar contra o peito; ≠ espremer (para fora) ≠ esfregar; par nesta ficha; Valeu !!!", href: "/posts/post-inspecao-palavra-apertar-espremer.html", en: "to tighten / to press", es: "apretar", fr: "serrer", it: "stringere", de: "drücken / anziehen", el: "σφίγγω", la: "adpectorare", yo: "fun", sw: "bana", gez: "ṣäbṭä", nl: "aandraaien", pl: "ścisnąć", ru: "сжимать", uk: "стискати", zh: "拧紧", ja: "締める", ko: "조이다", ar: "يضغط", he: "להדק", hi: "कसना", tr: "sıkmak", sv: "dra åt", da: "spænde", no: "stramme", fi: "kiristää", cs: "utažení", ro: "strânge", hu: "megszorít", ca: "apretar", gl: "apertar", eu: "estutu", gn: "mbojyky", qu: "q\'ipiy", eo: "streĉi", vi: "siết", id: "mengencangkan", th: "ขัน", hr: "stezati", sk: "utiahnuť", ga: "teann", cy: "tynhau", ha: "matsa", am: "መጨመቅ", fa: "سفت کردن", bn: "আঁটা", zu: "qinisa" },';
  const aliases =
    '    espremer: { tone: "caution", gloss: "Lat. exprimere — premer para fora (sumo, pano); ≠ apertar ≠ exprimir (fala); gatilho EXPREMMER.", href: "/posts/post-inspecao-palavra-apertar-espremer.html", en: "to squeeze out", es: "exprimir (jugo)" },\n' +
    '    expremer: { gloss: "Lapso de espremer — ver ficha apertar/espremer.", href: "/posts/post-inspecao-palavra-apertar-espremer.html", en: "slip for espremer", es: "lapsus de espremer" },\n' +
    '    expremer: { gloss: "Lapso / teclado EXPREMMER → espremer; cola em exprimir.", href: "/posts/post-inspecao-palavra-apertar-espremer.html", en: "EXPREMMER (slip)", es: "EXPREMMER (lapsus)" },\n';

  // fix duplicate - I'll only have one expremer and one EXPREMMER
  const aliasesFixed =
    '    espremer: { tone: "caution", gloss: "Lat. exprimere — premer para fora; ≠ apertar ≠ exprimir (fala); gatilho EXPREMMER.", href: "/posts/post-inspecao-palavra-apertar-espremer.html", en: "to squeeze out", es: "exprimir (jugo)" },\n' +
    '    expremer: { gloss: "Lapso de espremer (EXPREMMER) — cola em exprimir; ver ficha.", href: "/posts/post-inspecao-palavra-apertar-espremer.html", en: "slip for espremer", es: "lapsus de espremer" },\n' +
    '    aperto: { gloss: "Substantivo de apertar — o vão fechado; elo EXIT (sair do aperto).", href: "/posts/post-inspecao-palavra-apertar-espremer.html", en: "tightness / squeeze", es: "aprieto" },\n' +
    '    exprimir: { gloss: "Mesmo avô de espremer (exprimere) — ofício da fala, não do sumo; ver ficha do par.", href: "/posts/post-inspecao-palavra-apertar-espremer.html", en: "to express", es: "expresar" },\n';

  if (/    apertar:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    apertar:\s*\{[\s\S]*?\},/, entryLine);
  } else {
    const reEsfregar = /(    esfregar:\s*\{[\s\S]*?\},?\r?\n)/;
    if (reEsfregar.test(gloss)) gloss = gloss.replace(reEsfregar, '$1' + entryLine + '\n');
    else console.warn('Aviso: glossário — ponto esfregar não encontrado');
  }
  if (!/    espremer:\s*\{/.test(gloss)) {
    const reMain = /(    apertar:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reMain.test(gloss)) gloss = gloss.replace(reMain, '$1' + aliasesFixed);
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-apertar-espremer-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildApertarEspremerPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-apertar-espremer';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Apertar · Espremer — peito, para fora, lapso EXPREMMER',
      titleEn: 'Apertar · Espremer — chest, squeeze-out, slip EXPREMMER',
      titleEs: 'Apertar · Espremer — pecho, hacia fuera, lapsus EXPREMMER',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: apertar (pectus) ≠ espremer (exprimere); EXPREMMER lapso; ≠ exprimir ≠ esfregar; Valeu !!!',
      whyEn: 'Words: apertar (pectus) ≠ espremer (exprimere); EXPREMMER slip; ≠ express ≠ rub; Valeu !!!',
      whyEs: 'Palabras: apertar (pectus) ≠ espremer (exprimere); EXPREMMER lapsus; ≠ exprimir ≠ frotar; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [post.sourceUrl, WIKT_ESPREMER, '/posts/post-inspecao-palavra-impressao-pressao.html'],
      notes: 'Cap. ' + post.seriesOrder + ' — dois verbos, duas salas.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-apertar-espremer)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'apertar-espremer',
      word: 'apertar / espremer',
      simple:
        'Apertar ← peito (cingir). Espremer ← exprimere (para fora). EXPREMMER é lapso. ≠ exprimir (fala) ≠ esfregar. Valeu !!!',
      simpleEn:
        'Apertar ← chest (tighten). Espremer ← exprimere (squeeze out). EXPREMMER is a slip. ≠ express ≠ rub. Valeu !!!',
      simpleEs:
        'Apertar ← pecho (ceñir). Espremer ← exprimere (hacia fuera). EXPREMMER es lapsus. ≠ expresar ≠ frotar. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'impressao-pressao' || x.id === 'esfregar');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (apertar/espremer)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(glossPath, next, 'utf8');
      console.log('Glossário actualizado (apertar/espremer)');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Cap.', post.seriesOrder, post.title);
}

const WIKT_ESPREMER = 'https://pt.wiktionary.org/wiki/espremer';

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
