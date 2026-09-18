'use strict';

/**
 * Catálogo + i18n + inspeção plantas-medicinais · trigo (*Triticum aestivum*).
 * Cruzamento: farinha branca / glúten · riscos à saúde · como os ricos transformam.
 * Uso: node scripts/upsert-planta-trigo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
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

const SLUG = 'trigo';

const PLANT = {
  id: SLUG,
  slug: SLUG,
  nomePopular: 'Trigo',
  nomeCientifico: 'Triticum aestivum L.',
  familia: 'Poaceae',
  inspecaoDate: '2026-09-17',
  relatedUnifesp: false,
  summary:
    'Cereal (*Triticum aestivum*): a ficha separa o grão e o pão tradicional da farinha branca e do glúten em ultraprocessados — riscos à saúde e o ciclo «como os ricos transformam as coisas».',
  partsUsed: [
    'Grãos maduros (cozinha, pão de ofício, massa tradicional)',
    'Farelo e gérmen (farinha integral)',
    'Endosperma isolado (farinha branca — derivado de risco, à parte)',
    'Glúten como rede do pão vs glúten como aditivo industrial'
  ],
  traditionalUses: [
    'Pão de fermentação e massa de ofício — tradição alimentar, não protocolo',
    'Grão cozido / cuscuz de trigo em cozinhas históricas',
    'Cruzamento lab: farinha branca, glúten, Barriga de Trigo e frase-mapa dos ricos',
    'Separar a espiga do saco branqueado da fábrica'
  ],
  cautions:
    'Doença celíaca, alergia ao trigo e sensibilidade não celíaca exigem orientação profissional. Farinha branca, pão industrial e «glúten» como aditivo não são a espiga. Trigo moderno vs ancestral é debate de divulgação — esta ficha não prescreve exclusão populacional do cereal. Conteúdo educacional — não substitui consulta.',
  tags: [
    'alimento',
    'culinaria',
    'cereal',
    'poaceae',
    'gluten',
    'farinha',
    'ultraprocessado',
    'trigo'
  ],
  cover: '/imagens/plantas/trigo-cover.jpg',
  relatedInspections: [
    {
      href: '/posts/post-inspecao-derivado-gluten.html',
      label: 'Inspeção: Glúten / farinha — o derivado branco',
      labelEn: 'Inspection: Gluten / flour — the white derivative',
      labelEs: 'Inspección: Gluten / harina — el derivado blanco'
    },
    {
      href: '/posts/post-inspecao-cruzamento-farinha-branca-cocaina-branca-de-neve.html',
      label: 'Cruzamento: farinha branca × cocaína × Branca de Neve',
      labelEn: 'Cross-map: white flour × cocaine × Snow White',
      labelEs: 'Cruce: harina blanca × cocaína × Blancanieves'
    },
    {
      href: '/posts/post-inspecao-arte-barriga-de-trigo.html',
      label: 'Artes: Barriga de Trigo (William Davis)',
      labelEn: 'Arts: Wheat Belly (William Davis)',
      labelEs: 'Artes: Barriga de Trigo (William Davis)'
    },
    {
      href: '/posts/post-inspecao-artigo-wieser-duas-faces-trigo-2020.html',
      label: 'Artigo: as duas faces do trigo (Wieser, 2020)',
      labelEn: 'Article: the two faces of wheat (Wieser, 2020)',
      labelEs: 'Artículo: las dos caras del trigo (Wieser, 2020)'
    },
    {
      href: '/posts/post-inspecao-planta-soja.html',
      label: 'Inspeção: Soja — outro isolado vs o grão',
      labelEn: 'Inspection: Soy — another isolate vs the bean',
      labelEs: 'Inspección: Soja — otro aislado vs el grano'
    }
  ]
};

const PLANT_I18N = {
  nomePopularEn: 'Wheat',
  nomePopularEs: 'Trigo',
  summaryEn:
    'Cereal (*Triticum aestivum*): this sheet separates the grain and traditional bread from white flour and gluten in ultra-processed foods — health risks and the cycle “how the rich transform things”.',
  summaryEs:
    'Cereal (*Triticum aestivum*): la ficha separa el grano y el pan tradicional de la harina blanca y el gluten en ultraprocesados — riesgos para la salud y el ciclo «cómo los ricos transforman las cosas».',
  partsUsedEn: [
    'Mature grains (cooking, craft bread, traditional pasta)',
    'Bran and germ (wholemeal)',
    'Isolated endosperm (white flour — risk derivative, set apart)',
    'Gluten as bread network vs gluten as industrial additive'
  ],
  partsUsedEs: [
    'Granos maduros (cocina, pan de oficio, pasta tradicional)',
    'Salvado y germen (harina integral)',
    'Endospermo aislado (harina blanca — derivado de riesgo, aparte)',
    'Gluten como red del pan vs gluten como aditivo industrial'
  ],
  traditionalUsesEn: [
    'Leavened bread and craft pasta — food tradition, not a protocol',
    'Cooked grain / wheat couscous in historic kitchens',
    'Lab cross: white flour, gluten, Wheat Belly and the rich-transform phrase-map',
    'Keep the ear apart from the bleached factory bag'
  ],
  traditionalUsesEs: [
    'Pan de fermentación y pasta de oficio — tradición alimentaria, no protocolo',
    'Grano cocido / cuscús de trigo en cocinas históricas',
    'Cruce del lab: harina blanca, gluten, Barriga de Trigo y la frase-mapa de los ricos',
    'Separar la espiga del saco blanqueado de fábrica'
  ],
  cautionsEn:
    'Celiac disease, wheat allergy and non-celiac sensitivity need professional care. White flour, factory bread and “gluten” as additive are not the ear. Modern vs ancestral wheat is an outreach debate — this sheet does not prescribe population-wide exclusion. Educational — not a substitute for care.',
  cautionsEs:
    'Celiaquía, alergia al trigo y sensibilidad no celíaca exigen orientación profesional. Harina blanca, pan industrial y «gluten» como aditivo no son la espiga. Esta ficha no prescribe exclusión poblacional del cereal. Contenido educativo — no sustituye consulta.'
};

function ensureCatalog() {
  const data = JSON.parse(fs.readFileSync(PLANTAS_FILE, 'utf8'));
  const plants = Array.isArray(data.plants) ? data.plants : [];
  const idx = plants.findIndex((p) => p && (p.slug === SLUG || p.id === SLUG));
  if (idx >= 0) {
    plants[idx] = Object.assign({}, plants[idx], PLANT, {
      cover: plants[idx].cover || PLANT.cover
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

function nextPlantaSeriesOrder(plants, posts) {
  const used = posts
    .filter((p) => p && p.series === 'plantas-medicinais' && p.slug !== 'inspecao-planta-' + SLUG)
    .map((p) => Number(p.seriesOrder) || 0);
  const maxUsed = used.length ? Math.max.apply(null, used) : 0;
  const catalogMed = plants.filter(
    (p) => p && String(p.hubCategory || '').toLowerCase() !== 'fruto'
  );
  const catalogOrder = catalogMed.findIndex((p) => p.slug === SLUG) + 1;
  if (catalogOrder > 0 && !used.includes(catalogOrder)) return catalogOrder;
  return maxUsed + 1;
}

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'em índice', idx);
    return 'updated';
  }
  posts.unshift(post);
  console.log('Inserido', post.slug, 'no início');
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

function upsertSug(seriesOrder) {
  if (!fs.existsSync(SUG_FILE)) return;
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];
  const href = '/posts/post-inspecao-planta-' + SLUG + '.html';
  const entry = {
    id: 'planta-' + SLUG,
    title: 'Trigo — grão vs farinha branca e glúten',
    titleEn: 'Wheat — grain vs white flour and gluten',
    titleEs: 'Trigo — grano vs harina blanca y gluten',
    tipo: 'planta',
    priority: 1,
    status: 'feita',
    why:
      'Plantas: Trigo (*Triticum aestivum*) — separar a espiga da farinha branca; cruzar glúten, Barriga de Trigo e o mapa das brancas.',
    whyEn:
      'Plants: Wheat (*Triticum aestivum*) — separate the ear from white flour; cross gluten, Wheat Belly and the whites map.',
    whyEs:
      'Plantas: Trigo (*Triticum aestivum*) — separar la espiga de la harina blanca; cruzar gluten, Barriga de Trigo y el mapa de las blancas.',
    suggestedSlug: 'inspecao-planta-' + SLUG,
    doneHref: href,
    seriesHint: 'plantas-medicinais',
    sources: [
      '/plantas/' + SLUG + '/',
      '/posts/post-inspecao-derivado-gluten.html',
      '/posts/post-inspecao-cruzamento-farinha-branca-cocaina-branca-de-neve.html',
      '/posts/post-inspecao-arte-barriga-de-trigo.html',
      'https://pt.wikipedia.org/wiki/Triticum'
    ],
    notes: 'Cap. ' + seriesOrder + '; mesmo padrão da soja (17 set 2026).'
  };
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (planta-trigo)');
}

function upsertGuia() {
  if (!fs.existsSync(GUIA_FILE)) return;
  const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'trigo',
    word: 'Trigo',
    simple:
      'Triticum aestivum — grão vs farinha branca e glúten; cruzamento com Barriga de Trigo, Wieser e o mapa das brancas.',
    simpleEn:
      'Triticum aestivum — grain vs white flour and gluten; cross Wheat Belly, Wieser and the whites map.',
    simpleEs:
      'Triticum aestivum — grano vs harina blanca y gluten; cruce con Barriga de Trigo, Wieser y el mapa de las blancas.',
    group: 'tecnico',
    fromTitle: true,
    href: '/plantas/trigo/',
    history:
      'Trigo vem do latim triticum — o cereal que se tritura. A inspeção do laboratório separa a espiga da farinha branca e do glúten em ultraprocessados.',
    curiosities:
      'A ficha da planta aponta para o derivado (glúten / farinha) e para o cruzamento das brancas — sem dieta prescrita.',
    historyEn:
      'Portuguese trigo comes from Latin triticum — the cereal that is threshed. The lab inspection keeps the ear apart from white flour and ultra-processed gluten.',
    curiositiesEn:
      'The plant sheet points to the derivative (gluten / flour) and the whites cross-map — no prescribed diet.',
    historyEs:
      'Trigo viene del latín triticum — el cereal que se tritura. La inspección separa la espiga de la harina blanca y del gluten ultraprocesado.',
    curiositiesEs:
      'La ficha de la planta apunta al derivado (gluten / harina) y al cruce de las blancas — sin dieta prescrita.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === 'Trigo');
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else items.push(entry);
  guia.items = items;
  guia.updatedAt = new Date().toISOString();
  fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
  console.log('Guia de palavras actualizado (trigo)');
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
  ensureCatalog();

  const plants = loadPlantasCatalog();
  const plant = plants.find((p) => p && p.slug === SLUG);
  if (!plant) throw new Error('planta trigo ausente após ensureCatalog');

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const seriesOrder = nextPlantaSeriesOrder(plants, posts);
  const post = buildPlantaInspecaoPost(plant, seriesOrder);
  const action = upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  upsertSug(seriesOrder);
  upsertGuia();

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
  console.log('slug:', post.slug);
  console.log('seriesOrder (Cap.):', seriesOrder);
  console.log('action:', action);
  console.log('href: /posts/post-' + post.slug + '.html');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
