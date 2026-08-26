'use strict';

/**
 * Injeta a expressão Don't Show Again × não mostrar de novo.
 * Uso: node scripts/upsert-expressao-dont-show-again.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildDontShowAgainPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_SHOW,
  WIKT_DONT,
  WIKT_MOSTRAR
} = require('../lib/dont-show-again-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-expressao-dont-show-again.html';

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
    '    "don\'t show again": { tone: "craft", category: "Léxico", mundane: "EN de caixa de diálogo — não pôr à vista outra vez.", gloss: "Don\'t Show Again × não mostrar de novo; show=olhar (scēawian) × mostrar=avisar (mōnstrāre); Dont sem apóstrofo; de novo ≠ o novo; pular=desta vez ≠ daqui para a frente; Valeu !!!", href: "' +
    HREF +
    '", en: "don\'t show again", es: "no volver a mostrar", fr: "ne plus afficher", it: "non mostrare di nuovo", de: "nicht mehr anzeigen", el: "να μην εμφανιστεί ξανά", la: "noli iterum ostendere", yo: "má ṣe fi hàn mọ́", sw: "usionyeshe tena", gez: "don\'t show again", nl: "niet meer weergeven", pl: "nie pokazuj więcej", ru: "больше не показывать", uk: "більше не показувати", zh: "不再显示", ja: "次回から表示しない", ko: "다시 표시 안 함", ar: "عدم الإظهار مرة أخرى", he: "אל תציג שוב", hi: "फिर न दिखाएँ", tr: "bir daha gösterme", sv: "visa inte igen", da: "vis ikke igen", no: "ikke vis igjen", fi: "älä näytä uudelleen", cs: "příště nezobrazovat", ro: "nu afișa din nou", hu: "ne mutassa többet", ca: "no ho tornis a mostrar", gl: "non mostrar de novo", eu: "ez erakutsi berriro", gn: "ani ehechauka jey", qu: "ama huk kuti rikuchiy", eo: "ne montru denove", vi: "không hiện lại", id: "jangan tampilkan lagi", th: "ไม่ต้องแสดงอีก", hr: "ne prikazuj ponovno", sk: "nabudúce nezobrazovať", ga: "ná taispeáin arís", cy: "paid â dangos eto", ha: "kada ka nuna kuma", am: "እንደገና አታሳይ", fa: "دیگر نشان نده", bn: "আবার দেখাবেন না", zu: "ungabonisi futhi" },\n';
  gloss = replaceOrInsertAfter(gloss, "don't show again", main, 'login');
  const aliases = [
    [
      'dont show again',
      '    "dont show again": { gloss: "Grafia de campo sem apóstrofo — ver Don\'t Show Again.", href: "' +
        HREF +
        '", en: "dont show again", es: "dont show again" },\n'
    ],
    [
      "don't show this again",
      '    "don\'t show this again": { gloss: "Forma longa da caixa — this = esta mensagem; ver Don\'t Show Again.", href: "' +
        HREF +
        '", en: "don\'t show this again", es: "no mostrar esto de nuevo" },\n'
    ],
    [
      "don't show this message again",
      '    "don\'t show this message again": { gloss: "Etiqueta clássica de diálogo — ver Don\'t Show Again.", href: "' +
        HREF +
        '", en: "don\'t show this message again", es: "no volver a mostrar este mensaje" },\n'
    ],
    [
      'não mostrar de novo',
      '    "não mostrar de novo": { gloss: "Calco PT vivo de Don\'t Show Again — de novo = outra vez, ≠ o novo; ver Don\'t Show Again.", href: "' +
        HREF +
        '", en: "don\'t show again", es: "no mostrar de nuevo" },\n'
    ],
    [
      'nao mostrar de novo',
      '    "nao mostrar de novo": { gloss: "Sem til — o mesmo calco; ver Don\'t Show Again.", href: "' +
        HREF +
        '", en: "don\'t show again", es: "no mostrar de nuevo" },\n'
    ],
    [
      'não mostrar novamente',
      '    "não mostrar novamente": { gloss: "Forma de manual / UI de Don\'t Show Again — ver a ficha.", href: "' +
        HREF +
        '", en: "don\'t show again", es: "no mostrar de nuevo" },\n'
    ],
    [
      'nao mostrar novamente',
      '    "nao mostrar novamente": { gloss: "Sem til — ver não mostrar novamente / Don\'t Show Again.", href: "' +
        HREF +
        '", en: "don\'t show again", es: "no mostrar de nuevo" },\n'
    ],
    [
      'não exibir novamente',
      '    "não exibir novamente": { gloss: "Variante de escritório (exibir) — ver Don\'t Show Again.", href: "' +
        HREF +
        '", en: "don\'t display again", es: "no volver a mostrar" },\n'
    ],
    [
      'no volver a mostrar',
      '    "no volver a mostrar": { gloss: "Calco ES do mesmo ofício — ver Don\'t Show Again.", href: "' +
        HREF +
        '", en: "don\'t show again", es: "no volver a mostrar" },\n'
    ],
    [
      'mostrar',
      '    mostrar: { tone: "craft", category: "Léxico", mundane: "Lat. mōnstrāre — apontar, fazer ver, avisar.", gloss: "Peça PT de Don\'t Show Again; mōnstrāre ← moneō (avisar); ≠ show de palco; de novo ≠ o novo; Valeu !!!", href: "' +
        HREF +
        '", en: "to show", es: "mostrar", fr: "montrer", it: "mostrare", de: "zeigen", yo: "fi hàn", sw: "kuonyesha", gez: "ʾarʾäyä", el: "δείχνω", la: "monstrare", nl: "tonen", pl: "pokazać", ru: "показывать", uk: "показувати", zh: "显示", ja: "見せる", ko: "보이다", ar: "يظهر", he: "להראות", hi: "दिखाना", tr: "göstermek", sv: "visa", da: "vise", no: "vise", fi: "näyttää", cs: "ukázat", ro: "a arăta", hu: "mutatni", ca: "mostrar", gl: "mostrar", eu: "erakutsi", gn: "hechauka", qu: "rikuchiy", eo: "montri", vi: "hiện", id: "menunjukkan", th: "แสดง", hr: "pokazati", sk: "ukázať", ga: "taispeáin", cy: "dangos", ha: "nuna", am: "አሳይ", fa: "نشان دادن", bn: "দেখানো", zu: "khombisa" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, "don't show again");
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-dont-show-again-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildDontShowAgainPost());
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
        id: 'expressao-dont-show-again',
        title: 'Don\'t Show Again × não mostrar de novo — o aviso que pede para não voltar',
        titleEn: 'Don\'t Show Again × não mostrar de novo — the warning that asks not to return',
        titleEs: 'Don\'t Show Again × não mostrar de novo — el aviso que pide no volver',
        tipo: 'expressao',
        priority: 2,
        status: 'feita',
        why: 'Expressões: Don\'t Show Again × não mostrar de novo — caixa EN×PT; show=olhar × mostrar=avisar; de novo ≠ o novo.',
        whyEn: 'Sayings: Don\'t Show Again × não mostrar de novo — EN×PT dialog; show=look × mostrar=warn; de novo ≠ the new.',
        whyEs: 'Dichos: Don\'t Show Again × não mostrar de novo — caja EN×PT; show=mirar × mostrar=avisar; de novo ≠ lo nuevo.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'expressoes-ditados',
        sources: [
          HREF,
          WIKT_SHOW,
          WIKT_DONT,
          WIKT_MOSTRAR,
          'https://en.wiktionary.org/wiki/again',
          'https://pt.wiktionary.org/wiki/n%C3%A3o',
          'https://pt.wiktionary.org/wiki/de_novo',
          'https://en.wiktionary.org/wiki/monstro#Latin',
          'https://en.wiktionary.org/wiki/sceawian',
          '/posts/post-inspecao-expressao-miss-click.html',
          '/posts/post-inspecao-palavra-pular.html',
          '/posts/post-inspecao-expressao-loop-infinito.html',
          '/posts/post-inspecao-palavra-etimologia.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — cruzamento EN×PT; sem tutorial de cookie / burlar aviso.'
      },
      ['expressao-miss-click', 'palavra-pular', 'palavra-sempre']
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
        id: 'dont-show-again',
        word: 'Don\'t Show Again',
        simple:
          'EN de caixa de diálogo — não pôr à vista outra vez. Cruzamento com não mostrar de novo. Show = olhar (scēawian); mostrar = avisar (mōnstrāre). Dont sem apóstrofo. De novo ≠ o novo. Pular = desta vez. Valeu !!!',
        simpleEn:
          'EN dialog-box speech — do not put in view again. Crossed with não mostrar de novo. Show = look (scēawian); mostrar = warn (mōnstrāre). Dont without apostrophe. De novo ≠ the new. Skip = this time. Valeu !!!',
        simpleEs:
          'EN de caja de diálogo — no poner a la vista otra vez. Cruce con não mostrar de novo. Show = mirar (scēawian); mostrar = avisar (mōnstrāre). Dont sin apóstrofo. De novo ≠ lo nuevo. Saltar = esta vez. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Don\'t Show Again é locução de caixa de diálogo inglesa: contração don\'t (do + not) + show (OE scēawian «olhar, pôr à vista») + again (OE ongēan «outra vez»). A etiqueta elide this / this message: o objecto é esta mensagem, não «nunca mais mostrar nada». O português calca não mostrar de novo / não mostrar novamente: não (lat. non) + mostrar (lat. mōnstrāre ← moneō «avisar») + de novo («desde o novo» = outra vez). O cruzamento de ofício: o inglês esconde o olhar; o português esconde o aviso. Grafia de campo Dont cai o apóstrofo. Cola da orelha: de novo ouvido como «o novo» — não é o étimo da UI.',
        curiosities:
          'Pular / Skip / Dismiss é desta vez; Don\'t Show Again é daqui para a frente (deste sítio, deste rasto). Limpar dados ou outro login pode fazer a caixa voltar — não é never moral. Show de palco é outra sala. Miss Click no visto grava a preferência sem intenção. Prima: banner de cookies é consentir ou recusar, não só esconder o nag. O inspector, às vezes, olha de novo.',
        historyEn:
          'Don\'t Show Again is English dialog-box speech: contraction don\'t (do + not) + show (OE scēawian “look, put in view”) + again (OE ongēan “once more”). The label often drops this / this message: the object is this message, not “never show anything”. Portuguese calques não mostrar de novo / não mostrar novamente: não (Lat. non) + mostrar (Lat. mōnstrāre ← moneō “to warn”) + de novo (“from the new” = again). Craft cross: English hides the look; Portuguese hides the warning. Field spelling Dont drops the apostrophe. Ear-glue: de novo heard as “the new one” — not the UI etymon.',
        curiositiesEn:
          'Skip / Dismiss is this time; Don\'t Show Again is from here on (this site, this store). Clearing data or another login can bring the box back — it is not moral never. Stage show is another room. A Miss Click on the tick stores the preference by accident. Cousin: cookie banners are consent or refuse, not only hiding the nag. The inspector sometimes looks again.',
        historyEs:
          'Don\'t Show Again es locución inglesa de caja de diálogo: contracción don\'t (do + not) + show (OE scēawian «mirar, poner a la vista») + again (OE ongēan «otra vez»). La etiqueta elide this / this message: el objeto es este mensaje, no «nunca más mostrar nada». El portugués calca não mostrar de novo / não mostrar novamente: não (lat. non) + mostrar (lat. mōnstrāre ← moneō «avisar») + de novo («desde lo nuevo» = otra vez). Cruce de oficio: el inglés esconde la mirada; el portugués esconde el aviso. Grafía de campo Dont cae el apóstrofo. Cola del oído: de novo oído como «lo nuevo» — no es el étimo de la UI.',
        curiositiesEs:
          'Saltar / Dismiss es esta vez; Don\'t Show Again es de aquí en adelante (este sitio, este rastro). Borrar datos u otro login puede hacer volver la caja — no es never moral. El show de escenario es otra sala. Miss Click en el visto graba la preferencia sin querer. Prima: el banner de cookies es consentir o rechazar, no solo esconder el nag. El inspector, a veces, mira de nuevo.'
      },
      ['miss-click', 'pular', 'sempre']
    );
    upsertItem(
      items,
      {
        id: 'nao-mostrar-de-novo',
        word: 'não mostrar de novo',
        simple:
          'Calco PT vivo de Don\'t Show Again — de novo = outra vez, não «o novo». Forma de manual: não mostrar novamente. Valeu !!!',
        simpleEn:
          'Living PT calque of Don\'t Show Again — de novo = again, not “the new one”. Manual form: não mostrar novamente. Valeu !!!',
        simpleEs:
          'Calco PT vivo de Don\'t Show Again — de novo = otra vez, no «lo nuevo». Forma de manual: não mostrar novamente. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['dont-show-again']
    );
    upsertItem(
      items,
      {
        id: 'mostrar',
        word: 'mostrar',
        simple:
          'Lat. mōnstrāre — apontar, fazer ver, avisar (moneō). Peça PT de Don\'t Show Again × não mostrar de novo. ≠ show de palco. Valeu !!!',
        simpleEn:
          'Lat. mōnstrāre — to point, make visible, warn (moneō). PT piece of Don\'t Show Again × não mostrar de novo. ≠ stage show. Valeu !!!',
        simpleEs:
          'Lat. mōnstrāre — señalar, hacer ver, avisar (moneō). Pieza PT de Don\'t Show Again × não mostrar de novo. ≠ show de escenario. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['nao-mostrar-de-novo', 'dont-show-again']
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
      id: 'dont-show-again',
      slug: 'dont-show-again',
      title: 'Don\'t Show Again',
      titleEn: 'Don\'t Show Again',
      titleEs: 'Don\'t Show Again',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o aviso que pede para não voltar; show=olhar × mostrar=avisar; Valeu !!!',
      teaserEn: 'BudGanja echo — the warning that asks not to return; show=look × mostrar=warn; Valeu !!!',
      teaserEs: 'Eco BudGanja — el aviso que pide no volver; show=mirar × mostrar=avisar; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'dont-show-again', 'mostrar', 'gesto']
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
