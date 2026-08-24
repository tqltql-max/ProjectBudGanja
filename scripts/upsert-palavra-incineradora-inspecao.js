'use strict';

/**
 * Injeta objecto «incineradora» na série Palavras (catálogo Objetos).
 * Pedido: Inceneradora → forma canónica incineradora.
 * Uso: node scripts/upsert-palavra-incineradora-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildIncineradoraPost,
  WIKT,
  WIKT_CINIS,
  WIKI
} = require('../lib/incineradora-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const OBJETOS_FILE = path.join(ROOT, 'objetos', 'index.html');
const HREF = '/posts/post-inspecao-palavra-incineradora.html';

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

function patchGlossary(gloss) {
  const main =
    '    incineradora: { tone: "caution", category: "Objecto", mundane: "Forno / usina que reduz matéria a cinza.", gloss: "In- + cinis + -dora — objecto que faz cinza; pedido Inceneradora → canónica; ≠ cinzeiro ≠ fogueira ≠ away; Valeu !!!", href: "' +
    HREF +
    '", en: "incinerator (plant)", es: "incineradora", fr: "incinérateur", it: "inceneritore", de: "Mullverbrennungsanlage", el: "apotephrotiras", la: "incineratorium", yo: "ẹrọ eérú", sw: "kiunguzo", gez: "mäwsäṭ", nl: "verbrandingsoven", pl: "spalarnia", ru: "musorozhigatel", uk: "spalyuvalna", zh: "fenhuolu", ja: "shokyakuro", ko: "so-gak-ro", ar: "mahraka", he: "kivshan srefa", hi: "bhasmikaran", tr: "yakma tesisi", sv: "forbranningsanlaggning", da: "forbrændingsanlæg", no: "forbrenningsanlegg", fi: "polttolaitos", cs: "spalovna", ro: "incinerator", hu: "egetomuve", ca: "incineradora", gl: "incineradora", eu: "errausgailu", gn: "tata rendyha", qu: "nina wasi", eo: "cindrigilo", vi: "lo dot rac", id: "insinerator", th: "เตาเผาขยะ", hr: "spalionica", sk: "spalovna", ga: "loisceoir", cy: "llosgydd", ha: "tanderun toka", am: "ማቃጠያ", fa: "كوره زباله", bn: "ইনসিনারেটর", zu: "isishiso" },\n';
  gloss = replaceOrInsertAfter(gloss, 'incineradora', main, 'cinzeiro');
  const aliases = [
    [
      'incinerador',
      '    incinerador: { gloss: "Masculino da máquina — mesma família da incineradora; forno que reduz a cinza.", href: "' +
        HREF +
        '", en: "incinerator", es: "incinerador" },\n'
    ],
    [
      'inceneradora',
      '    inceneradora: { gloss: "Lapso de orelha (e por i) de incineradora — canónica com i de cinis.", href: "' +
        HREF +
        '", en: "inceneradora (misspelling)", es: "inceneradora (lapsus)" },\n'
    ],
    [
      'incinerar',
      '    incinerar: { gloss: "Verbo — reduzir a cinza (lat. incinerāre); o objecto é a incineradora, não a receita.", href: "' +
        HREF +
        '", en: "to incinerate", es: "incinerar" },\n'
    ],
    [
      'incineração',
      '    incineração: { gloss: "Processo — o ofício da incineradora; ≠ o objecto-forno.", href: "' +
        HREF +
        '", en: "incineration", es: "incineración" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'incineradora');
  }
  return gloss;
}

function insertAfterHref(html, afterHref, card) {
  const needle = '            <a class="objetos-catalog-card" href="' + afterHref + '">';
  const i = html.indexOf(needle);
  if (i < 0) {
    console.warn('Aviso: âncora não encontrada', afterHref);
    return html;
  }
  const after = html.indexOf('</a>', i);
  if (after < 0) return html;
  return html.slice(0, after + 4) + '\n' + card + html.slice(after + 4);
}

function patchObjetosHtml(html) {
  const cardFichas =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-incineradora.html">\n' +
    '                <span class="objetos-catalog-kicker">Palavras · objecto</span>\n' +
    '                <strong>Incineradora</strong>\n' +
    '                <span>O forno que reduz a cinza — irmã industrial do cinzeiro.</span>\n' +
    '            </a>\n';
  const cardFogo =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-incineradora.html">\n' +
    '                <span class="objetos-catalog-kicker">Palavras · objecto</span>\n' +
    '                <strong>Incineradora</strong>\n' +
    '                <span>Usina de chama contida — reduz a cinza; não é away.</span>\n' +
    '            </a>\n';

  html = html.replace(
    /            <a class="objetos-catalog-card" href="\/posts\/post-inspecao-palavra-incineradora\.html">[\s\S]*?<\/a>\n/g,
    ''
  );
  html = insertAfterHref(html, '/posts/post-inspecao-palavra-cinzeiro.html', cardFichas);
  html = insertAfterHref(html, '/posts/post-inspecao-palavra-extintor.html', cardFogo);
  return html;
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-incineradora-objeto-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildIncineradoraPost());
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
        id: 'objeto-incineradora',
        title: 'Incineradora — o objecto que reduz a cinza',
        titleEn: 'Incineradora — the object that reduces to ash',
        titleEs: 'Incineradora — el objeto que reduce a ceniza',
        tipo: 'objeto',
        priority: 2,
        status: 'feita',
        why: 'Objecto: incineradora (pedido Inceneradora → canónica; in- + cinis + -dora) — forno/usina; ≠ cinzeiro ≠ fogueira ≠ away.',
        whyEn: 'Object: incineradora (requested Inceneradora → canonical; in- + cinis + -dora) — furnace/plant; ≠ ashtray ≠ bonfire ≠ away.',
        whyEs: 'Objeto: incineradora (pedido Inceneradora → canónica; in- + cinis + -dora) — horno/planta; ≠ cenicero ≠ hogera ≠ away.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          WIKT_CINIS,
          WIKI,
          '/posts/post-inspecao-palavra-cinzeiro.html',
          '/posts/post-inspecao-palavra-fogo.html',
          '/posts/post-inspecao-palavra-extintor.html',
          '/posts/post-inspecao-arte-a-historia-das-coisas.html',
          '/objetos/',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — objecto; grafia canónica incineradora (pedido Inceneradora).'
      },
      ['palavra-cinzeiro', 'objeto-oculos', 'palavra-fogo']
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
        id: 'incineradora',
        word: 'incineradora',
        simple:
          'In- + cinis + -dora — forno/usina que reduz a cinza. Pedido Inceneradora → canónica. ≠ cinzeiro ≠ fogueira ≠ away. Valeu !!!',
        simpleEn:
          'In- + cinis + -dora — furnace/plant that reduces to ash. Requested Inceneradora → canonical. ≠ ashtray ≠ bonfire ≠ away. Valeu !!!',
        simpleEs:
          'In- + cinis + -dora — horno/planta que reduce a ceniza. Pedido Inceneradora → canónica. ≠ cenicero ≠ hogera ≠ away. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Incineradora vem de incinerar, latim incinerāre (reduzir a cinza), de in- + cinis, cineris — a mesma cinza do cinzeiro. O feminino puxa a usina; o masculino incinerador nomeia a máquina. Pedido oral Inceneradora (e) → canónica com i.',
        curiosities:
          'O cinzeiro guarda a cinza; a incineradora fabrica-a à escala da cidade. «Away» é história: vira cinza e gás. Cinza industrial ≠ adubo automático. Fogueira e crematório são outros objectos.',
        historyEn:
          'Incineradora comes from incinerar, Latin incinerāre (reduce to ash), from in- + cinis, cineris — the same ash as cinzeiro. The feminine often names the plant; masculine incinerador names the machine. Spoken Inceneradora (e) → canonical with i.',
        curiositiesEn:
          'The ashtray holds ash; the incinerator makes it at city scale. “Away” is a story: it becomes ash and gas. Industrial ash ≠ automatic fertilizer. Bonfire and crematorium are other objects.',
        historyEs:
          'Incineradora viene de incinerar, latín incinerāre (reducir a ceniza), de in- + cinis, cineris — la misma ceniza del cinzeiro. El femenino tira a la planta; el masculino nombra la máquina. Pedido Inceneradora (e) → canónica con i.',
        curiositiesEs:
          'El cenicero guarda la ceniza; la incineradora la fabrica a escala de ciudad. «Away» es historia: vira ceniza y gas. Ceniza industrial ≠ abono automático. Hogera y crematorio son otros objetos.'
      },
      ['cinzeiro', 'fogo', 'extintor', 'oculos']
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
