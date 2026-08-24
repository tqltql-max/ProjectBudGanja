'use strict';

/**
 * Injeta Ariana / Áries e gera capas do guia de astrologia.
 * Uso: node scripts/upsert-palavra-ariana-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildArianaPost } = require('../lib/ariana-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-ariana.html';
const HUB = '/guia/astrologia.html';

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
    '    ariana: { tone: "craft", category: "Signo", mundane: "Nativa de Áries — o primeiro signo do zodíaco tropical.", gloss: "Lat. ariēs (carneiro); 1.º signo; ariano/arianos; ≠ horóscopo; ≠ ariano racial (ārya); hub Astrologia; Valeu !!!", href: "' +
    HREF +
    '", en: "Aries woman / Aries native", es: "ariana (signo Aries)" },\n';
  gloss = replaceOrInsertAfter(gloss, 'ariana', main, 'gêmeos');
  const aliases = [
    ['ariano', '    ariano: { gloss: "Nativo de Áries (m.) — 1.º signo; ≠ homógrafo racial (ārya); ver ariana.", href: "' + HREF + '", en: "Aries man / Aries native", es: "ariano (signo Aries)" },\n'],
    ['arianos', '    arianos: { gloss: "Plural de ariano — nativos do 1.º signo; ver ariana.", href: "' + HREF + '", en: "Aries natives", es: "arianos" },\n'],
    ['arianas', '    arianas: { gloss: "Plural feminino — nativas de Áries; ver ariana.", href: "' + HREF + '", en: "Aries women", es: "arianas" },\n'],
    ['"áries"', '    "áries": { gloss: "1.º signo tropical — lat. ariēs, carneiro; nativos ariano/ariana; ver ficha.", href: "' + HREF + '", en: "Aries (sign)", es: "Aries" },\n'],
    ['aries', '    aries: { gloss: "Lat./EN de Áries — o carneiro, 1.º signo; ver ariana.", href: "' + HREF + '", en: "Aries", es: "Aries" },\n'],
    ['ariete', '    ariete: { gloss: "Do lat. ariēs — máquina de arrombar / ponta de ataque; outra sala do signo Áries.", href: "' + HREF + '", en: "battering ram", es: "ariete" },\n'],
    ['zodiaco', '    zodiaco: { gloss: "Grafia sem acento de zodíaco — ciclo de 12 a partir de Áries; ver guia Astrologia.", href: "' + HUB + '", en: "zodiac", es: "zodiaco" },\n'],
    ['"zodíaco"', '    "zodíaco": { gloss: "Ciclo de 12 signos tropicais — Áries abre; página Astrologia.", href: "' + HUB + '", en: "zodiac", es: "zodíaco" },\n'],
    ['astrologia', '    astrologia: { gloss: "Céu nomeado × céu visto; Áries 1.º; ≠ horóscopo; guia dedicado.", href: "' + HUB + '", en: "astrology", es: "astrología" },\n']
  ];
  for (const pair of aliases) {
    gloss = replaceOrInsertAfter(gloss, pair[0], pair[1], 'ariana');
  }
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-ariana';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Ariana — Áries, o primeiro signo e as derivações',
    titleEn: 'Ariana — Aries, the first sign, and the derivations',
    titleEs: 'Ariana — Aries, el primer signo y las derivaciones',
    tipo: 'palavra',
    priority: 1,
    status: 'feita',
    why: 'Palavras: ariana / Áries — 1.º signo (lat. ariēs); ≠ horóscopo; ≠ ariano racial; guia Astrologia.',
    whyEn: 'Words: ariana / Aries — 1st sign (Lat. ariēs); ≠ horoscope; Astrology hub.',
    whyEs: 'Palabras: ariana / Áries — 1.º signo; ≠ horóscopo; hub Astrología.',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [post.sourceUrl, WIKI_LAT_SAFE(), HUB, '/posts/post-inspecao-palavra-gemeos.html'],
    notes: 'Cap. ' + post.seriesOrder + ' — primeiro signo; página /guia/astrologia.html'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function WIKI_LAT_SAFE() {
  return 'https://en.wiktionary.org/wiki/aries#Latin';
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'ariana',
    word: 'Ariana',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Nativa de Áries — 1.º signo (lat. ariēs, carneiro); ariano/arianos; ≠ horóscopo; ≠ ariano racial; guia Astrologia.',
    simpleEn:
      'Aries native — 1st tropical sign (Lat. ariēs, ram); ≠ horoscope; Astrology hub.',
    simpleEs:
      'Nativa de Aries — 1.º signo (lat. ariēs); ≠ horóscopo; hub Astrología.',
    history:
      'Áries vem do latim ariēs (carneiro) e abre o zodíaco tropical no equinócio de março. Ariana/ariano são os nativos. O homógrafo racial (sânsc. ārya) é outra família.',
    curiosities:
      'Nos Cavaleiros do Zodíaco a primeira casa é Áries (Mu). Carneiro é o nome PT-EU do signo. Fecho: Valeu !!!',
    historyEn:
      'Portuguese Áries comes from Latin ariēs (ram) and opens the tropical zodiac at the March equinox. Ariana/ariano name the natives. The racial homograph (Skt. ārya) is another family.',
    curiositiesEn:
      'In Saint Seiya the first house is Aries (Mu). Close: Valeu !!!',
    historyEs:
      'Áries viene del latín ariēs (carnero) y abre el zodiaco tropical en el equinoccio de marzo. El homógrafo racial (sánsc. ārya) es otra familia.',
    curiositiesEs:
      'En Los Caballeros del Zodiaco la primera casa es Aries (Mu). Cierre: ¡Valeu !!!'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'gemeos' || x.word === 'Gêmeos');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  const astro = {
    id: 'astrologia',
    word: 'Astrologia',
    group: 'lexico',
    fromTitle: false,
    href: HUB,
    simple: 'Página dedicada: 12 signos a partir de Áries; céu verificável (Aladin); Google Sky sem embed web.',
    simpleEn: 'Dedicated page: 12 signs from Aries; verifiable sky (Aladin); no Google Sky web embed.',
    simpleEs: 'Página dedicada: 12 signos desde Aries; cielo verificable (Aladin); Google Sky sin embed web.'
  };
  const ai = items.findIndex((x) => x.id === 'astrologia');
  if (ai >= 0) items[ai] = Object.assign({}, items[ai], astro);
  else items.splice(items.findIndex((x) => x.id === 'ariana') + 1, 0, astro);
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-ariana-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa Ariana:', e.message);
  }
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-astrologia-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa Astrologia:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildArianaPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia);
  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (ariana)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  const pagesPath = path.join(ROOT, 'content', 'pages.json');
  if (fs.existsSync(pagesPath)) {
    try {
      const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
      const pid = 'guia/astrologia.html';
      if (pages[pid]) {
        pages[pid].ogImage = '/imagens/inspecoes/astrologia-cover.jpg';
        await writeJsonRetry(pagesPath, pages);
        console.log('pages.json ogImage astrologia');
      }
    } catch (e) {
      console.warn('Aviso pages.json:', e.message);
    }
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
