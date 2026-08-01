'use strict';

/**
 * Injeta / actualiza a inspeção «maconha» (série Palavras).
 * Uso: node scripts/upsert-palavra-maconha-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMaconhaPost } = require('../lib/palavras-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const PLANTAS_FILE = path.join(ROOT, 'content', 'plantas.json');

const post = buildMaconhaPost();
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

if (fs.existsSync(SUG_FILE)) {
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-maconha';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Maconha — origem da palavra e transformação no Brasil',
    titleEn: 'Maconha — word origin and transformation in Brazil',
    titleEs: 'Maconha — origen de la palabra y transformación en Brasil',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Ficha fundadora da série Palavras: etimologia, viagem histórica e elo com Cannabis sativa.',
    whyEn: 'Founding sheet of the Words series: etymology, historical journey and link to Cannabis sativa.',
    whyEs: 'Ficha fundadora de la serie Palabras: etimología, viaje histórico y vínculo con Cannabis sativa.',
    suggestedSlug: post.slug,
    doneHref: '/posts/post-' + post.slug + '.html',
    seriesHint: 'palavras-origem',
    sources: [post.sourceUrl]
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);

  const futures = [
    {
      id: 'palavra-ganja',
      title: 'Ganja — do sânscrito ao Caribe e à marca cultural',
      titleEn: 'Ganja — from Sanskrit to the Caribbean and cultural brand',
      titleEs: 'Ganja — del sánscrito al Caribe y la marca cultural',
      tipo: 'palavra',
      priority: 3,
      status: 'ideia',
      why: 'Próxima Palavra: rota índica/caribenha; presente na marca BudGanja.',
      whyEn: 'Next Word: Indic/Caribbean route; present in the BudGanja brand.',
      whyEs: 'Siguiente Palabra: ruta índica/caribeña; presente en la marca BudGanja.',
      suggestedSlug: 'inspecao-palavra-ganja',
      seriesHint: 'palavras-origem',
      sources: [],
      notes: 'Separar etimologia de marketing; cruzar com ficha cannabis-sativa.'
    },
    {
      id: 'palavra-diamba',
      title: 'Diamba — cognato afro-brasileiro de maconha',
      titleEn: 'Diamba — Afro-Brazilian cognate of maconha',
      titleEs: 'Diamba — cognado afrobrasileño de maconha',
      tipo: 'palavra',
      priority: 3,
      status: 'ideia',
      why: 'Reforça o eixo bantu da série Palavras e a rede semântica aberta em maconha.',
      whyEn: 'Strengthens the Bantu axis of the Words series and the network opened in maconha.',
      whyEs: 'Refuerza el eje bantú de Palabras y la red abierta en maconha.',
      suggestedSlug: 'inspecao-palavra-diamba',
      seriesHint: 'palavras-origem',
      sources: [],
      notes: 'Variantes liamba/riamba; ligação etnobotânica.'
    },
    {
      id: 'palavra-cannabis',
      title: 'Cannabis — latinismo técnico e linguagem institucional',
      titleEn: 'Cannabis — technical Latinism and institutional language',
      titleEs: 'Cannabis — latinismo técnico y lenguaje institucional',
      tipo: 'palavra',
      priority: 4,
      status: 'ideia',
      why: 'Como o nome científico virou preferência clínico-legal frente a «maconha».',
      whyEn: 'How the scientific name became the clinical-legal preference over “maconha”.',
      whyEs: 'Cómo el nombre científico pasó a preferencia clínico-legal frente a «maconha».',
      suggestedSlug: 'inspecao-palavra-cannabis',
      seriesHint: 'palavras-origem',
      sources: ['/plantas/cannabis-sativa/'],
      notes: 'Grego/latim → taxonomia → ANVISA/OMS; contrastar com maconha.'
    }
  ];
  for (const f of futures) {
    if (!items.some((x) => x.id === f.id)) items.push(f);
  }

  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (maconha feita + ganja/diamba/cannabis ideia)');
}

if (fs.existsSync(PLANTAS_FILE)) {
  const plantasDoc = JSON.parse(fs.readFileSync(PLANTAS_FILE, 'utf8'));
  const list = Array.isArray(plantasDoc.plants)
    ? plantasDoc.plants
    : Array.isArray(plantasDoc.plantas)
      ? plantasDoc.plantas
      : Array.isArray(plantasDoc)
        ? plantasDoc
        : [];
  const plant = list.find((p) => p && p.slug === 'cannabis-sativa');
  if (plant) {
    const href = '/posts/post-' + post.slug + '.html';
    const related = Array.isArray(plant.relatedInspections)
      ? plant.relatedInspections.slice()
      : [];
    const ri = related.findIndex((x) => x && x.href === href);
    const link = {
      href,
      label: 'Inspeção: Maconha — origem da palavra e transformação no Brasil',
      labelEn: 'Inspection: Maconha — word origin and transformation in Brazil',
      labelEs: 'Inspección: Maconha — origen de la palabra y transformación en Brasil'
    };
    if (ri >= 0) related[ri] = Object.assign({}, related[ri], link);
    else related.push(link);
    plant.relatedInspections = related;
    fs.writeFileSync(PLANTAS_FILE, JSON.stringify(plantasDoc, null, 2) + '\n', 'utf8');
    console.log('Elo relatedInspections em plantas.json → cannabis-sativa');
  } else {
    console.warn('Aviso: cannabis-sativa não encontrada em plantas.json');
  }
}

console.log(
  'OK:',
  post.title,
  '| content_raw',
  (post.content_raw || '').length,
  'chars'
);
