'use strict';

/**
 * Injeta / actualiza a inspeção Heródoto (série Pessoas) e garante abacate no catálogo.
 * Uso: node scripts/upsert-figura-herodoto-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildHerodotoPost } = require('../lib/pessoas-historia-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const PLANTAS_FILE = path.join(ROOT, 'content', 'plantas.json');

const ABACATE = {
  id: 'abacate',
  slug: 'abacate',
  nomePopular: 'Abacate',
  nomeCientifico: 'Persea americana Mill.',
  familia: 'Lauraceae',
  summary:
    'Árvore frutífera de origem mesoamericana, amplamente cultivada no Brasil; polpa rica em lipídios, presente na culinária e em usos tradicionais de cuidado.',
  partsUsed: ['Fruto (polpa)', 'Folhas (uso tradicional, com cautela)', 'Óleo da polpa'],
  traditionalUses: [
    'Alimento e culinária',
    'Preparações caseiras com a polpa (cuidado da pele/cabelo — tradição popular)',
    'Referência em etnobotânica alimentar das Américas'
  ],
  cautions:
    'Alimento comum; folhas e extratos não são inocuidade garantida — evitar automedicação. Caroço e folhas podem ser tóxicos para animais domésticos. Conteúdo educacional — não substitui orientação profissional.',
  tags: ['alimento', 'frutifera', 'americas', 'culinaria'],
  relatedUnifesp: false,
  cover: null,
  relatedInspections: []
};

function ensureAbacate() {
  const doc = JSON.parse(fs.readFileSync(PLANTAS_FILE, 'utf8'));
  const list = Array.isArray(doc.plants) ? doc.plants : [];
  let plant = list.find((p) => p && p.slug === 'abacate');
  if (!plant) {
    list.push(Object.assign({}, ABACATE));
    plant = list[list.length - 1];
    console.log('Inserido abacate em plantas.json');
  } else {
    plant.nomePopular = plant.nomePopular || ABACATE.nomePopular;
    plant.nomeCientifico = plant.nomeCientifico || ABACATE.nomeCientifico;
    plant.familia = plant.familia || ABACATE.familia;
    plant.summary = plant.summary || ABACATE.summary;
    if (!Array.isArray(plant.partsUsed) || !plant.partsUsed.length) {
      plant.partsUsed = ABACATE.partsUsed.slice();
    }
    if (!Array.isArray(plant.traditionalUses) || !plant.traditionalUses.length) {
      plant.traditionalUses = ABACATE.traditionalUses.slice();
    }
    if (!plant.cautions) plant.cautions = ABACATE.cautions;
    console.log('Abacate já existia — campos base garantidos');
  }
  doc.plants = list;
  doc.updatedAt = new Date().toISOString();
  return { doc, plant };
}

const post = buildHerodotoPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
const idx = posts.findIndex((p) => p.slug === post.slug);

if (idx >= 0) {
  posts[idx] = Object.assign({}, posts[idx], post);
  console.log('Actualizado', post.slug, 'em índice', idx);
} else {
  posts.unshift(post);
  console.log('Inserido', post.slug, 'no início');
}

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
i18n[post.slug] = {
  titleEn: post.titleEn,
  titleEs: post.titleEs,
  excerptEn: post.excerptEn,
  excerptEs: post.excerptEs,
  contentEn: post.contentEn,
  contentEs: post.contentEs
};
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

const { doc, plant } = ensureAbacate();
const href = '/posts/post-' + post.slug + '.html';
const related = Array.isArray(plant.relatedInspections)
  ? plant.relatedInspections.slice()
  : [];
const ri = related.findIndex((x) => x && x.href === href);
const link = {
  href,
  label: 'Inspeção: Heródoto — método da pesquisa e o abacate que ele não viu',
  labelEn: 'Inspection: Herodotus — research method and the avocado he never saw',
  labelEs: 'Inspección: Heródoto — método de investigación y el aguacate que no vio'
};
if (ri >= 0) related[ri] = Object.assign({}, related[ri], link);
else related.push(link);
plant.relatedInspections = related;
fs.writeFileSync(PLANTAS_FILE, JSON.stringify(doc, null, 2) + '\n', 'utf8');
console.log('Elo relatedInspections em plantas.json → abacate');

if (fs.existsSync(SUG_FILE)) {
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'figura-herodoto';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Heródoto — método da pesquisa e elo com o abacate',
    titleEn: 'Herodotus — research method and avocado link',
    titleEs: 'Heródoto — método de investigación y vínculo con el aguacate',
    tipo: 'pessoas',
    priority: 2,
    status: 'feita',
    why: 'Ficha fundadora da série Pessoas: historie como investigação; ponte metodológica com Persea americana.',
    whyEn: 'Founding sheet of the People series: historie as inquiry; methodological bridge to Persea americana.',
    whyEs: 'Ficha fundadora de Personas: historie como investigación; puente metodológico con Persea americana.',
    suggestedSlug: post.slug,
    doneHref: href,
    seriesHint: 'pessoas-historia',
    sources: [post.sourceUrl, '/plantas/abacate/']
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);

  const futures = [
    {
      id: 'figura-teophrasto',
      title: 'Teofrasto — pai da botânica e o catálogo de plantas',
      titleEn: 'Theophrastus — father of botany and the plant catalog',
      titleEs: 'Teofrasto — padre de la botánica y el catálogo de plantas',
      tipo: 'pessoas',
      priority: 3,
      status: 'ideia',
      why: 'Próxima Pessoa: botânica clássica após Heródoto; elo com espécies do catálogo.',
      whyEn: 'Next Person: classical botany after Herodotus; link to catalog species.',
      whyEs: 'Siguiente Persona: botánica clásica tras Heródoto; vínculo con especies del catálogo.',
      suggestedSlug: 'inspecao-figura-teophrasto',
      seriesHint: 'pessoas-historia',
      sources: [],
      notes: 'Historia Plantarum; cruzar com fichas /plantas/.'
    }
  ];
  for (const f of futures) {
    if (!items.some((x) => x.id === f.id)) items.push(f);
  }

  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (Heródoto feita + Teofrasto ideia)');
}

console.log(
  'OK:',
  post.title,
  '| content_raw',
  (post.content_raw || '').length,
  'chars'
);
