'use strict';

/**
 * Injeta palavra «interruptor» (+ derivações) na série Palavras.
 * Uso: node scripts/upsert-palavra-interruptor-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildInterruptorPost } = require('../lib/interruptor-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-interruptor');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildInterruptorPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-interruptor';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Interruptor — ligar, cortar e derivações',
      titleEn: 'Interruptor — switch, cut and derivatives',
      titleEs: 'Interruptor — encender, cortar y derivaciones',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: interruptor (lat. interrumpere) — peça do circuito; par lab com ligar × desligar; interromper/interrupção; Faça o melhor!',
      whyEn: 'Words: interruptor (Lat. interrumpere) — circuit device; lab pair with ligar × desligar; interromper/interrupção; Do your best!',
      whyEs: 'Palabras: interruptor (lat. interrumpere) — pieza del circuito; par lab con ligar × desligar; interromper/interrupção; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/interromper',
        '/posts/post-inspecao-palavra-ligar-desligar.html',
        '/posts/post-inspecao-palavra-sinal.html',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-eletrizante.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — tipografia Imtupidor → interruptor; par lab com ligar × desligar.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-interruptor)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'interruptor',
      word: 'interruptor',
      simple:
        'Lat. interrumpere — peça do circuito; par lab com ligar × desligar; derivações interromper/interrupção; Faça o melhor com o clique.',
      simpleEn:
        'Lat. interrumpere — circuit device; lab pair with ligar × desligar; derivatives interromper/interrupção; Do your best with the click.',
      simpleEs:
        'Lat. interrumpere — pieza del circuito; par lab con ligar × desligar; derivaciones interromper/interrupção; Haz lo mejor con el clic.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'interruptor');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'sinal' || x.id === 'eletrizante' || x.id === 'pular' || x.id === 'gesto'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (interruptor)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryMain =
      '    interruptor: { gloss: "Lat. interrumpere — peça do circuito; par lab com ligar × desligar; derivações interromper/interrupção; Faça o melhor!", href: "/posts/post-inspecao-palavra-interruptor.html", en: "switch / interrupter", es: "interruptor", fr: "interrupteur", it: "interruttore", de: "Schalter", el: "diakoptis", la: "interruptor", yo: "sakiti", sw: "swichi", gez: "makufaya", nl: "schakelaar", pl: "wylacznik", ru: "vyklyuchatel", uk: "vyklyuchatel", zh: "kaiguan", ja: "switch", ko: "스위치", ar: "miftah", he: "mateh", hi: "switch", tr: "anahtar", sv: "strombrytare", da: "kontakt", no: "bryter", fi: "katkaisin", cs: "vypinac", ro: "intrerupator", hu: "kapcsolo", ca: "interruptor", gl: "interruptor", eu: "etengailu", gn: "mbogueha", qu: "wanchay", eo: "sxaltilo", vi: "cong tac", id: "saklar", th: "switch", hr: "prekidac", sk: "vypinac", ga: "lasc", cy: "switsh", ha: "mai kunna", am: "mekfel", fa: "kelid", bn: "switch", zu: "iswitchi" },';
    const entryDerivs =
      '    interromper: { gloss: "Verbo da família — cortar no meio / pausar.", href: "/posts/post-inspecao-palavra-interruptor.html", en: "to interrupt", es: "interrumpir" },\n' +
      '    interrupção: { gloss: "Evento do corte — pausa forçada ou escolha de ofício.", href: "/posts/post-inspecao-palavra-interruptor.html", en: "interruption", es: "interrupción" },\n' +
      '    interrompido: { gloss: "Estado após o corte.", href: "/posts/post-inspecao-palavra-interruptor.html", en: "interrupted", es: "interrumpido" },';
    const entryLine = entryMain + '\n' + entryDerivs;
    if (/interruptor:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    interruptor:\s*\{[\s\S]*?\},/, entryMain);
      if (!/interromper:\s*\{/.test(gloss)) {
        gloss = gloss.replace(/(interruptor:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryDerivs + '\n');
      }
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (interruptor · entrada existente enriquecida)');
    } else {
      const reSinal = /(sinal:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const rePular = /(pular:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reSinal.test(gloss)) {
        gloss = gloss.replace(reSinal, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (interruptor · após sinal)');
      } else if (rePular.test(gloss)) {
        gloss = gloss.replace(rePular, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (interruptor · após pular)');
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
