'use strict';

/**
 * Catálogo + i18n + inspeção plantas-medicinais · soja (*Glycine max*).
 * Cruzamento: glúten / farinha branca · riscos à saúde · como os ricos transformam.
 * Uso: node scripts/upsert-planta-soja-inspecao.js
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

const SLUG = 'soja';

const PLANT = {
  id: SLUG,
  slug: SLUG,
  nomePopular: 'Soja',
  nomeCientifico: 'Glycine max (L.) Merr.',
  familia: 'Fabaceae',
  inspecaoDate: '2026-09-17',
  relatedUnifesp: true,
  summary:
    'Leguminosa (*Glycine max*): a ficha separa o feijão (edamame, tofu, miso) do isolado, do óleo e da matriz ultraprocessada com glúten e farinha branca — riscos à saúde e o ciclo «como os ricos transformam as coisas».',
  partsUsed: [
    'Grãos maduros (cozinha, tofu tradicional)',
    'Vagens imaturas (edamame)',
    'Fermentados tradicionais (miso, tempeh, shoyu)',
    'Derivados industriais à parte (óleo, lecitina, isolado, proteína texturizada)'
  ],
  traditionalUses: [
    'Cozinha do feijão — edamame, tofu, tempeh, miso (ofício alimentar, não protocolo)',
    'Isoflavona como fitoterápico padronizado (RENAME) — identidade, não automedicação',
    'Citação no curso UNIFESP: Cerrado vs monocultura; interesse no endocanabinoidoma (FAAH)',
    'Cruzamento lab: glúten / farinha branca, ultraprocessados e frase-mapa dos ricos'
  ],
  cautions:
    'Alergia à soja é eixo clínico. Isolados, leites vegetais adoçados, óleo de fritura e «carne» de fábrica não são o feijão. Isoflavona em cápsula exige orientação profissional. Soja transgénica / agrotóxico é risco de cadeia, não prova de que o grão tradicional seja veneno. Conteúdo educacional — não substitui consulta.',
  tags: [
    'alimento',
    'culinaria',
    'leguminosa',
    'fabaceae',
    'isoflavona',
    'ultraprocessado',
    'cerrado',
    'unifesp'
  ],
  cover: '/imagens/plantas/soja-cover.jpg',
  relatedInspections: [
    {
      href: '/posts/post-inspecao-derivado-gluten.html',
      label: 'Inspeção: Glúten / farinha — trigo e proteína nociva',
      labelEn: 'Inspection: Gluten / flour — wheat protein of concern',
      labelEs: 'Inspección: Gluten / harina — trigo y proteína nociva'
    },
    {
      href: '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html',
      label: 'Inspeção: Como os ricos transformam as coisas',
      labelEn: 'Inspection: How the rich transform things',
      labelEs: 'Inspección: Cómo los ricos transforman las cosas'
    },
    {
      href: '/posts/post-inspecao-palavra-risco.html',
      label: 'Inspeção: Palavra — risco',
      labelEn: 'Inspection: Word — risk',
      labelEs: 'Inspección: Palabra — riesgo'
    },
    {
      href: '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html',
      label: 'Artigo: ultraprocessados (Hall et al., 2019)',
      labelEn: 'Article: ultra-processed foods (Hall et al., 2019)',
      labelEs: 'Artículo: ultraprocesados (Hall et al., 2019)'
    },
    {
      href: '/posts/post-inspecao-conto-vida-sementinha-jogo.html',
      label: 'Conto: A Sementinha e o jogo da cidade (a soja do GTA)',
      labelEn: 'Story: The Little Seed and the city game (GTA soy)',
      labelEs: 'Cuento: La Semillita y el juego de la ciudad (soja del GTA)'
    }
  ]
};

const PLANT_I18N = {
  nomePopularEn: 'Soybean',
  nomePopularEs: 'Soja',
  summaryEn:
    'Legume (*Glycine max*): this sheet separates the bean (edamame, tofu, miso) from isolate, oil and the ultra-processed matrix with gluten and white flour — health risks and the cycle “how the rich transform things”.',
  summaryEs:
    'Leguminosa (*Glycine max*): la ficha separa el grano (edamame, tofu, miso) del aislado, el aceite y la matriz ultraprocesada con gluten y harina blanca — riesgos para la salud y el ciclo «cómo los ricos transforman las cosas».',
  partsUsedEn: [
    'Mature beans (cooking, traditional tofu)',
    'Immature pods (edamame)',
    'Traditional ferments (miso, tempeh, shoyu)',
    'Industrial derivatives set apart (oil, lecithin, isolate, textured protein)'
  ],
  partsUsedEs: [
    'Granos maduros (cocina, tofu tradicional)',
    'Vainas inmaduras (edamame)',
    'Fermentados tradicionales (miso, tempeh, shoyu)',
    'Derivados industriales aparte (aceite, lecitina, aislado, proteína texturizada)'
  ],
  traditionalUsesEn: [
    'Bean kitchen — edamame, tofu, tempeh, miso (food craft, not a protocol)',
    'Isoflavone as a standardized herbal (RENAME) — identity, not self-medication',
    'UNIFESP course: Cerrado vs monoculture; endocannabinoid axis (FAAH) interest',
    'Lab cross: gluten / white flour, ultra-processed foods and the rich-transform phrase-map'
  ],
  traditionalUsesEs: [
    'Cocina del grano — edamame, tofu, tempeh, miso (oficio alimentario, no protocolo)',
    'Isoflavona como fitoterápico padronizado (RENAME) — identidad, no automedicación',
    'Curso UNIFESP: Cerrado vs monocultivo; interés en el endocannabinoidoma (FAAH)',
    'Cruce del lab: gluten / harina blanca, ultraprocesados y la frase-mapa de los ricos'
  ],
  cautionsEn:
    'Soy allergy is a clinical axis. Isolates, sweetened plant milks, frying oil and factory “meat” are not the bean. Isoflavone capsules need professional guidance. GMO / agrochemical soy is a supply-chain risk, not proof that the traditional bean is poison. Educational — not a substitute for care.',
  cautionsEs:
    'La alergia a la soja es eje clínico. Aislados, leches vegetales azucaradas, aceite de fritura y «carne» de fábrica no son el grano. Isoflavona en cápsula exige orientación profesional. Soja transgénica / agrotóxico es riesgo de cadena. Contenido educativo — no sustituye consulta.'
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
    title: 'Soja — feijão vs isolado, glúten e farinha branca',
    titleEn: 'Soy — bean vs isolate, gluten and white flour',
    titleEs: 'Soja — grano vs aislado, gluten y harina blanca',
    tipo: 'planta',
    priority: 1,
    status: 'feita',
    why:
      'Plantas: Soja (*Glycine max*) — separar o feijão da matriz industrial; cruzar glúten / farinha branca, riscos à saúde e «como os ricos transformam».',
    whyEn:
      'Plants: Soy (*Glycine max*) — separate the bean from the industrial matrix; cross gluten / white flour, health risks and “how the rich transform”.',
    whyEs:
      'Plantas: Soja (*Glycine max*) — separar el grano de la matriz industrial; cruzar gluten / harina blanca, riesgos y «cómo los ricos transforman».',
    suggestedSlug: 'inspecao-planta-' + SLUG,
    doneHref: href,
    seriesHint: 'plantas-medicinais',
    sources: [
      '/plantas/' + SLUG + '/',
      '/posts/post-inspecao-derivado-gluten.html',
      '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html',
      '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html',
      '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html',
      'https://pt.wikipedia.org/wiki/Soja'
    ],
    notes: 'Cap. ' + seriesOrder + '; cruzamento pedido 17 set 2026 (sementinha / GTA soja).'
  };
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (planta-soja)');
}

function upsertGuia() {
  if (!fs.existsSync(GUIA_FILE)) return;
  const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'soja',
    word: 'Soja',
    simple:
      'Glycine max — feijão vs isolado/óleo; cruzamento com glúten, farinha branca, riscos à saúde e «como os ricos transformam». Citada nas aulas XIV (UNIFESP).',
    simpleEn:
      'Glycine max — bean vs isolate/oil; cross gluten, white flour, health risks and “how the rich transform”. Cited in XIV lessons (UNIFESP).',
    simpleEs:
      'Glycine max — grano vs aislado/aceite; cruce con gluten, harina blanca, riesgos y «cómo los ricos transforman». Citada en las clases XIV (UNIFESP).',
    group: 'tecnico',
    fromTitle: false,
    href: '/plantas/soja/',
    history:
      'Soja veio do japonês shōyu / chinês via neerlandês e nomeia Glycine max. Isoflavonas, desmatamento e a matriz industrial (glúten + farinha branca) entram no discurso agrícola, de fitoterapia e de risco.',
    curiosities:
      'A inspeção do laboratório separa o feijão do isolado. No conto da sementinha, a soja do GTA é o emprego lento que o jogo paga o dobro para abandonar.',
    historyEn:
      'Portuguese soja came from Japanese shōyu / Chinese via Dutch and names Glycine max. Isoflavones, deforestation and the industrial matrix (gluten + white flour) enter agrarian, herbal and risk speech.',
    curiositiesEn:
      'The lab inspection separates the bean from the isolate. In the little-seed story, GTA soy is the slow job the game pays double to leave.',
    historyEs:
      'Soja vino del japonés shōyu / chino vía neerlandés y nombra Glycine max. Isoflavonas, deforestación y la matriz industrial (gluten + harina blanca) entran en el discurso agrario, de fitoterapia y de riesgo.',
    curiositiesEs:
      'La inspección del laboratorio separa el grano del aislado. En el cuento, la soja del GTA es el trabajo lento que el juego paga el doble para abandonar.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === 'Soja');
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else items.push(entry);
  guia.items = items;
  guia.updatedAt = new Date().toISOString();
  fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
  console.log('Guia de palavras actualizado (soja)');
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
  if (!plant) throw new Error('planta soja ausente após ensureCatalog');

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
