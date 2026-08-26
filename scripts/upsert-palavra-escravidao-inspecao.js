'use strict';

/**
 * Injeta palavra «escravidão» na série Palavras.
 * Uso: node scripts/upsert-palavra-escravidao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildEscravidaoPost } = require('../lib/escravidao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-palavra-escravidao.html';

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
  const entryLine =
    '    escravidão: { tone: "caution", category: "Léxico", mundane: "Sistema que trata pessoas como propriedade; no BR, engenhos e tráfico atlântico.", gloss: "Escravo + -idão ← lat. med. sclavus — cativeiro que a lei permitiu; cana/diáspora; reconhecimento noutra sala; Valeu !!!", href: "/posts/post-inspecao-palavra-escravidao.html", en: "slavery", es: "esclavitud", fr: "esclavage", it: "schiavitù", de: "Sklaverei", el: "δουλεία", la: "servitus / sclavus", yo: "ẹrúṣì", sw: "utumwa", gez: "bariyyət", nl: "slavernij", pl: "niewolnictwo", ru: "рабство", uk: "рабство", zh: "奴隶制", ja: "奴隷制", ko: "노예제", ar: "عبودية", he: "עבדות", hi: "दासता", tr: "kölelik", sv: "slaveri", da: "slaveri", no: "slaveri", fi: "orjuus", cs: "otroctví", ro: "sclavie", hu: "rabszolgaság", ca: "esclavatge", gl: "escravitude", eu: "esklabotza", gn: "tembiguái reko", qu: "camayoc kay", eo: "sklaveco", vi: "chế độ nô lệ", id: "perbudakan", th: "ทาส", hr: "ropstvo", sk: "otroctvo", ga: "sclábhaíocht", cy: "caethwasiaeth", ha: "bauta", am: "ባርነት", fa: "بردگی", bn: "দাসত্ব", zu: "ubugqila" },';
  const aliases =
    '    escravidao: { gloss: "Grafia sem acento de escravidão — ver ficha.", href: "/posts/post-inspecao-palavra-escravidao.html", en: "slavery", es: "esclavitud" },\n' +
    '    escravo: { gloss: "Pessoa escravizada — raiz de escravidão; não usar como piada.", href: "/posts/post-inspecao-palavra-escravidao.html", en: "enslaved person / slave (historical)", es: "esclavo" },\n';

  if (/escravidão:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    escravidão:\s*\{[\s\S]*?\},/, entryLine);
  } else {
    const reGratidao = /(    gratidão:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reGratidao.test(gloss)) {
      gloss = gloss.replace(reGratidao, '$1' + entryLine + '\n');
    } else {
      console.warn('Aviso: glossário — ponto de inserção não encontrado (escravidão)');
      return gloss;
    }
  }
  if (!/escravidao:\s*\{/.test(gloss)) {
    const reMain = /(    escravidão:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reMain.test(gloss)) gloss = gloss.replace(reMain, '$1' + aliases);
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-escravidao-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildEscravidaoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-escravidao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Escravidão — o nome do cativeiro',
      titleEn: 'Escravidão — the name of bondage',
      titleEs: 'Escravidão — el nombre del cautiverio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: escravidão (sclavus + -idão) — cativeiro legalizado, cana, diáspora; reconhecimento em sala à parte; Valeu !!!',
      whyEn: 'Words: escravidão (sclavus + -idão) — legalized bondage, cane, diaspora; thanks in another room; Valeu !!!',
      whyEs: 'Palabras: escravidão (sclavus + -idão) — cautiverio legalizado, caña, diáspora; reconocimiento en otra sala; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-gratidao.html',
        '/posts/post-inspecao-expressao-muito-obrigado.html',
        '/posts/post-inspecao-derivado-cana-de-acucar.html',
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — dois eixos, duas frases; lei da época ≠ art. 149.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-escravidao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'escravidao',
      word: 'escravidão',
      simple:
        'Escravo + -idão ← sclavus — cativeiro que a lei permitiu; engenho/cana; reconhecimento noutra sala; Valeu !!!',
      simpleEn:
        'Escravo + -idão ← sclavus — bondage the law allowed; cane mills; thanks in another room; Valeu !!!',
      simpleEs:
        'Escravo + -idão ← sclavus — cautiverio que la ley permitió; ingenio/caña; reconocimiento en otra sala; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'escravidão');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'gratidao' || x.id === 'muito-obrigado');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (escravidão)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(glossPath, next);
      console.log('Glossário actualizado (escravidão)');
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
