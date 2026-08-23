'use strict';

/**
 * Injeta Tanzânia e Taz Manaia na série Palavras.
 * Uso: node scripts/upsert-palavra-tanzania-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { buildTanzaniaPost } = require('../lib/tanzania-inspecao-post.js');
const { buildTazManaiaPost } = require('../lib/taz-manaia-inspecao-post.js');

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
    build: buildTanzaniaPost,
    sugId: 'palavra-tanzania',
    sugTitle: 'Tanzânia — o país, o Taz e a relação com Taz Manaia',
    sugTitleEn: 'Tanzânia — the country, Taz, and the relation with Taz Manaia',
    sugTitleEs: 'Tanzânia — el país, el Taz y la relación con Taz Manaia',
    why: 'Palavras: Tanzânia = Tan+Zan+-ia (1964); Taz = hipocorístico; ≠ Tasmânia; relação com Taz Manaia; Valeu !!!',
    guiaId: 'tanzania',
    guiaWord: 'Tanzânia',
    guiaSimple:
      'País (PT Tanzânia / EN-sw. Tanzania); étimo Tanganica + Zanzibar + -ia (1964); Taz = alcunha; ≠ Tasmânia; relação com o lapso Taz Manaia; Valeu !!! neste mapa.',
    guiaAfter: ['mocambique', 'paraguai', 'relacao'],
    glossKey: 'tanzânia',
    glossAfter: 'moçambique',
    glossMain:
      '    tanzânia: { tone: "caution", category: "País", mundane: "República Unida da Tanzânia; grafia EN/sw. Tanzania.", gloss: "País ≠ Tasmânia ≠ Taz-Mania; étimo Tan+Zan+-ia (1964); Taz = hipocorístico; relação com Taz Manaia; Valeu !!! neste mapa.", href: "/posts/post-inspecao-palavra-tanzania.html", en: "Tanzania", es: "Tanzania", fr: "Tanzanie", it: "Tanzania", de: "Tansania", el: "Τανζανία", la: "Tanzania", yo: "Tanzania", sw: "Tanzania", gez: "Tanzania", nl: "Tanzania", pl: "Tanzania", ru: "Танзания", uk: "Танзанія", zh: "坦桑尼亚", ja: "タンザニア", ko: "탄자니아", ar: "تنزانيا", he: "טנזניה", hi: "तंज़ानिया", tr: "Tanzanya", sv: "Tanzania", da: "Tanzania", no: "Tanzania", fi: "Tansania", cs: "Tanzanie", ro: "Tanzania", hu: "Tanzánia", ca: "Tanzània", gl: "Tanzania", eu: "Tanzania", gn: "Tanzania", qu: "Tansanya", eo: "Tanzanio", vi: "Tanzania", id: "Tanzania", th: "แทนซาเนีย", hr: "Tanzanija", sk: "Tanzánia", ga: "An Tansáin", cy: "Tansanïa", ha: "Tanzaniya", am: "ታንዛኒያ", fa: "تانزانیا", bn: "তানজানিয়া", zu: "iTanzania" },\n',
    glossAliases:
      '    tanzania: { gloss: "Grafia EN/sw. de Tanzânia — o mesmo país; ver ficha.", href: "/posts/post-inspecao-palavra-tanzania.html", en: "Tanzania", es: "Tanzania" },\n' +
      '    tanzanio: { gloss: "Grafia sem acento de Tanzânia — o mesmo país.", href: "/posts/post-inspecao-palavra-tanzania.html", en: "Tanzania (unaccented)", es: "Tanzania (sin acento)" },\n' +
      '    tanganica: { gloss: "Peça continental do étimo de Tanzânia (Tanganyika); união 1964 com Zanzibar.", href: "/posts/post-inspecao-palavra-tanzania.html", en: "Tanganyika", es: "Tanganica" },\n' +
      '    zanzibar: { gloss: "Peça insular do étimo de Tanzânia (ár. Zanjibar); união 1964 com Tanganica.", href: "/posts/post-inspecao-palavra-tanzania.html", en: "Zanzibar", es: "Zanzíbar" },\n'
  },
  {
    build: buildTazManaiaPost,
    sugId: 'palavra-taz-manaia',
    sugTitle: 'Taz Manaia — o lapso Taz-Mania, o manaia e a relação com Tanzânia',
    sugTitleEn: 'Taz Manaia — the Taz-Mania slip, the manaia, and the relation with Tanzania',
    sugTitleEs: 'Taz Manaia — el lapsus Taz-Mania, el manaia y la relación con Tanzania',
    why: 'Palavras: Taz Manaia = lapso Taz-Mania × Taz × manaia māori; ≠ pessoa verificada; relação lexical com Tanzânia; Valeu !!!',
    guiaId: 'taz-manaia',
    guiaWord: 'Taz Manaia',
    guiaSimple:
      'Lapso de Taz-Mania (série) escrito como nome; Taz = Tanzânia e/ou diabo-da-Tasmânia; manaia māori ≠ meneia; ≠ biografia; relação lexical com Tanzânia; Valeu !!! neste entre.',
    guiaAfter: ['tanzania', 'relacao', 'meneia'],
    glossKey: '"taz manaia"',
    glossAfter: 'tanzânia',
    glossMain:
      '    "taz manaia": { tone: "caution", category: "Lapso", mundane: "Nome-lapso: Taz-Mania + Taz + manaia māori.", gloss: "≠ pessoa verificada ≠ país Tanzânia; relação lexical (o entre); manaia com respeito ≠ meneia; Valeu !!! neste nome.", href: "/posts/post-inspecao-palavra-taz-manaia.html", en: "Taz Manaia (slip)", es: "Taz Manaia (lapsus)", fr: "Taz Manaia", it: "Taz Manaia", de: "Taz Manaia", el: "Taz Manaia", la: "Taz Manaia", yo: "Taz Manaia", sw: "Taz Manaia", gez: "Taz Manaia", nl: "Taz Manaia", pl: "Taz Manaia", ru: "Taz Manaia", uk: "Taz Manaia", zh: "Taz Manaia", ja: "Taz Manaia", ko: "Taz Manaia", ar: "Taz Manaia", he: "Taz Manaia", hi: "Taz Manaia", tr: "Taz Manaia", sv: "Taz Manaia", da: "Taz Manaia", no: "Taz Manaia", fi: "Taz Manaia", cs: "Taz Manaia", ro: "Taz Manaia", hu: "Taz Manaia", ca: "Taz Manaia", gl: "Taz Manaia", eu: "Taz Manaia", gn: "Taz Manaia", qu: "Taz Manaia", eo: "Taz Manaia", vi: "Taz Manaia", id: "Taz Manaia", th: "Taz Manaia", hr: "Taz Manaia", sk: "Taz Manaia", ga: "Taz Manaia", cy: "Taz Manaia", ha: "Taz Manaia", am: "Taz Manaia", fa: "Taz Manaia", bn: "Taz Manaia", zu: "Taz Manaia" },\n',
    glossAliases:
      '    taz: { gloss: "Hipocorístico: Tanzânia e/ou personagem Taz (Taz-Mania); ver Tanzânia e Taz Manaia.", href: "/posts/post-inspecao-palavra-taz-manaia.html", en: "Taz", es: "Taz" },\n' +
      '    "taz-mania": { gloss: "Série Warner 1991–95 — terra fictícia Tazmania; ≠ Tanzânia; ver Taz Manaia.", href: "/posts/post-inspecao-palavra-taz-manaia.html", en: "Taz-Mania", es: "Taz-Mania" },\n' +
      '    manaia: { gloss: "Motivo māori (mensageiro/guardião na talha); neste circuito, peça do lapso Taz Manaia; ≠ meneia.", href: "/posts/post-inspecao-palavra-taz-manaia.html", en: "manaia", es: "manaia" },\n' +
      '    tasmânia: { gloss: "Ilha australiana (Abel Tasman) — ≠ Tanzânia; elo do Taz / Taz-Mania.", href: "/posts/post-inspecao-palavra-tanzania.html", en: "Tasmania", es: "Tasmania" },\n' +
      '    tasmania: { gloss: "Grafia EN de Tasmânia — ≠ Tanzania o país.", href: "/posts/post-inspecao-palavra-tanzania.html", en: "Tasmania", es: "Tasmania" },\n'
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
      '/posts/post-inspecao-palavra-relacao.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — cluster Tanzânia / Taz Manaia / Taz-Mania / relação.'
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
    console.log('Glossário actualizado (Tanzânia · Taz Manaia)');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
