'use strict';

/**
 * Injeta a palavra «palavra» na série Palavras (e no hub).
 * Uso: node scripts/upsert-palavra-palavra-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildPalavraPost } = require('../lib/palavra-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-palavra-palavra.html';

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
    '    palavra: { tone: "craft", category: "Léxico", mundane: "Unidade de fala; no lab, o objecto de cada ficha da série.", gloss: "Lat. parabola ← gr. parabolḗ — vocábulo, não o hub; ≠ verbo ≠ Verbo; Valeu !!!", href: "/posts/post-inspecao-palavra-palavra.html", en: "word", es: "palabra", fr: "mot", it: "parola", de: "Wort", yo: "ọ̀rọ̀", sw: "neno", gez: "qal", el: "λέξη", la: "parabola / verbum", nl: "woord", pl: "słowo", ru: "слово", uk: "слово", zh: "词", ja: "言葉", ko: "단어", ar: "كلمة", he: "מילה", hi: "शब्द", tr: "kelime", sv: "ord", da: "ord", no: "ord", fi: "sana", cs: "slovo", ro: "cuvânt", hu: "szó", ca: "paraula", gl: "palabra", eu: "hitz", gn: "ñe\'ẽ", qu: "simi", eo: "vorto", vi: "từ", id: "kata", th: "คำ", hr: "riječ", sk: "slovo", ga: "focal", cy: "gair", ha: "kalma", am: "ቃል", fa: "واژه", bn: "শব্দ", zu: "igama" },';
  const alias =
    '    palavras: { gloss: "Plural / nome da série — o hub de fichas; o vocábulo está em palavra.", href: "/biblioteca/inspecoes/#inspecoes-palavras", en: "words / Words series", es: "palabras / serie Palabras" },\n';

  if (/    palavra:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    palavra:\s*\{[\s\S]*?\},/, entryLine);
  } else {
    console.warn('Aviso: glossário — chave palavra não encontrada');
  }
  if (/    palavras:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    palavras:\s*\{[\s\S]*?\},/, alias.trim().replace(/,\s*$/, ','));
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-palavra-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildPalavraPost();
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
    const sugId = 'palavra-palavra';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Palavra — o vocábulo que nomeia a série',
      titleEn: 'Palavra — the vocable that names the series',
      titleEs: 'Palavra — el vocablo que nombra la serie',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: palavra ← parabola / parabolḗ — o vocábulo, não o hub; ≠ verbo ≠ Verbo; Valeu !!!',
      whyEn: 'Words: palavra ← parabola / parabolḗ — the vocable, not the hub; ≠ verb ≠ the Word; Valeu !!!',
      whyEs: 'Palabras: palavra ← parabola / parabolḗ — el vocablo, no el hub; ≠ verbo ≠ Verbo; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/biblioteca/inspecoes/#inspecoes-palavras',
        '/posts/post-inspecao-palavra-etimologia.html',
        '/posts/post-inspecao-palavra-lingua-portuguesa.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — pedido <<PALAVRA>>; meta-ficha da série.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-palavra)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'palavra',
      word: 'palavra',
      simple:
        'Lat. parabola ← gr. parabolḗ — vocábulo (unidade de fala). A série Palavras é o hub; esta ficha é o nome. ≠ verbo ≠ Verbo. Valeu !!!',
      simpleEn:
        'Lat. parabola ← Gr. parabolḗ — vocable (speech unit). The Words series is the hub; this sheet is the name. ≠ verb ≠ the Word. Valeu !!!',
      simpleEs:
        'Lat. parabola ← gr. parabolḗ — vocablo (unidad de habla). La serie Palabras es el hub; esta ficha es el nombre. ≠ verbo ≠ Verbo. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'palavra');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'etimologia' || x.id === 'lingua-portuguesa');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (palavra)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(glossPath, next, 'utf8');
      console.log('Glossário actualizado (palavra)');
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
