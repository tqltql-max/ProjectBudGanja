'use strict';

/**
 * Injeta a expressão «secos e molhados» (lapso seos).
 * Uso: node scripts/upsert-expressao-secos-e-molhados.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildSecosEMolhadosPost } = require('../lib/secos-e-molhados-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-secos-e-molhados.html';

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

function patchGlossary(gloss, mainKey, mainLine, aliases, afterKey) {
  if (new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{').test(gloss)) {
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

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'expressao-secos-e-molhados';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'secos e molhados — armazém, lapso seos, duas prateleiras',
    titleEn: 'secos e molhados — the store, the seos slip, two shelves',
    titleEs: 'secos e molhados — el almacén, el lapsus seos, dos estantes',
    tipo: 'expressao',
    priority: 2,
    status: 'feita',
    why: 'Expressões: secos e molhados (siccus × molliare) — seos→secos; saco×vidro; ≠ banda; Valeu !!!',
    whyEn: 'Sayings: secos e molhados (siccus × molliare) — seos→secos; sack×bottle; ≠ the band; Valeu !!!',
    whyEs: 'Dichos: secos e molhados (siccus × molliare) — seos→secos; saco×vidrio; ≠ la banda; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'expressoes-ditados',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/molhado',
      'https://pt.wiktionary.org/wiki/molhar',
      '/posts/post-inspecao-palavra-agua.html',
      '/posts/post-inspecao-palavra-curar.html',
      '/posts/post-inspecao-palavra-calor-frio.html',
      '/calculadoras/super-solo.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — locução do armazém; lapso seos; ≠ banda Secos & Molhados.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, post) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entries = [
    {
      id: 'secos-e-molhados',
      word: 'secos e molhados',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Locução do armazém BR — secos (saco) × molhados (vidro); lapso seos→secos; ≠ banda; Valeu !!!',
      simpleEn:
        'Brazilian general-store locution — dry goods × wet goods; slip seos→secos; ≠ the band; Valeu !!!',
      simpleEs:
        'Locución del almacén BR — secos × molhados; lapsus seos→secos; ≠ la banda; ¡Valeu !!!',
      history:
        'Seco vem do latim siccus. Molhado é particípio de molhar (lat. tardio molliare / mollis). A locução nomeia a loja que guarda os dois ofícios na mesma casa, e por extensão a mistura com prateleira.',
      curiosities:
        'Pedido de campo: seos e molhados. A boca comeu o c. A banda Secos & Molhados toma o nome da loja — não é esta ficha. No lab: Super Solo mistura o seco primeiro.',
      historyEn:
        'Portuguese seco comes from Latin siccus. Molhado is the participle of molhar (Late Latin molliare / mollis). The locution names the shop that keeps both offices in the same house, and by extension a mix with shelves.',
      curiositiesEn:
        'Field request: seos e molhados. The mouth ate the c. The band Secos & Molhados borrows the shop’s name — not this sheet. In the lab: Super Solo mixes the dry first.',
      historyEs:
        'Seco viene del latín siccus. Molhado es participio de molhar (lat. tardío molliare / mollis). La locución nombra la tienda que guarda los dos oficios en la misma casa, y por extensión la mezcla con estante.',
      curiositiesEs:
        'Pedido de campo: seos e molhados. La boca se comió la c. La banda Secos & Molhados toma el nombre de la tienda — no es esta ficha. En el lab: Super Solo mezcla lo seco primero.'
    },
    {
      id: 'seco',
      word: 'seco',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Lat. siccus — estado sem humidade; par molhado; no armazém é o saco; Valeu !!!',
      simpleEn:
        'Lat. siccus — dry state; pair with molhado; in the store it is the sack; Valeu !!!',
      simpleEs:
        'Lat. siccus — estado seco; par con molhado; en el almacén es el saco; ¡Valeu !!!',
      history:
        'Do latim siccus. Não é sinónimo de calor (qualidade térmica) nem de curar (ofício de secar com tempo).',
      curiosities:
        'Secos, no plural da locução, são as mercadorias que não pingam. O lapso seos perde o c.',
      historyEn:
        'From Latin siccus. Not a synonym of calor (thermal quality) or curar (the office of drying with time).',
      curiositiesEn:
        'Secos, in the locution’s plural, are the goods that do not drip. The slip seos loses the c.',
      historyEs:
        'Del latín siccus. No es sinónimo de calor (cualidad térmica) ni de curar (oficio de secar con tiempo).',
      curiositiesEs:
        'Secos, en el plural de la locución, son las mercancías que no gotean. El lapsus seos pierde la c.'
    },
    {
      id: 'molhado',
      word: 'molhado',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Particípio de molhar (molliare / mollis) — estado com água; par seco; no armazém é o vidro; Valeu !!!',
      simpleEn:
        'Participle of molhar (molliare / mollis) — wet state; pair with seco; in the store it is the bottle; Valeu !!!',
      simpleEs:
        'Participio de molhar (molliare / mollis) — estado mojado; par con seco; en el almacén es el vidrio; ¡Valeu !!!',
      history:
        'Molhar vem do latim tardio molliare, de mollis («mole»). Molhado nomeia o estado, não a palavra água.',
      curiosities:
        'Molhados, no armazém, são azeite, vinagre, conserva — o que molha a prateleira. Lavar é o gesto; água é o elemento.',
      historyEn:
        'Molhar comes from Late Latin molliare, from mollis (“soft”). Molhado names the state, not the word water.',
      curiositiesEn:
        'Molhados, in the store, are oil, vinegar, preserves — what wets the shelf. Washing is the gesture; water is the element.',
      historyEs:
        'Molhar viene del latín tardío molliare, de mollis («blando»). Molhado nombra el estado, no la palabra agua.',
      curiositiesEs:
        'Molhados, en el almacén, son aceite, vinagre, conserva — lo que moja el estante. Lavar es el gesto; agua es el elemento.'
    }
  ];
  for (const entry of entries.slice().reverse()) {
    const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'agua');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-secos-e-molhados-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildSecosEMolhadosPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia, post);

  if (gloss) {
    gloss = patchGlossary(
      gloss,
      '"secos e molhados"',
      '    "secos e molhados": { tone: "warm", category: "Locução", mundane: "Nome do armazém BR — mercadoria seca × molhada; por extensão, mistura com prateleira.", gloss: "Lat. siccus × molliare — seos→secos; saco×vidro na mesma casa; ≠ banda; Valeu !!!", href: "' +
        HREF +
        '", en: "dry goods and wet goods / general store", es: "secos y mojados / ultramarinos", fr: "épicerie", it: "drogheria", de: "Gemischtwaren", el: "παντοπωλείο", la: "siccus et madidus", yo: "ohun gbigbe ati tutu", sw: "kavu na maji", gez: "yebäsä", nl: "kruidenierswaren", pl: "suche i mokre", ru: "сухое и мокрое", uk: "сухе і мокре", zh: "干货与湿货", ja: "乾物と湿物", ko: "건어물과 젖은 것", ar: "جاف ورطب", he: "יבש ורטוב", hi: "सूखा और गीला", tr: "kuru ve ıslak", sv: "torrt och vått", da: "tørt og vådt", no: "tørt og vått", fi: "kuiva ja märkä", cs: "suché a mokré", ro: "uscate și ude", hu: "száraz és nedves", ca: "secs i mullats", gl: "secos e mollados", eu: "lehor eta busti", gn: "yka ha mbyky", qu: "chaki hinaspa juq\'u", eo: "sekaj kaj malsekaj", vi: "khô và ướt", id: "kering dan basah", th: "แห้งและเปียก", hr: "suho i mokro", sk: "suché a mokré", ga: "tirim agus fliuch", cy: "sych a gwlyb", ha: "bushe da jika", am: "ደረቅ እና እርጥብ", fa: "خشک و خیس", bn: "শুকনো ও ভেজা", zu: "okuwomile nokumanzi" },\n',
      '    seco: { tone: "caution", category: "Estado", mundane: "Adjectivo — sem humidade; no armazém, o saco.", gloss: "Lat. siccus — par molhado; ≠ calor ≠ curar; seos perde o c; Valeu !!!", href: "' +
        HREF +
        '", en: "dry", es: "seco" },\n' +
        '    secos: { gloss: "Plural da locução — mercadorias que não pingam; ver secos e molhados.", href: "' +
        HREF +
        '", en: "dry goods", es: "secos" },\n' +
        '    molhado: { tone: "caution", category: "Estado", mundane: "Adjectivo — com água; no armazém, o vidro.", gloss: "Molhar ← molliare / mollis — par seco; ≠ a palavra água; Valeu !!!", href: "' +
        HREF +
        '", en: "wet", es: "mojado" },\n' +
        '    molhados: { gloss: "Plural da locução — azeite, vinagre, conserva; ver secos e molhados.", href: "' +
        HREF +
        '", en: "wet goods", es: "mojados" },\n' +
        '    seos: { tone: "caution", category: "Lapso", mundane: "Grafia de campo — a boca comeu o c.", gloss: "Não é lema; forma canónica secos; ver secos e molhados.", href: "' +
        HREF +
        '", en: "slip for secos", es: "lapsus de secos" },\n' +
        '    "seos e molhados": { gloss: "Pedido de campo — seos→secos; ver secos e molhados.", href: "' +
        HREF +
        '", en: "slip for secos e molhados", es: "lapsus de secos e molhados" },\n' +
        '    molhar: { gloss: "Verbo — tornar molhado; étimo de molhado; ver secos e molhados.", href: "' +
        HREF +
        '", en: "to wet / to soak", es: "mojar" },\n',
      'agua'
    );
  }

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (secos e molhados)');
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
