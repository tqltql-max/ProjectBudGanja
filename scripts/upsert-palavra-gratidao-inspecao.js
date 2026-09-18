'use strict';

/**
 * Injeta palavra «Gratidão» na série Palavras.
 * Uso: node scripts/upsert-palavra-gratidao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildGratidaoPost } = require('../lib/gratidao-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-gratidao');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildGratidaoPost(seriesOrder);

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
    const sugId = 'palavra-gratidao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Gratidão — qualidade de grato, não fórmula de obrigado',
      titleEn: 'Gratidão — quality of being grateful, not the obrigado formula',
      titleEs: 'Gratidão — cualidad de grato, no fórmula de obrigado',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: gratidão (lat. tardio grātitūdō ← grātus) — qualidade; peças grat- + -idão; ≠ obrigado (obligare) ≠ valeu (valēre); Faça o melhor!',
      whyEn: 'Words: gratidão (Late Lat. grātitūdō ← grātus) — named quality; ≠ obrigado ≠ valeu; Do your best!',
      whyEs: 'Palabras: gratidão (lat. tardío grātitūdō ← grātus) — cualidad; ≠ obrigado ≠ valeu; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/gratitude',
        'https://en.wiktionary.org/wiki/gratus',
        '/posts/post-inspecao-expressao-muito-obrigado.html',
        '/posts/post-inspecao-palavra-valeu.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — Gratidão ≠ obrigado / valeu; grato é o adjectivo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-gratidao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'gratidao',
      word: 'Gratidão',
      simple:
        'Lat. tardio grātitūdō ← grātus + -tūdō — qualidade de quem recebe bem; peças grat- + -idão; ≠ obrigado (obligare) ≠ valeu (valēre); Faça o melhor!',
      simpleEn:
        'Late Lat. grātitūdō ← grātus + -tūdō — named quality of receiving well; pieces grat- + -idão; ≠ obrigado ≠ valeu; Do your best!',
      simpleEs:
        'Lat. tardío grātitūdō ← grātus + -tūdō — cualidad de quien recibe bien; piezas grat- + -idão; ≠ obrigado ≠ valeu; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Gratidão vem do latim tardio grātitūdō, de grātus (agradável, reconhecido) + sufixo de qualidade -tūdō. No laboratório é o nome da qualidade; obrigado (obligare) e valeu (valēre) são sopros com outros étimos. Grato é o adjectivo.',
      curiosities:
        'Não fundir com graça, gratificação, grátis. Elo: fichas muitoobrigado e valeu. Método das peças: como veneno.',
      historyEn:
        'Gratidão comes from Late Latin grātitūdō, from grātus (pleasing, thankful) + quality suffix -tūdō. In the lab it names the quality; obrigado (obligare) and valeu (valēre) are spoken formulas with other etymons. Grato is the adjective.',
      curiositiesEn:
        'Do not merge with graça, gratificação, or grátis. Links: muitoobrigado and valeu sheets. Piece method: like veneno.',
      historyEs:
        'Gratidão viene del latín tardío grātitūdō, de grātus (agradable, reconocido) + sufijo de cualidad -tūdō. En el laboratorio nombra la cualidad; obrigado (obligare) y valeu (valēre) son soplos con otros étimos. Grato es el adjetivo.',
      curiositiesEs:
        'No fusionar con graça, gratificação ni grátis. Vínculos: fichas muitoobrigado y valeu. Método de piezas: como veneno.'
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || x.word === 'Gratidão' || x.word === 'gratidão'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'valeu' || x.id === 'muitoobrigado');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Gratidão)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    gratidão: { tone: "warm", category: "Qualidade", mundane: "Reconhecimento do bem recebido; qualidade de ser grato.", gloss: "Lat. tardio grātitūdō ← grātus + -tūdō — qualidade nomeada; ≠ obrigado (obligare) ≠ valeu (valēre); peças grat- + -idão; Faça o melhor!", href: "/posts/post-inspecao-palavra-gratidao.html", en: "gratitude", es: "gratitud", fr: "gratitude", it: "gratitudine", de: "Dankbarkeit", el: "efgnomosini", la: "gratitudo", yo: "imoriri", sw: "shukrani", gez: "amesegena", nl: "dankbaarheid", pl: "wdziecznosc", ru: "blagodarnost", uk: "vdyachnist", zh: "ganji", ja: "kansha", ko: "gansa", ar: "imtinan", he: "hakarat toda", hi: "kritagyata", tr: "minnet", sv: "tacksamhet", da: "taknemmelighed", no: "takknemlighet", fi: "kiitollisuus", cs: "vdecnost", ro: "recunostinta", hu: "hala", ca: "gratitud", gl: "gratitude", eu: "esker on", gn: "aguyje", qu: "añay", eo: "dankemo", vi: "biet on", id: "rasa syukur", th: "khwam kata-nyu", hr: "zahvalnost", sk: "vdacnost", ga: "buiochas", cy: "diolchgarwch", ha: "godiya", am: "amesegenallo", fa: "sepas", bn: "kritoggota", zu: "ukubonga" },';
    const gratoLine =
      '    grato: { gloss: "Adjectivo — qualidade na pessoa; o nome é gratidão (grātus). ≠ obrigado.", href: "/posts/post-inspecao-palavra-gratidao.html", en: "grateful", es: "agradecido" },';
    const agradecerLine =
      '    agradecer: { gloss: "Verbo da família gratus — o acto; o nome é gratidão.", href: "/posts/post-inspecao-palavra-gratidao.html", en: "to thank", es: "agradecer" },';
    if (/gratidão:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    gratidão:\s*\{[\s\S]*?\},/, entryLine);
      console.log('Glossário: gratidão enriquecida');
    } else {
      const reValeu = /(valeu:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reValeu.test(gloss)) {
        gloss = gloss.replace(reValeu, '$1' + entryLine + '\n');
        console.log('Glossário: gratidão após valeu');
      } else {
        console.warn('Aviso: glossário — ponto de inserção gratidão não encontrado');
      }
    }
    if (/grato:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    grato:\s*\{[\s\S]*?\},/, gratoLine);
      console.log('Glossário: grato enriquecida');
    } else if (gloss.includes('gratidão: {')) {
      gloss = gloss.replace(/(    gratidão:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + gratoLine + '\n');
      console.log('Glossário: grato após gratidão');
    }
    if (/agradecer:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    agradecer:\s*\{[\s\S]*?\},/, agradecerLine);
      console.log('Glossário: agradecer enriquecida');
    } else if (gloss.includes('grato: {')) {
      gloss = gloss.replace(/(    grato:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + agradecerLine + '\n');
      console.log('Glossário: agradecer após grato');
    }
    fs.writeFileSync(glossPath, gloss);
  }

  const navPath = path.join(ROOT, 'js', 'ferramentas-nav-data.js');
  if (fs.existsSync(navPath)) {
    let nav = fs.readFileSync(navPath, 'utf8');
    if (!nav.includes('"slug": "post-inspecao-palavra-gratidao"')) {
      const orfeuBlock =
        /("slug": "post-inspecao-palavra-orfeu",\s*"description": "[^"]*"\s*\},)/;
      const insert =
        '$1\n            {\n              "label": "Inspeção: Gratidão — qualidade de grato, não fórmula de obrigado",\n              "tileLabel": "Inspeção: Gratidão — qualidade…",\n              "href": "/posts/post-inspecao-palavra-gratidao.html",\n              "icon": "🔍",\n              "slug": "post-inspecao-palavra-gratidao",\n              "description": "Palavras: «gratidão» (lat. tardio grātitūdō ← grātus) — qualidade de quem recebe bem; peças grat- + -idão; ≠ obrigado (obligare) ≠ valeu (valēre); Faça o melhor!"\n            },';
      if (orfeuBlock.test(nav)) {
        nav = nav.replace(orfeuBlock, insert);
        fs.writeFileSync(navPath, nav);
        console.log('Nav: Gratidão após Orfeu');
      } else {
        console.warn('Aviso: nav — bloco Orfeu não encontrado para inserir Gratidão');
      }
    } else {
      console.log('Nav já tinha Gratidão');
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
