'use strict';

/**
 * Trio Palavras: Parkinson × parque de diversões × party (paRTY).
 * Uso: node scripts/upsert-palavra-parkinson-parque-party-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildParkinsonPost,
  buildParquePost,
  buildPartyPost,
  poemParkinsonPt,
  poemParkinsonEn,
  poemParkinsonEs,
  poemParquePt,
  poemParqueEn,
  poemParqueEs,
  poemPartyPt,
  poemPartyEn,
  poemPartyEs,
  HREF_P,
  HREF_Q,
  HREF_Y,
  WIKT_PARKINSON,
  WIKI_PARQUE,
  WIKT_PARTY
} = require('../lib/parkinson-parque-party-cluster.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');

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
  const i = items.findIndex((x) => x.id === entry.id);
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

function langsParkinson() {
  return 'en: "Parkinson", es: "Parkinson", fr: "Parkinson", it: "Parkinson", de: "Parkinson", el: "Πάρκινσον", la: "Parkinson", yo: "Parkinson", sw: "Parkinson", gez: "Parkinson", nl: "Parkinson", pl: "Parkinson", ru: "Паркинсон", uk: "Паркінсон", zh: "帕金森", ja: "パーキンソン", ko: "파킨슨", ar: "باركنسون", he: "פרקינסון", hi: "पार्किंसंस", tr: "Parkinson", sv: "Parkinson", da: "Parkinson", no: "Parkinson", fi: "Parkinson", cs: "Parkinson", ro: "Parkinson", hu: "Parkinson", ca: "Parkinson", gl: "Parkinson", eu: "Parkinson", gn: "Parkinson", qu: "Parkinson", eo: "Parkinson", vi: "Parkinson", id: "Parkinson", th: "พาร์กินสัน", hr: "Parkinson", sk: "Parkinson", ga: "Parkinson", cy: "Parkinson", ha: "Parkinson", am: "ፓርኪንሰን", fa: "پارکینسون", bn: "পারকিনসন", zu: "i-Parkinson"';
}

function langsParque() {
  return 'en: "amusement park", es: "parque de diversiones", fr: "parc d’attractions", it: "parco divertimenti", de: "Freizeitpark", el: "λούνα παρκ", la: "parcus lusus", yo: "ọgbà ìtura ìdárayá", sw: "bustani ya burudani", gez: "gännät", nl: "attractiepark", pl: "park rozrywki", ru: "парк развлечений", uk: "парк розваг", zh: "游乐园", ja: "遊園地", ko: "놀이공원", ar: "مدينة ملاهٍ", he: "פארק שעשועים", hi: "मनोरंजन पार्क", tr: "lunapark", sv: "nöjespark", da: "forlystelsespark", no: "fornøyelsespark", fi: "huvipuisto", cs: "zábavní park", ro: "parc de distracții", hu: "vidámpark", ca: "parc d’atraccions", gl: "parque de atraccións", eu: "jolas-parke", gn: "parque vy\'a", qu: "kusi parque", eo: "amuzparko", vi: "công viên giải trí", id: "taman hiburan", th: "สวนสนุก", hr: "zabavni park", sk: "zábavný park", ga: "páirc spóirt", cy: "parc difyrrwch", ha: "filin nishaɗi", am: "የመዝናኛ ፓርክ", fa: "شهر بازی", bn: "বিনোদন পার্ক", zu: "ipaki yokuzijabulisa"';
}

function langsParty() {
  return 'en: "party", es: "fiesta / party", fr: "fête / party", it: "festa / party", de: "Party / Fest", el: "πάρτι", la: "convivium / pars", yo: "ayẹyẹ", sw: "sherehe / pati", gez: "bäʿal", nl: "feest / party", pl: "impreza", ru: "вечеринка", uk: "вечірка", zh: "派对", ja: "パーティー", ko: "파티", ar: "حفلة", he: "מסיבה", hi: "पार्टी", tr: "parti", sv: "party / fest", da: "fest / party", no: "fest / party", fi: "juhlat", cs: "párty", ro: "petrecere", hu: "buli / party", ca: "festa / party", gl: "festa / party", eu: "festa / party", gn: "vy\'apave", qu: "raymi", eo: "festo / partyo", vi: "tiệc", id: "pesta / party", th: "ปาร์ตี้", hr: "tulum / party", sk: "párty", ga: "cóisir", cy: "parti", ha: "buki", am: "ፓርቲ", fa: "پارتی", bn: "পার্টি", zu: "ithilimu"';
}

function patchGlossary(gloss) {
  const parkinsonMain =
    '    parkinson: { tone: "caution", category: "Léxico", mundane: "Apelido inglês que virou epónimo; Parkin + -son (Pedro), não o recinto.", gloss: "Parkin + -son (Peter); cola PARK com parque de diversões e PAR com party recusada; epónimo facto ≠ brinquedo; Valeu !!!", href: "' +
    HREF_P +
    '", ' +
    langsParkinson() +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'parkinson', parkinsonMain, 'boston');
  if (!/    parkinson:\s*\{/.test(gloss)) {
    gloss = replaceOrInsertAfter(gloss, 'parkinson', parkinsonMain, 'trocadilho');
  }
  const parkinsonAliases = [
    [
      '"Parkinson"',
      '    "Parkinson": { gloss: "Maiúscula — o mesmo apelido / epónimo; ver parkinson.", href: "' +
        HREF_P +
        '", en: "Parkinson", es: "Parkinson" },\n'
    ],
    [
      '"doença de parkinson"',
      '    "doença de parkinson": { gloss: "Epónimo clínico — facto, não centro da ficha da palavra; ≠ parque ≠ party.", href: "' +
        HREF_P +
        '", en: "Parkinson’s disease", es: "enfermedad de Parkinson" },\n'
    ],
    [
      '"mal de parkinson"',
      '    "mal de parkinson": { gloss: "Nome popular do epónimo — ver Parkinson (palavra).", href: "' +
        HREF_P +
        '", en: "Parkinson’s (popular name)", es: "mal de Parkinson" },\n'
    ],
    [
      'parkin',
      '    parkin: { gloss: "Hipocorístico de Peter / Pedro — peça de Parkinson; ≠ park (recinto).", href: "' +
        HREF_P +
        '", en: "Parkin (pet form of Peter)", es: "Parkin (hipocorístico de Pedro)" },\n'
    ]
  ];
  for (const [key, line] of parkinsonAliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'parkinson');
  }

  const parqueMain =
    '    parque: { tone: "warm", category: "Léxico", mundane: "Recinto / jardim; no composto, parque de diversões = atração escolhida.", gloss: "Fr. parc ← parricus (cercado); parque de diversões ≠ Parkinson (cola PARK); party pode entrar; Valeu !!!", href: "' +
    HREF_Q +
    '", en: "park", es: "parque", fr: "parc", it: "parco", de: "Park", yo: "ọgbà ìtura", sw: "bustani", gez: "gännät", el: "πάρκο", la: "parcus / hortus", nl: "park", pl: "park", ru: "парк", uk: "парк", zh: "公园", ja: "公園", ko: "공원", ar: "حديقة", he: "פארק", hi: "पार्क", tr: "park", sv: "park", da: "park", no: "park", fi: "puisto", cs: "park", ro: "parc", hu: "park", ca: "parc", gl: "parque", eu: "parke", gn: "parque", qu: "parque", eo: "parko", vi: "công viên", id: "taman", th: "สวน", hr: "park", sk: "park", ga: "páirc", cy: "parc", ha: "fili", am: "ፓርክ", fa: "پارک", bn: "পার্ক", zu: "ipaki" },\n';
  gloss = replaceOrInsertAfter(gloss, 'parque', parqueMain, 'parkinson');
  const parqueAliases = [
    [
      '"parque de diversões"',
      '    "parque de diversões": { tone: "warm", category: "Léxico", mundane: "Recinto da festa escolhida — amusement park.", gloss: "Parricus + dīvertere; cola PARK com Parkinson recusada; party pode entrar, não é o recinto; Valeu !!!", href: "' +
        HREF_Q +
        '", ' +
        langsParque() +
        ' },\n'
    ],
    [
      '"parque de diversoes"',
      '    "parque de diversoes": { gloss: "Sem acento — o mesmo composto; ver parque de diversões.", href: "' +
        HREF_Q +
        '", en: "amusement park", es: "parque de diversiones" },\n'
    ],
    [
      '"amusement park"',
      '    "amusement park": { gloss: "EN de parque de diversões — recinto da atração; ≠ Parkinson.", href: "' +
        HREF_Q +
        '", en: "amusement park", es: "parque de diversiones" },\n'
    ],
    [
      '"theme park"',
      '    "theme park": { gloss: "EN parque temático — irmã do composto; ver parque de diversões.", href: "' +
        HREF_Q +
        '", en: "theme park", es: "parque temático" },\n'
    ],
    [
      '"parque temático"',
      '    "parque temático": { gloss: "Irmã de parque de diversões — recinto com tema; ≠ apelido Parkinson.", href: "' +
        HREF_Q +
        '", en: "theme park", es: "parque temático" },\n'
    ]
  ];
  for (const [key, line] of parqueAliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'parque');
  }

  const partyMain =
    '    party: { tone: "warm", category: "Léxico", mundane: "Empréstimo EN — festa / reunião; gatilho paRTY.", gloss: "OF partie ← lat. partīre (partir / partilhar); cola PAR com Parkinson e park recusada; festa (festum) traduz; Valeu !!!", href: "' +
    HREF_Y +
    '", ' +
    langsParty() +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'party', partyMain, 'parque');
  const partyAliases = [
    [
      '"paRTY"',
      '    "paRTY": { gloss: "Gatilho de campo — o mesmo lema party com calor gráfico.", href: "' +
        HREF_Y +
        '", en: "party (field spelling)", es: "party (grafía de campo)" },\n'
    ],
    [
      '"PARTY"',
      '    "PARTY": { gloss: "Maiúsculas — ver party.", href: "' +
        HREF_Y +
        '", en: "party", es: "party" },\n'
    ],
    [
      '"park party"',
      '    "park party": { gloss: "Colocação — festa no recinto; não étimo único; ver party e parque de diversões.", href: "' +
        HREF_Y +
        '", en: "park party", es: "fiesta en el parque" },\n'
    ]
  ];
  for (const [key, line] of partyAliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'party');
  }

  const festaLine =
    '    festa: { tone: "warm", category: "Léxico", mundane: "Celebração — lat. festum; tradução viva de party, avô outro.", gloss: "Lat. festum — festa PT; traduz party (partīre) sem herdar; elos alegria / party / parque de diversões; Valeu !!!", href: "' +
    HREF_Y +
    '", en: "party / feast", es: "fiesta", fr: "fête", it: "festa", de: "Fest", yo: "ayẹyẹ", sw: "sherehe", gez: "bäʿal", el: "γιορτή", la: "festum", nl: "feest", pl: "swieto", ru: "праздник", uk: "свято", zh: "节日", ja: "祭り", ko: "축제", ar: "حفلة", he: "חגיגה", hi: "उत्सव", tr: "parti", sv: "fest", da: "fest", no: "fest", fi: "juhla", cs: "oslava", ro: "sarbatoare", hu: "unnep", ca: "festa", gl: "festa", eu: "jaia", gn: "vy\'apave", qu: "raymi", eo: "festo", vi: "le hoi", id: "pesta", th: "งานเลี้ยง", hr: "proslava", sk: "oslava", ga: "feile", cy: "gwyl", ha: "buki", am: "beal", fa: "jashn", bn: "উৎসব", zu: "idili" },\n';
  gloss = replaceOrInsertAfter(gloss, 'festa', festaLine, 'party');

  return gloss;
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

async function main() {
  for (const script of [
    'generate-parkinson-palavra-cover.js',
    'generate-parque-de-diversoes-palavra-cover.js',
    'generate-party-palavra-cover.js'
  ]) {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  }

  const parkinson = stampFiles(buildParkinsonPost());
  const parque = stampFiles(buildParquePost());
  const party = stampFiles(buildPartyPost());
  parque.seriesOrder = Number(parkinson.seriesOrder) + 1;
  party.seriesOrder = Number(parkinson.seriesOrder) + 2;

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, parkinson);
  upsertPost(posts, parque);
  upsertPost(posts, party);
  await writeJsonRetry(POSTS_FILE, posts);

  for (const post of [parkinson, parque, party]) {
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML', post.slug, e.message);
    }
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, parkinson);
  writeI18n(i18n, parque);
  writeI18n(i18n, party);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-parkinson',
        title: 'Parkinson — Parkin + son (Pedro); ≠ parque ≠ party',
        titleEn: 'Parkinson — Parkin + son (Peter); ≠ park ≠ party',
        titleEs: 'Parkinson — Parkin + son (Pedro); ≠ parque ≠ party',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: Parkinson = Parkin + -son (Pedro); relacionar com parque de diversões e cruzar party = cola de orelha, não étimo; epónimo facto, não brinquedo; Valeu !!!',
        whyEn: 'Words: Parkinson = Parkin + -son (Peter); relate to amusement park and cross party = ear-glue, not etymon; eponym as fact, not a ride.',
        whyEs: 'Palabras: Parkinson = Parkin + -son (Pedro); relacionar con parque de diversiones y cruzar party = cola de oído, no étimo; epónimo como hecho, no un juego.',
        suggestedSlug: parkinson.slug,
        doneHref: HREF_P,
        seriesHint: 'palavras-origem',
        sources: [
          HREF_P,
          HREF_Q,
          HREF_Y,
          WIKT_PARKINSON,
          '/posts/post-inspecao-figura-michael-j-fox.html',
          '/biblioteca/unifesp/livro-xiv.html#aula-13',
          '/posts/post-inspecao-palavra-trocadilho.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + parkinson.seriesOrder + ' — trio Parkinson × parque × party; étimo Pedro, não recinto.'
      },
      ['palavra-boston', 'palavra-trocadilho']
    );
    upsertItem(
      items,
      {
        id: 'palavra-parque-de-diversoes',
        title: 'Parque de diversões — recinto da festa escolhida; ≠ Parkinson',
        titleEn: 'Parque de diversões — enclosure of chosen fun; ≠ Parkinson',
        titleEs: 'Parque de diversões — recinto de la fiesta elegida; ≠ Parkinson',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: parque de diversões = parc/parricus + diversão (dīvertere); cola PARK com Parkinson recusada; party pode entrar; Valeu !!!',
        whyEn: 'Words: amusement park = parc/parricus + diversion; PARK glue to Parkinson refused; a party may enter.',
        whyEs: 'Palabras: parque de diversiones = parc/parricus + diversión; cola PARK con Parkinson rechazada; party puede entrar.',
        suggestedSlug: parque.slug,
        doneHref: HREF_Q,
        seriesHint: 'palavras-origem',
        sources: [HREF_Q, HREF_P, HREF_Y, WIKI_PARQUE, '/posts/post-inspecao-palavra-alegria.html'],
        notes: 'Cap. ' + parque.seriesOrder + ' — recinto; não metáfora do tremor.'
      },
      ['palavra-parkinson']
    );
    upsertItem(
      items,
      {
        id: 'palavra-party',
        title: 'Party — partie / partire; paRTY; ≠ Parkinson ≠ parque',
        titleEn: 'Party — partie / partire; paRTY; ≠ Parkinson ≠ park',
        titleEs: 'Party — partie / partire; paRTY; ≠ Parkinson ≠ parque',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: party ← partie ← partire; gatilho paRTY; cola PAR com Parkinson e park recusada; festa (festum) traduz; Valeu !!!',
        whyEn: 'Words: party ← partie ← partire; trigger paRTY; PAR glue to Parkinson and park refused; festa (festum) translates.',
        whyEs: 'Palabras: party ← partie ← partire; gatillo paRTY; cola PAR con Parkinson y park rechazada; festa (festum) traduce.',
        suggestedSlug: party.slug,
        doneHref: HREF_Y,
        seriesHint: 'palavras-origem',
        sources: [HREF_Y, HREF_P, HREF_Q, WIKT_PARTY, '/posts/post-inspecao-palavra-boston.html'],
        notes: 'Cap. ' + party.seriesOrder + ' — empréstimo; Tea Party fica em Boston.'
      },
      ['palavra-parque-de-diversoes']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (Parkinson · parque · party)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'parkinson',
        word: 'Parkinson',
        simple:
          'Parkin + -son (filho de Parkin; Parkin = Pedro). Cola PARK com parque de diversões e PAR com party recusada. Epónimo facto, não brinquedo. Valeu !!!',
        simpleEn:
          'Parkin + -son (son of Parkin; Parkin = Peter). PARK/PAR glue to amusement park and party refused. Eponym as fact, not a ride. Valeu !!!',
        simpleEs:
          'Parkin + -son (hijo de Parkin; Parkin = Pedro). Cola PARK/PAR con parque y party rechazada. Epónimo como hecho, no un juego. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_P,
        history:
          'Parkinson é patronímico inglês: Parkin (hipocorístico de Peter / Pedro, via Perkin) + -son. James Parkinson descreve em 1817 a shaking palsy; o apelido vira epónimo. O park do recinto (parc / parricus) é outro avô.',
        curiosities:
          'A orelha lê PARK e aponta o parque de diversões; lê PAR e aponta party. Relacionar é etiquetar a cola, não fundir tremor com roda nem apelido com festa.',
        historyEn:
          'Parkinson is an English patronymic: Parkin (pet form of Peter via Perkin) + -son. James Parkinson describes shaking palsy in 1817; the surname becomes an eponym. Park as enclosure (parc / parricus) is another grandfather.',
        curiositiesEn:
          'The ear reads PARK and points to the amusement park; PAR points to party. Relating labels the glue; it does not fuse tremor with a ride.',
        historyEs:
          'Parkinson es patronímico inglés: Parkin (hipocorístico de Pedro) + -son. James Parkinson describe en 1817 la shaking palsy; el apellido vira epónimo. El park del recinto es otro abuelo.',
        curiositiesEs:
          'El oído lee PARK y apunta al parque de diversiones; PAR apunta a party. Relacionar etiqueta la cola; no funde temblor con rueda.'
      },
      ['boston', 'trocadilho']
    );
    upsertItem(
      items,
      {
        id: 'parque-de-diversoes',
        word: 'parque de diversões',
        simple:
          'Parricus (cercado) + diversão (dīvertere). Recinto da festa escolhida. Cola PARK com Parkinson recusada. Party pode entrar. Valeu !!!',
        simpleEn:
          'Parricus (enclosure) + diversion (dīvertere). Place of chosen fun. PARK glue to Parkinson refused. A party may enter. Valeu !!!',
        simpleEs:
          'Parricus (cercado) + diversión (dīvertere). Recinto de la fiesta elegida. Cola PARK con Parkinson rechazada. Party puede entrar. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_Q,
        history:
          'Parque entra pelo francês parc, latim tardio parricus (cercado). Diversão herda dīvertere (desviar). O composto nomeia o recinto de atrações, vizinho do jardim público mas puxado à festa comprada com bilhete.',
        curiosities:
          'A roda gira porque se comprou o bilhete. O tremor do epónimo Parkinson não é atração. Uma party cabe no recinto; o avô de party é partire, não parricus.',
        historyEn:
          'Parque comes via French parc, Late Latin parricus (enclosure). Diversão inherits dīvertere (to turn aside). The compound names the attraction ground.',
        curiositiesEn:
          'The wheel turns because a ticket was bought. Parkinson’s tremor is not a ride. A party may be hosted here; party’s grandfather is partire.',
        historyEs:
          'Parque entra por el francés parc, latín tardío parricus. Diversão hereda dīvertere. El compuesto nombra el recinto de atracciones.',
        curiositiesEs:
          'La rueda gira con boleto. El temblor del epónimo no es un juego. Una party cabe; su abuelo es partire, no parricus.'
      },
      ['parkinson']
    );
    upsertItem(
      items,
      {
        id: 'party',
        word: 'party',
        simple:
          'OF partie ← lat. partīre (partir / partilhar). Gatilho paRTY. Cola PAR com Parkinson e park recusada. Festa (festum) traduz. Valeu !!!',
        simpleEn:
          'OF partie ← Lat. partīre (to divide / to share). Trigger paRTY. PAR glue to Parkinson and park refused. Festa (festum) translates. Valeu !!!',
        simpleEs:
          'OF partie ← lat. partīre (partir / compartir). Gatillo paRTY. Cola PAR con Parkinson y park rechazada. Festa (festum) traduce. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_Y,
        history:
          'Inglês party herda o francês antigo partie, do latim partīre / partiō: partir, dividir, partilhar. Da parte que se junta nasce a reunião e, no BR, a festa emprestada. Festa portuguesa vem de festum — tradução, não sangue.',
        curiosities:
          'paRTY é o mesmo lema com calor gráfico. Park party é colocação (festa no recinto), não um étimo único. Boston Tea Party é sala histórica na ficha Boston.',
        historyEn:
          'English party inherits Old French partie from Latin partīre: to divide, to share. Portuguese festa comes from festum — a translation, not blood.',
        curiositiesEn:
          'paRTY is the same lemma with graphic heat. Park party is a collocation. Boston Tea Party lives on the Boston sheet.',
        historyEs:
          'Inglés party hereda el francés antiguo partie, del latín partīre. Festa portuguesa viene de festum — traducción, no sangre.',
        curiositiesEs:
          'paRTY es el mismo lema con calor gráfico. Park party es colocación. Boston Tea Party vive en la ficha Boston.'
      },
      ['parque-de-diversoes']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (Parkinson · parque · party)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (Parkinson · parque · party)');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'parkinson',
      slug: 'parkinson',
      title: 'Parkinson',
      titleEn: 'Parkinson',
      titleEs: 'Parkinson',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — filho de Parkin (Pedro); ≠ parque ≠ party; Valeu !!!',
      teaserEn: 'BudGanja echo — son of Parkin (Peter); ≠ park ≠ party; Valeu !!!',
      teaserEs: 'Eco BudGanja — hijo de Parkin (Pedro); ≠ parque ≠ party; ¡Valeu !!!',
      body: poemParkinsonPt(),
      bodyEn: poemParkinsonEn(),
      bodyEs: poemParkinsonEs(),
      inspectionHref: HREF_P,
      tags: ['poesia', 'vida', 'parkinson', 'parque', 'party']
    });
    upsertVidaPoem(vida, {
      id: 'parque-de-diversoes',
      slug: 'parque-de-diversoes',
      title: 'Parque de diversões',
      titleEn: 'Amusement park',
      titleEs: 'Parque de diversiones',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — recinto da festa escolhida; a roda gira com bilhete; ≠ Parkinson; Valeu !!!',
      teaserEn: 'BudGanja echo — enclosure of chosen fun; the wheel turns with a ticket; ≠ Parkinson; Valeu !!!',
      teaserEs: 'Eco BudGanja — recinto de la fiesta elegida; la rueda gira con boleto; ≠ Parkinson; ¡Valeu !!!',
      body: poemParquePt(),
      bodyEn: poemParqueEn(),
      bodyEs: poemParqueEs(),
      inspectionHref: HREF_Q,
      tags: ['poesia', 'vida', 'parque', 'diversao', 'party']
    });
    upsertVidaPoem(vida, {
      id: 'party',
      slug: 'party',
      title: 'Party',
      titleEn: 'Party',
      titleEs: 'Party',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — partie / partire; paRTY; ≠ Parkinson ≠ parque; Valeu !!!',
      teaserEn: 'BudGanja echo — partie / partire; paRTY; ≠ Parkinson ≠ park; Valeu !!!',
      teaserEs: 'Eco BudGanja — partie / partire; paRTY; ≠ Parkinson ≠ parque; ¡Valeu !!!',
      body: poemPartyPt(),
      bodyEn: poemPartyEn(),
      bodyEs: poemPartyEs(),
      inspectionHref: HREF_Y,
      tags: ['poesia', 'vida', 'party', 'festa', 'parkinson']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poemas Vida actualizados');
  }

  for (const post of [parkinson, parque, party]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store', post.slug, e.message);
    }
  }

  console.log('OK:', parkinson.title, '| Cap.', parkinson.seriesOrder);
  console.log('OK:', parque.title, '| Cap.', parque.seriesOrder);
  console.log('OK:', party.title, '| Cap.', party.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
