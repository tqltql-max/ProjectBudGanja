'use strict';

/**
 * Injeta a expressão «deixar na mão».
 * Uso: node scripts/upsert-expressao-deixar-na-mao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildDeixarNaMaoPost } = require('../lib/deixar-na-mao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-deixar-na-mao.html';

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

function insertAfterNeedle(gloss, needle, block) {
  const idx = gloss.indexOf(needle);
  if (idx < 0) return null;
  const end = gloss.indexOf('\n', idx);
  if (end < 0) return null;
  return gloss.slice(0, end + 1) + block + gloss.slice(end + 1);
}

function patchGlossary(gloss) {
  const mainLine =
    '    "deixar na mão": { tone: "caution", category: "Pátio", mundane: "Abandonar no instante em que a outra palma precisava; me deixou na mão.", gloss: "Deixar + na + mão — a palma larga; lapso deixar  na mao; ≠ meter a mão ≠ cuidados ≠ tutorial; Valeu !!!", href: "' +
    HREF +
    '", en: "leave hanging / let down", es: "dejar tirado / dejar a merced", fr: "laisser en plan", it: "lasciare in asso", de: "im Stich lassen", el: "afino sta ksera", la: "in manu deserere", yo: "fi silẹ ni ọwọ", sw: "acha mkononi", gez: "deixar na mão", nl: "in de steek laten", pl: "zostawic na lodzie", ru: "brosit v bede", uk: "kynuty v bidi", zh: "lin shi shuaishou", ja: "tebanasu / tetsudawanai", ko: "son nohda / beorida", ar: "yatruk fi al-shidda", he: "laazov bamidbar", hi: "haath chhodna", tr: "yuzustu birakmak", sv: "lamna i sticket", da: "lade i stikken", no: "la i stikken", fi: "jattaa pulaan", cs: "nechat ve stichu", ro: "lasa in plata", hu: "cserbenhagyni", ca: "deixar tirat", gl: "deixar na man", eu: "eskutan utzi", gn: "heja pope", qu: "makipi saqiy", eo: "lasi en la mano", vi: "bo roi", id: "tinggalkan di tangan", th: "ทั้งไว้", hr: "ostaviti na cjedilu", sk: "nechat v stichu", ga: "fagail sa lathair", cy: "gadael yn y llanw", ha: "bar a hannu", am: "በእጅ መተው", fa: "dast gozashtan", bn: "হাতে ফেলে যাওয়া", zu: "shiya esandleni" },\n';
  const aliases =
    '    "deixar na mao": { gloss: "Lapso de campo — mão sem til; âncora deixar na mão.", href: "' +
    HREF +
    '", en: "slip: mao without tilde", es: "lapso: mao sin tilde" },\n' +
    '    "deixou na mão": { gloss: "Pretérito oral — ver deixar na mão.", href: "' +
    HREF +
    '", en: "left hanging (past)", es: "dejó tirado" },\n' +
    '    "me deixou na mão": { gloss: "Canónica de pátio — o outro falhou no instante combinado; ver deixar na mão.", href: "' +
    HREF +
    '", en: "left me hanging", es: "me dejó tirado" },\n' +
    '    "largar na mão": { gloss: "Variante mais bruta — ver deixar na mão.", href: "' +
    HREF +
    '", en: "drop / dump (leave hanging)", es: "dejar tirado (bruto)" },\n' +
    '    "ficar na mão": { gloss: "Resultado — quem ficou sozinho; ver deixar na mão.", href: "' +
    HREF +
    '", en: "be left hanging", es: "quedar tirado" },\n' +
    '    "deixar na mão de": { gloss: "Outra sala — entregar aos cuidados / confiar; não é a âncora deixar na mão.", href: "' +
    HREF +
    '", en: "leave in someone’s care (other room)", es: "dejar en manos de (otra sala)" },\n';

  if (gloss.includes('"deixar na mão":')) {
    return gloss;
  }
  const afterConsciencia = insertAfterNeedle(
    gloss,
    '    "meter a mão na consciência": { gloss: "Sala moral — examinar-se; ver meter a mão."',
    mainLine + aliases
  );
  if (afterConsciencia) return afterConsciencia;
  const afterMeter = insertAfterNeedle(
    gloss,
    '    "meter a mão": { tone: "craft", category: "Ofício"',
    mainLine + aliases
  );
  if (afterMeter) return afterMeter;
  console.warn('Aviso: glossário — inserção após meter a mão falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'expressao-deixar-na-mao';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Deixar na mão — o gesto que larga no instante combinado',
    titleEn: 'Deixar na mão — the gesture that drops at the agreed instant',
    titleEs: 'Deixar na mão — el gesto que suelta en el instante combinado',
    tipo: 'expressao',
    priority: 2,
    status: 'feita',
    why: 'Expressões: deixar na mão — abandonar quando a outra palma precisava; lapso deixar  na mao; ≠ meter a mão ≠ cuidados ≠ tutorial; Valeu !!!',
    whyEn: 'Sayings: deixar na mão — leave hanging when the other palm needed you; slip deixar  na mao; ≠ hands-on ≠ care ≠ how-to; Valeu !!!',
    whyEs: 'Dichos: deixar na mão — abandonar cuando la otra palma pedía; lapso deixar  na mao; ≠ meter la mano ≠ cuidados ≠ tutorial; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'expressoes-ditados',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/m%C3%A3o',
      '/posts/post-inspecao-expressao-meter-a-mao.html',
      '/posts/post-inspecao-palavra-pedi-mao.html',
      '/posts/post-inspecao-palavra-mao-esquerda-direita.html',
      '/posts/post-inspecao-expressao-jogar-areia.html',
      '/posts/post-inspecao-expressao-desatar-o-no.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — ausência × ofício; lapso espaço/til; ficha ≠ tutorial de abandono.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'deixar-na-mao',
    word: 'deixar na mão',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Locução BR — abandonar no instante em que a outra palma precisava; lapso deixar  na mao; ≠ meter a mão ≠ cuidados ≠ tutorial; Valeu !!!',
    simpleEn:
      'BR saying — leave hanging when the other palm needed you; slip deixar  na mao; ≠ hands-on ≠ care ≠ how-to; Valeu !!!',
    simpleEs:
      'Dicho BR — abandonar cuando la otra palma pedía; lapso deixar  na mao; ≠ meter la mano ≠ cuidados ≠ tutorial; ¡Valeu !!!',
    history:
      'Deixar (lat. laxāre «soltar, deixar ir») + na + mão (lat. manus). Pedido de campo 2026-08-26: inspecao da expressao deixar  na mao.',
    curiosities:
      'Âncora: me deixou na mão. Outra sala: deixar na mão de (cuidados). Inverso de meter a mão. Irmã de jogar areia (dano presente × ausência). Ficha ≠ tutorial de abandono.',
    historyEn:
      'Portuguese deixar (Lat. laxāre “to loosen, let go”) + na + mão (Lat. manus). Field request 2026-08-26: inspect deixar  na mao.',
    curiositiesEn:
      'Anchor: me deixou na mão. Other room: deixar na mão de (care). Inverse of meter a mão. Sister of jogar areia (present harm × absence). Sheet ≠ abandonment how-to.',
    historyEs:
      'Deixar (lat. laxāre «soltar, dejar ir») + na + mão (lat. manus). Pedido de campo 2026-08-26: inspección de deixar  na mao.',
    curiositiesEs:
      'Áncora: me deixou na mão. Otra sala: deixar na mão de (cuidados). Inverso de meter a mão. Hermana de jogar areia (daño presente × ausencia). Ficha ≠ tutorial de abandono.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'meter-a-mao');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-deixar-na-mao-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildDeixarNaMaoPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia);
  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (deixar na mão)');
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
