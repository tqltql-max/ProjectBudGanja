'use strict';

/**
 * Catálogo + i18n + inspeção plantas-medicinais · alecrim-do-campo (*Baccharis dracunculifolia*).
 * Uso: node scripts/upsert-planta-alecrim-do-campo-inspecao.js
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

const SLUG = 'alecrim-do-campo';

const PLANT = {
  id: SLUG,
  slug: SLUG,
  nomePopular: 'Alecrim-do-campo',
  nomeCientifico: 'Baccharis dracunculifolia DC.',
  familia: 'Asteraceae',
  inspecaoDate: '2026-08-21',
  summary:
    'Arbusto nativo do Cerrado (*Baccharis dracunculifolia*) — alecrim dourado / vassourinha; fonte botânica da própolis verde (artepillina C). Não confundir com o alecrim de cozinha (*Salvia rosmarinus*).',
  partsUsed: [
    'Folhas e ápices vegetativos (infusão tradicional)',
    'Flores / inflorescências amarelo-ouro',
    'Resina dos brotos (colheita pelas abelhas → própolis verde)'
  ],
  traditionalUses: [
    'Infusão popular de folhas e flores (ofício cultural, não posologia clínica)',
    'Tradição digestiva, respiratória e de bochechos antissépticos',
    'Fonte botânica da própolis verde brasileira (*Apis mellifera*)',
    'Espécie pioneira em recuperação de áreas degradadas (contexto ecológico)'
  ],
  cautions:
    'Contraindicado em gravidez e lactação. Não recomendado a menores de 12 anos. Diabéticos sob hipoglicemiantes: monitorizar glicose — o chá não substitui fármaco. Evitar uso excessivo ou prolongado sem orientação. Não confundir com alecrim de cozinha (*Salvia rosmarinus*) nem com carqueja (*Baccharis trimera*). Conteúdo educacional — evite automedicação.',
  tags: [
    'nativa',
    'cerrado',
    'baccharis',
    'propolis',
    'cha',
    'aromatica',
    'asteraceae',
    'campo'
  ],
  relatedUnifesp: false,
  cover: '/imagens/plantas/alecrim-do-campo-cover.jpg',
  relatedInspections: [
    {
      href: '/posts/post-inspecao-planta-alecrim.html',
      label: 'Inspeção: Alecrim de cozinha (*Salvia rosmarinus*) — não confundir',
      labelEn: 'Inspection: Kitchen rosemary (*Salvia rosmarinus*) — do not confuse',
      labelEs: 'Inspección: Romero de cocina (*Salvia rosmarinus*) — no confundir'
    },
    {
      href: '/posts/post-inspecao-planta-carqueja.html',
      label: 'Inspeção: Carqueja (*Baccharis trimera*) — mesmo género',
      labelEn: 'Inspection: Carqueja (*Baccharis trimera*) — same genus',
      labelEs: 'Inspección: Carqueja (*Baccharis trimera*) — mismo género'
    },
    {
      href: '/posts/post-inspecao-animal-abelha.html',
      label: 'Inspeção: Abelha — própolis, mel e cadeia da colmeia',
      labelEn: 'Inspection: Honeybee — propolis, honey and hive chain',
      labelEs: 'Inspección: Abeja — propóleo, miel y cadena de la colmena'
    }
  ]
};

const PLANT_I18N = {
  nomePopularEn: 'Field rosemary (alecrim-do-campo)',
  nomePopularEs: 'Alecrim-do-campo (romero de campo)',
  summaryEn:
    'Cerrado native shrub (*Baccharis dracunculifolia*) — golden rosemary / vassourinha; botanical source of Brazilian green propolis (artepillin C). Do not confuse with kitchen rosemary (*Salvia rosmarinus*).',
  summaryEs:
    'Arbusto nativo del Cerrado (*Baccharis dracunculifolia*) — romero dorado / vassourinha; fuente botánica del propóleo verde brasileño (artepilina C). No confundir con el romero de cocina (*Salvia rosmarinus*).',
  partsUsedEn: [
    'Leaves and vegetative apices (traditional infusion)',
    'Flowers / golden inflorescences',
    'Bud resin (collected by bees → green propolis)'
  ],
  partsUsedEs: [
    'Hojas y ápices vegetativos (infusión tradicional)',
    'Flores / inflorescencias amarillo-oro',
    'Resina de brotes (cosecha por abejas → propóleo verde)'
  ],
  traditionalUsesEn: [
    'Folk infusion of leaves and flowers (cultural craft, not clinical posology)',
    'Digestive, respiratory and antiseptic-rinse tradition',
    'Botanical source of Brazilian green propolis (*Apis mellifera*)',
    'Pioneer species in restoring degraded land (ecological context)'
  ],
  traditionalUsesEs: [
    'Infusión popular de hojas y flores (oficio cultural, no posología clínica)',
    'Tradición digestiva, respiratoria y de enjuagues antisépticos',
    'Fuente botánica del propóleo verde brasileño (*Apis mellifera*)',
    'Especie pionera en recuperación de áreas degradadas (contexto ecológico)'
  ],
  cautionsEn:
    'Contraindicated in pregnancy and nursing. Not recommended under age 12. People on hypoglycemics: monitor glucose — tea does not replace medicine. Avoid excessive or prolonged use without guidance. Do not confuse with kitchen rosemary (*Salvia rosmarinus*) or carqueja (*Baccharis trimera*). Educational — avoid self-medication.',
  cautionsEs:
    'Contraindicado en embarazo y lactancia. No recomendado menores de 12 años. Diabéticos con hipoglucemiantes: monitorizar glucosa — el té no sustituye fármaco. Evitar uso excesivo o prolongado sin orientación. No confundir con romero de cocina (*Salvia rosmarinus*) ni carqueja (*Baccharis trimera*). Contenido educativo — evite automedicación.'
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
    title: 'Alecrim-do-campo — artepillina C e própolis verde',
    titleEn: 'Field rosemary — artepillin C and green propolis',
    titleEs: 'Alecrim-do-campo — artepilina C y propóleo verde',
    tipo: 'planta',
    priority: 2,
    status: 'feita',
    why:
      'Plantas: Alecrim-do-campo (*Baccharis dracunculifolia*) — foto de campo 21 ago 2026; distinguir do alecrim de cozinha; elo própolis verde / abelha.',
    whyEn:
      'Plants: Field rosemary (*Baccharis dracunculifolia*) — field photo 21 Aug 2026; distinguish from kitchen rosemary; green propolis / bee link.',
    whyEs:
      'Plantas: Alecrim-do-campo (*Baccharis dracunculifolia*) — foto de campo 21 ago 2026; distinguir del romero de cocina; vínculo propóleo verde / abeja.',
    suggestedSlug: 'inspecao-planta-' + SLUG,
    doneHref: href,
    seriesHint: 'plantas-medicinais',
    sources: [
      'https://notebook.google.com/notebook/2b56e328-3c46-4586-b079-6d480f280267',
      'https://doi.org/10.3389/fphar.2022.1048688',
      '/plantas/' + SLUG + '/',
      '/posts/post-inspecao-planta-alecrim.html',
      '/posts/post-inspecao-planta-carqueja.html',
      '/posts/post-inspecao-animal-abelha.html'
    ],
    notes:
      'Cap. ' +
      seriesOrder +
      '; foto de campo do inspetor; guia terapêutico popular lido com cautela (não copiar alegações clínicas).'
  };
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (planta-alecrim-do-campo)');
}

function upsertGuia() {
  if (!fs.existsSync(GUIA_FILE)) return;
  const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'alecrim-do-campo',
    word: 'Alecrim-do-campo',
    simple:
      'Baccharis dracunculifolia — alecrim dourado / vassourinha do Cerrado; fonte da própolis verde (artepillina C). Não é o alecrim de cozinha (*Salvia rosmarinus*).',
    simpleEn:
      'Baccharis dracunculifolia — Cerrado field rosemary / vassourinha; source of green propolis (artepillin C). Not kitchen rosemary (*Salvia rosmarinus*).',
    simpleEs:
      'Baccharis dracunculifolia — romero de campo / vassourinha del Cerrado; fuente del propóleo verde (artepilina C). No es el romero de cocina (*Salvia rosmarinus*).',
    group: 'tecnico',
    fromTitle: false,
    href: '/plantas/alecrim-do-campo/',
    history:
      'Alecrim-do-campo, alecrim dourado e vassourinha nomeiam Baccharis dracunculifolia (Asteraceae), arbusto nativo da América do Sul. O epíteto dracunculifolia descreve a folha estreita. As abelhas colhem a resina dos brotos para a própolis verde brasileira.',
    curiosities:
      'A foto de campo do inspetor (21 de agosto de 2026) documenta o arbusto em jardim doméstico. A inspeção separa ofício de chá popular de alegação clínica — o guia terapêutico consultado não vira protocolo do laboratório.',
    historyEn:
      'Field rosemary, golden rosemary and vassourinha name Baccharis dracunculifolia (Asteraceae), a South American shrub. The epithet dracunculifolia describes the narrow leaf. Bees collect bud resin for Brazilian green propolis.',
    curiositiesEn:
      'The inspector field photo (21 August 2026) documents the shrub in a home garden. The inspection keeps folk tea craft apart from clinical claims.',
    historyEs:
      'Alecrim-do-campo, alecrim dourado y vassourinha nombran Baccharis dracunculifolia (Asteraceae), arbusto nativo de Sudamérica. El epíteto dracunculifolia describe la hoja estrecha. Las abejas recolectan la resina de los brotes para el propóleo verde brasileño.',
    curiositiesEs:
      'La foto de campo del inspector (21 de agosto de 2026) documenta el arbusto en jardín doméstico. La inspección separa el oficio de té popular de la alegación clínica.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === 'Alecrim-do-campo');
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'alecrim');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
  guia.updatedAt = new Date().toISOString();
  fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
  console.log('Guia de palavras actualizado (alecrim-do-campo)');
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
  if (!plant) throw new Error('planta alecrim-do-campo ausente após ensureCatalog');

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
