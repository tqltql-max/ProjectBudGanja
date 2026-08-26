'use strict';

/**
 * Injeta Paraguai, Paraguaçu, Guerra do Paraguai, troféus e canhão na série Palavras.
 * Uso: node scripts/upsert-palavra-paraguai-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { buildParaguaiPost } = require('../lib/paraguai-inspecao-post.js');
const { buildParaguacuPost } = require('../lib/paraguacu-inspecao-post.js');
const { buildGuerraDoParaguaiPost } = require('../lib/guerra-do-paraguai-inspecao-post.js');
const { buildTrofeusDeGuerraPost } = require('../lib/trofeus-de-guerra-inspecao-post.js');
const { buildCanhaoPost } = require('../lib/canhao-inspecao-post.js');

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
    build: buildParaguaiPost,
    sugId: 'palavra-paraguai',
    sugTitle: 'Paraguai — o país, Paraguay e o lapso PARAGYACYY',
    sugTitleEn: 'Paraguai — the country, Paraguay, and the slip PARAGYACYY',
    sugTitleEs: 'Paraguai — el país, Paraguay y el lapsus PARAGYACYY',
    why: 'Palavras: Paraguai = país; Paraguay = grafia; PARAGYACYY = lapso país × Paraguaçu; ≠ guerra como único sentido; Valeu !!!',
    guiaId: 'paraguai',
    guiaWord: 'Paraguai',
    guiaSimple:
      'País (PT Paraguai / ES-EN Paraguay / guarani Paraguái); PARAGYACYY = lapso com Paraguaçu; ≠ município paulista; Valeu !!! neste mapa.',
    guiaAfter: ['passar', 'pular'],
    glossKey: 'paraguai',
    glossAfter: 'passar',
    glossMain:
      '    paraguai: { tone: "caution", category: "País", mundane: "República do Paraguai; grafia internacional Paraguay.", gloss: "País ≠ Paraguaçu ≠ só a guerra; lapso PARAGYACYY; elos guerra/troféus/canhão; Valeu !!! neste mapa.", href: "/posts/post-inspecao-palavra-paraguai.html", en: "Paraguay", es: "Paraguay", fr: "Paraguay", it: "Paraguay", de: "Paraguay", el: "Παραγουάη", la: "Paraquaria", yo: "Paraguay", sw: "Paraguay", gez: "Paraguay", nl: "Paraguay", pl: "Paragwaj", ru: "Парагвай", uk: "Парагвай", zh: "巴拉圭", ja: "パラグアイ", ko: "파라과이", ar: "باراغواي", he: "פרגוואי", hi: "पैराग्वे", tr: "Paraguay", sv: "Paraguay", da: "Paraguay", no: "Paraguay", fi: "Paraguay", cs: "Paraguay", ro: "Paraguay", hu: "Paraguay", ca: "Paraguai", gl: "Paraguai", eu: "Paraguai", gn: "Paraguái", qu: "Paraguay", eo: "Paragvajo", vi: "Paraguay", id: "Paraguay", th: "ปารากวัย", hr: "Paragvaj", sk: "Paraguaj", ga: "Paragua", cy: "Paraguay", ha: "Paraguay", am: "ፓራጓይ", fa: "پاراگوئه", bn: "প্যারাগুয়ে", zu: "iParaguay" },\n',
    glossAliases:
      '    paraguay: { gloss: "Grafia ES/EN de Paraguai — o mesmo país; ver ficha.", href: "/posts/post-inspecao-palavra-paraguai.html", en: "Paraguay", es: "Paraguay" },\n' +
      '    "paraguái": { gloss: "Forma guarani de Paraguai — o mesmo país.", href: "/posts/post-inspecao-palavra-paraguai.html", en: "Paraguái", es: "Paraguái" },\n' +
      '    paragyacyy: { gloss: "Lapso de teclado: Paraguai × Paraguaçu — ler as duas fichas.", href: "/posts/post-inspecao-palavra-paraguai.html", en: "PARAGYACYY (slip)", es: "PARAGYACYY (lapsus)" },\n'
  },
  {
    build: buildParaguacuPost,
    sugId: 'palavra-paraguacu',
    sugTitle: 'Paraguaçu — topónimo brasileiro, Paraguaçu Paulista e o som que não é o país',
    sugTitleEn: 'Paraguaçu — Brazilian place-name, Paraguaçu Paulista, and the sound that is not the country',
    sugTitleEs: 'Paraguaçu — topónimo brasileño, Paraguaçu Paulista y el sonido que no es el país',
    why: 'Palavras: Paraguaçu = lugar BR (tupi); Paraguaçu Paulista / ESAPP; ≠ Paraguai; lapso PARAGYACYY; Valeu !!!',
    guiaId: 'paraguacu',
    guiaWord: 'Paraguaçu',
    guiaSimple:
      'Topónimo BR (tupi); Paraguaçu Paulista e ESAPP em São Paulo; ≠ país Paraguai; PARAGYACYY cola os dois; Valeu !!! neste lugar.',
    guiaAfter: ['paraguai', 'passar'],
    glossKey: 'paraguaçu',
    glossAfter: 'paraguai',
    glossMain:
      '    paraguaçu: { tone: "caution", category: "Topónimo", mundane: "Lugar brasileiro (rio / município); Paraguaçu Paulista.", gloss: "Tupi (família açu/guaçu); ≠ Paraguai / Paraguay; ESAPP em SP; lapso PARAGYACYY; Valeu !!! neste lugar.", href: "/posts/post-inspecao-palavra-paraguacu.html", en: "Paraguaçu", es: "Paraguaçu", fr: "Paraguaçu", it: "Paraguaçu", de: "Paraguaçu", el: "Paraguaçu", la: "Paraguacu", yo: "Paraguaçu", sw: "Paraguaçu", gez: "Paraguaçu", nl: "Paraguaçu", pl: "Paraguaçu", ru: "Парагуасу", uk: "Парагуасу", zh: "帕拉瓜苏", ja: "パラグアス", ko: "파라과수", ar: "باراغواسو", he: "פרגואסו", hi: "परागुआसू", tr: "Paraguaçu", sv: "Paraguaçu", da: "Paraguaçu", no: "Paraguaçu", fi: "Paraguaçu", cs: "Paraguaçu", ro: "Paraguaçu", hu: "Paraguaçu", ca: "Paraguaçu", gl: "Paraguaçu", eu: "Paraguaçu", gn: "Paraguasu", qu: "Paraguaçu", eo: "Paraguacu", vi: "Paraguaçu", id: "Paraguaçu", th: "ปารากวาซู", hr: "Paraguaçu", sk: "Paraguaçu", ga: "Paraguaçu", cy: "Paraguaçu", ha: "Paraguaçu", am: "ፓራጓሱ", fa: "پاراگواسو", bn: "পারাগুয়াসু", zu: "iParaguacu" },\n',
    glossAliases:
      '    paraguacu: { gloss: "Grafia sem cedilha de Paraguaçu — lugar BR; ≠ Paraguai.", href: "/posts/post-inspecao-palavra-paraguacu.html", en: "Paraguaçu (unaccented)", es: "Paraguaçu (sin cedilla)" },\n' +
      '    "paraguaçu paulista": { gloss: "Município SP — ESAPP; ≠ teatro da Guerra do Paraguai.", href: "/posts/post-inspecao-palavra-paraguacu.html", en: "Paraguaçu Paulista", es: "Paraguaçu Paulista" },\n'
  },
  {
    build: buildGuerraDoParaguaiPost,
    sugId: 'palavra-guerra-do-paraguai',
    sugTitle: 'Guerra do Paraguai — o nome de 1864–1870, a Tríplice Aliança e a memória em disputa',
    sugTitleEn: 'Guerra do Paraguai — the 1864–1870 name, the Triple Alliance, and contested memory',
    sugTitleEs: 'Guerra do Paraguai — el nombre 1864–1870, la Triple Alianza y la memoria en disputa',
    why: 'Palavras: Guerra do Paraguai = 1864–1870; também Guerra Grande / Tríplice Aliança; mortos em intervalo; ≠ Paraguaçu; Valeu !!!',
    guiaId: 'guerra-do-paraguai',
    guiaWord: 'Guerra do Paraguai',
    guiaSimple:
      'Nome PT do conflito 1864–1870; Tríplice Aliança; narrativas e mortos em disputa; ≠ mapa de Paraguaçu; Valeu !!! nesta memória.',
    guiaAfter: ['paraguai', 'paraguacu'],
    glossKey: '"guerra do paraguai"',
    glossAfter: 'paraguaçu',
    glossMain:
      '    "guerra do paraguai": { tone: "caution", category: "Acontecimento", mundane: "Conflito 1864–1870; também Guerra da Tríplice Aliança / Guerra Grande.", gloss: "Nome PT; memórias em disputa; mortos = intervalo; ≠ Paraguaçu Paulista; elos país/troféus/canhão; Valeu !!! nesta memória.", href: "/posts/post-inspecao-palavra-guerra-do-paraguai.html", en: "Paraguayan War", es: "Guerra del Paraguay", fr: "guerre du Paraguay", it: "guerra del Paraguay", de: "Tripel-Allianz-Krieg", el: "Πόλεμος της Τριπλής Συμμαχίας", la: "bellum Paraguayense", yo: "ogun Paraguay", sw: "vita ya Paraguay", gez: "təqat Paraguay", nl: "Paraguayaanse Oorlog", pl: "wojna paragwajska", ru: "Парагвайская война", uk: "Парагвайська війна", zh: "巴拉圭战争", ja: "三国同盟戦争", ko: "파라과이 전쟁", ar: "حرب باراغواي", he: "מלחמת פרגוואי", hi: "पराग्वे युद्ध", tr: "Paraguay Savaşı", sv: "trippelallianskriget", da: "trippelalliancekrigen", no: "trippelalliansekrigen", fi: "Paraguayn sota", cs: "paraguayská válka", ro: "Războiul Paraguayului", hu: "hármas szövetség háborúja", ca: "Guerra del Paraguai", gl: "Guerra do Paraguai", eu: "Paraguaiko Gerra", gn: "Ñorairõ Guasu", qu: "Paraguay maqanakuy", eo: "Paragvaja milito", vi: "Chiến tranh Paraguay", id: "Perang Paraguay", th: "สงครามปารากวัย", hr: "Paragvajski rat", sk: "paraguajská vojna", ga: "Cogadh na Paragua", cy: "Rhyfel Paraguay", ha: "Yakin Paraguay", am: "የፓራጓይ ጦርነት", fa: "جنگ پاراگوئه", bn: "প্যারাগুয়ে যুদ্ধ", zu: "impi yaseParaguay" },\n',
    glossAliases:
      '    "guerra do paraguay": { gloss: "Grafia mista — mesmo conflito 1864–1870; ver Guerra do Paraguai.", href: "/posts/post-inspecao-palavra-guerra-do-paraguai.html", en: "Paraguayan War", es: "Guerra del Paraguay" },\n' +
      '    geurra: { gloss: "Lapso de guerra — neste circuito, Guerra do Paraguai.", href: "/posts/post-inspecao-palavra-guerra-do-paraguai.html", en: "war (slip)", es: "guerra (lapsus)" },\n'
  },
  {
    build: buildTrofeusDeGuerraPost,
    sugId: 'palavra-trofeus-de-guerra',
    sugTitle: 'Troféus de guerra — espólio, museu e o caso El Cristiano',
    sugTitleEn: 'War trophies — spoils, museum, and the El Cristiano case',
    sugTitleEs: 'Trofeos de guerra — botín, museo y el caso El Cristiano',
    why: 'Palavras: troféus de guerra (*tropaeum*) — espólio ≠ verdade; El Cristiano = caso; trofeis/geurra = lapsos; Valeu !!!',
    guiaId: 'trofeus-de-guerra',
    guiaWord: 'Troféus de guerra',
    guiaSimple:
      'Lat. tropaeum — espólio em museu ≠ laudo histórico; caso El Cristiano; ≠ inventário completo; Valeu !!! neste bronze.',
    guiaAfter: ['guerra-do-paraguai', 'paraguai'],
    glossKey: '"troféus de guerra"',
    glossAfter: '"guerra do paraguai"',
    glossMain:
      '    "troféus de guerra": { tone: "caution", category: "Espólio", mundane: "Objectos tomados e expostos após conflito.", gloss: "Lat. tropaeum — bronze ≠ verdade; caso El Cristiano / canhão; ≠ inventário total; Valeu !!! neste museu.", href: "/posts/post-inspecao-palavra-trofeus-de-guerra.html", en: "war trophies", es: "trofeos de guerra", fr: "trophées de guerre", it: "trofei di guerra", de: "Kriegstrophäen", el: "πολεμικά τρόπαια", la: "tropaea", yo: "àwọn ìṣẹ́gun ogun", sw: "nyara za vita", gez: "tropaea", nl: "oorlogstrofeeën", pl: "trofea wojenne", ru: "военные трофеи", uk: "воєнні трофеї", zh: "战争战利品", ja: "戦争の戦利品", ko: "전쟁 트로피", ar: "غنائم الحرب", he: "שלל מלחמה", hi: "युद्ध ट्राफियां", tr: "savaş ganimetleri", sv: "krigstroféer", da: "krigstrofæer", no: "krigstrofeer", fi: "sotasaalis", cs: "válečné trofeje", ro: "trofee de război", hu: "háborús trófeák", ca: "trofeus de guerra", gl: "trofeos de guerra", eu: "gerra-sariak", gn: "ñorairõ rehegua", qu: "awqa suwakuna", eo: "milittrofeoj", vi: "chiến lợi phẩm", id: "rampasan perang", th: "ของที่ยึดจากสงคราม", hr: "ratni trofeji", sk: "vojnové trofeje", ga: "trófaithe cogaidh", cy: "tlws rhyfel", ha: "ganimar yaki", am: "የጦር ዋንጫዎች", fa: "غنائم جنگی", bn: "যুদ্ধের ট্রফি", zu: "izimpahla zempi" },\n',
    glossAliases:
      '    "trofeus de guerra": { gloss: "Grafia sem acento de troféus de guerra — ver ficha do espólio.", href: "/posts/post-inspecao-palavra-trofeus-de-guerra.html", en: "war trophies (unaccented)", es: "trofeos de guerra" },\n' +
      '    trofeis: { gloss: "Lapso de troféus — neste circuito, espólio de guerra.", href: "/posts/post-inspecao-palavra-trofeus-de-guerra.html", en: "trophies (slip)", es: "trofeos (lapsus)" },\n'
  },
  {
    build: buildCanhaoPost,
    sugId: 'palavra-canhao',
    sugTitle: 'Canhão — El Cristiano, o lapso canjão e o troféu ainda no Rio',
    sugTitleEn: 'Cannon — El Cristiano, the slip canjão, and the trophy still in Rio',
    sugTitleEs: 'Cañón — El Cristiano, el lapsus canjão y el trofeo aún en Río',
    why: 'Palavras: canhão (*canna*); canjão = lapso; El Cristiano = peça MHN; devolução 2026 = trâmite, não feito; Valeu !!!',
    guiaId: 'canhao',
    guiaWord: 'Canhão',
    guiaSimple:
      'Lat. canna — tubo de artilharia; El Cristiano no MHN Rio; canjão = boca; devolução ainda em trâmite; Valeu !!! neste bronze.',
    guiaAfter: ['trofeus-de-guerra', 'guerra-do-paraguai'],
    glossKey: 'canhão',
    glossAfter: '"troféus de guerra"',
    glossMain:
      '    canhão: { tone: "caution", category: "Peça", mundane: "Artilharia; neste circuito, El Cristiano no MHN (Rio).", gloss: "Lat. canna; canjão = lapso; troféu ≠ país; ago. 2026 = aval relatado, não entrega; Valeu !!! neste tubo.", href: "/posts/post-inspecao-palavra-canhao.html", en: "cannon", es: "cañón", fr: "canon", it: "cannone", de: "Kanone", el: "κανόνι", la: "tormentum", yo: "ibọn ńlá", sw: "mizinga", gez: "mädhf", nl: "kanon", pl: "armata", ru: "пушка", uk: "гармата", zh: "大炮", ja: "大砲", ko: "대포", ar: "مدفع", he: "תותח", hi: "तोप", tr: "top", sv: "kanon", da: "kanon", no: "kanon", fi: "kanuuna", cs: "dělo", ro: "tun", hu: "ágyú", ca: "canó", gl: "canón", eu: "kanoi", gn: "mba\'yru", qu: "cañón", eo: "kanono", vi: "đại bác", id: "meriam", th: "ปืนใหญ่", hr: "top", sk: "delo", ga: "gunna mór", cy: "canon", ha: "bindiga", am: "መድፍ", fa: "توپ", bn: "কামান", zu: "inganono" },\n',
    glossAliases:
      '    canhao: { gloss: "Grafia sem til de canhão — ver ficha da peça.", href: "/posts/post-inspecao-palavra-canhao.html", en: "cannon (unaccented)", es: "cañón" },\n' +
      '    canjao: { gloss: "Lapso CANJÃO → canhão; neste circuito, El Cristiano.", href: "/posts/post-inspecao-palavra-canhao.html", en: "cannon (slip)", es: "cañón (lapsus)" },\n' +
      '    "el cristiano": { gloss: "Canhão paraguaio no MHN Rio — troféu; devolução em trâmite (ago. 2026).", href: "/posts/post-inspecao-palavra-canhao.html", en: "El Cristiano", es: "El Cristiano" },\n' +
      '    "canhão el cristiano": { gloss: "Mesma peça — ver canhão.", href: "/posts/post-inspecao-palavra-canhao.html", en: "El Cristiano cannon", es: "cañón El Cristiano" },\n'
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
      '/posts/post-inspecao-palavra-paraguai.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — cluster Paraguai / canhão / PARAGYACYY.'
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
    console.log('Glossário actualizado (Paraguai · Paraguaçu · guerra · troféus · canhão)');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
