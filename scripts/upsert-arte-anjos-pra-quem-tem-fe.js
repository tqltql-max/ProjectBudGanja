'use strict';

/**
 * Injeta a canção «Anjos (Pra quem tem fé)» — O Rappa.
 * Uso: node scripts/upsert-arte-anjos-pra-quem-tem-fe.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildAnjosPraQuemTemFePost,
  poemPt,
  poemEn,
  poemEs,
  WIKI
} = require('../lib/anjos-pra-quem-tem-fe-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-arte-anjos-pra-quem-tem-fe.html';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, payload, 'utf8');
      return;
    } catch (e) {
      last = e;
      await sleep(250 * (i + 1));
    }
  }
  throw last;
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
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || [])
      .map((id) => items.findIndex((x) => x.id === id))
      .find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const main =
    '    "pra quem tem fé": { tone: "warm", category: "Artes", mundane: "Locução do refrão d’O Rappa — Anjos (Pra quem tem fé), 2013.", gloss: "Canção O Rappa / Nunca Tem Fim...; a vida nunca tem fim; ≠ púlpito ≠ Hungria Amor e Fé; Valeu !!!", href: "' +
    HREF +
    '", en: "for those who have faith", es: "para quien tiene fe" },\n';
  gloss = replaceOrInsertAfter(gloss, '"pra quem tem fé"', main, '"fé"');
  const aliases = [
    [
      '"para quem tem fé"',
      '    "para quem tem fé": { gloss: "Forma plena da locução — ver Anjos (Pra quem tem fé), O Rappa.", href: "' +
        HREF +
        '", en: "for those who have faith", es: "para quien tiene fe" },\n'
    ],
    [
      '"a vida nunca tem fim"',
      '    "a vida nunca tem fim": { gloss: "Segundo hemistíquio / título do álbum Nunca Tem Fim... — ver Anjos, O Rappa.", href: "' +
        HREF +
        '", en: "life never has an end", es: "la vida nunca tiene fin" },\n'
    ],
    [
      '"nunca tem fim"',
      '    "nunca tem fim": { gloss: "Álbum 2013 d’O Rappa e eco do refrão de Anjos — ver a ficha da canção.", href: "' +
        HREF +
        '", en: "never has an end (album / hook)", es: "nunca tiene fin" },\n'
    ],
    [
      '"o rappa"',
      '    "o rappa": { gloss: "Banda carioca (1993) — nesta ficha a canção Anjos (Pra quem tem fé), 2013.", href: "' +
        HREF +
        '", en: "O Rappa", es: "O Rappa" },\n'
    ],
    [
      'rappa',
      '    rappa: { gloss: "Ver o rappa — Anjos (Pra quem tem fé).", href: "' +
        HREF +
        '", en: "O Rappa", es: "O Rappa" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, '"pra quem tem fé"');
  }
  return gloss;
}

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-anjos-pra-quem-tem-fe-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildAnjosPraQuemTemFePost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'arte-anjos-pra-quem-tem-fe',
        title: 'Anjos (Pra quem tem fé) — O Rappa e a locução que a vida não acaba',
        titleEn: 'Anjos (Pra quem tem fé) — O Rappa and the saying that life does not end',
        titleEs: 'Anjos (Pra quem tem fé) — O Rappa y la locución de que la vida no acaba',
        tipo: 'arte',
        priority: 1,
        status: 'feita',
        why: 'Artes · O Rappa — Anjos (Pra quem tem fé), 2013; locução pra quem tem fé a vida nunca tem fim; ≠ púlpito ≠ Hungria; Valeu !!!',
        whyEn: 'Arts · O Rappa — Anjos (Pra quem tem fé), 2013; saying pra quem tem fé a vida nunca tem fim; ≠ pulpit ≠ Hungria; Valeu !!!',
        whyEs: 'Artes · O Rappa — Anjos (Pra quem tem fé), 2013; locución pra quem tem fé a vida nunca tem fim; ≠ púlpito ≠ Hungria; ¡Valeu !!!',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'artes-cultura',
        sources: [
          WIKI,
          'https://pt.wikipedia.org/wiki/Nunca_Tem_Fim...',
          'https://www.youtube.com/watch?v=BPbCLtBl_g4',
          '/posts/post-inspecao-arte-amor-e-fe.html',
          '/posts/post-inspecao-expressao-eu-amo-a-vida.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — pedido locução + musica + o RAPPA; sem letra integral.'
      },
      ['arte-amor-e-fe', 'arte-girassol', 'arte-so-os-loucos-sabem']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'anjos-pra-quem-tem-fe',
        word: 'Anjos (Pra quem tem fé)',
        simple:
          'Canção d’O Rappa (2013, Nunca Tem Fim...) — locução pra quem tem fé a vida nunca tem fim; ≠ púlpito ≠ Hungria Amor e Fé. Valeu !!!',
        simpleEn:
          'O Rappa song (2013, Nunca Tem Fim...) — saying pra quem tem fé a vida nunca tem fim; ≠ pulpit ≠ Hungria Amor e Fé. Valeu !!!',
        simpleEs:
          'Canción de O Rappa (2013, Nunca Tem Fim...) — locución pra quem tem fé a vida nunca tem fim; ≠ púlpito ≠ Hungria Amor e Fé. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Single 14 mai. 2013; álbum 15 ago. 2013. Autoria Marcelo Falcão e Tom Sabóia. Pedido de campo: expressão + música + o RAPPA.',
        curiosities:
          'Falcão recusou a leitura religiosa do refrão. Infobox que cita Yuka está cortada (Yuka saiu em 2001). Irmã: Amor e Fé (Hungria).'
      },
      ['amor-e-fe', 'fé', 'eu-amo-a-vida']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss);
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'anjos-pra-quem-tem-fe',
      slug: 'anjos-pra-quem-tem-fe',
      title: 'Anjos (Pra quem tem fé)',
      titleEn: 'Anjos (Pra quem tem fé)',
      titleEs: 'Anjos (Pra quem tem fé)',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — O Rappa 2013; locução pra quem tem fé; ≠ púlpito ≠ Hungria; Valeu !!!',
      teaserEn: 'BudGanja echo — O Rappa 2013; saying pra quem tem fé; ≠ pulpit ≠ Hungria; Valeu !!!',
      teaserEs: 'Eco BudGanja — O Rappa 2013; locución pra quem tem fé; ≠ púlpito ≠ Hungria; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'rappa', 'anjos', 'fe', 'artes']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
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
