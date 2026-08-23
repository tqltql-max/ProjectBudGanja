'use strict';

/**
 * Cluster Deus (palavra) → A Deus!!! / adeus (expressão) → fui (palavra).
 * Uso: node scripts/upsert-deus-adeus-fui-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildDeusPost, poemPt: poemDeusPt, poemEn: poemDeusEn, poemEs: poemDeusEs } = require('../lib/deus-inspecao-post.js');
const { buildAdeusPost, poemPt: poemAdeusPt, poemEn: poemAdeusEn, poemEs: poemAdeusEs } = require('../lib/adeus-inspecao-post.js');
const { buildFuiPost, poemPt: poemFuiPt, poemEn: poemFuiEn, poemEs: poemFuiEs } = require('../lib/fui-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');

const H = {
  deus: '/posts/post-inspecao-palavra-deus.html',
  adeus: '/posts/post-inspecao-expressao-adeus.html',
  fui: '/posts/post-inspecao-palavra-fui.html'
};

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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || []).map((id) => items.findIndex((x) => x.id === id)).find((n) => n >= 0);
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
  const re = new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n');
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const deus =
    '    deus: { tone: "warm", category: "Nome", mundane: "Vocábulo PT — lat. deus ← céu / luz do dia.", gloss: "Palavra, não catecismo; Deus × deus; ≠ Elohim/Theos/Allah; cluster A Deus!!! / fui; Valeu !!!", href: "' +
    H.deus +
    '", en: "God / a god", es: "Dios / un dios", fr: "Dieu", it: "Dio", de: "Gott", el: "Θεός", la: "deus", yo: "Ọlọ́run", sw: "Mungu", gez: "ʼƎgziʼabəḥer", nl: "God", pl: "Bóg", ru: "Бог", uk: "Бог", zh: "上帝 / 神", ja: "神", ko: "하느님 / 신", ar: "الله / إله", he: "אלוהים", hi: "ईश्वर", tr: "Tanrı", sv: "Gud", da: "Gud", no: "Gud", fi: "Jumala", cs: "Bůh", ro: "Dumnezeu", hu: "Isten", ca: "Déu", gl: "Deus", eu: "Jainko", gn: "Tupã", qu: "Diyus", eo: "Dio", vi: "Chúa / thần", id: "Tuhan", th: "พระเจ้า", hr: "Bog", sk: "Boh", ga: "Dia", cy: "Duw", ha: "Allah", am: "እግዚአብሔር", fa: "خدا", bn: "ঈশ্বর", zu: "uNkulunkulu" },\n';
  const deuses =
    '    deuses: { gloss: "Plural de deus (minúsculo) — deidades; o Uno da tradição cristã fica em Deus.", href: "' +
    H.deus +
    '", en: "gods", es: "dioses" },\n';
  const adeus =
    '    adeus: { tone: "warm", category: "Despedida", mundane: "A + Deus — encomendo-te a Deus.", gloss: "Grito A Deus!!! × grafia adeus; ≠ Deus abençoe; irmã fui; ficha ≠ catecismo; Valeu !!!", href: "' +
    H.adeus +
    '", en: "goodbye / farewell", es: "adiós", fr: "adieu", it: "addio", de: "Lebewohl", el: "αντίο", la: "vale", yo: "ódàbọ̀", sw: "kwaheri", gez: "dehna hun", nl: "vaarwel", pl: "żegnaj", ru: "прощай", uk: "прощавай", zh: "再见", ja: "さようなら", ko: "안녕", ar: "وداعا", he: "שלום", hi: "अलविदा", tr: "hoşça kal", sv: "adjö", da: "farvel", no: "farvel", fi: "näkemiin", cs: "sbohem", ro: "adio", hu: "isten veled", ca: "adéu", gl: "adeus", eu: "agur", gn: "jajoecha peve", qu: "riki", eo: "adiaŭ", vi: "tạm biệt", id: "selamat tinggal", th: "ลาก่อน", hr: "zbogom", sk: "zbohom", ga: "slán", cy: "hwyl fawr", ha: "sai anjima", am: "ደህና ሁን", fa: "خداحافظ", bn: "বিদায়", zu: "sala kahle" },\n';
  const aDeus =
    '    "a deus": { gloss: "Grito partido — ver adeus / A Deus!!!; a + Deus.", href: "' +
    H.adeus +
    '", en: "see adeus", es: "ver adeus" },\n';
  const aDeusBang =
    '    "a deus!!!": { gloss: "Pedido de campo — ver adeus (canónico) / A Deus!!!", href: "' +
    H.adeus +
    '", en: "A Deus!!! / goodbye", es: "¡A Deus!!!" },\n';
  const fui =
    '    fui: { tone: "craft", category: "Saída", mundane: "Pretérito de ir e de ser; na rua, Fui!", gloss: "Lat. fuī — ir × ser; gíria de porta; cluster Deus / A Deus!!!; ≠ passado; Valeu !!!", href: "' +
    H.fui +
    '", en: "I went / I was / I’m out", es: "fui / me fui", fr: "je suis allé / je fus", it: "fui", de: "ich ging / ich war", el: "πήγα / ήμουν", la: "fuī", yo: "mo lọ", sw: "nilienda", gez: "ḥorku", nl: "ik ging / ik was", pl: "poszedłem / byłem", ru: "я пошёл / я был", uk: "я пішов / я був", zh: "我去了 / 我曾是", ja: "行った / だった", ko: "갔다 / 였다", ar: "ذهبت / كنت", he: "הלכתי / הייתי", hi: "गया / था", tr: "gittim / dim", sv: "jag gick / jag var", da: "jeg gik / jeg var", no: "jeg gikk / jeg var", fi: "menin / olin", cs: "šel jsem / byl jsem", ro: "m-am dus / am fost", hu: "mentem / voltam", ca: "vaig anar / vaig ser", gl: "fun", eu: "joan nintzen", gn: "ahasa", qu: "rirqani", eo: "mi iris / mi estis", vi: "tôi đã đi", id: "saya pergi", th: "ฉันไปแล้ว", hr: "otišao sam", sk: "išiel som", ga: "chuaigh mé", cy: "es i", ha: "na tafi", am: "ሄድኩ", fa: "رفتم", bn: "গেছি", zu: "ngahamba" },\n';

  gloss = replaceOrInsertAfter(gloss, 'deus', deus, '"deus abenço"');
  gloss = replaceOrInsertAfter(gloss, 'deuses', deuses, 'deus');
  gloss = replaceOrInsertAfter(gloss, 'adeus', adeus, 'deuses');
  gloss = replaceOrInsertAfter(gloss, '"a deus"', aDeus, 'adeus');
  gloss = replaceOrInsertAfter(gloss, '"a deus!!!"', aDeusBang, '"a deus"');
  gloss = replaceOrInsertAfter(gloss, 'fui', fui, '"a deus!!!"');
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-deus-adeus-fui-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const deus = stampFiles(buildDeusPost());
  const adeus = stampFiles(buildAdeusPost());
  const fui = stampFiles(buildFuiPost());
  if (Number(fui.seriesOrder) <= Number(deus.seriesOrder)) {
    fui.seriesOrder = Number(deus.seriesOrder) + 1;
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';
  const vida = fs.existsSync(VIDA_FILE) ? JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8')) : { poems: [] };

  for (const post of [deus, adeus, fui]) {
    upsertPost(posts, post);
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML', post.slug, e.message);
    }
    writeI18n(i18n, post);
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  const sugItems = Array.isArray(sug.items) ? sug.items : [];
  upsertItem(sugItems, {
    id: 'palavra-deus',
    title: 'Deus — o vocábulo do céu latino; ficha ≠ catecismo',
    titleEn: 'Deus — the Latin-sky vocable; sheet ≠ catechism',
    titleEs: 'Deus — el vocablo del cielo latino; ficha ≠ catecismo',
    tipo: 'palavra',
    priority: 1,
    status: 'feita',
    why: 'Palavras: Deus ← lat. deus ← PIE *dyēus*; Deus × deus; ≠ Elohim/Theos/Allah; cluster A Deus!!! / fui; Valeu !!!',
    whyEn: 'Words: Deus ← Lat. deus ← PIE *dyēus*; God × a god; cluster A Deus!!! / fui; Valeu !!!',
    whyEs: 'Palabras: Deus ← lat. deus ← PIE *dyēus*; Dios × un dios; clúster A Deus!!! / fui; ¡Valeu !!!',
    suggestedSlug: deus.slug,
    doneHref: H.deus,
    seriesHint: 'palavras-origem',
    sources: [deus.sourceUrl, H.adeus, H.fui, '/posts/post-inspecao-palavra-diabo.html'],
    notes: 'Cap. ' + deus.seriesOrder + ' — cluster Deus / A Deus!!! / fui; ficha ≠ catecismo.'
  });
  upsertItem(sugItems, {
    id: 'expressao-adeus',
    title: 'A Deus!!! — adeus, encomendar e sair',
    titleEn: 'A Deus!!! — goodbye, commend and leave',
    titleEs: '¡A Deus!!! — adiós, encomendar y salir',
    tipo: 'expressao',
    priority: 1,
    status: 'feita',
    why: 'Expressões: A Deus!!! = a + Deus (adeus); grito partido × grafia junta; ≠ Deus abençoe; irmã fui.',
    whyEn: 'Sayings: A Deus!!! = a + Deus; split shout × glued spelling; ≠ Deus abençoe; sister fui.',
    whyEs: 'Dichos: ¡A Deus!!! = a + Deus; grito partido × grafía junta; ≠ Deus abençoe; hermana fui.',
    suggestedSlug: adeus.slug,
    doneHref: H.adeus,
    seriesHint: 'expressoes-ditados',
    sources: [adeus.sourceUrl, H.deus, H.fui, '/posts/post-inspecao-expressao-deus-abencoe.html'],
    notes: 'Cap. ' + adeus.seriesOrder + ' — A Deus!!! / adeus; irmã fui.'
  });
  upsertItem(sugItems, {
    id: 'palavra-fui',
    title: 'fui — pretérito de ir e de ser; na rua, Fui!',
    titleEn: 'fui — preterite of to go and to be; in the street, Fui!',
    titleEs: 'fui — pretérito de ir y de ser; en la calle, ¡Fui!',
    tipo: 'palavra',
    priority: 1,
    status: 'feita',
    why: 'Palavras: fui ← lat. fuī (ir e ser); gíria Fui! = saí; cluster Deus / A Deus!!!; ≠ passado; Valeu !!!',
    whyEn: 'Words: fui ← Lat. fuī (to go and to be); slang Fui!; cluster Deus / A Deus!!!; Valeu !!!',
    whyEs: 'Palabras: fui ← lat. fuī (ir y ser); jerga ¡Fui!; clúster Deus / A Deus!!!; ¡Valeu !!!',
    suggestedSlug: fui.slug,
    doneHref: H.fui,
    seriesHint: 'palavras-origem',
    sources: [fui.sourceUrl, H.deus, H.adeus, '/posts/post-inspecao-palavra-passado.html'],
    notes: 'Cap. ' + fui.seriesOrder + ' — fecha o cluster; gíria Fui!'
  });
  sug.items = sugItems;
  sug.updatedAt = new Date().toISOString();

  const guiaItems = Array.isArray(guia.items) ? guia.items : [];
  upsertItem(
    guiaItems,
    {
      id: 'deus',
      word: 'Deus',
      simple:
        'Lat. deus ← PIE *dyēus* (céu / luz do dia). Vocábulo, não catecismo. Deus × deus. Cluster: A Deus!!! · fui. Valeu !!!',
      simpleEn:
        'Lat. deus ← PIE *dyēus* (sky / daylight). Vocable, not catechism. God × a god. Cluster: A Deus!!! · fui. Valeu !!!',
      simpleEs:
        'Lat. deus ← PIE *dyēus* (cielo / luz del día). Vocablo, no catecismo. Dios × un dios. Clúster: A Deus!!! · fui. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.deus
    },
    ['deus-abencoe', 'filho-de-deus']
  );
  upsertItem(
    guiaItems,
    {
      id: 'adeus',
      word: 'A Deus!!!',
      simple:
        'a + Deus = adeus — encomendar e sair. Grito A Deus!!! × grafia junta. ≠ Deus abençoe. Irmã: fui. Valeu !!!',
      simpleEn:
        'a + Deus = adeus — commend and leave. Shout A Deus!!! × glued spelling. ≠ Deus abençoe. Sister: fui. Valeu !!!',
      simpleEs:
        'a + Deus = adeus — encomendar y salir. Grito A Deus!!! × grafía junta. ≠ Deus abençoe. Hermana: fui. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.adeus
    },
    ['deus', 'deus-abencoe']
  );
  upsertItem(
    guiaItems,
    {
      id: 'fui',
      word: 'fui',
      simple:
        'Lat. fuī — pretérito de ir e de ser. Gíria Fui! = saí. Fecha o cluster Deus / A Deus!!!. ≠ passado. Valeu !!!',
      simpleEn:
        'Lat. fuī — preterite of to go and to be. Slang Fui! = I’m out. Closes Deus / A Deus!!!. ≠ passado. Valeu !!!',
      simpleEs:
        'Lat. fuī — pretérito de ir y de ser. Jerga ¡Fui! = me fui. Cierra Deus / A Deus!!!. ≠ passado. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.fui
    },
    ['adeus', 'deus']
  );
  guia.items = guiaItems;
  guia.updatedAt = new Date().toISOString();

  gloss = patchGlossary(gloss);

  upsertVidaPoem(vida, {
    id: 'deus',
    slug: 'deus',
    title: 'Deus',
    titleEn: 'Deus',
    titleEs: 'Deus',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'Uma sílaba — o vocábulo do céu latino; a ficha não escolhe a fé.',
    teaserEn: 'One syllable — the Latin-sky vocable; the sheet does not choose faith.',
    teaserEs: 'Una sílaba — el vocablo del cielo latino; la ficha no elige la fe.',
    body: poemDeusPt(),
    bodyEn: poemDeusEn(),
    bodyEs: poemDeusEs(),
    inspectionHref: H.deus,
    tags: ['poesia', 'vida', 'deus', 'respeito']
  });
  upsertVidaPoem(vida, {
    id: 'a-deus',
    slug: 'a-deus',
    title: 'A Deus!!!',
    titleEn: 'A Deus!!!',
    titleEs: '¡A Deus!!!',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'a + Deus — encomendar e sair; o grito ainda parte a fórmula.',
    teaserEn: 'a + Deus — commend and leave; the shout still splits the formula.',
    teaserEs: 'a + Deus — encomendar y salir; el grito aún parte la fórmula.',
    body: poemAdeusPt(),
    bodyEn: poemAdeusEn(),
    bodyEs: poemAdeusEs(),
    inspectionHref: H.adeus,
    tags: ['poesia', 'vida', 'adeus', 'despedida']
  });
  upsertVidaPoem(vida, {
    id: 'fui',
    slug: 'fui',
    title: 'Fui',
    titleEn: 'Fui',
    titleEs: 'Fui',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'Uma forma, dois verbos; na rua, a porta. Valeu !!!',
    teaserEn: 'One form, two verbs; in the street, the door. Valeu !!!',
    teaserEs: 'Una forma, dos verbos; en la calle, la puerta. ¡Valeu !!!',
    body: poemFuiPt(),
    bodyEn: poemFuiEn(),
    bodyEs: poemFuiEs(),
    inspectionHref: H.fui,
    tags: ['poesia', 'vida', 'fui', 'saida']
  });

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  await writeJsonRetry(GLOSS_FILE, gloss);
  await writeJsonRetry(VIDA_FILE, vida);

  console.log('OK cluster Deus → A Deus!!! → fui', '| Cap.', deus.seriesOrder, adeus.seriesOrder, fui.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
