'use strict';

/**
 * Injeta a palavra «Internet» na série Palavras (lapso Intenet).
 * Uso: node scripts/upsert-palavra-internet-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildInternetPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT
} = require('../lib/internet-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-internet.html';

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

function langsInternet() {
  return 'en: "Internet", es: "Internet", fr: "Internet", it: "Internet", de: "Internet", el: "Διαδίκτυο", la: "interrete", yo: "Íntánẹ́ẹ̀tì", sw: "intaneti", gez: "ኢንተርኔት", nl: "internet", pl: "internet", ru: "интернет", uk: "інтернет", zh: "互联网", ja: "インターネット", ko: "인터넷", ar: "الإنترنت", he: "אינטרנט", hi: "इंटरनेट", tr: "internet", sv: "internet", da: "internet", no: "internett", fi: "internet", cs: "internet", ro: "internet", hu: "internet", ca: "Internet", gl: "Internet", eu: "Internet", gn: "internet", qu: "internet", eo: "interreto", vi: "internet", id: "internet", th: "อินเทอร์เน็ต", hr: "internet", sk: "internet", ga: "idirlíon", cy: "rhyngrwyd", ha: "intanet", am: "ኢንተርኔት", fa: "اینترنت", bn: "ইন্টারনেট", zu: "i-inthanethi"';
}

function patchGlossary(gloss) {
  const main =
    '    internet: { tone: "craft", category: "Léxico", mundane: "A rede das redes — empréstimo EN (inter- + net).", gloss: "Internet ← internetwork; Intenet = lapso (cai o r); ≠ WWW ≠ discada ≠ login; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langsInternet() +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'internet', main, 'login');
  const aliases = [
    [
      'intenet',
      '    intenet: { gloss: "Lapso de Internet — cai o r de inter-; ver ficha Internet.", href: "' +
        HREF +
        '", en: "slip of Internet", es: "lapsus de Internet" },\n'
    ],
    [
      'internete',
      '    internete: { gloss: "Oral BR de Internet — o mesmo lema; ver Internet.", href: "' +
        HREF +
        '", en: "spoken Internet", es: "Internet oral" },\n'
    ],
    [
      'www',
      '    www: { gloss: "World Wide Web — teia de páginas sobre a Internet, não a rede ela mesma. Ver Internet.", href: "' +
        HREF +
        '", en: "World Wide Web", es: "World Wide Web" },\n'
    ],
    [
      'intranet',
      '    intranet: { gloss: "Rede privada (intra- = dentro); não é a Internet (inter- = entre). Ver Internet.", href: "' +
        HREF +
        '", en: "intranet", es: "intranet" },\n'
    ],
    [
      '"a net"',
      '    "a net": { gloss: "Clipping oral de Internet / network — ver Internet.", href: "' +
        HREF +
        '", en: "the net", es: "la red / the net" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'internet');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-internet-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildInternetPost());
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
        id: 'palavra-internet',
        title: 'Internet — inter- + net; o lapso Intenet',
        titleEn: 'Internet — inter- + net; the slip Intenet',
        titleEs: 'Internet — inter- + net; el lapsus Intenet',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: Internet ← inter- + net; Intenet = lapso (cai o r); ≠ WWW ≠ discada ≠ login; Valeu !!!',
        whyEn: 'Words: Internet ← inter- + net; Intenet = slip (drops the r); ≠ WWW ≠ dial-up ≠ login; Valeu !!!',
        whyEs: 'Palabras: Internet ← inter- + net; Intenet = lapsus (cae la r); ≠ WWW ≠ discada ≠ login; ¡Valeu !!!',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          WIKT,
          'https://en.wiktionary.org/wiki/Internet',
          '/posts/post-inspecao-palavra-internet-discada.html',
          '/posts/post-inspecao-palavra-login.html',
          '/posts/post-inspecao-palavra-conexao.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — pedido Intenet; âncora Internet; cai o r de inter-.'
      },
      ['palavra-internet-discada', 'palavra-login', 'palavra-dsl']
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
        id: 'internet',
        word: 'Internet',
        simple:
          'EN inter- + net — a rede das redes. Intenet é lapso (cai o r). ≠ WWW ≠ discada ≠ login. Valeu !!!',
        simpleEn:
          'EN inter- + net — the network of networks. Intenet is a slip (drops the r). ≠ WWW ≠ dial-up ≠ login. Valeu !!!',
        simpleEs:
          'EN inter- + net — la red de redes. Intenet es lapsus (cae la r). ≠ WWW ≠ discada ≠ login. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Do inglês Internet ← internetwork (inter- «entre» + net «rede»). O português herda o empréstimo. Intenet perde o r de entre. A WWW é a teia de páginas sobre essa malha.',
        curiosities:
          'Internet discada é um meio (discar o telefone), não o mapa. Login é a porta. Intranet usa intra- (dentro), não inter- (entre).',
        historyEn:
          'English Internet ← internetwork (inter- “between” + net). Portuguese borrows the name. Intenet drops the r of between. The WWW is the page-web on that mesh.',
        curiositiesEn:
          'Dial-up is a medium, not the map. Login is the door. Intranet uses intra- (inside), not inter- (between).',
        historyEs:
          'Del inglés Internet ← internetwork (inter- «entre» + net). El portugués hereda el préstamo. Intenet pierde la r de entre. La WWW es la telaraña de páginas sobre esa malla.',
        curiositiesEs:
          'Internet discada es un medio, no el mapa. Login es la puerta. Intranet usa intra- (dentro), no inter- (entre).'
      },
      ['internet-discada', 'login', 'dsl', 'conexao']
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
      id: 'internet',
      slug: 'internet',
      title: 'Internet',
      titleEn: 'Internet',
      titleEs: 'Internet',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — inter- + net; Intenet cai o r; ≠ WWW ≠ discada; Valeu !!!',
      teaserEn: 'BudGanja echo — inter- + net; Intenet drops the r; ≠ WWW ≠ dial-up; Valeu !!!',
      teaserEs: 'Eco BudGanja — inter- + net; Intenet pierde la r; ≠ WWW ≠ discada; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'internet', 'intenet', 'rede', 'palavra']
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
