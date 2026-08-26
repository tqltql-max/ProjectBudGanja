'use strict';

/**
 * Injeta expressão «fim da linha» (fita × vida × confeito chocolate).
 * Uso: node scripts/upsert-expressao-fim-da-linha.js
 */

const fs = require('fs');
const path = require('path');
const { buildFimDaLinhaPost } = require('../lib/fim-da-linha-inspecao-post.js');

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

function nextFreeSeriesOrder(posts, preferred, selfSlug) {
  const taken = new Set(
    posts
      .filter((p) => p.slug !== selfSlug && p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder))
      .filter((n) => Number.isFinite(n) && n > 0)
  );
  let n = preferred;
  while (taken.has(n)) n += 1;
  return n;
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
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const draft = buildFimDaLinhaPost();
  const free = nextFreeSeriesOrder(posts, draft.seriesOrder, draft.slug);
  const post = free !== draft.seriesOrder ? buildFimDaLinhaPost(free) : draft;

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-fim-da-linha';
    const si = items.findIndex(
      (x) =>
        x.id === sugId || /fim da linha/i.test(String(x.title || ''))
    );
    const entry = {
      id: sugId,
      title: 'fim da linha — fita, vida e confeito de chocolate',
      titleEn: 'end of the line — tape, life and candy-coated chocolate',
      titleEs: 'fin de la línea — cinta, vida y confite de chocolate',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: fim da linha — limite da fita, da vida e da esteira; caso M&M\'s (casca=fita, núcleo=vida); elos cinta, vida, chocolate.',
      whyEn: 'Sayings: fim da linha — tape, life and factory belt; M&M\'s-format case; links cinta, vida, chocolate.',
      whyEs: 'Dichos: fim da linha — cinta, vida y línea de fábrica; caso formato M&M\'s; vínculos cinta, vida, chocolate.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-palavra-cinta.html',
        '/posts/post-inspecao-palavra-vida.html',
        '/posts/post-inspecao-derivado-chocolate.html',
        '/posts/post-inspecao-palavra-valeu.html',
        '/vida/'
      ],
      notes:
        'Cap. Expressões — locução fim da linha; caso de laboratório = confeito casca+chocolate; sem afiliação Mars/M&M\'s.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-fim-da-linha)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'fim-da-linha',
      word: 'fim da linha',
      simple:
        'Expressão — limite da fita, da vida e da esteira; caso lab = confeito casca colorida + chocolate (formato M&M\'s); depois Valeu !!!',
      simpleEn:
        'Saying — limit of the tape, of life and of the belt; lab case = colored shell + chocolate (M&M\'s format); then Valeu !!!',
      simpleEs:
        'Expresión — límite de la cinta, de la vida y de la línea; caso lab = cáscara de color + chocolate (formato M&M\'s); luego ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'faca-o-melhor' ||
          x.id === 'cinta' ||
          x.id === 'chocolate'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (fim da linha)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entry = `    "fim da linha": { tone: "caution", category: "Limite", mundane: "Última paragem; esgotar opções.", gloss: "Limite da fita, da vida e da esteira; caso lab = casca colorida + chocolate (formato M&M's); depois Valeu !!!", href: "${href}", en: "end of the line", es: "fin de la línea", fr: "fin de la ligne", it: "fine della linea", de: "Ende der Linie", el: "τέλος της γραμμής", la: "finis lineae", yo: "òpin ìlà", sw: "mwisho wa mstari", gez: "č̣erä mänger", nl: "einde van de lijn", pl: "koniec linii", ru: "конец линии", uk: "кінець лінії", zh: "终点", ja: "路線の終点", ko: "노선의 끝", ar: "نهاية الخط", he: "סוף הקו", hi: "लाइन का अंत", tr: "hattın sonu", sv: "linjens slut", da: "end of the line", no: "end of the line", fi: "linjan pää", cs: "konec linky", ro: "capăt de linie", hu: "a vonal vége", ca: "final de línia", gl: "fin da liña", eu: "lerroaren amaiera", gn: "línea paha", qu: "siq'i puchukay", eo: "fino de linio", vi: "cuối tuyến", id: "ujung jalur", th: "สุดสาย", hr: "kraj linije", sk: "koniec linky", ga: "deireadh na líne", cy: "diwedd y llinell", ha: "karshen layi", am: "የመስመር መጨረሻ", fa: "پایان خط", bn: "লাইনের শেষ", zu: "ukuphela komugqa" },`;
    const aliasFita = `    fita: { gloss: "Tira / fita cassete / casca que envolve — vizinha de cinta; elo da expressão «fim da linha».", href: "/posts/post-inspecao-palavra-cinta.html", en: "tape / ribbon", es: "cinta / fita", fr: "ruban / bande", it: "nastro", de: "Band / Klebeband", el: "ταινία", la: "taenia", yo: "téèpù", sw: "tepi", gez: "šerit", nl: "tape", pl: "taśma", ru: "лента", uk: "стрічка", zh: "胶带", ja: "テープ", ko: "테이프", ar: "شريط", he: "סרט", hi: "टेप", tr: "bant", sv: "tejp", da: "tape", no: "teip", fi: "teippi", cs: "páska", ro: "bandă", hu: "szalag", ca: "cinta", gl: "fita", eu: "zinta", gn: "fita", qu: "watu", eo: "bendo", vi: "băng keo", id: "pita", th: "เทป", hr: "traka", sk: "páska", ga: "téip", cy: "tâp", ha: "tef", am: "ቴፕ", fa: "نوار", bn: "টেপ", zu: "ithephu" },`;
    const aliasMms = `    "m&ms": { gloss: "Formato de confeito (casca colorida + chocolate) — caso lab de «fim da linha»; sem afiliação de marca.", href: "${href}", en: "candy-coated chocolate (format)", es: "confite con cáscara (formato)", fr: "dragée chocolat (format)" },`;

    if (/"fim da linha":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    "fim da linha":\s*\{[\s\S]*?\},/, entry);
      console.log('Glossário: fim da linha actualizado');
    } else {
      const re = /(cinta: \{[\s\S]*?\},)/;
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1\n' + entry);
        console.log('Glossário: fim da linha após cinta');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
      }
    }
    if (/    fita: \{/.test(gloss)) {
      gloss = gloss.replace(/    fita: \{[\s\S]*?\},/, aliasFita);
      console.log('Glossário: fita actualizado');
    } else if (/"fim da linha":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/("fim da linha":\s*\{[\s\S]*?\},)/, '$1\n' + aliasFita);
      console.log('Glossário: fita inserido');
    }
    if (/"m&ms":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    "m&ms":\s*\{[\s\S]*?\},/, aliasMms);
      console.log('Glossário: m&ms actualizado');
    } else if (/    fita: \{/.test(gloss)) {
      gloss = gloss.replace(/(    fita: \{[\s\S]*?\},)/, '$1\n' + aliasMms);
      console.log('Glossário: m&ms inserido');
    }
    fs.writeFileSync(glossPath, gloss);
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
