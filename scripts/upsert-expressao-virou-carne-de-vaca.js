'use strict';

/**
 * Injeta a expressão «virou carne de vaca» (ficou comum pra nós).
 * Uso: node scripts/upsert-expressao-virou-carne-de-vaca.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildVirouCarneDeVacaPost } = require('../lib/virou-carne-de-vaca-inspecao-post.js');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const ANIMAIS_FILE = path.join(ROOT, 'content', 'animais.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-virou-carne-de-vaca.html';

function nextOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'expressoes-ditados')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max.apply(null, orders) : 0) + 1;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  writeFileRetrySync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

function upsertPost(posts, post) {
  stampFiles(post);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
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

function patchGlossary(gloss) {
  const block =
    '    "virou carne de vaca": { tone: "caution", category: "Expressão", mundane: "Ficou comum pra nós — tão ordinário quanto o bife do dia.", gloss: "Locução BR — o especial virou o de todo o mundo; a carne de vaca é a régua do comum na mesa. Eco no lab: corte ≠ fábrica. Valeu !!!", href: "/posts/post-inspecao-expressao-virou-carne-de-vaca.html", en: "became ordinary / as common as everyday beef", es: "se volvió común / tan ordinario como el bife del día" },\n' +
    '    "carne de vaca": { gloss: "Literal: corte bovino. No ditado: medida do comum pra nós. Ficha: virou carne de vaca.", href: "/posts/post-inspecao-expressao-virou-carne-de-vaca.html", en: "beef / cow meat — the everyday plate", es: "carne de vaca — el plato del día" },\n';
  if (/"virou carne de vaca":\s*\{/.test(gloss)) {
    gloss = gloss.replace(
      /    "virou carne de vaca": \{[\s\S]*?\},\r?\n    "carne de vaca": \{[\s\S]*?\},\r?\n/,
      block
    );
    return gloss;
  }
  if (/    vaca:\s*\{/.test(gloss)) {
    return gloss.replace(/(    vaca:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  }
  console.warn('Aviso: glossário — ponto vaca não encontrado');
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-virou-carne-de-vaca-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const slug = 'inspecao-expressao-virou-carne-de-vaca';
  const existing = posts.find((p) => p.slug === slug);
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextOrder(posts)
    : nextOrder(posts);
  const post = stampFiles(buildVirouCarneDeVacaPost(seriesOrder));

  upsertPost(posts, post);
  writeFileRetrySync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  writeHtml(post);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  writeFileRetrySync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  try {
    const { publishStaticAssets } = require('../lib/publish-static.js');
    publishStaticAssets(ROOT);
    console.log('posts-public.json actualizado');
  } catch (e) {
    console.warn('Aviso publishStatic:', e && e.message ? e.message : e);
  }

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-virou-carne-de-vaca';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Virou carne de vaca — ficou comum pra nós',
      titleEn: 'Virou carne de vaca — it became ordinary for us',
      titleEs: 'Virou carne de vaca — se volvió común para nosotros',
      tipo: 'expressao',
      priority: 1,
      status: 'feita',
      why: 'Expressão BR: ficou comum pra nós. A vaca é a régua do ordinário, não a vilã. Eco no lab × 9.798 vídeos.',
      whyEn: 'BR saying: it became ordinary for us. The cow is the measuring stick of the everyday, not the villain.',
      whyEs: 'Dicho BR: se volvió común para nosotros. La vaca es la regla de lo ordinario, no la villana.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'expressoes-ditados',
      sources: [
        HREF,
        '/animais/vaca/',
        '/posts/post-inspecao-derivado-vaca.html',
        '/posts/post-inspecao-derivado-leite.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — sentido da boca = comum pra nós; eco = esteira, não a vaca.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    writeFileRetrySync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'virou-carne-de-vaca',
      word: 'virou carne de vaca',
      simple:
        'Locução BR: ficou comum pra nós — tão ordinário quanto o bife do dia. A vaca é a régua, não a vilã.',
      simpleEn:
        'Brazilian saying: it became ordinary for us — as common as everyday beef. The cow is the measuring stick, not the villain.',
      simpleEs:
        'Locución BR: se volvió común para nosotros — tan ordinario como el bife del día. La vaca es la regla, no la villana.',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'vida' || x.id === 'leite' || x.id === 'animal');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    writeFileRetrySync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      writeFileRetrySync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado');
    }
  }

  if (fs.existsSync(ANIMAIS_FILE)) {
    const catalog = JSON.parse(fs.readFileSync(ANIMAIS_FILE, 'utf8'));
    const animals = Array.isArray(catalog.animals) ? catalog.animals : [];
    const vaca = animals.find((a) => a && a.slug === 'vaca');
    if (vaca) {
      const rel = Array.isArray(vaca.relatedInspections) ? vaca.relatedInspections.slice() : [];
      const row = {
        href: HREF,
        label: 'Inspeção: Virou carne de vaca — ficou comum pra nós',
        labelEn: 'Inspection: Virou carne de vaca — it became ordinary for us',
        labelEs: 'Inspección: Virou carne de vaca — se volvió común para nosotros'
      };
      const ri = rel.findIndex((x) => x && x.href === HREF);
      if (ri >= 0) rel[ri] = Object.assign({}, rel[ri], row);
      else rel.unshift(row);
      vaca.relatedInspections = rel;
      catalog.updatedAt = new Date().toISOString();
      writeFileRetrySync(ANIMAIS_FILE, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
      console.log('Elo relatedInspections em animais.json → vaca');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
