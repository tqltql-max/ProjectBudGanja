'use strict';

/**
 * Injeta a expressão Miss Click (mis- + click; cola senhorita Clique).
 * Uso: node scripts/upsert-expressao-miss-click.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildMissClickPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT
} = require('../lib/miss-click-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-expressao-miss-click.html';

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

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    '    (?:"' + escaped + '"|' + escaped + '):\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterEsc = afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const afterRe = new RegExp(
    '(    (?:"' + afterEsc + '"|' + afterEsc + '):\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const main =
    '    "miss click": { tone: "craft", category: "Léxico", mundane: "EN — clique no sítio errado (mis- + click).", gloss: "mis- + click (clique errado); grafias misclick / miss click / Miss Click; cola senhorita Clique ≠ origem (Miss ← mistress); calco clique errado; ≠ grupo social ≠ saudade ≠ clickbait; Valeu !!!", href: "' +
    HREF +
    '", en: "misclick / miss click", es: "clic erróneo / misclick", fr: "faux clic", it: "click sbagliato", de: "Fehlklick", el: "λάθος κλικ", la: "ictus falsus", yo: "tẹ̀ àṣìṣe", sw: "bofya-kosa", gez: "miss click", nl: "misclick", pl: "misklik", ru: "мисклик", uk: "місклік", zh: "点错", ja: "ミスクリック", ko: "미스클릭", ar: "نقرة خاطئة", he: "קליק שגוי", hi: "गलत क्लिक", tr: "yanlış tık", sv: "felklick", da: "fejlklick", no: "feilklikk", fi: "väärä klikkaus", cs: "špatný klik", ro: "click greșit", hu: "téves kattintás", ca: "clic erroni", gl: "clic errado", eu: "klik okerra", gn: "clic vai", qu: "click pantasqa", eo: "erara klako", vi: "nhấp nhầm", id: "klik salah", th: "คลิกผิด", hr: "pogrešan klik", sk: "zlý klik", ga: "cliceáil mhícheart", cy: "clic anghywir", ha: "danna kuskure", am: "የተሳሳተ ጠቅታ", fa: "کلیک اشتباه", bn: "ভুল ক্লিক", zu: "ukuchofoza okungalungile" },\n';
  gloss = replaceOrInsertAfter(gloss, 'miss click', main, 'retarget');
  const aliases = [
    [
      'misclick',
      '    misclick: { gloss: "Forma de oficina (uma palavra) de Miss Click — mis- + click; ver Miss Click.", href: "' +
        HREF +
        '", en: "misclick", es: "misclick" },\n'
    ],
    [
      'miss-click',
      '    "miss-click": { gloss: "Grafia com hífen de miss click — ver Miss Click.", href: "' +
        HREF +
        '", en: "miss-click", es: "miss-click" },\n'
    ],
    [
      'missclick',
      '    missclick: { gloss: "Grafia soldada de miss click — ver Miss Click.", href: "' +
        HREF +
        '", en: "missclick", es: "missclick" },\n'
    ],
    [
      'clique errado',
      '    "clique errado": { gloss: "Calco PT de miss click — o clique no sítio errado; ver Miss Click.", href: "' +
        HREF +
        '", en: "wrong click / misclick", es: "clic erróneo" },\n'
    ],
    [
      'click',
      '    click: { gloss: "EN — estalo curto; no ecrã, o gesto do botão; peça de Miss Click (mis- + click); ≠ clique social; ver Miss Click.", href: "' +
        HREF +
        '", en: "click", es: "clic / click" },\n'
    ],
    [
      'clique',
      '    clique: { gloss: "PT do gesto (← EN click) ou grupo social (← FR clique) — homógrafos; nesta ficha o gesto; ver Miss Click.", href: "' +
        HREF +
        '", en: "click / clique", es: "clic / camarilla" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'miss click');
  }
  return gloss;
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-miss-click-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildMissClickPost());
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
        id: 'expressao-miss-click',
        title: 'Miss Click — mis- + click; a orelha cola a senhorita',
        titleEn: 'Miss Click — mis- + click; the ear glues the young lady',
        titleEs: 'Miss Click — mis- + click; el oído pega a la señorita',
        tipo: 'expressao',
        priority: 2,
        status: 'feita',
        why: 'Expressões: Miss Click (mis- + click) — clique no sítio errado; cola senhorita Clique ≠ étimo; ≠ clique social.',
        whyEn: 'Sayings: Miss Click (mis- + click) — wrong-place click; young-lady glue ≠ etymon; ≠ social clique.',
        whyEs: 'Dichos: Miss Click (mis- + click) — clic en el sitio errado; cola señorita ≠ étimo; ≠ clique social.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'expressoes-ditados',
        sources: [
          HREF,
          WIKT,
          'https://en.wiktionary.org/wiki/mis-#English',
          'https://en.wiktionary.org/wiki/click',
          'https://en.wiktionary.org/wiki/Miss',
          'https://pt.wiktionary.org/wiki/clique',
          'https://pt.wikipedia.org/wiki/Etimologia_popular',
          '/posts/post-inspecao-palavra-etimologia.html',
          '/posts/post-inspecao-palavra-gesto.html',
          '/posts/post-inspecao-palavra-retarget.html',
          '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — étimo mis-+click × cola Miss (≠ origem); sem tutorial de aim.'
      },
      ['expressao-revoada', 'palavra-retarget', 'palavra-gesto']
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
        id: 'miss-click',
        word: 'Miss Click',
        simple:
          'EN mis- + click — clique no sítio errado. Grafias: misclick / miss click / Miss Click. Cola da orelha: senhorita Clique ≠ étimo (Miss ← mistress). Calco: clique errado. ≠ grupo social ≠ saudade. Valeu !!!',
        simpleEn:
          'EN mis- + click — click in the wrong place. Spellings: misclick / miss click / Miss Click. Ear-glue: young lady Clique ≠ etymon (Miss ← mistress). Calque: clique errado. ≠ social clique ≠ longing. Valeu !!!',
        simpleEs:
          'EN mis- + click — clic en el sitio errado. Grafías: misclick / miss click / Miss Click. Cola del oído: señorita Clique ≠ étimo (Miss ← mistress). Calco: clique errado. ≠ grupo social ≠ añoranza. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Miss Click é a boca do pátio (maiúsculas) do composto inglês misclick: prefixo mis- («erradamente») + click (onomatopeia do estalo curto, depois o gesto no ecrã). A grafia miss click parte o composto no verbo miss («falhar o alvo», OE missan) — o ofício coincide; o étimo de oficina continua a ser o prefixo. O título Miss (senhorita, de mistress) é cola da orelha, não origem. O verbo misclick já aparece em registo de oficina nos anos 1950 (antes da GUI doméstica); o nome firma-se nos anos 1990. Português herdou clique do inglês click para o gesto; clique de grupo vem do francês — homógrafo a cortar.',
        curiosities:
          'A cola senhorita Clique só funciona com maiúsculas. Em português, miss + click não soa a Miss Click — a cola é bilingue. Irmão: retarget (voltar a apontar depois do miss). O interruptor já clicava antes do rato. Calco: clique errado / clicar fora. Primo táctil: mistap. Salas cortadas: saudade (I miss you), clickbait, klick (km), culpa moral do dedo.',
        historyEn:
          'Miss Click is yard speech (capitals) for English misclick: prefix mis- (“wrongly”) + click (onomatopoeia of a short snap, later the on-screen gesture). The spelling miss click splits the compound at the verb miss (“fail to hit”, OE missan) — the office matches; the workshop etymon remains the prefix. The title Miss (from mistress) is ear-glue, not origin. The verb is recorded in the 1950s (before home GUIs); the noun settles in the 1990s. Portuguese clique for the gesture comes from English click; social clique is French — a homograph to cut.',
        curiositiesEn:
          'The young-lady glue only works with capitals. In Portuguese, miss + click does not sound like Miss Click — the glue is bilingual. Sibling: retarget (aim again after the miss). The switch already clicked before the mouse. Calque: clique errado. Touch cousin: mistap. Rooms cut: I miss you, clickbait, klick (km), blaming the finger.',
        historyEs:
          'Miss Click es habla de patio (mayúsculas) del compuesto inglés misclick: prefijo mis- («erradamente») + click (onomatopeya del chasquido corto, luego el gesto en pantalla). La grafía miss click parte el compuesto en el verbo miss («fallar el blanco») — el oficio coincide; el étimo de oficio sigue siendo el prefijo. El título Miss (de mistress) es cola del oído, no origen. El verbo se registra en los años 1950; el nombre se afirma en los 1990. El portugués clique del gesto viene del inglés click; el clique de grupo es francés — homógrafo a cortar.',
        curiositiesEs:
          'La cola señorita Clique solo funciona con mayúsculas. En portugués, miss + click no suena a Miss Click — la cola es bilingüe. Hermano: retarget (volver a apuntar). El interruptor ya clicaba antes del ratón. Calco: clique errado. Primo táctil: mistap. Salas cortadas: añoranza, clickbait, klick (km), culpa del dedo.'
      },
      ['retarget', 'gesto', 'backspace']
    );
    upsertItem(
      items,
      {
        id: 'misclick',
        word: 'misclick',
        simple:
          'Forma de oficina (uma palavra) de Miss Click — mis- + click. Valeu !!!',
        simpleEn: 'Workshop form (one word) of Miss Click — mis- + click. Valeu !!!',
        simpleEs: 'Forma de oficio (una palabra) de Miss Click — mis- + click. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['miss-click']
    );
    upsertItem(
      items,
      {
        id: 'clique-errado',
        word: 'clique errado',
        simple:
          'Calco PT de miss click — o clique no sítio errado. Homógrafo clique (grupo FR) fica de fora. Valeu !!!',
        simpleEn:
          'PT calque of miss click — the click in the wrong place. Social clique (FR) stays out. Valeu !!!',
        simpleEs:
          'Calco PT de miss click — el clic en el sitio errado. El clique de grupo (FR) queda fuera. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['misclick', 'miss-click']
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

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'miss-click',
      slug: 'miss-click',
      title: 'Miss Click',
      titleEn: 'Miss Click',
      titleEs: 'Miss Click',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o clique que falhou o alvo; a orelha cola a senhorita, o étimo corta; Valeu !!!',
      teaserEn: 'BudGanja echo — the click that missed the target; the ear glues the young lady, the etymon cuts; Valeu !!!',
      teaserEs: 'Eco BudGanja — el clic que falló el blanco; el oído pega a la señorita, el étimo corta; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'miss-click', 'click', 'gesto']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
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
