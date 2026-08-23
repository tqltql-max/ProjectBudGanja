'use strict';

/**
 * Lote: palavra puta · palavra pariu · expressão puta que pariu.
 * Uso: node scripts/upsert-puta-pariu-lote.js
 */

const fs = require('fs');
const path = require('path');
const { buildPutaPost } = require('../lib/puta-inspecao-post.js');
const { buildPariuPost } = require('../lib/pariu-inspecao-post.js');
const { buildPutaQuePariuPost } = require('../lib/puta-que-pariu-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextOrder(posts, series) {
  const orders = posts
    .filter((p) => p.series === series)
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

async function syncSql(postsAll) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  for (const post of postsAll) upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado (lote puta/pariu/PQP)');
}

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertGuia(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  let after = -1;
  for (const id of afterIds || []) {
    after = items.findIndex((x) => x.id === id);
    if (after >= 0) break;
  }
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function upsertGloss(glossPath, key, entryLine, afterKeys) {
  if (!fs.existsSync(glossPath)) return;
  let gloss = fs.readFileSync(glossPath, 'utf8');
  const reKey = new RegExp('    ' + key + ':\\s*\\{[\\s\\S]*?\\},');
  if (reKey.test(gloss)) {
    gloss = gloss.replace(reKey, entryLine);
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (' + key + ' · existente)');
    return;
  }
  for (const ak of afterKeys) {
    const reAfter = new RegExp('(    ' + ak + ':\\s*\\{[\\s\\S]*?zu:\\s*"[^"]*"\\s*\\},?\\r?\\n)');
    if (reAfter.test(gloss)) {
      gloss = gloss.replace(reAfter, '$1' + entryLine + '\n');
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (' + key + ' · após ' + ak + ')');
      return;
    }
  }
  console.warn('Aviso: glossário — inserção falhou para', key);
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  const putaExisting = posts.find((p) => p.slug === 'inspecao-palavra-puta');
  const pariuExisting = posts.find((p) => p.slug === 'inspecao-palavra-pariu');
  const pqpExisting = posts.find((p) => p.slug === 'inspecao-expressao-puta-que-pariu');

  let palavrasNext = nextOrder(posts, 'palavras-origem');
  let expressoesNext = nextOrder(posts, 'expressoes-ditados');

  const putaOrder = putaExisting ? Number(putaExisting.seriesOrder) || palavrasNext : palavrasNext++;
  if (!putaExisting) palavrasNext = putaOrder + 1;
  const pariuOrder = pariuExisting
    ? Number(pariuExisting.seriesOrder) || palavrasNext
    : putaExisting
      ? nextOrder(
          posts
            .filter((p) => p.slug !== 'inspecao-palavra-puta')
            .concat([{ series: 'palavras-origem', seriesOrder: putaOrder }]),
          'palavras-origem'
        )
      : putaOrder + 1;
  // Simpler: assign sequential for new
  const puta = buildPutaPost(
    putaExisting ? Number(putaExisting.seriesOrder) || nextOrder(posts, 'palavras-origem') : nextOrder(posts, 'palavras-origem')
  );
  upsertPost(posts, puta);
  const pariu = buildPariuPost(
    pariuExisting
      ? Number(pariuExisting.seriesOrder) || nextOrder(posts, 'palavras-origem')
      : nextOrder(posts, 'palavras-origem')
  );
  upsertPost(posts, pariu);
  const pqp = buildPutaQuePariuPost(
    pqpExisting
      ? Number(pqpExisting.seriesOrder) || nextOrder(posts, 'expressoes-ditados')
      : nextOrder(posts, 'expressoes-ditados')
  );
  upsertPost(posts, pqp);

  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, puta);
  writeI18n(i18n, pariu);
  writeI18n(i18n, pqp);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'palavra-puta',
      title: 'Puta — de menina a tabu a intensificador',
      titleEn: 'Puta — from girl to taboo to intensifier',
      titleEs: 'Puta — de niña a tabú a intensificador',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: puta — putta; pejorativo/intensificador; elos pariu/PQP/respeito; Valeu !!!',
      suggestedSlug: puta.slug,
      doneHref: '/posts/post-' + puta.slug + '.html',
      seriesHint: 'palavras-origem',
      sources: [puta.sourceUrl, '/posts/post-inspecao-expressao-puta-que-pariu.html'],
      notes: 'Cap. ' + puta.seriesOrder
    });
    upsertSug(items, {
      id: 'palavra-pariu',
      title: 'Pariu — do latim pariō ao sopro do palavrão',
      titleEn: 'Pariu — from Latin pariō to the swear breath',
      titleEs: 'Pariu — del latín pariō al soplo del taco',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: pariu — pariō/parir; peça de PQP; Valeu !!!',
      suggestedSlug: pariu.slug,
      doneHref: '/posts/post-' + pariu.slug + '.html',
      seriesHint: 'palavras-origem',
      sources: [pariu.sourceUrl, '/posts/post-inspecao-expressao-puta-que-pariu.html'],
      notes: 'Cap. ' + pariu.seriesOrder
    });
    upsertSug(items, {
      id: 'expressao-puta-que-pariu',
      title: 'puta que pariu — válvula de pico e ofício da boca',
      titleEn: 'puta que pariu — peak valve and craft of speech',
      titleEs: 'puta que pariu — válvula de pico y oficio de la boca',
      tipo: 'expressao',
      priority: 1,
      status: 'feita',
      why: 'Expressões: PQP — pico BR; peças puta+pariu; respeito; Valeu !!!',
      suggestedSlug: pqp.slug,
      doneHref: '/posts/post-' + pqp.slug + '.html',
      seriesHint: 'expressoes-ditados',
      sources: [pqp.sourceUrl, '/posts/post-inspecao-palavra-puta.html', '/posts/post-inspecao-palavra-pariu.html'],
      notes: 'Cap. ' + pqp.seriesOrder
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (lote)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(
      items,
      {
        id: 'puta',
        word: 'puta',
        simple:
          'Lat. vulg. putta «menina» → pejorativo; no BR também intensificador («puta festa»); elo PQP; inspecionar com respeito.',
        simpleEn:
          'VL putta “girl” → pejorative; in BR also intensifier; link PQP; inspect with respect.',
        simpleEs:
          'Lat. vulg. putta «niña» → peyorativo; en BR también intensificador; vínculo PQP; inspeccionar con respeto.',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-' + puta.slug + '.html'
      },
      ['patrao', 'pattern', 'respeito']
    );
    upsertGuia(
      items,
      {
        id: 'pariu',
        word: 'pariu',
        simple:
          'De parir / lat. pariō «dar à luz»; peça de puta que pariu; separar parto e palavrão.',
        simpleEn:
          'From parir / Lat. pariō “give birth”; piece of puta que pariu; separate birth and swear.',
        simpleEs:
          'De parir / lat. pariō «dar a luz»; pieza de puta que pariu; separar parto y taco.',
        group: 'lexico',
        fromTitle: false,
        href: '/posts/post-' + pariu.slug + '.html'
      },
      ['puta', 'vida', 'gesto']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (puta · pariu)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  upsertGloss(
    glossPath,
    'puta',
    '    puta: { gloss: "Lat. vulg. putta — pejorativo e intensificador BR; elo PQP; inspecionar com respeito; Valeu !!!", href: "/posts/post-inspecao-palavra-puta.html", en: "whore / intensifier", es: "puta / intensificador", fr: "pute", it: "puttana", de: "Schimpfwort / Intensivierer", el: "poutana", la: "putta", yo: "ashewo", sw: "kahaba", gez: "zəma", nl: "hoer / intensifier", pl: "kurwa", ru: "шлюха / усилитель", uk: "повія", zh: "粗口/强调", ja: "罵倒語", ko: "욕설", ar: "عاهرة", he: "זונה", hi: "वेश्या", tr: "orospu", sv: "hora", da: "luder", no: "hore", fi: "huora", cs: "kurva", ro: "curva", hu: "kurva", ca: "puta", gl: "puta", eu: "puta", gn: "kuña vai", qu: "puta", eo: "putino", vi: "điếm", id: "pelacur", th: "คำหยาบ", hr: "kurva", sk: "kurva", ga: "striapach", cy: "putain", ha: "karuwa", am: "ጋለሞታ", fa: "فاحشه", bn: "বেশ্যা", zu: "isifebe" },',
    ['patrao', 'pattern', 'respeito']
  );
  upsertGloss(
    glossPath,
    'pariu',
    '    pariu: { gloss: "De parir / lat. pariō — dar à luz; peça de puta que pariu; Valeu !!!", href: "/posts/post-inspecao-palavra-pariu.html", en: "gave birth", es: "parió", fr: "mit bas", it: "partorì", de: "gebar", el: "gennise", la: "peperit / pario", yo: "bi", sw: "alizaa", gez: "walädä", nl: "baarde", pl: "urodzila", ru: "родила", uk: "народила", zh: "生了", ja: "産んだ", ko: "낳았다", ar: "ولدت", he: "ילדה", hi: "जना", tr: "doğurdu", sv: "födde", da: "fødte", no: "fødte", fi: "synnytti", cs: "porodila", ro: "născu", hu: "szült", ca: "va parir", gl: "pariu", eu: "erditu", gn: "memby", qu: "wachakurqa", eo: "naskis", vi: "sinh", id: "melahirkan", th: "คลอด", hr: "rodila", sk: "porodila", ga: "rug", cy: "esgorodd", ha: "ta haifa", am: "ወለደች", fa: "زایید", bn: "প্রসব", zu: "wazala" },',
    ['puta', 'vida', 'gesto']
  );

  try {
    await syncSql([puta, pariu, pqp]);
  } catch (e) {
    console.warn('Aviso SQL:', e.message);
  }

  console.log('OK lote:', puta.slug, 'Cap.', puta.seriesOrder);
  console.log('OK lote:', pariu.slug, 'Cap.', pariu.seriesOrder);
  console.log('OK lote:', pqp.slug, 'Cap.', pqp.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
