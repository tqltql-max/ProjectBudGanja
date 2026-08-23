'use strict';

/**
 * Injeta a letra X (xis) na série Palavras.
 * Uso: node scripts/upsert-palavra-letra-x.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildLetraXPost, poemPt, poemEn, poemEs } = require('../lib/letra-x-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-letra-x.html';
const LETRA_L = '/posts/post-inspecao-palavra-letra-l.html';
const CONEXAO = '/posts/post-inspecao-palavra-conexao.html';

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

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const main =
    '    "letra x": { tone: "craft", category: "Alfabeto", mundane: "24.ª letra do alfabeto latino; nome PT xis.", gloss: "X / xis; x de conexão = nexo; ≠ app ≠ Xiaomi ≠ chili; Valeu !!!", href: "' +
    HREF +
    '", en: "letter X", es: "letra X", fr: "lettre X", it: "lettera X", de: "Buchstabe X", el: "γράμμα Χ", la: "X littera", yo: "lẹta X", sw: "herufi X", gez: "X", nl: "letter X", pl: "litera X", ru: "буква X", uk: "літера X", zh: "字母X", ja: "文字X", ko: "문자 X", ar: "حرف X", he: "אות X", hi: "अक्षर X", tr: "X harfi", sv: "bokstaven X", da: "bogstavet X", no: "bokstaven X", fi: "kirjain X", cs: "písmeno X", ro: "litera X", hu: "X betű", ca: "lletra X", gl: "letra X", eu: "X letra", gn: "tai X", qu: "X qillqa", eo: "litero X", vi: "chữ X", id: "huruf X", th: "ตัวอักษร X", hr: "slovo X", sk: "písmeno X", ga: "litir X", cy: "llythyren X", ha: "harafin X", am: "ፊደል X", fa: "حرف X", bn: "অক্ষর X", zu: "uhlamvu X" },\n';
  const aliases = [
    '    xis: { gloss: "Nome PT da letra X — ver letra x.", href: "' + HREF + '", en: "xis (letter name)", es: "xis (nombre de X)" },\n',
    '    "letra X": { gloss: "Maiúscula — o mesmo xis; ver letra x.", href: "' + HREF + '", en: "letter X", es: "letra X" },\n',
    '    "x da conexao": { gloss: "O x de conexão é nexo (lat. nexus), não ç; ver letra x e conexão.", href: "' + HREF + '", en: "x in conexão", es: "x de conexão" },\n'
  ].join('');

  gloss = replaceOrInsertAfter(gloss, '"letra x"', main, 'zero');
  for (const line of aliases.split('\n').filter(Boolean)) {
    const key = line.match(/^\s+("[^"]+"|[a-z0-9-]+):/)[1];
    gloss = replaceOrInsertAfter(gloss, key, line + '\n', '"letra x"');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-letra-x-cover.js')], {
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

  const post = stampFiles(buildLetraXPost());
  upsertPost(posts, post);
  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML', e.message);
  }
  writeI18n(i18n, post);

  const sugItems = Array.isArray(sug.items) ? sug.items : [];
  upsertItem(sugItems, {
    id: 'palavra-letra-x',
    title: 'Letra X — o xis, o nexo, as salas',
    titleEn: 'Letter X — xis, nexus, the rooms',
    titleEs: 'Letra X — el xis, el nexo, las salas',
    tipo: 'palavra',
    priority: 1,
    status: 'feita',
    why: 'Palavras: letra X / xis — 24.ª; x de conexão = nexo; ≠ app ≠ Xiaomi; Valeu !!!',
    whyEn: 'Words: letter X / xis; x in conexão = nexus; ≠ app ≠ Xiaomi; Valeu !!!',
    whyEs: 'Palabras: letra X / xis; x de conexão = nexo; ≠ app ≠ Xiaomi; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [post.sourceUrl, LETRA_L, CONEXAO, '/posts/post-inspecao-palavra-xiaomi.html'],
    notes: 'Cap. ' + post.seriesOrder + ' — pedido inspeção em X.'
  });
  sug.items = sugItems;
  sug.updatedAt = new Date().toISOString();

  const guiaItems = Array.isArray(guia.items) ? guia.items : [];
  upsertItem(
    guiaItems,
    {
      id: 'letra-x',
      word: 'letra X',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        '24.ª letra (xis). Vários sons em PT. O x de conexão é nexo, não ç. ≠ app ≠ Xiaomi. Valeu !!!',
      simpleEn:
        '24th letter (xis). Several PT sounds. The x in conexão is nexus, not ç. ≠ app ≠ Xiaomi. Valeu !!!',
      simpleEs:
        '24.ª letra (xis). Varios sonidos en PT. La x de conexão es nexo, no ç. ≠ app ≠ Xiaomi. ¡Valeu !!!'
    },
    ['letra-l', 'zero', 'conexao']
  );
  guia.items = guiaItems;
  guia.updatedAt = new Date().toISOString();

  if (gloss) gloss = patchGlossary(gloss);

  upsertVidaPoem(vida, {
    id: 'letra-x',
    slug: 'letra-x',
    title: 'Letra X',
    titleEn: 'Letter X',
    titleEs: 'Letra X',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'O xis — uma cruz, várias salas; o nexo não é a app.',
    teaserEn: 'Xis — one cross, several rooms; nexus is not the app.',
    teaserEs: 'El xis — una cruz, varias salas; el nexo no es la app.',
    body: poemPt(),
    bodyEn: poemEn(),
    bodyEs: poemEs(),
    inspectionHref: HREF,
    tags: ['poesia', 'vida', 'letra', 'xis']
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
