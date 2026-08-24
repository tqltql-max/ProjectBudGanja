'use strict';

/**
 * Injeta cluster estrada × automóvel × bateria × encruzilhada × Jesus Cristo.
 * Uso: node scripts/upsert-estrada-automovel-bateria-jesus-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildEstradaPost,
  poemPt: poemEstradaPt,
  poemEn: poemEstradaEn,
  poemEs: poemEstradaEs,
  WIKT: WIKT_ESTRADA
} = require('../lib/estrada-inspecao-post.js');
const {
  buildAutomovelPost,
  poemPt: poemAutoPt,
  poemEn: poemAutoEn,
  poemEs: poemAutoEs,
  WIKT: WIKT_AUTO
} = require('../lib/automovel-inspecao-post.js');
const {
  buildBateriaPost,
  poemPt: poemBatPt,
  poemEn: poemBatEn,
  poemEs: poemBatEs,
  WIKT: WIKT_BAT
} = require('../lib/bateria-inspecao-post.js');
const {
  buildEncruzilhadaPost,
  poemPt: poemEncPt,
  poemEn: poemEncEn,
  poemEs: poemEncEs,
  WIKT: WIKT_ENC,
  WIKT_CRUZ,
  WIKT_CRUX
} = require('../lib/encruzilhada-inspecao-post.js');
const {
  buildCruzamentoEstradaJesusPost,
  poemPt: poemCruzPt,
  poemEn: poemCruzEn,
  poemEs: poemCruzEs,
  WIKI_JESUS,
  WIKT_JESUS,
  WIKT_CRISTO,
  BIBLE_JOAO
} = require('../lib/cruzamento-estrada-jesus-cristo-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const OBJETOS_FILE = path.join(ROOT, 'objetos', 'index.html');

const HREF_ESTRADA = '/posts/post-inspecao-palavra-estrada.html';
const HREF_AUTO = '/posts/post-inspecao-palavra-automovel.html';
const HREF_BAT = '/posts/post-inspecao-palavra-bateria.html';
const HREF_ENC = '/posts/post-inspecao-palavra-encruzilhada.html';
const HREF_CRUZ = '/posts/post-inspecao-cruzamento-estrada-encruzilhada-jesus-cristo.html';

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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex(
    (x) => x.id === entry.id || (entry.word && x.word === entry.word)
  );
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || [])
      .map((id) => items.findIndex((x) => x.id === id))
      .find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const estrada =
    '    estrada: { tone: "craft", category: "Léxico", mundane: "Via calçada entre lugares; também pegar a estrada.", gloss: "Lat. strata «via calçada» ≠ caminho (método); objectos automóvel e bateria; irmã encruzilhada; cruzamento Jesus Cristo; Valeu !!!", href: "' +
    HREF_ESTRADA +
    '", en: "road", es: "carretera / estrada", fr: "route", it: "strada", de: "Straße", el: "δρόμος", la: "strata", yo: "ọ̀nà ọkọ̀", sw: "barabara", gez: "menged", nl: "weg", pl: "droga", ru: "дорога", uk: "дорога", zh: "公路", ja: "道路", ko: "도로", ar: "طريق", he: "כביש", hi: "सड़क", tr: "yol", sv: "väg", da: "vej", no: "vei", fi: "tie", cs: "silnice", ro: "șosea", hu: "út", ca: "carretera", gl: "estrada", eu: "errepide", gn: "tape", qu: "ñan", eo: "vojo", vi: "đường", id: "jalan", th: "ถนน", hr: "cesta", sk: "cesta", ga: "bóthar", cy: "ffordd", ha: "hanya", am: "መንገድ", fa: "جاده", bn: "সড়ক", zu: "umgwaqo" },\n';
  gloss = replaceOrInsertAfter(gloss, 'estrada', estrada, 'caminho');

  const auto =
    '    automóvel: { tone: "craft", category: "Objecto", mundane: "Veículo que se move a si sobre a estrada.", gloss: "Gr. autós + lat. mōbilis — move-se a si; gatilho altomovel (alto ≠ auto); pulso bateria; Valeu !!!", href: "' +
    HREF_AUTO +
    '", en: "automobile / car", es: "automóvil", fr: "automobile", it: "automobile", de: "Automobil", el: "αυτοκίνητο", la: "automobilis", yo: "ọkọ̀ ayọ́kẹ́lẹ́", sw: "gari", gez: "mäkina", nl: "auto", pl: "samochód", ru: "автомобиль", uk: "автомобіль", zh: "汽车", ja: "自動車", ko: "자동차", ar: "سيارة", he: "מכונית", hi: "कार", tr: "otomobil", sv: "bil", da: "bil", no: "bil", fi: "auto", cs: "automobil", ro: "automobil", hu: "autó", ca: "automòbil", gl: "automóbil", eu: "automobil", gn: "mba\'yrumýi", qu: "antawa", eo: "aŭtomobilo", vi: "ô tô", id: "mobil", th: "รถยนต์", hr: "automobil", sk: "automobil", ga: "gluaisteán", cy: "modur", ha: "motoci", am: "መኪና", fa: "خودرو", bn: "গাড়ি", zu: "imoto" },\n';
  gloss = replaceOrInsertAfter(gloss, 'automóvel', auto, 'estrada');

  gloss = replaceOrInsertAfter(
    gloss,
    'altomovel',
    '    altomovel: { gloss: "Gatilho de campo de automóvel — a orelha cola alto; o étimo é auto (si); ver automóvel.", href: "' +
      HREF_AUTO +
      '", en: "misspelling of automóvel", es: "grafía de campo de automóvil" },\n',
    'automóvel'
  );
  gloss = replaceOrInsertAfter(
    gloss,
    'automovel',
    '    automovel: { gloss: "Grafia sem acento de automóvel — ver ficha do objecto.", href: "' +
      HREF_AUTO +
      '", en: "automobile (unaccented)", es: "automóvil" },\n',
    'automóvel'
  );

  const bat =
    '    bateria: { tone: "craft", category: "Objecto", mundane: "Acumulador eléctrico; também tambores e artilharia.", gloss: "Fr. batterie ← battre — feixe; lema = célula do automóvel na estrada; salas tambor/canhão nomeadas; pulso ≠ alma; Valeu !!!", href: "' +
    HREF_BAT +
    '", en: "battery", es: "batería", fr: "batterie", it: "batteria", de: "Batterie", el: "μπαταρία", la: "pila", yo: "bátìrì", sw: "betri", gez: "battery", nl: "accu", pl: "akumulator", ru: "батарея", uk: "батарея", zh: "电池", ja: "バッテリー", ko: "배터리", ar: "بطارية", he: "סוללה", hi: "बैटरी", tr: "akü", sv: "batteri", da: "batteri", no: "batteri", fi: "akku", cs: "baterie", ro: "baterie", hu: "akkumulátor", ca: "bateria", gl: "batería", eu: "bateria", gn: "bateria", qu: "bateria", eo: "baterio", vi: "ắc quy", id: "baterai", th: "แบตเตอรี่", hr: "baterija", sk: "batéria", ga: "cadhnra", cy: "batri", ha: "baturi", am: "ባትሪ", fa: "باتری", bn: "ব্যাটারি", zu: "ibhethri" },\n';
  gloss = replaceOrInsertAfter(gloss, 'bateria', bat, 'automóvel');

  const enc =
    '    encruzilhada: { tone: "craft", category: "Léxico", mundane: "Cruzamento de estradas; também decisão.", gloss: "en- + cruz + -ilhada — o X da via; gatilho encruziliada; ≠ leito ≠ madeiro; cruzamento Jesus Cristo; Valeu !!!", href: "' +
    HREF_ENC +
    '", en: "crossroads", es: "encrucijada", fr: "carrefour", it: "crocicchio", de: "Kreuzung", el: "σταυροδρόμι", la: "compitum", yo: "oríta", sw: "njia panda", gez: "mənfäsä menged", nl: "kruispunt", pl: "skrzyżowanie", ru: "перекрёсток", uk: "перехрестя", zh: "十字路口", ja: "十字路", ko: "갈림길", ar: "مفترق طرق", he: "צומת", hi: "चौराहा", tr: "kavşak", sv: "korsväg", da: "vejkryds", no: "veikryss", fi: "risteys", cs: "křižovatka", ro: "răscruce", hu: "kereszteződés", ca: "encreuament", gl: "encrucillada", eu: "bidegurutze", gn: "tapejoasa", qu: "ñan tinkuy", eo: "vojkruciĝo", vi: "ngã tư", id: "persimpangan", th: "ทางแยก", hr: "raskrižje", sk: "križovatka", ga: "crosbhóthar", cy: "croesffordd", ha: "mararraba", am: "መስቀለኛ መንገድ", fa: "چهارراه", bn: "মোড়", zu: "impambano" },\n';
  gloss = replaceOrInsertAfter(gloss, 'encruzilhada', enc, 'estrada');
  gloss = replaceOrInsertAfter(
    gloss,
    'encruziliada',
    '    encruziliada: { gloss: "Gatilho de campo de encruzilhada — ver ficha (lh).", href: "' +
      HREF_ENC +
      '", en: "misspelling of encruzilhada", es: "grafía de campo de encrucijada" },\n',
    'encruzilhada'
  );

  const jesus =
    '    "jesus cristo": { tone: "warm", category: "Pessoa", mundane: "Nome e título da tradição cristã — Jesus (Yeshua) + Cristo (ungido).", gloss: "Cruzamento: estrada × automóvel × bateria × encruzilhada; «Eu sou o caminho»; asfalto ≠ madeiro; Valeu !!!", href: "' +
    HREF_CRUZ +
    '", en: "Jesus Christ", es: "Jesucristo", fr: "Jésus-Christ", it: "Gesù Cristo", de: "Jesus Christus", el: "Ιησούς Χριστός", la: "Iesus Christus", yo: "Jesu Kristi", sw: "Yesu Kristo", gez: "Iyesus Krəstos", nl: "Jezus Christus", pl: "Jezus Chrystus", ru: "Иисус Христос", uk: "Ісус Христос", zh: "耶稣基督", ja: "イエス・キリスト", ko: "예수 그리스도", ar: "يسوع المسيح", he: "ישוע המשיח", hi: "यीशु मसीह", tr: "İsa Mesih", sv: "Jesus Kristus", da: "Jesus Kristus", no: "Jesus Kristus", fi: "Jeesus Kristus", cs: "Ježíš Kristus", ro: "Isus Hristos", hu: "Jézus Krisztus", ca: "Jesucrist", gl: "Xesucristo", eu: "Jesus Kristus", gn: "Hesu Cristo", qu: "Jesus Cristo", eo: "Jesuo Kristo", vi: "Chúa Giêsu", id: "Yesus Kristus", th: "พระเยซูคริสต์", hr: "Isus Krist", sk: "Ježiš Kristus", ga: "Íosa Críost", cy: "Iesu Grist", ha: "Yesu Kristi", am: "ኢየሱስ ክርስቶስ", fa: "عیسی مسیح", bn: "যীশু খ্রীষ্ট", zu: "uJesu Kristu" },\n';
  gloss = replaceOrInsertAfter(gloss, '"jesus cristo"', jesus, 'jesusamado');
  gloss = replaceOrInsertAfter(
    gloss,
    'cristo',
    '    cristo: { gloss: "Gr. Christós «ungido» — título; ver cruzamento estrada × Jesus Cristo.", href: "' +
      HREF_CRUZ +
      '", en: "Christ", es: "Cristo" },\n',
    '"jesus cristo"'
  );
  gloss = replaceOrInsertAfter(
    gloss,
    'jeusus',
    '    jeusus: { gloss: "Gatilho de campo de Jesus — ver cruzamento estrada × Jesus Cristo.", href: "' +
      HREF_CRUZ +
      '", en: "misspelling of Jesus", es: "grafía de campo de Jesús" },\n',
    '"jesus cristo"'
  );
  return gloss;
}

function patchObjetosHtml(html) {
  const cardAuto =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-automovel.html">\n' +
    '                <span class="objetos-catalog-kicker">Palavras · objecto</span>\n' +
    '                <strong>Automóvel</strong>\n' +
    '                <span>O que se move a si na estrada — gatilho altomovel; pulso bateria.</span>\n' +
    '            </a>\n';
  const cardBat =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-bateria.html">\n' +
    '                <span class="objetos-catalog-kicker">Palavras · objecto</span>\n' +
    '                <strong>Bateria</strong>\n' +
    '                <span>O pulso do automóvel — célula; ≠ tambor ≠ canhão.</span>\n' +
    '            </a>\n';

  function upsertCard(src, href, card, afterHref) {
    const re = new RegExp(
      '            <a class="objetos-catalog-card" href="' +
        href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
        '">[\\s\\S]*?</a>\\n'
    );
    if (re.test(src)) return src.replace(re, card);
    const needle = '            <a class="objetos-catalog-card" href="' + afterHref + '">';
    const i = src.indexOf(needle);
    if (i < 0) {
      console.warn('Aviso: cartão objectos — âncora não encontrada', afterHref);
      return src;
    }
    const after = src.indexOf('</a>', i);
    if (after < 0) return src;
    return src.slice(0, after + 4) + '\n' + card + src.slice(after + 4);
  }

  html = upsertCard(html, HREF_AUTO, cardAuto, '/posts/post-inspecao-delorean.html');
  html = upsertCard(html, HREF_BAT, cardBat, '/posts/post-inspecao-patinete-eletrico-criancas.html');
  return html;
}

async function syncSql(built) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  built.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', built.length, 'posts');
}

async function main() {
  try {
    execFileSync(
      process.execPath,
      [path.join(__dirname, 'generate-estrada-cluster-covers.js')],
      { cwd: ROOT, stdio: 'inherit', timeout: 60000 }
    );
  } catch (e) {
    console.warn('Aviso capas:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const takenPalavras = new Set(
    posts
      .filter((p) => p && p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0)
  );
  function nextPalavraOrder(slug, start) {
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    let n = Math.max(start, ...(takenPalavras.size ? takenPalavras : [start - 1])) + 1;
    while (takenPalavras.has(n) && n < 600) n += 1;
    takenPalavras.add(n);
    return n;
  }

  const built = [
    stampFiles(buildEstradaPost(nextPalavraOrder('inspecao-palavra-estrada', 200))),
    stampFiles(buildAutomovelPost(nextPalavraOrder('inspecao-palavra-automovel', 200))),
    stampFiles(buildBateriaPost(nextPalavraOrder('inspecao-palavra-bateria', 200))),
    stampFiles(buildEncruzilhadaPost(nextPalavraOrder('inspecao-palavra-encruzilhada', 200))),
    stampFiles(buildCruzamentoEstradaJesusPost())
  ];
  built.forEach((post) => upsertPost(posts, post));
  await writeJsonRetry(POSTS_FILE, posts);
  built.forEach((post) => {
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML', post.slug, e.message);
    }
  });

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-estrada',
        title: 'Estrada — via calçada (strata); ≠ caminho',
        titleEn: 'Estrada — paved way (strata); ≠ caminho',
        titleEs: 'Estrada — vía calzada (strata); ≠ caminho',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: estrada (lat. strata) ≠ caminho; objectos automóvel e bateria; irmã encruzilhada.',
        whyEn: 'Words: estrada (Lat. strata) ≠ caminho; objects automóvel and bateria; sister encruzilhada.',
        whyEs: 'Palabras: estrada (lat. strata) ≠ caminho; objetos automóvel y bateria; hermana encruzilhada.',
        suggestedSlug: 'inspecao-palavra-estrada',
        doneHref: HREF_ESTRADA,
        seriesHint: 'palavras-origem',
        sources: [HREF_ESTRADA, WIKT_ESTRADA, HREF_AUTO, HREF_BAT, HREF_ENC, HREF_CRUZ],
        notes: 'Cap. cluster — leito ≠ método.'
      },
      ['palavra-caminho', 'palavra-mapa']
    );
    upsertItem(
      items,
      {
        id: 'objeto-automovel',
        title: 'Automóvel — o objecto que se move a si',
        titleEn: 'Automóvel — the object that moves itself',
        titleEs: 'Automóvel — el objeto que se mueve a sí',
        tipo: 'objeto',
        priority: 1,
        status: 'feita',
        why: 'Objecto: automóvel (auto + móvel); gatilho altomovel; pulso bateria; catálogo Objetos.',
        whyEn: 'Object: automóvel (self + mobile); trigger altomovel; battery pulse; Objects catalog.',
        whyEs: 'Objeto: automóvel (auto + móvil); gatillo altomovel; pulso batería; catálogo Objetos.',
        suggestedSlug: 'inspecao-palavra-automovel',
        doneHref: HREF_AUTO,
        seriesHint: 'palavras-origem',
        sources: [HREF_AUTO, WIKT_AUTO, HREF_ESTRADA, HREF_BAT],
        notes: 'Pedido de campo altomovel.'
      },
      ['palavra-estrada']
    );
    upsertItem(
      items,
      {
        id: 'objeto-bateria',
        title: 'Bateria — pulso do automóvel',
        titleEn: 'Bateria — the car’s pulse',
        titleEs: 'Bateria — el pulso del automóvil',
        tipo: 'objeto',
        priority: 1,
        status: 'feita',
        why: 'Objecto: bateria (fr. batterie); lema = célula do carro; salas tambor/canhão nomeadas.',
        whyEn: 'Object: bateria (Fr. batterie); lemma = car cell; drum/cannon rooms named.',
        whyEs: 'Objeto: bateria (fr. batterie); lema = celda del auto; salas tambor/cañón nombradas.',
        suggestedSlug: 'inspecao-palavra-bateria',
        doneHref: HREF_BAT,
        seriesHint: 'palavras-origem',
        sources: [HREF_BAT, WIKT_BAT, HREF_AUTO, HREF_ESTRADA],
        notes: 'Pulso ≠ alma.'
      },
      ['objeto-automovel']
    );
    upsertItem(
      items,
      {
        id: 'palavra-encruzilhada',
        title: 'Encruzilhada — o sítio da cruz das vias',
        titleEn: 'Encruzilhada — the place of the crossed ways',
        titleEs: 'Encruzilhada — el sitio de la cruz de las vías',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: encruzilhada (en- + cruz + -ilhada); gatilho encruziliada; ≠ leito ≠ madeiro.',
        whyEn: 'Words: encruzilhada (en- + cruz + -ilhada); trigger encruziliada; ≠ bed ≠ timber.',
        whyEs: 'Palabras: encruzilhada (en- + cruz + -ilhada); gatillo encruziliada; ≠ lecho ≠ madero.',
        suggestedSlug: 'inspecao-palavra-encruzilhada',
        doneHref: HREF_ENC,
        seriesHint: 'palavras-origem',
        sources: [HREF_ENC, WIKT_ENC, WIKT_CRUZ, WIKT_CRUX, HREF_CRUZ],
        notes: 'Camada afro-brasileira nomeada e cortada do eixo Jesus.'
      },
      ['palavra-estrada']
    );
    upsertItem(
      items,
      {
        id: 'cruzamento-estrada-jesus-cristo',
        title: 'Cruzamento — Estrada × Encruzilhada × Jesus Cristo',
        titleEn: 'Cross — Estrada × Encruzilhada × Jesus Christ',
        titleEs: 'Cruce — Estrada × Encruzilhada × Jesucristo',
        tipo: 'pessoas',
        priority: 1,
        status: 'feita',
        why: 'Pessoas · cruzamento: estrada × automóvel × bateria × encruzilhada × Jesus Cristo — leito, máquina, pulso e X encontram «Eu sou o caminho».',
        whyEn: 'People · cross: road × car × battery × crossroads × Jesus Christ — bed, machine, pulse and X meet “I am the way”.',
        whyEs: 'Personas · cruce: estrada × auto × batería × encrucijada × Jesucristo — lecho, máquina, pulso y X encuentran «Yo soy el camino».',
        suggestedSlug: 'inspecao-cruzamento-estrada-encruzilhada-jesus-cristo',
        doneHref: HREF_CRUZ,
        seriesHint: 'pessoas-historia',
        sources: [
          HREF_CRUZ,
          WIKI_JESUS,
          WIKT_JESUS,
          WIKT_CRISTO,
          BIBLE_JOAO,
          HREF_ESTRADA,
          HREF_AUTO,
          HREF_BAT,
          HREF_ENC
        ],
        notes: 'Sem catecismo; crux relaciona sem fundir asfalto e madeiro.'
      },
      ['cruzamento-aaron-beggs-air-bag']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'estrada',
        word: 'Estrada',
        group: 'lexico',
        fromTitle: false,
        href: HREF_ESTRADA,
        simple:
          'Lat. strata «via calçada» — o leito; ≠ caminho (método). Objectos automóvel e bateria. Irmã encruzilhada. Valeu !!!',
        simpleEn:
          'Lat. strata “paved way” — the bed; ≠ caminho (method). Objects automóvel and bateria. Sister encruzilhada. Valeu !!!',
        simpleEs:
          'Lat. strata «vía calzada» — el lecho; ≠ caminho (método). Objetos automóvel y bateria. Hermana encruzilhada. ¡Valeu !!!',
        history:
          'Estrada vem do latim (via) strata, particípio de sternere (estender, pavimentar). Street inglês e strada italiana são primos. Caminho (camminus) é outra árvore. No laboratório o leito não é o método.',
        curiosities:
          'Pedido de campo com objectos automóvel e bateria, cruzado com encruzilhada e Jesus Cristo. Pegar a estrada ≠ ter o rumo. Fecho: Valeu !!!',
        historyEn:
          'Portuguese estrada is Latin (via) strata, from sternere (to spread, pave). English street and Italian strada are cousins. Caminho is another tree.',
        curiositiesEn:
          'Field request with car and battery, crossed with crossroads and Jesus Christ. Hitting the road is not already having the heading.',
        historyEs:
          'Estrada viene del latín (via) strata, de sternere. Street y strada son primas. Caminho es otro árbol.',
        curiositiesEs:
          'Pedido de campo con automóvil y batería, cruzado con encrucijada y Jesucristo.'
      },
      ['caminho', 'mapa']
    );
    upsertItem(
      items,
      {
        id: 'automovel',
        word: 'Automóvel',
        group: 'lexico',
        fromTitle: false,
        href: HREF_AUTO,
        simple:
          'Gr. autós + lat. mōbilis — o que se move a si na estrada. Gatilho altomovel (alto ≠ auto). Pulso: bateria. Valeu !!!',
        simpleEn:
          'Gk. autós + Lat. mōbilis — that which moves itself on the road. Trigger altomovel (tall ≠ self). Pulse: battery. Valeu !!!',
        simpleEs:
          'Gr. autós + lat. mōbilis — lo que se mueve a sí en la estrada. Gatillo altomovel (alto ≠ auto). Pulso: batería. ¡Valeu !!!',
        history:
          'Automóvel calca o francês automobile: grego autós (si mesmo) + latim mōbilis (que se move). A orelha de campo altomovel cola alto (altura); o étimo corta.',
        curiosities:
          'Carro na fala BR é polissémico. DeLorean e Senna têm fichas próprias. Sem bateria, o automóvel é casca no leito.'
      },
      ['estrada', 'airbag']
    );
    upsertItem(
      items,
      {
        id: 'bateria',
        word: 'Bateria',
        group: 'lexico',
        fromTitle: false,
        href: HREF_BAT,
        simple:
          'Fr. batterie ← battre — feixe. Lema = célula do automóvel. Salas artilharia e tambores nomeadas. Pulso ≠ alma. Valeu !!!',
        simpleEn:
          'Fr. batterie ← battre — a set that beats. Lemma = car cell. Artillery and drums named. Pulse ≠ soul. Valeu !!!',
        simpleEs:
          'Fr. batterie ← battre — haz. Lema = celda del auto. Artillería y tambores nombrados. Pulso ≠ alma. ¡Valeu !!!',
        history:
          'Bateria vem do francês batterie, de battre (bater): primeiro o feixe de canhões, depois os tambores, depois as células (a pilha como bateria de peças).',
        curiosities:
          'No carro é o pulso do arranque ou da tração. O cruzamento com Jesus Cristo recusa baptizar o lítio. Ver patinete (fogo).'
      },
      ['automovel', 'eletrizante']
    );
    upsertItem(
      items,
      {
        id: 'encruzilhada',
        word: 'Encruzilhada',
        group: 'lexico',
        fromTitle: false,
        href: HREF_ENC,
        simple:
          'en- + cruz + -ilhada — o X da estrada. Gatilho encruziliada. ≠ leito ≠ madeiro. Cruzamento Jesus Cristo. Valeu !!!',
        simpleEn:
          'en- + cruz + -ilhada — the road’s X. Trigger encruziliada. ≠ bed ≠ timber. Jesus Christ cross. Valeu !!!',
        simpleEs:
          'en- + cruz + -ilhada — la X de la estrada. Gatillo encruziliada. ≠ lecho ≠ madero. Cruce Jesucristo. ¡Valeu !!!',
        history:
          'Encruzilhada junta en- + cruz (latim crux) + sufixo de lugar: o sítio onde as vias se cruzam. Carrefour francês é outra árvore (quatro furcas).',
        curiosities:
          'No Brasil também nomeia lugar de culto afro-brasileiro — o laboratório nomeia e não funde com Jesus Cristo. Estar numa encruzilhada = decisão.'
      },
      ['estrada', 'cruzar-os-bracos-em-cima-da-cabeca']
    );
    upsertItem(
      items,
      {
        id: 'jesus-cristo',
        word: 'Jesus Cristo',
        group: 'lexico',
        fromTitle: false,
        href: HREF_CRUZ,
        simple:
          'Yeshua + Christós — cruzamento com estrada, automóvel, bateria e encruzilhada. «Eu sou o caminho». Asfalto ≠ madeiro. Valeu !!!',
        simpleEn:
          'Yeshua + Christós — cross with road, car, battery and crossroads. “I am the way.” Asphalt ≠ timber. Valeu !!!',
        simpleEs:
          'Yeshua + Christós — cruce con estrada, auto, batería y encrucijada. «Yo soy el camino». Asfalto ≠ madero. ¡Valeu !!!',
        history:
          'Jesus vem do hebraico Yeshua / Yehoshua («YHWH salva»). Cristo do grego Christós («ungido»), tradução de Mashiach. O laboratório cruza o nome com o leito, a máquina, o pulso e o X — sem catecismo.',
        curiosities:
          'João 14:6 fala de caminho, não de estrada. Distinto de jesusamado (oralidade), The Chosen (série) e A Paixão de Cristo (filme). Gatilho jeusus.'
      },
      ['encruzilhada', 'filho-de-deus']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'estrada',
      slug: 'estrada',
      title: 'Estrada',
      titleEn: 'Estrada',
      titleEs: 'Estrada',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — strata (via calçada) ≠ caminho; Valeu !!!',
      teaserEn: 'BudGanja echo — strata (paved way) ≠ caminho; Valeu !!!',
      teaserEs: 'Eco BudGanja — strata (vía calzada) ≠ caminho; ¡Valeu !!!',
      body: poemEstradaPt(),
      bodyEn: poemEstradaEn(),
      bodyEs: poemEstradaEs(),
      inspectionHref: HREF_ESTRADA,
      tags: ['poesia', 'vida', 'estrada', 'caminho', 'strata']
    });
    upsertVidaPoem(vida, {
      id: 'automovel',
      slug: 'automovel',
      title: 'Automóvel',
      titleEn: 'Automóvel',
      titleEs: 'Automóvel',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — auto + móvel; gatilho altomovel; Valeu !!!',
      teaserEn: 'BudGanja echo — self + mobile; trigger altomovel; Valeu !!!',
      teaserEs: 'Eco BudGanja — auto + móvil; gatillo altomovel; ¡Valeu !!!',
      body: poemAutoPt(),
      bodyEn: poemAutoEn(),
      bodyEs: poemAutoEs(),
      inspectionHref: HREF_AUTO,
      tags: ['poesia', 'vida', 'automovel', 'estrada', 'bateria']
    });
    upsertVidaPoem(vida, {
      id: 'bateria',
      slug: 'bateria',
      title: 'Bateria',
      titleEn: 'Bateria',
      titleEs: 'Bateria',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — pulso guardado; ≠ tambor; pulso ≠ alma; Valeu !!!',
      teaserEn: 'BudGanja echo — stored pulse; ≠ drum; pulse ≠ soul; Valeu !!!',
      teaserEs: 'Eco BudGanja — pulso guardado; ≠ tambor; pulso ≠ alma; ¡Valeu !!!',
      body: poemBatPt(),
      bodyEn: poemBatEn(),
      bodyEs: poemBatEs(),
      inspectionHref: HREF_BAT,
      tags: ['poesia', 'vida', 'bateria', 'automovel', 'pulso']
    });
    upsertVidaPoem(vida, {
      id: 'encruzilhada',
      slug: 'encruzilhada',
      title: 'Encruzilhada',
      titleEn: 'Encruzilhada',
      titleEs: 'Encruzilhada',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o X das vias; crux sem fundir o madeiro; Valeu !!!',
      teaserEn: 'BudGanja echo — the X of the ways; crux without fusing the timber; Valeu !!!',
      teaserEs: 'Eco BudGanja — la X de las vías; crux sin fusionar el madero; ¡Valeu !!!',
      body: poemEncPt(),
      bodyEn: poemEncEn(),
      bodyEs: poemEncEs(),
      inspectionHref: HREF_ENC,
      tags: ['poesia', 'vida', 'encruzilhada', 'cruz', 'estrada']
    });
    upsertVidaPoem(vida, {
      id: 'estrada-jesus-cristo',
      slug: 'estrada-jesus-cristo',
      title: 'Estrada × Jesus Cristo',
      titleEn: 'Estrada × Jesus Christ',
      titleEs: 'Estrada × Jesucristo',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — leito × máquina × pulso × X × «Eu sou o caminho»; Valeu !!!',
      teaserEn: 'BudGanja echo — bed × machine × pulse × X × “I am the way”; Valeu !!!',
      teaserEs: 'Eco BudGanja — lecho × máquina × pulso × X × «Yo soy el camino»; ¡Valeu !!!',
      body: poemCruzPt(),
      bodyEn: poemCruzEn(),
      bodyEs: poemCruzEs(),
      inspectionHref: HREF_CRUZ,
      tags: ['poesia', 'vida', 'estrada', 'jesus', 'encruzilhada', 'cruzamento']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poemas Vida actualizados');
  }

  if (fs.existsSync(OBJETOS_FILE)) {
    let html = fs.readFileSync(OBJETOS_FILE, 'utf8');
    html = patchObjetosHtml(html);
    fs.writeFileSync(OBJETOS_FILE, html, 'utf8');
    console.log('Catálogo Objetos actualizado');
  }

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  built.forEach((p) => console.log('OK:', p.title, '· Cap.', p.seriesOrder));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
