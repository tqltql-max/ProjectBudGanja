'use strict';

/**
 * Injeta expressão «nossa senhora, ambulância, sirene, Jesus Cristo».
 * Uso: node scripts/upsert-expressao-nossa-senhora-ambulancia.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildNossaSenhoraAmbulanciaPost
} = require('../lib/nossa-senhora-ambulancia-inspecao-post.js');

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
    (p) => p.slug === 'inspecao-expressao-nossa-senhora-ambulancia-sirene-jesus-cristo'
  );
  const order = existing
    ? Number(existing.seriesOrder) || nextOrder(posts, 'expressoes-ditados')
    : nextOrder(posts, 'expressoes-ditados');
  const post = buildNossaSenhoraAmbulanciaPost(order);
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-nossa-senhora-ambulancia';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'nossa senhora, ambulância, sirene, Jesus Cristo — código vermelho oral',
      titleEn: 'nossa senhora, ambulance, siren, Jesus Christ — oral code red',
      titleEs: 'nossa senhora, ambulancia, sirena, Jesucristo — código rojo oral',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: empilhamento céu+SAMU+sirene+Jesus Cristo; escala acima de jesusudavi; Valeu !!!',
      whyEn: 'Sayings: heaven+SAMU+siren+Jesus Christ stack; above jesusudavi; Valeu !!!',
      whyEs: 'Dichos: apilamiento cielo+SAMU+sirena+Jesucristo; sobre jesusudavi; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-jesusudavi.html',
        '/posts/post-inspecao-expressao-puta-que-pariu.html',
        '/posts/post-inspecao-palavra-medo.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' Expressões — código vermelho oral BR.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-nossa-senhora-ambulancia)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'nossa-senhora-ambulancia-sirene-jesus-cristo',
      word: 'nossa senhora, ambulância, sirene, Jesus Cristo',
      simple:
        'Expressão oral BR — empilhamento céu+SAMU+sirene; código vermelho cómico; escala acima de jesusudavi; Valeu !!!',
      simpleEn:
        'Brazilian oral saying — heaven+SAMU+siren stack; comic code red; above jesusudavi; Valeu !!!',
      simpleEs:
        'Expresión oral BR — apilamiento cielo+SAMU+sirena; código rojo cómico; sobre jesusudavi; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'A locução empilha Nossa Senhora, ambulância, sirene e Jesus Cristo: invocação mariana mais SAMU mais o uivo mais o segundo nome sagrado. Nasceu na oralidade BR como inflação cómica do espanto — chamar o céu e a viatura no mesmo fôlego.',
      curiosities:
        'O núcleo curto «nossa senhora ambulância» já basta para o ofício; as quatro peças são o código vermelho completo. A ficha não é protocolo 192 nem catecismo.',
      historyEn:
        'The saying stacks Our Lady, ambulance, siren and Jesus Christ: a Marian cry plus SAMU plus the wail plus a second sacred name. It grew in Brazilian speech as comic inflation of shock — calling heaven and the van in one breath.',
      curiositiesEn:
        'The short core “nossa senhora ambulância” already does the office; the four pieces are full code red. The sheet is neither a 192 protocol nor a catechism.',
      historyEs:
        'La locución apila Nuestra Señora, ambulancia, sirena y Jesucristo: invocación mariana más SAMU más el aullido más el segundo nombre sagrado. Nació en la oralidad BR como inflación cómica del asombro — llamar al cielo y a la unidad en el mismo soplo.',
      curiositiesEs:
        'El núcleo corto «nossa senhora ambulância» ya basta para el oficio; las cuatro piezas son el código rojo completo. La ficha no es protocolo 192 ni catecismo.'
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'jesusudavi' || x.id === 'nojinho');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (nossa senhora ambulância)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  const glossLine =
    '    "nossa senhora, ambulância, sirene, jesus cristo": { tone: "awe", category: "Código vermelho", mundane: "Empilhamento oral BR — céu + SAMU + sirene + Jesus Cristo.", gloss: "Código vermelho cómico — acima de jesusudavi; frase ≠ emergência real; depois Valeu !!!", href: "/posts/post-inspecao-expressao-nossa-senhora-ambulancia-sirene-jesus-cristo.html", en: "Our Lady, ambulance, siren, Jesus Christ", es: "Nuestra Señora, ambulancia, sirena, Jesucristo", fr: "Notre-Dame, ambulance, sirène, Jésus-Christ", it: "Madonna, ambulanza, sirena, Gesù Cristo", de: "Unsere Liebe Frau, Krankenwagen, Sirene, Jesus Christus", el: "Panagia, asthenoforo, seirina, Iisous Christos", la: "Domina nostra, raeda aegrotorum, siren, Iesus Christus", yo: "Iya Wa, oko ailera, ohun keke, Jesu Kristi", sw: "Bikira Maria, gari la wagonjwa, kengele, Yesu Kristo", gez: "Egziabeher", nl: "Onze-Lieve-Vrouw, ambulance, sirene, Jezus Christus", pl: "Matka Boska, karetka, syrena, Jezus Chrystus", ru: "Bogoroditsa, skoraya, sirena, Iisus Khristos", uk: "Bohorodytsia, shvydka, syrena, Isus Khrystos", zh: "圣母 救护车 警笛 耶稣", ja: "聖母と救急車", ko: "성모님 구급차 사이렌", ar: "sayyidatuna isaf saffara al-masih", he: "gvirti ambulans sireina yeshu", hi: "mata maria ambulance", tr: "Meryem Ana ambulans siren", sv: "var Fru ambulans siren", da: "vor Frue ambulance sirene", no: "vår Frue ambulanse sirene", fi: "Neitsyt Maria ambulanssi sireeni", cs: "Panna Maria sanitka sirena", ro: "Maica Domnului ambulanta sirena", hu: "Szuz Maria menteso szirena", ca: "Mare de Deu ambulancia sirena", gl: "Nosa Señora ambulancia sirena", eu: "Andre Maria anbulantzia", gn: "Ñandejára sy ambulancia", qu: "Mamanchik ambulancia", eo: "nia Sinjorino ambulan co sireno", vi: "Duc Me xe cuu thuong coi", id: "Bunda Maria ambulans sirene", th: "พระแม่มารี รถพยาบาล", hr: "Gospa hitna sirena", sk: "Panna Maria sanitka", ga: "ar mBantiarna otharcharr", cy: "ein Harglwyddes ambiwlans", ha: "Uwar mu motar asibiti", am: "እመቤታችን አምቡላንስ", fa: "hazrat maryam ambulans", bn: "আমাদের লেডি অ্যাম্বুলেন্স", zu: "iNkosikazi yethu i-ambulensi" },';
  upsertGloss(
    glossPath,
    '    "nossa senhora, ambulância, sirene, jesus cristo":\\s*\\{[\\s\\S]*?\\},',
    glossLine,
    'jesusudavi'
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
