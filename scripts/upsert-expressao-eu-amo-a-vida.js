'use strict';

/**
 * Injeta expressão «eu amo a vida» (alteração automática de Valeu !!!).
 * Uso: node scripts/upsert-expressao-eu-amo-a-vida.js
 */

const fs = require('fs');
const path = require('path');
const { buildEuAmoAVidaPost } = require('../lib/eu-amo-a-vida-inspecao-post.js');
const { buildValeuPost } = require('../lib/valeu-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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

function nextFreeSeriesOrder(posts, preferred, selfSlug) {
  const taken = new Set(
    posts
      .filter((p) => p.slug !== selfSlug && p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder))
      .filter((n) => Number.isFinite(n) && n > 0)
  );
  let n = preferred;
  while (taken.has(n)) n += 1;
  return n;
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

function insertGlossary(gloss) {
  const href = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const valeuHref = '/posts/post-inspecao-palavra-valeu.html';
  const main =
    '    "eu amo a vida": { tone: "warm", category: "Fecho", mundane: "Frase BR — amor da vida em primeira pessoa.", gloss: "Alteração automática de Valeu !!!; amar + vida; o render cola sozinho; ≠ cartaz ≠ trilha /vida/.", href: "' +
    href +
    '", en: "I love life", es: "amo la vida", fr: "j aime la vie", it: "amo la vita", de: "ich liebe das Leben", el: "agapo ti zoi", la: "vitam amo", yo: "mo feran aye", sw: "ninapenda maisha", gez: "fäqärku ḥeywat", nl: "ik hou van het leven", pl: "kocham zycie", ru: "ia liubliu zhizn", uk: "ia liubliu zhyttia", zh: "wo ai shengming", ja: "jinsei wo aishiteiru", ko: "salmeul saranghanda", ar: "uhibbu al-hayat", he: "ani ohev et hahayim", hi: "main jivan se pyar karta hun", tr: "hayati seviyorum", sv: "jag alskar livet", da: "jeg elsker livet", no: "jeg elsker livet", fi: "rakastan elamaa", cs: "miluji zivot", ro: "iubesc viata", hu: "szeretem az eletet", ca: "estimo la vida", gl: "amo a vida", eu: "bizitza maite dut", gn: "ahayhu tekove", qu: "kawsayta munani", eo: "mi amas la vivon", vi: "toi yeu cuoc song", id: "aku cinta hidup", th: "chan rak chiwit", hr: "volim zivot", sk: "milujem zivot", ga: "is brea liom an saol", cy: "rydw i n caru bywyd", ha: "ina son rai", am: "hiywot enwedalehu", fa: "zendegi ra dust daram", bn: "ami jibonke bhalobashi", zu: "ngiyayithanda impilo" },\n';
  const aliases = [
    '    euamoavida: { gloss: "Forma colada — ver eu amo a vida.", href: "' +
      href +
      '", en: "I love life", es: "amo la vida" },\n',
    '    "eu amo a vida!!!": { gloss: "Com calor gráfico — a alteração de Valeu !!!; ver eu amo a vida.", href: "' +
      href +
      '", en: "I love life!", es: "¡amo la vida!" },\n'
  ];

  let next = gloss;
  const valeuLine =
    '    valeu: { gloss: "De valer ← lat. valēre — gratidão leve / fecho oral BR; alteração automática: eu amo a vida; irmã de Gratidão; Valeu !!!", href: "' +
    valeuHref +
    '", en: "thanks / cheers", es: "gracias (informal)", fr: "merci", it: "grazie", de: "danke", el: "efharisto", la: "gratias", yo: "o se", sw: "asante", gez: "amesegenallo", nl: "bedankt", pl: "dzieki", ru: "spasibo", uk: "dyakuyu", zh: "thanks", ja: "arigato", ko: "gomawo", ar: "shukran", he: "toda", hi: "dhanyavad", tr: "sagol", sv: "tack", da: "tak", no: "takk", fi: "kiitos", cs: "diky", ro: "mersi", hu: "kosz", ca: "gracies", gl: "grazas", eu: "eskerrik", gn: "aguyje", qu: "añay", eo: "dankon", vi: "cam on", id: "makasih", th: "khop khun", hr: "hvala", sk: "dakujem", ga: "go raibh maith", cy: "diolch", ha: "na gode", am: "ameseginalehu", fa: "merci", bn: "dhonnobad", zu: "ngiyabonga" },\n';

  if (/    valeu:\s*\{/.test(next)) {
    next = next.replace(/    valeu:\s*\{[\s\S]*?\},\r?\n/, valeuLine);
    console.log('Glossário: valeu (alteração automática)');
  }

  if (!next.includes('"eu amo a vida":')) {
    next = next.replace(/(    valeu:\s*\{[\s\S]*?\},\r?\n)/, '$1' + main + aliases.join(''));
    console.log('Glossário: eu amo a vida + aliases');
  } else {
    next = next.replace(/    "eu amo a vida":\s*\{[\s\S]*?\},\r?\n/, main);
    console.log('Glossário: eu amo a vida actualizado');
  }
  return next;
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const draft = buildEuAmoAVidaPost();
  draft.seriesOrder = nextFreeSeriesOrder(posts, draft.seriesOrder, draft.slug);
  draft.filename = 'posts/post-' + draft.slug + '.html';
  draft.url = '/posts/post-' + draft.slug + '.html';

  upsertPost(posts, draft);

  const valeuExisting = posts.find((p) => p.slug === 'inspecao-palavra-valeu');
  const valeuOrder = valeuExisting ? Number(valeuExisting.seriesOrder) || 89 : 89;
  const valeu = buildValeuPost(valeuOrder);
  upsertPost(posts, valeu);

  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, draft);
  writeI18n(i18n, valeu);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + draft.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-eu-amo-a-vida';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'eu amo a vida — alteração automática de Valeu !!!',
      titleEn: 'eu amo a vida — automatic alteration of Valeu !!!',
      titleEs: 'eu amo a vida — alteración automática de Valeu !!!',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: eu amo a vida — alteração automática de Valeu !!!; o render cola sozinho; ≠ cartaz ≠ trilha /vida/.',
      whyEn: 'Sayings: eu amo a vida — automatic alteration of Valeu !!!; renderer glues it; ≠ slogan ≠ Vida trail.',
      whyEs: 'Dichos: eu amo a vida — alteración automática de Valeu !!!; el render la pega; ≠ cartel ≠ trama /vida/.',
      suggestedSlug: draft.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-palavra-valeu.html',
        '/posts/post-inspecao-palavra-vida.html',
        'https://pt.wiktionary.org/wiki/amar'
      ],
      notes: 'Cap. ' + draft.seriesOrder + ' — alteração automática via lib/fecho-oficio.js.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-eu-amo-a-vida)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'eu-amo-a-vida',
      word: 'eu amo a vida',
      simple:
        'Alteração automática de Valeu !!! — amar + vida em primeira pessoa; o render cola sozinho; ≠ cartaz ≠ trilha /vida/.',
      simpleEn:
        'Automatic alteration of Valeu !!! — I love life; the renderer glues it; ≠ slogan ≠ Vida trail.',
      simpleEs:
        'Alteración automática de Valeu !!! — amo la vida; el render la pega; ≠ cartel ≠ trama /vida/.',
      history:
        'Pedido de campo 2026-08-23: eu amo a vida como alteração de Valeu !!!. Completamente automática: um sítio (fecho-oficio.js) cola a frase em cada ligação Valeu !!! no HTML.',
      curiosities:
        'Não apaga Valeu !!! (o lema fica no texto-fonte). Não é a ficha da palavra vida nem a trilha /vida/. O eu é a peça nova.',
      historyEn:
        'Field request 2026-08-23: eu amo a vida as an alteration of Valeu !!!. Fully automatic: one place (fecho-oficio.js) glues the phrase onto every Valeu !!! link in HTML.',
      curiositiesEn:
        'Does not erase Valeu !!! (the lemma stays in source). Not the word-vida sheet or the /vida/ trail. The I is the new piece.',
      historyEs:
        'Pedido de campo 2026-08-23: eu amo a vida como alteración de Valeu !!!. Completamente automática: un sitio (fecho-oficio.js) pega la frase a cada enlace Valeu !!! en el HTML.',
      curiositiesEs:
        'No borra Valeu !!! (el lema queda en el texto fuente). No es la ficha de la palabra vida ni la trama /vida/. El yo es la pieza nueva.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'eu amo a vida');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'valeu');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (eu amo a vida)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    gloss = insertGlossary(gloss);
    fs.writeFileSync(glossPath, gloss);
  }

  try {
    await syncSql(draft);
    await syncSql(valeu);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', draft.title, '| Cap.', draft.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
