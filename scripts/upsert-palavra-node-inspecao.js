'use strict';

/**
 * Injeta palavra «node» × «nuds» na série Palavras.
 * Uso: node scripts/upsert-palavra-node-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildNodePost } = require('../lib/node-inspecao-post.js');
const { buildNoPost } = require('../lib/no-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-palavra-node.html';

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

function upsertGuia(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = items.findIndex((x) => afterIds.indexOf(x.id) >= 0);
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function glossHas(src, key) {
  return new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': \\{').test(src);
}

function replaceGloss(src, key, line) {
  const re = new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': \\{[\\s\\S]*?\\},\\r?\\n');
  if (re.test(src)) return src.replace(re, line);
  return src;
}

function insertAfterKey(src, afterKey, line) {
  const re = new RegExp('(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': \\{[\\s\\S]*?\\},\\r?\\n)');
  if (re.test(src)) return src.replace(re, '$1' + line);
  return src + line;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-node-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildNodePost();
  const noPost = buildNoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  upsertPost(posts, noPost);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, noPost);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-node';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Node · nuds — orelha cola, étimo corta',
      titleEn: 'Node · nuds — the ear glues, the etymon cuts',
      titleEs: 'Node · nuds — el oído pega, el étimo corta',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: node (lat. nodus) × nuds/nudes (lat. nudus) — uma letra; ES nudos ≠ EN nudes; elos nó/conexão/script.',
      whyEn: 'Words: node (Lat. nodus) × nuds/nudes (Lat. nudus) — one letter; ES nudos ≠ EN nudes; links nó/conexão/script.',
      whyEs: 'Palabras: node (lat. nodus) × nuds/nudes (lat. nudus) — una letra; ES nudos ≠ EN nudes; vínculos nó/conexão/script.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/nodus#Latin',
        'https://en.wiktionary.org/wiki/nudus#Latin',
        'https://en.wiktionary.org/wiki/nude',
        '/posts/post-inspecao-palavra-no.html',
        '/posts/post-inspecao-palavra-conexao.html',
        '/posts/post-inspecao-palavra-script.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — nodus × nudus; orelha cola nodes/nudes; Node.js = nós de rede.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-node)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(
      items,
      {
        id: 'node',
        word: 'node',
        simple:
          'Lat. nodus — ponto de junção EN→BR; ≠ nuds/nudes (lat. nudus); ES nudos = nós; elos nó/conexão/script; Valeu !!!',
        simpleEn:
          'Lat. nodus — EN junction point; ≠ nuds/nudes (Lat. nudus); ES nudos = knots; links nó/conexão/script; Valeu !!!',
        simpleEs:
          'Lat. nodus — punto de juntura EN→BR; ≠ nuds/nudes (lat. nudus); ES nudos = nudos/laços; vínculos nó/conexão/script; ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['no', 'no-na-vida']
    );
    upsertGuia(
      items,
      {
        id: 'nuds',
        word: 'nuds',
        simple:
          'Grafia de chat de nudes ← lat. nudus «nu»; a orelha cola em nodes; não é plural técnico de node; ver ficha node.',
        simpleEn:
          'Chat spelling of nudes ← Lat. nudus “bare”; the ear glues it to nodes; not the technical plural of node; see node.',
        simpleEs:
          'Grafía de chat de nudes ← lat. nudus «desnudo»; el oído pega a nodes; no es el plural técnico de node; ver node.',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['node']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (node / nuds)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entries = {
      node:
        '    node: { tone: "craft", category: "Léxico", mundane: "Empréstimo EN — ponto de junção (grafo, rede, haste, runtime).", gloss: "Lat. nodus — EN→BR; ≠ nuds/nudes (nudus); ES nudos = nós; elos nó/conexão/script; Valeu !!!", href: "/posts/post-inspecao-palavra-node.html", en: "node", es: "nodo / nudo", fr: "nœud / nœud (réseau)", it: "nodo", de: "Knoten / Node", el: "κόμβος", la: "nodus", yo: "ìsopọ̀", sw: "fundo / nodi", gez: "məʕəqqəb", nl: "knoop / node", pl: "węzeł / węzeł sieci", ru: "узел", uk: "вузол", zh: "节点", ja: "ノード", ko: "노드", ar: "عقدة", he: "צומת", hi: "नोड", tr: "düğüm / düğüm noktası", sv: "nod", da: "knude / node", no: "node", fi: "solmu", cs: "uzel", ro: "nod", hu: "csomópont", ca: "node / nus", gl: "nodo", eu: "nodo", gn: "ñokã", qu: "t\'inki", eo: "nodo", vi: "nút", id: "simpul / node", th: "โหนด", hr: "čvor", sk: "uzol", ga: "nód", cy: "nod", ha: "kulli", am: "መስቀለኛ", fa: "گره", bn: "নোড", zu: "ifindo" },\n',
      nodes:
        '    nodes: { gloss: "Plural EN de node — pontos de junção; a orelha cola em nudes; ver ficha node.", href: "/posts/post-inspecao-palavra-node.html", en: "nodes", es: "nodos / nudos" },\n',
      nuds:
        '    nuds: { tone: "caution", category: "Léxico", mundane: "Grafia de chat de nudes — não é plural técnico de node.", gloss: "← nudes ← lat. nudus «nu»; orelha cola em nodes; ≠ nodus; ver ficha node.", href: "/posts/post-inspecao-palavra-node.html", en: "nudes (slang spelling)", es: "nudes (grafía de chat)" },\n',
      nudes:
        '    nudes: { gloss: "EN nude no plural / gíria de fotos — lat. nudus; ≠ nodes (nodus); ver ficha node.", href: "/posts/post-inspecao-palavra-node.html", en: "nudes", es: "desnudos / nudes" },\n',
      nude:
        '    nude: { gloss: "EN «nu» ← lat. nudus — despido / género artístico; ≠ node (nodus); ver ficha node.", href: "/posts/post-inspecao-palavra-node.html", en: "nude", es: "desnudo" },\n',
      nudos:
        '    nudos: { gloss: "ES plural de nudo = nós (lat. nodus); o olho EN lê nudes — falso amigo; ver ficha node.", href: "/posts/post-inspecao-palavra-node.html", en: "knots (ES nudos)", es: "nudos" },\n',
      nodo:
        '    nodo: { gloss: "Grafia técnica PT de nó — lat. nodus; ≠ nu; ver fichas nó e node.", href: "/posts/post-inspecao-palavra-node.html", en: "node / knot (technical PT)", es: "nodo" },\n',
      nodus:
        '    nodus: { gloss: "Latim — nó, laço, protuberância; avô de node e de nó; ≠ nudus; ver fichas nó e node.", href: "/posts/post-inspecao-palavra-node.html", en: "nodus (Latin knot)", es: "nodus" },\n',
      nudus:
        '    nudus: { gloss: "Latim — nu, despido; avô de nude/nuds; ≠ nodus; ver ficha node.", href: "/posts/post-inspecao-palavra-node.html", en: "nudus (Latin bare)", es: "nudus" },\n',
      nodejs:
        '    nodejs: { gloss: "Runtime JS — nome de nós de rede, não de nudes; ver fichas node e script.", href: "/posts/post-inspecao-palavra-node.html", en: "Node.js", es: "Node.js" },\n'
    };

    const chain = [
      ['nó', 'node'],
      ['node', 'nodes'],
      ['nodes', 'nuds'],
      ['nuds', 'nudes'],
      ['nudes', 'nude'],
      ['nude', 'nudos'],
      ['nudos', 'nodo'],
      ['nodo', 'nodus'],
      ['nodus', 'nudus'],
      ['nudus', 'nodejs']
    ];
    for (const [after, key] of chain) {
      if (glossHas(gloss, key)) gloss = replaceGloss(gloss, key, entries[key]);
      else gloss = insertAfterKey(gloss, after, entries[key]);
    }

    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (node / nuds)');
  }

  try {
    await syncSql(post);
    await syncSql(noPost);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
