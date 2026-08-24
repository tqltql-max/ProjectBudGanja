'use strict';

/**
 * Injeta «tecnologia» + «HD escravo» na série Palavras e no catálogo /tecnologia/.
 * Uso: node scripts/upsert-tecnologia-hd-escravo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const tech = require('../lib/tecnologia-inspecao-post.js');
const hd = require('../lib/hd-escravo-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF_TECH = '/posts/post-inspecao-palavra-tecnologia.html';
const HREF_HD = '/posts/post-inspecao-palavra-hd-escravo.html';

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
  const techLine =
    '    tecnologia: { tone: "craft", category: "Léxico", mundane: "Ofício dos aparelhos e métodos — tékhnē + lógos; lema do catálogo Tecnologia.", gloss: "Gr. tékhnē + lógos; hub /tecnologia/; HD escravo noutra sala; ≠ ídolo ≠ escravidão; Valeu !!!", href: "' +
    HREF_TECH +
    '", en: "technology", es: "tecnología", fr: "technologie", it: "tecnologia", de: "Technologie", el: "τεχνολογία", la: "technologia", yo: "ìmọ̀-ẹ̀rọ", sw: "teknolojia", gez: "ቴክኖሎጂ", nl: "technologie", pl: "technologia", ru: "технология", uk: "технологія", zh: "技术", ja: "技術", ko: "기술", ar: "تكنولوجيا", he: "טכנולוגיה", hi: "प्रौद्योगिकी", tr: "teknoloji", sv: "teknologi", da: "teknologi", no: "teknologi", fi: "teknologia", cs: "technologie", ro: "tehnologie", hu: "technológia", ca: "tecnologia", gl: "tecnoloxía", eu: "teknologia", gn: "tembikuaaty", qu: "allin yachay", eo: "teknologio", vi: "công nghệ", id: "teknologi", th: "เทคโนโลยี", hr: "tehnologija", sk: "technológia", ga: "teicneolaíocht", cy: "technoleg", ha: "fasaha", am: "ቴክኖሎጂ", fa: "فناوری", bn: "প্রযুক্তি", zu: "ubuchwepheshe" },\n';
  const hdLine =
    '    "hd escravo": { tone: "caution", category: "Léxico", mundane: "Jumper ATA/IDE do segundo disco no mesmo cabo — Device 1; não é metáfora de pessoas.", gloss: "Slave jumper; smash slayr; mestre/escravo de manual; ≠ escravidão ≠ SATA; Valeu !!!", href: "' +
    HREF_HD +
    '", en: "HD slave (ATA jumper)", es: "HD esclavo (jumper ATA)", fr: "esclave IDE", it: "slave IDE", de: "IDE-Slave", el: "slave IDE", la: "servus (jargon)", nl: "IDE-slave", pl: "slave IDE", ru: "slave IDE", zh: "IDE从盘", ja: "スレーブ（IDE）", ko: "IDE 슬레이브", ar: "عبد IDE" },\n';
  gloss = replaceOrInsertAfter(gloss, 'tecnologia', techLine, 'objetos');
  gloss = replaceOrInsertAfter(gloss, '"hd escravo"', hdLine, 'tecnologia');
  const aliases = [
    [
      'tech',
      '    tech: { gloss: "Aparo inglês de technology — ver tecnologia.", href: "' +
        HREF_TECH +
        '", en: "tech", es: "tech" },\n'
    ],
    [
      'slave',
      '    slave: { gloss: "Inglês do jumper ATA Device 1 — ver HD escravo; ≠ escravidão.", href: "' +
        HREF_HD +
        '", en: "slave (jumper)", es: "slave (jumper)" },\n'
    ],
    [
      'slayr',
      '    slayr: { gloss: "Smash de campo para slave (HD jumper) — ver HD escravo.", href: "' +
        HREF_HD +
        '", en: "slayr (slip for slave)", es: "slayr (lapso de slave)" },\n'
    ],
    [
      '"disco rígido"',
      '    "disco rígido": { gloss: "HDD — o objecto; o jumper mestre/escravo é HD escravo.", href: "' +
        HREF_HD +
        '", en: "hard disk", es: "disco duro" },\n'
    ],
    [
      'hdd',
      '    hdd: { gloss: "Hard Disk Drive — ver HD escravo e tecnologia.", href: "' +
        HREF_HD +
        '", en: "HDD", es: "HDD" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'tecnologia');
  }
  return gloss;
}

async function syncSql(postsToWrite) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  postsToWrite.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado: tecnologia + hd-escravo');
}

async function main() {
  [
    'generate-tecnologia-palavra-cover.js',
    'generate-hd-escravo-palavra-cover.js'
  ].forEach((script) => {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa', script + ':', e.message);
    }
  });

  const postTech = stampFiles(tech.buildTecnologiaPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, postTech);
  await writeJsonRetry(POSTS_FILE, posts);

  const postHd = stampFiles(hd.buildHdEscravoPost());
  if (Number(postHd.seriesOrder) === Number(postTech.seriesOrder)) {
    postHd.seriesOrder = Number(postTech.seriesOrder) + 1;
  }
  upsertPost(posts, postHd);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(postTech);
    writeHtml(postHd);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, postTech);
  writeI18n(i18n, postHd);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-tecnologia',
        title: 'Tecnologia — tékhnē + lógos; lema do catálogo',
        titleEn: 'Tecnologia — tékhnē + lógos; catalog lemma',
        titleEs: 'Tecnologia — tékhnē + lógos; lema del catálogo',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: tecnologia (tékhnē + lógos) — ofício dos aparelhos; página /tecnologia/; HD escravo noutra sala; Valeu !!!',
        whyEn: 'Words: tecnologia — craft of devices; /tecnologia/ hub; HD slave in another room.',
        whyEs: 'Palabras: tecnologia — oficio de aparatos; hub /tecnologia/; HD esclavo en otra sala.',
        suggestedSlug: postTech.slug,
        doneHref: HREF_TECH,
        seriesHint: 'palavras-origem',
        sources: [HREF_TECH, '/tecnologia/', HREF_HD, tech.WIKT, '/posts/post-inspecao-palavra-valeu.html'],
        notes: 'Cap. ' + postTech.seriesOrder + ' — lema do catálogo Tecnologia.'
      },
      ['palavra-objetos', 'palavra-skill']
    );
    upsertItem(
      items,
      {
        id: 'palavra-hd-escravo',
        title: 'HD escravo (slave) — jumper ATA; slayr',
        titleEn: 'HD slave — ATA jumper; slayr',
        titleEs: 'HD esclavo — jumper ATA; slayr',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: HD escravo = jumper IDE Device 1; smash slayr; ≠ escravidão humana ≠ SATA; Valeu !!!',
        whyEn: 'Words: HD escravo = IDE jumper Device 1; smash slayr; ≠ slavery ≠ SATA.',
        whyEs: 'Palabras: HD escravo = jumper IDE Device 1; smash slayr; ≠ esclavitud ≠ SATA.',
        suggestedSlug: postHd.slug,
        doneHref: HREF_HD,
        seriesHint: 'palavras-origem',
        sources: [
          HREF_HD,
          '/tecnologia/',
          hd.WIKI_MS,
          '/posts/post-inspecao-palavra-escravidao.html',
          HREF_TECH,
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + postHd.seriesOrder + ' — jumper histórico; salas cortadas.'
      },
      ['palavra-tecnologia', 'palavra-escravidao']
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
        id: 'tecnologia',
        word: 'tecnologia',
        simple:
          'Gr. tékhnē + lógos — ofício dos aparelhos e métodos. Lema do catálogo /tecnologia/. HD escravo noutra sala. Valeu !!!',
        simpleEn:
          'Gr. tékhnē + lógos — craft of devices and methods. Lemma of /tecnologia/. HD slave in another room. Valeu !!!',
        simpleEs:
          'Gr. tékhnē + lógos — oficio de aparatos y métodos. Lema de /tecnologia/. HD esclavo en otra sala. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_TECH
      },
      ['objetos', 'skill']
    );
    upsertItem(
      items,
      {
        id: 'hd-escravo',
        word: 'HD escravo',
        simple:
          'Jumper ATA/IDE Device 1 (slave). Smash slayr. ≠ escravidão humana ≠ SATA. Catálogo /tecnologia/. Valeu !!!',
        simpleEn:
          'ATA/IDE jumper Device 1 (slave). Smash slayr. ≠ human slavery ≠ SATA. Catalog /tecnologia/. Valeu !!!',
        simpleEs:
          'Jumper ATA/IDE Device 1 (slave). Smash slayr. ≠ esclavitud humana ≠ SATA. Catálogo /tecnologia/. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_HD
      },
      ['tecnologia', 'escravidao']
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
      id: 'tecnologia',
      slug: 'tecnologia',
      title: 'Tecnologia',
      titleEn: 'Technology',
      titleEs: 'Tecnología',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o ofício dos aparelhos, sem culto de marca; Valeu !!!',
      teaserEn: 'BudGanja echo — the craft of devices, without a brand cult; Valeu !!!',
      teaserEs: 'Eco BudGanja — el oficio de los aparatos, sin culto de marca; ¡Valeu !!!',
      body: tech.poemPt(),
      bodyEn: tech.poemEn(),
      bodyEs: tech.poemEs(),
      inspectionHref: HREF_TECH,
      tags: ['poesia', 'vida', 'tecnologia', 'tekhne']
    });
    upsertVidaPoem(vida, {
      id: 'hd-escravo',
      slug: 'hd-escravo',
      title: 'HD escravo',
      titleEn: 'HD slave',
      titleEs: 'HD esclavo',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o jumper do disco, sem metáfora de cativeiro; Valeu !!!',
      teaserEn: 'BudGanja echo — the disk jumper, without a bondage metaphor; Valeu !!!',
      teaserEs: 'Eco BudGanja — el jumper del disco, sin metáfora de cautiverio; ¡Valeu !!!',
      body: hd.poemPt(),
      bodyEn: hd.poemEn(),
      bodyEs: hd.poemEs(),
      inspectionHref: HREF_HD,
      tags: ['poesia', 'vida', 'hd', 'slave', 'tecnologia']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poemas Vida actualizados');
  }

  try {
    await syncSql([postTech, postHd]);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', postTech.title, '| Cap.', postTech.seriesOrder);
  console.log('OK:', postHd.title, '| Cap.', postHd.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
