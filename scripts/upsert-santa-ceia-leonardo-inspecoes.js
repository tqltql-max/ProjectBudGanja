'use strict';

/**
 * Injeta Santa Ceia (Artes) + Leonardo da Vinci (Pessoas).
 * Uso: node scripts/upsert-santa-ceia-leonardo-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildSantaCeiaPost } = require('../lib/santa-ceia-inspecao-post.js');
const { buildLeonardoDaVinciPost } = require('../lib/leonardo-da-vinci-inspecao-post.js');
const { buildPaixaoDeCristoPost } = require('../lib/paixao-de-cristo-inspecao-post.js');
const { buildDozeApostolosPost } = require('../lib/doze-apostolos-inspecao-post.js');
const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');

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

function writeHtml(post) {
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertGuia(items, entry, afterId) {
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = afterId ? items.findIndex((x) => x.id === afterId) : -1;
  if (after >= 0) items.splice(after + 1, 0, entry);
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
  [
    'generate-santa-ceia-cover.js',
    'generate-leonardo-da-vinci-cover.js'
  ].forEach((script) => {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 60000
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  });

  const obra = buildSantaCeiaPost();
  const autor = buildLeonardoDaVinciPost();
  const paixao = buildPaixaoDeCristoPost();
  const doze = buildDozeApostolosPost();
  const built = [obra, autor, paixao, doze];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  built.forEach((post) => upsertPost(posts, post));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const obraHref = '/posts/post-' + obra.slug + '.html';
  const autorHref = '/posts/post-' + autor.slug + '.html';
  const paixaoHref = '/posts/post-' + paixao.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'arte-santa-ceia',
      title: 'Santa Ceia — A Última Ceia de Leonardo da Vinci',
      titleEn: 'The Last Supper — Leonardo da Vinci’s mural in Milan',
      titleEs: 'La última cena — el mural de Leonardo da Vinci en Milán',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes: Santa Ceia / A Última Ceia (1495–1498) — Evangelhos primeiro; mural ≠ sacramento. Autor em Leonardo da Vinci (Pessoas).',
      whyEn: 'Arts: The Last Supper (1495–1498) — Gospels first; mural ≠ sacrament. Author in Leonardo da Vinci (People).',
      whyEs: 'Artes: La última cena (1495–1498) — Evangelios primero; mural ≠ sacramento. Autor en Leonardo da Vinci (Personas).',
      suggestedSlug: obra.slug,
      doneHref: obraHref,
      seriesHint: 'artes-cultura',
      sources: [obra.sourceUrl, autorHref, paixaoHref, 'https://www.youtube.com/watch?v=XCg7o4onjxs'],
      notes: 'João ≠ Madalena. Técnica a seco. Ficha própria, distinta de A Paixão de Cristo.'
    });
    upsertSug(items, {
      id: 'figura-leonardo-da-vinci',
      title: 'Leonardo da Vinci — ofício de olhar e elo com a Santa Ceia',
      titleEn: 'Leonardo da Vinci — the craft of looking and the Last Supper',
      titleEs: 'Leonardo da Vinci — el oficio de mirar y La última cena',
      tipo: 'pessoas',
      priority: 1,
      status: 'feita',
      why: 'Pessoas × Artes: método de inspeção visual de Leonardo com elo na Santa Ceia.',
      whyEn: 'People × Arts: Leonardo’s visual inspection craft linked to The Last Supper.',
      whyEs: 'Personas × Artes: oficio de inspección visual de Leonardo con vínculo en La última cena.',
      suggestedSlug: autor.slug,
      doneHref: autorHref,
      seriesHint: 'pessoas-historia',
      sources: [autor.sourceUrl, obraHref],
      notes: 'Pessoas ≠ Legado; ≠ Código Da Vinci; mural fica em Artes.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Santa Ceia + Leonardo)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(
      items,
      {
        id: 'santa-ceia',
        word: 'Santa Ceia',
        simple:
          'Pintura mural de Leonardo da Vinci (1495–1498, Milão); no site, inspeção em Artes (A Última Ceia / Santa Ceia). Evangelhos primeiro; mural ≠ sacramento. Autor em Pessoas.',
        simpleEn:
          'Leonardo da Vinci mural (1495–1498, Milan); on the site, an Arts inspection (The Last Supper). Gospels first; mural ≠ sacrament. Author in People.',
        simpleEs:
          'Mural de Leonardo da Vinci (1495–1498, Milán); en el sitio, inspección en Artes (La última cena). Evangelios primero; mural ≠ sacramento. Autor en Personas.',
        group: 'lexico',
        fromTitle: false,
        href: obraHref
      },
      'a-paixao-de-cristo'
    );
    upsertGuia(
      items,
      {
        id: 'leonardo-da-vinci',
        word: 'Leonardo da Vinci',
        simple:
          'Pintor e desenhador (1452–1519); no site, ficha em Pessoas com elo ao mural Santa Ceia / A Última Ceia. Distinto do romance Código Da Vinci.',
        simpleEn:
          'Painter and draughtsman (1452–1519); on the site, People sheet linked to The Last Supper mural. Distinct from The Da Vinci Code novel.',
        simpleEs:
          'Pintor y dibujante (1452–1519); en el sitio, ficha en Personas con vínculo a La última cena. Distinto de la novela El código Da Vinci.',
        group: 'lexico',
        fromTitle: false,
        href: autorHref
      },
      'paulo-coelho'
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (santa-ceia, leonardo-da-vinci)');
  }

  built.forEach(writeHtml);

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  try {
    const { publishStaticAssets } = require('../lib/publish-static.js');
    publishStaticAssets(ROOT);
    console.log('Listagens actualizadas');
  } catch (e) {
    console.warn('Aviso listagens', e.message);
  }

  built.forEach((p) => console.log('OK:', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
