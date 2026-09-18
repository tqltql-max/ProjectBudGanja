'use strict';

/**
 * Injeta palavra «script» na série Palavras.
 * Uso: node scripts/upsert-palavra-script-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildScriptPost } = require('../lib/script-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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

function glossHas(src, key) {
  return new RegExp('    ' + key + ': \\{').test(src);
}

function replaceGloss(src, key, line) {
  const re = new RegExp('    ' + key + ': \\{[\\s\\S]*?\\},\\r?\\n');
  if (re.test(src)) return src.replace(re, line);
  return src;
}

function insertAfterKey(src, afterKey, line) {
  const re = new RegExp('(    ' + afterKey + ': \\{[\\s\\S]*?\\},\\r?\\n)');
  if (re.test(src)) return src.replace(re, '$1' + line);
  return src + line;
}

async function main() {
  const post = buildScriptPost();
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
    const sugId = 'palavra-script';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Script — sequência escrita, não destino',
      titleEn: 'Script — written sequence, not destiny',
      titleEs: 'Script — secuencia escrita, no destino',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: script (lat. scrīptum ← scrībere) — sequência EN→BR; roteiro × código; ≠ destino; elos skill/pattern/commitar.',
      whyEn: 'Words: script (Lat. scrīptum ← scrībere) — sequence EN→BR; roteiro × code; ≠ destiny; links skill/pattern/commitar.',
      whyEs: 'Palabras: script (lat. scrīptum ← scrībere) — secuencia EN→BR; roteiro × código; ≠ destino; vínculos skill/pattern/commitar.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/script',
        'https://en.wiktionary.org/wiki/scriptum#Latin',
        '/posts/post-inspecao-palavra-skill.html',
        '/posts/post-inspecao-palavra-pattern.html',
        '/posts/post-inspecao-palavra-commitar.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — lat. scrīptum; sequência escrita; anti-destino; elos skill/pattern/commitar.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-script)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const after = ['skill', 'pattern', 'commitar', 'gesto'];
    upsertGuia(
      items,
      {
        id: 'script',
        word: 'script',
        simple:
          'Lat. scrīptum ← scrībere — sequência escrita EN→BR; roteiro × código; ≠ destino; elos skill/pattern/commitar; Valeu !!!',
        simpleEn:
          'Lat. scrīptum ← scrībere — written sequence EN→BR; roteiro × code; ≠ destiny; links skill/pattern/commitar; Valeu !!!',
        simpleEs:
          'Lat. scrīptum ← scrībere — secuencia escrita EN→BR; roteiro × código; ≠ destino; vínculos skill/pattern/commitar; ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href
      },
      after
    );
    upsertGuia(
      items,
      {
        id: 'roteiro',
        word: 'roteiro',
        simple:
          'Irmã PT de script no palco/ecrã — linhas da cena; no lab preferir roteiro em ficha formal de filme; ver ficha script.',
        simpleEn:
          'PT sister of script on stage/screen — scene lines; lab prefers roteiro in formal film sheets; see script.',
        simpleEs:
          'Hermana PT de script en escena — líneas de la escena; el lab prefiere roteiro en ficha formal de filme; ver script.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['script']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (script / roteiro)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entries = {
      script:
        '    script: { tone: "caution", category: "Ofício", mundane: "Empréstimo EN — sequência escrita a seguir (código / roteiro).", gloss: "Lat. scrīptum ← scrībere — EN→BR; ≠ destino; elos skill/pattern/commitar; Valeu !!!", href: "/posts/post-inspecao-palavra-script.html", en: "script", es: "guion / script", fr: "script / scénario", it: "copione / script", de: "Skript / Drehbuch", el: "σενάριο", la: "scriptum", yo: "ìwé àṣẹ", sw: "hati", gez: "ṣəḥuf", nl: "script", pl: "skrypt", ru: "скрипт", uk: "скрипт", zh: "脚本", ja: "スクリプト", ko: "스크립트", ar: "نص / سكربت", he: "תסריט / סקריפט", hi: "स्क्रिप्ट", tr: "betik / senaryo", sv: "skript", da: "script", no: "skript", fi: "komentosarja", cs: "skript", ro: "script", hu: "szkript", ca: "guió / script", gl: "guión / script", eu: "gidoi / script", gn: "kuatia", qu: "qillqa", eo: "skripto", vi: "kịch bản / script", id: "skrip", th: "สคริปต์", hr: "skripta", sk: "skript", ga: "script", cy: "sgript", ha: "rubutu", am: "ጽሑፍ", fa: "اسکریپت", bn: "স্ক্রিপ্ট", zu: "umbhalo" },\n',
      scripts:
        '    scripts: { gloss: "Plural de script — sequências escritas; ver ficha script.", href: "/posts/post-inspecao-palavra-script.html", en: "scripts", es: "guiones / scripts" },\n',
      roteiro:
        '    roteiro: { gloss: "Irmã PT de script no palco/ecrã — linhas da cena; ver ficha script.", href: "/posts/post-inspecao-palavra-script.html", en: "screenplay / itinerary", es: "guion / itinerario", fr: "scénario / itinéraire", it: "sceneggiatura", de: "Drehbuch / Route", el: "σενάριο", la: "itinerarium" },\n',
      javascript:
        '    javascript: { gloss: "Linguagem nomeada a partir de script — não é o objecto desta ficha; ver script.", href: "/posts/post-inspecao-palavra-script.html", en: "JavaScript", es: "JavaScript" },\n'
    };

    const chain = [
      ['skill', 'script'],
      ['script', 'scripts'],
      ['scripts', 'roteiro'],
      ['roteiro', 'javascript']
    ];
    for (const [after, key] of chain) {
      if (glossHas(gloss, key)) gloss = replaceGloss(gloss, key, entries[key]);
      else gloss = insertAfterKey(gloss, after, entries[key]);
    }

    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (script / roteiro)');
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
