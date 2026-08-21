'use strict';

/**
 * Injeta palavra «xioomi» (Xiaomi / 小米) na série Palavras.
 * Uso: node scripts/upsert-palavra-xioomi-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildXioomiPost } = require('../lib/xioomi-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  const max = orders.length ? Math.max(...orders) : 0;
  return max + 1;
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

function upsertGloss(glossPath, key, entryLine, afterKeys) {
  if (!fs.existsSync(glossPath)) return;
  let gloss = fs.readFileSync(glossPath, 'utf8');
  const reKey = new RegExp('    ' + key + ':\\s*\\{[\\s\\S]*?\\},');
  if (reKey.test(gloss)) {
    gloss = gloss.replace(reKey, entryLine);
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (' + key + ' · existente)');
    return;
  }
  for (const ak of afterKeys) {
    const reAfter = new RegExp(
      '(    ' + ak + ':\\s*\\{[\\s\\S]*?zu:\\s*"[^"]*"\\s*\\},?\\r?\\n)'
    );
    if (reAfter.test(gloss)) {
      gloss = gloss.replace(reAfter, '$1' + entryLine + '\n');
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (' + key + ' · após ' + ak + ')');
      return;
    }
  }
  console.warn('Aviso: glossário — inserção falhou para', key);
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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-xioomi');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildXioomiPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-xioomi';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'xioomi — Xiaomi, milheto e a marca sem pedestal',
      titleEn: 'xioomi — Xiaomi, millet, brand without a pedestal',
      titleEs: 'xioomi — Xiaomi, mijo y la marca sin pedestal',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: xioomi — rasto oral BR de Xiaomi (小米, milheto); marca × grão × ídolo tech; elos Jobs/objetos/celular; Faça o melhor!',
      whyEn: 'Words: xioomi — BR oral trail of Xiaomi (小米, millet); brand × grain × tech idol; links Jobs/objects/phone; Do your best!',
      whyEs: 'Palabras: xioomi — rastro oral BR de Xiaomi (小米, mijo); marca × grano × ídolo tech; vínculos Jobs/objetos/celular; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/%E5%B0%8F%E7%B1%B3',
        'https://pt.wikipedia.org/wiki/Xiaomi',
        '/posts/post-inspecao-palavra-jobs.html',
        '/posts/post-inspecao-palavra-idolo.html',
        '/posts/post-inspecao-palavra-objetos.html',
        '/posts/post-inspecao-celular-riscos-saude-criancas.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — xioomi oral × Xiaomi marca × 小米 milheto; ficha ≠ review; anti-pedestal.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-xioomi)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'xioomi',
      word: 'xioomi',
      simple:
        'Rasto oral BR de Xiaomi (小米, milheto); marca × grão × ídolo tech; elos Jobs e celular; Faça o melhor!',
      simpleEn:
        'BR oral trail of Xiaomi (小米, millet); brand × grain × tech idol; links Jobs and phone; Do your best!',
      simpleEs:
        'Rastro oral BR de Xiaomi (小米, mijo); marca × grano × ídolo tech; vínculos Jobs y celular; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Xiaomi transcreve o chinês 小米 (xiǎomǐ): milheto, cereal miúdo. A marca (Pequim, 2010) sentou o grão no telemóvel. No BR a boca faz xioomi / xiômi — rasto, não erro.',
      curiosities:
        'Lei Jun foi comparado a Steve Jobs no palco; o lab recusa o pedestal. O risco do ecrã na criança não muda com o logótipo. Aliases: Xiaomi, xiomi, xiaome.',
      historyEn:
        'Xiaomi transcribes Chinese 小米 (xiǎomǐ): millet, a small grain. The 2010 Beijing brand sat the grain on the handset. In Brazil the mouth makes xioomi — a trail, not a typo.',
      curiositiesEn:
        'Lei Jun was compared to Steve Jobs on stage; the lab refuses the pedestal. Screen risk for children does not change with the logo. Aliases: Xiaomi, xiomi, xiaome.',
      historyEs:
        'Xiaomi transcribe el chino 小米 (xiǎomǐ): mijo, cereal menudo. La marca (Pekín, 2010) sentó el grano en el teléfono. En BR la boca hace xioomi — rastro, no error.',
      curiositiesEs:
        'Lei Jun fue comparado con Steve Jobs en el escenario; el lab rechaza el pedestal. El riesgo de pantalla en niños no cambia con el logo. Alias: Xiaomi, xiomi, xiaome.'
    };
    const gi = items.findIndex(
      (x) =>
        x.id === entry.id ||
        x.word === 'xioomi' ||
        x.word === 'Xiaomi' ||
        x.word === 'xiaomi'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'jobs' || x.id === 'skill' || x.id === 'idolo'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (xioomi)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  upsertGloss(
    glossPath,
    'xioomi',
    '    xioomi: { tone: "caution", category: "Marca", mundane: "Rasto oral BR de Xiaomi — telemóvel / IoT; étimo 小米 milheto.", gloss: "Camadas: oral × marca × grão × ídolo tech; elos Jobs/objetos/celular; sem pedestal; Faça o melhor!", href: "/posts/post-inspecao-palavra-xioomi.html", en: "xioomi / Xiaomi", es: "xioomi / Xiaomi", fr: "xioomi / Xiaomi", it: "xioomi / Xiaomi", de: "xioomi / Xiaomi", el: "xioomi / Xiaomi", la: "Xiaomi / milium", yo: "xioomi / Xiaomi", sw: "xioomi / Xiaomi", gez: "xioomi / Xiaomi", nl: "xioomi / Xiaomi", pl: "xioomi / Xiaomi", ru: "xioomi / Xiaomi", uk: "xioomi / Xiaomi", zh: "小米", ja: "Xiaomi / シャオミ", ko: "샤오미", ar: "شاومي", he: "שיאומי", hi: "शाओमी", tr: "Xiaomi", sv: "xioomi / Xiaomi", da: "xioomi / Xiaomi", no: "xioomi / Xiaomi", fi: "xioomi / Xiaomi", cs: "xioomi / Xiaomi", ro: "xioomi / Xiaomi", hu: "xioomi / Xiaomi", ca: "xioomi / Xiaomi", gl: "xioomi / Xiaomi", eu: "xioomi / Xiaomi", gn: "xioomi / Xiaomi", qu: "xioomi / Xiaomi", eo: "xioomi / Xiaomi", vi: "Xiaomi", id: "Xiaomi", th: "เสียวหมี่", hr: "xioomi / Xiaomi", sk: "xioomi / Xiaomi", ga: "xioomi / Xiaomi", cy: "xioomi / Xiaomi", ha: "xioomi / Xiaomi", am: "xioomi / Xiaomi", fa: "شیائومی", bn: "শাওমি", zu: "xioomi / Xiaomi" },',
    ['jobs', 'skill']
  );
  upsertGloss(
    glossPath,
    'xiaomi',
    '    xiaomi: { gloss: "Grafia canónica da marca — ver xioomi (rasto oral BR; 小米 milheto).", href: "/posts/post-inspecao-palavra-xioomi.html", en: "Xiaomi", es: "Xiaomi" },',
    ['xioomi', 'jobs']
  );
  upsertGloss(
    glossPath,
    'xiomi',
    '    xiomi: { gloss: "Variante oral / teclado de Xiaomi — ver xioomi.", href: "/posts/post-inspecao-palavra-xioomi.html", en: "xiomi (Xiaomi trail)", es: "xiomi (rastro Xiaomi)" },',
    ['xiaomi', 'xioomi']
  );
  upsertGloss(
    glossPath,
    'xiaome',
    '    xiaome: { gloss: "Variante oral / teclado de Xiaomi — ver xioomi.", href: "/posts/post-inspecao-palavra-xioomi.html", en: "xiaome (Xiaomi trail)", es: "xiaome (rastro Xiaomi)" },',
    ['xiomi', 'xiaomi']
  );

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
