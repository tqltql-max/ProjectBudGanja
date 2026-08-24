'use strict';

/**
 * Injeta objecto «mola/molas» + animal «mula» (par de método corda/codorna).
 * Uso: node scripts/upsert-mola-mula-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildMolaPost, WIKT, WIKT_MULA, WIKI_MOLA, WIKI_MULA } = require('../lib/mola-inspecao-post.js');
const { buildColchaoPost } = require('../lib/colchao-inspecao-post.js');
const { buildAnimalInspecaoPost } = require('../lib/animais-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const OBJETOS_FILE = path.join(ROOT, 'objetos', 'index.html');
const ANIMAIS_FILE = path.join(ROOT, 'content', 'animais.json');
const ANIMAIS_I18N = path.join(ROOT, 'content', 'animais-i18n.json');
const HREF = '/posts/post-inspecao-palavra-mola.html';
const HREF_MULA = '/posts/post-inspecao-animal-mula.html';

const MULA = {
  id: 'mula',
  slug: 'mula',
  nomePopular: 'Mula',
  nomeCientifico: 'Equus asinus × Equus ferus caballus',
  familia: 'Equidae',
  summary:
    'Híbrido de trabalho (jumento × égua): tração, carga e passo rural; vizinha lexical da mola — o ouvido cola, o étimo não (mūla ≠ mollis).',
  partsUsed: ['Trabalho', 'Tração', 'Carga'],
  traditionalUses: [
    'Tração de carroça e carga em terreno irregular',
    'Transporte rural histórico no Brasil',
    'Companhia e ofício de lida — distinta do cavalo e do jumento'
  ],
  cautions:
    'Conteúdo educacional — não é protocolo veterinário nem de equitação. Distinguir o animal da palavra mola (peça elástica). Bem-estar, casqueamento e nutrição exigem profissionais. O animal não é o vilão; estereótipo de teimosia não é laudo.',
  tags: ['companhia', 'trabalho', 'rural', 'equideo'],
  relatedUnifesp: false,
  cover: '/imagens/inspecoes/mula-animal-cover.jpg',
  relatedInspections: [
    {
      href: HREF,
      label: 'Inspeção: Mola — o objecto que cede e volta (≠ mula)',
      labelEn: 'Inspection: Mola — the object that yields and returns (≠ mule)',
      labelEs: 'Inspección: Mola — el objeto que cede y vuelve (≠ mula)'
    },
    {
      href: '/posts/post-inspecao-animal-cavalo.html',
      label: 'Inspeção: Animal — Cavalo',
      labelEn: 'Inspection: Animal — Horse',
      labelEs: 'Inspección: Animal — Caballo'
    },
    {
      href: '/posts/post-inspecao-derivado-racao.html',
      label: 'Inspeção: Ração para animais — do saco industrial ao comedouro',
      labelEn: 'Inspection: Animal feed — from the industrial bag to the bowl',
      labelEs: 'Inspección: Pienso para animales — del saco industrial al comedero'
    }
  ]
};

const CAVALO_MULA_LINK = {
  href: HREF_MULA,
  label: 'Inspeção: Animal — Mula',
  labelEn: 'Inspection: Animal — Mule',
  labelEs: 'Inspección: Animal — Mula'
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

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max.apply(null, orders) : 0) + 1;
}

function nextAnimaisCatalogOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'animais-catalogo')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max.apply(null, orders) : 0) + 1;
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
  const mola =
    '    mola: { tone: "craft", category: "Objecto", mundane: "Peça elástica que cede e volta.", gloss: "It. molla ← lat. mollis — objecto; ≠ mula (animal) ≠ mó; feixe da carroça; Valeu !!!", href: "' +
    HREF +
    '", en: "spring (coil / leaf)", es: "muelle / resorte", fr: "ressort", it: "molla", de: "Feder", el: "ελατήριο", la: "mollis (via)", yo: "orun", sw: "chemchemi ya chuma", gez: "mola", nl: "veer", pl: "sprężyna", ru: "пружина", uk: "пружина", zh: "弹簧", ja: "ばね", ko: "스프링", ar: "زنبرك", he: "קפיץ", hi: "स्प्रिंग", tr: "yay", sv: "fjäder", da: "fjeder", no: "fjær", fi: "jousi", cs: "pružina", ro: "arc", hu: "rugó", ca: "molla", gl: "mola", eu: "malguki", gn: "mola", qu: "mola", eo: "risorto", vi: "lo xo", id: "per", th: "สปริง", hr: "opruga", sk: "pružina", ga: "earrach", cy: "gwanwyn (peiriant)", ha: "sifiri", am: "ስፕሪንግ", fa: "فنر", bn: "স্প্রিং", zu: "ispringi" },\n';
  gloss = replaceOrInsertAfter(gloss, 'mola', mola, 'corda');
  gloss = replaceOrInsertAfter(
    gloss,
    'molas',
    '    molas: { gloss: "Plural de mola — o jogo / o feixe / o colchão; ver mola.", href: "' +
      HREF +
      '", en: "springs", es: "muelles" },\n',
    'mola'
  );
  const mula =
    '    mula: { tone: "craft", category: "Animal", mundane: "Híbrido jumento × égua; tração e carga.", gloss: "Lat. mūla — ≠ mola (peça); elo cavalo; Valeu !!!", href: "' +
    HREF_MULA +
    '", en: "mule", es: "mula", fr: "mule", it: "mula", de: "Maultier", el: "μουλάρι", la: "mula", yo: "ìbákẹ́jì ẹṣin", sw: "nyumbu", gez: "bəḳlo", nl: "muilezel", pl: "muł", ru: "мул", uk: "мул", zh: "骡", ja: "ラバ", ko: "노새", ar: "بغل", he: "פרד", hi: "खच्चर", tr: "katır", sv: "mula", da: "muldyr", no: "muldyr", fi: "muuli", cs: "mula", ro: "catâr", hu: "öszvér", ca: "mula", gl: "mula", eu: "mando", gn: "mula", qu: "mula", eo: "mulo", vi: "la", id: "bagal", th: "ล่อ", hr: "mula", sk: "mula", ga: "miúil", cy: "mul", ha: "alfadari", am: "በቅሎ", fa: "قاطر", bn: "খচ্চর", zu: "imnyuzi" },\n';
  gloss = replaceOrInsertAfter(gloss, 'mula', mula, 'cavalo');
  gloss = replaceOrInsertAfter(
    gloss,
    'mulo',
    '    mulo: { gloss: "Macho do híbrido — ver mula; ≠ mola.", href: "' +
      HREF_MULA +
      '", en: "male mule", es: "mulo" },\n',
    'mula'
  );
  return gloss;
}

function patchObjetosHtml(html) {
  const card =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-mola.html">\n' +
    '                <span class="objetos-catalog-kicker">Palavras · objecto</span>\n' +
    '                <strong>Mola</strong>\n' +
    '                <span>A peça que cede e volta — ≠ mula ≠ mó; feixe da carroça.</span>\n' +
    '            </a>\n';
  if (html.includes('post-inspecao-palavra-mola.html')) {
    return html.replace(
      /            <a class="objetos-catalog-card" href="\/posts\/post-inspecao-palavra-mola\.html">[\s\S]*?<\/a>\n/,
      card
    );
  }
  const needle =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-oculos.html">';
  const i = html.indexOf(needle);
  if (i < 0) {
    console.warn('Aviso: cartão mola — âncora óculos não encontrada');
    return html;
  }
  const after = html.indexOf('</a>', i);
  if (after < 0) return html;
  return html.slice(0, after + 4) + '\n' + card + html.slice(after + 4);
}

function patchCavaloRelated(animals) {
  const cavalo = animals.find((a) => a.slug === 'cavalo');
  if (!cavalo) return;
  const list = Array.isArray(cavalo.relatedInspections) ? cavalo.relatedInspections : [];
  const i = list.findIndex((r) => r && r.href === CAVALO_MULA_LINK.href);
  if (i >= 0) list[i] = Object.assign({}, list[i], CAVALO_MULA_LINK);
  else list.push(CAVALO_MULA_LINK);
  cavalo.relatedInspections = list;
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

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-mola-mula-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capas:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const molaExisting = posts.find((p) => p.slug === 'inspecao-palavra-mola');
  const molaOrder = molaExisting
    ? Number(molaExisting.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const molaPost = stampFiles(buildMolaPost(molaOrder));

  if (fs.existsSync(ANIMAIS_FILE)) {
    const cat = JSON.parse(fs.readFileSync(ANIMAIS_FILE, 'utf8'));
    const animals = Array.isArray(cat.animals) ? cat.animals : [];
    const ai = animals.findIndex((a) => a.slug === 'mula');
    if (ai >= 0) animals[ai] = Object.assign({}, animals[ai], MULA);
    else {
      const afterCavalo = animals.findIndex((a) => a.slug === 'cavalo');
      if (afterCavalo >= 0) animals.splice(afterCavalo + 1, 0, MULA);
      else animals.push(MULA);
    }
    patchCavaloRelated(animals);
    cat.animals = animals;
    cat.updatedAt = new Date().toISOString();
    await writeJsonRetry(ANIMAIS_FILE, cat);
    console.log('Catálogo animais: mula');
  }

  if (fs.existsSync(ANIMAIS_I18N)) {
    const bundle = JSON.parse(fs.readFileSync(ANIMAIS_I18N, 'utf8'));
    bundle.animals = bundle.animals || {};
    bundle.animals.mula = {
      nomePopularEn: 'Mule',
      nomePopularEs: 'Mula',
      summaryEn:
        'Work hybrid (jack donkey × mare): traction, pack and rural gait; lexical neighbour of mola (spring) — the ear glues them, the etymon does not (mūla ≠ mollis).',
      summaryEs:
        'Híbrido de trabajo (burro × yegua): tracción, carga y paso rural; vecina léxica de mola (muelle) — el oído pega, el étimo no (mūla ≠ mollis).',
      partsUsedEn: ['Work', 'Traction', 'Pack'],
      partsUsedEs: ['Trabajo', 'Tracción', 'Carga'],
      traditionalUsesEn: [
        'Cart traction and pack on rough ground',
        'Historic rural transport in Brazil',
        'Companionship and ranch craft — distinct from horse and donkey'
      ],
      traditionalUsesEs: [
        'Tracción de carro y carga en terreno irregular',
        'Transporte rural histórico en Brasil',
        'Compañía y oficio de lida — distinta del caballo y del burro'
      ],
      cautionsEn:
        'Educational content — not a veterinary or riding protocol. Distinguish the animal from the word mola (spring). Welfare, farriery and nutrition require professionals.',
      cautionsEs:
        'Contenido educativo — no es protocolo veterinario ni de equitación. Distinguir el animal de la palabra mola (muelle). Bienestar, herraje y nutrición exigen profesionales.'
    };
    await writeJsonRetry(ANIMAIS_I18N, bundle);
    console.log('animais-i18n: mula');
  }

  const catNow = JSON.parse(fs.readFileSync(ANIMAIS_FILE, 'utf8'));
  const mulaAnimal = (catNow.animals || []).find((a) => a.slug === 'mula');
  const mulaExisting = posts.find((p) => p.slug === 'inspecao-animal-mula');
  const mulaOrder = mulaExisting
    ? Number(mulaExisting.seriesOrder) || nextAnimaisCatalogOrder(posts)
    : nextAnimaisCatalogOrder(posts);
  const mulaPost = stampFiles(buildAnimalInspecaoPost(mulaAnimal, mulaOrder));
  mulaPost.date = '2026-08-24T12:48:00.000Z';

  const colchaoPost = stampFiles(buildColchaoPost());

  const built = [molaPost, mulaPost, colchaoPost];
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
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'objeto-mola',
        title: 'Mola — o objecto que cede e volta',
        titleEn: 'Mola — the object that yields and returns',
        titleEs: 'Mola — el objeto que cede y vuelve',
        tipo: 'objeto',
        priority: 2,
        status: 'feita',
        why: 'Objecto: mola/molas (it. molla ← mollis) — peça elástica; ≠ mula ≠ mó; feixe da carroça; catálogo Objetos.',
        whyEn: 'Object: mola/molas (It. molla ← mollis) — elastic piece; ≠ mule ≠ millstone; wagon leaf-spring; Objects catalog.',
        whyEs: 'Objeto: mola/molas (it. molla ← mollis) — pieza elástica; ≠ mula ≠ muela; ballesta del carro; catálogo Objetos.',
        suggestedSlug: 'inspecao-palavra-mola',
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          WIKI_MOLA,
          HREF_MULA,
          '/posts/post-inspecao-palavra-colchao.html',
          '/objetos/',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + molaPost.seriesOrder + ' — par mola/mula como corda/codorna.'
      },
      ['objeto-oculos', 'objeto-corda', 'palavra-colchao']
    );
    upsertItem(
      items,
      {
        id: 'animal-mula',
        title: 'Mula — híbrido de trabalho, vizinha da mola',
        titleEn: 'Mule — work hybrid, neighbour of the spring',
        titleEs: 'Mula — híbrido de trabajo, vecina del muelle',
        tipo: 'animal',
        priority: 2,
        status: 'feita',
        why: 'Animal: mula (lat. mūla) — jumento × égua; ≠ mola (peça); elo cavalo; catálogo Animais.',
        whyEn: 'Animal: mule (Lat. mūla) — jack × mare; ≠ spring; horse link; Animals catalog.',
        whyEs: 'Animal: mula (lat. mūla) — burro × yegua; ≠ muelle; vínculo caballo; catálogo Animales.',
        suggestedSlug: 'inspecao-animal-mula',
        doneHref: HREF_MULA,
        seriesHint: 'animais-catalogo',
        sources: [HREF_MULA, WIKT_MULA, WIKI_MULA, HREF, '/animais/mula/', '/posts/post-inspecao-animal-cavalo.html'],
        notes: 'Par de método com objecto mola.'
      },
      ['objeto-mola', 'animal-codorna']
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
        id: 'mola',
        word: 'mola',
        simple:
          'It. molla ← lat. mollis — peça que cede e volta. ≠ mula (animal) ≠ mó. Feixe da carroça; colchão de molas. Valeu !!!',
        simpleEn:
          'It. molla ← Lat. mollis — piece that yields and returns. ≠ mule ≠ millstone. Wagon leaf-spring; mattress coils. Valeu !!!',
        simpleEs:
          'It. molla ← lat. mollis — pieza que cede y vuelve. ≠ mula ≠ muela. Ballesta del carro; colchón de muelles. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Mola (peça elástica) entra no português pela via italiana molla, de molle, do latim mollis — o que é mole, o que cede. O homónimo latino mola (pedra de moinho) sobrevive no português como mó, não como esta ficha. O plural molas nomeia o jogo, o feixe e as peças do colchão.',
        curiosities:
          'O ouvido cola mola e mula (um o / um u), como corda e codorna. A relação de campo é a carroça: o feixe de molas amortece o passo da mula. A lei de Hooke mapeia o objecto até ao limite elástico.',
        historyEn:
          'Portuguese mola (spring) comes via Italian molla, from molle, from Latin mollis — what is soft, what yields. Latin mola (millstone) survives in Portuguese as mó, not this sheet. The plural molas names the set, the leaf pack and mattress coils.',
        curiositiesEn:
          'The ear glues mola and mula (o / u), like corda and codorna. The field link is the cart: leaf springs cushion the mule’s gait. Hooke’s law maps the object up to the elastic limit.',
        historyEs:
          'Mola (muelle) entra al portugués por la vía italiana molla, de molle, del latín mollis — lo blando, lo que cede. El homónimo latino mola (muela) sobrevive como mó, no como esta ficha.',
        curiositiesEs:
          'El oído pega mola y mula (o / u), como corda y codorna. El vínculo de campo es el carro: la ballesta amortigua el paso de la mula.'
      },
      ['corda', 'colchao', 'oculos']
    );
    upsertItem(
      items,
      {
        id: 'mula',
        word: 'mula',
        simple:
          'Lat. mūla — híbrido jumento × égua. ≠ mola (peça). Tração, carga, passo. Valeu !!!',
        simpleEn:
          'Lat. mūla — jack donkey × mare hybrid. ≠ spring. Traction, pack, gait. Valeu !!!',
        simpleEs:
          'Lat. mūla — híbrido burro × yegua. ≠ muelle. Tracción, carga, paso. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_MULA,
        history:
          'Mula vem do latim mūla, fêmea do mūlus. No português nomeia o híbrido de jumento com égua (o inverso é o bardoto). A fala acrescenta mula de carga, picar a mula e a lenda da mula-sem-cabeça — camadas, não o étimo da peça mola.',
        curiosities:
          'Quase estéril, resistente, passo seguro em ladeira. O laboratório separa o animal da mola (objecto) e do estereótipo de teimosia.',
        historyEn:
          'Mula comes from Latin mūla, female of mūlus. In Portuguese it names the jack×mare hybrid (the reverse is the hinny). Speech adds pack-mule talk, picar a mula and the headless-mule legend — layers, not the spring’s etymon.',
        curiositiesEn:
          'Mostly sterile, hardy, sure-footed on slopes. The lab splits the animal from the spring (object) and from the stubbornness stereotype.',
        historyEs:
          'Mula viene del latín mūla, hembra de mūlus. En portugués nombra el híbrido de burro con yegua (lo inverso es el bardoto).',
        curiositiesEs:
          'Casi estéril, resistente, paso seguro en cuesta. El laboratorio separa el animal del muelle y del estereotipo de terquedad.'
      },
      ['mola', 'cavalo', 'codorna']
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
    await syncSql(built);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK cluster mola/mula:', built.map((p) => p.slug).join(', '));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
