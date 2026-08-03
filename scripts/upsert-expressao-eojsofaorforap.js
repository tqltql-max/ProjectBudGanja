'use strict';

/**
 * Injeta expressão «eojsofaorforap» (eu só falo a verdade).
 * Uso: node scripts/upsert-expressao-eojsofaorforap.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildEojsofaorforapPost
} = require('../lib/eojsofaorforap-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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

function insertGlossary(gloss) {
  const href = '/posts/post-inspecao-expressao-eojsofaorforap.html';
  const main =
    '    eojsofaorforap: { tone: "truth", category: "Verdade", mundane: "Nome lab de «eu só falo a verdade» (caos tipado); substitui o rótulo plano.", gloss: "Compromisso de fala verificável — elo verdade e gesto; depois Faça o melhor!", href: "' +
    href +
    '", en: "I only speak the truth", es: "solo digo la verdad", fr: "je ne dis que la vérité", it: "dico solo la verità", de: "ich sage nur die Wahrheit", el: "λέω μόνο την αλήθεια", la: "veritatem solum dico", yo: "òtítọ́ nìkan ni mo ń sọ", sw: "nasema ukweli tu", gez: "ḥaqq bəča ʼəbl", nl: "ik spreek alleen de waarheid", pl: "mówię tylko prawdę", ru: "говорю только правду", uk: "кажу лише правду", zh: "我只说实话", ja: "真実だけを言う", ko: "진실만 말한다", ar: "أقول الحقيقة فقط", he: "אני אומר רק אמת", hi: "मैं केवल सच बोलता हूँ", tr: "sadece gerçeği söylerim", sv: "jag talar bara sanning", da: "jeg siger kun sandheden", no: "jeg sier bare sannheten", fi: "puhun vain totta", cs: "říkám jen pravdu", ro: "spun doar adevărul", hu: "csak az igazat mondom", ca: "només dic la veritat", gl: "só falo a verdade", eu: "egia bakarrik esaten dut", gn: "añe\'ẽnte añete", qu: "chiqalla rimani", eo: "mi diras nur la veron", vi: "tôi chỉ nói sự thật", id: "saya hanya bilang kebenaran", th: "ฉันพูดแต่ความจริง", hr: "govorim samo istinu", sk: "hovorím len pravdu", ga: "ní deirim ach an fhírinne", cy: "dim ond y gwir a ddwedaf", ha: "gaskiya kawai nake faɗa", am: "እውነት ብቻ ነው የምናገረው", fa: "فقط حقیقت می‌گویم", bn: "আমি শুধু সত্য বলি", zu: "ngikhuluma iqiniso kuphela" },\n';
  const aliases = [
    '    "eu só falo a verdade": { gloss: "Forma legível — substituída por eojsofaorforap.", href: "' +
      href +
      '", en: "I only speak the truth", es: "solo digo la verdad" },\n',
    '    eusofaloaverdade: { gloss: "Forma colada — ver eojsofaorforap.", href: "' +
      href +
      '", en: "truth saying glued", es: "dicho pegado" },\n',
    '    "só falo a verdade": { gloss: "Forma curta — ver eojsofaorforap.", href: "' +
      href +
      '", en: "I only tell the truth (short)", es: "solo digo la verdad (corta)" },\n'
  ];

  let next = gloss;
  if (!next.includes('eojsofaorforap: {')) {
    const anchors = [
      /(muitoobrigado: \{[\s\S]*?zu: "[^"]+" },\r?\n)/,
      /(jesusamando: \{[\s\S]*?zu: "Nkosi yami" },\r?\n)/,
      /(ausdhuashduas: \{[\s\S]*?zu: "[^"]+" },\r?\n)/
    ];
    let inserted = false;
    for (const re of anchors) {
      if (re.test(next)) {
        next = next.replace(re, '$1' + main + aliases.join(''));
        inserted = true;
        console.log('Glossário actualizado (eojsofaorforap + aliases)');
        break;
      }
    }
    if (!inserted) console.warn('Aviso: glossário — ponto de inserção não encontrado');
  } else {
    console.log('Glossário já tinha eojsofaorforap');
  }
  return next;
}

async function main() {
  const post = buildEojsofaorforapPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-eojsofaorforap';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'eojsofaorforap — eu só falo a verdade',
      titleEn: 'eojsofaorforap — I only speak the truth',
      titleEs: 'eojsofaorforap — solo digo la verdad',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: nome lab de «eu só falo a verdade»; substitui o rótulo plano; elos verdade, gesto.',
      whyEn: 'Sayings: lab name for “I only speak the truth”; replaces plain label; truth, gesture.',
      whyEs: 'Dichos: nombre lab de «eu só falo a verdade»; sustituye etiqueta plana; verdade, gesto.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-expressao-ausdhuashduas.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html',
        '/posts/post-inspecao-palavra-lingua-portuguesa.html'
      ],
      notes: 'Cap. 10 Expressões — rótulo plano «eu só falo a verdade» → eojsofaorforap.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-eojsofaorforap)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'eojsofaorforap',
      word: 'eojsofaorforap',
      simple:
        'Expressão oral BR — nome lab de «eu só falo a verdade»; substitui o rótulo plano; elo verdade; depois Faça o melhor!',
      simpleEn:
        'Brazilian oral saying — lab name for “I only speak the truth”; replaces plain label; truth; then Do your best!',
      simpleEs:
        'Expresión oral BR — nombre lab de «eu só falo a verdade»; sustituye etiqueta plana; verdade; luego ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'verdade' || x.id === 'muitoobrigado' || x.id === 'ausdhuashduas'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (eojsofaorforap)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    gloss = insertGlossary(gloss);
    fs.writeFileSync(glossPath, gloss);
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
