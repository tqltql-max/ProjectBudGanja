'use strict';

/**
 * Injeta o cluster «objectos perigosos para controle de incêndio»:
 * mapa + Mars Hydro + Vivosun (palavra e catálogo) + objectos relacionados.
 * Uso: node scripts/upsert-incendio-objetos-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');
const {
  buildObjetosPerigososIncendioPost
} = require('../lib/objetos-perigosos-incendio-inspecao-post.js');
const { buildMarsHydroPalavraPost } = require('../lib/mars-hydro-palavra-inspecao-post.js');
const { buildVivosunPalavraPost } = require('../lib/vivosun-palavra-inspecao-post.js');
const { buildVivosunVerificacaoPost } = require('../lib/vivosun-verificacao-inspecao-post.js');
const { buildRelacionadosPosts } = require('../lib/incendio-objetos-relacionados-posts.js');
const { buildMarsHydroInspectionPost } = require('../lib/equipamento-verificacao-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

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
  writeFileRetrySync(out, buildPostHtml(normalized), 'utf8');
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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertGuia(items, entry, afterIds) {
  const gi = items.findIndex(
    (x) => x.id === entry.id || x.word === entry.word
  );
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  for (const id of afterIds || []) {
    const after = items.findIndex((x) => x.id === id);
    if (after >= 0) {
      items.splice(after + 1, 0, entry);
      return;
    }
  }
  items.push(entry);
}

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const reZu = new RegExp(
    '(    ' + esc + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (reZu.test(gloss)) return gloss.replace(reZu, '$1' + block);
  const reShort = new RegExp('(    ' + esc + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)');
  if (reShort.test(gloss)) return gloss.replace(reShort, '$1' + block);
  return null;
}

function replaceOrInsertGloss(gloss, key, line, afterKeys) {
  const reKey = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'
  );
  if (reKey.test(gloss)) {
    return { gloss: gloss.replace(reKey, line.trimEnd().replace(/,$/, '') + ','), how: 'existente' };
  }
  for (const ak of afterKeys) {
    const inserted = insertAfterKey(gloss, ak, line);
    if (inserted) return { gloss: inserted, how: 'após ' + ak };
  }
  return { gloss, how: null };
}

async function syncSql(allPosts) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  for (const post of allPosts) upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', allPosts.length, 'slugs');
}

function metaFor(post, extra) {
  const href = '/posts/post-' + post.slug + '.html';
  return Object.assign({ href, post }, extra);
}

async function main() {
  const postsBuilt = [
    stampFiles(buildObjetosPerigososIncendioPost()),
    stampFiles(buildMarsHydroPalavraPost()),
    stampFiles(buildVivosunPalavraPost()),
    stampFiles(buildVivosunVerificacaoPost()),
    ...buildRelacionadosPosts().map(stampFiles),
    stampFiles(buildMarsHydroInspectionPost())
  ];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  for (const post of postsBuilt) upsertPost(posts, post);
  writeFileRetrySync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  for (const post of postsBuilt) {
    if (post.contentEn || post.titleEn) writeI18n(i18n, post);
  }
  writeFileRetrySync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugEntries = [
      {
        id: 'palavra-objetos-perigosos-incendio',
        title: 'Objectos perigosos para controle de incêndio — mapa da tenda',
        titleEn: 'Dangerous objects for fire control — the tent map',
        titleEs: 'Objetos peligrosos para control de incendio — el mapa de la carpa',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Mapa perigo × corte × marca: Mars Hydro / Vivosun e todos os objectos da tenda.',
        suggestedSlug: 'inspecao-palavra-objetos-perigosos-incendio',
        doneHref: '/posts/post-inspecao-palavra-objetos-perigosos-incendio.html',
        seriesHint: 'palavras-origem'
      },
      {
        id: 'palavra-mars-hydro',
        title: 'Mars Hydro — Marte, água e o rasto marshydrobr',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Origem da palavra Mars Hydro (*marshydrobr*); marca ≠ controle de incêndio.',
        suggestedSlug: 'inspecao-palavra-mars-hydro',
        doneHref: '/posts/post-inspecao-palavra-mars-hydro.html',
        seriesHint: 'palavras-origem'
      },
      {
        id: 'palavra-vivosun',
        title: 'Vivosun — sol vivo, marca e o cabo na tenda',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Origem da palavra Vivosun (vivo + sun); irmã de Mars Hydro no cluster de incêndio.',
        suggestedSlug: 'inspecao-palavra-vivosun',
        doneHref: '/posts/post-inspecao-palavra-vivosun.html',
        seriesHint: 'palavras-origem'
      },
      {
        id: 'verificacao-vivosun',
        title: 'Equipamentos Vivosun',
        tipo: 'equipamento',
        priority: 2,
        status: 'feita',
        why: 'Catálogo Vivosun visível no BR (revenda) — AeroLight, tendas, GrowHub; cruzar ao lab.',
        suggestedSlug: 'inspecao-vivosun',
        doneHref: '/posts/post-inspecao-vivosun.html',
        seriesHint: 'verificacao-equipamento'
      },
      {
        id: 'palavra-tenda',
        title: 'Tenda — recinto, Mylar e o calor fechado',
        tipo: 'palavra',
        priority: 3,
        status: 'feita',
        suggestedSlug: 'inspecao-palavra-tenda',
        doneHref: '/posts/post-inspecao-palavra-tenda.html',
        seriesHint: 'palavras-origem'
      },
      {
        id: 'palavra-extintor',
        title: 'Extintor — apagar, classe e o último gesto',
        tipo: 'palavra',
        priority: 3,
        status: 'feita',
        suggestedSlug: 'inspecao-palavra-extintor',
        doneHref: '/posts/post-inspecao-palavra-extintor.html',
        seriesHint: 'palavras-origem'
      },
      {
        id: 'palavra-incendio',
        title: 'Incêndio — o evento, não o elemento',
        tipo: 'palavra',
        priority: 3,
        status: 'feita',
        suggestedSlug: 'inspecao-palavra-incendio',
        doneHref: '/posts/post-inspecao-palavra-incendio.html',
        seriesHint: 'palavras-origem'
      },
      {
        id: 'palavra-fonte',
        title: 'Fonte — a nascente que agora é o driver',
        tipo: 'palavra',
        priority: 3,
        status: 'feita',
        suggestedSlug: 'inspecao-palavra-fonte',
        doneHref: '/posts/post-inspecao-palavra-fonte.html',
        seriesHint: 'palavras-origem'
      },
      {
        id: 'palavra-extensao',
        title: 'Extensão — esticar a tomada até à tenda',
        tipo: 'palavra',
        priority: 3,
        status: 'feita',
        suggestedSlug: 'inspecao-palavra-extensao',
        doneHref: '/posts/post-inspecao-palavra-extensao.html',
        seriesHint: 'palavras-origem'
      },
      {
        id: 'palavra-exaustor',
        title: 'Exaustor — esgotar o ar, não o motor',
        tipo: 'palavra',
        priority: 3,
        status: 'feita',
        suggestedSlug: 'inspecao-palavra-exaustor',
        doneHref: '/posts/post-inspecao-palavra-exaustor.html',
        seriesHint: 'palavras-origem'
      }
    ];
    for (const e of sugEntries) upsertSug(items, e);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    writeFileRetrySync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (cluster incêndio)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const guiaEntries = [
      [
        {
          id: 'objetos-perigosos-incendio',
          word: 'objectos perigosos para controle de incêndio',
          simple:
            'Mapa lab: perigo × corte × nome de marca — Mars Hydro / Vivosun e os objectos da tenda; ≠ manual de bombeiros; Faça o melhor!',
          simpleEn:
            'Lab map: hazard × cut × brand name — Mars Hydro / Vivosun and tent objects; not a fire-crew manual; Do your best!',
          simpleEs:
            'Mapa lab: peligro × corte × marca — Mars Hydro / Vivosun y objetos de la carpa; no es manual de bomberos; ¡Haz lo mejor!',
          group: 'lexico',
          fromTitle: false,
          href: '/posts/post-inspecao-palavra-objetos-perigosos-incendio.html',
          history:
            'Composto de ofício: objecto (lat. objectum) + perigo (periculum) + controle (fr. contrôle) + incêndio (incendium). Distingue o que pode acender do que corta ou apaga.',
          curiosities:
            'A marca no painel não é certificado. marshydrobr e Vivosun entram pela origem da palavra e pela verificação de catálogo.'
        },
        ['fogo', 'objetos', 'risco']
      ],
      [
        {
          id: 'mars-hydro',
          word: 'Mars Hydro',
          simple:
            'Marca LED indoor: Mars (planeta/deus) + Hydro (água); rasto marshydrobr; marca ≠ controle de incêndio; Faça o melhor!',
          simpleEn:
            'Indoor LED brand: Mars (planet/god) + Hydro (water); marshydrobr trail; brand ≠ fire control; Do your best!',
          simpleEs:
            'Marca LED indoor: Mars (planeta/dios) + Hydro (agua); rastro marshydrobr; marca ≠ control de incendio; ¡Haz lo mejor!',
          group: 'lexico',
          fromTitle: false,
          href: '/posts/post-inspecao-palavra-mars-hydro.html',
          history:
            'Mars Hydro (2009, Shenzhen) cola o latim Mārs ao grego hýdōr. O domínio marshydrobr é o rasto Brasil, não a grafia da marca.',
          curiosities:
            'Hydro no nome não molha o cabo. Catálogo: inspeção de equipamentos Mars Hydro Brasil.'
        },
        ['mar', 'agua', 'fogo']
      ],
      [
        {
          id: 'vivosun',
          word: 'Vivosun',
          simple:
            'Marca indoor: vivo + sun = sol vivo; rasto BR por revenda; marca ≠ astro nem laudo; Faça o melhor!',
          simpleEn:
            'Indoor brand: vivo + sun = living sun; Brazil via resellers; brand ≠ star or certificate; Do your best!',
          simpleEs:
            'Marca indoor: vivo + sun = sol vivo; Brasil por revenda; marca ≠ astro ni laudo; ¡Haz lo mejor!',
          group: 'lexico',
          fromTitle: false,
          href: '/posts/post-inspecao-palavra-vivosun.html',
          history:
            'Portmanteau romance+inglês: vivo (lat. vīvus) + sun. Linha pública: HPS ~2009, tenda 2014, LED 2021, AeroLight 2022.',
          curiosities:
            'Red Dot é prémio de design. No BR não há espelho .com.br oficial nesta inspeção.'
        },
        ['sol', 'luz', 'mars-hydro']
      ],
      [
        {
          id: 'tenda',
          word: 'tenda',
          simple:
            'Lat. tendere — recinto indoor (grow tent) que fecha luz e calor; ≠ cofre ignífugo; Faça o melhor!',
          href: '/posts/post-inspecao-palavra-tenda.html',
          group: 'lexico',
          fromTitle: false,
          history: 'Esticar pano (tendere) virou a caixa Oxford/Mylar do cultivo indoor.',
          curiosities: 'Reflexão de catálogo não substitui o luxímetro.'
        },
        ['objetos-perigosos-incendio', 'fogo']
      ],
      [
        {
          id: 'extintor',
          word: 'extintor',
          simple:
            'Lat. exstinguere — objecto de controle que apaga; último gesto; ≠ NR-23; Faça o melhor!',
          href: '/posts/post-inspecao-palavra-extintor.html',
          group: 'lexico',
          fromTitle: false,
          history: 'Extinguir: fazer cessar a chama. No lab, o primeiro gesto é desligar a carga.',
          curiosities: 'Cilindro vermelho na foto não inspeciona o driver.'
        },
        ['incendio', 'fogo']
      ],
      [
        {
          id: 'incendio',
          word: 'incêndio',
          simple:
            'Lat. incendium — evento descontrolado; ≠ fogo (focus, elemento); eixo do cluster da tenda; Faça o melhor!',
          href: '/posts/post-inspecao-palavra-incendio.html',
          group: 'lexico',
          fromTitle: false,
          history: 'Incendere: atear. Incêndio é o fogo que saiu da lareira.',
          curiosities: 'Controle de incêndio impede o evento; não romantiza a chama.'
        },
        ['fogo', 'risco']
      ],
      [
        {
          id: 'fonte',
          word: 'fonte',
          simple:
            'Lat. fons — nascente; no indoor é o driver/PSU, perigo escondido atrás do painel; Faça o melhor!',
          href: '/posts/post-inspecao-palavra-fonte.html',
          group: 'lexico',
          fromTitle: false,
          history: 'A palavra da água passou a nomear a fonte de alimentação do LED.',
          curiosities: 'Eco com Hydro em Mars Hydro: água no nome, calor no cabo.'
        },
        ['lampada', 'agua']
      ],
      [
        {
          id: 'extensao',
          word: 'extensão',
          simple:
            'Lat. extendere — régua/benjamim que estica a tomada até à tenda; perigo banal; Faça o melhor!',
          href: '/posts/post-inspecao-palavra-extensao.html',
          group: 'lexico',
          fromTitle: false,
          history: 'Esticar (extendere) o cabo não estica o ampere da parede.',
          curiosities: 'Partilha o gesto de esticar com a tenda (tendere).'
        },
        ['fonte', 'interruptor']
      ],
      [
        {
          id: 'exaustor',
          word: 'exaustor',
          simple:
            'Lat. exhaurīre — motor que esgota o ar da tenda; circulação ≠ extração; Faça o melhor!',
          href: '/posts/post-inspecao-palavra-exaustor.html',
          group: 'lexico',
          fromTitle: false,
          history: 'Exaurir o ar velho: inline, duto, carvão. Motor continua objecto eléctrico.',
          curiosities: 'AeroLight (Vivosun) circula no painel; não troca o volume da tenda.'
        },
        ['tenda', 'fonte']
      ]
    ];
    for (const [entry, after] of guiaEntries) upsertGuia(items, entry, after);
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    writeFileRetrySync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (cluster incêndio)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const lines = [
      [
        'incendio',
        '    incendio: { tone: "caution", category: "Evento", mundane: "Fogo descontrolado — ≠ elemento fogo.", gloss: "Lat. incendium ← incendere; evento ≠ focus; eixo do cluster da tenda; Faça o melhor!", href: "/posts/post-inspecao-palavra-incendio.html", en: "fire (event / blaze)", es: "incendio", fr: "incendie", it: "incendio", de: "Brand", el: "pyrkagia", la: "incendium", yo: "ina nla", sw: "moto mkubwa", gez: "ʼǝsat", nl: "brand", pl: "pozar", ru: "pozhar", uk: "pozhezha", zh: "huozai", ja: "kaji", ko: "hwajae", ar: "hariq", he: "srefa", hi: "agni-kand", tr: "yangin", sv: "brand", da: "brand", no: "brann", fi: "tulipalo", cs: "pozar", ro: "incendiu", hu: "tuzesz", ca: "incendi", gl: "incendio", eu: "sute", gn: "tata vai", qu: "nina hatun", eo: "brulego", vi: "hoa hoan", id: "kebakaran", th: "fai mai", hr: "pozar", sk: "pozar", ga: "tine mor", cy: "tan", ha: "gobara", am: "esat", fa: "atash-suzi", bn: "agunlagna", zu: "umlilo omkhulu" },\n',
        ['fogo', 'risco']
      ],
      [
        '"objectos perigosos"',
        '    "objectos perigosos": { tone: "caution", category: "Mapa", mundane: "Cluster indoor: perigo × corte × marca.", gloss: "Mapa — Mars Hydro / Vivosun e objectos da tenda; ≠ manual de bombeiros; Faça o melhor!", href: "/posts/post-inspecao-palavra-objetos-perigosos-incendio.html", en: "dangerous objects for fire control", es: "objetos peligrosos para control de incendio" },\n',
        ['incendio', 'fogo']
      ],
      [
        'marshydro',
        '    marshydro: { tone: "caution", category: "Marca", mundane: "Marca LED indoor — Mars + Hydro.", gloss: "marshydrobr → Mars Hydro; Marte + água; marca ≠ laudo; elos tenda/fonte; Faça o melhor!", href: "/posts/post-inspecao-palavra-mars-hydro.html", en: "Mars Hydro", es: "Mars Hydro" },\n',
        ['incendio', 'fogo']
      ],
      [
        '"mars hydro"',
        '    "mars hydro": { tone: "caution", category: "Marca", mundane: "Grafia certa da marca.", gloss: "Mars (Mārs) + Hydro (hýdōr); rasto marshydrobr; ver Mars Hydro.", href: "/posts/post-inspecao-palavra-mars-hydro.html", en: "Mars Hydro", es: "Mars Hydro", fr: "Mars Hydro", it: "Mars Hydro", de: "Mars Hydro", el: "Mars Hydro", la: "Mars Hydro", yo: "Mars Hydro", sw: "Mars Hydro", gez: "Mars Hydro", nl: "Mars Hydro", pl: "Mars Hydro", ru: "Mars Hydro", uk: "Mars Hydro", zh: "Mars Hydro", ja: "Mars Hydro", ko: "Mars Hydro", ar: "Mars Hydro", he: "Mars Hydro", hi: "Mars Hydro", tr: "Mars Hydro", sv: "Mars Hydro", da: "Mars Hydro", no: "Mars Hydro", fi: "Mars Hydro", cs: "Mars Hydro", ro: "Mars Hydro", hu: "Mars Hydro", ca: "Mars Hydro", gl: "Mars Hydro", eu: "Mars Hydro", gn: "Mars Hydro", qu: "Mars Hydro", eo: "Mars Hydro", vi: "Mars Hydro", id: "Mars Hydro", th: "Mars Hydro", hr: "Mars Hydro", sk: "Mars Hydro", ga: "Mars Hydro", cy: "Mars Hydro", ha: "Mars Hydro", am: "Mars Hydro", fa: "Mars Hydro", bn: "Mars Hydro", zu: "Mars Hydro" },\n',
        ['marshydro', 'fogo']
      ],
      [
        'marshydrobr',
        '    marshydrobr: { gloss: "Rasto de domínio / teclado BR — ver Mars Hydro.", href: "/posts/post-inspecao-palavra-mars-hydro.html", en: "marshydrobr (Mars Hydro BR trail)", es: "marshydrobr (rastro Mars Hydro BR)" },\n',
        ['marshydro', '"mars hydro"']
      ],
      [
        'vivosun',
        '    vivosun: { tone: "caution", category: "Marca", mundane: "Marca indoor — vivo + sun.", gloss: "Sol vivo no nome; rasto BR por revenda; marca ≠ astro nem laudo; elos tenda/fonte; Faça o melhor!", href: "/posts/post-inspecao-palavra-vivosun.html", en: "Vivosun", es: "Vivosun", fr: "Vivosun", it: "Vivosun", de: "Vivosun", el: "Vivosun", la: "Vivosun", yo: "Vivosun", sw: "Vivosun", gez: "Vivosun", nl: "Vivosun", pl: "Vivosun", ru: "Vivosun", uk: "Vivosun", zh: "Vivosun", ja: "Vivosun", ko: "Vivosun", ar: "Vivosun", he: "Vivosun", hi: "Vivosun", tr: "Vivosun", sv: "Vivosun", da: "Vivosun", no: "Vivosun", fi: "Vivosun", cs: "Vivosun", ro: "Vivosun", hu: "Vivosun", ca: "Vivosun", gl: "Vivosun", eu: "Vivosun", gn: "Vivosun", qu: "Vivosun", eo: "Vivosun", vi: "Vivosun", id: "Vivosun", th: "Vivosun", hr: "Vivosun", sk: "Vivosun", ga: "Vivosun", cy: "Vivosun", ha: "Vivosun", am: "Vivosun", fa: "Vivosun", bn: "Vivosun", zu: "Vivosun" },\n',
        ['"mars hydro"', 'marshydro']
      ],
      [
        'tenda',
        '    tenda: { tone: "caution", category: "Objecto", mundane: "Recinto de cultivo indoor (grow tent).", gloss: "Lat. tendere — estica pano; fecha luz e calor; ≠ cofre ignífugo; Faça o melhor!", href: "/posts/post-inspecao-palavra-tenda.html", en: "grow tent / tent", es: "carpa de cultivo", fr: "tente", it: "tenda", de: "Zelt", el: "skini", la: "tenda", yo: "ago", sw: "hema", gez: "dǝbǝna", nl: "tent", pl: "namiot", ru: "palatka", uk: "namet", zh: "zhangpeng", ja: "tento", ko: "tenteu", ar: "khayma", he: "ohel", hi: "tambu", tr: "cadir", sv: "talt", da: "telt", no: "telt", fi: "teltta", cs: "stan", ro: "cort", hu: "sator", ca: "tenda", gl: "tenda", eu: "denda", gn: "oka", qu: "karpa", eo: "tendo", vi: "leu", id: "tenda", th: "tent", hr: "sator", sk: "stan", ga: "puball", cy: "pabell", ha: "tanti", am: "dunkwan", fa: "chador", bn: "tambu", zu: "itende" },\n',
        ['vivosun', 'fogo']
      ],
      [
        'extintor',
        '    extintor: { tone: "caution", category: "Controle", mundane: "Cilindro que apaga o incêndio.", gloss: "Lat. exstinguere — último gesto; coluna controle; ≠ NR-23; Faça o melhor!", href: "/posts/post-inspecao-palavra-extintor.html", en: "fire extinguisher", es: "extintor", fr: "extincteur", it: "estintore", de: "Feuerloscher", el: "svestiras", la: "extinctor", yo: "nkan pa ina", sw: "kizima moto", gez: "mäsfäsi", nl: "brandblusser", pl: "gasnica", ru: "ognetushitel", uk: "vognehasnyk", zh: "miehuoqi", ja: "shokaki", ko: "sohwagi", ar: "matafi", he: "maka", hi: "agni-shamak", tr: "yangin sondurucu", sv: "brandslackare", da: "brandslukker", no: "brannslukker", fi: "sammutin", cs: "hasic", ro: "extinctor", hu: "tuzolto", ca: "extintor", gl: "extintor", eu: "itzalgailu", gn: "tata mbogueha", qu: "nina wañuchi", eo: "fajrestingilo", vi: "binh chua chay", id: "alat pemadam", th: "thung dap fai", hr: "aparat", sk: "hasiaci", ga: "mucheoir", cy: "diffoddydd", ha: "majinyar wuta", am: "esat mekfel", fa: "khamush-konande", bn: "agninirbak", zu: "isicima-mlilo" },\n',
        ['incendio', 'tenda']
      ],
      [
        'fonte',
        '    fonte: { tone: "caution", category: "Objecto", mundane: "No indoor: driver / fonte de alimentação do LED.", gloss: "Lat. fons — nascente; aqui é o PSU escondido; perigo do cluster; Faça o melhor!", href: "/posts/post-inspecao-palavra-fonte.html", en: "power supply / driver", es: "fuente de alimentacion", fr: "alimentation", it: "alimentatore", de: "Netzteil", el: "trofodotiko", la: "fons", yo: "agbara", sw: "chanzo cha umeme", gez: "fons", nl: "voeding", pl: "zasilacz", ru: "blok pitaniya", uk: "blok zhyvlennya", zh: "dianyuan", ja: "dengen", ko: "adeopteo", ar: "masdar", he: "snak", hi: "power supply", tr: "guc kaynagi", sv: "nataggregat", da: "stromforsyning", no: "stromforsyning", fi: "virtalahde", cs: "zdroj", ro: "sursa", hu: "tapegyseg", ca: "font", gl: "fonte", eu: "iturri", gn: "ñepyrũ", qu: "pukyu", eo: "elektroprovizo", vi: "nguon", id: "adaptor", th: "power supply", hr: "napajanje", sk: "zdroj", ga: "solathar", cy: "cyflenwad", ha: "wutar lantarki", am: "hayl", fa: "manba", bn: "power supply", zu: "umthombo" },\n',
        ['tenda', 'lampada']
      ],
      [
        'extensao',
        '    extensao: { tone: "caution", category: "Objecto", mundane: "Régua / benjamim / cabo de extensão.", gloss: "Lat. extendere — estica a tomada; buracos ≠ ampere; Faça o melhor!", href: "/posts/post-inspecao-palavra-extensao.html", en: "extension cord / power strip", es: "alargador / regleta", fr: "rallonge", it: "ciabatta", de: "Verlangerung", el: "proektasi", la: "extensio", yo: "okun ina", sw: "kebo", gez: "extensio", nl: "verlengsnoer", pl: "przedluzacz", ru: "udlinitel", uk: "podovzhuvach", zh: "chatou", ja: "enchou koodo", ko: "multitab", ar: "wislat", he: "shalam", hi: "extension", tr: "uzatma", sv: "skarvsladd", da: "forlaenger", no: "skjoteledning", fi: "jatkojohto", cs: "prodluzovacka", ro: "prelungitor", hu: "hosszabbitó", ca: "allargador", gl: "extension", eu: "luzagarri", gn: "mokãnẽ", qu: "wasichay", eo: "etendilo", vi: "o cam", id: "stop kontak", th: "raka yai", hr: "produzni", sk: "predlzovacka", ga: "sreang", cy: "estyniad", ha: "waya", am: "meqenay", fa: "siadegi", bn: "extension", zu: "intambo" },\n',
        ['fonte', 'interruptor']
      ],
      [
        'exaustor',
        '    exaustor: { tone: "caution", category: "Objecto", mundane: "Ventilador inline que tira o ar da tenda.", gloss: "Lat. exhaurīre — esgotar o ar; motor continua perigo; circulação ≠ extração; Faça o melhor!", href: "/posts/post-inspecao-palavra-exaustor.html", en: "exhaust / inline fan", es: "extractor", fr: "extracteur", it: "aspiratore", de: "Abluftventilator", el: "exaeristiras", la: "exhaustor", yo: "afefe", sw: "feni", gez: "nǝfas", nl: "afzuiger", pl: "wyciag", ru: "vytyazhka", uk: "vytiazhka", zh: "paifeng", ja: "haiki", ko: "baegi", ar: "shafat", he: "sholef", hi: "exhaust", tr: "egzoz", sv: "fromluftsflakt", da: "udsugning", no: "avtrekksvifte", fi: "poistoilma", cs: "odsavac", ro: "extractor", hu: "elszivo", ca: "extractor", gl: "exaustor", eu: "ateragailu", gn: "yvytu mondoruha", qu: "wayra hurquq", eo: "elcxerpilo", vi: "quat hut", id: "exhaust", th: "phat lom", hr: "odsis", sk: "odsavac", ga: "sceithire", cy: "gwacau", ha: "fanka", am: "nefasma", fa: "havakesh", bn: "exhaust", zu: "i-fan" },\n',
        ['tenda', 'fonte']
      ]
    ];
    for (const [key, line, after] of lines) {
      const res = replaceOrInsertGloss(gloss, key, line, after);
      gloss = res.gloss;
      console.log('Glossário', key, res.how || 'FALHOU');
    }
    writeFileRetrySync(GLOSS_FILE, gloss, 'utf8');
  }

  for (const post of postsBuilt) {
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML', post.slug, e.message);
    }
  }

  try {
    await syncSql(postsBuilt);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK cluster incêndio:', postsBuilt.map((p) => p.slug).join(', '));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
