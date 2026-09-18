'use strict';

/**
 * Injeta inspeção da marca Principia (loja / dermocosmético).
 * Uso: node scripts/upsert-loja-principia-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildPrincipiaPost } = require('../lib/principia-marca-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const HREF = '/posts/post-inspecao-loja-principia.html';
const SITE = 'https://www.principiaskin.com/';

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const afterAnvisa = posts.findIndex((p) => p.slug === 'inspecao-palavra-anvisa');
  if (afterAnvisa >= 0) {
    posts.splice(afterAnvisa + 1, 0, post);
    console.log('Inserido', post.slug, 'após ANVISA');
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug);
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
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-principia-marca-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildPrincipiaPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'loja-principia';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Principia — marca, rótulo e o claim dos dermatologistas',
      titleEn: 'Principia — brand, label, and the dermatologist claim',
      titleEs: 'Principia — marca, etiqueta y el claim de los dermatólogos',
      tipo: 'loja',
      priority: 2,
      status: 'feita',
      why: 'Lojas: Principia — «mais recomendada pelos dermatologistas» auditado (Memed 2ª prescrita no recorte); concentrações no rótulo; sem endosso clínico.',
      whyEn: 'Shops: Principia — “most recommended by dermatologists” audited; concentrations on the label; no clinical endorsement.',
      whyEs: 'Tiendas: Principia — «la más recomendada por dermatólogos» auditado; concentraciones en la etiqueta; sin endoso clínico.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'loja-dermocosmetico',
      sources: [
        SITE,
        'https://panoramafarmaceutico.com.br/dermocosmeticos-de-alta-performance/',
        '/posts/post-inspecao-palavra-anvisa.html',
        '/posts/post-inspecao-palavra-risco.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Claim ≠ facto. Cosmético ≠ medicamento.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (loja-principia)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!/principia:\s*\{/.test(gloss)) {
      const entry =
        '    principia: { gloss: "Marca BR de dermocosméticos — concentrações no rótulo; «mais recomendada pelos dermatologistas» é claim (Memed: 2ª prescrita no recorte); sem endosso clínico.", href: "/posts/post-inspecao-loja-principia.html", en: "Principia (skincare brand)", es: "Principia (marca de dermocosmética)" },\n';
      const reAnvisa = /(    anvisa:\s*\{[\s\S]*?\},?\r?\n)/;
      if (reAnvisa.test(gloss)) {
        gloss = gloss.replace(reAnvisa, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (principia)');
      } else {
        console.warn('Aviso: glossário — ponto anvisa não encontrado para Principia');
      }
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '|', HREF);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
