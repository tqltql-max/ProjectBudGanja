'use strict';

/**
 * Injeta lâmpada, esfregar, desejos e três na série Palavras.
 * Uso: node scripts/upsert-palavra-lampada-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { buildLampadaPost } = require('../lib/lampada-inspecao-post.js');
const { buildEsfregarPost } = require('../lib/esfregar-inspecao-post.js');
const { buildDesejosPost } = require('../lib/desejos-inspecao-post.js');
const { buildTresPost } = require('../lib/tres-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

function upsertPost(posts, post) {
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
  if (new RegExp(mainKey + ':\\s*\\{').test(gloss)) {
    gloss = gloss.replace(
      new RegExp('    ' + mainKey + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
  } else {
    const inserted = insertAfterKey(gloss, afterKey, mainLine + aliases);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção falhou para', mainKey);
  }
  if (aliases && !aliases.split('\n')[0].includes(mainKey)) {
    const firstAlias = aliases.match(/^\s+("[^"]+"|[A-Za-zÀ-ÿ0-9_]+):/);
    if (firstAlias && !new RegExp(firstAlias[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{').test(gloss)) {
      const afterMain = insertAfterKey(gloss, mainKey, aliases);
      if (afterMain) gloss = afterMain;
    }
  }
  return gloss;
}

const ITEMS = [
  {
    build: buildLampadaPost,
    sugId: 'palavra-lampada',
    sugTitle: 'Lâmpada — vaso de luz, vaso de desejo e o lapso lampada',
    sugTitleEn: 'Lâmpada — vessel of light, vessel of wish, and the slip lampada',
    sugTitleEs: 'Lâmpada — vaso de luz, vaso de deseo y el lapsus lampada',
    why: 'Palavras: lâmpada (lampas) = vaso; lampada = boca; génio = inquilino; ≠ gêmeos; elos luz/esfregar/desejos; Faça o melhor!',
    guiaId: 'lampada',
    guiaWord: 'Lâmpada',
    guiaSimple:
      'Gr./lat. lampas — vaso de luz no quarto × vaso de desejo no conto; lampada = boca; génio mora dentro; ≠ gêmeos; Faça o melhor neste soquete.',
    guiaAfter: ['luz', 'interruptor'],
    glossKey: 'lâmpada',
    glossAfter: 'luz',
    glossMain:
      '    lâmpada: { tone: "caution", category: "Vaso", mundane: "Objecto de luz; no conto, receptáculo do génio. Grafia viva: lampada.", gloss: "Vaso (*lampas*); circuito × conto; génio = inquilino; elos luz/esfregar/desejos/três; Faça o melhor neste soquete.", href: "/posts/post-inspecao-palavra-lampada.html", en: "lamp", es: "lámpara", fr: "lampe", it: "lampada", de: "Lampe", el: "λύχνος", la: "lampas", yo: "àtùpà", sw: "taa", gez: "məbräht", nl: "lamp", pl: "lampa", ru: "лампа", uk: "лампа", zh: "灯", ja: "ランプ", ko: "램프", ar: "مصباح", he: "מנורה", hi: "दीपक", tr: "lamba", sv: "lampa", da: "lampe", no: "lampe", fi: "lamppu", cs: "lampa", ro: "lampă", hu: "lámpa", ca: "llàntia", gl: "lámpada", eu: "lanpara", gn: "lámpara", qu: "lámpara", eo: "lampo", vi: "đèn", id: "lampu", th: "โคม", hr: "lampa", sk: "lampa", ga: "lampa", cy: "lamp", ha: "fitila", am: "መብራት", fa: "چراغ", bn: "বাতি", zu: "isibani" },\n',
    glossAliases:
      '    lampada: { gloss: "Grafia sem acento de lâmpada — ver ficha do vaso.", href: "/posts/post-inspecao-palavra-lampada.html", en: "lamp (unaccented)", es: "lámpara (sin acento)" },\n' +
      '    "lampada de aladim": { gloss: "Lâmpada de Aladim sem acento — vaso de desejo; ver lâmpada, esfregar, desejos.", href: "/posts/post-inspecao-palavra-lampada.html", en: "Aladdin lamp", es: "lámpara de Aladino" },\n' +
      '    "lâmpada de aladim": { gloss: "Vaso de desejo no conto — não é o génio; ver lâmpada.", href: "/posts/post-inspecao-palavra-lampada.html", en: "Aladdin lamp", es: "lámpara de Aladino" },\n'
  },
  {
    build: buildEsfregarPost,
    sugId: 'palavra-esfregar',
    sugTitle: 'Esfregar — fricção, cue da lâmpada e o clique que não é',
    sugTitleEn: 'Esfregar — friction, lamp cue, and the click it is not',
    sugTitleEs: 'Esfregar — fricción, señal de la lámpara y el clic que no es',
    why: 'Palavras: esfregar (*fricare*) — cue táctil do conto ≠ ligar; elos lâmpada/gesto/desejos; Faça o melhor nesta palma.',
    guiaId: 'esfregar',
    guiaWord: 'Esfregar',
    guiaSimple:
      'Lat. fricare — atrito; no conto, cue da palma na lâmpada; no quarto, não é o clique; elos gesto e ligar; Faça o melhor nesta mão.',
    guiaAfter: ['gesto', 'lampada', 'lâmpada'],
    glossKey: 'esfregar',
    glossAfter: 'gesto',
    glossMain:
      '    esfregar: { tone: "caution", category: "Gesto", mundane: "Fricção (limpar / aquecer); no conto, cue da lâmpada de Aladim.", gloss: "Lat. fricare — atrito; cue táctil ≠ clique / ligar; elos lâmpada, gesto, desejos; Faça o melhor nesta palma.", href: "/posts/post-inspecao-palavra-esfregar.html", en: "to rub", es: "frotar", fr: "frotter", it: "strofinare", de: "reiben", el: "τρίβω", la: "fricare", yo: "pá", sw: "sugua", gez: "mäkʷäs", nl: "wrijven", pl: "trzeć", ru: "тереть", uk: "терти", zh: "擦", ja: "こする", ko: "문지르다", ar: "يفرك", he: "לשפשף", hi: "रगड़ना", tr: "ovmak", sv: "gnida", da: "gnide", no: "gni", fi: "hieroa", cs: "třít", ro: "freca", hu: "dörzsöl", ca: "fregar", gl: "esfregar", eu: "igurtzi", gn: "johéi", qu: "khuñuy", eo: "froteti", vi: "cọ", id: "menggosok", th: "ถู", hr: "trljati", sk: "trieť", ga: "cuimilt", cy: "rhwbio", ha: "goga", am: "ማሸት", fa: "مالیدن", bn: "ঘষা", zu: "ukuhlikihla" },\n',
    glossAliases: ''
  },
  {
    build: buildDesejosPost,
    sugId: 'palavra-desejos',
    sugTitle: 'Desejos — vontade, pack da lâmpada e o ofício que não pede',
    sugTitleEn: 'Desejos — will, lamp pack, and the craft that does not ask',
    sugTitleEs: 'Desejos — voluntad, pack de la lámpara y el oficio que no pide',
    why: 'Palavras: desejos (*desiderium*) — vontade × pack do génio; quota muitas vezes três; ≠ gesto; Faça o melhor sem pack.',
    guiaId: 'desejos',
    guiaWord: 'Desejos',
    guiaSimple:
      'Lat. desiderium — vontade viva × pack do conto; apontar ≠ cumprir; quota em três; elos lâmpada e esfregar; Faça o melhor sem pack.',
    guiaAfter: ['esfregar', 'lampada'],
    glossKey: 'desejos',
    glossAfter: 'esfregar',
    glossMain:
      '    desejos: { tone: "caution", category: "Vontade", mundane: "Plural de desejo; no conto, o pack que o génio entrega.", gloss: "Lat. desiderium — vontade × pack da lâmpada; aponta ≠ cumpre; quota em três; Faça o melhor sem pack.", href: "/posts/post-inspecao-palavra-desejos.html", en: "wishes", es: "deseos", fr: "souhaits", it: "desideri", de: "Wünsche", el: "ευχές", la: "desideria", yo: "ìfẹ́", sw: "matamanio", gez: "fäqad", nl: "wensen", pl: "życzenia", ru: "желания", uk: "бажання", zh: "愿望", ja: "願い", ko: "소원", ar: "أمنيات", he: "משאלות", hi: "इच्छाएँ", tr: "dilekler", sv: "önskningar", da: "ønsker", no: "ønsker", fi: "toiveet", cs: "přání", ro: "dorințe", hu: "kívánságok", ca: "desitjos", gl: "desexos", eu: "desioak", gn: "jehechauka", qu: "munaykuna", eo: "deziroj", vi: "ước muốn", id: "harapan", th: "ความปรารถนา", hr: "želje", sk: "priania", ga: "mianta", cy: "dymuniadau", ha: "burin", am: "ምኞቶች", fa: "آرزوها", bn: "ইচ্ছা", zu: "izifiso" },\n',
    glossAliases:
      '    desejo: { gloss: "Singular de desejos — vontade; ver ficha do pack.", href: "/posts/post-inspecao-palavra-desejos.html", en: "wish / desire", es: "deseo" },\n'
  },
  {
    build: buildTresPost,
    sugId: 'palavra-tres',
    sugTitle: 'Três — o 3, a quota dos desejos e o teto que não é método',
    sugTitleEn: 'Três — 3, the wish quota, and the cap that is not a method',
    sugTitleEs: 'Três — el 3, la cuota de deseos y el tope que no es método',
    why: 'Palavras: três / 3 — cardinal (*trēs*) e quota popular dos três desejos; ≠ lei do clássico; Faça o melhor neste um.',
    guiaId: 'tres',
    guiaWord: 'Três',
    guiaSimple:
      'Lat. trēs — cardinal 3 / tres; no mapa da lâmpada, teto popular dos três desejos; não é método; Faça o melhor neste um.',
    guiaAfter: ['desejos', 'esfregar'],
    glossKey: 'três',
    glossAfter: 'desejos',
    glossMain:
      '    três: { tone: "caution", category: "Quota", mundane: "Cardinal 3; no conto popular, a quota dos três desejos.", gloss: "Lat. trēs — 3 / tres; teto de história ≠ método; elos desejos/lâmpada/esfregar; Faça o melhor neste um.", href: "/posts/post-inspecao-palavra-tres.html", en: "three", es: "tres", fr: "trois", it: "tre", de: "drei", el: "τρία", la: "tres", yo: "ẹ̀ta", sw: "tatu", gez: "śäläst", nl: "drie", pl: "trzy", ru: "три", uk: "три", zh: "三", ja: "三", ko: "셋", ar: "ثلاثة", he: "שלוש", hi: "तीन", tr: "üç", sv: "tre", da: "tre", no: "tre", fi: "kolme", cs: "tři", ro: "trei", hu: "három", ca: "tres", gl: "tres", eu: "hiru", gn: "mbohapy", qu: "kimsa", eo: "tri", vi: "ba", id: "tiga", th: "สาม", hr: "tri", sk: "tri", ga: "trí", cy: "tri", ha: "uku", am: "ሶስት", fa: "سه", bn: "তিন", zu: "kuthathu" },\n',
    glossAliases:
      '    tres: { gloss: "Grafia sem acento de três — ver ficha da quota.", href: "/posts/post-inspecao-palavra-tres.html", en: "three (unaccented)", es: "tres" },\n' +
      '    "3": { gloss: "Algarismo de três — quota popular dos desejos da lâmpada; ver ficha três.", href: "/posts/post-inspecao-palavra-tres.html", en: "3", es: "3" },\n' +
      '    "três desejos": { gloss: "Pack popular do conto — ver desejos e três; ≠ método.", href: "/posts/post-inspecao-palavra-tres.html", en: "three wishes", es: "tres deseos" },\n' +
      '    "3 desejos": { gloss: "Pack em algarismo — mesma quota; ver três.", href: "/posts/post-inspecao-palavra-tres.html", en: "3 wishes", es: "3 deseos" },\n'
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
      '/posts/post-inspecao-palavra-lampada.html',
      '/posts/post-inspecao-expressao-faca-o-melhor.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — cluster Aladim / lâmpada.'
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
  const gi = items.findIndex(
    (x) => x.id === cfg.guiaId || x.word === cfg.guiaWord
  );
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
    const post = cfg.build();
    upsertPost(posts, post);
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
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

  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  guia.updatedAt = new Date().toISOString();
  fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
  if (gloss) {
    fs.writeFileSync(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (lâmpada · esfregar · desejos · três)');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
