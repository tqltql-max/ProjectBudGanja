'use strict';

/**
 * Injeta / actualiza a inspeção plataformas de ensino GOV.BR.
 * Uso: node scripts/upsert-govbr-ensino-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildGovbrEnsinoInspecaoPost } = require('../lib/govbr-ensino-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function upsertPost(posts, post, afterSlug) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const after = afterSlug ? posts.findIndex((p) => p.slug === afterSlug) : -1;
  if (after >= 0) {
    posts.splice(after + 1, 0, post);
    console.log('Inserido', post.slug, 'após', afterSlug);
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug, 'no início');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-govbr-ensino-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildGovbrEnsinoInspecaoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post, 'inspecao-icl-cursos');
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
    const entry = {
      id: 'plataformas-ensino-govbr',
      title: 'Plataformas de ensino GOV.BR — Canal Educação, MEC Idiomas e MEC Livros',
      titleEn: 'GOV.BR learning platforms — Canal Educação, MEC Idiomas and MEC Livros',
      titleEs: 'Plataformas de enseñanza GOV.BR — Canal Educação, MEC Idiomas y MEC Livros',
      tipo: 'curso',
      priority: 2,
      status: 'feita',
      why: 'Mapa gratuito do MEC (login gov.br): vídeos, idiomas, livros, AVAMEC e MEC Enem. Distinto do SIEX e do ICL.',
      whyEn: 'Free MEC map (gov.br login): video, languages, books, AVAMEC and MEC Enem. Distinct from SIEX and ICL.',
      whyEs: 'Mapa gratuito del MEC (login gov.br): vídeo, idiomas, libros, AVAMEC y MEC Enem. Distinto del SIEX y del ICL.',
      suggestedSlug: post.slug,
      doneHref: '/posts/post-' + post.slug + '.html',
      seriesHint: 'formacao-academica',
      sources: [
        'https://www.gov.br/mec/pt-br',
        'https://meclivros.mec.gov.br/',
        'https://www.gov.br/mec/pt-br/acesso-a-informacao/perguntas-frequentes/mec-idiomas',
        'https://www.youtube.com/@canaleducacaobr',
        'https://avamec.mec.gov.br/',
        'https://app.mecenem.mec.gov.br'
      ],
      notes: 'Sem afiliação. Catalogar ≠ endosso político. Canal Educação fora do hub /videos/ de cultivo.'
    };
    const si = items.findIndex((x) => x.id === entry.id || x.suggestedSlug === post.slug);
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.unshift(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestão marcada como feita:', entry.id);
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| cover', post.coverImage);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
