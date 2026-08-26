'use strict';

/**
 * Injeta a palavra mapa (lat. mappa) cruzada com mão (lat. manus).
 * Uso: node scripts/upsert-palavra-mapa-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildMapaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_MAPA,
  WIKT_MAPPA,
  WIKT_MAO,
  WIKT_MANUS,
  WIKI_MAPA,
  WIKI_MAPPA_MUNDI
} = require('../lib/mapa-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-mapa.html';
const HREF_MAO = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';

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

function patchGlossary(gloss) {
  const main =
    '    mapa: { tone: "craft", category: "Léxico", mundane: "Desenho do território; também plano, esquema, mapa mental.", gloss: "Lat. mappa «pano» × mão (lat. manus); o pano desenha estrada, automóvel, bateria e encruzilhada; ≠ strata ≠ cartografia ≠ GPS; Valeu !!!", href: "' +
    HREF +
    '", en: "map", es: "mapa", fr: "carte / mappe", it: "mappa", de: "Karte / Mappe", el: "χάρτης", la: "mappa", yo: "máàpù", sw: "ramani", gez: "kārtā", nl: "kaart", pl: "mapa", ru: "карта", uk: "мапа", zh: "地图", ja: "地図", ko: "지도", ar: "خريطة", he: "מפה", hi: "नक्शा", tr: "harita", sv: "karta", da: "kort", no: "kart", fi: "kartta", cs: "mapa", ro: "hartă", hu: "térkép", ca: "mapa", gl: "mapa", eu: "mapa", gn: "mapa", qu: "mapa", eo: "mapo", vi: "bản đồ", id: "peta", th: "แผนที่", hr: "karta", sk: "mapa", ga: "léarscáil", cy: "map", ha: "taswira", am: "ካርታ", fa: "نقشه", bn: "মানচিত্র", zu: "imephu" },\n';
  gloss = replaceOrInsertAfter(gloss, 'mapa', main, 'mão');
  const aliases = [
    [
      'mapear',
      '    mapear: { gloss: "Verbo da família de mapa ← lat. mappa; pôr no pano / inventariar; ver mapa.", href: "' +
        HREF +
        '", en: "to map", es: "mapear" },\n'
    ],
    [
      'mapeamento',
      '    mapeamento: { gloss: "Acto de mapear — inventário no pano; ver mapa.", href: "' +
        HREF +
        '", en: "mapping", es: "mapeo" },\n'
    ],
    [
      'mappa',
      '    mappa: { gloss: "Latim de mapa — pano / guardanapo; mappa mundi; ≠ manus; ver mapa.", href: "' +
        HREF +
        '", en: "mappa (Lat. cloth)", es: "mappa" },\n'
    ],
    [
      '"mapa na mão"',
      '    "mapa na mão": { gloss: "Locução — ter a rota / a orientação; pano na palma; ≠ posse; ver mapa e mão.", href: "' +
        HREF +
        '", en: "map in hand / to have the route", es: "mapa en la mano" },\n'
    ],
    [
      'cartografia',
      '    cartografia: { gloss: "Gr. chartēs + graphein — outra árvore; irmã de uso do mapa, não de étimo (mappa); ver mapa.", href: "' +
        HREF +
        '", en: "cartography", es: "cartografía" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'mapa');
  }
  const maoLine =
    '    mão: { gloss: "Latim *manus* — ferramenta do gesto: cultivar, escrever, teclar; par esquerda × direita; elo mapa (mappa ≠ manus).", href: "' +
    HREF_MAO +
    '", en: "hand", es: "mano", fr: "main", it: "mano", de: "Hand", el: "χέρι", la: "manus", yo: "ọwọ́", sw: "mkono", gez: "əd", nl: "hand", pl: "ręka", ru: "рука", uk: "рука", zh: "手", ja: "手", ko: "손", ar: "يد", he: "יד", hi: "हाथ", tr: "el", sv: "hand", da: "hånd", no: "hånd", fi: "käsi", cs: "ruka", ro: "mână", hu: "kéz", ca: "mà", gl: "man", eu: "escu", gn: "po", qu: "maki", eo: "mano", vi: "tay", id: "tangan", th: "มือ", hr: "ruka", sk: "ruka", ga: "lámh", cy: "llaw", ha: "hannu", am: "ej", fa: "dast", bn: "হাত", zu: "isandla" },\n';
  gloss = replaceOrInsertAfter(gloss, 'mão', maoLine, 'arvore');
  return gloss;
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-mapa-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildMapaPost());
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
        id: 'palavra-mapa',
        title: 'Mapa — mappa (pano); relação com mão (manus)',
        titleEn: 'Mapa — mappa (cloth); relation with mão (manus)',
        titleEs: 'Mapa — mappa (paño); relación con mão (manus)',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: mapa (lat. mappa «pano») × mão (lat. manus); o pano desenha estrada, automóvel, bateria e encruzilhada; ≠ strata ≠ cartografia.',
        whyEn: 'Words: mapa (Lat. mappa “cloth”) × mão (Lat. manus); the cloth draws road, car, battery and crossroads; ≠ strata.',
        whyEs: 'Palabras: mapa (lat. mappa «paño») × mão (lat. manus); el paño dibuja estrada, auto, batería y encrucijada; ≠ strata.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT_MAPA,
          WIKT_MAPPA,
          WIKT_MAO,
          WIKT_MANUS,
          WIKI_MAPA,
          WIKI_MAPPA_MUNDI,
          HREF_MAO,
          '/posts/post-inspecao-palavra-caminho.html',
          '/posts/post-inspecao-palavra-estrada.html',
          '/posts/post-inspecao-palavra-automovel.html',
          '/posts/post-inspecao-palavra-bateria.html',
          '/posts/post-inspecao-palavra-encruzilhada.html',
          '/posts/post-inspecao-cruzamento-estrada-encruzilhada-jesus-cristo.html',
          '/posts/post-inspecao-palavra-relacao.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes:
          'Cap. ' +
          post.seriesOrder +
          ' — mapa × mão; mappa ≠ manus ≠ strata; o pano desenha a viagem; mapear = variação.'
      },
      ['palavra-mao-esquerda-direita', 'palavra-caminho', 'palavra-relacao']
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
        id: 'mapa',
        word: 'Mapa',
        simple:
          'Lat. mappa «pano» — desenho do território e plano; cruzado com mão (lat. manus). O pano desenha estrada, automóvel, bateria e encruzilhada. ≠ strata ≠ cartografia ≠ GPS. Valeu !!!',
        simpleEn:
          'Lat. mappa “cloth” — drawing of territory and plan; crossed with mão (Lat. manus). The cloth draws road, car, battery and crossroads. ≠ strata ≠ cartography ≠ GPS. Valeu !!!',
        simpleEs:
          'Lat. mappa «paño» — dibujo del territorio y plan; cruzado con mão (lat. manus). El paño dibuja estrada, auto, batería y encrucijada. ≠ strata ≠ cartografía ≠ GPS. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Mapa vem do latim mappa (pano, guardanapo). Na Idade Média mappa mundi é o pano do mundo. O inglês map segue a mesma via. Cartografia (grego chartēs + graphein) é outra árvore. A mão (lat. manus) cola no ouvido (MA-) e no ofício (o pano cabe na palma), não no étimo.',
        curiosities:
          'Gatilho de campo MApa / Maão: o olho marca o prefixo partilhado. Locução mapa na mão = ter a rota, não posse do chão. O pano desenha a viagem (estrada × automóvel × bateria × encruzilhada × Jesus Cristo) sem fundir mappa com strata. Mapear é variação verbal nesta ficha. Quiromancia fica cortada.',
        historyEn:
          'Portuguese mapa is Latin mappa (cloth, napkin). Medieval mappa mundi is the cloth of the world. English map follows the same path. Cartography (Greek chartēs + graphein) is another tree. Mão (Lat. manus) meets it in the ear (MA-) and in craft (cloth in the palm), not in the etymon.',
        curiositiesEn:
          'Field trigger MApa / Maão: the eye marks the shared prefix. Phrase mapa na mão = to have the route, not title to the land. The cloth draws the journey (estrada × automóvel × bateria × encruzilhada × Jesus Christ) without fusing mappa with strata. Mapear is a verbal variation. Palmistry is cut.',
        historyEs:
          'Mapa viene del latín mappa (paño, servilleta). En la Edad Media mappa mundi es el paño del mundo. El inglés map sigue la misma vía. Cartografía (griego chartēs + graphein) es otro árbol. Mão (lat. manus) se encuentra en el oído (MA-) y en el oficio (el paño cabe en la palma), no en el étimo.',
        curiositiesEs:
          'Gatillo de campo MApa / Maão: el ojo marca el prefijo compartido. Locución mapa na mão = tener la ruta, no título de tierra. El paño dibuja el viaje (estrada × automóvel × bateria × encruzilhada × Jesucristo) sin fusionar mappa con strata. Mapear es variación verbal. La quiromancia queda cortada.'
      },
      ['mao', 'maravilhoso', 'mar']
    );
    upsertItem(
      items,
      {
        id: 'mapear',
        word: 'mapear',
        simple:
          'Verbo da família de mapa ← lat. mappa — pôr no pano / inventariar. Variação na ficha mapa. Valeu !!!',
        simpleEn:
          'Verb of the mapa family ← Lat. mappa — put on the cloth / inventory. Variation on the mapa sheet. Valeu !!!',
        simpleEs:
          'Verbo de la familia de mapa ← lat. mappa — poner en el paño / inventariar. Variación en la ficha mapa. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['mapa']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'mapa',
      slug: 'mapa',
      title: 'Mapa',
      titleEn: 'Mapa',
      titleEs: 'Mapa',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — mappa (pano) × manus (mão); o pano desenha a estrada; Valeu !!!',
      teaserEn: 'BudGanja echo — mappa (cloth) × manus (hand); the cloth draws the road; Valeu !!!',
      teaserEs: 'Eco BudGanja — mappa (paño) × manus (mano); el paño dibuja la estrada; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'mapa', 'mao', 'mappa', 'manus', 'estrada']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
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
