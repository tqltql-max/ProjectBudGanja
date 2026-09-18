'use strict';

/**
 * Injeta palavra «planta» na série Palavras.
 * Uso: node scripts/upsert-palavra-planta-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildPlantaPost } = require('../lib/planta-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
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

function nextFreeSeriesOrder(posts, preferred, selfSlug) {
  const taken = new Set(
    posts
      .filter((p) => p.slug !== selfSlug)
      .map((p) => Number(p.seriesOrder))
      .filter((n) => Number.isFinite(n) && n > 0)
  );
  let n = preferred;
  while (taken.has(n)) n += 1;
  return n;
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

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const post = buildPlantaPost();
  const free = nextFreeSeriesOrder(posts, post.seriesOrder, post.slug);
  if (free !== post.seriesOrder) {
    console.log('seriesOrder ajustado:', post.seriesOrder, '→', free);
    post.seriesOrder = free;
  }

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-planta';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Planta — ser vivo, cultivo e Farmácia Viva',
      titleEn: 'Planta — living being, cultivation and Farmácia Viva',
      titleEs: 'Planta — ser vivo, cultivo y Farmácia Viva',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: planta (lat. planta / plantare) — ser vivo vegetal; plural plantas no hub; cultivo e Farmácia Viva; sem listar espécies.',
      whyEn: 'Words: planta (Lat. planta / plantare) — living vegetal being; plural plantas in hub; cultivation and Farmácia Viva; no species list.',
      whyEs: 'Palabras: planta (lat. planta / plantare) — ser vivo vegetal; plural plantas en el hub; cultivo y Farmácia Viva; sin listar especies.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Planta',
        '/plantas/',
        '/posts/post-inspecao-guia-farmacia-viva.html',
        '/cultivo/',
        '/posts/post-inspecao-palavra-animal.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — planta como conceito; plural plantas no corpo; sem duplicar especies.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-planta)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'planta',
      word: 'planta',
      simple:
        'Lat. planta / plantare — ser vivo vegetal; plural plantas no hub; cultivo e Farmácia Viva; ficha de palavra ≠ lista de espécies.',
      simpleEn:
        'Lat. planta / plantare — living vegetal being; plural plantas in the hub; cultivation and Farmácia Viva; word sheet ≠ species list.',
      simpleEs:
        'Lat. planta / plantare — ser vivo vegetal; plural plantas en el hub; cultivo y Farmácia Viva; ficha de palabra ≠ lista de especies.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'planta');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'plantas' || x.id === 'animal' || x.id === 'simbiose'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }

    const gp = items.findIndex((x) => x.id === 'plantas');
    if (gp >= 0) {
      items[gp] = Object.assign({}, items[gp], {
        simple:
          'Seres vivos do reino vegetal — hub /plantas/; conceito lexical na ficha planta.',
        simpleEn:
          'Living beings of the plant kingdom — /plantas/ hub; lexical concept in the planta sheet.',
        simpleEs:
          'Seres vivos del reino vegetal — hub /plantas/; concepto léxico en la ficha planta.',
        href: items[gp].href || '/plantas/'
      });
    }

    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (planta)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    planta: { gloss: "Lat. planta / plantare — ser vivo vegetal; plural plantas no hub; cultivo e Farmácia Viva; sem listar espécies.", href: "/posts/post-inspecao-palavra-planta.html", en: "plant", es: "planta", fr: "plante", it: "pianta", de: "Pflanze", el: "φυτό", la: "planta", yo: "ewéko", sw: "mmea", gez: "ʿəṣ", nl: "plant", pl: "roślina", ru: "растение", uk: "рослина", zh: "植物", ja: "植物", ko: "식물", ar: "نبات", he: "צמח", hi: "पौधा", tr: "bitki", sv: "växt", da: "plante", no: "plante", fi: "kasvi", cs: "rostlina", ro: "plantă", hu: "növény", ca: "planta", gl: "planta", eu: "landare", gn: "ka\'avo", qu: "qura", eo: "planto", vi: "cay", id: "tanaman", th: "พืช", hr: "biljka", sk: "rastlina", ga: "planda", cy: "planhigyn", ha: "shuka", am: "tekl", fa: "giyah", bn: "গাছ", zu: "isitshalo" },';
    if (/planta:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    planta:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (planta · entrada existente enriquecida)');
    } else {
      const reAnimal = /(animal:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reSimbiose = /(simbiose:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reAnimal.test(gloss)) {
        gloss = gloss.replace(reAnimal, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (planta · após animal)');
      } else if (reSimbiose.test(gloss)) {
        gloss = gloss.replace(reSimbiose, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (planta · após simbiose)');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
      }
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
