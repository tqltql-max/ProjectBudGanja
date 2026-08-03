'use strict';

/**
 * Injeta expressão «duasakdiqujdocedomadur» (Deus ajuda quem cedo madruga).
 * Uso: node scripts/upsert-expressao-duasakdiqujdocedomadur.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildDuasakdiqujdocedomadurPost
} = require('../lib/duasakdiqujdocedomadur-inspecao-post.js');

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
  const href = '/posts/post-inspecao-expressao-duasakdiqujdocedomadur.html';
  const main =
    '    duasakdiqujdocedomadur: { tone: "hope", category: "Diligência", mundane: "Nome lab do ditado «Deus ajuda quem cedo madruga» (caos tipado).", gloss: "Ditado de aurora e gesto — diligência cedo; depois Faça o melhor!", href: "' +
    href +
    '", en: "God helps those who rise early", es: "Dios ayuda a quien madruga", fr: "aide à qui se lève tôt", it: "aiuta chi si alza presto", de: "hilft dem Frühaufsteher", el: "βοηθά όποιον ξυπνά νωρίς", la: "Deus adiuvat mane surgentem", yo: "Ọlọ́run ń ràn ẹni tí ó jí ní kùtùkùtù lọ́wọ́", sw: "Mungu husaidia anayeamka mapema", gez: "ʼƎgziʼabəḥer yärädadä", nl: "helpt wie vroeg opstaat", pl: "pomaga wczesnym ptakom", ru: "помогает рано встающим", uk: "помагає тим, хто рано встає", zh: "天助早起者", ja: "早起きは三文の徳", ko: "일찍 일어나는 자를 돕는다", ar: "يعين من يبكر", he: "עוזר למי שמשכים", hi: "सवेरे उठने वाले की मदद", tr: "erken kalkanı yardım eder", sv: "hjälper den som stiger tidigt", da: "hjælper den der står tidligt op", no: "hjelper den som står tidlig opp", fi: "auttaa varhain heräävää", cs: "pomáhá raním ptáčatům", ro: "ajută pe cine se scoală devreme", hu: "segít a korán kelőnek", ca: "ajuda qui matina", gl: "axuda a quen madruga", eu: "goiz jaikitzen denari laguntzen dio", gn: "Tupã oipytyvõ koépe oñemoñepyrũvape", qu: "Tayta yanapan paqarin hatariqta", eo: "helpas fruan leviĝanton", vi: "giúp kẻ dậy sớm", id: "menolong yang bangun pagi", th: "ช่วยผู้ที่ตื่นเช้า", hr: "pomaže ranoraniocima", sk: "pomáha skorým vtáčikom", ga: "cuidíonn leis an té a éiríonn go moch", cy: "helpu\'r rhai sy\'n codi\'n gynnar", ha: "Allah yana taimakon wanda ya tashi da wuri", am: "ለማለዳ ተነሺ ይረዳል", fa: "به سحرخیز کمک می‌کند", bn: "ভোরে ওঠাদের সাহায্য", zu: "usize abavuka ekuseni" },\n';
  const aliases = [
    '    "Deus ajuda quem cedo madruga": { gloss: "Ditado canónico — ver duasakdiqujdocedomadur.", href: "' +
      href +
      '", en: "God helps those who rise early", es: "Dios ayuda a quien madruga" },\n',
    '    deusajudaquemcedomadruga: { gloss: "Forma colada do ditado — ver duasakdiqujdocedomadur.", href: "' +
      href +
      '", en: "proverb glued form", es: "dicho pegado" },\n',
    '    "cedo madruga": { gloss: "Núcleo do ditado Deus ajuda quem cedo madruga — ver ficha.", href: "' +
      href +
      '", en: "rise early (proverb core)", es: "madrugar (núcleo del dicho)" },\n'
  ];

  let next = gloss;
  if (!next.includes('duasakdiqujdocedomadur: {')) {
    const anchors = [
      /(ausdhuashduas: \{[\s\S]*?zu: "[^"]+" },\r?\n)/,
      /("deu certo, galera": \{[\s\S]*?zu: "[^"]+" },\r?\n)/,
      /(meudeusdoceu: \{[\s\S]*?zu: "Nkulunkulu wami" },\r?\n)/
    ];
    let inserted = false;
    for (const re of anchors) {
      if (re.test(next)) {
        next = next.replace(re, '$1' + main + aliases.join(''));
        inserted = true;
        console.log('Glossário actualizado (duasakdiqujdocedomadur + aliases)');
        break;
      }
    }
    if (!inserted) console.warn('Aviso: glossário — ponto de inserção não encontrado');
  } else {
    console.log('Glossário já tinha duasakdiqujdocedomadur');
  }
  return next;
}

async function main() {
  const post = buildDuasakdiqujdocedomadurPost();
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
    const sugId = 'expressao-duasakdiqujdocedomadur';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'duasakdiqujdocedomadur — Deus ajuda quem cedo madruga',
      titleEn: 'duasakdiqujdocedomadur — God helps those who rise early',
      titleEs: 'duasakdiqujdocedomadur — Dios ayuda a quien madruga',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: nome lab do ditado «Deus ajuda quem cedo madruga»; diligência com aurora; elos Faça o melhor!, caminho, jesusamando.',
      whyEn: 'Sayings: lab name for “Deus ajuda quem cedo madruga”; dawn diligence; links Do your best!, caminho, jesusamando.',
      whyEs: 'Dichos: nombre lab de «Deus ajuda quem cedo madruga»; diligencia del alba; vínculos ¡Haz lo mejor!, caminho, jesusamando.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-faca-o-melhor.html',
        '/posts/post-inspecao-palavra-caminho.html',
        '/posts/post-inspecao-expressao-jesusamando.html',
        '/posts/post-inspecao-expressao-meudeusdoceu.html',
        '/posts/post-inspecao-palavra-lingua-portuguesa.html'
      ],
      notes: 'Cap. 6 Expressões — ditado Deus ajuda quem cedo madruga → duasakdiqujdocedomadur.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-duasakdiqujdocedomadur)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'duasakdiqujdocedomadur',
      word: 'duasakdiqujdocedomadur',
      simple:
        'Expressão / ditado BR — nome lab de «Deus ajuda quem cedo madruga»; diligência com aurora; depois Faça o melhor!',
      simpleEn:
        'Brazilian proverb — lab name for “Deus ajuda quem cedo madruga”; dawn diligence; then Do your best!',
      simpleEs:
        'Dicho BR — nombre lab de «Deus ajuda quem cedo madruga»; diligencia del alba; luego ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'ausdhuashduas' ||
          x.id === 'deu-certo-galera' ||
          x.id === 'meudeusdoceu' ||
          x.id === 'jesusamando'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (duasakdiqujdocedomadur)');
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
