'use strict';

/**
 * Injeta o par «calor» × «frio» na série Palavras.
 * Uso: node scripts/upsert-palavra-calor-frio-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildCalorFrioPost } = require('../lib/calor-frio-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss, mainKey, mainLine, aliases, afterKey) {
  if (new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{').test(gloss)) {
    gloss = gloss.replace(
      new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
  } else {
    const inserted = insertAfterKey(gloss, afterKey, mainLine + aliases);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção falhou para', mainKey);
  }
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const href = '/posts/post-' + post.slug + '.html';
  const sugId = 'palavra-calor-frio';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Calor × Frio — qualidade térmica, não fogo nem gelo',
    titleEn: 'Calor × Frio — thermal quality, not fire or ice',
    titleEs: 'Calor × Frio — cualidad térmica, no fuego ni hielo',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: calor × frio (lat. calor / frīgus) — grau medido; ≠ fogo ≠ gelo ≠ inverno ≠ caloria; Valeu !!!',
    whyEn: 'Words: calor × frio (Lat. calor / frīgus) — measured degree; ≠ fire ≠ ice ≠ winter ≠ calorie; Valeu !!!',
    whyEs: 'Palabras: calor × frio (lat. calor / frīgus) — grado medido; ≠ fuego ≠ hielo ≠ invierno ≠ caloria; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: href,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/frio',
      '/posts/post-inspecao-palavra-fogo.html',
      '/posts/post-inspecao-palavra-gelo.html',
      '/posts/post-inspecao-palavra-tenda.html',
      '/posts/post-inspecao-palavra-inverno.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — par térmico; qualidade ≠ fonte ≠ estado ≠ estação.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, post) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const href = '/posts/post-' + post.slug + '.html';
  const entries = [
    {
      id: 'calor',
      word: 'calor',
      group: 'lexico',
      fromTitle: false,
      href,
      simple:
        'Lat. calor ← calēre — qualidade quente; par frio; ≠ fogo ≠ caloria; mede-se na tenda; Valeu !!!',
      simpleEn:
        'Lat. calor ← calēre — hot quality; pair with frio; ≠ fire ≠ calorie; measure in the tent; Valeu !!!',
      simpleEs:
        'Lat. calor ← calēre — cualidad caliente; par con frio; ≠ fuego ≠ caloria; se mide en la carpa; ¡Valeu !!!',
      history:
        'Calor vem do latim calor, calōris, de calēre («estar quente»). No português nomeia a qualidade, não a chama. Caloria é prima etimológica com ofício de unidade.',
      curiosities:
        'No laboratório o calor da tenda mede-se (VPD / exaustor). Fogo é a fonte; incêndio é o evento. Valeu !!! com o grau à vista.',
      historyEn:
        'Portuguese calor comes from Latin calor, calōris, from calēre (“to be warm”). It names the quality, not the flame. Calorie is an etymological cousin with a unit’s office.',
      curiositiesEn:
        'In the lab tent heat is measured (VPD / exhaust). Fire is the source; a blaze is the event. Valeu !!! with the degree in sight.',
      historyEs:
        'Calor viene del latín calor, calōris, de calēre («estar caliente»). En portugués nombra la cualidad, no la llama. Caloria es prima etimológica con oficio de unidad.',
      curiositiesEs:
        'En el laboratorio el calor de la carpa se mide (VPD / extractor). El fuego es la fuente; el incendio es el evento. ¡Valeu !!! con el grado a la vista.'
    },
    {
      id: 'frio',
      word: 'frio',
      group: 'lexico',
      fromTitle: false,
      href,
      simple:
        'Lat. frīgus / frīgidus — qualidade fria; par calor; ≠ gelo ≠ inverno; Valeu !!! com medida.',
      simpleEn:
        'Lat. frīgus / frīgidus — cold quality; pair with calor; ≠ ice ≠ winter; Valeu !!! with measure.',
      simpleEs:
        'Lat. frīgus / frīgidus — cualidad fría; par con calor; ≠ hielo ≠ invierno; ¡Valeu !!! con medida.',
      history:
        'Frio vem do latim frīgidus / frīgus. No português é adjectivo e substantivo. Gelo (gelū / glaciēs) é outra raiz — água sólida, não sinónimo.',
      curiosities:
        'Cumprimentar o frio (Bom dia, Inverno) não é fundir frio com gelo nem com a estação. O par térmico vive no mesmo termómetro.',
      historyEn:
        'Portuguese frio comes from Latin frīgidus / frīgus. It is both adjective and noun. Ice (gelū / glaciēs) is another root — solid water, not a synonym.',
      curiositiesEn:
        'Greeting the cold (Bom dia, Inverno) is not fusing cold with ice or with the season. The thermal pair lives on the same thermometer.',
      historyEs:
        'Frio viene del latín frīgidus / frīgus. En portugués es adjetivo y sustantivo. Hielo (gelū / glaciēs) es otra raíz — agua sólida, no sinónimo.',
      curiositiesEs:
        'Saludar el frío (Bom dia, Inverno) no es fundir frío con hielo ni con la estación. El par térmico vive en el mismo termómetro.'
    }
  ];
  for (const entry of entries) {
    const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'fogo');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-calor-frio-palavra-cover.js')], {
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

  const post = stampFiles(buildCalorFrioPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia, post);

  if (gloss) {
    gloss = patchGlossary(
      gloss,
      'calor',
      '    calor: { tone: "caution", category: "Qualidade", mundane: "Substantivo — qualidade de estar quente; também o grau que se sente.", gloss: "Lat. calor ← calēre — qualidade quente; par frio; ≠ fogo ≠ caloria; mede-se na tenda; Valeu !!!", href: "/posts/post-inspecao-palavra-calor-frio.html", en: "heat / warmth", es: "calor", fr: "chaleur", it: "calore", de: "Wärme / Hitze", el: "ζέστη", la: "calor", yo: "ooru", sw: "joto", gez: "mowq", nl: "warmte", pl: "ciepło", ru: "тепло", uk: "тепло", zh: "热", ja: "熱", ko: "열", ar: "حرارة", he: "חום", hi: "गर्मी", tr: "sıcaklık", sv: "värme", da: "varme", no: "varme", fi: "lämpö", cs: "teplo", ro: "căldură", hu: "hő", ca: "calor", gl: "calor", eu: "bero", gn: "haku", qu: "q\'uñi", eo: "varmo", vi: "nóng", id: "panas", th: "ความร้อน", hr: "toplina", sk: "teplo", ga: "teas", cy: "gwres", ha: "zafi", am: "ሙቀት", fa: "گرما", bn: "গরম", zu: "ukushisa" },\n',
      '    quente: { gloss: "Adjectivo do calor — par vivo de frio; ver calor × frio.", href: "/posts/post-inspecao-palavra-calor-frio.html", en: "hot / warm", es: "caliente / cálido" },\n' +
        '    caloria: { tone: "caution", category: "Unidade", mundane: "Unidade de energia (comida / física).", gloss: "Prima de calor (mesmo étimo calēre); ofício de unidade ≠ qualidade térmica; ver calor × frio.", href: "/posts/post-inspecao-palavra-calor-frio.html", en: "calorie", es: "caloría" },\n',
      'fogo'
    );
    gloss = patchGlossary(
      gloss,
      'frio',
      '    frio: { tone: "caution", category: "Qualidade", mundane: "Adjectivo e substantivo — qualidade de estar frio; o grau oposto de calor.", gloss: "Lat. frīgus / frīgidus — qualidade fria; par calor; ≠ gelo ≠ inverno; Valeu !!! com medida.", href: "/posts/post-inspecao-palavra-calor-frio.html", en: "cold / chill", es: "frío", fr: "froid", it: "freddo", de: "Kälte / kalt", el: "κρύο", la: "frigus / frigidus", yo: "otutu", sw: "baridi", gez: "bäräd", nl: "kou", pl: "zimno", ru: "холод", uk: "холод", zh: "冷", ja: "寒さ", ko: "추위", ar: "برد", he: "קור", hi: "ठंड", tr: "soğuk", sv: "kyla", da: "kulde", no: "kulde", fi: "kylmyys", cs: "zima", ro: "frig", hu: "hideg", ca: "fred", gl: "frío", eu: "hotz", gn: "ro\'y", qu: "chiri", eo: "malvarmo", vi: "lạnh", id: "dingin", th: "ความเย็น", hr: "hladnoća", sk: "chlad", ga: "fuacht", cy: "oer", ha: "sanyi", am: "ቅዝቃዜ", fa: "سرما", bn: "ঠান্ডা", zu: "amakhaza" },\n',
      '    friagem: { gloss: "Onda de frio — qualidade intensa; ≠ gelo (estado); ver calor × frio.", href: "/posts/post-inspecao-palavra-calor-frio.html", en: "cold snap", es: "ola de frío" },\n',
      'calor'
    );
  }

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (calor · frio)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
