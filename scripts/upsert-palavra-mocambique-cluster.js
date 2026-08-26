'use strict';

/**
 * Injeta Moçambique e isqueiro BIC na série Palavras.
 * Uso: node scripts/upsert-palavra-mocambique-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { buildMocambiquePost } = require('../lib/mocambique-inspecao-post.js');
const { buildIsqueiroBicPost } = require('../lib/isqueiro-bic-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

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
    console.log('Actualizado', post.slug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss, mainKey, mainLine, aliases, afterKey) {
  if (new RegExp(mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{').test(gloss)) {
    gloss = gloss.replace(
      new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
  } else {
    const inserted = insertAfterKey(gloss, afterKey, mainLine + aliases);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção falhou para', mainKey);
  }
  return gloss;
}

const ITEMS = [
  {
    build: buildMocambiquePost,
    sugId: 'palavra-mocambique',
    sugTitle: 'Moçambique — o país, o tónos em BI e o lapso esqueiro biq',
    sugTitleEn: 'Moçambique — the country, the tónos on BI, and the slip esqueiro biq',
    sugTitleEs: 'Moçambique — el país, el tónos en BI y el lapsus esqueiro biq',
    why: 'Palavras: Moçambique = país; tónico em BI; esqueiro biq = Biq × isqueiro BIC; ≠ marca como étimo; Valeu !!!',
    guiaId: 'mocambique',
    guiaWord: 'Moçambique',
    guiaSimple:
      'País lusófono (PT Moçambique / EN Mozambique / sw. Msumbiji); étimo Mussa Bin Bique; tónico em BI; lapso esqueiro biq ≠ isqueiro BIC; Valeu !!! neste mapa.',
    guiaAfter: ['paraguai', 'tonico', 'lingua-portuguesa'],
    glossKey: 'moçambique',
    glossAfter: 'paraguai',
    glossMain:
      '    moçambique: { tone: "caution", category: "País", mundane: "República de Moçambique; grafia EN Mozambique.", gloss: "País ≠ isqueiro BIC; étimo Mussa Bin Bique / Biq; tónico em BI; lapso esqueiro biq; Valeu !!! neste mapa.", href: "/posts/post-inspecao-palavra-mocambique.html", en: "Mozambique", es: "Mozambique", fr: "Mozambique", it: "Mozambico", de: "Mosambik", el: "Μοζαμβίκη", la: "Mozambicum", yo: "Mozambique", sw: "Msumbiji", gez: "Mozambique", nl: "Mozambique", pl: "Mozambik", ru: "Мозамбик", uk: "Мозамбік", zh: "莫桑比克", ja: "モザンビーク", ko: "모잠비크", ar: "موزمبيق", he: "מוזמביק", hi: "मोज़ाम्बिक", tr: "Mozambik", sv: "Moçambique", da: "Mozambique", no: "Mosambik", fi: "Mosambik", cs: "Mosambik", ro: "Mozambic", hu: "Mozambik", ca: "Moçambic", gl: "Mozambique", eu: "Mozambike", gn: "Mosambike", qu: "Musambiki", eo: "Mozambiko", vi: "Mozambique", id: "Mozambik", th: "โมซัมบิก", hr: "Mozambik", sk: "Mozambik", ga: "Mósaimbíc", cy: "Mozambique", ha: "Mozambique", am: "ሞዛምቢክ", fa: "موزامبیک", bn: "মোজাম্বিক", zu: "iMozambique" },\n',
    glossAliases:
      '    mozambique: { gloss: "Grafia EN/ES de Moçambique — o mesmo país; ver ficha.", href: "/posts/post-inspecao-palavra-mocambique.html", en: "Mozambique", es: "Mozambique" },\n' +
      '    mocambique: { gloss: "Grafia sem cedilha de Moçambique — o mesmo país.", href: "/posts/post-inspecao-palavra-mocambique.html", en: "Mozambique (unaccented)", es: "Mozambique (sin cedilla)" },\n' +
      '    "mussa bin bique": { gloss: "Xeique tradicional do étimo de Moçambique — Biq ≠ marca BIC.", href: "/posts/post-inspecao-palavra-mocambique.html", en: "Musa ibn Bique", es: "Musa ibn Bique" },\n' +
      '    "esqueiro biq": { gloss: "Lapso: isqueiro BIC × Biq de Moçambique — ler as duas fichas.", href: "/posts/post-inspecao-palavra-mocambique.html", en: "esqueiro biq (slip)", es: "esqueiro biq (lapsus)" },\n'
  },
  {
    build: buildIsqueiroBicPost,
    sugId: 'palavra-isqueiro-bic',
    sugTitle: 'Isqueiro BIC — tónos do polegar e o lapso esqueiro biq',
    sugTitleEn: 'BIC lighter — thumb tónos and the slip esqueiro biq',
    sugTitleEs: 'Encendedor BIC — tónos del pulgar y el lapsus esqueiro biq',
    why: 'Palavras: isqueiro BIC = utensílio + marca 1973; tónos = tensão (~42 N); esqueiro biq ≠ Moçambique; Valeu !!!',
    guiaId: 'isqueiro-bic',
    guiaWord: 'isqueiro BIC',
    guiaSimple:
      'Isca + -eiro (lat. esca); marca BIC 1973; tónos do polegar (~42 N); lapso esqueiro biq cola ao Biq de Moçambique; ≠ país; Valeu !!! nesta chama.',
    guiaAfter: ['mocambique', 'fogo', 'cinzeiro'],
    glossKey: 'isqueiro',
    glossAfter: 'moçambique',
    glossMain:
      '    isqueiro: { tone: "caution", category: "Utensílio", mundane: "Aparelho de acender; tipo BIC = marca 1973.", gloss: "Isca + -eiro; tónos = tensão do polegar; lapso esqueiro biq ≠ Moçambique; elos fogo/cinzeiro; Valeu !!! nesta chama.", href: "/posts/post-inspecao-palavra-isqueiro-bic.html", en: "lighter", es: "encendedor", fr: "briquet", it: "accendino", de: "Feuerzeug", el: "αναπτήρας", la: "igniarium", yo: "iná ìtàná", sw: "kiberiti", gez: "mästäwəq", nl: "aansteker", pl: "zapalniczka", ru: "зажигалка", uk: "запальничка", zh: "打火机", ja: "ライター", ko: "라이터", ar: "ولاعة", he: "מצית", hi: "लाइटर", tr: "çakmak", sv: "tändare", da: "lighter", no: "lighter", fi: "sytytin", cs: "zapalovač", ro: "brichetă", hu: "öngyújtó", ca: "encenedor", gl: "isqueiro", eu: "pizgailu", gn: "tata mbopuha", qu: "nina ruwaq", eo: "bruligilo", vi: "bật lửa", id: "korek api", th: "ไฟแช็ก", hr: "uppaljač", sk: "zapaľovač", ga: "lastóir", cy: "taniwr", ha: "wuta", am: "ማቀጣጠያ", fa: "فندک", bn: "লাইটার", zu: "isikhanyiso" },\n',
    glossAliases:
      '    "isqueiro bic": { gloss: "Tipo / marca do isqueiro — ver ficha; ≠ país Moçambique.", href: "/posts/post-inspecao-palavra-isqueiro-bic.html", en: "BIC lighter", es: "encendedor BIC" },\n' +
      '    esqueiro: { gloss: "Lapso de isqueiro (ou escada minhota) — ver isqueiro BIC.", href: "/posts/post-inspecao-palavra-isqueiro-bic.html", en: "isqueiro (slip)", es: "encendedor (lapsus)" },\n' +
      '    bic: { gloss: "Marca (Bich → BIC, isqueiro 1973); homofonia com Biq de Moçambique.", href: "/posts/post-inspecao-palavra-isqueiro-bic.html", en: "BIC", es: "BIC" },\n'
  }
];

function upsertSug(sug, post, cfg) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const href = '/posts/post-' + post.slug + '.html';
  const si = items.findIndex((x) => x.id === cfg.sugId);
  const entry = {
    id: cfg.sugId,
    title: cfg.sugTitle,
    titleEn: cfg.sugTitleEn,
    titleEs: cfg.sugTitleEs,
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: cfg.why,
    whyEn: cfg.why,
    whyEs: cfg.why,
    suggestedSlug: post.slug,
    doneHref: href,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      '/posts/post-inspecao-palavra-tonico.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — cluster Moçambique / isqueiro BIC / tónos / esqueiro biq.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, post, cfg) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const href = '/posts/post-' + post.slug + '.html';
  const entry = {
    id: cfg.guiaId,
    word: cfg.guiaWord,
    simple: cfg.guiaSimple,
    simpleEn: cfg.guiaSimple,
    simpleEs: cfg.guiaSimple,
    group: 'lexico',
    fromTitle: false,
    href
  };
  const gi = items.findIndex((x) => x.id === cfg.guiaId || x.word === cfg.guiaWord);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    let after = -1;
    for (const id of cfg.guiaAfter || []) {
      after = items.findIndex((x) => x.id === id);
      if (after >= 0) break;
    }
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  for (const cfg of ITEMS) {
    const post = stampFiles(cfg.build());
    upsertPost(posts, post);
    await writeJsonRetry(POSTS_FILE, posts);
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML:', e.message);
    }
    writeI18n(i18n, post);
    upsertSug(sug, post, cfg);
    upsertGuia(guia, post, cfg);
    if (gloss) {
      gloss = patchGlossary(
        gloss,
        cfg.glossKey,
        cfg.glossMain,
        cfg.glossAliases || '',
        cfg.glossAfter
      );
    }
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
    console.log('OK:', post.title, '· Cap.', post.seriesOrder);
  }

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (Moçambique · isqueiro BIC)');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
