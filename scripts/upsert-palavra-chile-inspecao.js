'use strict';

/**
 * Injeta a palavra «Chile» (país) na série Palavras.
 * Uso: node scripts/upsert-palavra-chile-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildChilePost,
  poemPt,
  poemEn,
  poemEs
} = require('../lib/chile-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-chile.html';

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

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n');
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
    '    chile: { tone: "warm", category: "País", mundane: "República do Chile — o país; faixa Andes–Pacífico.", gloss: "Chile = país (étimo em disputa); ≠ chile/chili náuatle (pimenta); no Cone Sul o fruto é ají; Valeu !!!", href: "' +
    HREF +
    '", en: "Chile", es: "Chile", fr: "Chili", it: "Cile", de: "Chile", el: "Χιλή", la: "Chili", yo: "Chile", sw: "Chile", gez: "Chile", nl: "Chili", pl: "Chile", ru: "Чили", uk: "Чилі", zh: "智利", ja: "チリ", ko: "칠레", ar: "تشيلي", he: "צ\'ילה", hi: "चिली", tr: "Şili", sv: "Chile", da: "Chile", no: "Chile", fi: "Chile", cs: "Chile", ro: "Chile", hu: "Chile", ca: "Xile", gl: "Chile", eu: "Txile", gn: "Chile", qu: "Chili", eo: "Ĉilio", vi: "Chile", id: "Cile", th: "ชิลี", hr: "Čile", sk: "Čile", ga: "An tSile", cy: "Chile", ha: "Chile", am: "ቺሊ", fa: "شیلی", bn: "চিলি", zu: "iChile" },\n';
  const aliases = [
    '    "Chile": { gloss: "Grafia com maiúscula — o mesmo país; ver chile.", href: "' + HREF + '", en: "Chile", es: "Chile" },\n',
    '    chileno: { gloss: "Gentílico — pessoa / cultura do Chile (país); ≠ pimenta.", href: "' + HREF + '", en: "Chilean", es: "chileno" },\n',
    '    chilena: { gloss: "Gentílico feminino — ver Chile (país).", href: "' + HREF + '", en: "Chilean (f.)", es: "chilena" },\n',
    '    chili: { gloss: "EN/internacional — pimenta náuatle; ≠ o país Chile; ver Chile e México.", href: "' + HREF + '", en: "chili", es: "chile (pimienta)" },\n',
    '    chilli: { gloss: "Grafia EN britânica da pimenta — ≠ país Chile.", href: "' + HREF + '", en: "chilli", es: "chile (pimienta)" },\n',
    '    "chile pimenta": { gloss: "Homógrafo da pimenta náuatle — ≠ o país; ver Chile.", href: "' + HREF + '", en: "chili pepper", es: "chile (Capsicum)" },\n',
    '    ají: { gloss: "Nome andino do fruto picante — no Chile-país costuma ser ají, não chile; ver Chile.", href: "' + HREF + '", en: "ají", es: "ají" },\n',
    '    aji: { gloss: "Grafia sem acento de ají — ver Chile (país ≠ pimenta).", href: "' + HREF + '", en: "aji", es: "ají" },\n',
    '    chilly: { gloss: "EN frio/fresco — rima com hipótese quéchua chiri; ≠ o país; ver Chile e calor × frio.", href: "' + HREF + '", en: "chilly", es: "frío (EN chilly)" },\n'
  ].join('');

  gloss = replaceOrInsertAfter(gloss, 'chile', main, 'mexico');
  for (const line of aliases.split('\n').filter(Boolean)) {
    const key = line.match(/^\s+("[^"]+"|[a-z0-9áí-]+):/i)[1];
    gloss = replaceOrInsertAfter(gloss, key, line + '\n', 'chile');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-chile-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildChilePost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';
  const vida = fs.existsSync(VIDA_FILE) ? JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8')) : { poems: [] };

  upsertPost(posts, post);
  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML', e.message);
  }
  writeI18n(i18n, post);
  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  const sugItems = Array.isArray(sug.items) ? sug.items : [];
  upsertItem(sugItems, {
    id: 'palavra-chile',
    title: 'Chile — o país, não a pimenta',
    titleEn: 'Chile — the country, not the pepper',
    titleEs: 'Chile — el país, no el chile',
    tipo: 'palavra',
    priority: 1,
    status: 'feita',
    why: 'Palavras: Chile = país (étimo em disputa); ≠ chile/chili náuatle; ají no Cone Sul; Valeu !!!',
    whyEn: 'Words: Chile = country (etymon disputed); ≠ Nahuatl chile/chili; Valeu !!!',
    whyEs: 'Palabras: Chile = país (étimo en disputa); ≠ chile náhuatl; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      '/posts/post-inspecao-palavra-mexico.html',
      '/posts/post-inspecao-palavra-calor-frio.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — pedido Chile País.'
  });
  sug.items = sugItems;
  sug.updatedAt = new Date().toISOString();

  const guiaItems = Array.isArray(guia.items) ? guia.items : [];
  upsertItem(
    guiaItems,
    {
      id: 'chile',
      word: 'Chile',
      simple:
        'País (faixa Andes–Pacífico). Étimo em disputa. ≠ chile/chili (pimenta náuatle). No Cone Sul o fruto é ají. Valeu !!!',
      simpleEn:
        'Country (Andes–Pacific strip). Etymon disputed. ≠ chile/chili (Nahuatl pepper). In the Southern Cone the pod is ají. Valeu !!!',
      simpleEs:
        'País (franja Andes–Pacífico). Étimo en disputa. ≠ chile/chili (pimienta náhuatl). En el Cono Sur el fruto es ají. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      history:
        'O nome Chile (país) tem étimo disputado: mapudungun chilli («onde a terra acaba»), quéchua chiri («frio») ou um vale chamado Chili. Não vem da pimenta náuatle chīlli — essa via é mexicana.',
      curiosities:
        'No Chile o fruto picante costuma chamar-se ají; chile como pimenta é espanhol do México. Pedido de campo: Chile País — para não sentar o condimento na cadeira.',
      historyEn:
        'The country name Chile has a disputed etymon: Mapudungun chilli (“where the land ends”), Quechua chiri (“cold”), or a valley called Chili. It does not come from Nahuatl chīlli — that path is Mexican.',
      curiositiesEn:
        'In Chile the hot pod is usually ají; chile as pepper is Mexican Spanish. Field request: Chile the country — so the condiment does not take the chair.',
      historyEs:
        'El nombre Chile (país) tiene étimo disputado: mapudungun chilli, quechua chiri, o un valle Chili. No viene del náhuatl chīlli — esa vía es mexicana.',
      curiositiesEs:
        'En Chile el fruto picante suele llamarse ají; chile como pimienta es español de México. Pedido de campo: Chile País.'
    },
    ['mexico', 'paraguai']
  );
  guia.items = guiaItems;
  guia.updatedAt = new Date().toISOString();

  gloss = patchGlossary(gloss);

  upsertVidaPoem(vida, {
    id: 'chile',
    slug: 'chile',
    title: 'Chile',
    titleEn: 'Chile',
    titleEs: 'Chile',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'Uma faixa no mapa — o país, não a pimenta.',
    teaserEn: 'A strip on the map — the country, not the pepper.',
    teaserEs: 'Una franja en el mapa — el país, no el chile.',
    body: poemPt(),
    bodyEn: poemEn(),
    bodyEs: poemEs(),
    inspectionHref: HREF,
    tags: ['poesia', 'vida', 'chile', 'país']
  });

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  await writeJsonRetry(GLOSS_FILE, gloss);
  await writeJsonRetry(VIDA_FILE, vida);

  console.log('OK', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
