'use strict';

/**
 * Injeta A Última Casa de Ópio + Nick Tosches + A História das Coisas + Annie Leonard.
 * Uso: node scripts/upsert-opio-historia-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildAUltimaCasaDeOpioPost,
  buildAHistoriaDasCoisasPost
} = require('../lib/artes-inspecoes-posts.js');
const {
  buildNickToschesPost,
  buildAnnieLeonardPost
} = require('../lib/pessoas-historia-inspecoes-posts.js');

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
  const opio = buildAUltimaCasaDeOpioPost();
  const tosches = buildNickToschesPost();
  const historia = buildAHistoriaDasCoisasPost();
  const leonard = buildAnnieLeonardPost();
  const built = [opio, tosches, historia, leonard];

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
      id: 'arte-a-ultima-casa-de-opio',
      title: 'A Última Casa de Ópio — a procura de Tosches e a crítica ao placebo',
      titleEn: 'The Last Opium Den — Tosches’s quest and the critique of placebos',
      titleEs: 'La última casa de opio — la búsqueda de Tosches y la crítica al placebo',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes: A Última Casa de Ópio (2002) — livro primeiro; autor em Nick Tosches (Pessoas).',
      whyEn: 'Arts: The Last Opium Den (2002) — book first; author in Nick Tosches (People).',
      whyEs: 'Artes: A Última Casa de Ópio (2002) — libro primero; autor en Nick Tosches (Personas).',
      suggestedSlug: opio.slug,
      doneHref: '/posts/post-' + opio.slug + '.html',
      seriesHint: 'artes-cultura',
      sources: [opio.sourceUrl, '/posts/post-inspecao-figura-nick-tosches.html'],
      notes: 'Sem romantizar ópio; Vanity Fair → Bloomsbury 2002 → Conrad 2006.'
    });
    upsertSug(items, {
      id: 'figura-nick-tosches',
      title: 'Nick Tosches — prosa afiada e elo com A Última Casa de Ópio',
      titleEn: 'Nick Tosches — sharp prose and link to The Last Opium Den',
      titleEs: 'Nick Tosches — prosa afilada y vínculo con A Última Casa de Ópio',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas × Artes: método jornalístico-literário de Tosches com elo em A Última Casa de Ópio.',
      whyEn: 'People × Arts: Tosches’s literary-journalistic method linked to The Last Opium Den.',
      whyEs: 'Personas × Artes: método periodístico-literario de Tosches con vínculo en A Última Casa de Ópio.',
      suggestedSlug: tosches.slug,
      doneHref: '/posts/post-' + tosches.slug + '.html',
      seriesHint: 'pessoas-historia',
      sources: [tosches.sourceUrl, '/posts/post-inspecao-arte-a-ultima-casa-de-opio.html'],
      notes: 'Pessoas ≠ Legado; livro fica em Artes.'
    });
    upsertSug(items, {
      id: 'arte-a-historia-das-coisas',
      title: 'A História das Coisas — o livro de Leonard e a máquina extrair-fazer-descartar',
      titleEn: 'The Story of Stuff — Leonard’s book and the take-make-waste machine',
      titleEs: 'La historia de las cosas — el libro de Leonard y la máquina extraer-hacer-desechar',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes: A História das Coisas (2010/2011) — livro primeiro; vídeo 2007 precursor; autora em Annie Leonard.',
      whyEn: 'Arts: The Story of Stuff (2010) — book first; 2007 video precursor; author in Annie Leonard.',
      whyEs: 'Artes: A História das Coisas (2010/2011) — libro primero; vídeo 2007 precursor; autora en Annie Leonard.',
      suggestedSlug: historia.slug,
      doneHref: '/posts/post-' + historia.slug + '.html',
      seriesHint: 'artes-cultura',
      sources: [historia.sourceUrl, '/posts/post-inspecao-figura-annie-leonard.html'],
      notes: 'Free Press 2010 · Zahar 2011; vídeo Free Range 2007.'
    });
    upsertSug(items, {
      id: 'figura-annie-leonard',
      title: 'Annie Leonard — divulgação da economia dos materiais e elo com A História das Coisas',
      titleEn: 'Annie Leonard — materials-economy outreach and link to The Story of Stuff',
      titleEs: 'Annie Leonard — divulgación de la economía de materiales y vínculo con A História das Coisas',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas × Artes: método de Leonard com elo em A História das Coisas.',
      whyEn: 'People × Arts: Leonard’s method linked to The Story of Stuff.',
      whyEs: 'Personas × Artes: método de Leonard con vínculo en A História das Coisas.',
      suggestedSlug: leonard.slug,
      doneHref: '/posts/post-' + leonard.slug + '.html',
      seriesHint: 'pessoas-historia',
      sources: [leonard.sourceUrl, '/posts/post-inspecao-arte-a-historia-das-coisas.html'],
      notes: 'Pessoas ≠ Legado; livro fica em Artes.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Ópio + História das Coisas)');
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
