'use strict';

/**
 * Injeta / actualiza a inspeção de derivados do abacate + actualiza planta abacate.
 * Uso: node scripts/upsert-derivado-abacate-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildAbacateDerivadoPost } = require('../lib/derivados-inspecoes-posts.js');
const { buildPlantaInspecaoPost, loadPlantasCatalog } = require('../lib/plantas-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'em índice', idx);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'no início');
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

const derivado = buildAbacateDerivadoPost();
const plants = loadPlantasCatalog();
const abacatePlant = plants.find((p) => p && p.slug === 'abacate');
const frutos = plants.filter(
  (p) => p && String(p.hubCategory || '').toLowerCase() === 'fruto'
);
const frutoOrder = Math.max(
  1,
  frutos.findIndex((p) => p.slug === 'abacate') + 1
);
const plantaPost = abacatePlant
  ? buildPlantaInspecaoPost(abacatePlant, frutoOrder)
  : null;

const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
upsertPost(posts, derivado);
if (plantaPost) upsertPost(posts, plantaPost);
fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
writeI18n(i18n, derivado);
if (plantaPost) writeI18n(i18n, plantaPost);
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

if (fs.existsSync(SUG_FILE)) {
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'derivado-abacate';
  const href = '/posts/post-' + derivado.slug + '.html';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Derivados do abacate — açúcar, aditivos e química industrial',
    titleEn: 'Avocado derivatives — sugar, additives and industrial chemistry',
    titleEs: 'Derivados del aguacate — azúcar, aditivos y química industrial',
    tipo: 'derivado',
    priority: 2,
    status: 'feita',
    why: 'Derivados de risco: abacate inteiro vs ultraprocessado com açúcar e aditivos; mapa químico + elo planta.',
    whyEn: 'Risk derivatives: whole avocado vs ultra-processed sugar/additives matrix; chemical map + plant link.',
    whyEs: 'Derivados de riesgo: aguacate entero vs ultraprocesado con azúcar y aditivos; mapa químico + vínculo planta.',
    suggestedSlug: derivado.slug,
    doneHref: href,
    seriesHint: 'plantas-derivados-risco',
    sources: [
      derivado.sourceUrl,
      '/posts/post-inspecao-planta-abacate.html',
      '/posts/post-inspecao-derivado-cana-de-acucar.html',
      'https://www.gov.br/anvisa/pt-br/assuntos/alimentos/aditivos-alimentares'
    ],
    notes: 'Planta ≠ vilã; foco em açúcar × aditivos × dose.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (derivado-abacate feita)');
}

console.log('OK:', derivado.title);
if (plantaPost) console.log('OK:', plantaPost.title);
