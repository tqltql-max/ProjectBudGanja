'use strict';

/**
 * Injeta / actualiza a inspeção Gobbi et al. (JAMA Psychiatry 2019).
 * Uso: node scripts/upsert-artigo-gobbi-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildGobbiCannabisAdolescenciaHumorPost } = require('../lib/artigos-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const HREF = '/posts/post-inspecao-artigo-gobbi-cannabis-adolescencia-humor.html';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, payload, 'utf8');
      return;
    } catch (e) {
      last = e;
      await sleep(250 * (i + 1));
    }
  }
  throw last;
}

function hydrate(post) {
  const body = post.content_raw || post.content_raw || post.content || '';
  post.content_raw = body;
  post.content_raw = body;
  post.content = body;
  if (post.excerptEn && !post.excerptEn) post.excerptEn = post.excerptEn;
  if (post.excerptEs && !post.excerptEs) post.excerptEs = post.excerptEs;
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML', normalized.filename);
}

function upsertPost(posts, post) {
  hydrate(post);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    const afterAlbaugh = posts.findIndex(
      (p) => p.slug === 'inspecao-artigo-albaugh-cannabis-neurodesenvolvimento'
    );
    if (afterAlbaugh >= 0) {
      posts.splice(afterAlbaugh + 1, 0, post);
      console.log('Inserido', post.slug, 'após Albaugh');
    } else {
      posts.unshift(post);
      console.log('Inserido', post.slug);
    }
  }
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-artigo-gobbi-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = hydrate(buildGobbiCannabisAdolescenciaHumorPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs
  };
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const gobbi = {
      id: 'artigo-gobbi-humor-2019',
      title: 'Artigo — Cannabis na adolescência, depressão e suicídio (Gobbi 2019)',
      titleEn: 'Article — Adolescent cannabis, depression and suicide (Gobbi 2019)',
      titleEs: 'Artículo — Cannabis en la adolescencia, depresión y suicidio (Gobbi 2019)',
      tipo: 'artigo',
      priority: 1,
      status: 'feita',
      why: 'Par JAMA Psychiatry do Albaugh: meta-análise de humor/suicídio na jovem adultícia (open access PMC).',
      whyEn: 'JAMA Psychiatry companion to Albaugh: mood/suicide meta-analysis in young adulthood (PMC open access).',
      whyEs: 'Par JAMA Psychiatry de Albaugh: metanálisis de humor/suicidio en la adultez joven (acceso PMC).',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'artigos-cientificos',
      sources: [
        'https://doi.org/10.1001/jamapsychiatry.2018.4500',
        'https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2723657',
        'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6450286/'
      ],
      notes: 'CVV 188 na ficha. Associação ≠ causalidade. Ansiedade NS neste pool.'
    };
    const gi = items.findIndex((x) => x.id === gobbi.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], gobbi);
    else {
      const after = items.findIndex((x) => x.id === 'artigo-seguinte');
      if (after >= 0) items.splice(after, 0, gobbi);
      else items.push(gobbi);
    }
    const next = items.find((x) => x.id === 'artigo-seguinte');
    if (next) {
      next.status = 'fila';
      next.notes =
        'Gobbi 2019 fechado. Próximo: escolher DOI open access (ex. psicose Di Forti Lancet Psychiatry 2019, ou ensaio CBD).';
      next.suggestedSlug = 'inspecao-artigo-';
      delete next.doneHref;
    }
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões: Gobbi feita; artigo-seguinte permanece na fila');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
