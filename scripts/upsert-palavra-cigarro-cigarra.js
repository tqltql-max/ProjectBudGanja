'use strict';

/**
 * Injeta cigarro ≠ cigarra e reconstrói inseto / papel×tabaco.
 * Uso: node scripts/upsert-palavra-cigarro-cigarra.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildCigarroPost } = require('../lib/cigarro-inspecao-post.js');
const { buildCigarraPost } = require('../lib/cigarra-inspecao-post.js');
const { buildInsetoPost } = require('../lib/inseto-inspecao-post.js');
const { buildPapelEnrolarTabacoPost } = require('../lib/papel-enrolar-tabaco-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const H_CIGARRO = '/posts/post-inspecao-palavra-cigarro.html';
const H_CIGARRA = '/posts/post-inspecao-palavra-cigarra.html';
const H_ORELHA = '/posts/post-inspecao-palavra-orelha.html';

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

function patchGlossary(gloss) {
  const cigarroBlock =
    '    cigarro: { gloss: "BR = cigarette industrial ≠ cigarra (inseto) ≠ charuto; étimo disputado; a orelha cola; Valeu !!!", href: "' +
    H_CIGARRO +
    '", en: "cigarette (BR cigarro)", es: "cigarrillo" },\n' +
    '    cigarra: { gloss: "Lat. cicada — inseto do canto ≠ cigarro; inseito → inseto; Valeu !!!", href: "' +
    H_CIGARRA +
    '", en: "cicada", es: "cigarra / chicharra" },\n' +
    '    inseito: { gloss: "Lapso de inseto — ver inseto / cigarra.", href: "' +
    H_CIGARRA +
    '", en: "slip of inseto", es: "lapsus de inseto" },\n';

  if (!/    cigarro:\s*\{/.test(gloss)) {
    const afterTabaco = insertAfterKey(gloss, 'tabaco', cigarroBlock);
    if (afterTabaco) gloss = afterTabaco;
    else {
      const afterInseto = insertAfterKey(gloss, 'inseto', cigarroBlock);
      if (afterInseto) gloss = afterInseto;
      else console.warn('Aviso: glossário — cigarro/cigarra não inseridos');
    }
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
  for (const script of ['generate-cigarro-cover.js', 'generate-cigarra-cover.js']) {
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
    stampFiles(buildCigarroPost()),
    stampFiles(buildCigarraPost()),
    stampFiles(buildInsetoPost()),
    stampFiles(buildPapelEnrolarTabacoPost())
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

  const cigarro = built[0];
  const cigarra = built[1];

  upsertSug(sug, {
    id: 'palavra-cigarro',
    entry: {
      id: 'palavra-cigarro',
      title: 'Cigarro — o rolo, não a cigarra',
      titleEn: 'Cigarro — the roll, not the cicada',
      titleEs: 'Cigarro — el rollo, no la cigarra',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: cigarro (BR cigarette) ≠ cigarra ≠ charuto; a orelha cola; Valeu !!!',
      whyEn: 'Words: cigarro (BR cigarette) ≠ cigarra ≠ cigar; ear glue; Valeu !!!',
      whyEs: 'Palabras: cigarro (BR cigarrillo) ≠ cigarra ≠ puro; pegamento de oído; ¡Valeu !!!',
      suggestedSlug: cigarro.slug,
      doneHref: H_CIGARRO,
      seriesHint: 'palavras-origem',
      sources: [cigarro.sourceUrl, H_CIGARRA, H_ORELHA],
      notes: 'Cap. ' + cigarro.seriesOrder + ' — nomear ≠ acender.'
    }
  });
  upsertSug(sug, {
    id: 'palavra-cigarra',
    entry: {
      id: 'palavra-cigarra',
      title: 'Cigarra — o inseto que canta',
      titleEn: 'Cigarra — the insect that sings',
      titleEs: 'Cigarra — el insecto que canta',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: cigarra (lat. cicada) ≠ cigarro; inseito → inseto; Valeu !!!',
      whyEn: 'Words: cigarra (cicada) ≠ cigarro; inseito → inseto; Valeu !!!',
      whyEs: 'Palabras: cigarra (insecto) ≠ cigarro; inseito → inseto; ¡Valeu !!!',
      suggestedSlug: cigarra.slug,
      doneHref: H_CIGARRA,
      seriesHint: 'palavras-origem',
      sources: [cigarra.sourceUrl, H_CIGARRO, '/posts/post-inspecao-palavra-inseto.html'],
      notes: 'Cap. ' + cigarra.seriesOrder + ' — canto ≠ fumo.'
    }
  });

  upsertGuia(
    guia,
    {
      id: 'cigarro',
      word: 'cigarro',
      simple: 'BR = cigarette industrial ≠ cigarra ≠ charuto; a orelha cola; nomear ≠ fumar; Valeu !!!',
      simpleEn: 'BR cigarette ≠ cicada ≠ cigar; ear glue; naming ≠ smoking; Valeu !!!',
      simpleEs: 'BR cigarrillo ≠ cigarra ≠ puro; pegamento de oído; nombrar ≠ fumar; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H_CIGARRO
    },
    ['tabaco', 'papel de enrolar']
  );
  upsertGuia(
    guia,
    {
      id: 'cigarra',
      word: 'cigarra',
      simple: 'Inseto (lat. cicada) que canta ≠ cigarro; inseito → inseto; Valeu !!!',
      simpleEn: 'Cicada (Lat. cicada) ≠ cigarro; inseito → inseto; Valeu !!!',
      simpleEs: 'Insecto (lat. cicada) ≠ cigarro; inseito → inseto; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: H_CIGARRA
    },
    ['cigarro', 'inseto']
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
    console.log('Glossário actualizado (cigarro / cigarra)');
  }

  console.log('OK:', cigarro.title, '·', cigarra.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
