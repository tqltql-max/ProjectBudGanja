'use strict';

/**
 * Actualiza Heródoto (elo passar) + injeta palavra «passar»; remove elo abacate.
 * Uso: node scripts/upsert-herodoto-passar.js
 */

const fs = require('fs');
const path = require('path');
const { buildHerodotoPost } = require('../lib/pessoas-historia-inspecoes-posts.js');
const { buildPassarPost } = require('../lib/palavras-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const PLANTAS_FILE = path.join(ROOT, 'content', 'plantas.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
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

const herodoto = buildHerodotoPost();
const passar = buildPassarPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
upsertPost(posts, herodoto);
upsertPost(posts, passar);
fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
writeI18n(i18n, herodoto);
writeI18n(i18n, passar);
fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

if (fs.existsSync(PLANTAS_FILE)) {
  const doc = JSON.parse(fs.readFileSync(PLANTAS_FILE, 'utf8'));
  const list = Array.isArray(doc.plants) ? doc.plants : [];
  const plant = list.find((p) => p && p.slug === 'abacate');
  if (plant && Array.isArray(plant.relatedInspections)) {
    const before = plant.relatedInspections.length;
    plant.relatedInspections = plant.relatedInspections.filter(
      (x) => x && !/herodoto/i.test(String(x.href || ''))
    );
    if (plant.relatedInspections.length !== before) {
      fs.writeFileSync(PLANTAS_FILE, JSON.stringify(doc, null, 2) + '\n', 'utf8');
      console.log('Removido elo Heródoto de plantas.json → abacate');
    }
  }
}

if (fs.existsSync(SUG_FILE)) {
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];

  const h = items.findIndex((x) => x.id === 'figura-herodoto');
  const herEntry = {
    id: 'figura-herodoto',
    title: 'Heródoto — método da pesquisa e a palavra passar',
    titleEn: 'Herodotus — research method and the word passar',
    titleEs: 'Heródoto — método de investigación y la palabra passar',
    tipo: 'pessoas',
    priority: 2,
    status: 'feita',
    why: 'Ficha fundadora Pessoas: historie; elo metodológico com a palavra passar.',
    whyEn: 'Founding People sheet: historie; methodological link to the word passar.',
    whyEs: 'Ficha fundadora Personas: historie; vínculo metodológico con la palabra passar.',
    suggestedSlug: herodoto.slug,
    doneHref: '/posts/post-' + herodoto.slug + '.html',
    seriesHint: 'pessoas-historia',
    sources: [herodoto.sourceUrl, '/posts/post-inspecao-palavra-passar.html']
  };
  if (h >= 0) items[h] = Object.assign({}, items[h], herEntry);
  else items.push(herEntry);

  const p = items.findIndex((x) => x.id === 'palavra-passar');
  const passEntry = {
    id: 'palavra-passar',
    title: 'Passar — verbo da passagem e elo com Heródoto',
    titleEn: 'Passar — verb of passage and link to Herodotus',
    titleEs: 'Passar — verbo de la pasada y vínculo con Heródoto',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras × Pessoas: latim passāre; sentidos de travessia e acontecido.',
    whyEn: 'Words × People: Latin passāre; senses of crossing and what happened.',
    whyEs: 'Palabras × Personas: latín passāre; sentidos de travesía y lo ocurrido.',
    suggestedSlug: passar.slug,
    doneHref: '/posts/post-' + passar.slug + '.html',
    seriesHint: 'palavras-origem',
    sources: ['/posts/post-inspecao-figura-herodoto.html']
  };
  if (p >= 0) items[p] = Object.assign({}, items[p], passEntry);
  else items.push(passEntry);

  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (Heródoto + passar)');
}

console.log('OK Heródoto + passar');
