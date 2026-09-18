'use strict';

/**
 * Injeta palavra «especial» na série Palavras.
 * Uso: node scripts/upsert-palavra-especial-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildEspecialPost } = require('../lib/especial-inspecao-post.js');

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
  const post = buildEspecialPost();
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
    const sugId = 'palavra-especial';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Especial — latim vivo, uso BR e palavras originárias do Brasil',
      titleEn: 'Especial — living Latin, BR use, and Brazil’s originary words',
      titleEs: 'Especial — latín vivo, uso BR y palabras originarias de Brasil',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: especial — Lat. specialis (≠ Tupi); uso BR; meta em especial; rede originárias; Faça o melhor!',
      whyEn: 'Words: especial — Lat. specialis (≠ Tupi); BR use; em especial meta; originary network; Do your best!',
      whyEs: 'Palabras: especial — lat. specialis (≠ tupí); uso BR; meta em especial; red originaria; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/specialis',
        '/posts/post-inspecao-palavra-lingua-portuguesa.html',
        '/posts/post-inspecao-palavra-maconha.html',
        '/posts/post-inspecao-palavra-diamba.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. 36 — specialis × uso BR × rede originária (sem fingir tupi).'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-especial)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'especial',
      word: 'especial',
      simple:
        'Lat. specialis (≠ Tupi) — particular / em especial; uso oral e ofício BR; porta para a rede das palavras originárias já fichadas; Faça o melhor!',
      simpleEn:
        'Lat. specialis (≠ Tupi) — particular / especially; BR oral and craft use; door into the originary-words network on file; Do your best!',
      simpleEs:
        'Lat. specialis (≠ tupí) — particular / en especial; uso oral y oficio BR; puerta a la red de palabras originarias ya fichadas; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'buguei' || x.id === 'fogo' || x.id === 'aff'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (especial)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const rich =
      '    especial: { gloss: "Lat. specialis (≠ Tupi) — particular; uso BR; meta «em especial»; rede originárias; Faça o melhor!", href: "/posts/post-inspecao-palavra-especial.html", en: "special / especially", es: "especial", fr: "spécial", it: "speciale", de: "besonders / speziell", el: "ειδικός", la: "specialis", yo: "pàtàkì", sw: "maalum", gez: "fəṣṣum", nl: "speciaal", pl: "szczególny", ru: "особый", uk: "особливий", zh: "特别的", ja: "特別な", ko: "특별한", ar: "خاص", he: "מיוחד", hi: "विशेष", tr: "özel", sv: "speciell", da: "særlig", no: "spesiell", fi: "erityinen", cs: "zvláštní", ro: "special", hu: "különleges", ca: "especial", gl: "especial", eu: "berezi", gn: "mba\'e porã", qu: "sapaq", eo: "speciala", vi: "đặc biệt", id: "khusus", th: "พิเศษ", hr: "poseban", sk: "špeciálny", ga: "speisialta", cy: "arbennig", ha: "na musamman", am: "ልዩ", fa: "ویژه", bn: "বিশেষ", zu: "okukhethekile" },';
    if (/especial: \{[^}]*href: "\/posts\/post-inspecao-palavra-especial\.html"/.test(gloss)) {
      console.log('Glossário já tinha especial enriquecido');
    } else if (/especial: \{[\s\S]*?zu: "[^"]*" },/.test(gloss)) {
      gloss = gloss.replace(/especial: \{[\s\S]*?zu: "[^"]*" },/, rich);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (especial enriquecido)');
    } else {
      const re = /(fogo: \{[\s\S]*?zu: "umlilo" },\r?\n)/;
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + rich + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (especial inserido)');
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

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
