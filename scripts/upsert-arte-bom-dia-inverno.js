'use strict';

/**
 * Divulgação «Bom dia, Inverno» + lote temático no Guia + popup.
 * Uso: node scripts/upsert-arte-bom-dia-inverno.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildBomDiaInvernoPost,
  GUIA_TAMARA_INVERNO_ITEMS,
  POST_HREF
} = require('../lib/bom-dia-inverno-inspecao-post.js');
const {
  buildTamaraKlinkInspecaoPost
} = require('../lib/klink-legado-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const UPDATE_FILE = path.join(ROOT, 'content', 'site-update.json');

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
  const post = buildBomDiaInvernoPost();
  const tamara = buildTamaraKlinkInspecaoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  upsertPost(posts, tamara);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, tamara);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = POST_HREF;

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-bom-dia-inverno';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Bom dia, Inverno — divulgação Tamara Klink',
      titleEn: 'Bom dia, Inverno — Tamara Klink promotion',
      titleEs: 'Bom dia, Inverno — divulgación Tamara Klink',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Livro + lote temático (barco, mar, gelo, balde, caminho) + imagem UOL/Roda Viva.',
      whyEn: 'Book + thematic lexicon (boat, sea, ice, bucket, path) + UOL/Roda Viva image.',
      whyEs: 'Libro + léxico temático (barco, mar, hielo, balde, camino) + imagen UOL/Roda Viva.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        href,
        '/posts/post-inspecao-tamara-klink.html',
        '/posts/post-inspecao-palavra-balde.html',
        '/guia/palavras.html',
        'https://www.youtube.com/watch?v=V3GSlr5sp7c'
      ],
      notes: 'Divulgação editorial sem afiliação; crédito de imagem na ficha.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-bom-dia-inverno)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    if (!Array.isArray(guia.items)) guia.items = [];
    let n = 0;
    for (const item of GUIA_TAMARA_INVERNO_ITEMS) {
      const gi = guia.items.findIndex((x) => x.id === item.id);
      if (gi >= 0) {
        guia.items[gi] = Object.assign({}, guia.items[gi], item);
      } else {
        guia.items.push(item);
      }
      n += 1;
    }
    // reforçar elos já existentes do universo
    const boost = [
      {
        id: 'balde',
        href: '/posts/post-inspecao-palavra-balde.html',
        note: 'Q&A Tamara: balde no enjoo da navegação'
      },
      { id: 'caminho', href: '/posts/post-inspecao-palavra-caminho.html' },
      { id: 'passar', href: '/posts/post-inspecao-palavra-passar.html' },
      { id: 'animais', href: '/animais/' }
    ];
    for (const b of boost) {
      const gi = guia.items.findIndex((x) => x.id === b.id);
      if (gi >= 0 && !guia.items[gi].href) guia.items[gi].href = b.href;
    }
    guia.items.sort((a, b) =>
      String(a.word || '').localeCompare(String(b.word || ''), 'pt', { sensitivity: 'base' })
    );
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia: lote Tamara/Inverno ~' + n + ' | total', guia.items.length);
  }

  const update = {
    id: 'bom-dia-inverno-2026-08',
    href: href,
    linkLabel: {
      'pt-BR': 'Abrir divulgação',
      en: 'Open promotion',
      es: 'Abrir divulgación'
    },
    label: {
      'pt-BR': 'Divulgação',
      en: 'Promotion',
      es: 'Divulgación'
    },
    title: {
      'pt-BR': 'Bom dia, Inverno — Tamara Klink no laboratório',
      en: 'Bom dia, Inverno — Tamara Klink in the lab',
      es: 'Bom dia, Inverno — Tamara Klink en el laboratorio'
    },
    text: {
      'pt-BR':
        'Livro da invernagem ártica cruzado com barco, mar, gelo, balde e caminho. Léxico novo no Guia de Palavras.',
      en: 'Arctic overwintering book crossed with boat, sea, ice, bucket and path. New lexicon in the Words Guide.',
      es: 'Libro de la invernada ártica cruzado con barco, mar, hielo, balde y camino. Léxico nuevo en la Guía.'
    },
    cta: {
      'pt-BR': 'Depois',
      en: 'Later',
      es: 'Luego'
    }
  };
  fs.writeFileSync(UPDATE_FILE, JSON.stringify(update, null, 2) + '\n', 'utf8');
  console.log('site-update.json →', update.id);

  try {
    await syncSql(post);
    await syncSql(tamara);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
