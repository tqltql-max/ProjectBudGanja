'use strict';

/**
 * Injeta palavra «ilegal» na série Palavras.
 * Uso: node scripts/upsert-palavra-ilegal.js
 */

const fs = require('fs');
const path = require('path');
const { buildIlegalPost } = require('../lib/ilegal-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter(
      (p) =>
        p.series === 'palavras-origem' && /^inspecao-palavra-/.test(p.slug || '')
    )
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function upsertPost(posts, post) {
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

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-ilegal');
  let order =
    existing && Number(existing.seriesOrder)
      ? Number(existing.seriesOrder)
      : nextPalavrasOrder(posts);

  const taken = new Set(
    posts
      .filter(
        (p) =>
          p.slug !== 'inspecao-palavra-ilegal' &&
          p.series === 'palavras-origem' &&
          /^inspecao-palavra-/.test(p.slug || '')
      )
      .map((p) => p.seriesOrder)
  );
  while (taken.has(order) && order < 200) order += 1;

  const post = buildIlegalPost(order);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-ilegal';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Ilegal — antónimo de legal, ilícito e Faça o melhor!',
      titleEn: 'Ilegal — antonym of legal, illicit, and Do your best!',
      titleEs: 'Ilegal — antónimo de legal, ilícito y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: ilegal (in- + legalis) — fora da lei; antónimo de legal (eixo jurídico, não gíria); contraste com ilícito; elos Lei 11.343, risco, verdade.',
      whyEn: 'Words: ilegal (in- + legalis) — unlawful; antonym of legal (juridical, not slang); contrast with illicit; Lei 11.343, risk, truth.',
      whyEs: 'Palabras: ilegal (in- + legalis) — fuera de la ley; antónimo de legal (eje jurídico, no jerga); contraste con ilícito; Lei 11.343, riesgo, verdad.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/illegal',
        '/posts/post-inspecao-palavra-legal.html',
        '/posts/post-inspecao-palavra-ilicito.html',
        '/posts/post-inspecao-palavra-lei-11-343.html',
        '/posts/post-inspecao-palavra-descriminalizacao.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — antónimo de legal; ilegal ≠ ilícito exacto; sem gíria bacana.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-ilegal)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'ilegal',
      word: 'ilegal',
      simple:
        'In- + legalis — fora da lei; antónimo de legal (eixo jurídico, não gíria «bacana»); contraste com ilícito; Faça o melhor com a palavra certa.',
      simpleEn:
        'In- + legalis — unlawful; antonym of legal (juridical axis, not “cool” slang); contrast with illicit; Do your best with the right word.',
      simpleEs:
        'In- + legalis — fuera de la ley; antónimo de legal (eje jurídico, no jerga «bacán»); contraste con ilícito; Haz lo mejor con la palabra correcta.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'legal' || x.id === 'ilicito' || x.id === 'lei-11-343'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (ilegal)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('ilegal: {')) {
      const entry =
        '    ilegal: { gloss: "In- + legalis — fora da lei; antónimo de legal (eixo jurídico, não gíria); contraste com ilícito; Faça o melhor com a palavra certa.", href: "/posts/post-inspecao-palavra-ilegal.html", en: "illegal / unlawful", es: "ilegal", fr: "illégal", it: "illegale", de: "illegal", el: "παράνομος", la: "illegalis", yo: "lòdì sí òfin", sw: "haramu", gez: "ዘይሕጋዊ", nl: "illegaal", pl: "nielegalny", ru: "незаконный", uk: "незаконний", zh: "非法", ja: "違法", ko: "불법", ar: "غير قانوني", he: "בלתי חוקי", hi: "अवैध", tr: "yasal olmayan", sv: "olaglig", da: "ulovlig", no: "ulovlig", fi: "laiton", cs: "nelegální", ro: "ilegal", hu: "illegális", ca: "il·legal", gl: "ilegal", eu: "ilegal", gn: "léi rehegua ndaha’éi", qu: "kamachiy contra", eo: "kontraŭleĝa", vi: "bất hợp pháp", id: "ilegal", th: "ผิดกฎหมาย", hr: "ilegalan", sk: "nelegálny", ga: "mídhleathach", cy: "anghyfreithlon", ha: "haram", am: "ህገወጥ", fa: "غیرقانونی", bn: "অবৈধ", zu: "okungekho emthethweni" },\n';
      const reLegal = /(legal: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      if (reLegal.test(gloss)) {
        gloss = gloss.replace(reLegal, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (ilegal · após legal)');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
      }
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  try {
    const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
    const [normalized] = normalizePosts([post]);
    const out = path.join(ROOT, normalized.filename);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
    console.log('HTML escrito', normalized.filename);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
