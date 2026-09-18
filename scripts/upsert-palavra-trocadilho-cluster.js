'use strict';

/**
 * Injeta trocadilho, aglutinação e polimorfismo na série Palavras.
 * Uso: node scripts/upsert-palavra-trocadilho-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { buildTrocadilhoPost } = require('../lib/trocadilho-inspecao-post.js');
const { buildAglutinacaoPost } = require('../lib/aglutinacao-inspecao-post.js');
const { buildPolimorfismoPost } = require('../lib/polimorfismo-inspecao-post.js');

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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss, mainKey, mainLine, aliases, afterKey) {
  if (new RegExp(mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{').test(gloss)) {
    gloss = gloss.replace(
      new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
  } else {
    const inserted = insertAfterKey(gloss, afterKey, mainLine + aliases);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção falhou para', mainKey);
  }
  return gloss;
}

const LANGS =
  'fr: "calembour", it: "calembour", de: "Wortspiel", el: "λογοπαίγνιο", la: "allusio", yo: "ere oro", sw: "mchezo wa maneno", gez: "calembour", nl: "woordspeling", pl: "gra slow", ru: "каламбур", uk: "каламбур", zh: "双关", ja: "駄洒落", ko: "말장난", ar: "تورية", he: "משחק מילים", hi: "श्लेष", tr: "kelime oyunu", sv: "ordlek", da: "ordspil", no: "ordspill", fi: "sanaleikki", cs: "slovni hricka", ro: "calambur", hu: "szojatek", ca: "joc de paraules", gl: "xogo de palabras", eu: "hitz joko", gn: "ñe\'e ñembosarái", qu: "simi pukllay", eo: "vortludo", vi: "choi chu", id: "permainan kata", th: "เล่นคำ", hr: "igra rijeci", sk: "slovna hra", ga: "cluiche focal", cy: "chwarae geiriau", ha: "wasa kalmomi", am: "የቃላት ጨዋታ", fa: "جناس", bn: "শ্লেষ", zu: "umdlalo wamagama"';

const ITEMS = [
  {
    build: buildTrocadilhoPost,
    sugId: 'palavra-trocadilho',
    sugTitle: 'Trocadilho — cara+alho, e por que não é polimorfismo',
    sugTitleEn: 'Trocadilho — cara+alho, and why it is not polymorphism',
    sugTitleEs: 'Trocadilho — cara+alho, y por qué no es polimorfismo',
    why: 'Palavras: trocadilho (calembur) — cara+alho é jogo + etimologia popular, não polimorfismo nem palavra-valise; Faça o melhor!',
    guiaId: 'trocadilho',
    guiaWord: 'Trocadilho',
    guiaSimple:
      'Calembur — cara+alho é jogo de ouvido + etimologia popular, não polimorfismo nem origem da terceira forma; irmãs aglutinação e Tanzânia (valise); Faça o melhor no nome.',
    guiaHistory:
      'Trocadilho vem de trocar / esp. trocado: troca de peças sonoras. O calembur francês nomeia o mesmo ofício. Cara+alho é o exemplo BR clássico — leitura nova de uma forma já existente (baixo calão), não étimo.',
    guiaCuriosities:
      'O laboratório recusa chamar polimorfismo a esta solda: polimorfismo é muitas formas do mesmo; aqui duas peças revelam um terceiro vocábulo. Palavra-valise verdadeira neste site: Tanzânia (Tan+Zan+-ia, 1964).',
    guiaAfter: ['lingua-portuguesa', 'relacao', 'tanzania'],
    glossKey: 'trocadilho',
    glossAfter: 'português',
    glossMain:
      '    trocadilho: { tone: "craft", gloss: "Calembur — cara+alho é jogo + etimologia popular, não polimorfismo nem palavra-valise; Faça o melhor no nome.", href: "/posts/post-inspecao-palavra-trocadilho.html", en: "pun / play on words", es: "juego de palabras / calambur", ' +
      LANGS +
      ' },\n',
    glossAliases:
      '    calembur: { gloss: "Fr. calembour — o mesmo ofício que trocadilho; ver ficha.", href: "/posts/post-inspecao-palavra-trocadilho.html", en: "calembour", es: "calambur" },\n' +
      '    "cara alho": { gloss: "Jogo BR cara+alho — trocadilho + etimologia popular; ≠ polimorfismo ≠ aglutinação histórica.", href: "/posts/post-inspecao-palavra-trocadilho.html", en: "face + garlic pun", es: "cara + ajo" },\n' +
      '    "cara+alho": { gloss: "Mesmo jogo que cara alho — ver trocadilho.", href: "/posts/post-inspecao-palavra-trocadilho.html", en: "cara+alho pun", es: "cara+alho" },\n' +
      '    "palavra-valise": { gloss: "Portmanteau — mistura que cria vocábulo (ex. Tanzânia); ≠ trocadilho cara+alho.", href: "/posts/post-inspecao-palavra-trocadilho.html", en: "portmanteau", es: "palabra valija" },\n' +
      '    portmanteau: { gloss: "EN de palavra-valise — Tanzânia = Tan+Zan+-ia; ≠ cara+alho.", href: "/posts/post-inspecao-palavra-trocadilho.html", en: "portmanteau", es: "portmanteau" },\n' +
      '    paronomasia: { gloss: "Jogo de vocábulos parecidos — vizinho do trocadilho, não sinónimo fechado.", href: "/posts/post-inspecao-palavra-trocadilho.html", en: "paronomasia", es: "paronomasia" },\n'
  },
  {
    build: buildAglutinacaoPost,
    sugId: 'palavra-aglutinacao',
    sugTitle: 'Aglutinação — a solda gramatical (cara+alho só parece)',
    sugTitleEn: 'Agglutination — grammatical fusion (cara+alho only looks like it)',
    sugTitleEs: 'Aglutinación — la soldadura gramatical (cara+alho solo parece)',
    why: 'Palavras: aglutinação — composição por fusão (planalto, embora); cara+alho é máscara, o nome certo é trocadilho; Faça o melhor!',
    guiaId: 'aglutinacao',
    guiaWord: 'Aglutinação',
    guiaSimple:
      'Composição por fusão (planalto, embora, aguardente); cara+alho só parece isto — o nome certo é trocadilho; ≠ polimorfismo; Faça o melhor na solda.',
    guiaHistory:
      'Aglutinação vem do latim agglutinare, colar. Nos manuais de português contrapõe-se à justaposição: guarda-chuva conserva as duas caras; planalto esconde a costura.',
    guiaCuriosities:
      'O ouvido de cara+alho funde o a como plano+alto, mas a terceira forma já existia. O laboratório chama a isso máscara de aglutinação e envia o exemplo à ficha trocadilho.',
    guiaAfter: ['trocadilho', 'lingua-portuguesa', 'tanzania'],
    glossKey: 'aglutinação',
    glossAfter: 'trocadilho',
    glossMain:
      '    aglutinação: { tone: "craft", gloss: "Composição por fusão (planalto, embora); cara+alho é máscara — o nome certo é trocadilho; Faça o melhor na solda.", href: "/posts/post-inspecao-palavra-aglutinacao.html", en: "agglutination (compounding)", es: "aglutinación", fr: "agglutination", it: "composizione per fusione", de: "Zusammenrückung", el: "σύνθεση", la: "agglutinatio", yo: "isopomo", sw: "muunganiko", gez: "agglutination", nl: "samenstelling", pl: "zrost", ru: "слияние", uk: "зрощення", zh: "黏合构词", ja: "融合複合", ko: "융합 합성", ar: "إلصاق", he: "הלחמה", hi: "समास", tr: "bitisim", sv: "sammansattning", da: "sammensatning", no: "sammensetning", fi: "yhdyssana", cs: "spojovani", ro: "aglutinare", hu: "osszetetel", ca: "aglutinacio", gl: "aglutinacion", eu: "elkarketa", gn: "moĩmby", qu: "t\'inkiy", eo: "kunmetado", vi: "ghep tu", id: "aglutinasi", th: "การประสมคำ", hr: "sljepljivanje", sk: "zrastanie", ga: "tattú", cy: "cyfuniad", ha: "hadewa", am: "መጣበቅ", fa: "التصاق", bn: "সমাস", zu: "ukuhlanganisa" },\n',
    glossAliases:
      '    aglutinacao: { gloss: "Grafia sem acento de aglutinação — o mesmo ofício.", href: "/posts/post-inspecao-palavra-aglutinacao.html", en: "agglutination", es: "aglutinación" },\n' +
      '    justaposicao: { gloss: "Composição lado a lado (guarda-chuva) — o par escolar da aglutinação.", href: "/posts/post-inspecao-palavra-aglutinacao.html", en: "juxtaposition compounding", es: "yuxtaposición" },\n' +
      '    planalto: { gloss: "Exemplo de aglutinação (plano+alto); ≠ cara+alho.", href: "/posts/post-inspecao-palavra-aglutinacao.html", en: "planalto (plateau compound)", es: "planalto" },\n'
  },
  {
    build: buildPolimorfismoPost,
    sugId: 'palavra-polimorfismo',
    sugTitle: 'Polimorfismo — várias formas do mesmo (não é cara+alho)',
    sugTitleEn: 'Polymorphism — many forms of the same (not cara+alho)',
    sugTitleEs: 'Polimorfismo — varias formas de lo mismo (no es cara+alho)',
    why: 'Palavras: polimorfismo (poly+morphē) — biologia, código, alomorfia; cara+alho não é isto, é trocadilho; Faça o melhor!',
    guiaId: 'polimorfismo',
    guiaWord: 'Polimorfismo',
    guiaSimple:
      'Poly+morphē — várias formas do mesmo (biologia, código, alomorfia); cara+alho não é isto, é trocadilho; irmã aglutinação; Faça o melhor no nome.',
    guiaHistory:
      'Polimorfismo junta o grego poly- (muitos) e morphē (forma). Vive na biologia (vários fenótipos), na programação (mesmo método, vários tipos) e, à margem linguística, na alomorfia.',
    guiaCuriosities:
      'O pedido de campo perguntou se cara+alho era polimorfismo. O laboratório honra o instinto («outro significado») e corrige: esse jogo é trocadilho. Vários sentidos de uma forma chamam-se polissemia ou homonímia — ainda outro mapa.',
    guiaAfter: ['trocadilho', 'aglutinacao', 'lingua-portuguesa'],
    glossKey: 'polimorfismo',
    glossAfter: 'aglutinação',
    glossMain:
      '    polimorfismo: { tone: "craft", gloss: "Poly+morphē — várias formas do mesmo (bio/código/alomorfia); cara+alho não é isto, é trocadilho; Faça o melhor no nome.", href: "/posts/post-inspecao-palavra-polimorfismo.html", en: "polymorphism", es: "polimorfismo", fr: "polymorphisme", it: "polimorfismo", de: "Polymorphismus", el: "πολυμορφισμός", la: "polymorphismus", yo: "orisirisi irisi", sw: "umbo nyingi", gez: "polymorphism", nl: "polymorfisme", pl: "polimorfizm", ru: "полиморфизм", uk: "поліморфізм", zh: "多态", ja: "多型", ko: "다형성", ar: "تعدد الأشكال", he: "פולימורפיזם", hi: "बहुरूपता", tr: "polimorfizm", sv: "polymorfism", da: "polymorfi", no: "polymorfi", fi: "polymorfismi", cs: "polymorfismus", ro: "polimorfism", hu: "polimorfizmus", ca: "polimorfisme", gl: "polimorfismo", eu: "polimorfismo", gn: "heta ysaja", qu: "achka rikchay", eo: "polimorfismo", vi: "da hinh", id: "polimorfisme", th: "ภาวะหลายรูป", hr: "polimorfizam", sk: "polymorfizmus", ga: "ilmhoirfeacht", cy: "amlffurfiaeth", ha: "nau\'i da yawa", am: "ብዙ ቅርጽ", fa: "چندریختی", bn: "বহুরূপতা", zu: "izinhlobo eziningi" },\n',
    glossAliases:
      '    polymorphism: { gloss: "EN de polimorfismo — várias formas do mesmo; ≠ cara+alho.", href: "/posts/post-inspecao-palavra-polimorfismo.html", en: "polymorphism", es: "polimorfismo" },\n' +
      '    polissemia: { gloss: "Vários sentidos da mesma forma — ≠ polimorfismo ≠ trocadilho cara+alho.", href: "/posts/post-inspecao-palavra-polimorfismo.html", en: "polysemy", es: "polisemia" },\n'
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
      '/posts/post-inspecao-palavra-lingua-portuguesa.html',
      '/posts/post-inspecao-expressao-faca-o-melhor.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — cluster trocadilho / aglutinação / polimorfismo / cara+alho.'
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
    href,
    history: cfg.guiaHistory,
    curiosities: cfg.guiaCuriosities,
    historyEn: cfg.guiaHistory,
    curiositiesEn: cfg.guiaCuriosities,
    historyEs: cfg.guiaHistory,
    curiositiesEs: cfg.guiaCuriosities
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

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (trocadilho · aglutinação · polimorfismo)');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
