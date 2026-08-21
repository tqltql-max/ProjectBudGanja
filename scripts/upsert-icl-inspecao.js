'use strict';

/**
 * Injeta inspeções ICL Cursos + canal YouTube.
 * Uso: node scripts/upsert-icl-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { stampCatalog } = require('../lib/icl-categories.js');
const { saveCatalog, loadExistingCatalog } = require('../lib/youtube-channel-catalog.js');
const { buildIclCursosInspecaoPost } = require('../lib/icl-cursos-inspecao-post.js');
const { buildIclCanalPost } = require('../lib/icl-canal-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function catalogSlug() {
  const dir = path.join(ROOT, 'content', 'channels');
  const names = ['institutoconhecimentoliberta', 'iclnoticias', 'icl'];
  for (const name of names) {
    if (fs.existsSync(path.join(dir, name + '.json'))) return name;
  }
  return 'institutoconhecimentoliberta';
}

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

function stampExistingCatalog() {
  const slug = catalogSlug();
  const raw = loadExistingCatalog(slug);
  if (!raw || !(raw.videos || []).length) {
    console.log('Catálogo ICL ainda vazio — a ficha do canal usa a grade pública.');
    return;
  }
  const stamped = stampCatalog(raw);
  saveCatalog(slug, stamped);
  console.log('Catálogo carimbado:', stamped.videoCount, 'vídeos (', slug, ')');
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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-icl-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  stampExistingCatalog();

  const cursos = buildIclCursosInspecaoPost();
  const canal = buildIclCanalPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, cursos, 'inspecao-esapp-agronomia-paraguacu-paulista');
  upsertPost(posts, canal, 'inspecao-icl-cursos');
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, cursos);
  writeI18n(i18n, canal);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'icl-cursos',
      title: 'ICL Cursos — Instituto Conhecimento Liberta',
      titleEn: 'ICL Courses — Instituto Conhecimento Liberta',
      titleEs: 'ICL Cursos — Instituto Conhecimento Liberta',
      tipo: 'curso',
      priority: 2,
      status: 'feita',
      why: 'Formação privada (assinatura, pós FESPSP). Cursos ≠ canal YouTube. Catalogar ≠ endosso político.',
      whyEn: 'Private education (subscription, FESPSP postgraduate). Courses ≠ YouTube channel. Cataloguing ≠ political endorsement.',
      whyEs: 'Formación privada (suscripción, posgrado FESPSP). Cursos ≠ canal YouTube. Indexar ≠ respaldo político.',
      suggestedSlug: cursos.slug,
      doneHref: '/posts/post-' + cursos.slug + '.html',
      seriesHint: 'formacao-academica',
      sources: [
        'https://icl.com.br/',
        'https://pt.wikipedia.org/wiki/Instituto_Conhecimento_Liberta',
        'https://iclnoticias.com.br/conhecimento/icl/',
        '/posts/post-inspecao-canal-icl.html'
      ],
      notes: 'Não confundir com iclcursos.com.br (concursos). Sem afiliação.'
    });
    upsertSug(items, {
      id: 'canal-icl',
      title: 'ICL — jornalismo YouTube do Conhecimento Liberta',
      titleEn: 'ICL — Conhecimento Liberta YouTube journalism',
      titleEs: 'ICL — periodismo YouTube de Conhecimento Liberta',
      tipo: 'canal',
      priority: 2,
      status: 'feita',
      why: 'Canais: @institutoconhecimentoliberta — ~8 h/dia de jornalismo; recorte classificado; fora do hub de cultivo.',
      whyEn: 'Channels: @institutoconhecimentoliberta — ~8 h/day journalism; classified sample; outside the cultivation hub.',
      whyEs: 'Canales: @institutoconhecimentoliberta — ~8 h/día de periodismo; muestra clasificada; fuera del hub de cultivo.',
      suggestedSlug: canal.slug,
      doneHref: '/posts/post-' + canal.slug + '.html',
      seriesHint: 'canal-icl',
      sources: [
        'https://www.youtube.com/@institutoconhecimentoliberta',
        '/posts/post-inspecao-icl-cursos.html',
        'https://pt.wikipedia.org/wiki/Instituto_Conhecimento_Liberta'
      ],
      notes: 'Cursos ≠ canal. Indexar ≠ endosso político. Não misturar com /videos/ de cultivo.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (icl)');
  }

  for (const post of [cursos, canal]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  console.log('OK:', cursos.title);
  console.log('OK:', canal.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
