'use strict';

/**
 * Injeta palavras «tudo» e «alma» na série Palavras.
 * Uso: node scripts/upsert-palavra-tudo-alma-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildTudoPost } = require('../lib/tudo-inspecao-post.js');
const { buildAlmaPost } = require('../lib/alma-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertGuia(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    let after = -1;
    for (const id of afterIds || []) {
      after = items.findIndex((x) => x.id === id);
      if (after >= 0) break;
    }
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

function upsertGloss(glossPath, key, entryLine, afterKey) {
  if (!fs.existsSync(glossPath)) return;
  let gloss = fs.readFileSync(glossPath, 'utf8');
  const reKey = new RegExp('    ' + key + ':\\s*\\{[\\s\\S]*?\\},');
  if (reKey.test(gloss)) {
    gloss = gloss.replace(reKey, entryLine);
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (' + key + ' · existente)');
    return;
  }
  const reAfter = new RegExp(
    '(' + afterKey + ':\\s*\\{[\\s\\S]*?zu:\\s*"[^"]*"\\s*\\},?\\r?\\n)'
  );
  if (reAfter.test(gloss)) {
    gloss = gloss.replace(reAfter, '$1' + entryLine + '\n');
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (' + key + ' · após ' + afterKey + ')');
  } else {
    console.warn('Aviso: glossário — inserção falhou para', key);
  }
}

async function syncSql(postsToSync) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  for (const post of postsToSync) upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado');
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  let order = nextPalavrasOrder(posts);
  const tudoExisting = posts.find((p) => p.slug === 'inspecao-palavra-tudo');
  const almaExisting = posts.find((p) => p.slug === 'inspecao-palavra-alma');
  const tudoOrder = tudoExisting ? Number(tudoExisting.seriesOrder) || order : order;
  if (!tudoExisting) order += 1;
  const almaOrder = almaExisting
    ? Number(almaExisting.seriesOrder) || order
    : tudoExisting
      ? nextPalavrasOrder(posts.filter((p) => p.slug !== 'inspecao-palavra-alma').concat([])) ||
        tudoOrder + 1
      : tudoOrder + 1;

  // Recompute alma order cleanly
  const almaOrderFinal = almaExisting
    ? Number(almaExisting.seriesOrder) || tudoOrder + 1
    : Math.max(tudoOrder + 1, nextPalavrasOrder(posts));

  const tudoPost = buildTudoPost(tudoExisting ? tudoOrder : nextPalavrasOrder(posts));
  upsertPost(posts, tudoPost);
  const almaPost = buildAlmaPost(
    almaExisting ? Number(almaExisting.seriesOrder) || tudoPost.seriesOrder + 1 : tudoPost.seriesOrder + 1
  );
  // ensure alma is after tudo numerically if both new
  if (!almaExisting && almaPost.seriesOrder <= tudoPost.seriesOrder) {
    almaPost.seriesOrder = tudoPost.seriesOrder + 1;
  }
  upsertPost(posts, almaPost);

  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, tudoPost);
  writeI18n(i18n, almaPost);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'palavra-tudo',
      title: 'Tudo — totalidade, essencial e foco',
      titleEn: 'Tudo — totality, essential and focus',
      titleEs: 'Tudo — totalidad, esencial y foco',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: tudo (totus) — totalidade/essencial; elos objetos/alma; Valeu !!!',
      whyEn: 'Words: tudo (totus) — totality/essential; links objetos/alma; Valeu !!!',
      whyEs: 'Palabras: tudo (totus) — totalidad/esencial; vínculos objetos/alma; ¡Valeu !!!',
      suggestedSlug: tudoPost.slug,
      doneHref: '/posts/post-' + tudoPost.slug + '.html',
      seriesHint: 'palavras-origem',
      sources: [tudoPost.sourceUrl, '/posts/post-inspecao-palavra-alma.html'],
      notes: 'Cap. ' + tudoPost.seriesOrder
    });
    upsertSug(items, {
      id: 'palavra-alma',
      title: 'Alma — centro vivo e chegar por dentro',
      titleEn: 'Alma — living center and reaching within',
      titleEs: 'Alma — centro vivo y llegar por dentro',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: alma (anima) — centro vivo; chegar na alma; elos tudo/coração/vida; Valeu !!!',
      whyEn: 'Words: alma (anima) — living center; reaching the soul; links tudo/coração/vida; Valeu !!!',
      whyEs: 'Palabras: alma (anima) — centro vivo; llegar al alma; vínculos tudo/corazón/vida; ¡Valeu !!!',
      suggestedSlug: almaPost.slug,
      doneHref: '/posts/post-' + almaPost.slug + '.html',
      seriesHint: 'palavras-origem',
      sources: [almaPost.sourceUrl, '/posts/post-inspecao-palavra-tudo.html', '/vida/'],
      notes: 'Cap. ' + almaPost.seriesOrder
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (tudo + alma)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(
      items,
      {
        id: 'tudo',
        word: 'tudo',
        simple:
          'Família totus — totalidade e o essencial; no lab, foco para não perder a alma; Valeu !!!',
        simpleEn:
          'Totus family — totality and the essential; in the lab, focus so the soul is not lost; Valeu !!!',
        simpleEs:
          'Familia totus — totalidad y lo esencial; en el lab, foco para no perder el alma; Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-palavra-tudo.html'
      },
      ['total', 'objetos']
    );
    upsertGuia(
      items,
      {
        id: 'alma',
        word: 'alma',
        simple:
          'Lat. anima — centro vivo; chegar na alma; elos tudo/coração/vida; Valeu !!! até tocar.',
        simpleEn:
          'Lat. anima — living center; reaching the soul; links tudo/coração/vida; Valeu !!! until it touches.',
        simpleEs:
          'Lat. anima — centro vivo; llegar al alma; vínculos tudo/corazón/vida; Valeu !!! hasta tocar.',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-palavra-alma.html'
      },
      ['coracao', 'tudo', 'vida']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (tudo + alma)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  upsertGloss(
    glossPath,
    'tudo',
    '    tudo: { gloss: "Família totus — totalidade/essencial; elos objetos/alma; Valeu !!!", href: "/posts/post-inspecao-palavra-tudo.html", en: "everything / all", es: "todo", fr: "tout", it: "tutto", de: "alles", el: "ola", la: "totum", yo: "gbogbo", sw: "kila kitu", gez: "kʷəllu", nl: "alles", pl: "wszystko", ru: "vsyo", uk: "vse", zh: "yiqie", ja: "subete", ko: "modu", ar: "kull shay", he: "hakol", hi: "sab kuch", tr: "her sey", sv: "allt", da: "alt", no: "alt", fi: "kaikki", cs: "vse", ro: "tot", hu: "minden", ca: "tot", gl: "todo", eu: "dena", gn: "opa mba\'e", qu: "llapan", eo: "cxio", vi: "tat ca", id: "semua", th: "ทุกอย่าง", hr: "sve", sk: "vsetko", ga: "gach rud", cy: "popeth", ha: "komai", am: "ሁሉም", fa: "hame", bn: "সব", zu: "konke" },',
    'total'
  );
  upsertGloss(
    glossPath,
    'alma',
    '    alma: { gloss: "Lat. anima — centro vivo; chegar na alma; elos tudo/coração/vida; Valeu !!!", href: "/posts/post-inspecao-palavra-alma.html", en: "soul", es: "alma", fr: "ame", it: "anima", de: "Seele", el: "psyche", la: "anima", yo: "ọkàn", sw: "roho", gez: "näfs", nl: "ziel", pl: "dusza", ru: "dusha", uk: "dusha", zh: "linghun", ja: "tamashii", ko: "yeonghon", ar: "ruh", he: "neshama", hi: "atma", tr: "ruh", sv: "sjal", da: "sjael", no: "sjel", fi: "sielu", cs: "duse", ro: "suflet", hu: "lelek", ca: "anima", gl: "alma", eu: "arima", gn: "ãnga", qu: "nuna", eo: "animo", vi: "linh hon", id: "jiwa", th: "จิตวิญญาณ", hr: "dusa", sk: "dusa", ga: "anam", cy: "enaid", ha: "rai", am: "ነፍስ", fa: "ravan", bn: "আত্মা", zu: "umphefumulo" },',
    'coracao'
  );

  await syncSql([tudoPost, almaPost]);
  console.log('OK:', tudoPost.title, '| Cap.', tudoPost.seriesOrder);
  console.log('OK:', almaPost.title, '| Cap.', almaPost.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
