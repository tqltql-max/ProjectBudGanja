'use strict';

/**
 * Injeta o trio comprimento × distância × relatividade na série Palavras.
 * Uso: node scripts/upsert-palavra-comprimento-distancia-relatividade-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildComprimentoDistanciaRelatividadePost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_COMP,
  WIKT_DIST,
  WIKT_REL,
  WIKT_COMPLEO,
  WIKT_DISTANTIA,
  WIKT_RELATIVUS,
  WIKI_SR,
  WIKI_GR,
  WIKI_LC
} = require('../lib/comprimento-distancia-relatividade-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-comprimento-distancia-relatividade.html';

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
  const langs =
    'en: "length", es: "longitud", fr: "longueur", it: "lunghezza", de: "Länge", el: "μήκος", la: "longitudo / complementum", yo: "gígùn", sw: "urefu", gez: "nəwḥ", nl: "lengte", pl: "długość", ru: "длина", uk: "довжина", zh: "长度", ja: "長さ", ko: "길이", ar: "طول", he: "אורך", hi: "लंबाई", tr: "uzunluk", sv: "längd", da: "længde", no: "lengde", fi: "pituus", cs: "délka", ro: "lungime", hu: "hossz", ca: "llargada", gl: "lonxitude / longo", eu: "luzera", gn: "puku", qu: "suniy", eo: "longo", vi: "chiều dài", id: "panjang", th: "ความยาว", hr: "duljina", sk: "dĺžka", ga: "fad", cy: "hyd", ha: "tsawo", am: "ርዝመት", fa: "طول", bn: "দৈর্ঘ্য", zu: "ubude"';
  const main =
    '    comprimento: { tone: "craft", category: "Léxico", mundane: "Extensão de um objecto, ponta a ponta.", gloss: "Lat. complēre → comprido → comprimento — a vara; trio com distância (vão) e relatividade (quadro); ≠ cumprimento; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langs +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'comprimento', main, 'tempo');
  const aliases = [
    [
      'comprido',
      '    comprido: { gloss: "Adjectivo da vara (longo) — sala A da ficha comprimento × distância × relatividade.", href: "' +
        HREF +
        '", en: "long", es: "largo / largo de largo" },\n'
    ],
    [
      'cumprimento',
      '    cumprimento: { gloss: "Saudação / acto de cumprir — prima de comprimento (mesmo complēre); ofício outro; ver também missão comprida.", href: "' +
        HREF +
        '", en: "greeting / fulfillment", es: "saludo / cumplimiento" },\n'
    ],
    [
      'distância',
      '    distância: { tone: "craft", category: "Léxico", mundane: "Vão entre dois pontos.", gloss: "Lat. distantia ← distāre (dis- + stāre) — o entre, não a vara; trio com comprimento e relatividade; Valeu !!!", href: "' +
        HREF +
        '", en: "distance", es: "distancia" },\n'
    ],
    [
      'distancia',
      '    distancia: { gloss: "Grafia sem acento de distância — o vão; ver ficha do trio.", href: "' +
        HREF +
        '", en: "distance", es: "distancia" },\n'
    ],
    [
      'relatividade',
      '    relatividade: { tone: "craft", category: "Física", mundane: "Teoria: medidas de espaço e tempo dependem do quadro; c não.", gloss: "Lat. relātīvus — restrita 1905 × geral 1915; ≠ relativismo ≠ relação; trio com comprimento e distância; Valeu !!!", href: "' +
        HREF +
        '", en: "relativity", es: "relatividad" },\n'
    ],
    [
      'relativismo',
      '    relativismo: { gloss: "Filosofia («não há verdade») — ≠ relatividade (física); corte na ficha do trio.", href: "' +
        HREF +
        '", en: "relativism", es: "relativismo" },\n'
    ],
    [
      'longitude',
      '    longitude: { gloss: "Coordenada geográfica — ≠ comprimento da vara; ver ficha do trio.", href: "' +
        HREF +
        '", en: "longitude", es: "longitud (geográfica)" },\n'
    ],
    [
      'contração',
      '    contração: { gloss: "Contração de Lorentz — comprimento medido da vara em movimento; sala A da ficha do trio.", href: "' +
        HREF +
        '", en: "length contraction", es: "contracción de la longitud" },\n'
    ],
    [
      'contracao',
      '    contracao: { gloss: "Grafia sem acento de contração — Lorentz: comprimento medido da vara em movimento; ver ficha do trio.", href: "' +
        HREF +
        '", en: "contraction (length)", es: "contracción" },\n'
    ],
    [
      'length',
      '    length: { gloss: "EN de comprimento (a vara) — não é distance; ver ficha do trio.", href: "' +
        HREF +
        '", en: "length", es: "longitud" },\n'
    ],
    [
      'relativity',
      '    relativity: { gloss: "EN de relatividade — teoria do quadro, não relativismo; ver ficha.", href: "' +
        HREF +
        '", en: "relativity", es: "relatividad" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'comprimento');
  }
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
    execFileSync(
      process.execPath,
      [path.join(__dirname, 'generate-comprimento-distancia-relatividade-palavra-cover.js')],
      {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      }
    );
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildComprimentoDistanciaRelatividadePost());
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
        id: 'palavra-comprimento-distancia-relatividade',
        title: 'Comprimento × Distância × Relatividade — o metro depende do quadro',
        titleEn: 'Length × Distance × Relativity — the metre depends on the frame',
        titleEs: 'Longitud × Distancia × Relatividad — el metro depende del marco',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: comprimento (vara) × distância (vão) × relatividade (quadro); ≠ cumprimento ≠ relativismo; c invariante; Valeu !!!',
        whyEn: 'Words: length (rod) × distance (gap) × relativity (frame); ≠ greeting ≠ relativism; c invariant; Valeu !!!',
        whyEs: 'Palabras: longitud (vara) × distancia (vano) × relatividad (marco); ≠ saludo ≠ relativismo; c invariante; ¡Valeu !!!',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT_COMP,
          WIKT_DIST,
          WIKT_REL,
          WIKT_COMPLEO,
          WIKT_DISTANTIA,
          WIKT_RELATIVUS,
          WIKI_SR,
          WIKI_GR,
          WIKI_LC,
          '/posts/post-inspecao-palavra-tempo.html',
          '/posts/post-inspecao-palavra-luz.html',
          '/posts/post-inspecao-palavra-caminho.html',
          '/posts/post-inspecao-palavra-teoria-das-cordas.html',
          '/posts/post-inspecao-expressao-missao-comprida.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes:
          'Cap. ' +
          post.seriesOrder +
          ' — três salas; contração de Lorentz como mapa; GPS apontado, não tutorial.'
      },
      ['palavra-tempo', 'palavra-luz', 'palavra-teoria-das-cordas']
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
        id: 'comprimento',
        word: 'comprimento',
        simple:
          'Lat. complēre → comprido → comprimento: extensão da vara. Trio com distância (vão) e relatividade (quadro). ≠ cumprimento. Valeu !!!',
        simpleEn:
          'Lat. complēre → comprido → comprimento: the rod’s extent. Trio with distância (gap) and relatividade (frame). ≠ greeting. Valeu !!!',
        simpleEs:
          'Lat. complēre → comprido → comprimento: extensión de la vara. Trío con distância (vano) y relatividade (marco). ≠ saludo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Comprimento vem de comprido (lat. complētus / complēre, «encher até ao bordo» → longo). Distância vem de distantia (dis- + stāre). Relatividade vem de relātīvus (referre). Einstein (1905/1915) amarrou os três: o metro depende do quadro; c não.',
        curiosities:
          'Cumprimento (saudação) é prima, não sinónimo. Longitude é o mapa, não a vara. «Tudo é relativo» é slogan; o intervalo e c são o ofício duro.',
        historyEn:
          'Portuguese comprimento comes from comprido (Lat. complētus / complēre, “fill to the brim” → long). Distância from distantia (dis- + stāre). Relatividade from relātīvus (referre). Einstein (1905/1915) tied the three: the metre depends on the frame; c does not.',
        curiositiesEn:
          'Cumprimento (greeting) is a cousin, not a synonym. Longitude is the map, not the rod. “Everything is relative” is a slogan; the interval and c are the hard craft.',
        historyEs:
          'Comprimento viene de comprido (lat. complētus / complēre, «llenar hasta el borde» → largo). Distância de distantia (dis- + stāre). Relatividade de relātīvus (referre). Einstein (1905/1915) ató los tres: el metro depende del marco; c no.',
        curiositiesEs:
          'Cumprimento (saludo) es prima, no sinónimo. Longitude es el mapa, no la vara. «Todo es relativo» es eslogan; el intervalo y c son el oficio duro.'
      },
      ['tempo', 'luz', 'caminho']
    );
    upsertItem(
      items,
      {
        id: 'distancia',
        word: 'distância',
        simple:
          'Lat. distantia ← distāre: o vão entre dois pontos, não a vara. Trio com comprimento e relatividade. Valeu !!!',
        simpleEn:
          'Lat. distantia ← distāre: the gap between two points, not the rod. Trio with comprimento and relatividade. Valeu !!!',
        simpleEs:
          'Lat. distantia ← distāre: el vano entre dos puntos, no la vara. Trío con comprimento y relatividade. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Distância herda o «estar-apartado» latino. Na geometria da parábola, cada ponto dista o mesmo do foco e da directriz. No espaço-tempo, o vão invariante é o intervalo.',
        curiosities:
          'Caminho percorrido pode ser mais longo que a distância. A relatividade não apaga o vão: muda o quadro em que se mede.',
        historyEn:
          'Distância inherits Latin “standing apart”. In the parabola’s geometry, each point is equally far from focus and directrix. In spacetime the invariant gap is the interval.',
        curiositiesEn:
          'A path travelled can be longer than the distance. Relativity does not erase the gap: it changes the frame of the measure.',
        historyEs:
          'Distância hereda el «estar-aparte» latino. En la geometría de la parábola, cada punto dista lo mismo del foco y la directriz. En el espacio-tiempo el vano invariante es el intervalo.',
        curiositiesEs:
          'El camino recorrido puede ser más largo que la distancia. La relatividad no borra el vano: cambia el marco de la medida.'
      },
      ['comprimento', 'tempo']
    );
    upsertItem(
      items,
      {
        id: 'relatividade',
        word: 'relatividade',
        simple:
          'Lat. relātīvus — teoria do quadro (1905 / 1915): comprimento e tempo medidos dependem do observador; c não. ≠ relativismo. Valeu !!!',
        simpleEn:
          'Lat. relātīvus — frame theory (1905 / 1915): measured length and time depend on the observer; c does not. ≠ relativism. Valeu !!!',
        simpleEs:
          'Lat. relātīvus — teoría del marco (1905 / 1915): longitud y tiempo medidos dependen del observador; c no. ≠ relativismo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'De relativo (relātīvus, «que se refere») o português fez o nome da teoria. Poincaré falou em princípio de relatividade; Einstein fechou a restrita (1905) e a geral (1915).',
        curiosities:
          'GPS usa as duas. Relação é prima lexical (vínculo). Relativismo é outro tribunal. A contração de Lorentz é mapa, não caderno de exercícios.',
        historyEn:
          'From relativo (relātīvus, “that refers”) Portuguese named the theory. Poincaré spoke of a principle of relativity; Einstein closed special (1905) and general (1915).',
        curiositiesEn:
          'GPS uses both. Relação is a lexical cousin (a bond). Relativism is another court. Lorentz contraction is a map, not a problem set.',
        historyEs:
          'De relativo (relātīvus, «que se refiere») el portugués hizo el nombre de la teoría. Poincaré habló de principio de relatividad; Einstein cerró la especial (1905) y la general (1915).',
        curiositiesEs:
          'El GPS usa las dos. Relação es prima léxica (vínculo). El relativismo es otro tribunal. La contracción de Lorentz es mapa, no cuaderno.'
      },
      ['comprimento', 'distancia', 'tempo']
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
      id: 'comprimento-distancia-relatividade',
      slug: 'comprimento-distancia-relatividade',
      title: 'Comprimento',
      titleEn: 'Length',
      titleEs: 'Longitud',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — a vara, o vão, o quadro; c não muda de ofício; Valeu !!!',
      teaserEn: 'BudGanja echo — the rod, the gap, the frame; c does not change jobs; Valeu !!!',
      teaserEs: 'Eco BudGanja — la vara, el vano, el marco; c no cambia de oficio; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'comprimento', 'distancia', 'relatividade']
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
