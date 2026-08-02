'use strict';

/**
 * Injeta homenagem Ramón Valdés + inspeção do programa Chaves / turma.
 * Uso: node scripts/upsert-chaves-turma-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildRamonValdesPost,
  buildChavesProgramaPost
} = require('../lib/chaves-turma-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

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

async function syncSql(postsToSync) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  postsToSync.forEach((p) => upsertPost(posts, p));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', postsToSync.map((p) => p.slug).join(', '));
}

async function main() {
  const postsToUpsert = [buildRamonValdesPost(), buildChavesProgramaPost()];
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  postsToUpsert.forEach((p) => upsertPost(posts, p));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  postsToUpsert.forEach((p) => writeI18n(i18n, p));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const entries = [
      {
        id: 'figura-ramon-valdes',
        title: 'Ramón Valdés — Seu Madruga e os devidos méritos',
        titleEn: 'Ramón Valdés — Seu Madruga and due credit',
        titleEs: 'Ramón Valdés — Don Ramón y los méritos debidos',
        tipo: 'pessoas',
        priority: 1,
        status: 'feita',
        why: 'Pessoas: homenagem a Ramón Valdés / Seu Madruga — ofício, dignidade e legado infantil.',
        whyEn: 'People: homage to Ramón Valdés / Seu Madruga — craft, dignity and childhood legacy.',
        whyEs: 'Personas: homenaje a Ramón Valdés / Don Ramón — oficio, dignidad y legado infantil.',
        suggestedSlug: 'inspecao-figura-ramon-valdes',
        doneHref: '/posts/post-inspecao-figura-ramon-valdes.html',
        seriesHint: 'pessoas-historia',
        sources: [
          'https://pt.wikipedia.org/wiki/Ram%C3%B3n_Vald%C3%A9s',
          '/posts/post-inspecao-serie-chaves-el-chavo.html',
          '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
        ],
        notes: 'Homenagem com méritos explícitos.'
      },
      {
        id: 'serie-chaves-el-chavo',
        title: 'Chaves (El Chavo del Ocho) — a turma e o bem que ensina',
        titleEn: 'El Chavo del Ocho — the cast and what it teaches',
        titleEs: 'El Chavo del Ocho — la tropa y lo bueno que enseña',
        tipo: 'arte',
        priority: 1,
        status: 'feita',
        why: 'Artes: programa + méritos da turma + recomendação mediada para crianças.',
        whyEn: 'Arts: show + cast merits + mediated kids recommendation.',
        whyEs: 'Artes: programa + méritos de la tropa + recomendación infantil mediada.',
        suggestedSlug: 'inspecao-serie-chaves-el-chavo',
        doneHref: '/posts/post-inspecao-serie-chaves-el-chavo.html',
        seriesHint: 'artes-cultura',
        sources: [
          'https://pt.wikipedia.org/wiki/El_Chavo_del_Ocho',
          '/posts/post-inspecao-figura-ramon-valdes.html',
          '/vida/'
        ],
        notes: 'Recomendação infantil com mediação parental.'
      }
    ];
    entries.forEach((entry) => {
      const si = items.findIndex((x) => x.id === entry.id);
      if (si >= 0) items[si] = Object.assign({}, items[si], entry);
      else items.push(entry);
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (chaves turma)');
  }

  try {
    await syncSql(postsToUpsert);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  postsToUpsert.forEach((p) => console.log('OK:', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
