'use strict';

/**
 * Injeta expressão «Toda criança nasce cientista».
 * Uso: node scripts/upsert-expressao-toda-crianca-nasce-cientista.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildTodaCriancaNasceCientistaPost
} = require('../lib/toda-crianca-nasce-cientista-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextOrder(posts, series) {
  const orders = posts
    .filter((p) => p.series === series)
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

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

function upsertGloss(glossPath, keyPattern, entryLine, afterKey) {
  if (!fs.existsSync(glossPath)) return;
  let gloss = fs.readFileSync(glossPath, 'utf8');
  const reKey = new RegExp(keyPattern);
  if (reKey.test(gloss)) {
    gloss = gloss.replace(reKey, entryLine);
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (existente)');
    return;
  }
  const reAfter = new RegExp(
    '(    ' + afterKey + ':\\s*\\{[\\s\\S]*?zu:\\s*"[^"]*"\\s*\\},?\\r?\\n)'
  );
  if (reAfter.test(gloss)) {
    gloss = gloss.replace(reAfter, '$1' + entryLine + '\n');
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (após ' + afterKey + ')');
    return;
  }
  console.warn('Aviso: glossário — inserção falhou');
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find(
    (p) => p.slug === 'inspecao-expressao-toda-crianca-nasce-cientista'
  );
  const order = existing
    ? Number(existing.seriesOrder) || nextOrder(posts, 'expressoes-ditados')
    : nextOrder(posts, 'expressoes-ditados');
  const post = buildTodaCriancaNasceCientistaPost(order);
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-toda-crianca-nasce-cientista';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Toda criança nasce cientista — recado de campo e mensagem da mãe',
      titleEn: 'Every child is born a scientist — field note and a mother’s message',
      titleEs: 'Toda criança nasce cientista — recado de campo y mensaje de la madre',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: citação de Arleu (CNN / campo); chegou como mensagem da mãe; Faça o melhor!',
      whyEn: 'Sayings: Arleu quote (CNN / field); arrived as a mother’s message; Do your best!',
      whyEs: 'Dichos: cita de Arleu (CNN / campo); llegó como mensaje de la madre; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        'https://www.cnnbrasil.com.br/ciencia/cupins-criam-ar-condicionado-que-funciona-melhor-do-que-usados-por-humanos/',
        '/posts/post-inspecao-palavra-mae.html',
        '/posts/post-inspecao-palavra-mensagem.html',
        '/posts/post-inspecao-palavra-inseto.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' Expressões — mensagem da mãe; crédito Arleu / CNN.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-toda-crianca-nasce-cientista)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'toda-crianca-nasce-cientista',
      word: 'toda criança nasce cientista',
      simple:
        'Citação de campo — curiosidade nativa; o crescer às vezes cala; o campo devolve o método. Chegou como mensagem da mãe. Faça o melhor!',
      simpleEn:
        'Field quote — native curiosity; growing up sometimes silences it; the field returns the method. Arrived as a mother’s message. Do your best!',
      simpleEs:
        'Cita de campo — curiosidad nativa; crecer a veces calla; el campo devuelve el método. Llegó como mensaje de la madre. ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Frase de Arleu Barbosa Viana-Junior (UEPB), publicada pela CNN Brasil a propósito de trabalho de campo no Cerrado (predação). Entrou no laboratório como mensagem da mãe. Não fundir com a coluna de Marcelo Gleiser (Folha, 2013).',
      curiosities:
        'A fórmula «toda criança nasce cientista» circula; esta ficha ancora a versão que liga a perda da curiosidade ao voltar ao campo.',
      historyEn:
        'Line by Arleu Barbosa Viana-Junior (UEPB), published by CNN Brasil from Cerrado fieldwork (predation). Entered the lab as a mother’s message. Do not merge with Gleiser’s 2013 Folha column.',
      curiositiesEn:
        'The opening “every child is born a scientist” circulates; this sheet anchors the version that ties lost curiosity to returning to the field.',
      historyEs:
        'Frase de Arleu Barbosa Viana-Junior (UEPB), publicada por CNN Brasil sobre trabajo de campo en el Cerrado (depredación). Entró al laboratorio como mensaje de la madre. No fusionar con la columna de Gleiser (Folha, 2013).',
      curiositiesEs:
        'La fórmula circula; esta ficha ancla la versión que une la pérdida de curiosidad con volver al campo.'
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'mae' || x.id === 'mensagem');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (toda criança nasce cientista)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  const glossLine =
    '    "toda criança nasce cientista": { tone: "warm", category: "Campo", mundane: "Citação de campo — curiosidade nativa; o campo devolve o método.", gloss: "Arleu (CNN / Cerrado); chegou como mensagem da mãe; depois Faça o melhor!", href: "/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html", en: "every child is born a scientist", es: "todo niño nace científico", fr: "chaque enfant naît scientifique", it: "ogni bambino nasce scienziato", de: "jedes Kind wird als Wissenschaftler geboren", el: "κάθε παιδί γεννιέται επιστήμονας", la: "omnis infans nascitur scientiae studiosus", yo: "ọmọdé ni onímọ̀ sáyẹ́ǹsì", sw: "kila mtoto azaliwa mwanasayansi", gez: "ḥəṣan", nl: "elk kind wordt als wetenschapper geboren", pl: "kazde dziecko rodzi sie naukowcem", ru: "kazhdyi rebenok rozhdaetsia uchenym", uk: "kozhna dytyna narodzhuietsia vchenym", zh: "每个孩子生来都是科学家", ja: "子どもは科学者として生まれる", ko: "모든 아이는 과학자로 태어난다", ar: "كل طفل يولد عالما", he: "כל ילד נולד מדען", hi: "हर बच्चा वैज्ञानिक पैदा होता है", tr: "her çocuk bilim insanı olarak doğar", sv: "vart barn föds som vetenskapsman", da: "ethvert barn fødes som videnskabsmand", no: "hvert barn fødes som vitenskapsmann", fi: "jokainen lapsi syntyy tiedemieheksi", cs: "kazde dite se rodi vedcem", ro: "fiecare copil se naste om de stiinta", hu: "minden gyermek tudosnak szuletik", ca: "cada infant neix cientific", gl: "toda nena nace cientifica", eu: "haur bakoitza zientzialari jaiotzen da", gn: "mitã tuicháva científico", qu: "sapa wawa yachayniyuq nace", eo: "ciu infano naskigxas sciencisto", vi: "moi tre sinh ra la nha khoa hoc", id: "setiap anak lahir sebagai ilmuwan", th: "เด็กทุกคนเกิดมาเป็นนักวิทยาศาสตร์", hr: "svako dijete se rada kao znanstvenik", sk: "kazde dieta sa rodi ako vedec", ga: "saolaítear gach páiste ina eolaí", cy: "mae pob plentyn yn cael ei eni yn wyddonydd", ha: "kowane yaro an haife shi masanin kimiyya", am: "ሁሉም ልጅ ሳይንቲስት ሆኖ ይወለዳል", fa: "har kudak daneshmand be donya miayad", bn: "প্রতিটি শিশু বিজ্ঞানী হয়ে জন্মায়", zu: "zonke izingane zizalwa zingososayensi" },';
  upsertGloss(
    glossPath,
    '    "toda criança nasce cientista":\\s*\\{[\\s\\S]*?\\},',
    glossLine,
    'ciência'
  );

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
