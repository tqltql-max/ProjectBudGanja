'use strict';

/**
 * Garante catálogo + i18n + inspeção plantas-frutos · marolo (*Annona crassiflora*).
 * Uso: node scripts/upsert-planta-marolo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildPlantaInspecaoPost,
  loadPlantasCatalog
} = require('../lib/plantas-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const PLANTAS_FILE = path.join(ROOT, 'content', 'plantas.json');
const PLANTAS_I18N_FILE = path.join(ROOT, 'content', 'plantas-i18n.json');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const SLUG = 'marolo';
const HREF = '/posts/post-inspecao-planta-marolo.html';

const PLANT = {
  id: SLUG,
  slug: SLUG,
  nomePopular: 'Marolo',
  nomeCientifico: 'Annona crassiflora Mart.',
  familia: 'Annonaceae',
  hubCategory: 'fruto',
  inspecaoDate: '2026-08-23',
  summary:
    'Anonácea nativa do Cerrado (*Annona crassiflora*): marolo / araticum-do-cerrado — polpa cremosa, muitas sementes; a ficha separa o fruto inteiro de maracujá, mamão, pinha/ata e graviola, e dos néctares e doces industriais.',
  partsUsed: [
    'Fruto (polpa fresca madura)',
    'Preparações culinárias de baixo processamento (doce, suco, sorvete caseiros)'
  ],
  traditionalUses: [
    'Consumo da polpa madura (feira, quintal, Cerrado / Minas Gerais)',
    'Doces e sucos caseiros sem ultraprocessamento',
    'Cultura alimentar do araticum / marolo no bioma Cerrado'
  ],
  cautions:
    'Polpa madura é alimento tradicional. Sementes e folhas de Annonaceae não são chá genérico nem extracto caseiro. Não confundir com maracujá, mamão, pinha/ata ou graviola. Derivados industriais com açúcar entram na série Derivados de risco. Conteúdo educacional — não substitui orientação profissional nem manejo do bioma.',
  tags: [
    'alimento',
    'frutos',
    'frutifera',
    'culinaria',
    'cerrado',
    'nativas',
    'annonaceae',
    'araticum',
    'minas-gerais'
  ],
  relatedUnifesp: false,
  cover: '/imagens/plantas/marolo-cover.jpg',
  relatedInspections: []
};

const PLANT_I18N = {
  nomePopularEn: 'Marolo (Cerrado araticum)',
  nomePopularEs: 'Marolo (araticum del Cerrado)',
  summaryEn:
    'Native Cerrado Annonaceae (*Annona crassiflora*): marolo / araticum — creamy pulp, many seeds; this sheet separates the whole fruit from passion fruit, papaya, sugar-apple and soursop, and from industrial nectars and sweets.',
  summaryEs:
    'Anonácea nativa del Cerrado (*Annona crassiflora*): marolo / araticum — pulpa cremosa, muchas semillas; la ficha separa el fruto entero de maracuyá, papaya, anón y guanábana, y de néctares y dulces industriales.',
  partsUsedEn: [
    'Fruit (ripe fresh pulp)',
    'Low-process culinary uses (home sweet, juice, ice cream)'
  ],
  partsUsedEs: [
    'Fruto (pulpa fresca madura)',
    'Usos culinarios de bajo procesamiento (dulce, jugo, helado caseros)'
  ],
  traditionalUsesEn: [
    'Ripe pulp (market, yard, Cerrado / Minas Gerais)',
    'Home sweets and juices without ultra-processing',
    'Food culture of araticum / marolo in the Cerrado'
  ],
  traditionalUsesEs: [
    'Pulpa madura (feria, patio, Cerrado / Minas Gerais)',
    'Dulces y jugos caseros sin ultraprocesamiento',
    'Cultura alimentaria del araticum / marolo en el Cerrado'
  ],
  cautionsEn:
    'Ripe pulp is traditional food. Annonaceae seeds and leaves are not a generic tea or home extract. Do not confuse with passion fruit, papaya, sugar-apple or soursop. Industrial sugary derivatives belong in Risk derivatives. Educational — not professional advice or biome management.',
  cautionsEs:
    'La pulpa madura es alimento tradicional. Semillas y hojas de Annonaceae no son té genérico ni extracto casero. No confundir con maracuyá, papaya, anón o guanábana. Derivados industriales azucarados entran en Derivados de riesgo. Contenido educativo — no sustituye orientación profesional.'
};

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

function ensureCatalog() {
  const data = JSON.parse(fs.readFileSync(PLANTAS_FILE, 'utf8'));
  const plants = Array.isArray(data.plants) ? data.plants : [];
  const idx = plants.findIndex((p) => p && (p.slug === SLUG || p.id === SLUG));
  if (idx >= 0) {
    plants[idx] = Object.assign({}, plants[idx], PLANT, {
      cover: plants[idx].cover || PLANT.cover,
      relatedInspections: plants[idx].relatedInspections || []
    });
    console.log('Catálogo actualizado:', SLUG);
  } else {
    plants.push(PLANT);
    console.log('Catálogo inserido:', SLUG);
  }
  data.plants = plants;
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(PLANTAS_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(PLANTAS_I18N_FILE, 'utf8'));
  if (!i18n.plants) i18n.plants = {};
  i18n.plants[SLUG] = Object.assign({}, i18n.plants[SLUG] || {}, PLANT_I18N);
  fs.writeFileSync(PLANTAS_I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');
  console.log('plantas-i18n OK:', SLUG);
}

function nextFrutoSeriesOrder(plants, posts) {
  const frutos = plants.filter(
    (p) => p && String(p.hubCategory || '').toLowerCase() === 'fruto'
  );
  const catalogOrder = frutos.findIndex((p) => p.slug === SLUG) + 1;
  const used = posts
    .filter((p) => p && p.series === 'plantas-frutos' && p.slug !== 'inspecao-planta-' + SLUG)
    .map((p) => Number(p.seriesOrder) || 0);
  const maxUsed = used.length ? Math.max.apply(null, used) : 0;
  if (catalogOrder > 0 && !used.includes(catalogOrder)) return catalogOrder;
  return maxUsed + 1;
}

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
    return 'updated';
  }
  posts.unshift(post);
  console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
  return 'created';
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
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename || 'posts/post-' + post.slug + '.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss) {
  const mainKey = 'marolo';
  const mainLine =
    '    marolo: { tone: "warm", category: "Fruto", mundane: "Annona crassiflora — araticum-do-cerrado; polpa cremosa.", gloss: "Tupi aratiku / MG marolo — ≠ maracujá ≠ mamão ≠ pinha; Valeu !!!", href: "' +
    HREF +
    '", en: "marolo / Cerrado araticum", es: "marolo / araticum" },\n';
  const aliases =
    '    araticum: { gloss: "Nome tupi (aratiku) de várias anonáceas — nesta ficha, A. crassiflora / marolo.", href: "' +
    HREF +
    '", en: "araticum", es: "araticum" },\n' +
    '    "araticum-do-cerrado": { gloss: "Marolo — Annona crassiflora; ver marolo.", href: "' +
    HREF +
    '", en: "Cerrado araticum", es: "araticum del Cerrado" },\n';
  if (new RegExp('    ' + mainKey + ':\\s*\\{').test(gloss)) {
    return gloss.replace(
      new RegExp('    ' + mainKey + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
  }
  const inserted = insertAfterKey(gloss, 'fruto', mainLine + aliases);
  if (!inserted) console.warn('Aviso: glossário — inserção falhou para marolo');
  return inserted || gloss;
}

function upsertSug(seriesOrder) {
  if (!fs.existsSync(SUG_FILE)) return;
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];
  const entry = {
    id: 'fruto-' + SLUG,
    title: 'Marolo — araticum do Cerrado vs maracujá / mamão / pinha',
    titleEn: 'Marolo — Cerrado araticum vs passion fruit / papaya / sugar-apple',
    titleEs: 'Marolo — araticum del Cerrado vs maracuyá / papaya / anón',
    tipo: 'fruto',
    priority: 2,
    status: 'feita',
    why:
      'Frutos: Marolo (*Annona crassiflora*) — crédito à polpa nativa; ≠ maracujá ≠ mamão ≠ pinha; Valeu !!!',
    whyEn:
      'Fruits: Marolo (*Annona crassiflora*) — credit native pulp; ≠ passion fruit ≠ papaya ≠ sugar-apple; Valeu !!!',
    whyEs:
      'Frutos: Marolo (*Annona crassiflora*) — crédito a la pulpa nativa; ≠ maracuyá ≠ papaya ≠ anón; ¡Valeu !!!',
    suggestedSlug: 'inspecao-planta-' + SLUG,
    doneHref: HREF,
    seriesHint: 'plantas-frutos',
    sources: [
      'https://pt.wikipedia.org/wiki/Annona_crassiflora',
      '/plantas/' + SLUG + '/',
      '/posts/post-inspecao-palavra-fruto.html'
    ],
    notes: 'hubCategory: fruto; Cap. ' + seriesOrder + '; cola de orelha marolo × maracujá.'
  };
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);

  const derivId = 'derivado-' + SLUG;
  if (!items.some((x) => x.id === derivId)) {
    items.push({
      id: derivId,
      title: 'Derivados do marolo — polpas, néctares e licores',
      titleEn: 'Marolo derivatives — pulps, nectars and liqueurs',
      titleEs: 'Derivados del marolo — pulpas, néctares y licores',
      tipo: 'derivado',
      priority: 3,
      status: 'ideia',
      why:
        'Derivados de risco: marolo inteiro vs polpa adoçada, néctar e licor industrial; cruzar açúcares livres.',
      whyEn:
        'Risk derivatives: whole marolo vs sweetened pulp, nectar and industrial liqueur; cross free sugars.',
      whyEs:
        'Derivados de riesgo: marolo entero vs pulpa endulzada, néctar y licor industrial; cruzar azúcares libres.',
      suggestedSlug: 'inspecao-derivado-' + SLUG,
      seriesHint: 'plantas-derivados-risco',
      sources: [
        'https://pt.wikipedia.org/wiki/Annona_crassiflora',
        HREF,
        '/posts/post-inspecao-derivado-cana-de-acucar.html',
        '/biblioteca/inspecoes/#inspecoes-frutos'
      ],
      notes: 'Fruto ≠ vilão; foco açúcar × aditivos × dose. Sem extracto de semente.'
    });
  }

  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (fruto-marolo)');
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'marolo',
    word: 'marolo',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Annona crassiflora — araticum-do-cerrado; ≠ maracujá ≠ mamão ≠ pinha; Valeu !!!',
    simpleEn:
      'Annona crassiflora — Cerrado araticum; ≠ passion fruit ≠ papaya ≠ sugar-apple; Valeu !!!',
    simpleEs:
      'Annona crassiflora — araticum del Cerrado; ≠ maracuyá ≠ papaya ≠ anón; ¡Valeu !!!',
    history:
      'Marolo é o nome mineiro do araticum (tupi aratiku). O binómio é Annona crassiflora, nativo do Cerrado — não é maracujá nem mamão.',
    curiosities:
      'Pedido «Fruto Marolo»: a palavra fruto é outra ficha; aqui inspeciona-se a espécie. Cola de orelha com maracujá.',
    historyEn:
      'Marolo is the Minas name for araticum (Tupi aratiku). The binomial is Annona crassiflora, native to the Cerrado — not passion fruit or papaya.',
    curiositiesEn:
      'Request “Fruto Marolo”: the word fruit is another sheet; here the species is inspected. Ear glue with maracujá.',
    historyEs:
      'Marolo es el nombre mineiro del araticum (tupí aratiku). El binomio es Annona crassiflora, nativo del Cerrado.',
    curiositiesEs:
      'Pedido «Fruto Marolo»: la palabra fruto es otra ficha; aquí se inspecciona la especie. La oreja pega con maracuyá.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'fruto');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
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
    execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-marolo-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  ensureCatalog();

  const plants = loadPlantasCatalog();
  const plant = plants.find((p) => p && p.slug === SLUG);
  if (!plant) throw new Error('planta marolo ausente após ensureCatalog');

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const seriesOrder = nextFrutoSeriesOrder(plants, posts);
  const post = buildPlantaInspecaoPost(plant, seriesOrder);
  const action = upsertPost(posts, post);
  writeHtml(post);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  upsertSug(seriesOrder);

  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  upsertGuia(guia);
  guia.updatedAt = new Date().toISOString();

  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';
  if (gloss) {
    gloss = patchGlossary(gloss);
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (marolo)');
  }

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(GUIA_FILE, guia);

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
  console.log('slug:', post.slug);
  console.log('seriesOrder (Cap.):', seriesOrder);
  console.log('action:', action);
  console.log('href:', HREF);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
