'use strict';

/**
 * Injeta o mapa de sinais do corpo: sinais, barriga, orelha, mama, cabelo.
 * Uso: node scripts/upsert-sinais-corpo-cluster.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildSinaisPost,
  buildBarrigaPost,
  buildOrelhaPost,
  buildMamaPost,
  buildCabeloPost
} = require('../lib/sinais-corpo-cluster-posts.js');

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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss, mainKey, mainLine, aliases, afterKey) {
  const keyRe = new RegExp(
    mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{'
  );
  if (keyRe.test(gloss)) {
    gloss = gloss.replace(
      new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
    if (aliases) {
      const lines = aliases.split('\n').filter((l) => l.trim());
      for (const line of lines) {
        const m = line.match(/^\s+("[^"]+"|[A-Za-zÀ-ÿ0-9_]+):/);
        if (!m) continue;
        const aliasKey = m[1];
        const exists = new RegExp(
          aliasKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{'
        ).test(gloss);
        if (exists) continue;
        const inserted = insertAfterKey(gloss, mainKey, line + '\n');
        if (inserted) gloss = inserted;
      }
    }
  } else {
    const inserted = insertAfterKey(gloss, afterKey, mainLine + (aliases || ''));
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção falhou para', mainKey);
  }
  return gloss;
}

const ITEMS = [
  {
    build: buildSinaisPost,
    sugId: 'palavra-sinais',
    sugTitle: 'Sinais — o campo do corpo',
    sugTitleEn: 'Sinais — the body-signal field',
    sugTitleEs: 'Sinais — el campo del cuerpo',
    why: 'Palavras: sinais — plural de sinal; mapa do corpo (barriga, orelha, mama, cabelo, braços na cabeça).',
    guiaId: 'sinais',
    guiaWord: 'sinais',
    guiaSimple:
      'Plural de sinal — campo do corpo: barriga=satisfação, orelha=pulga/curiosidade, mama/teta=algo fácil, cabelo=deixa com as mulheres, braços na cabeça=pausa da cabeça; Valeu !!!',
    guiaAfter: ['sinal', 'sinais-rem'],
    glossKey: 'sinais',
    glossAfter: 'sinal',
    glossMain:
      '    sinais: { gloss: "Plural de sinal — campo do corpo (barriga, orelha, mama, cabelo, braços na cabeça=pausa); ≠ sinais REM (sono/sigla); Valeu !!!", href: "/posts/post-inspecao-palavra-sinais.html", en: "signals / signs", es: "señales", fr: "signaux", it: "segnali", de: "Zeichen", el: "símata", la: "signa", yo: "àwọn àmì", sw: "ishara", gez: "təʾəmərt", nl: "signalen", pl: "sygnały", ru: "znaki", uk: "sygnaly", zh: "xinhao", ja: "shingo", ko: "shinho", ar: "isharat", he: "otot", hi: "sanket", tr: "sinyaller", sv: "tecken", da: "tegn", no: "tegn", fi: "merkit", cs: "signály", ro: "semnale", hu: "jelek", ca: "senyals", gl: "sinais", eu: "seinaleak", gn: "señál", qu: "unancha", eo: "signaloj", vi: "tin hieu", id: "sinyal", th: "สัญญาณ", hr: "signali", sk: "signály", ga: "comharthaí", cy: "arwyddion", ha: "alamomi", am: "ምልክቶች", fa: "neshaneha", bn: "সংকেত", zu: "izimpawu" },\n'
  },
  {
    build: buildBarrigaPost,
    sugId: 'palavra-barriga',
    sugTitle: 'Barriga — sinal de satisfação',
    sugTitleEn: 'Barriga — signal of satisfaction',
    sugTitleEs: 'Barriga — señal de satisfacción',
    why: 'Palavras: barriga — ventre como sinal de satisfação; ≠ Barriga de Trigo.',
    guiaId: 'barriga',
    guiaWord: 'barriga',
    guiaSimple:
      'Ventre como sinal de satisfação (o bastante); ≠ livro Barriga de Trigo; mapa sinais; Valeu !!!',
    guiaAfter: ['sinais', 'sinal'],
    glossKey: 'barriga',
    glossAfter: 'sinais',
    glossMain:
      '    barriga: { gloss: "Ventre — sinal de satisfação (o bastante); ≠ Barriga de Trigo; mapa sinais; Valeu !!!", href: "/posts/post-inspecao-palavra-barriga.html", en: "belly", es: "barriga / vientre", fr: "ventre", it: "pancia", de: "Bauch", el: "koilia", la: "venter", yo: "ikun", sw: "tumbo", gez: "käbd", nl: "buik", pl: "brzuch", ru: "zhivot", uk: "zhivot", zh: "duzi", ja: "onaka", ko: "bae", ar: "batn", he: "beten", hi: "pet", tr: "karin", sv: "mage", da: "mave", no: "mage", fi: "vatsa", cs: "bricho", ro: "burtă", hu: "has", ca: "panxa", gl: "barriga", eu: "sabel", gn: "hyegue", qu: "wiksa", eo: "ventro", vi: "bung", id: "perut", th: "ท้อง", hr: "trbuh", sk: "brucho", ga: "bolg", cy: "bola", ha: "ciki", am: "ሆድ", fa: "shekam", bn: "পেট", zu: "isisu" },\n',
    glossAliases:
      '    satisfação: { gloss: "O bastante (lat. satisfacere) — no mapa de sinais, leitura da barriga.", href: "/posts/post-inspecao-palavra-barriga.html", en: "satisfaction", es: "satisfacción" },\n'
  },
  {
    build: buildOrelhaPost,
    sugId: 'palavra-orelha',
    sugTitle: 'Orelha — pulga atrás, curiosidade',
    sugTitleEn: 'Orelha — flea behind, curiosity',
    sugTitleEs: 'Orelha — pulga detrás, curiosidad',
    why: 'Palavras: orelha — pulga atrás da orelha = curiosidade.',
    guiaId: 'orelha',
    guiaWord: 'orelha',
    guiaSimple:
      'Orelha — pulga atrás = curiosidade; elos inseto, dois ouvidos; mapa sinais; Valeu !!!',
    guiaAfter: ['barriga', 'sinais'],
    glossKey: 'orelha',
    glossAfter: 'barriga',
    glossMain:
      '    orelha: { gloss: "Lat. auricula — pulga atrás da orelha = curiosidade; mapa sinais; Valeu !!!", href: "/posts/post-inspecao-palavra-orelha.html", en: "ear", es: "oreja", fr: "oreille", it: "orecchio", de: "Ohr", el: "aftí", la: "auricula", yo: "etí", sw: "sikio", gez: "ʾəzn", nl: "oor", pl: "ucho", ru: "ukho", uk: "vukho", zh: "erduo", ja: "mimi", ko: "gwi", ar: "udhun", he: "ozen", hi: "kaan", tr: "kulak", sv: "ora", da: "ore", no: "ore", fi: "korva", cs: "ucho", ro: "ureche", hu: "ful", ca: "orella", gl: "orella", eu: "belarri", gn: "nambi", qu: "rinri", eo: "orelo", vi: "tai", id: "telinga", th: "หู", hr: "uho", sk: "ucho", ga: "cluain", cy: "clust", ha: "kunne", am: "ጆሮ", fa: "gush", bn: "কান", zu: "indlebe" },\n',
    glossAliases:
      '    pulga: { gloss: "Na fala BR, peça da locução pulga atrás da orelha — curiosidade; o bicho vai em inseto.", href: "/posts/post-inspecao-palavra-orelha.html", en: "flea (idiom)", es: "pulga (dicho)" },\n' +
      '    curiosidade: { gloss: "Sinal da orelha (pulga atrás) — inspecionar, não sentenciar.", href: "/posts/post-inspecao-palavra-orelha.html", en: "curiosity", es: "curiosidad" },\n'
  },
  {
    build: buildMamaPost,
    sugId: 'palavra-mama',
    sugTitle: 'Mama — teta, sinal de algo fácil',
    sugTitleEn: 'Mama — teat, signal of something easy',
    sugTitleEs: 'Mama — teta, señal de algo fácil',
    why: 'Palavras: mama = teta — sinal de algo fácil; ≠ mamão ≠ mãe.',
    guiaId: 'mama',
    guiaWord: 'mama',
    guiaSimple:
      'Mama = teta — sinal de algo fácil (à mão); ≠ mamão ≠ mãe; mapa sinais; Valeu !!!',
    guiaAfter: ['orelha', 'sinais'],
    glossKey: 'mama',
    glossAfter: 'orelha',
    glossMain:
      '    mama: { gloss: "Lat. mamma = teta — sinal de algo fácil; ≠ mamão ≠ mãe; mapa sinais; Valeu !!!", href: "/posts/post-inspecao-palavra-mama.html", en: "breast / teat", es: "mama / teta", fr: "sein", it: "mammella", de: "Brust", el: "stithos", la: "mamma", yo: "oỳan", sw: "ziwa", gez: "ṭub", nl: "borst", pl: "piers", ru: "grud", uk: "hrudi", zh: "rufang", ja: "chichi", ko: "gaseum", ar: "thady", he: "shad", hi: "stan", tr: "meme", sv: "brost", da: "bryst", no: "bryst", fi: "rinta", cs: "prso", ro: "san", hu: "mell", ca: "mama", gl: "mama", eu: "bular", gn: "kambuchi", qu: "ñuñu", eo: "mamo", vi: "vu", id: "payudara", th: "เต้า", hr: "dojka", sk: "prsnik", ga: "cíoch", cy: "bron", ha: "nono", am: "ጡት", fa: "sine", bn: "স্তন", zu: "ibele" },\n',
    glossAliases:
      '    teta: { gloss: "Forma oral BR de mama — sinal de algo fácil; ver ficha mama.", href: "/posts/post-inspecao-palavra-mama.html", en: "teat", es: "teta" },\n'
  },
  {
    build: buildCabeloPost,
    sugId: 'palavra-cabelo',
    sugTitle: 'Cabelo — deixa com as mulheres',
    sugTitleEn: 'Cabelo — leave it with women',
    sugTitleEs: 'Cabelo — déjalo con las mujeres',
    why: 'Palavras: cabelo — deferência: deixa com as mulheres, elas sabem mais; ≠ despejo.',
    guiaId: 'cabelo',
    guiaWord: 'cabelo',
    guiaSimple:
      'Cabelo — sinal de deferência: a gente deixa com as mulheres, elas sabem mais; ≠ despejo; mapa sinais; Valeu !!!',
    guiaAfter: ['mama', 'sinais'],
    glossKey: 'cabelo',
    glossAfter: 'mama',
    glossMain:
      '    cabelo: { gloss: "Lat. capillus — deixa com as mulheres (sabem mais); deferência ≠ despejo; mapa sinais; Valeu !!!", href: "/posts/post-inspecao-palavra-cabelo.html", en: "hair", es: "cabello", fr: "cheveu", it: "capello", de: "Haar", el: "mallia", la: "capillus", yo: "irun", sw: "nywele", gez: "śəʿər", nl: "haar", pl: "wlosy", ru: "volosy", uk: "volossya", zh: "toufa", ja: "kami", ko: "meori", ar: "shaar", he: "sear", hi: "baal", tr: "sac", sv: "har", da: "har", no: "har", fi: "hius", cs: "vlasy", ro: "par", hu: "haj", ca: "cabell", gl: "cabelo", eu: "ile", gn: "akãrague", qu: "chujcha", eo: "haro", vi: "toc", id: "rambut", th: "ผม", hr: "kosa", sk: "vlasy", ga: "gruaig", cy: "gwallt", ha: "gashi", am: "ፀጉር", fa: "moo", bn: "চুল", zu: "izinwele" },\n'
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
      '/posts/post-inspecao-palavra-sinal.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — cluster sinais do corpo.'
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

  if (gloss && /fácil:\s*\{/.test(gloss)) {
    const facilLine =
      '    fácil: { gloss: "Lat. facilis — no mapa de sinais, leitura da mama/teta (algo fácil, à mão).", href: "/posts/post-inspecao-palavra-mama.html", en: "easy", es: "fácil", fr: "facile", it: "facile", de: "leicht", yo: "rọrùn", sw: "rahisi", gez: "qälil", el: "εύκολος", la: "facilis", nl: "easy", pl: "easy", ru: "easy", uk: "easy", zh: "easy", ja: "easy", ko: "easy", ar: "easy", he: "easy", hi: "easy", tr: "easy", sv: "easy", da: "easy", no: "easy", fi: "easy", cs: "easy", ro: "easy", hu: "easy", ca: "easy", gl: "easy", eu: "easy", gn: "easy", qu: "easy", eo: "easy", vi: "easy", id: "easy", th: "easy", hr: "easy", sk: "easy", ga: "easy", cy: "easy", ha: "easy", am: "easy", fa: "easy", bn: "easy", zu: "easy" },';
    gloss = gloss.replace(/    fácil:\s*\{[\s\S]*?\},/, facilLine);
    gloss = gloss.replace(
      /    facil:\s*\{[\s\S]*?\},/,
      '    facil: { gloss: "Grafia sem acento de fácil — ver mama/teta.", href: "/posts/post-inspecao-palavra-mama.html", en: "easy", es: "fácil" },'
    );
  }

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (sinais do corpo)');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
