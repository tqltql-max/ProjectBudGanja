'use strict';

/**
 * Injeta figura Lucas Evangelista — médico de homens e de almas.
 * Uso: node scripts/upsert-figura-lucas-evangelista.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildLucasEvangelistaPost
} = require('../lib/lucas-evangelista-inspecao-post.js');
const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');

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

function writeHtml(post) {
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
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
  console.warn('Aviso: glossário — inserção falhou para', afterKey);
}

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(
    process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL
  );
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  try {
    execFileSync(
      process.execPath,
      [path.join(__dirname, 'generate-lucas-evangelista-cover.js')],
      { cwd: ROOT, stdio: 'inherit', timeout: 60000 }
    );
  } catch (e) {
    console.warn('Aviso capa', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find(
    (p) => p.slug === 'inspecao-figura-lucas-evangelista'
  );
  const order = existing
    ? Number(existing.seriesOrder) || nextOrder(posts, 'pessoas-historia')
    : nextOrder(posts, 'pessoas-historia');
  const post = buildLucasEvangelistaPost(order);
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  writeHtml(post);

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'figura-lucas-evangelista';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Lucas — médico de homens e de almas',
      titleEn: 'Luke — physician of men and of souls',
      titleEs: 'Lucas — médico de hombres y de almas',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas: Lucas Evangelista; médico amado (Col 4,14) × «de almas» (tradição); fora dos Doze; corpo e alma sem partir o templo; Faça o melhor!',
      whyEn:
        'People: Luke the Evangelist; beloved physician (Col 4:14) × “of souls” (tradition); not of the Twelve; body and soul without splitting the temple; Do your best!',
      whyEs:
        'Personas: Lucas el Evangelista; médico amado (Col 4,14) × «de almas» (tradición); fuera de los Doce; cuerpo y alma sin partir el templo; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'pessoas-historia',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-expressao-os-doze-apostolos.html',
        '/posts/post-inspecao-expressao-templo-de-cristo-corpo-e-alma.html',
        '/posts/post-inspecao-palavra-alma.html',
        '/posts/post-inspecao-padre-ticao.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' Pessoas — Lucas ≠ Doze; «de almas» não é versículo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (figura-lucas-evangelista)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'lucas-evangelista',
      word: 'Lucas, médico de homens e de almas',
      simple:
        'Pessoa — Lucas Evangelista; médico amado (Col 4,14) e epíteto «de almas» (tradição); não é um dos Doze; corpo e alma sem partir o templo; Faça o melhor!',
      simpleEn:
        'Person — Luke the Evangelist; beloved physician (Col 4:14) and “of souls” epithet (tradition); not one of the Twelve; body and soul without splitting the temple; Do your best!',
      simpleEs:
        'Persona — Lucas el Evangelista; médico amado (Col 4,14) y epíteto «de almas» (tradición); no es uno de los Doce; cuerpo y alma sin partir el templo; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Lucas (gr. Loukâs) é o companheiro de Paulo a quem Colossenses 4,14 chama «o médico amado». A tradição atribui-lhe o Evangelho segundo Lucas e os Atos dos Apóstolos. O epíteto «médico de homens e de almas» costura o ofício textual com a piedade: tratar o corpo sem abandonar a alma. Não é um dos Doze.',
      curiosities:
        'O pedido chegou «lucas medico de homens e de almas» (sem acento em médico). A ficha honra o pedido e ancora São Lucas / Lucas Evangelista. O boi alado é símbolo iconográfico, não mascote do lab.',
      historyEn:
        'Luke (Gk. Loukâs) is Paul’s companion whom Colossians 4:14 calls “the beloved physician.” Tradition attributes to him the Gospel of Luke and Acts. The epithet “physician of men and of souls” stitches the textual craft to piety: treat the body without abandoning the soul. He is not one of the Twelve.',
      curiositiesEn:
        'The request arrived as “lucas medico de homens e de almas” (unaccented médico). The sheet honors the request and anchors Saint Luke / Luke the Evangelist. The winged ox is iconography, not a lab mascot.',
      historyEs:
        'Lucas (gr. Loukâs) es el compañero de Pablo a quien Colosenses 4,14 llama «el médico amado». La tradición le atribuye el Evangelio según Lucas y los Hechos. El epíteto «médico de hombres y de almas» cose el oficio textual con la piedad: tratar el cuerpo sin abandonar el alma. No es uno de los Doce.',
      curiositiesEs:
        'El pedido llegó como «lucas medico de homens e de almas» (médico sin acento). La ficha honra el pedido y ancla San Lucas / Lucas el Evangelista. El buey alado es iconografía, no mascota del lab.'
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'os-doze-apostolos' ||
          x.id === 'templo-de-cristo-corpo-e-alma'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Lucas Evangelista)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  const glossLine =
    '    "lucas evangelista": { tone: "warm", category: "Cuidado", mundane: "Lucas o Evangelista — médico amado (Col 4,14) e epíteto de almas (tradição).", gloss: "Não é um dos Doze; corpo × alma sem partir o templo; ficha ≠ catecismo; depois Faça o melhor!", href: "/posts/post-inspecao-figura-lucas-evangelista.html", en: "Luke the Evangelist", es: "Lucas el Evangelista", fr: "Luc l\'évangéliste", it: "Luca evangelista", de: "Lukas der Evangelist", el: "Λουκάς ο Ευαγγελιστής", la: "Lucas evangelista", yo: "Luku Onihinhin", sw: "Luka Mwinjilisti", gez: "Luqas Wangelawi", nl: "Lucas de evangelist", pl: "Łukasz Ewangelista", ru: "евангелист Лука", uk: "євангеліст Лука", zh: "福音书作者路加", ja: "福音記者ルカ", ko: "복음사가 루카", ar: "لوقا الإنجيلي", he: "לוקאס המבשר", hi: "लूका सुसमाचार लेखक", tr: "Müjdeci Luka", sv: "evangelisten Lukas", da: "evangelisten Lukas", no: "evangelisten Lukas", fi: "evankelista Luukas", cs: "evangelista Lukáš", ro: "evanghelistul Luca", hu: "Lukács evangélista", ca: "Lluc evangelista", gl: "Lucas evanxelista", eu: "Lukas ebanjelaria", gn: "Lucas marandu porã", qu: "Lucas willaq", eo: "Luko la evangeliisto", vi: "Luca thánh sử", id: "Lukas penginjil", th: "ลูกาผู้นิพนธ์พระวรสาร", hr: "evanđelist Luka", sk: "evanjelista Lukáš", ga: "Lúcás an Soiscéalaí", cy: "Luc yr Efengylydd", ha: "Luka mai bishara", am: "ሉቃስ ወንጌላዊ", fa: "لوقا انجیل‌نویس", bn: "লুক সুসমাচার রচয়িতা", zu: "uLuka umvangeli" },';
  upsertGloss(
    glossPath,
    '    "lucas evangelista":\\s*\\{[\\s\\S]*?\\},',
    glossLine,
    '"os doze apóstolos"'
  );

  const aliases = [
    [
      '    lucas: { gloss: "Também nome próprio; nesta ficha: Lucas Evangelista — médico de homens e de almas; ≠ um dos Doze.", href: "/posts/post-inspecao-figura-lucas-evangelista.html", en: "Luke (Evangelist)", es: "Lucas (evangelista)" },',
      '    lucas:\\s*\\{[\\s\\S]*?\\},'
    ],
    [
      '    "são lucas": { gloss: "Culto / fala BR — ver Lucas Evangelista.", href: "/posts/post-inspecao-figura-lucas-evangelista.html", en: "Saint Luke", es: "San Lucas" },',
      '    "são lucas":\\s*\\{[\\s\\S]*?\\},'
    ],
    [
      '    "sao lucas": { gloss: "Sem acento — ver São Lucas / Lucas Evangelista.", href: "/posts/post-inspecao-figura-lucas-evangelista.html", en: "Saint Luke (unaccented)", es: "San Lucas (sin acento)" },',
      '    "sao lucas":\\s*\\{[\\s\\S]*?\\},'
    ],
    [
      '    "médico de homens e de almas": { gloss: "Epíteto de Lucas: médico (Col 4,14) × de almas (tradição); corpo e alma sem partir o templo.", href: "/posts/post-inspecao-figura-lucas-evangelista.html", en: "physician of men and of souls", es: "médico de hombres y de almas" },',
      '    "médico de homens e de almas":\\s*\\{[\\s\\S]*?\\},'
    ],
    [
      '    "medico de homens e de almas": { gloss: "Pedido / sem acento — ver médico de homens e de almas / Lucas Evangelista.", href: "/posts/post-inspecao-figura-lucas-evangelista.html", en: "see physician of men and of souls", es: "ver médico de hombres y de almas" },',
      '    "medico de homens e de almas":\\s*\\{[\\s\\S]*?\\},'
    ],
    [
      '    "médico amado": { gloss: "Col 4,14 — Lucas, o médico amado; ver Lucas Evangelista.", href: "/posts/post-inspecao-figura-lucas-evangelista.html", en: "beloved physician", es: "médico amado" },',
      '    "médico amado":\\s*\\{[\\s\\S]*?\\},'
    ]
  ];
  for (const [line, pat] of aliases) {
    upsertGloss(glossPath, pat, line, '"lucas evangelista"');
  }

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
