'use strict';

/**
 * Injeta a expressão «mindinho» (parlenda + cola mundinho/mudinho).
 * Uso: node scripts/upsert-expressao-mindinho.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildMindinhoPost } = require('../lib/mindinho-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-mindinho.html';

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
  const sugId = 'expressao-mindinho';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'mindinho — parlenda dos cinco, mundinho e mudinho',
    titleEn: 'mindinho — five-finger rhyme, mundinho and mudinho',
    titleEs: 'mindinho — rima de los cinco, mundinho y mudinho',
    tipo: 'expressao',
    priority: 2,
    status: 'feita',
    why: 'Expressões: mindinho (minutínu) — parlenda da mão; mundinho≠mudinho; ≠ pé; Valeu !!!',
    whyEn: 'Sayings: mindinho (minutínu) — hand rhyme; mundinho≠mudinho; ≠ toe; Valeu !!!',
    whyEs: 'Dichos: mindinho (minutínu) — rima de la mano; mundinho≠mudinho; ≠ pie; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'expressoes-ditados',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/mundo',
      'https://pt.wiktionary.org/wiki/mudo',
      'https://ciberduvidas.iscte-iul.pt/consultorio/perguntas/os-nomes-dos-dedos-da-mao-em-linguagem-popular-de-portugal/28959',
      '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html',
      '/posts/post-inspecao-palavra-mao-esquerda-direita.html',
      '/posts/post-inspecao-palavra-mudinha.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — parlenda; cola mundinho/mudinho; gatilho pé/escada separado.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entries = [
    {
      id: 'mindinho',
      word: 'mindinho',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Lat. minutínu / miúdo — dedo mínimo da mão; parlenda dos cinco; ≠ mundinho ≠ mudinho ≠ pé; Valeu !!!',
      simpleEn:
        'Lat. minutínu / tiny — little finger; five-name rhyme; ≠ mundinho ≠ mudinho ≠ toe; Valeu !!!',
      simpleEs:
        'Lat. minutínu / menudo — meñique; rima de los cinco; ≠ mundinho ≠ mudinho ≠ pie; ¡Valeu !!!',
      history:
        'Mindinho vem do latim minutínu, de minūtus (miúdo). A parlenda conta: mindinho, seu vizinho, pai de todos, fura-bolo, mata-piolho.',
      curiosities:
        'A orelha cola mundinho (mundo pequeno) e mudinho (lapso / mudo / cola da mudinha). A parlenda é da mão; o contato com a escada foi no pé.',
      historyEn:
        'Portuguese mindinho comes from Latin minutínu, from minūtus (“tiny”). The rhyme counts: pinky, neighbour, father of all, cake-poker, louse-killer.',
      curiositiesEn:
        'The ear glues mundinho (little world) and mudinho (slip / mute / seedling glue). The rhyme is the hand; the ladder contact was the foot.',
      historyEs:
        'Mindinho viene del latín minutínu, de minūtus (menudo). La rima cuenta: meñique, vecino, padre de todos, fura-bolo, mata-piolho.',
      curiositiesEs:
        'La oreja pega mundinho (mundo chico) y mudinho (lapsus / mudo / cola de mudinha). La rima es de la mano; el contacto con la escalera fue en el pie.'
    },
    {
      id: 'mundinho',
      word: 'mundinho',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Diminutivo de mundo (lat. mundus) — o mundo pequeno; cola de orelha com mindinho; Valeu !!!',
      simpleEn:
        'Diminutive of mundo (Lat. mundus) — little world; ear-glue with mindinho; Valeu !!!',
      simpleEs:
        'Diminutivo de mundo (lat. mundus) — mundo chico; cola de oreja con mindinho; ¡Valeu !!!',
      history:
        'Mundo vem do latim mundus. O -inho faz o grau diminuto. Não é o dedo mindinho: guarda o n do mundo, não o n do miúdo.',
      curiosities:
        'Pedido de campo: relacionar mindinho com Mundinho. Relacionar ≠ fundir. Ver parlenda mindinho.',
      historyEn:
        'Portuguese mundo comes from Latin mundus. The -inho is the diminutive. It is not the pinky: it keeps the n of mundo, not the n of miúdo.',
      curiositiesEn:
        'Field request: relate mindinho to Mundinho. Relating ≠ fusing. See the mindinho rhyme.',
      historyEs:
        'Mundo viene del latín mundus. El -inho hace el grado diminuto. No es el meñique: guarda la n de mundo, no la n de miúdo.',
      curiositiesEs:
        'Pedido de campo: relacionar mindinho con Mundinho. Relacionar ≠ fundir. Ver la rima mindinho.'
    },
    {
      id: 'mudinho',
      word: 'mudinho',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Lapso de mindinho, ou diminutivo de mudo, ou cola da mudinha — três salas; Valeu !!!',
      simpleEn:
        'Slip of mindinho, or diminutive of mudo, or glue with mudinha — three rooms; Valeu !!!',
      simpleEs:
        'Lapsus de mindinho, o diminutivo de mudo, o cola de mudinha — tres salas; ¡Valeu !!!',
      history:
        'Perde o n de mindinho / mundinho. Pode ser orelha, mutus (mudo) ou a planta jovem (mudinha) — o étimo decide a sala.',
      curiosities:
        'Pedido: ou Mudinho. Não é a ficha da mudinha (planta). Não é o mundinho. Não é o dedo, salvo como lapso.',
      historyEn:
        'It drops the n of mindinho / mundinho. It may be ear, mutus (mute), or the seedling (mudinha) — etymology picks the room.',
      curiositiesEn:
        'Request: or Mudinho. Not the mudinha (seedling) sheet. Not mundinho. Not the finger, except as a slip.',
      historyEs:
        'Pierde la n de mindinho / mundinho. Puede ser oído, mutus (mudo) o la plantita (mudinha) — el étimo elige la sala.',
      curiositiesEs:
        'Pedido: o Mudinho. No es la ficha de mudinha (planta). No es mundinho. No es el dedo, salvo como lapsus.'
    }
  ];
  for (const entry of entries.slice().reverse()) {
    const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'gesto');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-mindinho-cover.js')], {
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

  const post = stampFiles(buildMindinhoPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia);

  if (gloss) {
    gloss = patchGlossary(
      gloss,
      'mindinho',
      '    mindinho: { tone: "warm", category: "Parlenda", mundane: "O mais miúdo da mão; também o primeiro nome da lengalenga dos cinco dedos.", gloss: "Lat. minutínu / miúdo — parlenda da mão; ≠ mundinho ≠ mudinho ≠ pé; Valeu !!!", href: "' +
        HREF +
        '", en: "little finger / pinky", es: "meñique", fr: "auriculaire", it: "mignolo", de: "kleiner Finger", el: "μικρό δάχτυλο", la: "minutinu / digitus minimus", yo: "ika kekere", sw: "kidole kidogo", gez: "ʾaṣäʿə ṣəḥin", nl: "pink", pl: "mały palec", ru: "мизинец", uk: "мізинець", zh: "小指", ja: "小指", ko: "새끼손가락", ar: "خنصر", he: "זרת", hi: "कनिष्ठा", tr: "serçe parmak", sv: "lillfinger", da: "lillefinger", no: "lillefinger", fi: "pikkusormi", cs: "malíček", ro: "degetul mic", hu: "kisujj", ca: "dit petit", gl: "mindinho", eu: "hatz txiki", gn: "kuã\'i", qu: "ujlla maki ruru", eo: "eta fingro", vi: "ngón út", id: "kelingking", th: "นิ้วก้อย", hr: "mali prst", sk: "malíček", ga: "lúidín", cy: "bys bach", ha: "dan yatsa", am: "ትንሽ ጣት", fa: "انگشت کوچک", bn: "কনিষ্ঠা", zu: "umunwe omncane" },\n',
      '    mundinho: { tone: "caution", category: "Cola", mundane: "Diminutivo de mundo — o mundo pequeno.", gloss: "Lat. mundus + -inho — ≠ mindinho (dedo) ≠ mudinho; a orelha cola; Valeu !!!", href: "' +
        HREF +
        '", en: "little world", es: "mundito" },\n' +
        '    mudinho: { tone: "caution", category: "Lapso", mundane: "Sopro colado — pode ser mindinho sem n, mudo, ou cola da mudinha.", gloss: "Três salas: lapso / mutus / mudinha; ≠ o dedo salvo como orelha; Valeu !!!", href: "' +
        HREF +
        '", en: "slip / little mute", es: "lapsus / mudito" },\n' +
        '    "seu vizinho": { gloss: "Anelar na parlenda — mora ao lado do mindinho; lapso vizinhio.", href: "' +
        HREF +
        '", en: "ring finger (rhyme: neighbour)", es: "anular (rima: vecino)" },\n' +
        '    vizinhio: { gloss: "Lapso de vizinho — ver mindinho / seu vizinho.", href: "' +
        HREF +
        '", en: "slip for vizinho", es: "lapsus de vizinho" },\n' +
        '    "pai de todos": { gloss: "Dedo médio na parlenda — o maior; ≠ Pai teológico; ver mindinho.", href: "' +
        HREF +
        '", en: "middle finger (rhyme: father of all)", es: "dedo medio (rima: padre de todos)" },\n' +
        '    "fura-bolo": { gloss: "Indicador na parlenda — o que fura o bolo; ver mindinho.", href: "' +
        HREF +
        '", en: "index finger (rhyme: cake-poker)", es: "índice (rima: fura-bolo)" },\n' +
        '    "mata-piolho": { gloss: "Polegar na parlenda — também cata-piolho; lapso Mat Piolho; ver mindinho.", href: "' +
        HREF +
        '", en: "thumb (rhyme: louse-killer)", es: "pulgar (rima: mata-piolho)" },\n' +
        '    minguinho: { gloss: "Variante de mindinho (mínimo + -inho); mesma sala; ver mindinho.", href: "' +
        HREF +
        '", en: "variant of mindinho", es: "variante de mindinho" },\n',
      'gesto'
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
    console.log('Glossário actualizado (mindinho)');
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
