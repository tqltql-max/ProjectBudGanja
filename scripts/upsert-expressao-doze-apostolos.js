'use strict';

/**
 * Injeta expressão «os doze apóstolos».
 * Uso: node scripts/upsert-expressao-doze-apostolos.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildDozeApostolosPost
} = require('../lib/doze-apostolos-inspecao-post.js');

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
  const hasRemote = !!(
    process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL
  );
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

function upsertGloss(glossPath, keyPattern, entryLine, afterKey) {
  if (!fs.existsSync(glossPath)) return;
  let gloss = fs.readFileSync(glossPath, 'utf8');
  const reKey = new RegExp(keyPattern);
  if (reKey.test(gloss)) {
    gloss = gloss.replace(reKey, entryLine);
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (existente)');
    return;
  }
  const reAfter = new RegExp(
    '(    ' + afterKey + ':\\s*\\{[\\s\\S]*?zu:\\s*"[^"]*"\\s*\\},?\\r?\\n)'
  );
  if (reAfter.test(gloss)) {
    gloss = gloss.replace(reAfter, '$1' + entryLine + '\n');
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (após ' + afterKey + ')');
    return;
  }
  console.warn('Aviso: glossário — inserção falhou');
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find(
    (p) => p.slug === 'inspecao-expressao-os-doze-apostolos'
  );
  const order = existing
    ? Number(existing.seriesOrder) || nextOrder(posts, 'expressoes-ditados')
    : nextOrder(posts, 'expressoes-ditados');
  const post = buildDozeApostolosPost(order);
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-os-doze-apostolos';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'os doze apóstolos — conjunto, envio e ofício',
      titleEn: 'the twelve apostles — set, sending and craft',
      titleEs: 'los doce apóstoles — conjunto, envío y oficio',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: os Doze como conjunto nomeado e frase viva BR; apóstolo = enviado; Tomé inspecciona; sem catecismo; Valeu !!!',
      whyEn:
        'Sayings: the Twelve as named set and living BR phrase; apostle = one sent; Thomas inspects; no catechism; Valeu !!!',
      whyEs:
        'Dichos: los Doce como conjunto nombrado y frase viva BR; apóstol = enviado; Tomás inspecciona; sin catecismo; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-filho-de-deus.html',
        '/posts/post-inspecao-expressao-templo-de-cristo-corpo-e-alma.html',
        '/posts/post-inspecao-filme-a-paixao-de-cristo.html',
        '/posts/post-inspecao-palavra-valeu.html',
        '/posts/post-inspecao-palavra-idolo.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' Expressões — mesa dos Doze; ficha ≠ santoral.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-os-doze-apostolos)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'os-doze-apostolos',
      word: 'os doze apóstolos',
      simple:
        'Expressão — conjunto nomeado da tradição cristã e frase viva BR; apóstolo = enviado, não ídolo; Tomé inspecciona; ficha ≠ catecismo; Valeu !!!',
      simpleEn:
        'Saying — named set in Christian tradition and living BR phrase; apostle = one sent, not an idol; Thomas inspects; sheet ≠ catechism; Valeu !!!',
      simpleEs:
        'Expresión — conjunto nombrado de la tradición cristiana y frase viva BR; apóstol = enviado, no ídolo; Tomás inspecciona; ficha ≠ catecismo; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Apóstolo vem do grego apóstolos, «enviado». Os Evangelhos e Atos nomeiam um grupo de doze com listas que divergem em um ou dois nomes; Matias restaura a quota depois de Judas; Paulo é apóstolo e não um dos Doze. No Brasil a frase vive em igrejas, topónimos e na metáfora de equipa completa.',
      curiosities:
        'O pedido chegou «os dozes apostulos»: dozes por analogia com os dois / os três; apostulos sem acento. A ficha honra o pedido e ancora os doze apóstolos. Tomé é par de ofício do laboratório: inspecionar antes de jurar.',
      historyEn:
        'Apostle comes from Greek apóstolos, “one sent”. The Gospels and Acts name a group of twelve with lists that diverge on one or two names; Matthias restores the quota after Judas; Paul is an apostle and not one of the Twelve. In Brazil the phrase lives in churches, place-names and as a metaphor for a complete team.',
      curiositiesEn:
        'The request arrived as “os dozes apostulos”: dozes by analogy with os dois / os três; apostulos unaccented. The sheet honors the request and anchors os doze apóstolos. Thomas is craft-kin of the lab: inspect before swearing.',
      historyEs:
        'Apóstol viene del griego apóstolos, «enviado». Los Evangelios y Hechos nombran un grupo de doce con listas que divergen en uno o dos nombres; Matías restaura la cuota después de Judas; Pablo es apóstol y no uno de los Doce. En Brasil la frase vive en iglesias, topónimos y como metáfora de equipo completo.',
      curiositiesEs:
        'El pedido llegó como «os dozes apostulos»: dozes por analogía con os dois / os três; apostulos sin acento. La ficha honra el pedido y ancla os doze apóstolos. Tomás es par de oficio del laboratorio: inspeccionar antes de jurar.'
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'filho-de-deus' || x.id === 'templo-de-cristo-corpo-e-alma'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (os doze apóstolos)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  const glossLine =
    '    "os doze apóstolos": { tone: "warm", category: "Envio", mundane: "Conjunto nomeado da tradição cristã e frase viva BR.", gloss: "Apóstolo = enviado, não ídolo; listas divergentes; Tomé inspecciona; ficha ≠ catecismo; depois Valeu !!!", href: "/posts/post-inspecao-expressao-os-doze-apostolos.html", en: "the twelve apostles", es: "los doce apóstoles", fr: "les douze apôtres", it: "i dodici apostoli", de: "die zwölf Apostel", el: "οι δώδεκα απόστολοι", la: "duodecim apostoli", yo: "àwọn àpóstélì méjìlá", sw: "mitume kumi na wawili", gez: "asra-orəʾtu ḥawāryat", nl: "de twaalf apostelen", pl: "dwunastu apostołów", ru: "двенадцать апостолов", uk: "дванадцять апостолів", zh: "十二使徒", ja: "十二使徒", ko: "열두 사도", ar: "الرسل الاثنا عشر", he: "שנים עשר השליחים", hi: "बारह प्रेरित", tr: "on iki havari", sv: "de tolv apostlarna", da: "de tolv apostle", no: "de tolv apostlene", fi: "kaksitoista apostolia", cs: "dvanáct apoštolů", ro: "cei doisprezece apostoli", hu: "a tizenkét apostol", ca: "els dotze apòstols", gl: "os doce apóstolos", eu: "hamabi apostoluen", gn: "pahatei apostolo", qu: "chunka iskayniyuq apostolkuna", eo: "la dek du apostoloj", vi: "mười hai tông đồ", id: "dua belas rasul", th: "อัครสาวกสิบสอง", hr: "dvanaest apostola", sk: "dvanásť apoštolov", ga: "an dá aspal déag", cy: "y deuddeg apostol", ha: "manzanni goma sha biyu", am: "ዐሥራ ሁለቱ ሐዋርያት", fa: "دوازده حواری", bn: "বারো প্রেরিত", zu: "abaphostoli abayishumi nambili" },';
  upsertGloss(
    glossPath,
    '    "os doze apóstolos":\\s*\\{[\\s\\S]*?\\},',
    glossLine,
    '"filho de deus"'
  );

  const aliases = [
    [
      '    "os dozes apostulos": { gloss: "Pedido / oral — ver «os doze apóstolos» (canónico: doze, apóstolos).", href: "/posts/post-inspecao-expressao-os-doze-apostolos.html", en: "see the twelve apostles", es: "ver los doce apóstoles" },',
      '    "os dozes apostulos":\\s*\\{[\\s\\S]*?\\},'
    ],
    [
      '    "doze apóstolos": { gloss: "Núcleo — ver «os doze apóstolos».", href: "/posts/post-inspecao-expressao-os-doze-apostolos.html", en: "twelve apostles", es: "doce apóstoles" },',
      '    "doze apóstolos":\\s*\\{[\\s\\S]*?\\},'
    ],
    [
      '    apóstolo: { gloss: "Gr. apóstolos — enviado; ver os doze apóstolos; ≠ ídolo; ficha ≠ catecismo.", href: "/posts/post-inspecao-expressao-os-doze-apostolos.html", en: "apostle", es: "apóstol" },',
      '    apóstolo:\\s*\\{[\\s\\S]*?\\},'
    ],
    [
      '    apostolo: { gloss: "Sem acento — ver apóstolo / os doze apóstolos.", href: "/posts/post-inspecao-expressao-os-doze-apostolos.html", en: "apostle (unaccented)", es: "apóstol (sin acento)" },',
      '    apostolo:\\s*\\{[\\s\\S]*?\\},'
    ],
    [
      '    "os doze": { gloss: "Quota do conjunto — ver os doze apóstolos.", href: "/posts/post-inspecao-expressao-os-doze-apostolos.html", en: "the Twelve", es: "los Doce" },',
      '    "os doze":\\s*\\{[\\s\\S]*?\\},'
    ]
  ];
  for (const [line, pat] of aliases) {
    upsertGloss(glossPath, pat, line, '"os doze apóstolos"');
  }

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
