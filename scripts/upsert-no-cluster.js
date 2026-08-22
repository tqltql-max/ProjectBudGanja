'use strict';

/**
 * Injeta o cluster Nó / Corda / Desatar / Desastre / Ufa
 * + expressões nó na vida! e desatar o nó
 * + animal Codorna + cartão Objetos (Corda).
 * Uso: node scripts/upsert-no-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { buildNoPost } = require('../lib/no-inspecao-post.js');
const { buildCordaPost } = require('../lib/corda-inspecao-post.js');
const { buildDesatarPost } = require('../lib/desatar-inspecao-post.js');
const { buildDesastrePost } = require('../lib/desastre-inspecao-post.js');
const { buildUfaPost } = require('../lib/ufa-inspecao-post.js');
const { buildNoNaVidaPost } = require('../lib/no-na-vida-inspecao-post.js');
const { buildDesatarONoPost } = require('../lib/desatar-o-no-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const ANIMAIS_FILE = path.join(ROOT, 'content', 'animais.json');
const ANIMAIS_I18N = path.join(ROOT, 'content', 'animais-i18n.json');
const OBJETOS_FILE = path.join(ROOT, 'objetos', 'index.html');

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

function nextFree(posts, preferred, selfSlug, series) {
  const taken = new Set(
    posts
      .filter((p) => p.slug !== selfSlug && (!series || p.series === series))
      .map((p) => Number(p.seriesOrder))
      .filter((n) => Number.isFinite(n) && n > 0)
  );
  let n = preferred;
  while (taken.has(n)) n += 1;
  return n;
}

async function syncSql(built) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  built.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', built.length, 'posts');
}

function upsertSug(sug, cfg) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const si = items.findIndex((x) => x.id === cfg.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], cfg);
  else items.push(cfg);
  sug.items = items;
}

function upsertGuia(guia, entry, afterIds) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => afterIds.indexOf(x.id) >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

function replaceOrInsertGloss(gloss, key, line, afterKey) {
  const keyRe = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'
  );
  if (keyRe.test(gloss)) {
    return gloss.replace(keyRe, line.trimEnd().replace(/,$/, '') + ',');
  }
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},)'
  );
  if (afterRe.test(gloss)) {
    return gloss.replace(afterRe, '$1\n' + line);
  }
  console.warn('Aviso glossário: sem ponto para', key);
  return gloss;
}

const CODORNA = {
  id: 'codorna',
  slug: 'codorna',
  nomePopular: 'Codorna',
  nomeCientifico: 'Coturnix japonica',
  familia: 'Phasianidae',
  hubCategory: 'producao',
  summary:
    'Ave de criação (codorna-japonesa): ovos pequenos e carne; vizinha lexical da corda — o ouvido cola, o étimo não (Coturnix ≠ chorda).',
  partsUsed: ['Ovo', 'Carne'],
  traditionalUses: [
    'Ovos de codorna na mesa BR',
    'Criação familiar e coturnicultura',
    'Carne fresca em dose pequena'
  ],
  cautions:
    'Conteúdo educacional — não é protocolo de coturnicultura nem nutricional. Distinguir a ave da palavra corda (fio). O animal não é o vilão; o desvio industrial, quando houver, pede ficha de derivado.',
  tags: ['producao', 'aves', 'ovos', 'alimento'],
  relatedUnifesp: false,
  cover: '/imagens/inspecoes/codorna-animal-cover.jpg',
  relatedInspections: [
    {
      href: '/posts/post-inspecao-palavra-corda.html',
      label: 'Inspeção: Corda — o objecto onde mora o nó',
      labelEn: 'Inspection: Corda — the object where the knot lives',
      labelEs: 'Inspección: Corda — el objeto donde vive el nudo'
    },
    {
      href: '/posts/post-inspecao-palavra-no.html',
      label: 'Inspeção: Nó — o laço na corda',
      labelEn: 'Inspection: Nó — the knot on the rope',
      labelEs: 'Inspección: Nó — el nudo en la cuerda'
    },
    {
      href: '/posts/post-inspecao-animal-galinha.html',
      label: 'Inspeção: Produção animal — Galinha',
      labelEn: 'Inspection: Animal production — Chicken',
      labelEs: 'Inspección: Producción animal — Gallina'
    }
  ]
};

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  const noOrder = nextFree(posts, 174, 'inspecao-palavra-no', 'palavras-origem');
  const cordaOrder = nextFree(posts, 175, 'inspecao-palavra-corda', 'palavras-origem');
  const desatarOrder = nextFree(posts, 176, 'inspecao-palavra-desatar', 'palavras-origem');
  const desastreOrder = nextFree(posts, 177, 'inspecao-palavra-desastre', 'palavras-origem');
  const ufaOrder = nextFree(posts, 178, 'inspecao-palavra-ufa', 'palavras-origem');
  const noVidaOrder = nextFree(posts, 19, 'inspecao-expressao-no-na-vida', 'expressoes-ditados');
  const desatarNoOrder = nextFree(posts, 20, 'inspecao-expressao-desatar-o-no', 'expressoes-ditados');

  const built = [
    buildNoPost(noOrder),
    buildCordaPost(cordaOrder),
    buildDesatarPost(desatarOrder),
    buildDesastrePost(desastreOrder),
    buildUfaPost(ufaOrder),
    buildNoNaVidaPost(noVidaOrder),
    buildDesatarONoPost(desatarNoOrder)
  ];

  built.forEach((post) => {
    upsertPost(posts, post);
    writeHtml(post);
  });
  await writeJsonRetry(POSTS_FILE, posts);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    upsertSug(sug, {
      id: 'palavra-no',
      title: 'Nó — o laço na corda, antes de desatar',
      titleEn: 'Nó — the knot on the rope, before untying',
      titleEs: 'Nó — el nudo en la cuerda, antes de desatar',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: nó (nodus) — laço na corda e na vida; ≠ corda ≠ codorna; elos desatar/desastre/ufa.',
      suggestedSlug: 'inspecao-palavra-no',
      doneHref: '/posts/post-inspecao-palavra-no.html',
      seriesHint: 'palavras-origem',
      sources: [
        '/posts/post-inspecao-palavra-corda.html',
        '/posts/post-inspecao-expressao-no-na-vida.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cluster nó/corda/desatar/desastre/ufa/codorna.'
    });
    upsertSug(sug, {
      id: 'palavra-corda',
      title: 'Corda — o objecto onde mora o nó',
      titleEn: 'Corda — the object where the knot lives',
      titleEs: 'Corda — el objeto donde vive el nudo',
      tipo: 'objeto',
      priority: 2,
      status: 'feita',
      why: 'Objecto: corda (chorda) — fio do nó; ≠ cinta ≠ codorna; catálogo Objetos.',
      suggestedSlug: 'inspecao-palavra-corda',
      doneHref: '/posts/post-inspecao-palavra-corda.html',
      seriesHint: 'palavras-origem',
      sources: ['/objetos/', '/posts/post-inspecao-palavra-no.html'],
      notes: 'Cartão em /objetos/.'
    });
    upsertSug(sug, {
      id: 'palavra-desatar',
      title: 'Desatar — soltar o nó, sem virar desastre',
      titleEn: 'Desatar — untie the knot, without turning it into disaster',
      titleEs: 'Desatar — soltar el nudo, sin volverse desastre',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: desatar (des-+atar); ≠ desastre; ditado desatar o nó.',
      suggestedSlug: 'inspecao-palavra-desatar',
      doneHref: '/posts/post-inspecao-palavra-desatar.html',
      seriesHint: 'palavras-origem',
      sources: ['/posts/post-inspecao-expressao-desatar-o-no.html'],
      notes: 'Verbo do cluster.'
    });
    upsertSug(sug, {
      id: 'palavra-desastre',
      title: 'Desastre — má estrela, não é desatar o nó',
      titleEn: 'Desastre — ill-starred, not untying the knot',
      titleEs: 'Desastre — mala estrella, no es desatar el nudo',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: desastre (dis+astrum); ≠ desatar; relação de ofício com desatar o nó.',
      suggestedSlug: 'inspecao-palavra-desastre',
      doneHref: '/posts/post-inspecao-palavra-desastre.html',
      seriesHint: 'palavras-origem',
      sources: ['/posts/post-inspecao-expressao-desatar-o-no.html'],
      notes: 'Étimo astro; ofício com o ditado.'
    });
    upsertSug(sug, {
      id: 'palavra-ufa',
      title: 'Ufa — o sopro depois de desatar o nó',
      titleEn: 'Ufa — the puff after untying the knot',
      titleEs: 'Ufa — el soplo después de desatar el nudo',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: ufa — alívio BR; par de aff; fecho de desatar o nó; legal (gíria).',
      suggestedSlug: 'inspecao-palavra-ufa',
      doneHref: '/posts/post-inspecao-palavra-ufa.html',
      seriesHint: 'palavras-origem',
      sources: ['/posts/post-inspecao-palavra-aff.html', '/posts/post-inspecao-palavra-legal.html'],
      notes: 'Interjeição de alívio.'
    });
    upsertSug(sug, {
      id: 'expressao-no-na-vida',
      title: 'nó na vida! — o laço no arco',
      titleEn: 'nó na vida! — the knot in the arc',
      titleEs: 'nó na vida! — el nudo en el arco',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: nó na vida! — laço no arco; par desatar o nó; ≠ desastre.',
      suggestedSlug: 'inspecao-expressao-no-na-vida',
      doneHref: '/posts/post-inspecao-expressao-no-na-vida.html',
      seriesHint: 'expressoes-ditados',
      sources: ['/posts/post-inspecao-palavra-vida.html'],
      notes: 'Ditado do cluster.'
    });
    upsertSug(sug, {
      id: 'expressao-desatar-o-no',
      title: 'desatar o nó — o ofício, não o desastre',
      titleEn: 'desatar o nó — the craft, not the disaster',
      titleEs: 'desatar o nó — el oficio, no el desastre',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: desatar o nó — soltar o laço; ≠ desastre; ufa depois.',
      suggestedSlug: 'inspecao-expressao-desatar-o-no',
      doneHref: '/posts/post-inspecao-expressao-desatar-o-no.html',
      seriesHint: 'expressoes-ditados',
      sources: ['/posts/post-inspecao-palavra-desastre.html'],
      notes: 'Ditado-mãe do ofício.'
    });
    upsertSug(sug, {
      id: 'animal-codorna',
      title: 'Codorna — ave, não é a corda',
      titleEn: 'Codorna — quail, not the rope',
      titleEs: 'Codorna — codorniz, no es la cuerda',
      tipo: 'animal',
      priority: 2,
      status: 'feita',
      why: 'Animais: codorna (Coturnix japonica) — produção; ≠ corda (chorda); elos galinha/nó.',
      suggestedSlug: 'inspecao-animal-codorna',
      doneHref: '/posts/post-inspecao-animal-codorna.html',
      seriesHint: 'animais-producao',
      sources: ['/animais/codorna/', '/posts/post-inspecao-palavra-corda.html'],
      notes: 'Catálogo /animais/ + inspeção gerada.'
    });
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (cluster nó)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    upsertGuia(
      guia,
      {
        id: 'no',
        word: 'nó',
        simple: 'Lat. nodus — laço na corda e na vida; ≠ corda ≠ codorna; elos desatar / desastre / ufa.',
        simpleEn: 'Lat. nodus — knot on the rope and in life; ≠ rope ≠ quail.',
        simpleEs: 'Lat. nodus — nudo en la cuerda y en la vida; ≠ cuerda ≠ codorniz.',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-palavra-no.html'
      },
      ['vida', 'cinta']
    );
    upsertGuia(
      guia,
      {
        id: 'corda',
        word: 'corda',
        simple: 'Lat. chorda — fio-objecto do nó; ≠ cinta ≠ codorna; catálogo Objetos.',
        simpleEn: 'Lat. chorda — rope-object of the knot; ≠ tape ≠ quail.',
        simpleEs: 'Lat. chorda — cuerda-objeto del nudo; ≠ cinta ≠ codorniz.',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-palavra-corda.html'
      },
      ['no', 'cinta']
    );
    upsertGuia(
      guia,
      {
        id: 'desatar',
        word: 'desatar',
        simple: 'des- + atar — soltar o nó; ≠ desastre (astro); ditado desatar o nó.',
        simpleEn: 'des- + atar — untie the knot; ≠ disaster (star).',
        simpleEs: 'des- + atar — soltar el nudo; ≠ desastre (astro).',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-palavra-desatar.html'
      },
      ['no', 'corda']
    );
    upsertGuia(
      guia,
      {
        id: 'desastre',
        word: 'desastre',
        simple: 'dis- + astrum — má estrela; ≠ desatar; ofício com desatar o nó.',
        simpleEn: 'dis- + astrum — ill-starred; ≠ untying; craft with untying the knot.',
        simpleEs: 'dis- + astrum — mala estrella; ≠ desatar; oficio con desatar o nó.',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-palavra-desastre.html'
      },
      ['desatar']
    );
    upsertGuia(
      guia,
      {
        id: 'ufa',
        word: 'ufa',
        simple: 'Interjeição BR de alívio; par de aff; depois de desatar o nó; legal (gíria) se couber.',
        simpleEn: 'BR phew of relief; pair of aff; after untying the knot.',
        simpleEs: 'Interjección BR de alivio; par de aff; después de desatar o nó.',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-palavra-ufa.html'
      },
      ['aff', 'desatar']
    );
    upsertGuia(
      guia,
      {
        id: 'no-na-vida',
        word: 'nó na vida',
        simple: 'Expressão — laço no arco da vida; par desatar o nó; ainda não é desastre.',
        simpleEn: 'Saying — knot in the arc of life; pair untying the knot.',
        simpleEs: 'Expresión — nudo en el arco de la vida; par desatar o nó.',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-expressao-no-na-vida.html'
      },
      ['no', 'vida']
    );
    upsertGuia(
      guia,
      {
        id: 'desatar-o-no',
        word: 'desatar o nó',
        simple: 'Expressão — soltar o laço; o ofício, não o desastre; ufa depois.',
        simpleEn: 'Saying — untie the knot; the craft, not the disaster.',
        simpleEs: 'Expresión — soltar el nudo; el oficio, no el desastre.',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-expressao-desatar-o-no.html'
      },
      ['desatar', 'no-na-vida']
    );
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (cluster nó)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = replaceOrInsertGloss(
      gloss,
      'nó',
      '    nó: { tone: "craft", gloss: "Lat. nodus — laço na corda e na vida; ≠ corda ≠ codorna; elos desatar/desastre/ufa; Faça o melhor!", href: "/posts/post-inspecao-palavra-no.html", en: "knot", es: "nudo", fr: "nœud", it: "nodo", de: "Knoten", el: "κόμπος", la: "nodus", yo: "ìdì", sw: "fundo", gez: "məʕəqqəb", nl: "knoop", pl: "węzeł", ru: "узел", uk: "вузол", zh: "结", ja: "結び目", ko: "매듭", ar: "عقدة", he: "קשר", hi: "गाँठ", tr: "düğüm", sv: "knut", da: "knude", no: "knute", fi: "solmu", cs: "uzel", ro: "nod", hu: "csomó", ca: "nus", gl: "nó", eu: "korapilo", gn: "ñokã", qu: "k\'intu", eo: "nodo", vi: "nut", id: "simpul", th: "ปม", hr: "čvor", sk: "uzol", ga: "snaidhm", cy: "cwlwm", ha: "kulli", am: "ቋንጣ", fa: "گره", bn: "গ্রন্থি", zu: "ifindo" },',
      'vida'
    );
    gloss = replaceOrInsertGloss(
      gloss,
      'no',
      '    no: { gloss: "Grafia sem acento de nó — laço; ver ficha nó.", href: "/posts/post-inspecao-palavra-no.html", en: "knot", es: "nudo" },',
      'nó'
    );
    gloss = replaceOrInsertGloss(
      gloss,
      'corda',
      '    corda: { tone: "craft", category: "Objecto", mundane: "Fio / cabo para atar.", gloss: "Lat. chorda — objecto onde mora o nó; ≠ cinta ≠ codorna; Faça o melhor!", href: "/posts/post-inspecao-palavra-corda.html", en: "rope / cord", es: "cuerda", fr: "corde", it: "corda", de: "Seil", el: "σκοινί", la: "chorda", yo: "okùn", sw: "kamba", gez: "ḥabl", nl: "touw", pl: "lina", ru: "верёвка", uk: "мотузка", zh: "绳子", ja: "ロープ", ko: "밧줄", ar: "حبل", he: "חבל", hi: "रस्सी", tr: "ip", sv: "rep", da: "reb", no: "tau", fi: "köysi", cs: "lano", ro: "funie", hu: "kötél", ca: "corda", gl: "corda", eu: "soka", gn: "soga", qu: "watu", eo: "ŝnuro", vi: "day", id: "tali", th: "เชือก", hr: "uže", sk: "lano", ga: "téad", cy: "rhaff", ha: "igiya", am: "ገመድ", fa: "طناب", bn: "দড়ি", zu: "intambo" },',
      'cinta'
    );
    gloss = replaceOrInsertGloss(
      gloss,
      'desatar',
      '    desatar: { tone: "craft", gloss: "des- + atar — soltar o nó; ≠ desastre (astro); ditado desatar o nó; Faça o melhor!", href: "/posts/post-inspecao-palavra-desatar.html", en: "untie / unbind", es: "desatar", fr: "détacher", it: "sciogliere", de: "lösen", el: "λύνω", la: "solvere", yo: "tú", sw: "fungua", gez: "fäthätä", nl: "losmaken", pl: "rozwiązać", ru: "развязать", uk: "розв\'язати", zh: "解开", ja: "ほどく", ko: "풀다", ar: "فك", he: "להתיר", hi: "खोलना", tr: "çözmek", sv: "lösa upp", da: "binde op", no: "løsne", fi: "avata", cs: "rozvázat", ro: "dezlega", hu: "kiold", ca: "deslligar", gl: "desatar", eu: "askatu", gn: "pe\'a", qu: "paskay", eo: "malligi", vi: "co", id: "lepas", th: "แก้", hr: "odvezati", sk: "rozviazať", ga: "scaoil", cy: "datod", ha: "kwance", am: "ፍታ", fa: "باز کردن", bn: "খোলা", zu: "khumula" },',
      'corda'
    );
    gloss = replaceOrInsertGloss(
      gloss,
      'desastre',
      '    desastre: { tone: "caution", category: "Golpe", mundane: "Catástrofe; acontecimento grave.", gloss: "dis- + astrum — má estrela; ≠ desatar; ofício com desatar o nó; Faça o melhor!", href: "/posts/post-inspecao-palavra-desastre.html", en: "disaster", es: "desastre", fr: "désastre", it: "disastro", de: "Katastrophe", el: "καταστροφή", la: "clades", yo: "ajalu", sw: "maafa", gez: "ṭəfʾat", nl: "ramp", pl: "katastrofa", ru: "бедствие", uk: "лихо", zh: "灾难", ja: "災害", ko: "재난", ar: "كارثة", he: "אסון", hi: "आपदा", tr: "felaket", sv: "katastrof", da: "katastrofe", no: "katastrofe", fi: "katastrofi", cs: "katastrofa", ro: "dezastru", hu: "katasztrófa", ca: "desastre", gl: "desastre", eu: "hondamendi", gn: "vai", qu: "llaki", eo: "katastrofo", vi: "tham hoa", id: "bencana", th: "ภัยพิบัติ", hr: "katastrofa", sk: "katastrofa", ga: "tubaiste", cy: "trychineb", ha: "bala\'i", am: "አደጋ", fa: "فاجعه", bn: "বিপর্যয়", zu: "inhlekelele" },',
      'desatar'
    );
    gloss = replaceOrInsertGloss(
      gloss,
      'ufa',
      '    ufa: { tone: "craft", category: "Alívio", mundane: "Sopro de alívio ou cansaço (interjeição BR).", gloss: "Alívio depois de desatar o nó; par de aff (exasperação); legal (gíria) se couber; Faça o melhor!", href: "/posts/post-inspecao-palavra-ufa.html", en: "phew", es: "uf", fr: "ouf", it: "uffa", de: "uff", el: "αχ", la: "vah", yo: "yè", sw: "ahh", gez: "ʼǝff", nl: "foei", pl: "uff", ru: "ух", uk: "ух", zh: "呼", ja: "ふう", ko: "휴", ar: "أف", he: "אוף", hi: "उफ़", tr: "of", sv: "uff", da: "puha", no: "uff", fi: "huh", cs: "uff", ro: "uf", hu: "huh", ca: "uf", gl: "uf", eu: "uf", gn: "ái", qu: "alalaw", eo: "hu", vi: "phù", id: "huh", th: "เฮ้อ", hr: "uh", sk: "uf", ga: "och", cy: "och", ha: "kai", am: "ኧኝ", fa: "اوخ", bn: "উফ", zu: "hawu" },',
      'aff'
    );
    gloss = replaceOrInsertGloss(
      gloss,
      '"nó na vida"',
      '    "nó na vida": { tone: "caution", category: "Aperto", mundane: "Situação emaranhada; aperto no arco da vida.", gloss: "Expressão — laço no arco da vida; par desatar o nó; ainda não é desastre; Faça o melhor!", href: "/posts/post-inspecao-expressao-no-na-vida.html", en: "a knot in life", es: "un nudo en la vida", fr: "un nœud dans la vie", it: "un nodo nella vita", de: "ein Knoten im Leben" },',
      'nó'
    );
    gloss = replaceOrInsertGloss(
      gloss,
      '"desatar o nó"',
      '    "desatar o nó": { tone: "craft", category: "Ofício", mundane: "Resolver um problema emaranhado; soltar o laço.", gloss: "Expressão — soltar o laço; o ofício, não o desastre; ufa depois; Faça o melhor!", href: "/posts/post-inspecao-expressao-desatar-o-no.html", en: "untie the knot", es: "desatar el nudo", fr: "dénouer le nœud", it: "sciogliere il nodo", de: "den Knoten lösen" },',
      'desatar'
    );
    gloss = replaceOrInsertGloss(
      gloss,
      'codorna',
      '    codorna: { gloss: "Ave Coturnix — ≠ corda (fio); produção de ovos/carne; elo galinha; Faça o melhor!", href: "/posts/post-inspecao-animal-codorna.html", en: "quail", es: "codorniz", fr: "caille", it: "quaglia", de: "Wachtel", el: "ορτύκι", la: "coturnix", yo: "ẹyẹ kekere", sw: "kware", gez: "coturnix", nl: "kwartel", pl: "przepiórka", ru: "перепел", uk: "перепілка", zh: "鹌鹑", ja: "ウズラ", ko: "메추라기", ar: "سمان", he: "שליו", hi: "बटेर", tr: "bıldırcın", sv: "vaktel", da: "vagtel", no: "vaktel", fi: "viiriäinen", cs: "křepelka", ro: "prepeliță", hu: "fürj", ca: "guatlla", gl: "paspallás", eu: "gailleta", gn: "codorna", qu: "yutu", eo: "koturno", vi: "chim cut", id: "puyuh", th: "นกคุ่ม", hr: "prepelica", sk: "prepelica", ga: "gearra", cy: "sofliar", ha: "codorna", am: "ኮድርና", fa: "بلدرچین", bn: "কোয়েল", zu: "isagwili" },',
      'corda'
    );
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (cluster nó)');
  }

  if (fs.existsSync(ANIMAIS_FILE)) {
    const cat = JSON.parse(fs.readFileSync(ANIMAIS_FILE, 'utf8'));
    const animals = Array.isArray(cat.animals) ? cat.animals : [];
    const ai = animals.findIndex((a) => a.slug === 'codorna');
    if (ai >= 0) animals[ai] = Object.assign({}, animals[ai], CODORNA);
    else animals.push(CODORNA);
    cat.animals = animals;
    cat.updatedAt = new Date().toISOString();
    await writeJsonRetry(ANIMAIS_FILE, cat);
    console.log('Catálogo animais: codorna');
  }

  if (fs.existsSync(ANIMAIS_I18N)) {
    const bundle = JSON.parse(fs.readFileSync(ANIMAIS_I18N, 'utf8'));
    bundle.animals = bundle.animals || {};
    bundle.animals.codorna = {
      nomePopularEn: 'Quail',
      nomePopularEs: 'Codorniz',
      summaryEn:
        'Farmed bird (Japanese quail): small eggs and meat; lexical neighbour of corda (rope) — the ear glues them, the etymon does not (Coturnix ≠ chorda).',
      summaryEs:
        'Ave de cría (codorniz japonesa): huevos pequeños y carne; vecina léxica de corda (cuerda) — el oído pega, el étimo no (Coturnix ≠ chorda).',
      partsUsedEn: ['Egg', 'Meat'],
      partsUsedEs: ['Huevo', 'Carne'],
      traditionalUsesEn: ['Quail eggs on the Brazilian table', 'Family flocks and quail farming', 'Fresh meat in small portions'],
      traditionalUsesEs: ['Huevos de codorniz en la mesa BR', 'Cría familiar y coturnicultura', 'Carne fresca en porción pequeña'],
      cautionsEn:
        'Educational content — not a farming or nutrition protocol. Distinguish the bird from the word corda (rope).',
      cautionsEs:
        'Contenido educativo — no es protocolo de cría ni nutricional. Distinguir el ave de la palabra corda (cuerda).'
    };
    await writeJsonRetry(ANIMAIS_I18N, bundle);
    console.log('animais-i18n: codorna');
  }

  if (fs.existsSync(OBJETOS_FILE)) {
    let html = fs.readFileSync(OBJETOS_FILE, 'utf8');
    const card =
      '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-corda.html">\n' +
      '                <span class="objetos-catalog-kicker">Palavras · objecto</span>\n' +
      '                <strong>Corda</strong>\n' +
      '                <span>O fio onde mora o nó — ≠ cinta ≠ codorna.</span>\n' +
      '            </a>\n';
    if (!html.includes('post-inspecao-palavra-corda.html')) {
      html = html.replace(
        '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-cinta.html">',
        card +
          '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-cinta.html">'
      );
      fs.writeFileSync(OBJETOS_FILE, html, 'utf8');
      console.log('Objetos: cartão Corda');
    }
  }

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK cluster nó:', built.map((p) => p.slug).join(', '));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
