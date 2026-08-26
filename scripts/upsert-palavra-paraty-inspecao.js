'use strict';

/**
 * Injeta a cidade / topónimo Paraty na série Palavras.
 * Uso: node scripts/upsert-palavra-paraty-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildParatyPost } = require('../lib/paraty-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-paraty.html';

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

function patchGlossary(gloss) {
  const block =
    '    paraty: { tone: "craft", category: "Lugar", mundane: "Município RJ (Costa Verde); grafia oficial com y.", gloss: "Tupi parati\'y — rio dos paratis (peixe); gatilho Parati; Paratii = veleiro Amyr; ≠ Paraguai; Valeu !!!", href: "/posts/post-inspecao-palavra-paraty.html", en: "Paraty", es: "Paraty", fr: "Paraty", it: "Paraty", de: "Paraty", el: "Παρατί", la: "Paraty", yo: "Paraty", sw: "Paraty", gez: "Paraty", nl: "Paraty", pl: "Paraty", ru: "Парати", uk: "Параті", zh: "帕拉蒂", ja: "パラチー", ko: "파라티", ar: "باراتي", he: "פאראטי", hi: "पाराती", tr: "Paraty", sv: "Paraty", da: "Paraty", no: "Paraty", fi: "Paraty", cs: "Paraty", ro: "Paraty", hu: "Paraty", ca: "Paraty", gl: "Paraty", eu: "Paraty", gn: "Paraty", qu: "Paraty", eo: "Paraty", vi: "Paraty", id: "Paraty", th: "ปาราตี", hr: "Paraty", sk: "Paraty", ga: "Paraty", cy: "Paraty", ha: "Paraty", am: "ፓራቲ", fa: "پاراتی", bn: "পারাটি", zu: "iParaty" },\n' +
    '    parati: { gloss: "Gatilho / grafia 1943 de Paraty; também o peixe do étimo (rio dos paratis).", href: "/posts/post-inspecao-palavra-paraty.html", en: "Parati (spelling / fish)", es: "Parati" },\n' +
    '    paratii: { gloss: "Veleiro de Amyr Klink — homenagem a Paraty, não o município.", href: "/posts/post-inspecao-palavra-paraty.html", en: "Paratii (yacht)", es: "Paratii (velero)" },\n' +
    '    paratiense: { gloss: "Gentílico de Paraty — com i; a cidade leva y.", href: "/posts/post-inspecao-palavra-paraty.html", en: "of Paraty", es: "paratiense" },\n';

  if (/    paraty:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    paraty:\s*\{[\s\S]*?\},/, block.split('\n')[0] + ',');
  } else if (/    paraguacu:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    paraguacu:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else if (/    paraguai:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    paraguai:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else {
    console.warn('Aviso: glossário — ponto Paraguai/Paraguaçu não encontrado');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-paraty-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildParatyPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-paraty';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Paraty — rio dos paratis, a cidade, gatilho Parati',
      titleEn: 'Paraty — river of the paratis, the town, trigger Parati',
      titleEs: 'Paraty — río de los paratis, la ciudad, gatillo Parati',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Cidade: Paraty (RJ). Tupi parati\'y = rio dos paratis. Parati gatilho; Paratii veleiro Amyr. ≠ Paraguai. Valeu !!!',
      whyEn: 'City: Paraty (RJ). Tupi parati\'y = river of the paratis. Parati trigger; Paratii Amyr yacht. ≠ Paraguay. Valeu !!!',
      whyEs: 'Ciudad: Paraty (RJ). Tupí parati\'y = río de los paratis. Parati gatillo; Paratii velero Amyr. ≠ Paraguay. ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-tamara-klink.html',
        '/posts/post-inspecao-amyr-klink.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — topónimo tupi; grafia y oficial.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-paraty)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'paraty',
      word: 'Paraty',
      simple:
        'Tupi parati\'y — rio dos paratis. Cidade RJ. Gatilho Parati. Paratii = veleiro Amyr. ≠ Paraguai. Valeu !!!',
      simpleEn:
        'Tupi parati\'y — river of the paratis. Town in RJ. Trigger Parati. Paratii = Amyr’s yacht. ≠ Paraguay. Valeu !!!',
      simpleEs:
        'Tupí parati\'y — río de los paratis. Ciudad RJ. Gatillo Parati. Paratii = velero de Amyr. ≠ Paraguay. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'paraguacu' || x.id === 'paraguai' || x.id === 'groenlandia');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (Paraty)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (Paraty)');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
