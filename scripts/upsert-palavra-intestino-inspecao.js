'use strict';

/**
 * Injeta palavra «intestino» na série Palavras.
 * Uso: node scripts/upsert-palavra-intestino-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildIntestinoPost } = require('../lib/intestino-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-intestino');
  const taken = new Set(posts.map((p) => Number(p.seriesOrder) || 0));
  let seriesOrder = existing && typeof existing.seriesOrder === 'number' ? existing.seriesOrder : 201;
  if (!existing) {
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  }
  const post = buildIntestinoPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-intestino';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Intestino — o tubo de dentro (intus) e Valeu !!!',
      titleEn: 'Intestino — the inner tube (intus) and Valeu !!!',
      titleEs: 'Intestino — el tubo de dentro (intus) y ¡Valeu !!!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: intestino (lat. intestinum ← intus) — órgão-tubo e adj. interno; ≠ barriga; elos eCBome/UNIFESP; Valeu !!! por dentro.',
      whyEn: 'Words: intestino (Lat. intestinum ← intus) — tube-organ and inward adjective; ≠ belly; eCBome/UNIFESP; Valeu !!! from inside.',
      whyEs: 'Palabras: intestino (lat. intestinum ← intus) — órgano-tubo y adj. interno; ≠ barriga; eCBome/UNIFESP; ¡Valeu !!! por dentro.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Intestino',
        'https://en.wiktionary.org/wiki/intestinum#Latin',
        '/posts/post-inspecao-palavra-barriga.html',
        '/posts/post-inspecao-neurociencia-endocanabinoidoma.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — intus; fora = barriga; sem clínica.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-intestino)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'intestino',
      word: 'intestino',
      simple:
        'Lat. intestinum ← intus «dentro» — tubo interno e adj. interno (guerra intestina); ≠ barriga; Valeu !!! por dentro.',
      simpleEn:
        'Lat. intestinum ← intus “within” — inner tube and inward adjective; ≠ belly; Valeu !!! from inside.',
      simpleEs:
        'Lat. intestinum ← intus «dentro» — tubo interno y adj. interno; ≠ barriga; ¡Valeu !!! por dentro.',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Intestino vem do latim intestīnum, substantivo de intestīnus («interno»), de intus («dentro»). O mesmo étimo dá o adjectivo de conflito interno (guerra intestina) e o nome do tubo digestivo.',
      curiosities:
        'A barriga é o ventre de fora (sinal de satisfação); o intestino é o trabalho de dentro. O inglês gut feeling vive no PT mais na barriga ou no coração. Tripa é o oral; o étimo culto continua intestīnum.',
      historyEn:
        'Portuguese intestino comes from Latin intestīnum, the noun of intestīnus (“internal”), from intus (“within”). The same etymon names inward conflict (guerra intestina) and the digestive tube.',
      curiositiesEn:
        'Barriga is the outer belly (satisfaction signal); intestino is the inner work. English gut feeling maps in PT more often to barriga or coração. Tripa is the oral name; the learned etymon stays intestīnum.',
      historyEs:
        'Intestino viene del latín intestīnum, sustantivo de intestīnus («interno»), de intus («dentro»). El mismo étimo nombra el conflicto interno (guerra intestina) y el tubo digestivo.',
      curiositiesEs:
        'Barriga es el vientre de fuera (señal de satisfacción); intestino es el trabajo de dentro. El gut feeling inglés en PT vive más en barriga o coração. Tripa es el oral; el étimo culto sigue intestīnum.'
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'intestino');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'barriga' || x.id === 'coracao' || x.id === 'sinais');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (intestino)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    intestino: { tone: "craft", category: "Corpo", mundane: "Tubo digestivo de dentro — delgado / grosso; também adj. interno.", gloss: "Lat. intestinum ← intus — o tubo de dentro; ≠ barriga; Valeu !!! por dentro.", href: "/posts/post-inspecao-palavra-intestino.html", en: "intestine", es: "intestino", fr: "intestin", it: "intestino", de: "Darm", el: "έντερο", la: "intestinum", yo: "ifun", sw: "utumbo", gez: "ʾanāgər", nl: "darm", pl: "jelito", ru: "кишка", uk: "кишка", zh: "肠", ja: "腸", ko: "창자", ar: "أمعاء", he: "מעי", hi: "आंत", tr: "bağırsak", sv: "tarm", da: "tarm", no: "tarm", fi: "suoli", cs: "střevo", ro: "intestin", hu: "bél", ca: "intestí", gl: "intestino", eu: "heste", gn: "kygue", qu: "chunchul", eo: "intesto", vi: "ruột", id: "usus", th: "ลำไส้", hr: "crijevo", sk: "črevo", ga: "stéig", cy: "coluddyn", ha: "hanji", am: "አንጀት", fa: "روده", bn: "অন্ত্র", zu: "amathumbu" },';
    const aliases =
      '    intestinos: { gloss: "Plural de intestino — o mesmo tubo de dentro.", href: "/posts/post-inspecao-palavra-intestino.html", en: "intestines", es: "intestinos" },\n' +
      '    intestinal: { gloss: "Adjectivo de intestino — do tubo / da flora; ver ficha.", href: "/posts/post-inspecao-palavra-intestino.html", en: "intestinal", es: "intestinal" },\n' +
      '    tripa: { gloss: "Oral BR para intestino — uso vivo; étimo culto = intestinum.", href: "/posts/post-inspecao-palavra-intestino.html", en: "gut / tripe (oral)", es: "tripa (oral)" },';
    if (/    intestino:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    intestino:\s*\{[\s\S]*?\},/, entryLine);
      if (!/    intestinos:\s*\{/.test(gloss)) {
        gloss = gloss.replace(entryLine, entryLine + '\n' + aliases);
      }
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (intestino · existente)');
    } else {
      const reBarriga = /(    barriga:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reCoracao = /(    coração:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reBarriga.test(gloss)) {
        gloss = gloss.replace(reBarriga, '$1' + entryLine + '\n' + aliases + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (intestino · após barriga)');
      } else if (reCoracao.test(gloss)) {
        gloss = gloss.replace(reCoracao, '$1' + entryLine + '\n' + aliases + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (intestino · após coração)');
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
