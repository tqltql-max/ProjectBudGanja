'use strict';

/**
 * Injeta sangue e sucção na série Palavras.
 * Uso: node scripts/upsert-palavra-sangue-succao-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildSanguePost } = require('../lib/sangue-inspecao-post.js');
const { buildSuccaoPost } = require('../lib/succao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

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

async function syncSql(list) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  list.forEach((p) => upsertPost(posts, p));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', list.map((p) => p.slug).join(', '));
}

function patchGlossary(gloss) {
  const sangue =
    '    sangue: { tone: "warm", category: "Vida", mundane: "Fluido vermelho do corpo; também linhagem e génio.", gloss: "Lat. sanguis — fluido da vida, parentesco e temperamento; ≠ água; cruzamento com sucção na sanguessuga; Valeu !!!", href: "/posts/post-inspecao-palavra-sangue.html", en: "blood", es: "sangre", fr: "sang", it: "sangue", de: "Blut", el: "αίμα", la: "sanguis", yo: "ẹ̀jẹ̀", sw: "damu", gez: "däm", nl: "bloed", pl: "krew", ru: "кровь", uk: "кров", zh: "血", ja: "血", ko: "피", ar: "دم", he: "דם", hi: "रक्त", tr: "kan", sv: "blod", da: "blod", no: "blod", fi: "veri", cs: "krev", ro: "sânge", hu: "vér", ca: "sang", gl: "sangue", eu: "odol", gn: "tuguy", qu: "yawar", eo: "sango", vi: "máu", id: "darah", th: "เลือด", hr: "krv", sk: "krv", ga: "fuil", cy: "gwaed", ha: "jini", am: "ደም", fa: "خون", bn: "রক্ত", zu: "igazi" },\n' +
    '    sangria: { gloss: "Bebida e sangria antiga — dois ofícios, um étimo; ver sangue.", href: "/posts/post-inspecao-palavra-sangue.html", en: "sangria / bloodletting", es: "sangría" },\n' +
    '    sanguessuga: { gloss: "Sangue + sugar — composto; elo das fichas sangue e sucção.", href: "/posts/post-inspecao-palavra-sangue.html", en: "leech (blood-sucker)", es: "sanguijuela" },\n';
  const succao =
    '    sucção: { tone: "craft", category: "Gesto", mundane: "Acto de puxar líquido ou ar.", gloss: "Lat. suctio ← sūgere — puxar; ≠ açúcar; primo suco; cruzamento com sangue na sanguessuga; Valeu !!!", href: "/posts/post-inspecao-palavra-succao.html", en: "suction", es: "succión", fr: "succion", it: "suzione", de: "Saugen", el: "αναρρόφηση", la: "suctio", yo: "fà", sw: "kuvuta", gez: "säṭäbä", nl: "zuigen", pl: "ssanie", ru: "всасывание", uk: "всмоктування", zh: "吸", ja: "吸引", ko: "흡인", ar: "شفط", he: "יניקה", hi: "चूषण", tr: "emme", sv: "sugning", da: "sugning", no: "suging", fi: "imu", cs: "sání", ro: "sucțiune", hu: "szívás", ca: "succió", gl: "succión", eu: "xurgatze", gn: "syryry", qu: "ch\'unqay", eo: "suĉado", vi: "hút", id: "hisapan", th: "การดูด", hr: "sisanje", sk: "sanie", ga: "súchán", cy: "sugno", ha: "tsotsa", am: "መምጠጥ", fa: "مکش", bn: "চোষণ", zu: "ukuncela" },\n' +
    '    succao: { gloss: "Grafia sem cedilha de sucção — ver ficha.", href: "/posts/post-inspecao-palavra-succao.html", en: "suction (unaccented)", es: "succión" },\n' +
    '    sucçao: { gloss: "Gatilho tipográfico → sucção.", href: "/posts/post-inspecao-palavra-succao.html", en: "see sucção", es: "ver sucção" },\n';

  if (/    sangue:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    sangue:\s*\{[\s\S]*?\},/, sangue.split('\n')[0] + ',');
  } else if (/    selvagem:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    selvagem:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + sangue);
  } else if (/    risco:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    risco:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + sangue);
  } else {
    console.warn('Aviso: glossário — ponto sangue não encontrado');
  }

  if (/    sucção:\s*\{/.test(gloss) || /    succao:\s*\{/.test(gloss)) {
    /* keep */
  } else if (/    sangue:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    sangue:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + succao);
  } else {
    console.warn('Aviso: glossário — ponto sucção não encontrado');
  }
  return gloss;
}

async function main() {
  for (const script of ['generate-sangue-palavra-cover.js', 'generate-succao-palavra-cover.js']) {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  }

  const list = [stampFiles(buildSanguePost()), stampFiles(buildSuccaoPost())];
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  await writeJsonRetry(POSTS_FILE, posts);

  list.forEach((p) => {
    try {
      writeHtml(p);
    } catch (e) {
      console.warn('Aviso HTML', p.slug, e.message);
    }
  });

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(items, {
      id: 'palavra-sangue',
      title: 'Sangue — fluido, linhagem, elo com sucção',
      titleEn: 'Sangue — fluid, lineage, link to sucção',
      titleEs: 'Sangue — fluido, linaje, vínculo con sucção',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: sangue ← sanguis. Fluido da vida, parentesco e génio. Cruzamento com sucção na sanguessuga.',
      whyEn: 'Words: sangue ← sanguis. Fluid of life, kinship and temper. Crosses sucção at sanguessuga.',
      whyEs: 'Palabras: sangue ← sanguis. Fluido de la vida, parentesco y genio. Cruza sucção en la sanguijuela.',
      suggestedSlug: 'inspecao-palavra-sangue',
      doneHref: '/posts/post-inspecao-palavra-sangue.html',
      seriesHint: 'palavras-origem',
      sources: ['https://pt.wiktionary.org/wiki/sangue', '/posts/post-inspecao-palavra-succao.html'],
      notes: 'Cap. ' + list[0].seriesOrder + ' — par sucção.'
    });
    upsertItem(items, {
      id: 'palavra-succao',
      title: 'Sucção — puxar; ≠ açúcar; elo com sangue',
      titleEn: 'Sucção — drawing in; ≠ sugar; link to sangue',
      titleEs: 'Sucção — pujar; ≠ azúcar; vínculo con sangue',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: sucção ← suctio / sūgere. Gatilho sucçao. ≠ açúcar. Cruzamento com sangue na sanguessuga.',
      whyEn: 'Words: sucção ← suctio / sūgere. Trigger sucçao. ≠ sugar. Crosses sangue at sanguessuga.',
      whyEs: 'Palabras: sucção ← suctio / sūgere. Gatillo sucçao. ≠ azúcar. Cruza sangue en la sanguijuela.',
      suggestedSlug: 'inspecao-palavra-succao',
      doneHref: '/posts/post-inspecao-palavra-succao.html',
      seriesHint: 'palavras-origem',
      sources: ['https://pt.wiktionary.org/wiki/suc%C3%A7%C3%A3o', '/posts/post-inspecao-palavra-sangue.html'],
      notes: 'Cap. ' + list[1].seriesOrder + ' — par sangue.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (sangue · sucção)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'sangue',
        word: 'sangue',
        simple:
          'Lat. sanguis — fluido da vida, parentesco e génio. ≠ água. Cruzamento com sucção na sanguessuga. Valeu !!!',
        simpleEn:
          'Lat. sanguis — fluid of life, kinship and temper. ≠ water. Crosses sucção at the leech-word. Valeu !!!',
        simpleEs:
          'Lat. sanguis — fluido de la vida, parentesco y genio. ≠ agua. Cruza sucção en la sanguijuela. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-palavra-sangue.html'
      },
      ['selvagem', 'risco', 'respeito']
    );
    upsertItem(
      items,
      {
        id: 'succao',
        word: 'sucção',
        simple:
          'Lat. suctio ← sūgere — puxar. ≠ açúcar. Primo suco. Cruzamento com sangue na sanguessuga. Valeu !!!',
        simpleEn:
          'Lat. suctio ← sūgere — to draw in. ≠ sugar. Cousin suco. Crosses sangue at the leech-word. Valeu !!!',
        simpleEs:
          'Lat. suctio ← sūgere — pujar. ≠ azúcar. Primo suco. Cruza sangue en la sanguijuela. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-inspecao-palavra-succao.html'
      },
      ['sangue', 'sugestao']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (sangue · sucção)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (sangue · sucção)');
    }
  }

  try {
    await syncSql(list);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  list.forEach((p) => console.log('OK Cap.', p.seriesOrder, p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
