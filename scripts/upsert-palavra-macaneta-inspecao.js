'use strict';

/**
 * Injeta palavra «maçaneta» (+ cruzamento gesto/mãos/luz) na série Palavras.
 * Uso: node scripts/upsert-palavra-macaneta-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMacanetaPost } = require('../lib/macaneta-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
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
  const slug = 'inspecao-palavra-macaneta';
  const existing = posts.find((p) => p.slug === slug);
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildMacanetaPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-macaneta';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Maçaneta — torcer/abrir × mãos × porta/janela × luz',
      titleEn: 'Maçaneta — twist/open × hands × door/window × light',
      titleEs: 'Maçaneta — torcer/abrir × manos × puerta/ventana × luz',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Cruzamento: gesto torcer/abrir, mãos E/D, porta/janela, ligar/desligar luz.',
      whyEn: 'Crossing: twist/open gesture, L/R hands, door/window, on/off light.',
      whyEs: 'Cruce: gesto torcer/abrir, manos I/D, puerta/ventana, ligar/desligar luz.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-mao-esquerda-direita.html',
        '/posts/post-inspecao-palavra-interruptor.html',
        '/posts/post-inspecao-palavra-ligar-desligar.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — maçaneta + mapa de cruzamento.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-macaneta)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entries = [
      {
        id: 'macaneta',
        word: 'maçaneta',
        simple:
          'Puxador/fecho da porta — gesto torcer/abrir; elo mãos, porta/janela, interruptor e ligar/desligar.',
        simpleEn:
          'Doorknob/handle — twist/open gesture; links hands, door/window, switch, on/off.',
        simpleEs:
          'Manilla/pomo — gesto torcer/abrir; vínculo manos, puerta/ventana, interruptor, ligar/desligar.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      {
        id: 'porta',
        word: 'porta',
        simple:
          'Limiar para passar — elo maçaneta, caminho, passar; cruzamento com janela e luz.',
        simpleEn:
          'Door threshold — links maçaneta, path, pass; crossing with window and light.',
        simpleEs:
          'Umbral para pasar — vínculo maçaneta, camino, pasar; cruce con ventana y luz.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      {
        id: 'janela',
        word: 'janela',
        simple:
          'Vão para ar e vista — elo maçaneta/fecho; cruzamento com porta e luz.',
        simpleEn:
          'Window for air and view — links handle/latch; crossing with door and light.',
        simpleEs:
          'Vano para aire y vista — vínculo manilla; cruce con puerta y luz.',
        group: 'lexico',
        fromTitle: false,
        href
      }
    ];
    entries.forEach((entry) => {
      const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
      if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
      else {
        const after = items.findIndex(
          (x) => x.id === 'gesto' || x.id === 'interruptor' || x.id === 'ligar-desligar'
        );
        if (after >= 0) items.splice(after + 1, 0, entry);
        else items.push(entry);
      }
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia actualizado (maçaneta · porta · janela)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entry =
      '    macaneta: { gloss: "Puxador da porta — torcer/abrir; elo mãos, porta/janela, ligar/desligar luz.", href: "/posts/post-inspecao-palavra-macaneta.html", en: "doorknob", es: "manilla", fr: "poignée", it: "maniglia", de: "Türklinke", el: "πόμολο", nl: "deurknop", pl: "klamka", ru: "dvernaya ruchka", zh: "menshuo", ja: "doanobu", ko: "munsonjap-i", ar: "miqubad albab", he: "yadit delet", hi: "dastak", tr: "kapı kolu", sv: "dörrhandtag", pt: "maçaneta", ca: "pomo", gl: "mazañeta", eu: "ate-helduleku", eo: "pordotenilo" },';
    if (/macaneta:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    macaneta:\s*\{[\s\S]*?\},/, entry);
    } else if (/(gesto:\s*\{[\s\S]*?\},?\r?\n)/.test(gloss)) {
      gloss = gloss.replace(/(gesto:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entry + '\n');
    } else if (/(interruptor:\s*\{[\s\S]*?\},?\r?\n)/.test(gloss)) {
      gloss = gloss.replace(/(interruptor:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entry + '\n');
    } else {
      console.warn('Aviso: glossário — inserção maçaneta falhou');
    }
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (maçaneta)');
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
