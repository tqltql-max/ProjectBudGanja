'use strict';

/**
 * Injeta / actualiza a inspeção da cana-de-açúcar (Derivados de risco).
 * Uso: node scripts/upsert-derivado-cana-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildCanaDeAcucarPost } = require('../lib/derivados-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

const post = buildCanaDeAcucarPost();
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
  const sugId = 'derivado-cana-de-acucar';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Cana-de-açúcar — origem e açúcar refinado',
    titleEn: 'Sugarcane — origin and refined sugar',
    titleEs: 'Caña de azúcar — origen y azúcar refinado',
    tipo: 'derivado',
    priority: 2,
    status: 'feita',
    why: 'Ficha fundadora da série Derivados de risco: origem botânica vs produto industrial.',
    whyEn: 'Founding sheet of Risk derivatives: botanical origin vs industrial product.',
    whyEs: 'Ficha fundadora de Derivados de riesgo: origen botánico vs producto industrial.',
    suggestedSlug: post.slug,
    doneHref: '/posts/post-' + post.slug + '.html',
    seriesHint: 'plantas-derivados-risco',
    sources: [post.sourceUrl]
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);

  // Filas futuras da série
  const futures = [
    {
      id: 'derivado-tabaco',
      title: 'Tabaco — origem da planta e produtos industriais',
      titleEn: 'Tobacco — plant origin and industrial products',
      titleEs: 'Tabaco — origen de la planta y productos industriales',
      tipo: 'derivado',
      priority: 3,
      status: 'ideia',
      why: 'Próximo candidato Derivados de risco: *Nicotiana tabacum* → cigarro industrial.',
      whyEn: 'Next Risk derivatives candidate: *Nicotiana tabacum* → industrial cigarette.',
      whyEs: 'Siguiente candidato Derivados de riesgo: *Nicotiana tabacum* → cigarrillo industrial.',
      suggestedSlug: 'inspecao-derivado-tabaco',
      seriesHint: 'plantas-derivados-risco',
      sources: [],
      notes: 'Separar planta/etnobotânica de indústria do tabaco; sem romantizar nicotina.'
    }
  ];
  for (const f of futures) {
    if (!items.some((x) => x.id === f.id)) items.push(f);
  }

  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (cana feita + tabaco ideia)');
}

console.log(
  'OK:',
  post.title,
  '| content_raw',
  (post.content_raw || '').length,
  'chars'
);
