'use strict';

/**
 * Injeta / actualiza guias (farmacêuticos, associações, Defensoria)
 * + palavras (Lei 11.343, porte×tráfico, descriminalização, RDC)
 * + refresh dos guias advogados/médicos (cruzamentos).
 *
 * Uso: node scripts/upsert-classificacao-acesso-completo.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildGuiaHcSeletividadePost,
  GUIA_HC_SELETIVIDADE_GUIA_ITEMS
} = require('../lib/guia-hc-seletividade-inspecao-post.js');
const {
  buildGuiaCannabisMedicosPost,
  GUIA_CANNABIS_MEDICOS_GUIA_ITEMS
} = require('../lib/guia-cannabis-medicos-inspecao-post.js');
const {
  buildGuiaCannabisFarmaceuticosPost,
  GUIA_CANNABIS_FARMACEUTICOS_GUIA_ITEMS
} = require('../lib/guia-cannabis-farmaceuticos-inspecao-post.js');
const {
  buildGuiaAssociacoesPacientesPost,
  GUIA_ASSOCIACOES_PACIENTES_GUIA_ITEMS
} = require('../lib/guia-associacoes-pacientes-inspecao-post.js');
const {
  buildGuiaDefensoriaAcessoPost,
  GUIA_DEFENSORIA_ACESSO_GUIA_ITEMS
} = require('../lib/guia-defensoria-acesso-inspecao-post.js');
const {
  CLASSIFICACAO_ACESSO_PALAVRAS_POSTS,
  CLASSIFICACAO_ACESSO_GUIA_ITEMS
} = require('../lib/classificacao-acesso-palavras-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(post, afterSlug) {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    const after = afterSlug
      ? posts.findIndex((p) => p.slug === afterSlug)
      : -1;
    if (after >= 0) posts.splice(after + 1, 0, post);
    else posts.unshift(post);
    console.log('Inserido', post.slug);
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
}

const posts = [
  [buildGuiaHcSeletividadePost(), null],
  [buildGuiaCannabisMedicosPost(), 'inspecao-guia-hc-seletividade-advogados'],
  [buildGuiaCannabisFarmaceuticosPost(), 'inspecao-guia-cannabis-medicos'],
  [buildGuiaAssociacoesPacientesPost(), 'inspecao-guia-cannabis-farmaceuticos'],
  [buildGuiaDefensoriaAcessoPost(), 'inspecao-guia-associacoes-pacientes'],
  ...CLASSIFICACAO_ACESSO_PALAVRAS_POSTS.map((p, i, arr) => [
    p,
    i === 0 ? 'inspecao-guia-defensoria-acesso' : arr[i - 1].slug
  ])
];

for (const [post, after] of posts) {
  upsertPost(post, after);
}

const guiaItems = []
  .concat(GUIA_HC_SELETIVIDADE_GUIA_ITEMS)
  .concat(GUIA_CANNABIS_MEDICOS_GUIA_ITEMS)
  .concat(GUIA_CANNABIS_FARMACEUTICOS_GUIA_ITEMS)
  .concat(GUIA_ASSOCIACOES_PACIENTES_GUIA_ITEMS)
  .concat(GUIA_DEFENSORIA_ACESSO_GUIA_ITEMS)
  .concat(CLASSIFICACAO_ACESSO_GUIA_ITEMS);

const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
if (!Array.isArray(guia.items)) guia.items = [];
let added = 0;
let updated = 0;
for (const item of guiaItems) {
  const gi = guia.items.findIndex((x) => x.id === item.id);
  if (gi >= 0) {
    guia.items[gi] = Object.assign({}, guia.items[gi], item);
    updated += 1;
  } else {
    guia.items.push(item);
    added += 1;
  }
}
guia.items.sort((a, b) =>
  String(a.word || '').localeCompare(String(b.word || ''), 'pt', { sensitivity: 'base' })
);
guia.updatedAt = new Date().toISOString();
fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');

console.log(
  'OK: guias + palavras acesso | posts',
  posts.length,
  '| guia +' + added + ' ~' + updated
);
