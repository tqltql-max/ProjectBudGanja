'use strict';

/**
 * Injeta palavra «legal» na série Palavras.
 * Uso: node scripts/upsert-palavra-legal.js
 */

const fs = require('fs');
const path = require('path');
const { buildLegalPost } = require('../lib/legal-inspecao-post.js');

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
  // Re-read shared files at write time (other agents may land concurrently).
  const post = buildLegalPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  // Avoid Cap collision only among inspecao-palavra-* (guias may share numbers).
  const taken = new Set(
    posts
      .filter(
        (p) =>
          p.slug !== post.slug &&
          p.series === 'palavras-origem' &&
          /^inspecao-palavra-/.test(p.slug || '')
      )
      .map((p) => p.seriesOrder)
  );
  let order = post.seriesOrder;
  while (taken.has(order) && order < 80) order += 1;
  if (order !== post.seriesOrder) {
    post.seriesOrder = order;
    console.log('seriesOrder ajustado para Cap.', order, '(evitar colisão palavra)');
  }

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-legal';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Legal — lei, gíria BR «bacana» e Faça o melhor!',
      titleEn: 'Legal — law, BR slang “cool”, and Do your best!',
      titleEs: 'Legal — ley, jerga BR «bacán» y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: legal (lat. legalis) — eixo jurídico e gíria BR bacana; contraste com inglês; elos ilícito, Lei 11.343, descriminalização.',
      whyEn: 'Words: legal (Lat. legalis) — juridical axis and BR slang cool; English contrast; illicit, Lei 11.343, descriminalization.',
      whyEs: 'Palabras: legal (lat. legalis) — eje jurídico y jerga BR bacán; contraste con inglés; ilícito, Lei 11.343, descriminalización.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/legal',
        '/posts/post-inspecao-palavra-ilicito.html',
        '/posts/post-inspecao-palavra-lei-11-343.html',
        '/posts/post-inspecao-palavra-descriminalizacao.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — lei × gíria; não confundir eixos.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-legal)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'legal',
      word: 'legal',
      simple:
        'Lat. legalis — conforme a lei; no BR também «bacana/ok»; separar eixo jurídico da gíria; Faça o melhor com a palavra certa.',
      simpleEn:
        'Lat. legalis — lawful; in BR also “cool/ok”; separate juridical axis from slang; Do your best with the right word.',
      simpleEs:
        'Lat. legalis — conforme a la ley; en BR también «bacán/ok»; separar eje jurídico de la jerga; Haz lo mejor con la palabra correcta.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'ilicito' || x.id === 'lei-11-343' || x.id === 'verdade'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (legal)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('legal: {')) {
      const re = /(risco: \{[\s\S]*?zu: "risk" },\r?\n)/;
      const reVerdade = /(verdade: \{[\s\S]*?zu: "truth" },\r?\n)/;
      const entry =
        '    legal: { gloss: "Lat. legalis — lei / lícito; gíria BR «bacana»; separar eixos; Faça o melhor com a palavra certa.", href: "/posts/post-inspecao-palavra-legal.html", en: "legal / cool (BR)", es: "legal / bacán (BR)", fr: "légal / cool (BR)", it: "legale / figo (BR)", de: "legal / cool (BR)", el: "νόμιμος", la: "legalis", yo: "òfin", sw: "halali", gez: "ḥəggawi", nl: "wettelijk / cool (BR)", pl: "legalny", ru: "законный", uk: "законний", zh: "合法 / 酷 (BR)", ja: "合法 / いいね (BR)", ko: "합법 / 멋져 (BR)", ar: "قانوني", he: "חוקי", hi: "कानूनी", tr: "yasal", sv: "laglig", da: "lovlig", no: "lovlig", fi: "laillinen", cs: "legální", ro: "legal", hu: "törvényes", ca: "legal", gl: "legal", eu: "legal", gn: "téĩ", qu: "kamachiywan", eo: "leĝa", vi: "hợp pháp", id: "legal", th: "ถูกกฎหมาย", hr: "legalan", sk: "legálny", ga: "dlíthiúil", cy: "cyfreithiol", ha: "bisa doka", am: "ህጋዊ", fa: "قانونی", bn: "আইনি", zu: "okusemthethweni" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (legal · após risco)');
      } else if (reVerdade.test(gloss)) {
        gloss = gloss.replace(reVerdade, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (legal · após verdade)');
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

  // Write HTML immediately so concurrent export-db / regenerate cannot leave a hole.
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
