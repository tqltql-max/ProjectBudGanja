'use strict';

/**
 * Injeta palavra «ídolo» na série Palavras.
 * Uso: node scripts/upsert-palavra-idolo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildIdoloPost } = require('../lib/idolo-inspecao-post.js');

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
  // Re-ler Cap livre antes de escrever (outros agentes podem aterrar Caps).
  const postsProbe = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const taken = new Set(
    postsProbe
      .filter((x) => x.series === 'palavras-origem' && typeof x.seriesOrder === 'number')
      .map((x) => x.seriesOrder)
  );
  const libDir = path.join(ROOT, 'lib');
  for (const f of fs.readdirSync(libDir)) {
    if (!f.endsWith('-inspecao-post.js') || f === 'idolo-inspecao-post.js') continue;
    const t = fs.readFileSync(path.join(libDir, f), 'utf8');
    if (!/slug:\s*'inspecao-palavra-/.test(t)) continue;
    for (const m of t.matchAll(/seriesOrder:\s*(\d+)/g)) taken.add(+m[1]);
  }
  let post = buildIdoloPost();
  if (taken.has(post.seriesOrder)) {
    let next = post.seriesOrder + 1;
    while (taken.has(next)) next += 1;
    console.warn(
      'Aviso: Cap',
      post.seriesOrder,
      'ocupado — realocando para',
      next
    );
    const modPath = path.join(libDir, 'idolo-inspecao-post.js');
    let modSrc = fs.readFileSync(modPath, 'utf8');
    modSrc = modSrc.replace(
      /seriesOrder:\s*\d+,/,
      'seriesOrder: ' + next + ','
    );
    fs.writeFileSync(modPath, modSrc);
    delete require.cache[require.resolve('../lib/idolo-inspecao-post.js')];
    const { buildIdoloPost: rebuild } = require('../lib/idolo-inspecao-post.js');
    post = rebuild();
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-idolo';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Ídolo — admiração, imagem, média e Valeu !!!',
      titleEn: 'Ídolo — admiration, image, media and Valeu !!!',
      titleEs: 'Ídolo — admiración, imagen, medios y ¡Valeu !!!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: ídolo (gr. eídōlon) — celebridade, culto lexical, idolatrar e média; admirar com ofício; Valeu !!!',
      whyEn: 'Words: ídolo (Gk. eídōlon) — celebrity, lexical cult sense, idolatrar and media; admire with craft; Valeu !!!',
      whyEs: 'Palabras: ídolo (gr. eídōlon) — celebridad, culto léxico, idolatrar y medios; admirar con oficio; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/%C3%8Ddolo',
        '/posts/post-inspecao-figura-ayrton-senna.html',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — imagem → pessoa admirada; sem sermão; elos Senna/Chorão/genial.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-idolo)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'idolo',
      word: 'ídolo',
      simple:
        'Gr. eídōlon — imagem → pessoa admirada; culto lexical, idolatrar e média; admirar com ofício; Valeu !!!',
      simpleEn:
        'Gk. eídōlon — image → admired person; lexical cult sense, idolatrar and media; admire with craft; Valeu !!!',
      simpleEs:
        'Gr. eídōlon — imagen → persona admirada; culto léxico, idolatrar y medios; admirar con oficio; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'ídolo');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'genial' || x.id === 'fogo' || x.id === 'coracao'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (ídolo)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    ídolo: { gloss: "Gr. eídōlon — imagem → pessoa admirada; idolatrar/média com ofício; Valeu !!! sem pedestal oco.", href: "/posts/post-inspecao-palavra-idolo.html", en: "idol", es: "ídolo", fr: "idole", it: "idolo", de: "Idol", el: "είδωλο", la: "idolum", yo: "òrìṣà ìfẹ́", sw: "sanamu", gez: "amsāl", nl: "idool", pl: "idol", ru: "кумир", uk: "ідол", zh: "偶像", ja: "アイドル", ko: "아이돌", ar: "وثن/أيقونة", he: "אליל", hi: "मूर्ति", tr: "idol", sv: "idol", da: "idol", no: "idol", fi: "idoli", cs: "idol", ro: "idol", hu: "bálvány", ca: "ídol", gl: "ídolo", eu: "idolo", gn: "ta\'anga", qu: "waka", eo: "idolo", vi: "thần tượng", id: "idola", th: "ไอดอล", hr: "idol", sk: "idol", ga: "íol", cy: "eilun", ha: "gunki", am: "ጣዖት", fa: "بت", bn: "প্রতিমা", zu: "isithombe" },';
    if (/ídolo:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    ídolo:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (ídolo · entrada existente)');
    } else {
      const reGenial = /(genial:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reAff = /(aff:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reGenial.test(gloss)) {
        gloss = gloss.replace(reGenial, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (ídolo · após genial)');
      } else if (reAff.test(gloss)) {
        gloss = gloss.replace(reAff, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (ídolo · após aff)');
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

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
