'use strict';

/**
 * Injeta expressão «elo de ligação» (× símbolo do infinito / simbuklo).
 * Uso: node scripts/upsert-expressao-elo-de-ligacao.js
 */

const fs = require('fs');
const path = require('path');
const { buildEloDeLigacaoPost } = require('../lib/elo-de-ligacao-inspecao-post.js');
const { buildLinkKlinkPost } = require('../lib/link-klink-inspecao-post.js');
const { buildConexaoPost } = require('../lib/conexao-inspecao-post.js');
const { buildLigarDesligarPost } = require('../lib/ligar-desligar-inspecao-post.js');
const { buildRelacaoPost } = require('../lib/relacao-inspecao-post.js');
const {
  buildEndocanabinoidomaNeurocienciaPost
} = require('../lib/endocanabinoidoma-neurociencia-inspecao-post.js');

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

function keepOrder(posts, slug, builder) {
  const existingOne = posts.find((p) => p.slug === slug);
  const order =
    existingOne && typeof existingOne.seriesOrder === 'number'
      ? existingOne.seriesOrder
      : undefined;
  return builder.length ? builder(order) : builder();
}

async function syncSqlAll(posts) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  await store.setPosts(posts);
  console.log('SQL store actualizado (lote elo de ligação)');
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
  const existing = posts.find((p) => p.slug === 'inspecao-expressao-elo-de-ligacao');
  const order = existing
    ? Number(existing.seriesOrder) || nextOrder(posts, 'expressoes-ditados')
    : nextOrder(posts, 'expressoes-ditados');
  const post = buildEloDeLigacaoPost(order);
  const related = [
    post,
    keepOrder(posts, 'inspecao-palavra-link', buildLinkKlinkPost),
    keepOrder(posts, 'inspecao-palavra-conexao', buildConexaoPost),
    keepOrder(posts, 'inspecao-palavra-ligar-desligar', buildLigarDesligarPost),
    keepOrder(posts, 'inspecao-palavra-relacao', buildRelacaoPost),
    keepOrder(
      posts,
      'inspecao-neurociencia-endocanabinoidoma',
      buildEndocanabinoidomaNeurocienciaPost
    )
  ];

  for (const p of related) upsertPost(posts, p);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  for (const p of related) writeI18n(i18n, p);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-elo-de-ligacao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Elo de ligação — o cruzamento do infinito, não a eternidade',
      titleEn: 'Elo de ligação — the crossing of infinity, not eternity',
      titleEs: 'Elo de ligação — el cruce del infinito, no la eternidad',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: elo de ligação — anel que junta; simbuklo → símbolo do infinito (lemniscata); aula XIV Kassia; Valeu !!!',
      whyEn: 'Sayings: elo de ligação — joining ring; simbuklo → infinity symbol (lemniscate); UNIFESP XIV Kassia; Valeu !!!',
      whyEs: 'Dichos: elo de ligação — anillo que junta; simbuklo → símbolo del infinito; aula XIV Kassia; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/elo',
        'https://en.wikipedia.org/wiki/Lemniscate',
        '/biblioteca/unifesp/livro-xiv.html#aula-8',
        '/posts/post-inspecao-neurociencia-endocanabinoidoma.html',
        '/posts/post-inspecao-palavra-link.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' Expressões — cruzamento da lemniscata; gatilho simbuklo; analogia Kassia creditada.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-elo-de-ligacao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'elo-de-ligacao',
      word: 'elo de ligação',
      simple:
        'Locução — o anel que junta; simbuklo → símbolo do infinito (lemniscata); o cruzamento é o elo. Aula XIV Kassia. Valeu !!!',
      simpleEn:
        'Locution — the ring that joins; simbuklo → infinity symbol (lemniscate); the crossing is the link. UNIFESP XIV Kassia. Valeu !!!',
      simpleEs:
        'Locución — el anillo que junta; simbuklo → símbolo del infinito (lemniscata); el cruce es el eslabón. Aula XIV Kassia. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Elo vem do latim anellus (anelzinho); ligação de ligāre (atar). A locução insiste no anel que realmente junta. O pedido de campo trouxe simbuklo — gatilho de ouvido para símbolo do infinito (lemniscata, o oito deitado).',
      curiosities:
        'Na 8.ª aula do XIV Curso UNIFESP, Dra. Kassia Martins põe a lemniscata em pé como símbolo de comunicação cima↔baixo do SEC. O laboratório relaciona o cruzamento com esta locução — não afirma que ela usou as palavras. Grego sýmbolon já era um token partido que encaixa.',
      historyEn:
        'Portuguese elo comes from Latin anellus (little ring); ligação from ligāre (to bind). The locution insists the ring actually joins. The field brought simbuklo — an ear trigger for símbolo do infinito (lemniscate, the sideways eight).',
      curiositiesEn:
        'In UNIFESP XIV lesson 8, Dr. Kassia Martins stands the lemniscate up as a symbol of up↔down communication in the ECS. The lab relates the crossing to this saying — it does not claim she used these words. Greek sýmbolon was already a fitting token.',
      historyEs:
        'Elo viene del latín anellus (anillito); ligação de ligāre (atar). La locución insiste en el anillo que de verdad junta. El campo trajo simbuklo — gatillo de oído para símbolo do infinito (lemniscata, el ocho acostado).',
      curiositiesEs:
        'En la 8.ª aula del XIV Curso UNIFESP, la Dra. Kassia Martins pone la lemniscata de pie como símbolo de comunicación arriba↔abajo del SEC. El laboratorio relaciona el cruce con esta locución — no afirma que ella usara esas palabras. El griego sýmbolon ya era un token que encaja.'
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'elo de ligação');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'ligar' || x.id === 'link');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (elo de ligação)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  const glossBlock =
    '    "elo de ligação": { tone: "craft", category: "Entre", mundane: "Peça ou pessoa que junta dois lados; o anel que segura a corrente.", gloss: "Locução — o anel que junta; simbuklo → símbolo do infinito (lemniscata); cruzamento = elo; aula XIV Kassia; Valeu !!!", href: "/posts/post-inspecao-expressao-elo-de-ligacao.html", en: "connecting link", es: "eslabón de ligación", fr: "chaînon de liaison", it: "anello di congiunzione", de: "Bindeglied", el: "κρίκος σύνδεσης", la: "anellus nexus", yo: "òrùka ìsopọ̀", sw: "pete ya kuunganisha", gez: "anellus", nl: "verbindingsstuk", pl: "ogniwo łączące", ru: "sviazyvaiushchee zveno", uk: "lanka zviazku", zh: "连接环", ja: "つなぎの輪", ko: "연결 고리", ar: "halqat wasl", he: "hulia mekabtzat", hi: "jodne vali kadi", tr: "bağlantı halkası", sv: "förbindelselänk", da: "forbindelsesled", no: "forbindelsesledd", fi: "yhdistävä lenkki", cs: "spojovací článek", ro: "verigă de legătură", hu: "összekötő láncszem", ca: "baula d\'unió", gl: "elo de ligazón", eu: "lotura-begizta", gn: "joaju", qu: "tinki", eo: "kunliga ringo", vi: "mat xich noi", id: "mata rantai penghubung", th: "hueng chueam", hr: "spojnica", sk: "spajaci clanok", ga: "nasc ceangail", cy: "dolen gyswllt", ha: "mahadin hadi", am: "magenagna", fa: "halqe ettesal", bn: "sangjog kara", zu: "isixhumanisi" },\n' +
    '    simbuklo: { tone: "craft", category: "Gatilho", mundane: "Ouvido para «símbolo» (do infinito).", gloss: "Gatilho — simbuklo → símbolo do infinito; ver elo de ligação / lemniscata.", href: "/posts/post-inspecao-expressao-elo-de-ligacao.html", en: "infinity symbol (ear trigger)", es: "símbolo del infinito (gatillo)" },\n' +
    '    "símbolo do infinito": { tone: "craft", category: "Figura", mundane: "O oito deitado; marca do sem-fim.", gloss: "Lemniscata ∞ — deitado = infinito; em pé (aula XIV Kassia) = comunicação cima↔baixo; o cruzamento é o elo de ligação.", href: "/posts/post-inspecao-expressao-elo-de-ligacao.html", en: "infinity symbol", es: "símbolo del infinito", fr: "symbole de l\'infini", it: "simbolo dell\'infinito", de: "Unendlichkeitszeichen", el: "σύμβολο του απείρου", la: "signum infiniti" },\n' +
    '    lemniscata: { tone: "craft", category: "Figura", mundane: "Curva em forma de fita; o oito deitado.", gloss: "Lat. lemniscus «fita» — ∞; analogia XIV em pé = movimento e comunicação; cruzamento = elo de ligação.", href: "/posts/post-inspecao-expressao-elo-de-ligacao.html", en: "lemniscate", es: "lemniscata", fr: "lemniscate", it: "lemniscata", de: "Lemniskate", el: "λημνίσκος", la: "lemniscus" },';
  if (fs.existsSync(glossPath) && fs.readFileSync(glossPath, 'utf8').includes('"elo de ligação"')) {
    console.log('Glossário já tem elo de ligação — skip');
  } else {
    upsertGloss(glossPath, '    "elo de ligação":\\s*\\{[\\s\\S]*?\\},', glossBlock, 'relação');
  }

  try {
    await syncSqlAll(posts);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
