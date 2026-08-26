'use strict';

/**
 * Injeta / actualiza a inspeção Dr. Lair Ribeiro (série Divulgação).
 * Uso: node scripts/upsert-divulgacao-lair-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildLairRibeiroPost } = require('../lib/divulgacao-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const PLANTAS_FILE = path.join(ROOT, 'content', 'plantas.json');

const post = buildLairRibeiroPost({ writeThemesJson: true });
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
  const sugId = 'lair-ribeiro';
  const href = '/posts/post-' + post.slug + '.html';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Dr. Lair Ribeiro — divulgação sobre cannabinoides',
    titleEn: 'Dr. Lair Ribeiro — cannabinoid outreach',
    titleEs: 'Dr. Lair Ribeiro — divulgación sobre cannabinoides',
    tipo: 'divulgacao',
    priority: 2,
    status: 'feita',
    why: 'Ficha fundadora Divulgação: IDs do canal oficial + textos dor/Alzheimer; limites públicos explícitos.',
    whyEn: 'Founding Outreach sheet: official channel IDs + pain/Alzheimer texts; explicit public limits.',
    whyEs: 'Ficha fundadora Divulgación: IDs del canal oficial + textos dolor/Alzheimer; límites públicos explícitos.',
    suggestedSlug: post.slug,
    doneHref: href,
    seriesHint: 'divulgacao-saude',
    sources: [
      post.sourceUrl,
      'https://lairribeiro.com.br/en/the-use-of-cannabinoids-as-an-adjuvant-in-the-treatment-of-chronic-pain/',
      'https://lairribeiro.com.br/en/the-use-of-cannabinoids-as-an-adjuvant-in-the-treatment-of-alzheimers-disease/',
      'https://pt.wikipedia.org/wiki/Lair_Ribeiro'
    ],
    notes: 'Série própria (divulgação). Declarar independência e não equiparar a Ticão/Carlini.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (Lair feita)');
}

if (fs.existsSync(PLANTAS_FILE)) {
  const doc = JSON.parse(fs.readFileSync(PLANTAS_FILE, 'utf8'));
  const list = Array.isArray(doc.plants) ? doc.plants : [];
  const plant = list.find((p) => p && p.slug === 'cannabis-sativa');
  if (plant) {
    const href = '/posts/post-' + post.slug + '.html';
    const related = Array.isArray(plant.relatedInspections)
      ? plant.relatedInspections.slice()
      : [];
    const ri = related.findIndex((x) => x && x.href === href);
    const link = {
      href,
      label: 'Inspeção: Dr. Lair Ribeiro — canal e divulgação sobre cannabinoides',
      labelEn: 'Inspection: Dr. Lair Ribeiro — channel and cannabinoid outreach',
      labelEs: 'Inspección: Dr. Lair Ribeiro — canal y divulgación sobre cannabinoides'
    };
    if (ri >= 0) related[ri] = Object.assign({}, related[ri], link);
    else related.push(link);
    plant.relatedInspections = related;
    fs.writeFileSync(PLANTAS_FILE, JSON.stringify(doc, null, 2) + '\n', 'utf8');
    console.log('Elo relatedInspections → cannabis-sativa');
  }
}

console.log(
  'OK:',
  post.title,
  '| content_raw',
  (post.content_raw || '').length,
  'chars'
);
