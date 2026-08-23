'use strict';

/**
 * Injeta palavra «homepage» na série Palavras.
 * Uso: node scripts/upsert-palavra-homepage-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildHomepagePost,
  WIKT,
  WIKT_HOME_PAGE,
  WIKI,
  WIKI_PT
} = require('../lib/homepage-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-palavra-homepage.html';

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

function upsertGuia(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = items.findIndex((x) => afterIds.indexOf(x.id) >= 0);
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function glossKeyRe(key) {
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('    ' + esc + ': \\{[\\s\\S]*?\\},\\r?\\n');
}

function glossHas(src, key) {
  return glossKeyRe(key).test(src);
}

function replaceGloss(src, key, line) {
  const re = glossKeyRe(key);
  if (re.test(src)) return src.replace(re, line);
  return src;
}

function insertAfterKey(src, afterKey, line) {
  const re = new RegExp('(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': \\{[\\s\\S]*?\\},\\r?\\n)');
  if (re.test(src)) return src.replace(re, '$1' + line);
  return src + line;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-homepage-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildHomepagePost());
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
    const sugId = 'palavra-homepage';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Homepage — home + page; a porta, não o Homer',
      titleEn: 'Homepage — home + page; the door, not Homer',
      titleEs: 'Homepage — home + page; la puerta, no Homer',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: homepage ← home + page; irmã página inicial; cola Homer cortada; ≠ casa ≠ landing; porta viva /.',
      whyEn: 'Words: homepage ← home + page; sister página inicial; Homer glue cut; ≠ house ≠ landing; live door /.',
      whyEs: 'Palabras: homepage ← home + page; hermana página inicial; cola Homer cortada; ≠ casa ≠ landing; puerta viva /.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        WIKT,
        WIKT_HOME_PAGE,
        WIKI,
        WIKI_PT,
        '/',
        '/posts/post-inspecao-palavra-link.html',
        '/posts/post-inspecao-palavra-conexao.html',
        '/posts/post-inspecao-palavra-caminho.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — home + page; página inicial; Homer é cola de olho; index.html = ficheiro, não étimo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-homepage)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(
      items,
      {
        id: 'homepage',
        word: 'homepage',
        simple:
          'Composto EN home + page — página inicial da rede; cola Homer cortada; ≠ casa ≠ landing; porta viva /; Valeu !!!',
        simpleEn:
          'EN compound home + page — the site’s front door; Homer glue cut; ≠ house ≠ landing; live door /; Valeu !!!',
        simpleEs:
          'Compuesto EN home + page — página inicial de la red; cola Homer cortada; ≠ casa ≠ landing; puerta viva /; ¡Valeu !!!',
        history:
          'Homepage é composto inglês de home (OE hām, morada / ponto de partida) + page (lat. pāgina, folha). Na WWW dos anos 1990 passou a nomear a primeira página do sítio. O calco português é página inicial. Homer é cola de olho, não étimo.',
        curiosities:
          'No laboratório a homepage vive em /. O ficheiro clássico é index.html — convenção de servidor, não origem da palavra. Landing page é campanha; a casinha do browser é o gesto de voltar à porta.',
        historyEn:
          'Homepage is an English compound of home (OE hām, dwelling / starting place) + page (Lat. pāgina, leaf). On the 1990s WWW it named the site’s first page. The Portuguese calque is página inicial. Homer is eye-glue, not an etymon.',
        curiositiesEn:
          'In the lab the homepage lives at /. The classic file is index.html — a server convention, not the word’s origin. A landing page is a campaign; the browser house icon is the gesture of going back to the door.',
        historyEs:
          'Homepage es un compuesto inglés de home (OE hām, morada / punto de partida) + page (lat. pāgina, hoja). En la WWW de los años 1990 nombró la primera página del sitio. El calco portugués es página inicial. Homer es cola de ojo, no étimo.',
        curiositiesEs:
          'En el laboratorio la homepage vive en /. El fichero clásico es index.html — convención de servidor, no origen de la palabra. Landing page es campaña; la casita del navegador es el gesto de volver a la puerta.',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['node', 'nuds', 'script', 'link']
    );
    upsertGuia(
      items,
      {
        id: 'pagina-inicial',
        word: 'página inicial',
        simple:
          'Calco PT de homepage — porta do sítio; ≠ casa ≠ landing; ≠ Homer; ver ficha homepage.',
        simpleEn:
          'PT calque of homepage — the site’s door; ≠ house ≠ landing; ≠ Homer; see homepage sheet.',
        simpleEs:
          'Calco PT de homepage — puerta del sitio; ≠ casa ≠ landing; ≠ Homer; ver ficha homepage.',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['homepage']
    );
    upsertGuia(
      items,
      {
        id: 'home-page',
        word: 'home page',
        simple:
          'Grafia em duas palavras de homepage — o mesmo composto home + page; ver ficha homepage.',
        simpleEn:
          'Two-word spelling of homepage — the same home + page compound; see homepage sheet.',
        simpleEs:
          'Grafía en dos palabras de homepage — el mismo compuesto home + page; ver ficha homepage.',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['pagina-inicial']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (homepage / página inicial / home page)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entries = {
      homepage:
        '    homepage: { tone: "craft", category: "Léxico", mundane: "Empréstimo EN — página inicial da rede (home + page).", gloss: "Composto home + page; irmã página inicial; ≠ Homer ≠ casa ≠ landing; porta viva /; Valeu !!!", href: "/posts/post-inspecao-palavra-homepage.html", en: "homepage", es: "página de inicio", fr: "page d’accueil", it: "homepage / pagina iniziale", de: "Startseite", el: "αρχική σελίδα", la: "pagina prima", yo: "ojú-ewé ilé", sw: "ukurasa wa nyumbani", gez: "gäṣṣä bet", nl: "startpagina", pl: "strona główna", ru: "домашняя страница", uk: "домашня сторінка", zh: "主页", ja: "ホームページ", ko: "홈페이지", ar: "الصفحة الرئيسية", he: "דף הבית", hi: "होमपेज", tr: "ana sayfa", sv: "hemsida", da: "hjemmeside", no: "hjemmeside", fi: "kotisivu", cs: "domovská stránka", ro: "pagină de start", hu: "kezdőlap", ca: "pàgina d’inici", gl: "páxina de inicio", eu: "hasiera-orria", gn: "kuatia ñepyrũ", qu: "qallariy p’anqa", eo: "ĉefpaĝo", vi: "trang chủ", id: "beranda", th: "หน้าแรก", hr: "početna stranica", sk: "domovská stránka", ga: "leathanach baile", cy: "hafan", ha: "shafin gida", am: "መነሻ ገጽ", fa: "صفحه اصلی", bn: "হোমপেজ", zu: "ikhasi lasekhaya" },\n',
      homepages:
        '    homepages: { gloss: "Plural de homepage — páginas iniciais; ver ficha homepage.", href: "/posts/post-inspecao-palavra-homepage.html", en: "homepages", es: "páginas de inicio" },\n',
      '"home page"':
        '    "home page": { gloss: "Grafia em duas palavras de homepage — home + page; ver ficha homepage.", href: "/posts/post-inspecao-palavra-homepage.html", en: "home page", es: "página de inicio" },\n',
      '"página inicial"':
        '    "página inicial": { tone: "craft", category: "Léxico", mundane: "Calco PT de homepage — porta do sítio.", gloss: "Página inicial = homepage; ≠ casa ≠ landing; ≠ Homer; Valeu !!!", href: "/posts/post-inspecao-palavra-homepage.html", en: "home page / homepage", es: "página de inicio" },\n',
      '"pagina inicial"':
        '    "pagina inicial": { gloss: "Grafia sem acento de página inicial — ver homepage.", href: "/posts/post-inspecao-palavra-homepage.html", en: "home page (unaccented)", es: "página de inicio (sin tilde)" },\n',
      home:
        '    home: { gloss: "Empréstimo EN no web — a homepage / página inicial; ≠ Homer; ≠ casa (domus); ver ficha homepage.", href: "/posts/post-inspecao-palavra-homepage.html", en: "home (web)", es: "inicio (web)" },\n',
      homer:
        '    homer: { tone: "caution", category: "Léxico", mundane: "Nome / personagem — a orelha cola em home; não é homepage.", gloss: "Homer ≠ home; homepage = home + page; ver ficha homepage.", href: "/posts/post-inspecao-palavra-homepage.html", en: "Homer (not homepage)", es: "Homer (no es homepage)" },\n',
      landing:
        '    landing: { gloss: "Landing page — página de campanha; ≠ homepage (porta do sítio); ver ficha homepage.", href: "/posts/post-inspecao-palavra-homepage.html", en: "landing (page)", es: "landing (página)" },\n'
    };

    const chain = [
      ['nodejs', 'homepage'],
      ['homepage', 'homepages'],
      ['homepages', '"home page"'],
      ['"home page"', '"página inicial"'],
      ['"página inicial"', '"pagina inicial"'],
      ['"pagina inicial"', 'home'],
      ['home', 'homer'],
      ['homer', 'landing']
    ];
    for (const [after, key] of chain) {
      if (glossHas(gloss, key)) gloss = replaceGloss(gloss, key, entries[key]);
      else gloss = insertAfterKey(gloss, after, entries[key]);
    }

    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (homepage / home / Homer / página inicial)');
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
