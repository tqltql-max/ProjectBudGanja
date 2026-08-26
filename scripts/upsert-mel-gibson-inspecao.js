'use strict';

/**
 * Injeta Mel Gibson (Pessoas) e reescreve as duas fichas Artes com elo Pessoas.
 * Uso: node scripts/upsert-mel-gibson-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildMelGibsonPost } = require('../lib/mel-gibson-inspecao-post.js');
const { buildCoracaoValentePost } = require('../lib/coracao-valente-inspecao-post.js');
const { buildPaixaoDeCristoPost } = require('../lib/paixao-de-cristo-inspecao-post.js');
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

function upsertEntry(items, key, entry) {
  const i = items.findIndex((x) => x[key] === entry[key]);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else items.push(entry);
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

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-mel-gibson-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 40000
    });
  } catch (e) {
    console.warn('Aviso capa', e.message);
  }

  const gibson = buildMelGibsonPost();
  const valente = buildCoracaoValentePost();
  const paixao = buildPaixaoDeCristoPost();
  const list = [gibson, valente, paixao];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const gibsonHref = '/posts/post-' + gibson.slug + '.html';
  const valenteHref = '/posts/post-' + valente.slug + '.html';
  const paixaoHref = '/posts/post-' + paixao.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertEntry(items, 'id', {
      id: 'figura-mel-gibson',
      title: 'Mel Gibson — ofício de ecrã, realização e as duas obras',
      titleEn: 'Mel Gibson — screen craft, directing and the two works',
      titleEs: 'Mel Gibson — oficio de pantalla, dirección y las dos obras',
      tipo: 'pessoas',
      priority: 1,
      status: 'feita',
      why: 'Pessoas × Artes: Mel Gibson — actor / realizador / Icon; elos em Coração Valente e A Paixão de Cristo, fichas separadas.',
      whyEn: 'People × Arts: Mel Gibson — actor / director / Icon; links to Braveheart and The Passion of the Christ, separate sheets.',
      whyEs: 'Personas × Artes: Mel Gibson — actor / director / Icon; vínculos en Braveheart y A Paixão de Cristo, fichas separadas.',
      suggestedSlug: gibson.slug,
      doneHref: gibsonHref,
      seriesHint: 'pessoas-historia',
      sources: [gibson.sourceUrl, valenteHref, paixaoHref],
      notes: 'Pessoa e ofício. Wallace ≠ Gibson; Jesus no ecrã ≠ Gibson. Sem dossiê de escândalo.'
    });
    const valenteSug = items.find((x) => x.id === 'arte-filme-coracao-valente');
    if (valenteSug) {
      const srcs = Array.isArray(valenteSug.sources) ? valenteSug.sources : [];
      if (!srcs.includes(gibsonHref)) srcs.push(gibsonHref);
      valenteSug.sources = srcs;
    }
    const paixaoSug = items.find((x) => x.id === 'arte-filme-a-paixao-de-cristo');
    if (paixaoSug) {
      const srcs = Array.isArray(paixaoSug.sources) ? paixaoSug.sources : [];
      if (!srcs.includes(gibsonHref)) srcs.push(gibsonHref);
      paixaoSug.sources = srcs;
    }
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Gibson + elos nas duas obras)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertEntry(items, 'id', {
      id: 'mel-gibson',
      word: 'Mel Gibson',
      simple:
        'Actor e realizador; no site, ficha em Pessoas com elos em Coração Valente (1995) e A Paixão de Cristo (2004) — ofício, não cartaz nem dossiê.',
      simpleEn:
        'Actor and director; on the site, a People sheet linked to Braveheart (1995) and The Passion of the Christ (2004) — craft, not a poster or a dossier.',
      simpleEs:
        'Actor y director; en el sitio, ficha en Personas con vínculos en Braveheart (1995) y A Paixão de Cristo (2004) — oficio, no cartel ni dossier.',
      group: 'lexico',
      fromTitle: false,
      href: gibsonHref
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado');
  }

  list.forEach(writeHtml);

  try {
    const { publishStaticAssets } = require('../lib/publish-static.js');
    publishStaticAssets(ROOT);
    console.log('Listagens actualizadas');
  } catch (e) {
    console.warn('Aviso listagens', e.message);
  }

  list.forEach((p) => console.log('OK:', p.title));
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
