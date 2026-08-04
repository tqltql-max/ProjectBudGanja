'use strict';

/**
 * Injeta palavras «ligar» × «desligar» na série Palavras.
 * Uso: node scripts/upsert-palavra-ligar-desligar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildLigarDesligarPost } = require('../lib/ligar-desligar-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-ligar-desligar');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildLigarDesligarPost(seriesOrder);

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
    const sugId = 'palavra-ligar-desligar';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Ligar × Desligar — verbos do circuito',
      titleEn: 'Ligar × Desligar — verbs of the circuit',
      titleEs: 'Ligar × Desligar — verbos del circuito',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: ligar × desligar (lat. ligare) — verbos do circuito; par lab com interruptor (peça × gesto); Faça o melhor!',
      whyEn: 'Words: ligar × desligar (Lat. ligare) — circuit verbs; lab pair with interruptor (device × gesture); Do your best!',
      whyEs: 'Palabras: ligar × desligar (lat. ligare) — verbos del circuito; par lab con interruptor (pieza × gesto); ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/desligar',
        '/posts/post-inspecao-palavra-interruptor.html',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-sinal.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — par lab verbal do interruptor (peça × gesto).'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-ligar-desligar)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entries = [
      {
        id: 'ligar',
        word: 'ligar',
        simple:
          'Lat. ligare — verbos do circuito; par lab com interruptor (peça × gesto); Faça o melhor com o clique.',
        simpleEn:
          'Lat. ligare — circuit verbs; lab pair with interruptor (device × gesture); Do your best with the click.',
        simpleEs:
          'Lat. ligare — verbos del circuito; par lab con interruptor (pieza × gesto); Haz lo mejor con el clic.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      {
        id: 'desligar',
        word: 'desligar',
        simple:
          'Des- + ligar — verbos do circuito com ligar; par lab com interruptor; Faça o melhor inclusive ao pausar.',
        simpleEn:
          'Des- + ligar — circuit verbs with ligar; lab pair with interruptor; Do your best even when pausing.',
        simpleEs:
          'Des- + ligar — verbos del circuito con ligar; par lab con interruptor; Haz lo mejor incluso al pausar.',
        group: 'lexico',
        fromTitle: false,
        href
      }
    ];
    for (const entry of entries) {
      const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
      if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
      else {
        const after = items.findIndex(
          (x) => x.id === 'interruptor' || x.id === 'sinal' || x.id === 'gesto'
        );
        if (after >= 0) items.splice(after + 1, 0, entry);
        else items.push(entry);
      }
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (ligar · desligar)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLigar =
      '    ligar: { gloss: "Lat. ligare — verbos do circuito; par lab com interruptor (peça × gesto); Faça o melhor!", href: "/posts/post-inspecao-palavra-ligar-desligar.html", en: "to turn on / connect / call", es: "encender / conectar / llamar", fr: "allumer / lier", it: "accendere / legare", de: "einschalten / verbinden", el: "anoigo", la: "ligare", yo: "tan", sw: "washa", gez: "ʾanbara", nl: "aanzetten", pl: "wlaczyc", ru: "vklyuchit", uk: "vklyuchyty", zh: "dakai", ja: "on", ko: "켜다", ar: "yushaghghil", he: "lehadlik", hi: "on", tr: "acmak", sv: "satta pa", da: "taende", no: "skru pa", fi: "kytkea", cs: "zapnout", ro: "aprinde", hu: "bekapcsol", ca: "encendre", gl: "acender", eu: "piztu", gn: "moĩ", qu: "rawray", eo: "sxalti", vi: "bat", id: "nyalakan", th: "on", hr: "upaliti", sk: "zapnut", ga: "las", cy: "troi ymlaen", ha: "kunna", am: "anqa", fa: "roshan", bn: "on", zu: "layitha" },';
    const entryDesligar =
      '    desligar: { gloss: "Des- + ligar — verbos do circuito; par lab com interruptor; Faça o melhor!", href: "/posts/post-inspecao-palavra-ligar-desligar.html", en: "to turn off / disconnect", es: "apagar / desconectar", fr: "eteindre / delier", it: "spegnere", de: "ausschalten", el: "svino", la: "deligare", yo: "pa", sw: "zima", gez: "ʾatfaʾa", nl: "uitzetten", pl: "wylaczyc", ru: "vyklyuchit", uk: "vyklyuchyty", zh: "guanbi", ja: "off", ko: "끄다", ar: "yutfi", he: "lekbót", hi: "off", tr: "kapatmak", sv: "stanga av", da: "slukke", no: "skru av", fi: "sammuttaa", cs: "vypnout", ro: "stinge", hu: "kikapcsol", ca: "apagar", gl: "apagar", eu: "itzali", gn: "mbogue", qu: "wañuchiy", eo: "malSxalti", vi: "tat", id: "matikan", th: "off", hr: "ugasiti", sk: "vypnut", ga: "múch", cy: "diffodd", ha: "kashe", am: "atfa", fa: "khamush", bn: "off", zu: "cima" },';
    const entryLine = entryLigar + '\n' + entryDesligar;
    if (/ligar:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    ligar:\s*\{[\s\S]*?\},/, entryLigar);
      if (/desligar:\s*\{/.test(gloss)) {
        gloss = gloss.replace(/    desligar:\s*\{[\s\S]*?\},/, entryDesligar);
      } else {
        gloss = gloss.replace(/(ligar:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryDesligar + '\n');
      }
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (ligar · desligar · existentes)');
    } else {
      const reInt = /(interruptor:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reInt.test(gloss)) {
        gloss = gloss.replace(reInt, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (ligar · desligar · após interruptor)');
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
