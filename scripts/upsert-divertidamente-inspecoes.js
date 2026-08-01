'use strict';

/**
 * Injeta Divertida Mente (Artes) + emoção hub + 5 sentimentos da Riley.
 * Também actualiza caminho (elo).
 * Uso: node scripts/upsert-divertidamente-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildDivertidamentePost,
  DIVERTIDAMENTE_PALAVRAS_POSTS
} = require('../lib/divertidamente-inspecoes-posts.js');
const { buildCaminhoPost } = require('../lib/palavras-inspecoes-posts.js');

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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

async function syncSql(built) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  built.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', built.length, 'posts');
}

async function main() {
  const filme = buildDivertidamentePost();
  const caminho = buildCaminhoPost();
  const built = [filme].concat(DIVERTIDAMENTE_PALAVRAS_POSTS, [caminho]);

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  built.forEach((post) => upsertPost(posts, post));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'arte-divertida-mente',
      title: 'Divertida Mente — as emoções da Riley e a mensagem que importa',
      titleEn: 'Inside Out — Riley’s emotions and the message that matters',
      titleEs: 'Intensamente — las emociones de Riley y el mensaje que importa',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes × Palavras: literacia emocional; todas as emoções importam; rede Alegria–Tristeza–Raiva–Medo–Nojinho.',
      whyEn: 'Arts × Words: emotional literacy; every emotion matters; Joy–Sadness–Anger–Fear–Disgust network.',
      whyEs: 'Artes × Palabras: literacia emocional; todas las emociones importan.',
      suggestedSlug: filme.slug,
      doneHref: '/posts/post-' + filme.slug + '.html',
      seriesHint: 'artes-cultura',
      sources: [
        'https://pt.wikipedia.org/wiki/Divertida_Mente',
        '/posts/post-inspecao-palavra-emocao.html'
      ],
      notes: 'Filme 2015 primeiro; sequela 2024 como eco futuro.'
    });
    upsertSug(items, {
      id: 'arte-divertida-mente-2',
      title: 'Divertida Mente 2 (2024) — Ansiedade e novas emoções',
      titleEn: 'Inside Out 2 (2024) — Anxiety and new emotions',
      titleEs: 'Intensamente 2 (2024) — Ansiedad y nuevas emociones',
      tipo: 'arte',
      priority: 3,
      status: 'ideia',
      why: 'Sequela: Ansiedade, Inveja, Vergonha, Tédio — eco da ficha 2015; não substitui a génese.',
      whyEn: 'Sequel: Anxiety, Envy, Embarrassment, Ennui — echo of the 2015 sheet; does not replace the origin.',
      whyEs: 'Secuela: Ansiedad, Envidia, Vergüenza, Tedio — eco de la ficha 2015.',
      suggestedSlug: 'inspecao-filme-divertida-mente-2',
      seriesHint: 'artes-cultura',
      sources: [
        'https://pt.wikipedia.org/wiki/Divertida_Mente_2',
        '/posts/post-inspecao-filme-divertida-mente.html'
      ],
      notes: 'Só depois da ficha 2015 estável.'
    });
    [
      ['palavra-emocao', 'emoção', 'inspecao-palavra-emocao'],
      ['palavra-alegria', 'alegria', 'inspecao-palavra-alegria'],
      ['palavra-tristeza', 'tristeza', 'inspecao-palavra-tristeza'],
      ['palavra-raiva', 'raiva', 'inspecao-palavra-raiva'],
      ['palavra-medo', 'medo', 'inspecao-palavra-medo'],
      ['palavra-nojinho', 'nojinho', 'inspecao-palavra-nojinho']
    ].forEach(([id, word, slug]) => {
      upsertSug(items, {
        id: id,
        title: word.charAt(0).toUpperCase() + word.slice(1) + ' — sentimento da Riley',
        titleEn: word + ' — Riley emotion word',
        titleEs: word + ' — palabra-sentimiento de Riley',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras × Divertida Mente: literacia emocional da Riley.',
        whyEn: 'Words × Inside Out: Riley emotional literacy.',
        whyEs: 'Palabras × Divertida Mente: literacia emocional de Riley.',
        suggestedSlug: slug,
        doneHref: '/posts/post-' + slug + '.html',
        seriesHint: 'palavras-origem',
        sources: ['/posts/post-inspecao-filme-divertida-mente.html'],
        notes: 'Rede com hub emoção.'
      });
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Divertida Mente + emoções)');
  }

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  built.forEach((p) => console.log('OK:', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
