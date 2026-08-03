'use strict';

/**
 * Injeta expressão «muitoobrigado» (muito obrigado).
 * Uso: node scripts/upsert-expressao-muito-obrigado.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildMuitoObrigadoPost
} = require('../lib/muito-obrigado-inspecao-post.js');

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
  const href = '/posts/post-inspecao-expressao-muito-obrigado.html';
  const main =
    '    muitoobrigado: { tone: "warm", category: "Gratidão", mundane: "Fórmula BR de gratidão reforçada (muito obrigado, colado).", gloss: "Termómetro de crédito afectivo — contraste com aff; elos gesto e jesusamando; depois Faça o melhor!", href: "' +
    href +
    '", en: "thank you very much", es: "muchas gracias", fr: "merci beaucoup", it: "grazie mille", de: "vielen Dank", el: "ευχαριστώ πολύ", la: "gratias maximas", yo: "o ṣeun gan", sw: "asante sana", gez: "ameseginalehu", nl: "heel erg bedankt", pl: "bardzo dziękuję", ru: "большое спасибо", uk: "дуже дякую", zh: "非常感谢", ja: "どうもありがとう", ko: "정말 감사합니다", ar: "شكرا جزيلا", he: "תודה רבה", hi: "बहुत धन्यवाद", tr: "çok teşekkürler", sv: "tack så mycket", da: "mange tak", no: "tusen takk", fi: "kiitos paljon", cs: "moc děkuji", ro: "mulțumesc mult", hu: "nagyon köszönöm", ca: "moltes gràcies", gl: "moitas grazas", eu: "eskerrik asko", gn: "aguayjevete", qu: "añay", eo: "dankegon", vi: "cảm ơn nhiều", id: "terima kasih banyak", th: "ขอบคุณมาก", hr: "puno hvala", sk: "ďakujem pekne", ga: "go raibh míle maith agat", cy: "diolch yn fawr", ha: "na gode sosai", am: "አመሰግናለሁ", fa: "خیلی ممنون", bn: "অনেক ধন্যবাদ", zu: "ngiyabonga kakhulu" },\n';
  const aliases = [
    '    "muito obrigado": { gloss: "Forma separada — ver muitoobrigado.", href: "' +
      href +
      '", en: "thank you very much", es: "muchas gracias" },\n',
    '    obrigado: { gloss: "Forma curta de gratidão BR — ver muitoobrigado.", href: "' +
      href +
      '", en: "thank you", es: "gracias" },\n',
    '    obrigada: { gloss: "Forma curta (género) — ver muitoobrigado.", href: "' +
      href +
      '", en: "thank you (f)", es: "gracias (f)" },\n'
  ];

  let next = gloss;
  if (!next.includes('muitoobrigado: {')) {
    const anchors = [
      /(jesusamando: \{[\s\S]*?zu: "Nkosi yami" },\r?\n)/,
      /(meudeusdoceu: \{[\s\S]*?zu: "Nkulunkulu wami" },\r?\n)/,
      /(ausdhuashduas: \{[\s\S]*?zu: "uhleko olubhaliwe" },\r?\n)/
    ];
    let inserted = false;
    for (const re of anchors) {
      if (re.test(next)) {
        next = next.replace(re, '$1' + main + aliases.join(''));
        inserted = true;
        console.log('Glossário actualizado (muitoobrigado + aliases)');
        break;
      }
    }
    if (!inserted) console.warn('Aviso: glossário — ponto de inserção não encontrado');
  } else {
    console.log('Glossário já tinha muitoobrigado');
  }
  return next;
}

async function main() {
  const post = buildMuitoObrigadoPost();
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
    const sugId = 'expressao-muito-obrigado';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'muitoobrigado — gratidão reforçada e oralidade BR',
      titleEn: 'muitoobrigado — reinforced gratitude and Brazilian orality',
      titleEs: 'muitoobrigado — gratitud reforzada y oralidad BR',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: muito obrigado colado; gratidão reforçada; elos gesto, respeito, jesusamando; contraste aff.',
      whyEn: 'Sayings: muito obrigado as one word; reinforced gratitude; links gesture, respect, jesusamando; contrast aff.',
      whyEs: 'Dichos: muito obrigado pegado; gratitud reforzada; vínculos gesto, respeito, jesusamando; contraste aff.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-jesusamando.html',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-respeito.html',
        '/posts/post-inspecao-palavra-aff.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. 8 Expressões — gratidão reforçada / muito obrigado → muitoobrigado.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-muito-obrigado)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'muitoobrigado',
      word: 'muitoobrigado',
      simple:
        'Expressão oral BR — gratidão reforçada (muito obrigado colado); contraste com aff; elos gesto e jesusamando; depois Faça o melhor!',
      simpleEn:
        'Brazilian oral saying — reinforced gratitude (thank you very much as one word); contrast with aff; gesture + jesusamando; then Do your best!',
      simpleEs:
        'Expresión oral BR — gratitud reforzada (muchas gracias pegado); contraste con aff; gesto + jesusamando; luego ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'jesusamando' ||
          x.id === 'meudeusdoceu' ||
          x.id === 'ausdhuashduas' ||
          x.id === 'aff'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (muitoobrigado)');
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
