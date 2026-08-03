'use strict';

/**
 * Injeta expressão «ausdhuashduas» (riso online / kkkk…).
 * Uso: node scripts/upsert-expressao-ausdhuashduas.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildAusdhuashduasPost
} = require('../lib/ausdhuashduas-inspecao-post.js');

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
  const href = '/posts/post-inspecao-expressao-ausdhuashduas.html';
  const main =
    '    ausdhuashduas: { tone: "joy", category: "Riso", mundane: "Onomatopeia BR de riso tipado (lab); substitui kkkk… e «risas online».", gloss: "Nome lab do riso online — caos de teclado; contraste com aff; depois Faça o melhor!", href: "' +
    href +
    '", en: "typed lol / hahaha (BR chaos)", es: "jajaja tipado (caos BR)", fr: "mdr / haha (chaos BR)", it: "ahahah tipizzato", de: "getipptes Lachen", el: "χαχαχα", la: "risus scriptus", yo: "ẹ̀rín kọ̀mpútà", sw: "kicheko cha chati", gez: "śəḥəq", nl: "getypt gelach", pl: "pisany śmiech", ru: "смех в чате", uk: "сміх у чаті", zh: "键盘笑声", ja: "打ち笑い", ko: "타자 웃음", ar: "ضحكة مكتوبة", he: "צחוק מוקלד", hi: "टाइप हँसी", tr: "yazılı kahkaha", sv: "skrivet skratt", da: "skrevet latter", no: "skrevet latter", fi: "kirjoitettu nauru", cs: "psaný smích", ro: "râs tastat", hu: "gépelő nevetés", ca: "riure escrit", gl: "risa tipada", eu: "idatzizko barre", gn: "puka haihái", qu: "asitay qillqa", eo: "tajpita rido", vi: "cười gõ phím", id: "tawa ketik", th: "หัวเราะพิมพ์", hr: "tipkani smijeh", sk: "písaný smiech", ga: "gáire clóscríofa", cy: "chwerthin teipio", ha: "dariya rubutu", am: "የታይፕ ሳቅ", fa: "خنده تایپی", bn: "টাইপ হাসি", zu: "uhleko olubhaliwe" },\n';
  const aliases = [
    '    aushduashduash: { gloss: "Variante de ausdhuashduas — riso tipado BR; ver ficha.", href: "' +
      href +
      '", en: "typed lol (variant)", es: "jajaja tipado (variante)" },\n',
    '    kkkk: { gloss: "Rótulo comum BR de riso no chat — redireccionado para ausdhuashduas.", href: "' +
      href +
      '", en: "lol / haha (BR kkkk)", es: "jajaja (BR kkkk)" },\n',
    '    kkkkkkkkkkkkkk: { gloss: "Cadeia longa de k — riso tipado; ver ausdhuashduas.", href: "' +
      href +
      '", en: "lololol (BR)", es: "jajajaja (BR)" },\n',
    '    "risas online": { gloss: "Etiqueta plana substituída pela forma lab ausdhuashduas.", href: "' +
      href +
      '", en: "online laughs (plain label)", es: "risas online (etiqueta plana)" },\n'
  ];

  let next = gloss;
  if (!next.includes('ausdhuashduas: {')) {
    const anchors = [
      /("deu certo, galera": \{[\s\S]*?zu: "[^"]+" },\r?\n)/,
      /(meudeusdoceu: \{[\s\S]*?zu: "Nkulunkulu wami" },\r?\n)/,
      /(jesusamando: \{[\s\S]*?zu: "Nkosi yami" },\r?\n)/
    ];
    let inserted = false;
    for (const re of anchors) {
      if (re.test(next)) {
        next = next.replace(re, '$1' + main + aliases.join(''));
        inserted = true;
        console.log('Glossário actualizado (ausdhuashduas + aliases)');
        break;
      }
    }
    if (!inserted) console.warn('Aviso: glossário — ponto de inserção não encontrado');
  } else {
    console.log('Glossário já tinha ausdhuashduas');
  }
  return next;
}

async function main() {
  const post = buildAusdhuashduasPost();
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
    const sugId = 'expressao-ausdhuashduas';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'ausdhuashduas — riso online e oralidade BR',
      titleEn: 'ausdhuashduas — online laughter and Brazilian orality',
      titleEs: 'ausdhuashduas — risa online y oralidad BR',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: nome lab do riso tipado; substitui kkkk… e «risas online»; elos jesusamando, meudeusdoceu, aff.',
      whyEn: 'Sayings: lab name for typed laughter; replaces kkkk… and “online laughs”; links jesusamando, meudeusdoceu, aff.',
      whyEs: 'Dichos: nombre lab de la risa tipada; sustituye kkkk… y «risas online»; vínculos jesusamando, meudeusdoceu, aff.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-jesusamando.html',
        '/posts/post-inspecao-expressao-meudeusdoceu.html',
        '/posts/post-inspecao-palavra-aff.html',
        '/posts/post-inspecao-palavra-lingua-portuguesa.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. 6 Expressões — riso tipado / kkkk → ausdhuashduas.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-ausdhuashduas)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'ausdhuashduas',
      word: 'ausdhuashduas',
      simple:
        'Expressão oral BR — nome lab do riso tipado (substitui kkkk… e «risas online»); contraste com aff; depois Faça o melhor!',
      simpleEn:
        'Brazilian oral saying — lab name for typed laughter (replaces kkkk… / online laughs); contrast with aff; then Do your best!',
      simpleEs:
        'Expresión oral BR — nombre lab de la risa tipada (sustituye kkkk… y «risas online»); contraste con aff; luego ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'deu-certo-galera' ||
          x.id === 'meudeusdoceu' ||
          x.id === 'jesusamando' ||
          x.id === 'aff'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (ausdhuashduas)');
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
