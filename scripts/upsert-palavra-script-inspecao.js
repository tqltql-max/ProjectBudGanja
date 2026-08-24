'use strict';

/**
 * Injeta / levanta a palavra «script» na série Palavras.
 * Uso: node scripts/upsert-palavra-script-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildScriptPost } = require('../lib/script-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-script.html';
const UPSERT_HREF = '/posts/post-inspecao-palavra-upsert.html';

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

function patchGlossary(gloss) {
  const entries = {
    script:
      '    script: { tone: "caution", category: "Ofício", mundane: "Empréstimo EN — sequência escrita a seguir (código / roteiro).", gloss: "Lat. scrīptum ← scrībere — EN→BR; ≠ destino; elos skill/pattern/commitar/opsert; Valeu !!!", href: "' +
      HREF +
      '", en: "script", es: "guion / script", fr: "script / scénario", it: "copione / script", de: "Skript / Drehbuch", el: "σενάριο", la: "scriptum", yo: "ìwé àṣẹ", sw: "hati", gez: "ṣəḥuf", nl: "script", pl: "skrypt", ru: "скрипт", uk: "скрипт", zh: "脚本", ja: "スクリプト", ko: "스크립트", ar: "نص / سكربت", he: "תסריט / סקריפט", hi: "स्क्रिप्ट", tr: "betik / senaryo", sv: "skript", da: "script", no: "skript", fi: "komentosarja", cs: "skript", ro: "script", hu: "szkript", ca: "guió / script", gl: "guión / script", eu: "gidoi / script", gn: "kuatia", qu: "qillqa", eo: "skripto", vi: "kịch bản / script", id: "skrip", th: "สคริปต์", hr: "skripta", sk: "skript", ga: "script", cy: "sgript", ha: "rubutu", am: "ጽሑፍ", fa: "اسکریپت", bn: "স্ক্রিপ্ট", zu: "umbhalo" },\n',
    scripts:
      '    scripts: { gloss: "Plural de script — sequências escritas; pasta scripts/ da casa; ver ficha script.", href: "' +
      HREF +
      '", en: "scripts", es: "guiones / scripts" },\n',
    roteiro:
      '    roteiro: { gloss: "Irmã PT de script no palco/ecrã — linhas da cena; ver ficha script.", href: "' +
      HREF +
      '", en: "screenplay / itinerary", es: "guion / itinerario", fr: "scénario / itinéraire", it: "sceneggiatura", de: "Drehbuch / Route", el: "σενάριο", la: "itinerarium" },\n',
    javascript:
      '    javascript: { gloss: "Linguagem nomeada a partir de script — não é o objecto desta ficha; ver script.", href: "' +
      HREF +
      '", en: "JavaScript", es: "JavaScript" },\n'
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
  return gloss;
}

function upsertSug(sug, post) {
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
    why: 'Palavras: script (lat. scrīptum ← scrībere) — sequência EN→BR; roteiro × código; ≠ destino; elos skill/pattern/commitar/opsert.',
    whyEn: 'Words: script (Lat. scrīptum ← scrībere) — sequence EN→BR; roteiro × code; ≠ destiny; links skill/pattern/commitar/opsert.',
    whyEs: 'Palabras: script (lat. scrīptum ← scrībere) — secuencia EN→BR; roteiro × código; ≠ destino; vínculos skill/pattern/commitar/opsert.',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/script',
      'https://en.wiktionary.org/wiki/scriptum#Latin',
      '/posts/post-inspecao-palavra-skill.html',
      '/posts/post-inspecao-palavra-pattern.html',
      '/posts/post-inspecao-palavra-commitar.html',
      UPSERT_HREF,
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes:
      'Cap. ' +
      post.seriesOrder +
      ' — lat. scrīptum; sequência escrita; anti-destino; elos skill/pattern/commitar/opsert.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuiaEntry(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = items.findIndex((x) => afterIds.indexOf(x.id) >= 0);
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  upsertGuiaEntry(
    items,
    {
      id: 'script',
      word: 'script',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Lat. scrīptum ← scrībere — sequência escrita EN→BR; roteiro × código; ≠ destino; elos skill/pattern/commitar/opsert; Valeu !!!',
      simpleEn:
        'Lat. scrīptum ← scrībere — written sequence EN→BR; roteiro × code; ≠ destiny; links skill/pattern/commitar/opsert; Valeu !!!',
      simpleEs:
        'Lat. scrīptum ← scrībere — secuencia escrita EN→BR; roteiro × código; ≠ destino; vínculos skill/pattern/commitar/opsert; ¡Valeu !!!',
      history:
        'Script vem do latim scrīptum ← scrībere («escrever»), volta ao português pela porta inglesa. No BR nomeia sequência escrita: código, roteiro, tag HTML, fala («seguir o script»).',
      curiosities:
        'Os scripts da casa ficam em scripts/ (upsert-*.js no disco). Script ≠ destino ≠ skill. O gesto de identidade chama-se opsert. Valeu !!!',
      historyEn:
        'Script comes from Latin scrīptum ← scrībere (“to write”) and re-enters Portuguese through the English door. In Brazil it names a written sequence: code, screenplay, HTML tag, speech (“follow the script”).',
      curiositiesEn:
        'House scripts live in scripts/ (upsert-*.js on disk). Script ≠ destiny ≠ skill. The identity gesture is called opsert. Valeu !!!',
      historyEs:
        'Script viene del latín scrīptum ← scrībere («escribir») y vuelve al portugués por la puerta inglesa. En BR nombra secuencia escrita: código, guion, etiqueta HTML, habla («seguir el script»).',
      curiositiesEs:
        'Los scripts de la casa viven en scripts/ (upsert-*.js en disco). Script ≠ destino ≠ skill. El gesto de identidad se llama opsert. ¡Valeu !!!'
    },
    ['skill', 'pattern', 'commitar', 'gesto']
  );
  upsertGuiaEntry(
    items,
    {
      id: 'roteiro',
      word: 'roteiro',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Irmã PT de script no palco/ecrã — linhas da cena; no lab preferir roteiro em ficha formal de filme; ver ficha script.',
      simpleEn:
        'PT sister of script on stage/screen — scene lines; lab prefers roteiro in formal film sheets; see script.',
      simpleEs:
        'Hermana PT de script en escena — líneas de la escena; el lab prefiere roteiro en ficha formal de filme; ver script.',
      history:
        'Roteiro vem de rota (lat. rupta, via aberta) e no palco/ecrã nomeia as linhas da cena. No laboratório é a irmã portuguesa de script: preferir roteiro em ficha formal de filme.',
      curiosities:
        'Não é destino. A vida não é o filme. Ver ficha script — sequência escrita, não teologia.',
      historyEn:
        'Portuguese roteiro comes from rota (Lat. rupta, an opened way) and on stage/screen names the scene lines. In the lab it is the Portuguese sister of script: prefer roteiro in a formal film sheet.',
      curiositiesEn:
        'It is not destiny. Life is not the film. See the script sheet — written sequence, not theology.',
      historyEs:
        'Roteiro viene de rota (lat. rupta, vía abierta) y en escena nombra las líneas. En el laboratorio es la hermana portuguesa de script: preferir roteiro en ficha formal de filme.',
      curiositiesEs:
        'No es destino. La vida no es la película. Ver ficha script — secuencia escrita, no teología.'
    },
    ['script']
  );
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-script-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildScriptPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia);
  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
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
