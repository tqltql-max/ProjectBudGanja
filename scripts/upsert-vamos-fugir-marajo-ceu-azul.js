'use strict';

/**
 * Cluster Vamos Fugir (Skank/Gil) × Marajó × Guaporé × Céu Azul (Chorão).
 * Uso: node scripts/upsert-vamos-fugir-marajo-ceu-azul.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildVamosFugirPost, SPOTIFY, YT, WIKI } = require('../lib/vamos-fugir-inspecao-post.js');
const { buildMarajoPost } = require('../lib/marajo-inspecao-post.js');
const { buildGuaporePost } = require('../lib/guapore-inspecao-post.js');
const { buildCeuAzulPost, YT: YT_CEU, SPOTIFY: SPOTIFY_CEU, WIKI: WIKI_CEU } = require('../lib/ceu-azul-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');

const H = {
  fugir: '/posts/post-inspecao-arte-vamos-fugir.html',
  marajo: '/posts/post-inspecao-palavra-marajo.html',
  guapore: '/posts/post-inspecao-palavra-guapore.html',
  ceu: '/posts/post-inspecao-arte-ceu-azul.html'
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
  let last;
  for (let i = 0; i < 8; i += 1) {
    try {
      fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
      console.log('HTML escrito', normalized.filename);
      return;
    } catch (e) {
      last = e;
      const start = Date.now();
      while (Date.now() - start < 250 * (i + 1)) {
        /* busy wait — file lock */
      }
    }
  }
  throw last;
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

function patchGlossary(gloss) {
  const afterSol =
    '    marajo: { gloss: "Ilha/arquipélago PA — ≠ uma cidade; Maraj = lapso; elo Vamos Fugir; Valeu !!!", href: "' +
    H.marajo +
    '", en: "Marajó (island)", es: "Marajó (isla)" },\n' +
    '    "marajó": { gloss: "Grafia com acento — ver Marajó.", href: "' +
    H.marajo +
    '", en: "Marajó", es: "Marajó" },\n' +
    '    maraj: { gloss: "Lapso de Marajó — ilha, não cidade.", href: "' +
    H.marajo +
    '", en: "slip for Marajó", es: "lapsus de Marajó" },\n' +
    '    marajoara: { gloss: "Gentílico de Marajó — ver ficha da ilha.", href: "' +
    H.marajo +
    '", en: "from Marajó", es: "marajoara" },\n' +
    '    guapore: { gloss: "Grafia sem acento de Guaporé — rio × município RS; Valeu !!!", href: "' +
    H.guapore +
    '", en: "Guaporé (spelling)", es: "Guaporé" },\n' +
    '    "guaporé": { gloss: "Rio (BR/BO) × cidade RS; a canção Vamos Fugir não escolhe; Valeu !!!", href: "' +
    H.guapore +
    '", en: "Guaporé (river / town)", es: "Guaporé (río / municipio)" },\n';

  if (!/    marajo:\s*\{/.test(gloss)) {
    const inserted = insertAfterKey(gloss, 'sol', afterSol);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção após sol falhou');
  }

  const afterAlegria =
    '    "vamos fugir": { tone: "craft", category: "Canção", mundane: "Reggae de Gil + Liminha (1984); Skank 2004 no Spotify pedido.", gloss: "Mapa Irajá/Marajó/Guaporé; céu azul = céu ≠ Céu Azul do Chorão; Valeu !!!", href: "' +
    H.fugir +
    '", en: "Vamos Fugir (song)", es: "Vamos Fugir (canción)" },\n' +
    '    "céu azul": { tone: "warm", category: "Canção", mundane: "Faixa CBJR (Chorão / Castanho, 2011).", gloss: "≠ o céu na lista de Vamos Fugir; Liminha na ponte; Valeu !!!", href: "' +
    H.ceu +
    '", en: "Céu Azul (CBJR song)", es: "Céu Azul (canción CBJR)" },\n' +
    '    ceuazul: { gloss: "Grafia colada — ver Céu Azul (CBJR).", href: "' +
    H.ceu +
    '", en: "Céu Azul (glued)", es: "Céu Azul (pegado)" },\n' +
    '    iraja: { gloss: "Bairro do Rio no mapa de Vamos Fugir — ver a canção.", href: "' +
    H.fugir +
    '", en: "Irajá (RJ)", es: "Irajá (RJ)" },\n' +
    '    "irajá": { gloss: "Bairro da Zona Norte do Rio — mapa de Vamos Fugir.", href: "' +
    H.fugir +
    '", en: "Irajá", es: "Irajá" },\n';

  if (!/"vamos fugir":\s*\{/.test(gloss)) {
    const inserted = insertAfterKey(gloss, 'alegria', afterAlegria);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção após alegria falhou');
  }
  return gloss;
}

function upsertSug(sug, cfg) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const si = items.findIndex((x) => x.id === cfg.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], cfg.entry);
  else items.push(cfg.entry);
  sug.items = items;
}

function upsertGuia(guia, entry, afterIds) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    let after = -1;
    for (const id of afterIds || []) {
      after = items.findIndex((x) => x.id === id || x.word === id);
      if (after >= 0) break;
    }
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-vamos-fugir-marajo-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';
  const vida = fs.existsSync(VIDA_FILE) ? JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8')) : { poems: [] };

  const { poemPt: poemFugir, poemEn: poemFugirEn, poemEs: poemFugirEs } = require('../lib/vamos-fugir-inspecao-post.js');
  const { poemPt: poemCeu, poemEn: poemCeuEn, poemEs: poemCeuEs } = require('../lib/ceu-azul-inspecao-post.js');

  const built = [
    stampFiles(buildVamosFugirPost()),
    stampFiles(buildMarajoPost()),
    stampFiles(buildGuaporePost()),
    stampFiles(buildCeuAzulPost())
  ];

  for (const post of built) {
    upsertPost(posts, post);
    writeHtml(post);
    writeI18n(i18n, post);
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  upsertSug(sug, {
    id: 'arte-vamos-fugir',
    entry: {
      id: 'arte-vamos-fugir',
      title: 'Vamos Fugir — Gil 1984, Skank no Spotify',
      titleEn: 'Vamos Fugir — Gil 1984, Skank on Spotify',
      titleEs: 'Vamos Fugir — Gil 1984, Skank en Spotify',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Spotify 7dxK6RSoCWZcb5gobxs1h9 = Skank; génese Gil+Liminha+Wailers; mapa Marajó/Guaporé; céu ≠ Céu Azul.',
      whyEn: 'Requested Spotify is Skank; genesis Gil 1984; Marajó/Guaporé map; sky ≠ Chorão title.',
      whyEs: 'Spotify pedido = Skank; génesis Gil 1984; mapa Marajó/Guaporé.',
      suggestedSlug: 'inspecao-arte-vamos-fugir',
      doneHref: H.fugir,
      seriesHint: 'artes-cultura',
      sources: [H.fugir, SPOTIFY, YT, WIKI, H.marajo, H.guapore, H.ceu],
      notes: 'Sem letra. Skank 2004 ≠ fonograma 1984.'
    }
  });
  upsertSug(sug, {
    id: 'palavra-marajo',
    entry: {
      id: 'palavra-marajo',
      title: 'Marajó — ilha, não cidade Maraj',
      titleEn: 'Marajó — island, not a city named Maraj',
      titleEs: 'Marajó — isla, no ciudad Maraj',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Marajó ≠ um município; Maraj = lapso; elo Vamos Fugir.',
      whyEn: 'Marajó ≠ one municipality; Maraj = slip.',
      whyEs: 'Marajó ≠ un municipio; Maraj = lapsus.',
      suggestedSlug: 'inspecao-palavra-marajo',
      doneHref: H.marajo,
      seriesHint: 'palavras-origem',
      sources: ['https://pt.wikipedia.org/wiki/Ilha_do_Maraj%C3%B3', H.fugir],
      notes: 'Arquipélago PA.'
    }
  });
  upsertSug(sug, {
    id: 'palavra-guapore',
    entry: {
      id: 'palavra-guapore',
      title: 'Guaporé — rio e cidade',
      titleEn: 'Guaporé — river and town',
      titleEs: 'Guaporé — río y ciudad',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Rio BR/BO × município RS; a canção não escolhe.',
      whyEn: 'Border river × RS town; the song does not pick.',
      whyEs: 'Río de frontera × municipio RS.',
      suggestedSlug: 'inspecao-palavra-guapore',
      doneHref: H.guapore,
      seriesHint: 'palavras-origem',
      sources: ['https://pt.wikipedia.org/wiki/Rio_Guapor%C3%A9', H.fugir],
      notes: 'Ambiguidade honesta.'
    }
  });
  upsertSug(sug, {
    id: 'arte-ceu-azul',
    entry: {
      id: 'arte-ceu-azul',
      title: 'Céu Azul — Chorão, não o céu de Gil',
      titleEn: 'Céu Azul — Chorão, not Gil’s sky',
      titleEs: 'Céu Azul — Chorão, no el cielo de Gil',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'CBJR 2011; Liminha produziu o Caiçara; ≠ motivo céu azul em Vamos Fugir.',
      whyEn: 'CBJR 2011; Liminha produced the live album; ≠ Gil motif.',
      whyEs: 'CBJR 2011; Liminha en el Caiçara; ≠ motivo de Gil.',
      suggestedSlug: 'inspecao-arte-ceu-azul',
      doneHref: H.ceu,
      seriesHint: 'artes-cultura',
      sources: [H.ceu, YT_CEU, SPOTIFY_CEU, WIKI_CEU, H.fugir, '/posts/post-inspecao-figura-chorao.html'],
      notes: 'Sem letra. Clipe Radar 0dLX40UMUKo.'
    }
  });

  upsertGuia(
    guia,
    {
      id: 'vamos-fugir',
      word: 'Vamos Fugir',
      simple: 'Gil + Liminha 1984 (Wailers); Spotify pedido = Skank 2004. Mapa Irajá/Marajó/Guaporé. Céu azul ≠ Céu Azul do Chorão. Valeu !!!',
      simpleEn: 'Gil + Liminha 1984; requested Spotify is Skank 2004. Place-map Irajá/Marajó/Guaporé. Sky ≠ Chorão’s Céu Azul. Valeu !!!',
      simpleEs: 'Gil + Liminha 1984; Spotify pedido = Skank 2004. Mapa Irajá/Marajó/Guaporé. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.fugir
    },
    ['how-bizarre', 'alegria']
  );
  upsertGuia(
    guia,
    {
      id: 'marajo',
      word: 'Marajó',
      simple: 'Ilha/arquipélago no Pará — não é uma cidade. Maraj = lapso. Elo Vamos Fugir. Valeu !!!',
      simpleEn: 'Island/archipelago in Pará — not one city. Maraj = slip. Valeu !!!',
      simpleEs: 'Isla/archipiélago en Pará — no es una ciudad. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.marajo
    },
    ['vamos-fugir', 'sol']
  );
  upsertGuia(
    guia,
    {
      id: 'guapore',
      word: 'Guaporé',
      simple: 'Rio (fronteira BR/BO) e município no RS. A canção Vamos Fugir não escolhe. Valeu !!!',
      simpleEn: 'Border river and RS town. Vamos Fugir does not pick which. Valeu !!!',
      simpleEs: 'Río de frontera y municipio de RS. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.guapore
    },
    ['marajo', 'vamos-fugir']
  );
  upsertGuia(
    guia,
    {
      id: 'ceu-azul',
      word: 'Céu Azul',
      simple: 'Canção CBJR (Chorão + Castanho, 2011) ≠ o céu de Vamos Fugir. Liminha na ponte. Valeu !!!',
      simpleEn: 'CBJR song (2011) ≠ the sky motif in Vamos Fugir. Valeu !!!',
      simpleEs: 'Canción CBJR (2011) ≠ el cielo de Vamos Fugir. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.ceu
    },
    ['vamos-fugir', 'alegria']
  );

  upsertVidaPoem(vida, {
    id: 'vamos-fugir',
    slug: 'vamos-fugir',
    title: 'Vamos Fugir',
    titleEn: 'Vamos Fugir',
    titleEs: 'Vamos Fugir',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'O mapa nomeia Irajá, Marajó, Guaporé — o ofício é sair sem fingir que o endereço é o destino.',
    teaserEn: 'The map names Irajá, Marajó, Guaporé — the craft is leaving without pretending the address is the destination.',
    teaserEs: 'El mapa nombra Irajá, Marajó, Guaporé — el oficio es salir sin fingir que la dirección es el destino.',
    body: poemFugir(),
    bodyEn: poemFugirEn(),
    bodyEs: poemFugirEs(),
    inspectionHref: H.fugir,
    tags: ['poesia', 'vida', 'vamos-fugir', 'marajo', 'guapore']
  });
  upsertVidaPoem(vida, {
    id: 'ceu-azul',
    slug: 'ceu-azul',
    title: 'Céu Azul',
    titleEn: 'Céu Azul',
    titleEs: 'Céu Azul',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'O título do Chorão não é o céu da fuga de Gil — duas salas, um Liminha na ponte.',
    teaserEn: 'Chorão’s title is not Gil’s sky — two rooms, Liminha as the bridge.',
    teaserEs: 'El título de Chorão no es el cielo de Gil — dos salas, Liminha de puente.',
    body: poemCeu(),
    bodyEn: poemCeuEn(),
    bodyEs: poemCeuEs(),
    inspectionHref: H.ceu,
    tags: ['poesia', 'vida', 'ceu-azul', 'chorao']
  });

  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  await writeJsonRetry(VIDA_FILE, vida);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (vamos fugir / marajó / guaporé / céu azul)');
  }

  console.log('OK cluster Vamos Fugir × Marajó × Guaporé × Céu Azul');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
