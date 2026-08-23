'use strict';

/**
 * Injeta / actualiza Diamba HQ (Paiva / Brasa, 2023) na série Artes.
 * Uso: node scripts/upsert-arte-diamba-hq-paiva.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildDiambaHqPaivaPost } = require('../lib/diamba-hq-paiva-inspecao-post.js');
const { buildDiambaSarabambaPost } = require('../lib/artes-inspecoes-posts.js');
const { buildDiambaPost } = require('../lib/palavras-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertGuia(items, entry) {
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else items.push(entry);
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

async function syncSql(list) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  list.forEach((p) => upsertPost(posts, p));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', list.map((p) => p.slug).join(', '));
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-diamba-hq-paiva-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa', e.message);
  }

  const hq = buildDiambaHqPaivaPost();
  const sarabamba = buildDiambaSarabambaPost();
  const palavra = buildDiambaPost();
  const list = [hq, sarabamba, palavra];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + hq.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'arte-diamba-hq-paiva',
      title: 'Diamba — Histórias do Proibicionismo no Brasil (HQ, Daniel Paiva)',
      titleEn: 'Diamba — Stories of Prohibition in Brazil (comics, Daniel Paiva)',
      titleEs: 'Diamba — Historias del prohibicionismo en Brasil (HQ, Daniel Paiva)',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'HQ documentário sobre criminalização e racismo estrutural — distinta da antologia Diamba Sarabamba (1986).',
      whyEn: 'Documentary comics on criminalization and structural racism — distinct from the 1986 Diamba Sarabamba anthology.',
      whyEs: 'HQ documental sobre criminalización y racismo estructural — distinta de la antología Diamba Sarabamba (1986).',
      suggestedSlug: hq.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        hq.sourceUrl,
        'https://universohq.com/noticias/diamba-historias-do-proibicionismo-no-brasil-que-aborda-racismo-na-proibicao-da-cannabis-e-um-lancamento-da-brasa-editora/',
        '/posts/post-inspecao-arte-diamba-sarabamba.html',
        '/posts/post-inspecao-palavra-diamba.html'
      ],
      notes: 'Livro primeiro (HQ); não confundir com coletânea Ground 1986. Indexar ≠ endossar manifesto.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-diamba-hq-paiva)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(items, {
      id: 'diamba-hq-paiva',
      word: 'Diamba (HQ Paiva)',
      simple:
        'HQ de 2023 (Daniel Paiva / Brasa) sobre o proibicionismo no Brasil. No site, inspeção em Artes — distinta da antologia Diamba Sarabamba (1986) e da ficha-palavra diamba.',
      simpleEn:
        '2023 comic (Daniel Paiva / Brasa) on prohibition in Brazil. On the site, an Arts inspection — distinct from the 1986 Diamba Sarabamba anthology and the word sheet diamba.',
      simpleEs:
        'HQ de 2023 (Daniel Paiva / Brasa) sobre el prohibicionismo en Brasil. En el sitio, inspección en Artes — distinta de la antología Diamba Sarabamba (1986) y de la ficha-palabra diamba.',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Daniel Paiva publica Diamba — Histórias do Proibicionismo no Brasil na Brasa (2023), inspirado na HQ de Box Brown sobre os EUA. A 2.ª ed. é capa dura, 192 p.',
      curiosities:
        'O título recupera o cognato afro-brasileiro. Não confundir com a cantoria/antologia «Diamba Sarabamba» (1986).'
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (diamba-hq-paiva)');
  }

  try {
    await syncSql(list);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  list.forEach((p) => {
    try {
      writeHtml(p);
    } catch (e) {
      console.warn('Aviso HTML', p.slug, e.message);
    }
  });

  list.forEach((p) => console.log('OK:', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
