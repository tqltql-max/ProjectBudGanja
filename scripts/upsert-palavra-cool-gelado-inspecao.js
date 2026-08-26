'use strict';

/**
 * Injeta a palavra Cool Gelado (derivação de Legal !!!).
 * Uso: node scripts/upsert-palavra-cool-gelado-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildCoolGeladoPost } = require('../lib/cool-gelado-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-cool-gelado.html';
const LEGAL_HREF = '/posts/post-inspecao-palavra-legal.html';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 12) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      const tmp = file + '.tmp-' + process.pid;
      fs.writeFileSync(tmp, payload, 'utf8');
      fs.renameSync(tmp, file);
      return;
    } catch (e) {
      last = e;
      try {
        fs.writeFileSync(file, payload, 'utf8');
        return;
      } catch (e2) {
        last = e2;
      }
      await sleep(300 * (i + 1));
    }
  }
  throw last;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

async function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const html = buildPostHtml(normalized);
  await writeJsonRetry(out, html);
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

const COOL_BLOCK =
  '    cool: { tone: "warm", category: "Léxico", mundane: "Inglês — fresco / elogio; no BR ecoa Legal! (gíria).", gloss: "OE cōl «frio»; elogio moderno ≈ Legal! BR; derivação térmica → gelado; ≠ inglês legal (só jurídico); Valeu !!!", href: "' +
  HREF +
  '", en: "cool (cold / slang)", es: "cool / fresco", fr: "cool / frais", it: "cool / fresco", de: "cool / kühl", el: "δροσερός / στυλάτος", la: "frigidus / bellus", yo: "tútù / cool", sw: "baridi / poa", gez: "ቀዝቃዛ", nl: "cool / koel", pl: "cool / chłodny", ru: "крутой / прохладный", uk: "крутий / прохолодний", zh: "酷 / 凉", ja: "クール / 涼しい", ko: "쿨 / 시원한", ar: "رائع / بارد", he: "קול / קריר", hi: "कूल / ठंडा", tr: "cool / serin", sv: "cool / sval", da: "cool / kølig", no: "cool / kjølig", fi: "cool / viileä", cs: "cool / chladný", ro: "cool / răcoros", hu: "cool / hűvös", ca: "cool / fresc", gl: "cool / fresco", eu: "cool / fresko", gn: "cool", qu: "chiri / cool", eo: "mojosa / malvarmeta", vi: "cool / mát", id: "cool / sejuk", th: "คูล / เย็น", hr: "cool / hladan", sk: "cool / chladný", ga: "fionnuar / cool", cy: "cŵl / oer", ha: "sanyi / cool", am: "ኩል / ቀዝቃዛ", fa: "خفن / خنک", bn: "কুল / ঠান্ডা", zu: "okupholile" },\n';

const GELADO_BLOCK =
  '    gelado: { tone: "craft", category: "Léxico", mundane: "Muito frio; PT-PT também sorvete.", gloss: "De gelar ← lat. gelū; derivação de Legal! via inglês cool (térmico); ≠ gelo ≠ congelado ≠ lei; Valeu !!!", href: "' +
  HREF +
  '", en: "ice-cold / ice cream (PT-PT)", es: "helado / muy frío", fr: "glacé / crème glacée", it: "gelato / ghiacciato", de: "eisgekühlt / Eis", el: "παγωμένος / παγωτό", la: "gelatus", yo: "tútù gidigidi", sw: "baridi sana / aiskrimu", gez: "ዝሕለለ", nl: "ijskoud / ijs", pl: "lodowaty / lody", ru: "ледяной / мороженое", uk: "крижаний / морозиво", zh: "冰镇 / 冰淇淋", ja: "冷たい / アイス", ko: "차가운 / 아이스크림", ar: "مثلج / بوظة", he: "קפוא / גלידה", hi: "बर्फ़ीला / आइसक्रीम", tr: "buz gibi / dondurma", sv: "iskall / glass", da: "iskold / is", no: "iskald / is", fi: "jääkylmä / jäätelö", cs: "ledový / zmrzlina", ro: "înghețat / înghețată", hu: "jéghideg / fagyi", ca: "gelat", gl: "xeado", eu: "izozki / oso hotz", gn: "ro\u2019ysã", qu: "chiri / helado", eo: "glacia / glaciaĵo", vi: "lạnh đá / kem", id: "dingin es / es krim", th: "เย็นจัด / ไอศกรีม", hr: "leden / sladoled", sk: "ľadový / zmrzlina", ga: "oighreata", cy: "rhewllyd / hufen iâ", ha: "sanyi sosai", am: "በጣም ቀዝቃዛ", fa: "یخ‌زده / بستنی", bn: "বরফ ঠান্ডা", zu: "okubandayo kakhulu" },\n' +
  '    "cool gelado": { gloss: "Par de derivação de Legal! (gíria) — cool (EN) × gelado (PT térmico); ver ficha.", href: "' +
  HREF +
  '", en: "cool gelado (Legal! derivation)", es: "cool gelado (derivación de Legal!)" },\n';

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function hasKey(gloss, key) {
  return new RegExp('\\n    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':').test(gloss);
}

function patchGlossary(gloss) {
  let out = gloss;
  if (!hasKey(out, 'cool')) {
    const inserted = insertAfterKey(out, 'legal', COOL_BLOCK);
    if (inserted) out = inserted;
    else console.warn('Aviso: glossário — cool não inserido');
  }
  if (!hasKey(out, 'gelado')) {
    const extra = insertAfterKey(out, 'cool', GELADO_BLOCK);
    if (extra) out = extra;
    else console.warn('Aviso: glossário — gelado não inserido');
  }
  return out;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-cool-gelado';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Cool Gelado — derivação de Legal !!! (cool × gelado)',
    titleEn: 'Cool Gelado — derivation of Legal !!! (cool × gelado)',
    titleEs: 'Cool Gelado — derivación de Legal !!! (cool × gelado)',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: cool gelado deriva de Legal! (gíria bacana) — inglês cool (elogio × frio) → PT gelado; cortes lei / gelo / marca.',
    whyEn: 'Words: cool gelado derives from Legal! (slang) — English cool (praise × cold) → PT gelado; cuts law / ice / brand.',
    whyEs: 'Palabras: cool gelado deriva de Legal! (jerga) — inglés cool (elogio × frío) → PT gelado; cortes ley / hielo / marca.',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/gelado',
      LEGAL_HREF,
      '/posts/post-inspecao-palavra-calor-frio.html',
      '/posts/post-inspecao-palavra-gelo.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — derivação slang; não misturar lei e termómetro.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'cool-gelado',
    word: 'cool gelado',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Derivação de Legal! (gíria bacana): inglês cool (elogio × frio) → PT gelado; não é lei, não é gelo Tamara, não é marca; Valeu !!!',
    simpleEn:
      'Derivation of Legal! (slang): English cool (praise × cold) → PT gelado; not law, not Tamara ice, not a brand; Valeu !!!',
    simpleEs:
      'Derivación de Legal! (jerga): inglés cool (elogio × frío) → PT gelado; no es ley, no es hielo Tamara, no es marca; Valeu !!!',
    history:
      'Cool vem do inglês antigo cōl (frio) e ganhou elogio moderno; gelado vem de gelar ← lat. gelū. No lab a ponte parte da gíria Legal! e recusa o curto-circuito térmico.',
    curiosities:
      '«That\'s cool!» não se traduz por «está gelado». PT-PT gelado = sorvete; BR gelado = muito frio. Fecho: Valeu !!!',
    historyEn:
      'Cool comes from Old English cōl (cold) and gained modern praise; gelado comes from gelar ← Lat. gelū. The lab starts from slang Legal! and refuses the thermal short circuit.',
    curiositiesEn:
      '“That’s cool!” does not mean “it is ice-cold.” PT-PT gelado = ice cream; BR gelado = very cold. Close: Valeu !!!',
    historyEs:
      'Cool viene del inglés antiguo cōl (frío) y ganó elogio moderno; gelado viene de gelar ← lat. gelū. El lab parte de la jerga Legal! y rechaza el cortocircuito térmico.',
    curiositiesEs:
      '«That’s cool!» no se traduce por «está helado». PT-PT gelado = helado; BR gelado = muy frío. Cierre: Valeu !!!'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'legal');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-cool-gelado-palavra-cover.js')], {
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

  const post = stampFiles(buildCoolGeladoPost());
  const taken = new Set(
    posts
      .filter(
        (p) =>
          p.slug !== post.slug &&
          p.series === 'palavras-origem' &&
          /^inspecao-palavra-/.test(p.slug || '')
      )
      .map((p) => p.seriesOrder)
  );
  let order = post.seriesOrder;
  while (taken.has(order) && order < 240) order += 1;
  if (order !== post.seriesOrder) {
    post.seriesOrder = order;
    console.log('seriesOrder ajustado para Cap.', order);
  }

  upsertPost(posts, post);
  await writeHtml(post);
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
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (cool / gelado)');
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
