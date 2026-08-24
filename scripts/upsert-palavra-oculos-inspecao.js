'use strict';

/**
 * Injeta objecto «óculos» na série Palavras (catálogo Objetos).
 * Uso: node scripts/upsert-palavra-oculos-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildOculosPost, WIKT, WIKT_OCULO, WIKI } = require('../lib/oculos-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const OBJETOS_FILE = path.join(ROOT, 'objetos', 'index.html');
const HREF = '/posts/post-inspecao-palavra-oculos.html';

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

function patchGlossary(gloss) {
  const main =
    '    óculos: { tone: "craft", category: "Objecto", mundane: "Par de lentes na armação, diante do olho.", gloss: "Plural de óculo ← lat. oculus — objecto, não o órgão; ≠ lente de contacto ≠ marca; Valeu !!!", href: "' +
    HREF +
    '", en: "glasses / spectacles", es: "gafas / lentes", fr: "lunettes", it: "occhiali", de: "Brille", el: "γυαλιά", la: "ocularia", yo: "gíláàsì", sw: "miwani", gez: "mäsəfər", nl: "bril", pl: "okulary", ru: "очки", uk: "окуляри", zh: "眼镜", ja: "眼鏡", ko: "안경", ar: "نظارات", he: "משקפיים", hi: "चश्मा", tr: "gözlük", sv: "glasögon", da: "briller", no: "briller", fi: "silmälasit", cs: "brýle", ro: "ochelari", hu: "szemüveg", ca: "ulleres", gl: "lentes / gafas", eu: "betaurrekoak", gn: "telesa", qu: "ñawi qhawa", eo: "oculvitroj", vi: "kính mắt", id: "kacamata", th: "แว่นตา", hr: "naočale", sk: "okuliare", ga: "spéaclaí", cy: "sbectol", ha: "tabarau", am: "መነጽር", fa: "عینک", bn: "চশমা", zu: "izibuko" },\n';
  gloss = replaceOrInsertAfter(gloss, 'óculos', main, 'olho');
  const aliases = [
    [
      'oculos',
      '    oculos: { gloss: "Grafia sem acento de óculos — objecto diante do olho; ver óculos.", href: "' +
        HREF +
        '", en: "glasses (unaccented)", es: "gafas (sin acento)" },\n'
    ],
    [
      'óculo',
      '    óculo: { gloss: "Singular culto — luneta / olho de boi / uma lente; o par no rosto é óculos.", href: "' +
        HREF +
        '", en: "oculus / spyglass / one lens", es: "óculo / anteojo" },\n'
    ],
    [
      'oculo',
      '    oculo: { gloss: "Grafia sem acento de óculo — ver óculos.", href: "' +
        HREF +
        '", en: "oculo (unaccented)", es: "oculo (sin acento)" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'óculos');
  }
  return gloss;
}

function patchObjetosHtml(html) {
  const card =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-oculos.html">\n' +
    '                <span class="objetos-catalog-kicker">Palavras · objecto</span>\n' +
    '                <strong>Óculos</strong>\n' +
    '                <span>O par diante do olho — lentes + armação; ≠ órgão ≠ contacto.</span>\n' +
    '            </a>\n';
  if (html.includes('post-inspecao-palavra-oculos.html')) {
    return html.replace(
      /            <a class="objetos-catalog-card" href="\/posts\/post-inspecao-palavra-oculos\.html">[\s\S]*?<\/a>\n/,
      card
    );
  }
  const needle =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-afinador.html">';
  const i = html.indexOf(needle);
  if (i < 0) {
    console.warn('Aviso: cartão óculos — âncora afinador não encontrada');
    return html;
  }
  const after = html.indexOf('</a>', i);
  if (after < 0) return html;
  return html.slice(0, after + 4) + '\n' + card + html.slice(after + 4);
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
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-oculos-objeto-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildOculosPost());
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
        id: 'objeto-oculos',
        title: 'Óculos — o objecto diante do olho',
        titleEn: 'Óculos — the object in front of the eye',
        titleEs: 'Óculos — el objeto delante del ojo',
        tipo: 'objeto',
        priority: 2,
        status: 'feita',
        why: 'Objecto: óculos (plural de óculo ← lat. oculus) — lentes + armação diante do olho; ≠ órgão ≠ contacto ≠ marca.',
        whyEn: 'Object: óculos (plural of óculo ← Lat. oculus) — lenses + frame in front of the eye; ≠ organ ≠ contacts ≠ brand.',
        whyEs: 'Objeto: óculos (plural de óculo ← lat. oculus) — lentes + montura delante del ojo; ≠ órgano ≠ lentilla ≠ marca.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          WIKT_OCULO,
          WIKI,
          '/posts/post-inspecao-palavra-olho.html',
          '/posts/post-inspecao-palavra-objetos.html',
          '/objetos/',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — objecto; mesmo oculus que olho; outra classe.'
      },
      ['objeto-afinador', 'objeto-violao', 'palavra-olho']
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
        id: 'oculos',
        word: 'óculos',
        simple:
          'Plural de óculo ← lat. oculus — o objecto (lentes + armação) diante do olho. ≠ órgão ≠ lente de contacto ≠ marca. Valeu !!!',
        simpleEn:
          'Plural of óculo ← Lat. oculus — the object (lenses + frame) in front of the eye. ≠ organ ≠ contacts ≠ brand. Valeu !!!',
        simpleEs:
          'Plural de óculo ← lat. oculus — el objeto (lentes + montura) delante del ojo. ≠ órgano ≠ lentilla ≠ marca. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Óculos é o plural de óculo, do latim oculus (olho). O órgão fica na ficha olho (cruzada com zaroio). O objecto é o par de lentes na armação, com hastes nas orelhas. A fala BR muitas vezes diz o óculos (um par); o lema no papel é plural.',
        curiosities:
          'O par senta-se à frente do olho, em regra sem o tocar — a lente de contacto é outra coisa. Grau, sol, EPI e natação são funções do mesmo lema. A marca não vê por ti.',
        historyEn:
          'Óculos is the plural of óculo, from Latin oculus (eye). The organ is the olho sheet (crossed with zaroio). The object is the pair of lenses in a frame, temples on the ears. Spoken BR often says o óculos (one pair); the lemma stays plural.',
        curiositiesEn:
          'The pair sits in front of the eye, usually without touching it — a contact lens is another thing. Prescription, sun, safety and swim are functions of the same lemma. A brand does not see for you.',
        historyEs:
          'Óculos es el plural de óculo, del latín oculus (ojo). El órgano está en la ficha olho (cruzada con zaroio). El objeto es el par de lentes en la montura. El habla BR a menudo dice o óculos; el lema sigue plural.',
        curiositiesEs:
          'El par se sienta delante del ojo, por regla sin tocarlo — la lentilla es otra cosa. Grado, sol, EPI y natación son funciones del mismo lema. La marca no ve por ti.'
      },
      ['olho', 'zaroio', 'objetos', 'afinador']
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

  if (fs.existsSync(OBJETOS_FILE)) {
    let html = fs.readFileSync(OBJETOS_FILE, 'utf8');
    html = patchObjetosHtml(html);
    fs.writeFileSync(OBJETOS_FILE, html);
    console.log('Catálogo Objetos actualizado');
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
