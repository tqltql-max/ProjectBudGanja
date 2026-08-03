'use strict';

/**
 * Garante catálogo + i18n + inspeção Cap. plantas-frutos · melancia (*Citrullus lanatus*).
 * Uso: node scripts/upsert-planta-melancia-inspecao.js
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

const SLUG = 'melancia';

const PLANT = {
  id: SLUG,
  slug: SLUG,
  nomePopular: 'Melancia',
  nomeCientifico: 'Citrullus lanatus (Thunb.) Matsum. & Nakai',
  familia: 'Cucurbitaceae',
  hubCategory: 'fruto',
  summary:
    'Cucurbitácea de verão (*Citrullus lanatus*): fruto refrescante de polpa aquosa — a ficha separa a melancia inteira dos sucos, néctares e ultraprocessados «watermelon»; cultura de feira, praia e cultivo familiar com sol na trepadeira e água na polpa.',
  partsUsed: [
    'Fruto (polpa fresca)',
    'Sementes (torradas / culinária tradicional, com moderação)',
    'Preparações culinárias de baixo processamento (suco caseiro, salada)'
  ],
  traditionalUses: [
    'Consumo do fruto fresco (verão, feira, praia)',
    'Suco e salada caseiros sem ultraprocessamento',
    'Cultura alimentar brasileira do melão-d\'água',
    'Cultivo familiar em clima quente — trepadeira com espaço e polinização'
  ],
  cautions:
    'Polpa madura é alimento comum — açúcar natural da fruta conta na dose diária. Sementes em excesso e extratos: sem automedicação. Folhas e partes verdes da cucurbitácea não são o foco alimentar desta ficha. Derivados industriais com açúcar, xaropes e aditivos entram na série Derivados de risco. Conteúdo educacional — não substitui orientação profissional.',
  tags: [
    'alimento',
    'frutos',
    'frutifera',
    'culinaria',
    'tropicais',
    'verao',
    'cucurbitaceae',
    'cultivo-familiar',
    'hidrante'
  ],
  relatedUnifesp: false,
  cover: '/imagens/plantas/melancia-cover.jpg',
  relatedInspections: []
};

const PLANT_I18N = {
  nomePopularEn: 'Watermelon',
  nomePopularEs: 'Sandía',
  summaryEn:
    'Summer cucurbit (*Citrullus lanatus*): refreshing watery pulp — this sheet separates whole watermelon from juices, nectars and ultra-processed «watermelon»; market, beach and light home-grow culture.',
  summaryEs:
    'Cucurbitácea de verano (*Citrullus lanatus*): pulpa acuosa refrescante — la ficha separa la sandía entera de jugos, néctares y ultraprocesados «watermelon»; cultura de feria, playa y cultivo familiar ligero.',
  partsUsedEn: [
    'Fruit (fresh pulp)',
    'Seeds (toasted / traditional cooking, in moderation)',
    'Low-process culinary uses (homemade juice, salad)'
  ],
  partsUsedEs: [
    'Fruto (pulpa fresca)',
    'Semillas (tostadas / cocina tradicional, con moderación)',
    'Usos culinarios de bajo procesamiento (jugo casero, ensalada)'
  ],
  traditionalUsesEn: [
    'Fresh fruit (summer, market, beach)',
    'Homemade juice and salad without ultra-processing',
    'Food culture of watermelon',
    'Family growing in warm climates — vine with space and pollination'
  ],
  traditionalUsesEs: [
    'Fruto fresco (verano, feria, playa)',
    'Jugo y ensalada caseros sin ultraprocesamiento',
    'Cultura alimentaria de la sandía',
    'Cultivo familiar en clima cálido — enredadera con espacio y polinización'
  ],
  cautionsEn:
    'Ripe pulp is common food — natural fruit sugar counts in daily dose. Excess seeds and extracts: no self-medication. Green plant parts are not the food focus of this sheet. Industrial derivatives with sugar/syrups/additives belong in Risk derivatives. Educational — not professional advice.',
  cautionsEs:
    'La pulpa madura es alimento común — el azúcar natural cuenta en la dosis diaria. Semillas en exceso y extractos: sin automedicación. Partes verdes no son el foco alimentario. Derivados industriales entran en Derivados de riesgo. Contenido educativo — no sustituye orientación profesional.'
};

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
  fs.writeFileSync(PLANTAS_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(PLANTAS_I18N_FILE, 'utf8'));
  if (!i18n.plants) i18n.plants = {};
  i18n.plants[SLUG] = Object.assign({}, PLANT_I18N, i18n.plants[SLUG] || {});
  // Prefer our summaries for this species (overwrite thin merges).
  i18n.plants[SLUG] = Object.assign({}, i18n.plants[SLUG], PLANT_I18N);
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
  // Prefer catalog index; if another Cap already holds it, take next free.
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
  const fruitHref = '/posts/post-inspecao-planta-' + SLUG + '.html';
  const entry = {
    id: 'fruto-' + SLUG,
    title: 'Melancia — fruto vs indústria',
    titleEn: 'Watermelon — fruit vs industry',
    titleEs: 'Sandía — fruto vs industria',
    tipo: 'fruto',
    priority: 3,
    status: 'feita',
    why:
      'Frutos: Melancia no hub — crédito ao fruto inteiro (polpa aquosa de verão); sofrimento industrial = sucos, néctares e ultraprocessados «watermelon».',
    whyEn:
      'Fruits: Watermelon on hub — credit whole fruit (summer watery pulp); industrial path = juices, nectars and ultra-processed «watermelon».',
    whyEs:
      'Frutos: Sandía en el hub — crédito al fruto entero; vía industrial = jugos, néctares y ultraprocesados «watermelon».',
    suggestedSlug: 'inspecao-planta-' + SLUG,
    doneHref: fruitHref,
    seriesHint: 'plantas-frutos',
    sources: [
      'https://pt.wikipedia.org/wiki/Melancia',
      '/plantas/' + SLUG + '/'
    ],
    notes:
      'hubCategory: fruto; Cap. ' +
      seriesOrder +
      '; elos palavra planta/fruto; par Derivados quando aplicável.'
  };
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);

  const derivId = 'derivado-' + SLUG;
  if (!items.some((x) => x.id === derivId)) {
    items.push({
      id: derivId,
      title: 'Derivados da melancia — sucos, néctares e ultraprocessados',
      titleEn: 'Watermelon derivatives — juices, nectars and ultra-processed',
      titleEs: 'Derivados de la sandía — jugos, néctares y ultraprocesados',
      tipo: 'derivado',
      priority: 3,
      status: 'ideia',
      why:
        'Derivados de risco: melancia inteira vs matriz industrial (suco, néctar, snacks «watermelon»); cruzar com cana/açúcares livres.',
      whyEn:
        'Risk derivatives: whole watermelon vs industrial matrix; cross free sugars / sugarcane.',
      whyEs:
        'Derivados de riesgo: sandía entera vs matriz industrial; cruzar azúcares libres / caña.',
      suggestedSlug: 'inspecao-derivado-' + SLUG,
      seriesHint: 'plantas-derivados-risco',
      sources: [
        'https://pt.wikipedia.org/wiki/Melancia',
        fruitHref,
        '/posts/post-inspecao-derivado-cana-de-acucar.html',
        '/biblioteca/inspecoes/#inspecoes-frutos'
      ],
      notes: 'Fruto ≠ vilão; foco açúcar × aditivos × dose.'
    });
  }

  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (fruto-melancia)');
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
  if (!plant) throw new Error('planta melancia ausente após ensureCatalog');

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const seriesOrder = nextFrutoSeriesOrder(plants, posts);
  const post = buildPlantaInspecaoPost(plant, seriesOrder);
  const action = upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  upsertSug(seriesOrder);

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
