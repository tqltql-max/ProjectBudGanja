'use strict';

/**
 * Injeta / actualiza a inspeção Dr. Samuel Dalle Laste (série Divulgação).
 * Uso: node scripts/upsert-divulgacao-dallelaste-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildDalleLastePost } = require('../lib/divulgacao-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const PLANTAS_FILE = path.join(ROOT, 'content', 'plantas.json');
const PALAVRAS_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

const post = buildDalleLastePost({ writeThemesJson: true });
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
  const sugId = 'samuel-dalle-laste';
  const href = '/posts/post-' + post.slug + '.html';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Dr. Samuel Dalle Laste — canal, maconha e vídeos iguais demais',
    titleEn: 'Dr. Samuel Dalle Laste — channel, cannabis and look-alike videos',
    titleEs: 'Dr. Samuel Dalle Laste — canal, cannabis y vídeos demasiado iguales',
    tipo: 'divulgacao',
    priority: 2,
    status: 'feita',
    why: 'Divulgação: IDs do canal CRM-RS 32011 + âncoras de maconha + classificação exclusiva (DICA #, Pergunte, Olá Pessoal).',
    whyEn: 'Outreach: CRM-RS 32011 channel IDs + cannabis anchors + exclusive classification (TIP #, Ask, Olá Pessoal).',
    whyEs: 'Divulgación: IDs del canal CRM-RS 32011 + anclas de cannabis + clasificación exclusiva (TIP #, Pregunte, Olá Pessoal).',
    suggestedSlug: post.slug,
    doneHref: href,
    seriesHint: 'divulgacao-saude',
    sources: [
      post.sourceUrl,
      'https://www.youtube.com/c/DrSamuelDalleLaste',
      'https://drsamueldallelaste.com.br/',
      'https://clinicadallelaste.com.br/'
    ],
    notes: 'Série Divulgação. Indexar ≠ endossar medicina integrativa. Não equiparar a Ticão/Carlini.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestões actualizadas (Dalle Laste feita)');
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
      label: 'Inspeção: Dr. Samuel Dalle Laste — canal, maconha e vídeos iguais demais',
      labelEn: 'Inspection: Dr. Samuel Dalle Laste — channel, cannabis and look-alike videos',
      labelEs: 'Inspección: Dr. Samuel Dalle Laste — canal, cannabis y vídeos demasiado iguales'
    };
    if (ri >= 0) related[ri] = Object.assign({}, related[ri], link);
    else related.push(link);
    plant.relatedInspections = related;
    fs.writeFileSync(PLANTAS_FILE, JSON.stringify(doc, null, 2) + '\n', 'utf8');
    console.log('Elo relatedInspections → cannabis-sativa');
  }
}

if (fs.existsSync(PALAVRAS_FILE)) {
  const doc = JSON.parse(fs.readFileSync(PALAVRAS_FILE, 'utf8'));
  const items = Array.isArray(doc.items) ? doc.items : [];
  const entry = {
    id: 'samuel-dalle-laste',
    word: 'Samuel Dalle Laste',
    simple:
      'Médico CRM-RS 32011 — divulgação de prevenção/longevidade no YouTube (Divulgação). Indexar ≠ endossar.',
    simpleEn:
      'Physician CRM-RS 32011 — prevention/longevity outreach on YouTube (Outreach). Indexing ≠ endorsement.',
    simpleEs:
      'Médico CRM-RS 32011 — divulgación de prevención/longevidad en YouTube (Divulgación). Indexar ≠ respaldar.',
    group: 'lexico',
    fromTitle: false,
    href: '/posts/post-' + post.slug + '.html',
    history:
      'Samuel Dalle Laste é o médico (CRM-RS 32011) do canal de divulgação de prevenção e longevidade. O laboratório abre ficha em Divulgação — catálogo temático, não endosso clínico.',
    curiosities:
      'DICA #, Pergunte e Olá Pessoal agrupam os vídeos iguais demais. Autor × canal: a biografia não substitui o laudo médico do leitor.',
    historyEn:
      'Samuel Dalle Laste is the physician (CRM-RS 32011) behind the prevention and longevity outreach channel. The lab opens an Outreach sheet — thematic catalog, not a clinical endorsement.',
    curiositiesEn:
      'TIP #, Ask and Olá Pessoal group the look-alike videos. Author × channel: the biography does not replace the reader’s medical report.',
    historyEs:
      'Samuel Dalle Laste es el médico (CRM-RS 32011) del canal de divulgación de prevención y longevidad. El laboratorio abre ficha en Divulgación — catálogo temático, no aval clínico.',
    curiositiesEs:
      'TIP #, Pregunte y Olá Pessoal agrupan los vídeos demasiado iguales. Autor × canal: la biografía no sustituye el informe médico del lector.'
  };
  const pi = items.findIndex((x) => x && x.id === entry.id);
  if (pi >= 0) items[pi] = Object.assign({}, items[pi], entry);
  else items.push(entry);
  doc.items = items;
  fs.writeFileSync(PALAVRAS_FILE, JSON.stringify(doc, null, 2) + '\n', 'utf8');
  console.log('Guia-palavras: samuel-dalle-laste');
}

console.log(
  'OK:',
  post.title,
  '| content_raw',
  (post.content_raw || '').length,
  'chars'
);
