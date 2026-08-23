'use strict';

/**
 * Injeta palavra «tônico» (tônicos da palavra + outros sentidos).
 * Uso: node scripts/upsert-palavra-tonico-inspecao.js
 */

const fs = require('fs');
const path = require('path');
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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-tonico');
  const order = existing
    ? Number(existing.seriesOrder) || nextOrder(posts, 'palavras-origem')
    : nextOrder(posts, 'palavras-origem');
  const post = buildTonicoPost(order);
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-tonico';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Tônico — tônicos da palavra e os outros sentidos de tónos',
      titleEn: 'Tônico — word stress, lab tone, and the other senses of tónos',
      titleEs: 'Tônico — tónicos de la palabra y los otros sentidos de tónos',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: tônico — sílaba tônica × tom do lab × planta × Ayurveda × crise × música × músculo × cosmética × água tónica.',
      whyEn: 'Words: tônico — stress × lab tone × herb × Ayurveda × seizure × music × muscle × cosmetic × tonic water.',
      whyEs: 'Palabras: tônico — sílaba × tono lab × planta × Ayurveda × crisis × música × músculo × cosmética × agua tónica.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-lingua-portuguesa.html',
        '/posts/post-inspecao-planta-pfaffia.html',
        '/posts/post-inspecao-expressao-jesusudavi.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — mapa de sentidos; não fundir ofícios.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-tonico)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'tonico',
      word: 'tônico',
      simple:
        'Gr. tónos / lat. tonus — sílaba tônica × tom do lab × planta × Ayurveda × crise × música × músculo × cosmética × água tónica; não fundir; Valeu !!!',
      simpleEn:
        'Gr. tónos / Lat. tonus — stress × lab tone × herb × Ayurveda × seizure × music × muscle × cosmetic × tonic water; do not fuse; Valeu !!!',
      simpleEs:
        'Gr. tónos / lat. tonus — sílaba × tono lab × planta × Ayurveda × crisis × música × músculo × cosmética × agua tónica; no fusionar; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Tônico vem do grego tónos (tensão, tom, corda) via latim tonus. No português cobre sílaba tônica, tom afectivo, preparação vegetal, crise tônico-clónica, tónica musical, tónus do corpo, cosmética e água tónica.',
      curiosities:
        'O laboratório trata «tônicos da palavra» como pico de sílaba e, à parte, como tone do glossário — dois ofícios do mesmo étimo, sem fundir com o chá.',
      historyEn:
        'Portuguese tônico comes from Greek tónos (tension, pitch, string) via Latin tonus. It covers stressed syllable, affective tone, herbal preparation, tonic-clonic seizure, musical tonic, muscle tone, cosmetics and tonic water.',
      curiositiesEn:
        'The lab reads “tones of the word” as syllable peak and, separately, as glossary tone — two offices of one etymon, not fused with the tea.',
      historyEs:
        'Tônico viene del griego tónos (tensión, tono, cuerda) vía latín tonus. En portugués cubre sílaba tónica, tono afectivo, preparación vegetal, crisis tónico-clónica, tónica musical, tono muscular, cosmética y agua tónica.',
      curiositiesEs:
        'El laboratorio trata «tónicos de la palabra» como pico de sílaba y, aparte, como tone del glosario — dos oficios del mismo étimo, sin fusionar con el té.'
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'tônico');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'lingua-portuguesa' || x.id === 'tempo' || x.id === 'emocao'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (tônico)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  upsertGloss(
    glossPath,
    'tonico',
    '    tonico: { tone: "caution", category: "Tensão", mundane: "Adjectivo / substantivo — sílaba, tom, planta, música, corpo, bebida.", gloss: "Gr. tónos — mapa de sentidos; tônicos da palavra ≠ chá; Valeu !!! sem fundir.", href: "/posts/post-inspecao-palavra-tonico.html", en: "tonic / stressed", es: "tónico", fr: "tonique", it: "tonico", de: "tonisch / Tonika", el: "τονικός", la: "tonicus", yo: "okun", sw: "toniki", gez: "tonos", nl: "tonisch", pl: "toniczny", ru: "tonicheskii", uk: "tonichnyi", zh: "tonic", ja: "tonic", ko: "tonic", ar: "tonik", he: "toni", hi: "tonic", tr: "tonik", sv: "tonisk", da: "tonisk", no: "tonisk", fi: "toninen", cs: "tonicky", ro: "tonic", hu: "tonikus", ca: "tonic", gl: "tonico", eu: "toniko", gn: "tonico", qu: "tonico", eo: "tonika", vi: "tonic", id: "tonik", th: "tonic", hr: "tonican", sk: "tonicky", ga: "tonach", cy: "tonig", ha: "tonik", am: "tonic", fa: "tonik", bn: "tonic", zu: "i-tonic" },',
    ['tempo', 'tudo', 'lingua']
  );
  upsertGloss(
    glossPath,
    '"tônico"',
    '    "tônico": { gloss: "Forma com acento — ver tonico (mapa de sentidos).", href: "/posts/post-inspecao-palavra-tonico.html", en: "tonic (accented)", es: "tónico (con acento)" },',
    ['tonico', 'tempo']
  );
  upsertGloss(
    glossPath,
    'tónicos',
    '    tónicos: { gloss: "Plural / grafia PT-PT — ver tônico.", href: "/posts/post-inspecao-palavra-tonico.html", en: "tonics (pl.)", es: "tónicos" },',
    ['tonico', '"tônico"']
  );
  upsertGloss(
    glossPath,
    '"sílaba tônica"',
    '    "sílaba tônica": { gloss: "Pico de intensidade na boca — tônico da palavra (sentido 1); ver ficha tônico.", href: "/posts/post-inspecao-palavra-tonico.html", en: "stressed syllable", es: "sílaba tónica" },',
    ['tonico', 'tónicos']
  );

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
