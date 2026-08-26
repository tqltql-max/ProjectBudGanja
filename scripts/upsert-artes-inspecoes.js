'use strict';

/**
 * Injeta / actualiza todas as inspeções da série Artes (artes-cultura).
 * Uso: node scripts/upsert-artes-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { ARTES_INSPECOES_POSTS } = require('../lib/artes-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    return 'updated';
  }
  posts.unshift(post);
  return 'inserted';
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
  console.log('SQL store actualizado:', built.length, 'inspeções Artes');
}

const SUG_BY_SLUG = {
  'inspecao-arte-send-me-on-my-way': {
    id: 'arte-send-me-on-my-way',
    title: 'Send Me On My Way — a canção Rusted Root e o caminho',
    titleEn: 'Send Me On My Way — the Rusted Root song and the path',
    titleEs: 'Send Me On My Way — la canción de Rusted Root y el camino',
    why: 'Artes: génese da canção (1992/1994) primeiro; BudGanja Radio como eco secundário.',
    whyEn: 'Arts: song genesis (1992/1994) first; BudGanja Radio as secondary echo.',
    whyEs: 'Artes: génesis de la canción (1992/1994) primero; BudGanja Radio como eco secundario.',
    notes: 'Origem primeiro; uso na rádio secundário.'
  },
  'inspecao-arte-so-os-loucos-sabem': {
    id: 'arte-so-os-loucos-sabem',
    title: 'Só os Loucos Sabem — a canção CBJr e o recomeço',
    titleEn: 'Só os Loucos Sabem — the CBJr song and the restart',
    titleEs: 'Só os Loucos Sabem — la canción CBJr y el recomienzo',
    why: 'Artes: origem em Camisa 10 (2009); ao vivo / rádio como eco secundário.',
    whyEn: 'Arts: origin in Camisa 10 (2009); live / radio as secondary echo.',
    whyEs: 'Artes: origen en Camisa 10 (2009); en vivo / radio como eco secundario.',
    notes: 'Estúdio 2009 primeiro; Chegou Quem Faltava / rádio secundário.'
  },
  'inspecao-filme-the-matrix': {
    id: 'arte-the-matrix',
    title: 'The Matrix — a obra Wachowski e a pergunta do real',
    titleEn: 'The Matrix — the Wachowski work and the question of the real',
    titleEs: 'The Matrix — la obra Wachowski y la pregunta de lo real',
    why: 'Artes · cinema: génese 1999 e influências primeiro; Keanu em Pessoas (secundário).',
    whyEn: 'Arts · film: 1999 genesis and influences first; Keanu in People (secondary).',
    whyEs: 'Artes · cine: génesis 1999 e influencias primero; Keanu en Personas (secundario).',
    notes: 'Filme primeiro; biografia do actor fora deste recorte.'
  },
  'inspecao-filme-alice-no-pais-das-maravilhas': {
    id: 'arte-alice-no-pais-das-maravilhas',
    title: 'Alice no País das Maravilhas — o livro de Carroll e o buraco do coelho',
    titleEn: 'Alice in Wonderland — Carroll’s book and the rabbit hole',
    titleEs: 'Alicia en el país de las maravillas — el libro de Carroll y la madriguera',
    why: 'Artes: Alice começa no livro de Lewis Carroll (1865); Disney 1951 como adaptação.',
    whyEn: 'Arts: Alice begins with Lewis Carroll’s book (1865); Disney 1951 as adaptation.',
    whyEs: 'Artes: Alicia empieza en el libro de Lewis Carroll (1865); Disney 1951 como adaptación.',
    notes: 'Livro primeiro (1862–1865); filme = eco.'
  }
};

async function main() {
  const built = ARTES_INSPECOES_POSTS;
  if (!built.length) throw new Error('Nenhuma inspeção Artes no builder');

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  let inserted = 0;
  let updated = 0;
  built.forEach((post) => {
    const action = upsertPost(posts, post);
    if (action === 'inserted') inserted += 1;
    else updated += 1;
  });
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    built.forEach((post) => {
      const meta = SUG_BY_SLUG[post.slug];
      if (!meta) return;
      const href = '/posts/post-' + post.slug + '.html';
      const entry = {
        id: meta.id,
        title: meta.title,
        titleEn: meta.titleEn,
        titleEs: meta.titleEs,
        tipo: 'arte',
        priority: 2,
        status: 'feita',
        why: meta.why,
        whyEn: meta.whyEn,
        whyEs: meta.whyEs,
        suggestedSlug: post.slug,
        doneHref: href,
        seriesHint: 'artes-cultura',
        sources: [post.sourceUrl, href].filter(Boolean),
        notes: meta.notes
      };
      const si = items.findIndex((x) => x.id === meta.id);
      if (si >= 0) items[si] = Object.assign({}, items[si], entry);
      else items.push(entry);
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões Artes actualizadas');
  }

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log(
    'OK: artes-cultura —',
    built.length,
    'inspeções (',
    inserted,
    'novas,',
    updated,
    'actualizadas)'
  );
  built.forEach((p) => console.log(' ·', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
