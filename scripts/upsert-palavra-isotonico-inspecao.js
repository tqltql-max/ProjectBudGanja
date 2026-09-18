'use strict';

/**
 * Injeta palavra «isotônico» (isola o tônico) e actualiza a ficha-mãe tônico.
 * Uso: node scripts/upsert-palavra-isotonico-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildIsotonicoPost } = require('../lib/isotonico-inspecao-post.js');
const { buildTonicoPost } = require('../lib/tonico-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextOrder(posts, series) {
  const orders = posts
    .filter((p) => p.series === series)
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

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

async function syncSql(postsAll) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  for (const post of postsAll) upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado (isotônico / tônico)');
}

function upsertGloss(glossPath, key, entryLine, afterKeys) {
  if (!fs.existsSync(glossPath)) return;
  let gloss = fs.readFileSync(glossPath, 'utf8');
  const reKey = new RegExp('    ' + key + ':\\s*\\{[\\s\\S]*?\\},');
  if (reKey.test(gloss)) {
    gloss = gloss.replace(reKey, entryLine);
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (' + key + ' · existente)');
    return;
  }
  for (const ak of afterKeys) {
    const reAfter = new RegExp(
      '(    ' + ak + ':\\s*\\{[\\s\\S]*?zu:\\s*"[^"]*"\\s*\\},?\\r?\\n)'
    );
    if (reAfter.test(gloss)) {
      gloss = gloss.replace(reAfter, '$1' + entryLine + '\n');
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (' + key + ' · após ' + ak + ')');
      return;
    }
  }
  console.warn('Aviso: glossário — inserção falhou para', key);
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existingIso = posts.find((p) => p.slug === 'inspecao-palavra-isotonico');
  const existingTon = posts.find((p) => p.slug === 'inspecao-palavra-tonico');
  const isoOrder = existingIso
    ? Number(existingIso.seriesOrder) || nextOrder(posts, 'palavras-origem')
    : nextOrder(posts, 'palavras-origem');
  const tonOrder = existingTon
    ? Number(existingTon.seriesOrder) || 134
    : 134;

  const iso = buildIsotonicoPost(isoOrder);
  const ton = buildTonicoPost(tonOrder);
  upsertPost(posts, iso);
  upsertPost(posts, ton);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, iso);
  writeI18n(i18n, ton);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + iso.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-isotonico';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Isotônico — iso- + tônico, tensão igual',
      titleEn: 'Isotônico — iso- + tônico, equal tension',
      titleEs: 'Isotônico — iso- + tônico, tensión igual',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: isotônico — isola o tônico; osmose × músculo × gôndola; ≠ chá/sílaba/água tónica.',
      whyEn: 'Words: isotônico — isolates tônico; osmosis × muscle × shelf; ≠ herb/stress/tonic water.',
      whyEs: 'Palabras: isotônico — aísla el tônico; ósmosis × músculo × góndola; ≠ té/sílaba/agua tónica.',
      suggestedSlug: iso.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        iso.sourceUrl,
        '/posts/post-inspecao-palavra-tonico.html',
        '/posts/post-inspecao-palavra-agua.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + iso.seriesOrder + ' — iso- + tônico isolado.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-isotonico)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'isotonico',
      word: 'isotônico',
      simple:
        'iso- (igual) + tônico (tónos) — tensão igual: osmose, músculo, gôndola; isola a peça tônico; ≠ chá/sílaba/água tónica; Faça o melhor!',
      simpleEn:
        'iso- (equal) + tônico (tónos) — equal tension: osmosis, muscle, shelf; isolates the tônico piece; ≠ herb/stress/tonic water; Do your best!',
      simpleEs:
        'iso- (igual) + tônico (tónos) — tensión igual: ósmosis, músculo, góndola; aísla la pieza tônico; ≠ té/sílaba/agua tónica; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Isotônico junta o grego ísos (igual) ao tónos (tensão). No português nomeia solução de osmolaridade igual à do plasma, contração muscular de tónus constante e o rótulo da bebida desportiva.',
      curiosities:
        'A ficha isola o tônico: aqui é só tensão igualada — não sílaba, não chá, não água tónica. Hipotônico e hipertônico usam a mesma peça.',
      historyEn:
        'Portuguese isotônico joins Greek ísos (equal) to tónos (tension). It names a solution matching plasma osmolarity, a constant-tension muscle contraction, and the sports-drink label.',
      curiositiesEn:
        'The sheet isolates tônico: here it is only equalised tension — not syllable, herb, or tonic water. Hypotonic and hypertonic keep the same piece.',
      historyEs:
        'Isotônico junta el griego ísos (igual) al tónos (tensión). En portugués nombra solución de osmolaridad igual a la del plasma, contracción de tónus constante y el rótulo de la bebida deportiva.',
      curiositiesEs:
        'La ficha aísla el tônico: aquí es solo tensión igualada — no sílaba, no té, no agua tónica. Hipotónico e hipertónico usan la misma pieza.'
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'tonico' || x.id === 'interruptor');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (isotônico)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  upsertGloss(
    glossPath,
    'isotonico',
    '    isotonico: { tone: "caution", category: "Tensão igual", mundane: "iso- + tônico — osmose, músculo ou lata de gôndola.", gloss: "Isola o tônico: tensão igual; ≠ chá, sílaba, água tónica; Faça o melhor na etiqueta.", href: "/posts/post-inspecao-palavra-isotonico.html", en: "isotonic", es: "isotónico", fr: "isotonique", it: "isotonico", de: "isotonisch", el: "ισοτονικός", la: "isotonicus", yo: "iso-toniki", sw: "isotoni", gez: "isotoni", nl: "isotoon", pl: "izotoniczny", ru: "izotonicheskii", uk: "izotonichnyi", zh: "dengshen", ja: "totoatsu", ko: "deungjang", ar: "mutasawi al-tawattur", he: "izotoni", hi: "isotonic", tr: "izotonik", sv: "isoton", da: "isotonisk", no: "isotonisk", fi: "isotoninen", cs: "izotonicky", ro: "izotonic", hu: "izotonias", ca: "isotonic", gl: "isotonico", eu: "isotoniko", gn: "isotonico", qu: "isotonico", eo: "izotona", vi: "dang truong", id: "isotonik", th: "isotonic", hr: "izotonicni", sk: "izotonicky", ga: "iseatonach", cy: "isotonaidd", ha: "isotonik", am: "isotonic", fa: "izotonik", bn: "isotonic", zu: "i-isotonic" },',
    ['tonico', 'tempo']
  );
  upsertGloss(
    glossPath,
    '"isotônico"',
    '    "isotônico": { gloss: "Forma com acento — ver isotonico (iso- + tônico isolado).", href: "/posts/post-inspecao-palavra-isotonico.html", en: "isotonic (accented)", es: "isotónico (con acento)" },',
    ['isotonico', 'tonico']
  );
  upsertGloss(
    glossPath,
    'hipotonico',
    '    hipotonico: { gloss: "hipo- + tônico — tensão abaixo da referência; ver isotônico.", href: "/posts/post-inspecao-palavra-isotonico.html", en: "hypotonic", es: "hipotónico" },',
    ['isotonico', '"isotônico"']
  );
  upsertGloss(
    glossPath,
    'hipertonico',
    '    hipertonico: { gloss: "hiper- + tônico — tensão acima da referência; ver isotônico.", href: "/posts/post-inspecao-palavra-isotonico.html", en: "hypertonic", es: "hipertónico" },',
    ['hipotonico', 'isotonico']
  );

  try {
    await syncSql([iso, ton]);
  } catch (e) {
    console.warn('Aviso SQL:', e.message);
  }

  console.log('OK:', iso.title, '· Cap.', iso.seriesOrder);
  console.log('OK mãe:', ton.slug, '· Cap.', ton.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
