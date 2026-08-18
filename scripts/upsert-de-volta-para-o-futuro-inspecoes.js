'use strict';

/**
 * Injeta De Volta para o Futuro (Artes) + Michael J. Fox + Christopher Lloyd (Pessoas).
 * Uso: node scripts/upsert-de-volta-para-o-futuro-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildDeVoltaParaOFuturoPost,
  buildMichaelJFoxPost,
  buildChristopherLloydPost
} = require('../lib/de-volta-para-o-futuro-inspecoes-posts.js');

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
  [
    'generate-de-volta-para-o-futuro-cover.js',
    'generate-michael-j-fox-cover.js',
    'generate-christopher-lloyd-cover.js'
  ].forEach((script) => {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit'
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  });

  const filme = buildDeVoltaParaOFuturoPost();
  const fox = buildMichaelJFoxPost();
  const lloyd = buildChristopherLloydPost();
  const list = [filme, fox, lloyd];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const filmeHref = '/posts/post-' + filme.slug + '.html';
  const foxHref = '/posts/post-' + fox.slug + '.html';
  const lloydHref = '/posts/post-' + lloyd.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'arte-de-volta-para-o-futuro',
      title: 'De Volta para o Futuro — 1985 e homenagem aos actores',
      titleEn: 'Back to the Future — 1985 and homage to the actors',
      titleEs: 'Back to the Future — 1985 y homenaje a los actores',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes: filme 1985 + crédito às pessoas (Fox, Lloyd e o elenco).',
      whyEn: 'Arts: 1985 film + credit to the people (Fox, Lloyd and the cast).',
      whyEs: 'Artes: filme 1985 + crédito a las personas (Fox, Lloyd y el elenco).',
      suggestedSlug: filme.slug,
      doneHref: filmeHref,
      seriesHint: 'artes-cultura',
      sources: [filme.sourceUrl, foxHref, lloydHref, 'https://www.youtube.com/watch?v=qvsgGtivCgs'],
      notes: 'Homenagem aos actores. Pessoa ≠ personagem.'
    });
    upsertSug(items, {
      id: 'figura-michael-j-fox',
      title: 'Michael J. Fox — presença, ofício e De Volta para o Futuro',
      titleEn: 'Michael J. Fox — presence, craft and Back to the Future',
      titleEs: 'Michael J. Fox — presencia, oficio y Back to the Future',
      tipo: 'pessoas',
      priority: 1,
      status: 'feita',
      why: 'Pessoas × Artes: Michael J. Fox — pessoa, não personagem nem ficha de doença.',
      whyEn: 'People × Arts: Michael J. Fox — the person, not the character or a disease sheet.',
      whyEs: 'Personas × Artes: Michael J. Fox — la persona, no el personaje ni ficha de enfermedad.',
      suggestedSlug: fox.slug,
      doneHref: foxHref,
      seriesHint: 'pessoas-historia',
      sources: [fox.sourceUrl, filmeHref, 'https://www.michaeljfox.org/']
    });
    upsertSug(items, {
      id: 'figura-christopher-lloyd',
      title: 'Christopher Lloyd — presença, improviso e De Volta para o Futuro',
      titleEn: 'Christopher Lloyd — presence, improvisation and Back to the Future',
      titleEs: 'Christopher Lloyd — presencia, improvisación y Back to the Future',
      tipo: 'pessoas',
      priority: 1,
      status: 'feita',
      why: 'Pessoas × Artes: Christopher Lloyd — pessoa, não persona do Doc.',
      whyEn: 'People × Arts: Christopher Lloyd — the person, not the Doc persona.',
      whyEs: 'Personas × Artes: Christopher Lloyd — la persona, no la persona de Doc.',
      suggestedSlug: lloyd.slug,
      doneHref: lloydHref,
      seriesHint: 'pessoas-historia',
      sources: [lloyd.sourceUrl, filmeHref]
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (filme + Fox + Lloyd)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(items, {
      id: 'de-volta-para-o-futuro',
      word: 'De Volta para o Futuro',
      simple:
        'Filme de 1985 (Zemeckis/Gale); no site, inspeção em Artes com homenagem aos actores e fichas de Fox e Lloyd.',
      simpleEn:
        '1985 film (Zemeckis/Gale); on the site, an Arts inspection honoring the actors, with Fox and Lloyd sheets.',
      simpleEs:
        'Filme de 1985 (Zemeckis/Gale); en el sitio, inspección en Artes con homenaje a los actores y fichas de Fox y Lloyd.',
      group: 'lexico',
      fromTitle: false,
      href: filmeHref
    });
    upsertGuia(items, {
      id: 'michael-j-fox',
      word: 'Michael J. Fox',
      simple:
        'Actor (Michael Andrew Fox); no site, ficha em Pessoas com elo em De Volta para o Futuro — pessoa, não personagem.',
      simpleEn:
        'Actor (Michael Andrew Fox); on the site, a People sheet linked to Back to the Future — the person, not the character.',
      simpleEs:
        'Actor (Michael Andrew Fox); en el sitio, ficha en Personas con vínculo en Back to the Future — la persona, no el personaje.',
      group: 'lexico',
      fromTitle: false,
      href: foxHref
    });
    upsertGuia(items, {
      id: 'christopher-lloyd',
      word: 'Christopher Lloyd',
      simple:
        'Actor; no site, ficha em Pessoas com elo em De Volta para o Futuro — pessoa, não persona do Doc.',
      simpleEn:
        'Actor; on the site, a People sheet linked to Back to the Future — the person, not the Doc persona.',
      simpleEs:
        'Actor; en el sitio, ficha en Personas con vínculo en Back to the Future — la persona, no la persona de Doc.',
      group: 'lexico',
      fromTitle: false,
      href: lloydHref
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado');
  }

  try {
    await syncSql(list);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  list.forEach((p) => console.log('OK:', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
