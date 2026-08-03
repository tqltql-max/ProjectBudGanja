'use strict';

/**
 * Injeta palavra «fantástico» na série Palavras.
 * Uso: node scripts/upsert-palavra-fantastico-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildFantasticoPost } = require('../lib/fantastico-inspecao-post.js');

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
  const post = buildFantasticoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  // Cap livre: só série palavras-origem / slugs palavra (agentes concorrentes)
  const claimed = new Set(
    posts
      .filter(
        (p) =>
          p.slug !== post.slug &&
          (p.series === 'palavras-origem' ||
            String(p.slug || '').includes('palavra'))
      )
      .map((p) => p.seriesOrder)
      .filter((n) => n != null)
  );
  if (claimed.has(post.seriesOrder)) {
    let next = post.seriesOrder;
    while (claimed.has(next)) next += 1;
    console.warn('Cap', post.seriesOrder, 'ocupado — a usar Cap.', next);
    post.seriesOrder = next;
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
    const sugId = 'palavra-fantastico';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Fantástico — fantasia, elogio BR e Faça o melhor!',
      titleEn: 'Fantástico — fantasy, BR praise and Do your best!',
      titleEs: 'Fantástico — fantasía, elogio BR y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: fantástico (phantasticus/fantasia) — correcção de fantisico; eixos fantasia e elogio BR; escala legal/genial/maravilhoso.',
      whyEn: 'Words: fantástico (phantasticus/fantasy) — typo fix from fantisico; fantasy and BR praise; scale legal/genial/maravilhoso.',
      whyEs: 'Palabras: fantástico (phantasticus/fantasía) — corrección de fantisico; fantasía y elogio BR; escala legal/genial/maravilhoso.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/fantasia',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-maravilhoso.html',
        '/posts/post-inspecao-palavra-legal.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — fantisico → fantástico; escala de elogio.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-fantastico)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'fantastico',
      word: 'fantástico',
      simple:
        'Lat. phantasticus / fantasia — imaginação e elogio BR «fantástico!»; escala com legal, genial, maravilhoso; Faça o melhor depois do uau.',
      simpleEn:
        'Lat. phantasticus / fantasy — imagination and BR praise “fantástico!”; scale with legal, genial, maravilhoso; Do your best after the wow.',
      simpleEs:
        'Lat. phantasticus / fantasía — imaginación y elogio BR «¡fantástico!»; escala con legal, genial, maravilhoso; Haz lo mejor después del guau.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'genial' || x.id === 'maravilhoso' || x.id === 'legal' || x.id === 'fogo'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (fantástico)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('fantástico: {') && !gloss.includes('fantastico: {')) {
      const reFogo = /(fogo: \{[\s\S]*?zu: "[^"]+" },\r?\n)/;
      const reGenial = /(genial: \{[\s\S]*?zu: "[^"]+" },\r?\n)/;
      const entry =
        '    fantástico: { gloss: "Lat. phantasticus / fantasia — imaginação e elogio BR «fantástico!»; escala legal/genial/maravilhoso; Faça o melhor.", href: "/posts/post-inspecao-palavra-fantastico.html", en: "fantastic / fantastical", es: "fantástico", fr: "fantastique", it: "fantastico", de: "fantastisch", el: "φανταστικός", la: "phantasticus", yo: "àrà ọ̀tọ̀", sw: "ajabu", gez: "mänäḳər", nl: "fantastisch", pl: "fantastyczny", ru: "фантастический", uk: "фантастичний", zh: "奇妙的", ja: "素晴らしい", ko: "환상적인", ar: "رائع", he: "פנטסטי", hi: "शानदार", tr: "fantastik", sv: "fantastisk", da: "fantastisk", no: "fantastisk", fi: "fantastinen", cs: "fantastický", ro: "fantastic", hu: "fantasztikus", ca: "fantàstic", gl: "fantástico", eu: "fantastiko", gn: "iporãité", qu: "musphay", eo: "fantasta", vi: "tuyệt vời", id: "fantastis", th: "มหัศจรรย์", hr: "fantastičan", sk: "fantastický", ga: "iontach", cy: "gwych", ha: "ban mamaki", am: "አስደናቂ", fa: "خارق‌العاده", bn: "অসাধারণ", zu: "kuyamangalisa" },\n';
      if (reFogo.test(gloss)) {
        gloss = gloss.replace(reFogo, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (fantástico · após fogo)');
      } else if (reGenial.test(gloss)) {
        gloss = gloss.replace(reGenial, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (fantástico · após genial)');
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

  console.log('OK Cap.', post.seriesOrder, '—', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
