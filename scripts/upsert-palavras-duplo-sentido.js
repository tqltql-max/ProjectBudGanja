'use strict';

/**
 * Injeta fichas Palavras de duplo sentido + actualiza sugestões.
 * Uso: node scripts/upsert-palavras-duplo-sentido.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildGanjaPost,
  buildDiambaPost,
  buildCannabisPalavraPost,
  buildMarijuanaPost,
  buildErvaPost,
  buildDrogaPost,
  buildCanhamoPost
} = require('../lib/palavras-inspecoes-posts.js');

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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

async function main() {
  const built = [
    buildGanjaPost(),
    buildDiambaPost(),
    buildCannabisPalavraPost(),
    buildMarijuanaPost(),
    buildErvaPost(),
    buildDrogaPost(),
    buildCanhamoPost()
  ];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  built.forEach((post) => upsertPost(posts, post));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const meta = [
      ['palavra-ganja', 'Ganja — da rota índica à marca e à gíria global'],
      ['palavra-diamba', 'Diamba — cognato afro-brasileiro apagado pelo estigma'],
      ['palavra-cannabis', 'Cannabis — latinismo técnico e hierarquia de registos'],
      ['palavra-marijuana', 'Marijuana — do nome popular à arma da proibição'],
      ['palavra-erva', 'Erva — substituída por planta / plantas'],
      ['palavra-droga', 'Droga — do remédio ao ilícito no senso comum'],
      ['palavra-canhamo', 'Cânhamo — fibra industrial coberta pela confusão com droga']
    ];
    built.forEach((post, i) => {
      const [id, title] = meta[i];
      upsertSug(items, {
        id,
        title,
        titleEn: post.titleEn.replace(/^Inspection:\s*/i, ''),
        titleEs: post.titleEs.replace(/^Inspección:\s*/i, ''),
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Duplo sentido prejudicial à originalidade — ficha na série Palavras + mapa no hub.',
        whyEn: 'Double meaning that harms originality — Words sheet + hub map.',
        whyEs: 'Doble sentido que perjudica la originalidad — ficha Palabras + mapa en el hub.',
        suggestedSlug: post.slug,
        doneHref: '/posts/post-' + post.slug + '.html',
        seriesHint: 'palavras-origem',
        sources: ['/biblioteca/inspecoes/#inspecoes-palavras'],
        notes: 'Ver content/palavras-duplo-sentido.json'
      });
    });
    upsertSug(items, {
      id: 'palavra-entorpecente',
      title: 'Entorpecente — categoria técnica virada rótulo moral',
      titleEn: 'Entorpecente — technical category turned moral label',
      titleEs: 'Entorpecente — categoría técnica vuelta rótulo moral',
      tipo: 'palavra',
      priority: 4,
      status: 'ideia',
      why: 'No mapa de duplo sentido; ficha completa opcional.',
      whyEn: 'On the double-meaning map; full sheet optional.',
      whyEs: 'En el mapa de doble sentido; ficha completa opcional.',
      suggestedSlug: 'inspecao-palavra-entorpecente',
      seriesHint: 'palavras-origem',
      sources: ['/biblioteca/inspecoes/#inspecoes-palavras'],
      notes: 'Já no catálogo palavras-duplo-sentido.json (mapa).'
    });
    upsertSug(items, {
      id: 'palavra-narcotico',
      title: 'Narcótico — do torpor clínico à arma policial',
      titleEn: 'Narcótico — from clinical torpor to policing weapon',
      titleEs: 'Narcótico — del torpor clínico al arma policial',
      tipo: 'palavra',
      priority: 4,
      status: 'ideia',
      why: 'No mapa de duplo sentido; ficha completa opcional.',
      whyEn: 'On the double-meaning map; full sheet optional.',
      whyEs: 'En el mapa de doble sentido; ficha completa opcional.',
      suggestedSlug: 'inspecao-palavra-narcotico',
      seriesHint: 'palavras-origem',
      sources: ['/biblioteca/inspecoes/#inspecoes-palavras'],
      notes: 'Já no catálogo palavras-duplo-sentido.json (mapa).'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (duplo sentido)');
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
