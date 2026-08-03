'use strict';

/**
 * Injeta palavra «sempre» na série Palavras.
 * Uso: node scripts/upsert-palavra-sempre-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSemprePost } = require('../lib/sempre-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  const max = orders.length ? Math.max(...orders) : 0;
  return max + 1;
}

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

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-sempre');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildSemprePost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-sempre';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Sempre — duração, hábito e Faça o melhor!',
      titleEn: 'Sempre — duration, habit and Do your best!',
      titleEs: 'Sempre — duración, hábito y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: sempre (lat. semper) — duração × hábito × promessa; elos já/prosseguir/caminho; Faça o melhor!',
      whyEn: 'Words: sempre (Lat. semper) — duration × habit × promise; links já/prosseguir/caminho; Do your best!',
      whyEs: 'Palabras: sempre (lat. semper) — duración × hábito × promesa; vínculos já/prosseguir/caminho; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-ja.html',
        '/posts/post-inspecao-palavra-prosseguir.html',
        '/posts/post-inspecao-palavra-caminho.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — par com prosseguir.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-sempre)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'sempre',
      word: 'sempre',
      simple:
        'Lat. semper — duração × hábito × promessa BR; elos já/prosseguir/caminho; Faça o melhor sempre que puder.',
      simpleEn:
        'Lat. semper — duration × habit × promise BR; links já/prosseguir/caminho; Do your best whenever you can.',
      simpleEs:
        'Lat. semper — duración × hábito × promesa BR; vínculos já/prosseguir/caminho; Haz lo mejor siempre que puedas.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'sempre');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'ja' || x.id === 'passar' || x.id === 'caminho');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (sempre)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    sempre: { gloss: "Lat. semper — duração × hábito × promessa BR; elos já/prosseguir/caminho; Faça o melhor!", href: "/posts/post-inspecao-palavra-sempre.html", en: "always", es: "siempre", fr: "toujours", it: "sempre", de: "immer", el: "panta", la: "semper", yo: "nigbagbogbo", sw: "daima", gez: "zäläalom", nl: "altijd", pl: "zawsze", ru: "vsegda", uk: "zavzhdy", zh: "always", ja: "itsumo", ko: "hangsang", ar: "daiman", he: "tamid", hi: "hamesha", tr: "her zaman", sv: "alltid", da: "altid", no: "alltid", fi: "aina", cs: "vzdy", ro: "mereu", hu: "mindig", ca: "sempre", gl: "sempre", eu: "beti", gn: "meme gua", qu: "wiñay", eo: "cxiam", vi: "luon", id: "selalu", th: "always", hr: "uvijek", sk: "vzdy", ga: "i gconai", cy: "bob amser", ha: "kullum", am: "hulun gize", fa: "hamishe", bn: "sada", zu: "njalo" },';
    if (/sempre:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    sempre:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (sempre · existente)');
    } else {
      const reJa = /(já:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const rePassar = /(passar:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reJa.test(gloss)) {
        gloss = gloss.replace(reJa, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (sempre · após já)');
      } else if (rePassar.test(gloss)) {
        gloss = gloss.replace(rePassar, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (sempre · após passar)');
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

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
