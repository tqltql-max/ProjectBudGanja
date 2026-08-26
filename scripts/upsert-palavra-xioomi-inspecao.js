'use strict';

/**
 * Injeta palavra «Xiaomi» (小米; rasto oral xioomi) na série Palavras.
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

function writeOldSlugRedirect() {
  const dest = '/posts/post-inspecao-palavra-xiaomi.html';
  const out = path.join(ROOT, 'posts', 'post-inspecao-palavra-xioomi.html');
  const html =
    '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n' +
    '<meta charset="UTF-8">\n' +
    '<meta http-equiv="refresh" content="0; url=' +
    dest +
    '">\n' +
    '<link rel="canonical" href="' +
    dest +
    '">\n' +
    '<title>Xiaomi</title>\n' +
    '<script>location.replace(' +
    JSON.stringify(dest) +
    ');</script>\n' +
    '</head>\n<body>\n<p>A ficha certa é <a href="' +
    dest +
    '">Xiaomi</a> (*xioomi* → Xiaomi).</p>\n</body>\n</html>\n';
  fs.writeFileSync(out, html, 'utf8');
  console.log('Redirect:', path.relative(ROOT, out), '→', dest);
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
  const oldIdx = posts.findIndex((p) => p.slug === 'inspecao-palavra-xioomi');
  if (oldIdx >= 0 && post.slug !== 'inspecao-palavra-xioomi') {
    posts.splice(oldIdx, 1);
  }
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find(
    (p) =>
      p.slug === 'inspecao-palavra-xiaomi' ||
      p.slug === 'inspecao-palavra-xioomi'
  );
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildXioomiPost(seriesOrder);

  const oldSlug = 'inspecao-palavra-xioomi';
  if (post.slug !== oldSlug) {
    const oldIdx = posts.findIndex((p) => p.slug === oldSlug);
    if (oldIdx >= 0) {
      posts.splice(oldIdx, 1);
      console.log('Removido slug antigo', oldSlug);
    }
  }

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  if (i18n[oldSlug] && post.slug !== oldSlug) delete i18n[oldSlug];
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-xiaomi';
    const si = items.findIndex(
      (x) => x.id === sugId || x.id === 'palavra-xioomi'
    );
    const entry = {
      id: sugId,
      title: 'Xiaomi — milheto, marca e ofício sem pedestal',
      titleEn: 'Xiaomi — millet, brand, craft without a pedestal',
      titleEs: 'Xiaomi — mijo, marca y oficio sin pedestal',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: Xiaomi (*xioomi* → Xiaomi) — 小米 milheto; marca × grão × ídolo tech; elos Jobs/objetos/celular; Valeu !!!',
      whyEn: 'Words: Xiaomi (*xioomi* → Xiaomi) — 小米 millet; brand × grain × tech idol; links Jobs/objects/phone; Valeu !!!',
      whyEs: 'Palabras: Xiaomi (*xioomi* → Xiaomi) — 小米 mijo; marca × grano × ídolo tech; vínculos Jobs/objetos/celular; ¡Valeu !!!',
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
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — Xiaomi grafia certa; xioomi rasto oral; 小米 milheto; ficha ≠ review; anti-pedestal.'
    };
    if (si >= 0) {
      items[si] = Object.assign({}, items[si], entry);
      items[si].id = sugId;
    } else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-xiaomi)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'xiaomi',
      word: 'Xiaomi',
      simple:
        'Grafia certa da marca (小米, milheto); rasto oral xioomi; marca × grão × ídolo tech; elos Jobs e celular; Valeu !!!',
      simpleEn:
        'Correct brand spelling (小米, millet); oral trail xioomi; brand × grain × tech idol; links Jobs and phone; Valeu !!!',
      simpleEs:
        'Grafía correcta de la marca (小米, mijo); rastro oral xioomi; marca × grano × ídolo tech; vínculos Jobs y celular; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Xiaomi transcreve o chinês 小米 (xiǎomǐ): milheto, cereal miúdo. A marca (Pequim, 2010) sentou o grão no telemóvel. No BR a boca faz xioomi / xiômi — rasto; a ficha ancora em Xiaomi.',
      curiosities:
        'Lei Jun foi comparado a Steve Jobs no palco; o lab recusa o pedestal. O risco do ecrã na criança não muda com o logótipo. Aliases: xioomi, xiomi, xiaome.',
      historyEn:
        'Xiaomi transcribes Chinese 小米 (xiǎomǐ): millet. The 2010 Beijing brand sat the grain on the handset. In Brazil the mouth makes xioomi — a trail; the sheet anchors on Xiaomi.',
      curiositiesEn:
        'Lei Jun was compared to Steve Jobs on stage; the lab refuses the pedestal. Screen risk for children does not change with the logo. Aliases: xioomi, xiomi, xiaome.',
      historyEs:
        'Xiaomi transcribe el chino 小米 (xiǎomǐ): mijo. La marca (Pekín, 2010) sentó el grano en el teléfono. En BR la boca hace xioomi — rastro; la ficha ancla en Xiaomi.',
      curiositiesEs:
        'Lei Jun fue comparado con Steve Jobs en el escenario; el lab rechaza el pedestal. El riesgo de pantalla en niños no cambia con el logo. Alias: xioomi, xiomi, xiaome.'
    };
    const gi = items.findIndex(
      (x) =>
        x.id === 'xiaomi' ||
        x.id === 'xioomi' ||
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
    console.log('Guia de palavras actualizado (Xiaomi)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  upsertGloss(
    glossPath,
    'xiaomi',
    '    xiaomi: { tone: "caution", category: "Marca", mundane: "Grafia certa da marca — telemóvel / IoT; étimo 小米 milheto.", gloss: "xioomi → Xiaomi; camadas: marca × grão × ídolo tech; elos Jobs/objetos/celular; sem pedestal; Valeu !!!", href: "/posts/post-inspecao-palavra-xiaomi.html", en: "Xiaomi", es: "Xiaomi", fr: "Xiaomi", it: "Xiaomi", de: "Xiaomi", el: "Xiaomi", la: "Xiaomi / milium", yo: "Xiaomi", sw: "Xiaomi", gez: "Xiaomi", nl: "Xiaomi", pl: "Xiaomi", ru: "Xiaomi", uk: "Xiaomi", zh: "小米", ja: "Xiaomi / シャオミ", ko: "샤오미", ar: "شاومي", he: "שיאומי", hi: "शाओमी", tr: "Xiaomi", sv: "Xiaomi", da: "Xiaomi", no: "Xiaomi", fi: "Xiaomi", cs: "Xiaomi", ro: "Xiaomi", hu: "Xiaomi", ca: "Xiaomi", gl: "Xiaomi", eu: "Xiaomi", gn: "Xiaomi", qu: "Xiaomi", eo: "Xiaomi", vi: "Xiaomi", id: "Xiaomi", th: "เสียวหมี่", hr: "Xiaomi", sk: "Xiaomi", ga: "Xiaomi", cy: "Xiaomi", ha: "Xiaomi", am: "Xiaomi", fa: "شیائومی", bn: "শাওমি", zu: "Xiaomi" },',
    ['jobs', 'skill']
  );
  upsertGloss(
    glossPath,
    'xioomi',
    '    xioomi: { gloss: "Rasto oral / teclado BR — ver Xiaomi (grafia certa; 小米 milheto).", href: "/posts/post-inspecao-palavra-xiaomi.html", en: "xioomi (Xiaomi trail)", es: "xioomi (rastro Xiaomi)" },',
    ['xiaomi', 'jobs']
  );
  upsertGloss(
    glossPath,
    'xiomi',
    '    xiomi: { gloss: "Variante oral / teclado de Xiaomi — ver Xiaomi.", href: "/posts/post-inspecao-palavra-xiaomi.html", en: "xiomi (Xiaomi trail)", es: "xiomi (rastro Xiaomi)" },',
    ['xioomi', 'xiaomi']
  );
  upsertGloss(
    glossPath,
    'xiaome',
    '    xiaome: { gloss: "Variante oral / teclado de Xiaomi — ver Xiaomi.", href: "/posts/post-inspecao-palavra-xiaomi.html", en: "xiaome (Xiaomi trail)", es: "xiaome (rastro Xiaomi)" },',
    ['xiomi', 'xioomi']
  );

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  writeOldSlugRedirect();

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
