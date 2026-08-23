'use strict';

/**
 * Injeta lava ≠ larva ≠ lavar e formiga lava-pé.
 * Uso: node scripts/upsert-lavar-lava-larva-formiga.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildLavarPost } = require('../lib/palavras-inspecoes-posts.js');
const { buildLavaPost } = require('../lib/lava-inspecao-post.js');
const { buildLarvaPost } = require('../lib/larva-inspecao-post.js');
const { buildFormigaPost } = require('../lib/formiga-inspecao-post.js');
const { buildFormigaLavaPePost } = require('../lib/formiga-lava-pe-inspecao-post.js');
const { buildInsetoPost } = require('../lib/inseto-inspecao-post.js');
const { buildFogoPost } = require('../lib/fogo-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

const H = {
  lavar: '/posts/post-inspecao-palavra-lavar.html',
  lava: '/posts/post-inspecao-palavra-lava.html',
  larva: '/posts/post-inspecao-palavra-larva.html',
  formiga: '/posts/post-inspecao-palavra-formiga.html',
  lavaPe: '/posts/post-inspecao-expressao-formiga-lava-pe.html'
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
  gloss = gloss.replace(
    /    lavar:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},/,
    '    lavar: { gloss: "Lat. lavāre — mãos e alma; ≠ lava de vulcão ≠ larva ≠ formiga lava-pé; Valeu !!!", href: "' +
      H.lavar +
      '", en: "to wash", es: "lavar", fr: "laver", it: "lavare", de: "waschen", el: "πλένω", la: "lavare", yo: "fọ", sw: "osha", gez: "ḥaṣäbä", nl: "wassen", pl: "myć", ru: "мыть", uk: "мити", zh: "洗", ja: "洗う", ko: "씻다", ar: "يغسل", he: "לשטוף", hi: "धोना", tr: "yıkamak", sv: "tvätta", da: "vaske", no: "vaske", fi: "pestä", cs: "mýt", ro: "a spăla", hu: "mosni", ca: "rentar", gl: "lavar", eu: "garbitu", gn: "johéi", qu: "maqchiy", eo: "lavi", vi: "rửa", id: "mencuci", th: "ล้าง", hr: "prati", sk: "umývať", ga: "nígh", cy: "golchi", ha: "wanke", am: "መታጠብ", fa: "شستن", bn: "ধোয়া", zu: "geza" },'
  );

  const block =
    '    lava: { gloss: "Rocha fundida do vulcão (it. lava / lat. lābēs) ≠ lavar ≠ larva; larva de vulcão = lapso; Valeu !!!", href: "' +
    H.lava +
    '", en: "lava", es: "lava" },\n' +
    '    larva: { gloss: "Lat. lārva — estádio jovem do inseto ≠ lava de vulcão; Valeu !!!", href: "' +
    H.larva +
    '", en: "larva", es: "larva" },\n' +
    '    "larva de vulcão": { gloss: "Lapso de lava de vulcão — ver lava.", href: "' +
    H.lava +
    '", en: "slip for volcanic lava", es: "lapsus de lava volcánica" },\n' +
    '    formiga: { gloss: "Lat. formīca — inseto do chão; lava-pé é o caso Solenopsis; ≠ tucandeira; Valeu !!!", href: "' +
    H.formiga +
    '", en: "ant", es: "hormiga" },\n' +
    '    "formiga lava-pé": { tone: "craft", category: "Nome popular", mundane: "Formiga-de-fogo (Solenopsis) que ferroa o pé.", gloss: "≠ lavar os pés (rito) ≠ lava de vulcão ≠ larva; Valeu !!!", href: "' +
    H.lavaPe +
    '", en: "fire ant (BR lava-pé)", es: "hormiga de fuego" },\n' +
    '    "lava-pé": { gloss: "Nome popular BR de Solenopsis — ver formiga lava-pé.", href: "' +
    H.lavaPe +
    '", en: "fire ant", es: "hormiga de fuego" },\n' +
    '    lavapes: { gloss: "Grafia sem acento de lava-pés — ver formiga lava-pé.", href: "' +
    H.lavaPe +
    '", en: "fire ant (spelling)", es: "hormiga de fuego" },\n';

  if (!/    lava:\s*\{/.test(gloss)) {
    const inserted = insertAfterKey(gloss, 'lavar', block);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção após lavar falhou');
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

async function main() {
  for (const script of ['generate-lavar-palavra-cover.js', 'generate-lava-larva-formiga-covers.js']) {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit'
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const built = [
    stampFiles(buildLavarPost()),
    stampFiles(buildLavaPost()),
    stampFiles(buildLarvaPost()),
    stampFiles(buildFormigaPost()),
    stampFiles(buildFormigaLavaPePost()),
    stampFiles(buildInsetoPost()),
    stampFiles(buildFogoPost())
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
    id: 'palavra-lavar',
    entry: {
      id: 'palavra-lavar',
      title: 'Lavar — água, não lava de vulcão',
      titleEn: 'Lavar — water, not volcano lava',
      titleEs: 'Lavar — agua, no lava de volcán',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: lavar ≠ lava ≠ larva; orelha cola formiga lava-pé; Valeu !!!',
      whyEn: 'Words: lavar ≠ lava ≠ larva; ear glues formiga lava-pé; Valeu !!!',
      whyEs: 'Palabras: lavar ≠ lava ≠ larva; el oído pega formiga lava-pé; ¡Valeu !!!',
      suggestedSlug: 'inspecao-palavra-lavar',
      doneHref: H.lavar,
      seriesHint: 'palavras-origem',
      sources: [H.lava, H.larva, H.lavaPe],
      notes: 'Cap. 28 — corte lava/larva/lava-pé.'
    }
  });
  upsertSug(sug, {
    id: 'palavra-lava',
    entry: {
      id: 'palavra-lava',
      title: 'Lava — o rio do vulcão',
      titleEn: 'Lava — the volcano’s river',
      titleEs: 'Lava — el río del volcán',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: lava ≠ lavar ≠ larva; larva de vulcão = lapso; Valeu !!!',
      whyEn: 'Words: lava ≠ lavar ≠ larva; larva de vulcão = slip; Valeu !!!',
      whyEs: 'Palabras: lava ≠ lavar ≠ larva; larva de vulcão = lapsus; ¡Valeu !!!',
      suggestedSlug: 'inspecao-palavra-lava',
      doneHref: H.lava,
      seriesHint: 'palavras-origem',
      sources: ['https://pt.wiktionary.org/wiki/lava', H.lavar, H.larva],
      notes: 'Rocha fundida; via lavāre desacreditada.'
    }
  });
  upsertSug(sug, {
    id: 'palavra-larva',
    entry: {
      id: 'palavra-larva',
      title: 'Larva — o jovem do inseto',
      titleEn: 'Larva — the insect’s young',
      titleEs: 'Larva — el joven del insecto',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: larva ≠ lava de vulcão; Valeu !!!',
      whyEn: 'Words: larva ≠ volcanic lava; Valeu !!!',
      whyEs: 'Palabras: larva ≠ lava de volcán; ¡Valeu !!!',
      suggestedSlug: 'inspecao-palavra-larva',
      doneHref: H.larva,
      seriesHint: 'palavras-origem',
      sources: ['https://pt.wiktionary.org/wiki/larva', H.lava, '/posts/post-inspecao-palavra-inseto.html'],
      notes: 'Lat. lārva.'
    }
  });
  upsertSug(sug, {
    id: 'palavra-formiga',
    entry: {
      id: 'palavra-formiga',
      title: 'Formiga — o inseto do chão',
      titleEn: 'Formiga — the ground insect',
      titleEs: 'Formiga — el insecto del suelo',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: formiga (formīca); lava-pé é o caso; ≠ tucandeira; Valeu !!!',
      whyEn: 'Words: formiga (formīca); lava-pé is the case; ≠ tucandeira; Valeu !!!',
      whyEs: 'Palabras: formiga; lava-pé es el caso; ≠ tucandeira; ¡Valeu !!!',
      suggestedSlug: 'inspecao-palavra-formiga',
      doneHref: H.formiga,
      seriesHint: 'palavras-origem',
      sources: ['https://pt.wiktionary.org/wiki/formiga', H.lavaPe, '/posts/post-inspecao-palavra-inseto.html'],
      notes: 'Lemma do inseto.'
    }
  });
  upsertSug(sug, {
    id: 'expressao-formiga-lava-pe',
    entry: {
      id: 'expressao-formiga-lava-pe',
      title: 'Formiga lava-pé — ferroa, não lava',
      titleEn: 'Formiga lava-pé — it stings, it does not wash',
      titleEs: 'Formiga lava-pé — pica, no lava',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: formiga lava-pé (*Solenopsis*) ≠ rito ≠ lava ≠ larva; Valeu !!!',
      whyEn: 'Sayings: fire ant ≠ foot-washing rite ≠ lava ≠ larva; Valeu !!!',
      whyEs: 'Dichos: hormiga de fuego ≠ rito ≠ lava ≠ larva; ¡Valeu !!!',
      suggestedSlug: 'inspecao-expressao-formiga-lava-pe',
      doneHref: H.lavaPe,
      seriesHint: 'expressoes-ditados',
      sources: [H.formiga, H.lavar, H.lava],
      notes: 'Nome popular; sem receita de picada.'
    }
  });

  upsertGuia(
    guia,
    {
      id: 'lavar',
      word: 'Lavar',
      simple: 'Lat. lavāre — mãos e alma; ≠ lava de vulcão ≠ larva ≠ formiga lava-pé; Valeu !!!',
      simpleEn: 'Lat. lavāre — hands and soul; ≠ volcanic lava ≠ larva ≠ fire ant; Valeu !!!',
      simpleEs: 'Lat. lavāre — manos y alma; ≠ lava ≠ larva ≠ hormiga de fuego; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.lavar
    },
    ['agua', 'água']
  );
  upsertGuia(
    guia,
    {
      id: 'lava',
      word: 'lava',
      simple: 'Rocha fundida do vulcão ≠ lavar ≠ larva; larva de vulcão = lapso; Valeu !!!',
      simpleEn: 'Molten rock ≠ lavar ≠ larva; larva de vulcão = slip; Valeu !!!',
      simpleEs: 'Roca fundida ≠ lavar ≠ larva; larva de vulcão = lapsus; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.lava
    },
    ['lavar', 'fogo']
  );
  upsertGuia(
    guia,
    {
      id: 'larva',
      word: 'larva',
      simple: 'Estádio jovem do inseto (lat. lārva) ≠ lava de vulcão; Valeu !!!',
      simpleEn: 'Insect immature stage ≠ volcanic lava; Valeu !!!',
      simpleEs: 'Estadio joven del insecto ≠ lava de volcán; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.larva
    },
    ['lava', 'inseto']
  );
  upsertGuia(
    guia,
    {
      id: 'formiga',
      word: 'formiga',
      simple: 'Lat. formīca — inseto do chão; lava-pé é o caso Solenopsis; Valeu !!!',
      simpleEn: 'Lat. formīca — ant; lava-pé = fire ant case; Valeu !!!',
      simpleEs: 'Lat. formīca — hormiga; lava-pé = caso Solenopsis; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.formiga
    },
    ['larva', 'inseto']
  );
  upsertGuia(
    guia,
    {
      id: 'formiga-lava-pe',
      word: 'formiga lava-pé',
      simple: 'Nome popular de Solenopsis; ferroa o pé ≠ rito de lava-pés ≠ lava de vulcão; Valeu !!!',
      simpleEn: 'Folk name for fire ants; ≠ foot-washing rite ≠ volcanic lava; Valeu !!!',
      simpleEs: 'Nombre popular de Solenopsis; ≠ rito ≠ lava de volcán; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H.lavaPe
    },
    ['formiga', 'lavar']
  );

  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (lavar / lava / larva / formiga)');
  }

  console.log('OK cluster lavar × lava × larva × formiga lava-pé');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
