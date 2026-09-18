'use strict';

/**
 * Injeta palavra «eletrizante» na série Palavras.
 * Uso: node scripts/upsert-palavra-eletrizante-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildEletrizantePost } = require('../lib/eletrizante-inspecao-post.js');

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
  // Re-ler Cap livre (agentes concorrentes)
  const postsLive = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const used = new Set(
    postsLive
      .filter((x) => x.slug && String(x.slug).startsWith('inspecao-palavra'))
      .map((x) => x.seriesOrder)
      .filter((n) => n != null)
  );
  let nextCap = 1;
  while (used.has(nextCap)) nextCap++;
  const existing = postsLive.find((p) => p.slug === 'inspecao-palavra-eletrizante');
  if (existing && existing.seriesOrder != null) {
    console.log('Slug já existe — Cap.', existing.seriesOrder, '(deepen/update)');
  }

  const post = buildEletrizantePost();
  if (existing && existing.seriesOrder != null) {
    post.seriesOrder = existing.seriesOrder;
  } else if (used.has(post.seriesOrder)) {
    post.seriesOrder = nextCap;
    console.log('seriesOrder ajustado para Cap.', nextCap);
  } else {
    // Preferir próximo livre se o hardcode estiver longe do fim da série
    const maxUsed = Math.max(0, ...used);
    if (post.seriesOrder > maxUsed + 1 && nextCap <= maxUsed + 1) {
      post.seriesOrder = nextCap;
      console.log('seriesOrder alinhado ao próximo livre Cap.', nextCap);
    }
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-eletrizante';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Eletrizante — carga, hype BR e Faça o melhor!',
      titleEn: 'Eletrizante — charge, BR hype and Do your best!',
      titleEs: 'Eletrizante — carga, hype BR y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: eletrizante (eletro- + intensidade) — metáfora de carga e hype BR («show eletrizante»); tipografia eleltrioxsamndo → eletrizante.',
      whyEn: 'Words: eletrizante (eletro- + intensity) — charge metaphor and BR hype; typo eleltrioxsamndo → eletrizante.',
      whyEs: 'Palabras: eletrizante (eletro- + intensidad) — metáfora de carga y hype BR; tipografía eleltrioxsamndo → eletrizante.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/eletrizar',
        'https://en.wiktionary.org/wiki/electrifying',
        '/posts/post-inspecao-palavra-fogo.html',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — carga/hype; rede só com slugs existentes (fogo + escala).'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-eletrizante)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'eletrizante',
      word: 'eletrizante',
      simple:
        'Eletro- + intensidade — metáfora de carga e hype BR («show eletrizante»); tipografia eleltrioxsamndo; elos fogo e escala de louvor; Faça o melhor com rasto.',
      simpleEn:
        'Eletro- + intensity — charge metaphor and BR hype; typo eleltrioxsamndo; links to fogo and praise scale; Do your best with a trail.',
      simpleEs:
        'Eletro- + intensidad — metáfora de carga y hype BR; tipografía eleltrioxsamndo; vínculos a fogo y escala; Haz lo mejor con rastro.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'eletrizante');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'fabuloso' ||
          x.id === 'incrivel' ||
          x.id === 'genial' ||
          x.id === 'fogo'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (eletrizante)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    eletrizante: { gloss: "Eletro-+intensidade — metáfora de carga e hype BR (show eletrizante); tipografia eleltrioxsamndo; elos fogo/escala; Faça o melhor.", href: "/posts/post-inspecao-palavra-eletrizante.html", en: "electrifying", es: "electrizante", fr: "électrisant", it: "elettrizzante", de: "elektrisierend", el: "ηλεκτρίζων", la: "electricus (fig.)", yo: "tí ń fa agbára", sw: "yenye mshtuko", gez: "mäbraqawi", nl: "elektriserend", pl: "elektryzujący", ru: "электризующий", uk: "електризуючий", zh: "令人振奋的", ja: "電撃的な", ko: "전율적인", ar: "مثير / مذهل", he: "מחשמל", hi: "रोमांचक", tr: "elektriklendirici", sv: "elektrifierande", da: "elektriserende", no: "elektriserende", fi: "sähköistävä", cs: "elektrizující", ro: "electrizant", hu: "elektromosító", ca: "electrificant", gl: "electrizante", eu: "elektrizatzaile", gn: "tatuakuaa", qu: "kallpayuq", eo: "elektriga", vi: "náo nhiệt", id: "menggetarkan", th: "เร้าใจ", hr: "elektrizirajući", sk: "elektrizujúci", ga: "leictreachúil", cy: "trydanol", ha: "mai ban mamaki", am: "አስደሳች", fa: "هیجان‌انگیز", bn: "রোমাঞ্চকর", zu: "okushaya ugesi" },';
    if (/eletrizante:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    eletrizante:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (eletrizante · existente)');
    } else {
      const reFabuloso = /(fabuloso:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reGenial = /(genial:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reFogo = /(fogo:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reFabuloso.test(gloss)) {
        gloss = gloss.replace(reFabuloso, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (eletrizante · após fabuloso)');
      } else if (reGenial.test(gloss)) {
        gloss = gloss.replace(reGenial, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (eletrizante · após genial)');
      } else if (reFogo.test(gloss)) {
        gloss = gloss.replace(reFogo, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (eletrizante · após fogo)');
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
