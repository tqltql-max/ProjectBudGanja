'use strict';

/**
 * Injeta palavra «preguiça» na série Palavras.
 * Uso: node scripts/upsert-palavra-preguica-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildPreguicaPost } = require('../lib/preguica-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-palavra-preguica.html';

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
    '    preguiça: { gloss: "Lat. pigritia — relutância, pecado e bicho-preguiça; descanso ≠ vício; elo bode; Valeu !!!", href: "/posts/post-inspecao-palavra-preguica.html", en: "laziness / sloth", es: "pereza / perezoso", fr: "paresse / paresseux", it: "pigrizia / bradipo", de: "Faulheit / Faultier", el: "οκνηρία", la: "pigritia", yo: "ọlẹ", sw: "uvivu", gez: "sənf", nl: "luiheid / luiaard", pl: "lenistwo / leniwiec", ru: "лень / ленивец", uk: "лінь / лінивець", zh: "懒惰 / 树懒", ja: "怠惰 / ナマケモノ", ko: "게으름 / 나무늘보", ar: "كسل / كسلان", he: "עצלות / עצלן", hi: "आलस्य", tr: "tembellik / tembel hayvan", sv: "lättja / sengångare", da: "dovenskab / dovendyr", no: "latskap / dovendyr", fi: "laiskuus / laiskiainen", cs: "lenost / lenochod", ro: "lene / leneș", hu: "lustaság / lajhár", ca: "mandra / peresós", gl: "preguiza", eu: "nagia", gn: "tekyje", qu: "qilla", eo: "mallaboremo / bradipo", vi: "lười / con lười", id: "malas / kungkang", th: "ความขี้เกียจ", hr: "lijenost / ljenjivac", sk: "lenivosť / leňoch", ga: "leisce", cy: "diogi", ha: "lalaci", am: "ስንፍና", fa: "تنبلی / تنبل", bn: "অলসতা", zu: "ubuvila" },';
  const aliases =
    '    preguica: { gloss: "Grafia sem cedilha de preguiça — ver ficha.", href: "/posts/post-inspecao-palavra-preguica.html", en: "laziness / sloth", es: "pereza" },\n' +
    '    "bicho-preguiça": { gloss: "O mamífero Folivora — a preguiça-animal; ver ficha preguiça (≠ pecado).", href: "/posts/post-inspecao-palavra-preguica.html", en: "sloth (animal)", es: "perezoso (animal)" },\n' +
    '    "bicho preguiça": { gloss: "Grafia espaçada de bicho-preguiça — ver ficha preguiça.", href: "/posts/post-inspecao-palavra-preguica.html", en: "sloth (animal)", es: "perezoso (animal)" },\n';

  if (/preguiça:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    preguiça:\s*\{[\s\S]*?\},/, entryLine);
  } else {
    const reSelvagem = /(    selvagem:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    const reAnimal = /(    animal:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    const reNap = /(    nap:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reSelvagem.test(gloss)) {
      gloss = gloss.replace(reSelvagem, '$1' + entryLine + '\n');
    } else if (reAnimal.test(gloss)) {
      gloss = gloss.replace(reAnimal, '$1' + entryLine + '\n');
    } else if (reNap.test(gloss)) {
      gloss = gloss.replace(reNap, '$1' + entryLine + '\n');
    } else {
      console.warn('Aviso: glossário — ponto de inserção não encontrado (preguiça)');
      return gloss;
    }
  }
  if (!/preguica:\s*\{/.test(gloss)) {
    const reMain = /(    preguiça:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reMain.test(gloss)) gloss = gloss.replace(reMain, '$1' + aliases);
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-preguica-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildPreguicaPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-preguica';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Preguiça — o estado, o animal e o que não é descanso',
      titleEn: 'Preguiça — the state, the animal, and what rest is not',
      titleEs: 'Preguiça — el estado, el animal y lo que no es descanso',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: preguiça (lat. pigritia) — relutância, pecado e bicho-preguiça; descanso ≠ vício; elo bode; Valeu !!!',
      whyEn: 'Words: preguiça (Lat. pigritia) — reluctance, sin and the sloth; rest ≠ vice; link bode; Valeu !!!',
      whyEs: 'Palabras: preguiça (lat. pigritia) — renuencia, pecado y perezoso; descanso ≠ vicio; vínculo bode; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Pregui%C3%A7a',
        '/posts/post-inspecao-palavra-bode.html',
        '/posts/post-inspecao-palavra-nap.html',
        '/posts/post-inspecao-palavra-animal.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — pigritia; animal ≠ pecado; nap/colchão ≠ esta palavra; par com bode.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-preguica)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'preguica',
      word: 'preguiça',
      simple:
        'Lat. pigritia — relutância, pecado capital e bicho-preguiça; descanso ≠ vício; elo bode; Valeu !!!',
      simpleEn:
        'Lat. pigritia — reluctance, capital sin and the sloth; rest ≠ vice; link bode; Valeu !!!',
      simpleEs:
        'Lat. pigritia — renuencia, pecado capital y perezoso; descanso ≠ vicio; vínculo bode; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'preguiça' || x.word === 'preguica');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'nap' || x.id === 'bode' || x.id === 'animal' || x.id === 'pato'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (preguiça)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(glossPath, next);
      console.log('Glossário actualizado (preguiça)');
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
