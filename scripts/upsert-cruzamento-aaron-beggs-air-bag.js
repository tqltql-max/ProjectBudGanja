'use strict';

/**
 * Injeta inspeção-cruzamento Aaron Beggs × Air Bag.
 * Uso: node scripts/upsert-cruzamento-aaron-beggs-air-bag.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildAaronBeggsAirBagPost
} = require('../lib/aaron-beggs-air-bag-cruzamento-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-cruzamento-aaron-beggs-air-bag.html';
const BBC = 'https://www.bbc.com/news/articles/cj0v632yddzo';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload =
    typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

const AIRBAG_BLOCK =
  '    airbag: { tone: "craft", category: "Objecto", mundane: "Bolsa de ar que infla no impacto — segurança passiva do automóvel.", gloss: "EN air + bag; PT saco/bolsa de ar; o dispositivo dispara; Beggs escolheu; cruzamento Boston 2026; Valeu !!!", href: "' +
  HREF +
  '", en: "airbag", es: "airbag", fr: "airbag", it: "airbag", de: "Airbag", el: "αερόσακος", la: "saccus aeris", yo: "apo afẹ́fẹ́", sw: "mfuko wa hewa", gez: "saccus", nl: "airbag", pl: "poduszka powietrzna", ru: "подушка безопасности", uk: "подушка безпеки", zh: "安全气囊", ja: "エアバッグ", ko: "에어백", ar: "وسادة هوائية", he: "כרית אוויר", hi: "एयरबैग", tr: "hava yastığı", sv: "krockkudde", da: "airbag", no: "airbag", fi: "turvatyyny", cs: "airbag", ro: "airbag", hu: "légzsák", ca: "airbag", gl: "airbag", eu: "airbag", gn: "vosa yvytu", qu: "wayra saco", eo: "aersako", vi: "túi khí", id: "airbag", th: "ถุงลมนิรภัย", hr: "zračni jastuk", sk: "airbag", ga: "mála aeir", cy: "bag aer", ha: "jakar iska", am: "የአየር ከረጢት", fa: "کیسه هوا", bn: "এয়ারব্যাগ", zu: "isikhwama somoya" },\n';

const EXTRA_BLOCK =
  '    "air bag": { gloss: "EN em duas peças — ver airbag; cruzamento Aaron Beggs × Air Bag.", href: "' +
  HREF +
  '", en: "air bag", es: "air bag" },\n' +
  '    "saco de ar": { gloss: "PT do airbag — bolsa que infla; o dispositivo dispara; Beggs escolheu; Valeu !!!", href: "' +
  HREF +
  '", en: "air bag", es: "saco de aire" },\n' +
  '    "bolsa de ar": { gloss: "Sinónimo PT de airbag — ver cruzamento Aaron Beggs × Air Bag.", href: "' +
  HREF +
  '", en: "air bag", es: "bolsa de aire" },\n' +
  '    erbegue: { gloss: "Grafia aportuguesada rara de airbag — ver ficha do cruzamento.", href: "' +
  HREF +
  '", en: "airbag (PT respelling)", es: "airbag" },\n' +
  '    "aaron beggs": { tone: "warm", category: "Pessoa", mundane: "Corredor de Bangor (North Down AC) que parou na Boylston Street, Boston 2026.", gloss: "Cruzamento com airbag: o saco dispara, ele escolheu amortecer Ajay; Valeu !!!", href: "' +
  HREF +
  '", en: "Aaron Beggs", es: "Aaron Beggs", fr: "Aaron Beggs", it: "Aaron Beggs", de: "Aaron Beggs", el: "Aaron Beggs", la: "Aaron Beggs", yo: "Aaron Beggs", sw: "Aaron Beggs", gez: "Aaron Beggs", nl: "Aaron Beggs", pl: "Aaron Beggs", ru: "Aaron Beggs", uk: "Aaron Beggs", zh: "Aaron Beggs", ja: "Aaron Beggs", ko: "Aaron Beggs", ar: "Aaron Beggs", he: "Aaron Beggs", hi: "Aaron Beggs", tr: "Aaron Beggs", sv: "Aaron Beggs", da: "Aaron Beggs", no: "Aaron Beggs", fi: "Aaron Beggs", cs: "Aaron Beggs", ro: "Aaron Beggs", hu: "Aaron Beggs", ca: "Aaron Beggs", gl: "Aaron Beggs", eu: "Aaron Beggs", gn: "Aaron Beggs", qu: "Aaron Beggs", eo: "Aaron Beggs", vi: "Aaron Beggs", id: "Aaron Beggs", th: "Aaron Beggs", hr: "Aaron Beggs", sk: "Aaron Beggs", ga: "Aaron Beggs", cy: "Aaron Beggs", ha: "Aaron Beggs", am: "Aaron Beggs", fa: "Aaron Beggs", bn: "Aaron Beggs", zu: "Aaron Beggs" },\n';

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' +
      key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
      ':\\s*\\{[\\s\\S]*?' +
      ZU_TAIL.source +
      ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function replaceExisting(gloss, keyPattern, block) {
  const re = new RegExp(keyPattern);
  if (!re.test(gloss)) return null;
  return gloss.replace(re, block);
}

function patchGlossary(gloss) {
  if (gloss.includes('href: "' + HREF + '"') && gloss.includes('    airbag:')) {
    const air = replaceExisting(
      gloss,
      '    airbag:\\s*\\{[\\s\\S]*?' + ZU_TAIL.source,
      AIRBAG_BLOCK
    );
    return air || gloss;
  }
  let out = gloss;
  if (!out.includes('    airbag:')) {
    const inserted = insertAfterKey(out, 'ajudar', AIRBAG_BLOCK);
    if (inserted) out = inserted;
    else console.warn('Aviso: glossário — airbag não inserido');
  }
  if (!out.includes('"aaron beggs"')) {
    const extra = insertAfterKey(out, 'airbag', EXTRA_BLOCK);
    if (extra) out = extra;
    else console.warn('Aviso: glossário — Aaron Beggs / saco de ar não inseridos');
  }
  return out;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'cruzamento-aaron-beggs-air-bag';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Cruzamento — Aaron Beggs × Air Bag',
    titleEn: 'Cross — Aaron Beggs × Air Bag',
    titleEs: 'Cruce — Aaron Beggs × Air Bag',
    tipo: 'pessoas',
    priority: 1,
    status: 'feita',
    why: 'Pessoas · cruzamento: Aaron Beggs × airbag — o saco dispara; o homem de Bangor escolheu amortecer na Boylston Street (Boston 2026); Valeu !!!',
    whyEn:
      'People · cross: Aaron Beggs × airbag — the bag fires; the man from Bangor chose to cushion on Boylston Street (Boston 2026); Valeu !!!',
    whyEs:
      'Personas · cruce: Aaron Beggs × airbag — el saco dispara; el hombre de Bangor eligió amortiguar en Boylston Street (Boston 2026); ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'pessoas-historia',
    sources: [
      BBC,
      'https://www.nbcnews.com/sports/track-field/man-helped-competitor-boston-marathon-explains-rcna341852',
      'https://pt.wikipedia.org/wiki/Airbag',
      '/posts/post-inspecao-palavra-gesto.html',
      '/posts/post-inspecao-palavra-juntos.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes:
      'Cap. ' +
      post.seriesOrder +
      ' — metáfora de ofício; airbag não esteve na corrida; sem vida privada inventada.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuiaEntry(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = items.findIndex((x) => afterIds.indexOf(x.id) >= 0);
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  upsertGuiaEntry(
    items,
    {
      id: 'airbag',
      word: 'Airbag',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'EN air + bag — saco de ar que infla no impacto; o dispositivo dispara; Aaron Beggs escolheu; cruzamento Boston 2026; Valeu !!!',
      simpleEn:
        'EN air + bag — cushion that inflates on impact; the device fires; Aaron Beggs chose; Boston 2026 cross; Valeu !!!',
      simpleEs:
        'EN air + bag — saco de aire que infla en el impacto; el dispositivo dispara; Aaron Beggs eligió; cruce Boston 2026; ¡Valeu !!!',
      history:
        'Airbag é estrangeirismo do inglês air + bag. Segurança passiva do automóvel: sensores, unidade de controlo, saco que enche em milissegundos. No laboratório cruza com o gesto de Aaron Beggs na Maratona de Boston de 2026 — metáfora de ofício, não facto da prova.',
      curiosities:
        'Também saco de ar, bolsa de ar, erbegue. O airbag não escolhe; Beggs olhou o relógio e parou. Fecho: Valeu !!!',
      historyEn:
        'Airbag is English air + bag. Passive car safety: sensors, control unit, bag that fills in milliseconds. In the lab it crosses with Aaron Beggs’s gesture at Boston 2026 — craft metaphor, not a fact of the race.',
      curiositiesEn:
        'Also air bag / saco de ar. The airbag does not choose; Beggs looked at his watch and stopped. Close: Valeu !!!',
      historyEs:
        'Airbag es inglés air + bag. Seguridad pasiva del automóvil. En el laboratorio cruza con el gesto de Aaron Beggs en Boston 2026 — metáfora de oficio, no hecho de la prueba.',
      curiositiesEs:
        'También saco de aire. El airbag no elige; Beggs miró el reloj y paró. Cierre: ¡Valeu !!!'
    },
    ['juntos', 'gesto']
  );
  upsertGuiaEntry(
    items,
    {
      id: 'aaron-beggs',
      word: 'Aaron Beggs',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Pessoa — corredor de Bangor (North Down AC); cruzamento com airbag: escolheu amortecer Ajay na Boylston Street, Boston 2026; Valeu !!!',
      simpleEn:
        'Person — Bangor runner (North Down AC); cross with airbag: chose to cushion Ajay on Boylston Street, Boston 2026; Valeu !!!',
      simpleEs:
        'Persona — corredor de Bangor (North Down AC); cruce con airbag: eligió amortiguar a Ajay en Boylston Street, Boston 2026; ¡Valeu !!!',
      history:
        'Aaron Beggs, de Bangor (Irlanda do Norte), parou a ~200 m da fita da Maratona de Boston de 2026 para ajudar Ajay Haridasse. Robson de Oliveira juntou-se. O laboratório lê o gesto como airbag humano: o saco dispara; ele escolheu.',
      curiosities:
        'Colete amarelo e azul do North Down AC. Tempos Athletics NI: 2:44:36. Não inventar família. Fecho: Valeu !!!',
      historyEn:
        'Aaron Beggs, from Bangor (Northern Ireland), stopped ~200 m from the 2026 Boston Marathon tape to help Ajay Haridasse. Robson de Oliveira joined. The lab reads the gesture as a human airbag.',
      curiositiesEn:
        'Yellow-blue North Down AC vest. Athletics NI time 2:44:36. No invented family. Close: Valeu !!!',
      historyEs:
        'Aaron Beggs, de Bangor (Irlanda del Norte), paró a ~200 m de la cinta de Boston 2026 para ayudar a Ajay Haridasse. Robson de Oliveira se unió. El laboratorio lee el gesto como airbag humano.',
      curiositiesEs:
        'Chaleco amarillo y azul del North Down AC. Tiempo Athletics NI 2:44:36. Sin familia inventada. Cierre: ¡Valeu !!!'
    },
    ['airbag', 'ayrton-senna']
  );
  guia.items = items;
}

async function main() {
  try {
    execFileSync(
      process.execPath,
      [path.join(__dirname, 'generate-aaron-beggs-air-bag-cover.js')],
      { cwd: ROOT, stdio: 'inherit', timeout: 60000 }
    );
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
  let gloss = fs.existsSync(GLOSS_FILE)
    ? fs.readFileSync(GLOSS_FILE, 'utf8')
    : '';

  const post = stampFiles(buildAaronBeggsAirBagPost());
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
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (Aaron Beggs × Air Bag)');
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
