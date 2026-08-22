'use strict';

/**
 * Injeta objecto «violão» na série Palavras (catálogo Objetos).
 * Uso: node scripts/upsert-palavra-violao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildViolaoPost } = require('../lib/violao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
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

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-violao');
  const taken = new Set(posts.map((p) => Number(p.seriesOrder) || 0));
  let seriesOrder = existing && typeof existing.seriesOrder === 'number' ? existing.seriesOrder : 176;
  if (!existing) {
    while (taken.has(seriesOrder) && seriesOrder < 280) seriesOrder += 1;
  }
  const post = buildViolaoPost(seriesOrder);

  upsertPost(posts, post);
  let cordaPost = null;
  try {
    const { buildCordaPost } = require('../lib/corda-inspecao-post.js');
    const existingCorda = posts.find((p) => p.slug === 'inspecao-palavra-corda');
    if (existingCorda) {
      cordaPost = buildCordaPost(existingCorda.seriesOrder);
      upsertPost(posts, cordaPost);
    }
  } catch (e) {
    console.warn('Aviso corda:', e.message);
  }
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  if (cordaPost) writeI18n(i18n, cordaPost);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'objeto-violao';
    const si = items.findIndex((x) => x.id === sugId || x.id === 'palavra-violao');
    const entry = {
      id: sugId,
      title: 'Violão — o objecto onde as cordas afinam',
      titleEn: 'Violão — the object where the strings are tuned',
      titleEs: 'Violão — el objeto donde se afinan las cuerdas',
      tipo: 'objeto',
      priority: 2,
      status: 'feita',
      why: 'Objecto: violão (viola + -ão) — guitarra clássica/acústica BR; ≠ guitarra eléctrica; elos corda/tónos/gesto; catálogo Objetos.',
      whyEn: 'Object: violão (viola + -ão) — BR classical/acoustic guitar; ≠ electric guitarra; links corda/tónos/gesture; Objects catalog.',
      whyEs: 'Objeto: violão (viola + -ão) — guitarra clásica/acústica BR; ≠ guitarra eléctrica; vínculos corda/tónos/gesto; catálogo Objetos.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Viol%C3%A3o',
        '/posts/post-inspecao-palavra-afinar.html',
        '/posts/post-inspecao-palavra-corda.html',
        '/posts/post-inspecao-palavra-tonos.html',
        '/objetos/',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — objecto BR; cordas no braço; ≠ eléctrica.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (objeto-violao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'violao',
      word: 'violão',
      simple:
        'Viola + -ão — objecto BR (guitarra clássica/acústica); ≠ guitarra eléctrica; cordas no braço; afinar = tónos; Valeu !!!',
      simpleEn:
        'Viola + -ão — BR object (classical/acoustic guitar); ≠ electric guitarra; strings on the neck; tuning = tónos; Valeu !!!',
      simpleEs:
        'Viola + -ão — objeto BR (guitarra clásica/acústica); ≠ guitarra eléctrica; cuerdas en el brazo; afinar = tónos; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === 'violao' || x.word === 'violão');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'corda' || x.id === 'objetos' || x.id === 'tónos' || x.id === 'tonos');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (violão)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    violão: { tone: "craft", category: "Objecto", mundane: "Guitarra clássica / acústica (BR) — caixa, braço, cordas de nylon.", gloss: "Viola + -ão — objecto onde as cordas afinam; ≠ guitarra eléctrica ≠ viola caipira; Valeu !!!", href: "/posts/post-inspecao-palavra-violao.html", en: "classical / acoustic guitar", es: "guitarra clásica / acústica", fr: "guitare classique", it: "chitarra classica", de: "Konzertgitarre", el: "κλασική κιθάρα", la: "cithara", yo: "gita", sw: "gitaa", gez: "guitar", nl: "klassieke gitaar", pl: "gitara klasyczna", ru: "классическая гитара", uk: "класична гітара", zh: "古典吉他", ja: "クラシックギター", ko: "클래식 기타", ar: "قيثارة كلاسيكية", he: "גיטרה קלאסית", hi: "क्लासिकल गिटार", tr: "klasik gitar", sv: "klassisk gitarr", da: "klassisk guitar", no: "klassisk gitar", fi: "klassinen kitara", cs: "klasická kytara", ro: "chitară clasică", hu: "klasszikus gitár", ca: "guitarra clàssica", gl: "guitarra clásica", eu: "gitarra klasiko", gn: "mbaraka", qu: "guitarra", eo: "klasika gitaro", vi: "ghita cổ điển", id: "gitar klasik", th: "กีตาร์คลาสสิก", hr: "klasična gitara", sk: "klasická gitara", ga: "giotár clasaiceach", cy: "gitâr glasurol", ha: "guitar", am: "ጊታር", fa: "گیتار کلاسیک", bn: "ক্লাসিক্যাল গিটার", zu: "isiginci" },';
    const aliases =
      '    violao: { gloss: "Grafia sem til — ver violão.", href: "/posts/post-inspecao-palavra-violao.html", en: "violao (unaccented)", es: "violao (sin til)" },\n' +
      '    violões: { gloss: "Plural de violão — o mesmo objecto.", href: "/posts/post-inspecao-palavra-violao.html", en: "violões (plural)", es: "violões (plural)" },\n' +
      '    guitarra: { gloss: "No BR, quase só a eléctrica — o acústico é violão; ver ficha do objecto.", href: "/posts/post-inspecao-palavra-violao.html", en: "electric guitar (BR map)", es: "guitarra eléctrica (mapa BR)" },';
    if (/violão:\s*\{/.test(gloss) || /"violão":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    violão:\s*\{[\s\S]*?\},/, entryLine);
      if (!/    violao:\s*\{/.test(gloss)) {
        gloss = gloss.replace(entryLine, entryLine + '\n' + aliases);
      }
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (violão · existente)');
    } else {
      const reCorda = /(    corda:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reCorda.test(gloss)) {
        gloss = gloss.replace(reCorda, '$1' + entryLine + '\n' + aliases + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (violão · após corda)');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
      }
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
