'use strict';

/**
 * Injeta objecto «Band-Aid» na série Palavras (lapso bandad; catálogo Objetos).
 * Uso: node scripts/upsert-palavra-band-aid-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildBandAidPost,
  poemPt,
  poemEn,
  poemEs,
  WIKI,
  WIKT_EN
} = require('../lib/band-aid-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const OBJETOS_FILE = path.join(ROOT, 'objetos', 'index.html');
const HREF = '/posts/post-inspecao-palavra-band-aid.html';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, data, 2) + '\n';
  const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, text, 'utf8');
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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || [])
      .map((id) => items.findIndex((x) => x.id === id))
      .find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function langsBandAid() {
  return 'en: "Band-Aid / adhesive bandage", es: "tirita / curita / Band-Aid", fr: "pansement adhésif", it: "cerotto", de: "Pflaster", el: "τσιρότο", la: "fascia adhaesiva", yo: "ìdìtójú", sw: "bandeji", gez: "መጠገኛ", nl: "pleister", pl: "plaster", ru: "пластырь", uk: "пластир", zh: "创可贴", ja: "ばんそうこう", ko: "밴드", ar: "لاصق طبي", he: "פלסטר", hi: "बैंड-एड", tr: "yara bandı", sv: "plåster", da: "plaster", no: "plaster", fi: "laastari", cs: "náplast", ro: "plasture", hu: "ragtapasz", ca: "tireta", gl: "penso adhesivo", eu: "esparadrapu", gn: "curativo", qu: "kiru wata", eo: "plastro", vi: "băng cá nhân", id: "plester", th: "พลาสเตอร์", hr: "flaster", sk: "náplasť", ga: "plástar", cy: "plastr", ha: "bandeji", am: "ፕላስተር", fa: "چسب زخم", bn: "ব্যান্ড-এইড", zu: "ibhandeji"';
}

function patchGlossary(gloss) {
  const main =
    '    "band-aid": { tone: "craft", category: "Objecto", mundane: "Penso adesivo de bolso — faixa + almofada no corte.", gloss: "EN band + aid; bandad = lapso (cai o i); ≠ esparadrapo ≠ gesso ≠ bandada; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langsBandAid() +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, '"band-aid"', main, 'curativo');
  const aliases = [
    [
      'bandad',
      '    bandad: { gloss: "Lapso de Band-Aid — cai o i de aid; ver ficha Band-Aid.", href: "' +
        HREF +
        '", en: "slip of Band-Aid", es: "lapsus de Band-Aid" },\n'
    ],
    [
      'bandaid',
      '    bandaid: { gloss: "Grafia numa palavra de Band-Aid — o mesmo objecto; ver Band-Aid.", href: "' +
        HREF +
        '", en: "Band-Aid (one word)", es: "Band-Aid (una palabra)" },\n'
    ],
    [
      'bandeide',
      '    bandeide: { gloss: "Oral BR de Band-Aid — o mesmo penso; ver Band-Aid.", href: "' +
        HREF +
        '", en: "spoken Band-Aid", es: "Band-Aid oral" },\n'
    ],
    [
      'bandeíde',
      '    bandeíde: { gloss: "Oral BR acentuado de Band-Aid — ver Band-Aid.", href: "' +
        HREF +
        '", en: "spoken Band-Aid", es: "Band-Aid oral" },\n'
    ],
    [
      '"penso rápido"',
      '    "penso rápido": { gloss: "Nome PT do penso adesivo — ver Band-Aid; ≠ esparadrapo.", href: "' +
        HREF +
        '", en: "adhesive bandage (PT)", es: "tirita / penso rápido" },\n'
    ],
    [
      '"curativo adesivo"',
      '    "curativo adesivo": { gloss: "Substantivo BR do penso — ver Band-Aid; o adj. curativo fica em curar.", href: "' +
        HREF +
        '", en: "adhesive dressing", es: "apósito adhesivo" },\n'
    ],
    [
      'esparadrapo',
      '    esparadrapo: { gloss: "Fita adesiva médica — sem a almofada do meio; corte na ficha Band-Aid.", href: "' +
        HREF +
        '", en: "medical adhesive tape", es: "esparadrapo" },\n'
    ],
    [
      'bandagem',
      '    bandagem: { gloss: "Ligadura / envoltório — outra escala que o rectângulo de bolso; ver Band-Aid.", href: "' +
        HREF +
        '", en: "bandage (wrap)", es: "vendaje" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, '"band-aid"');
  }

  const curativo =
    '    curativo: { gloss: "Adj. da família de curar; como substantivo BR (o curativo no joelho) é o objecto — ver Band-Aid.", href: "' +
    HREF +
    '", en: "dressing / curative", es: "curativo / apósito" },\n';
  gloss = replaceOrInsertAfter(gloss, 'curativo', curativo, 'curandeiro');
  return gloss;
}

function patchObjetosHtml(html) {
  const card =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-band-aid.html">\n' +
    '                <span class="objetos-catalog-kicker">Palavras · objecto</span>\n' +
    '                <strong>Band-Aid</strong>\n' +
    '                <span>Penso adesivo no corte — faixa + almofada; bandad cai o i; ≠ gesso ≠ bandada.</span>\n' +
    '            </a>\n';
  if (html.includes('post-inspecao-palavra-band-aid.html')) {
    return html.replace(
      /            <a class="objetos-catalog-card" href="\/posts\/post-inspecao-palavra-band-aid\.html">[\s\S]*?<\/a>\n/,
      card
    );
  }
  const needle =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-oculos.html">';
  const i = html.indexOf(needle);
  if (i < 0) {
    console.warn('Aviso: cartão Band-Aid — âncora óculos não encontrada');
    return html;
  }
  const after = html.indexOf('</a>', i);
  if (after < 0) return html;
  return html.slice(0, after + 4) + '\n' + card + html.slice(after + 4);
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

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-band-aid-objeto-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildBandAidPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'objeto-band-aid',
        title: 'Band-Aid — o objecto no corte; o lapso bandad',
        titleEn: 'Band-Aid — the object on the cut; the slip bandad',
        titleEs: 'Band-Aid — el objeto en el corte; el lapsus bandad',
        tipo: 'objeto',
        priority: 1,
        status: 'feita',
        why: 'Objecto: Band-Aid (EN band + aid) — penso adesivo; bandad = lapso (cai o i); ≠ esparadrapo ≠ gesso ≠ bandada.',
        whyEn: 'Object: Band-Aid (EN band + aid) — adhesive dressing; bandad = slip (drops the i); ≠ tape ≠ cast ≠ flock.',
        whyEs: 'Objeto: Band-Aid (EN band + aid) — apósito adhesivo; bandad = lapsus (cae la i); ≠ esparadrapo ≠ yeso ≠ bandada.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKI,
          WIKT_EN,
          '/posts/post-inspecao-palavra-curar.html',
          '/posts/post-inspecao-palavra-gesso.html',
          '/posts/post-inspecao-palavra-objetos.html',
          '/objetos/',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — objecto; pedido bandad; âncora Band-Aid; cai o i de aid.'
      },
      ['objeto-oculos', 'palavra-curar', 'palavra-gesso']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'band-aid',
        word: 'Band-Aid',
        simple:
          'EN band + aid — penso adesivo (faixa + almofada). Bandad é lapso (cai o i). ≠ esparadrapo ≠ gesso ≠ bandada. Valeu !!!',
        simpleEn:
          'EN band + aid — adhesive dressing (strip + pad). Bandad is a slip (drops the i). ≠ tape ≠ cast ≠ flock. Valeu !!!',
        simpleEs:
          'EN band + aid — apósito adhesivo (tira + almohadilla). Bandad es lapsus (cae la i). ≠ esparadrapo ≠ yeso ≠ bandada. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Do inglês Band-Aid (band «faixa» + aid «ajuda»), marca Johnson & Johnson em 1920. No Brasil o cartaz virou nome do objecto. Bandad perde o i de aid. O esparadrapo é só fita; o gesso imobiliza; a bandada é o bando da revoada.',
        curiosities:
          'O substantivo BR curativo (pôr um curativo) é este tipo; o adjectivo curativo fica na ficha curar. Bandeíde é a boca. A metáfora EN «solução band-aid» é remendo curto — outra sala.',
        historyEn:
          'English Band-Aid (band + aid), Johnson & Johnson trademark in 1920. In Brazil the brand name became the object-type. Bandad drops the i of aid. Tape is tape; plaster immobilises; bandada is the flock on the revoada sheet.',
        curiositiesEn:
          'BR noun curativo (put a dressing on) is this type; the adjective stays on curar. Bandeíde is the mouth. The EN metaphor “band-aid solution” is a short patch — another room.',
        historyEs:
          'Del inglés Band-Aid (band «tira» + aid «ayuda»), marca Johnson & Johnson en 1920. En Brasil el cartel viró nombre del objeto. Bandad pierde la i de aid. El esparadrapo es solo cinta; el yeso inmoviliza; la bandada es el bando de revoada.',
        curiositiesEs:
          'El sustantivo BR curativo es este tipo; el adjetivo queda en curar. Bandeíde es la boca. La metáfora EN «solución band-aid» es un parche corto — otra sala.'
      },
      ['curar', 'gesso', 'oculos', 'objetos']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss);
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'band-aid',
      slug: 'band-aid',
      title: 'Band-Aid',
      titleEn: 'Band-Aid',
      titleEs: 'Band-Aid',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — band + aid; bandad cai o i; ≠ esparadrapo ≠ gesso ≠ bandada; Valeu !!!',
      teaserEn: 'BudGanja echo — band + aid; bandad drops the i; ≠ tape ≠ cast ≠ flock; Valeu !!!',
      teaserEs: 'Eco BudGanja — band + aid; bandad pierde la i; ≠ esparadrapo ≠ yeso ≠ bandada; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'band-aid', 'bandad', 'objecto', 'palavra']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
  }

  if (fs.existsSync(OBJETOS_FILE)) {
    let html = fs.readFileSync(OBJETOS_FILE, 'utf8');
    html = patchObjetosHtml(html);
    fs.writeFileSync(OBJETOS_FILE, html);
    console.log('Catálogo Objetos actualizado');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
