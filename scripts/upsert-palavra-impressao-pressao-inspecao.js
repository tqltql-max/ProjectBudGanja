'use strict';

/**
 * Injeta a família «impressão / pressão» + panela + válvula de escape.
 * Uso: node scripts/upsert-palavra-impressao-pressao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildImpressaoPressaoPost } = require('../lib/impressao-pressao-inspecao-post.js');

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

function upsertGuiaItem(items, entry) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'inspiração' || x.id === 'inspiracao' || x.id === 'incrível');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

async function main() {
  const post = stampFiles(buildImpressaoPressaoPost());
  const href = '/posts/post-' + post.slug + '.html';

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);
  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-impressao-pressao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Impressão · Pressão — panela e a válvula de escape',
      titleEn: 'Impression · Pressure — cooker and the release valve',
      titleEs: 'Impresión · Presión — olla y la válvula de escape',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: impressão = pressão para dentro; objecto panela de pressão + válvula de escape; ≠ inspiração; ficha ≠ anular válvula.',
      whyEn: 'Words: impression = pressure inward; pressure cooker + release valve; ≠ inspiration; sheet ≠ blocking the valve.',
      whyEs: 'Palabras: impresión = presión hacia dentro; olla a presión + válvula de escape; ≠ inspiración.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Panela_de_press%C3%A3o',
        '/posts/post-inspecao-palavra-inspiracao.html',
        '/posts/post-inspecao-palavra-risco.html',
        '/posts/post-inspecao-palavra-aff.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — premere; panela = vaso; válvula = alívio; escape de motor recusado; P de Perigo se válvula presa.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-impressao-pressao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const shared = {
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Impressão e pressão vêm do latim premere (apertar). Impressão é in- + pressão: a marca para dentro. Expressão aperta para fora. Inspiração (spirare) é outro étimo.',
      curiosities:
        'O objecto desta ficha é a panela de pressão e a válvula de escape. Escape preso = P de Perigo. Aff é a válvula oral. Ficha ≠ anular a peça.',
      historyEn:
        'Impressão and pressão come from Latin premere (to press). Impression is in- + pressure: the inward mark. Expression presses out. Inspiration (spirare) is another etymon.',
      curiositiesEn:
        'This sheet’s object is the pressure cooker and the release valve. A blocked valve = P for Danger. Aff is the oral valve. Sheet ≠ how to disable the part.',
      historyEs:
        'Impressão y pressão vienen del latín premere. La impresión es in- + presión: la marca hacia dentro. La expresión aprieta hacia fuera. Inspiración (spirare) es otro étimo.',
      curiositiesEs:
        'El objeto de esta ficha es la olla a presión y la válvula de escape. Válvula presa = P de Perigo. Aff es la válvula oral. Ficha ≠ anular la pieza.'
    };
    const family = [
      {
        id: 'impressao',
        word: 'impressão',
        simple:
          'Marca de pressão para dentro (lat. imprimere); papel, peito, memória; ≠ inspiração; família da panela nesta ficha.',
        simpleEn: 'Mark of pressure inward (Lat. imprimere); paper, chest, memory; ≠ inspiration; cooker family on this sheet.',
        simpleEs: 'Marca de presión hacia dentro (lat. imprimere); papel, pecho, memoria; ≠ inspiración.',
        ...shared
      },
      {
        id: 'pressao',
        word: 'pressão',
        simple:
          'Força (lat. pressio / premere). Física, social, do peito — e o que a panela de pressão segura. O mapa calculado é risco.',
        simpleEn: 'Force (Lat. pressio / premere). Physics, social, chest — and what the cooker holds. The calculated map is risco.',
        simpleEs: 'Fuerza (lat. pressio / premere). Física, social, pecho — y lo que la olla sujeta.',
        ...shared
      },
      {
        id: 'impressionado',
        word: 'impressionado',
        simple: 'Quem recebeu a marca — peito impresso. Crédito: Gratidão. Ver impressão/pressão.',
        simpleEn: 'One who received the mark. Credit: Gratidão. See impression/pressure.',
        simpleEs: 'Quien recibió la marca. Crédito: Gratidão. Ver impresión/presión.',
        ...shared
      },
      {
        id: 'panela-de-pressao',
        word: 'panela de pressão',
        simple:
          'Objecto: vaso que segura vapor. Antecedente Papin. Válvula de escape livre = ofício; presa = P de Perigo. Ficha ≠ receita.',
        simpleEn: 'Object: vessel that holds steam. Papin ancestor. Free valve = craft; blocked = P for Danger. Not a recipe.',
        simpleEs: 'Objeto: vaso que sujeta vapor. Antecedente Papin. Válvula libre = oficio; presa = P de Perigo.',
        ...shared
      },
      {
        id: 'valvula-de-escape',
        word: 'válvula de escape',
        simple:
          'Nesta ficha: alívio da panela de pressão. Elo oral: aff. Escape de motor = outro objecto. Não anular a peça.',
        simpleEn: 'On this sheet: cooker relief valve. Oral link: aff. Car exhaust = other object. Do not disable the part.',
        simpleEs: 'En esta ficha: alivio de la olla. Elo oral: aff. Escape de motor = otro objeto.',
        ...shared
      }
    ];
    family.forEach((entry) => upsertGuiaItem(items, entry));
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (impressão/pressão + panela)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const block =
      '    impressão: { tone: "warm", category: "Marca", mundane: "Rasto de pressão para dentro — papel, peito, memória.", gloss: "Lat. impressio ← imprimere (in- + premere); ≠ inspiração (spirare); família panela de pressão / válvula de escape; Valeu !!!", href: "' +
      href +
      '", en: "impression / print", es: "impresión", fr: "impression", it: "impressione", de: "Eindruck / Druck", el: "εντύπωση", la: "impressio", yo: "ami", sw: "hisia", gez: "impressao", nl: "indruk", pl: "wrazenie", ru: "впечатление", uk: "враження", zh: "印象", ja: "印象", ko: "인상", ar: "انطباع", he: "רושם", hi: "छाप", tr: "izlenim", sv: "intryck", da: "indtryk", no: "inntrykk", fi: "vaikutelma", cs: "dojem", ro: "impresie", hu: "benyomas", ca: "impressio", gl: "impresion", eu: "inpresio", gn: "jehecha", qu: "rikuy", eo: "impreso", vi: "an tuong", id: "kesan", th: "ความประทับใจ", hr: "dojam", sk: "dojem", ga: "tuiscint", cy: "argraff", ha: "tunanin", am: "ታሳቢ", fa: "برداشت", bn: "ছাপ", zu: "umqondo" },\n' +
      '    pressão: { tone: "caution", category: "Força", mundane: "Aperto — física, social, do peito; o que a panela segura.", gloss: "Lat. pressio ← premere; elo impressão (marca para dentro); panela + válvula de escape; P de Perigo se escape preso; ≠ diagnóstico; Valeu !!!", href: "' +
      href +
      '", en: "pressure", es: "presión", fr: "pression", it: "pressione", de: "Druck", el: "πίεση", la: "pressio", yo: "titẹ", sw: "shinikizo", gez: "pressao", nl: "druk", pl: "cisnienie", ru: "давление", uk: "тиск", zh: "压力", ja: "圧力", ko: "압력", ar: "ضغط", he: "לחץ", hi: "दबाव", tr: "basinc", sv: "tryck", da: "tryk", no: "trykk", fi: "paine", cs: "tlak", ro: "presiune", hu: "nyomas", ca: "pressio", gl: "presion", eu: "presio", gn: "mboguejy", qu: "ñitiy", eo: "premo", vi: "ap luc", id: "tekanan", th: "ความดัน", hr: "tlak", sk: "tlak", ga: "brú", cy: "pwysedd", ha: "matsi", am: "ግፊት", fa: "فشار", bn: "চাপ", zu: "ingcindezi" },\n' +
      '    impressionado: { gloss: "Quem recebeu a marca — ver impressão/pressão.", href: "' +
      href +
      '", en: "impressed", es: "impresionado" },\n' +
      '    impresssao: { gloss: "Grafia apressada de impressão — ver ficha canónica.", href: "' +
      href +
      '", en: "misspelling of impressão", es: "lapsus de impressão" },\n' +
      '    pressao: { gloss: "Grafia apressada de pressão — ver ficha canónica.", href: "' +
      href +
      '", en: "misspelling of pressão", es: "lapsus de pressão" },\n' +
      '    "panela de pressão": { tone: "caution", category: "Objecto", mundane: "Vaso que segura vapor para cozinhar.", gloss: "Objecto desta ficha; válvula de escape livre = ofício; presa = P de Perigo; ficha ≠ receita; Papin séc. XVII.", href: "' +
      href +
      '", en: "pressure cooker", es: "olla a presión", fr: "cocotte-minute", it: "pentola a pressione", de: "Schnellkochtopf", el: "χύτρα ταχύτητας", la: "caccabus pressionis", yo: "ikoko titẹ", sw: "sufuria ya shinikizo", gez: "panela", nl: "snelkookpan", pl: "szybkowar", ru: "скороварка", uk: "скороварка", zh: "高压锅", ja: "圧力鍋", ko: "압력솥", ar: "قدر ضغط", he: "סיר לחץ", hi: "प्रेशर कुकर", tr: "düdüklü tencere", sv: "tryckkokare", da: "trykkoger", no: "trykkoker", fi: "painekattila", cs: "tlakovy hrnec", ro: "oala sub presiune", hu: "kukta", ca: "olla de pressio", gl: "ola a presion", eu: "presio-eltze", gn: "ña\'ẽmbe", qu: "yanuna", eo: "prempoto", vi: "noi ap suat", id: "panci tekanan", th: "หม้ออัดแรงดัน", hr: "ekspres lonac", sk: "tlakovy hrniec", ga: "cocaire brú", cy: "pochwr pwysedd", ha: "kasko na matsi", am: "የግፊት ድስት", fa: "زودپز", bn: "প্রেশার কুকার", zu: "ibhodwe lengcindezi" },\n' +
      '    "válvula de escape": { tone: "caution", gloss: "Nesta ficha: alívio da panela de pressão. Elo oral: aff. Motor/turbo = outro objecto. Não anular.", href: "' +
      href +
      '", en: "release / safety valve (cooker)", es: "válvula de escape (olla)" },\n' +
      '    "valvula de escape": { gloss: "Sem acento — ver válvula de escape / impressão-pressão.", href: "' +
      href +
      '", en: "release valve", es: "válvula de escape" },\n';

    if (!/impressão:\s*\{/.test(gloss)) {
      const inserted =
        insertAfterKey(gloss, 'inspiração', block) ||
        insertAfterKey(gloss, 'incrível', block) ||
        insertAfterKey(gloss, 'risco', block);
      if (inserted) {
        gloss = inserted;
        console.log('Glossário actualizado (impressão/pressão)');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
      }
    } else {
      console.log('Glossário já tinha impressão');
    }
    await writeJsonRetry(GLOSS_FILE, gloss);
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
