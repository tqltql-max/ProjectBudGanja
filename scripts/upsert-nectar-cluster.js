'use strict';

/**
 * Injeta palavra «néctar» e expressão «néctar dos deuses».
 * Uso: node scripts/upsert-nectar-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildNectarPost } = require('../lib/nectar-inspecao-post.js');
const { buildNectarDosDeusesPost } = require('../lib/nectar-dos-deuses-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF_PAL = '/posts/post-inspecao-palavra-nectar.html';
const HREF_EXPR = '/posts/post-inspecao-expressao-nectar-dos-deuses.html';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, payload, 'utf8');
      return;
    } catch (e) {
      last = e;
      await sleep(250 * (i + 1));
    }
  }
  throw last;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

function upsertPost(posts, post) {
  stampFiles(post);
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

function patchGlossary(gloss) {
  const pal =
    '    néctar: { tone: "craft", category: "Objecto", mundane: "Suco açucarado da flor — o que a abelha colhe.", gloss: "Gr. néktar → lat. nectar; gatilho Nectar / Inectar; ≠ suco de gôndola ≠ injetar; mito em néctar dos deuses; Valeu !!!", href: "/posts/post-inspecao-palavra-nectar.html", en: "nectar", es: "néctar", fr: "nectar", it: "nettare", de: "Nektar", el: "νέκταρ", la: "nectar", yo: "omi odòdó", sw: "necta", gez: "mästäy", nl: "nectar", pl: "nektar", ru: "нектар", uk: "нектар", zh: "花蜜", ja: "蜜", ko: "꽃꿀", ar: "رحيق", he: "צוף", hi: "मकरंद", tr: "nektar", sv: "nektar", da: "nektar", no: "nektar", fi: "mesi", cs: "nektar", ro: "nectar", hu: "nektár", ca: "nèctar", gl: "néctar", eu: "nektar", gn: "eíra y", qu: "t\'ika yakun", eo: "nektaro", vi: "mật hoa", id: "nektar", th: "น้ำหวานดอกไม้", hr: "nektar", sk: "nektár", ga: "neachtar", cy: "neithdar", ha: "zuma na fure", am: "የአበባ ማር", fa: "شهد", bn: "মকরন্দ", zu: "ujusi wembali" },\n' +
    '    nectar: { gloss: "Gatilho / EN → ver néctar (suco da flor).", href: "/posts/post-inspecao-palavra-nectar.html", en: "nectar", es: "néctar" },\n';

  const expr =
    '    "nectar dos deuses": { tone: "warm", category: "Expressão", mundane: "Hipérbole de gosto — um gole «não deste mundo».", gloss: "Mito grego (néktar + ambrosia) × elogio BR; gatilho Deusus; ≠ suco de gôndola; palavra néctar à parte; Valeu !!!", href: "/posts/post-inspecao-expressao-nectar-dos-deuses.html", en: "nectar of the gods", es: "néctar de los dioses", fr: "nectar des dieux", it: "nettare degli dei", de: "Nektar der Götter", el: "νέκταρ των θεών", la: "nectar deorum", yo: "omi òrìṣà", sw: "necta ya miungu", gez: "mästäy ʼamlakt", nl: "nectar der goden", pl: "nektar bogów", ru: "нектар богов", uk: "нектар богів", zh: "众神的琼浆", ja: "神々のネクター", ko: "신들의 넥타르", ar: "رحيق الآلهة", he: "צוף האלים", hi: "देवताओं का अमृत", tr: "tanrıların nektarı", sv: "gudarnas nektar", da: "gudernes nektar", no: "gudenes nektar", fi: "jumalten mesi", cs: "nektar bohů", ro: "nectarul zeilor", hu: "az istenek nektárja", ca: "nèctar dels déus", gl: "néctar dos deuses", eu: "jainkoen nektarra", gn: "eíra y Tupã", qu: "dioskunaq yakun", eo: "nektaro de dioj", vi: "mật của thần", id: "nektar para dewa", th: "น้ำทิพย์ของเทพ", hr: "nektar bogova", sk: "nektár bohov", ga: "neachtar na ndéithe", cy: "neithdar y duwiau", ha: "zuma na alloli", am: "የአማልክት መጠጥ", fa: "شهد خدایان", bn: "দেবতাদের অমৃত", zu: "ujusi wonkulunkulu" },\n';

  if (/    néctar:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    néctar:\s*\{[\s\S]*?\},/, pal.split('\n')[0].replace(/,\s*$/, '') + ',');
  } else if (/    flor:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    flor:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + pal);
  } else {
    console.warn('Aviso: glossário — ponto flor não encontrado');
  }

  if (/    nectar:\s*\{/.test(gloss) && !/    nectar:\s*\{ gloss:/.test(gloss)) {
    /* keep the nectar alias we just inserted via pal */
  }

  if (/"nectar dos deuses":\s*\{/.test(gloss) || /"néctar dos deuses":\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    "(?:n[ée]ctar dos deuses)":\s*\{[\s\S]*?\},/, expr.trimEnd().replace(/,\s*$/, '') + ',');
  } else if (/    néctar:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    néctar:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + expr);
  } else {
    console.warn('Aviso: glossário — ponto néctar para expressão');
  }

  return gloss;
}

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertGuia(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => afterIds.indexOf(x.id) >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

async function main() {
  for (const script of [
    'generate-nectar-palavra-cover.js',
    'generate-nectar-dos-deuses-cover.js'
  ]) {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  }

  const palPost = stampFiles(buildNectarPost());
  const exprPost = stampFiles(buildNectarDosDeusesPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, palPost);
  upsertPost(posts, exprPost);
  await writeJsonRetry(POSTS_FILE, posts);

  for (const post of [palPost, exprPost]) {
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML:', post.slug, e.message);
    }
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, palPost);
  writeI18n(i18n, exprPost);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'palavra-nectar',
      title: 'Néctar — o suco da flor, e o gatilho Nectar / Inectar',
      titleEn: 'Néctar — flower juice, and the trigger Nectar / Inectar',
      titleEs: 'Néctar — el jugo de la flor, y el gatillo Nectar / Inectar',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: néctar (gr. néktar) — suco da flor; ≠ caixa ≠ injetar; mito em néctar dos deuses; Valeu !!!',
      whyEn: 'Words: néctar (Gk. néktar) — floral nectar; ≠ carton ≠ inject; myth on nectar of the gods; Valeu !!!',
      whyEs: 'Palabras: néctar (gr. néktar) — jugo de la flor; ≠ caja ≠ inyectar; mito en néctar de los dioses; ¡Valeu !!!',
      suggestedSlug: palPost.slug,
      doneHref: HREF_PAL,
      seriesHint: 'palavras-origem',
      sources: [
        palPost.sourceUrl,
        '/posts/post-inspecao-animal-abelha.html',
        '/posts/post-inspecao-palavra-fruto.html',
        HREF_EXPR
      ],
      notes: 'Cap. ' + palPost.seriesOrder + ' — flor primeiro; mito na expressão.'
    });
    upsertSug(items, {
      id: 'expressao-nectar-dos-deuses',
      title: 'néctar dos deuses — o mito, a hipérbole, e o gatilho Deusus',
      titleEn: 'nectar of the gods — the myth, the hyperbole, and the slip Deusus',
      titleEs: 'néctar de los dioses — el mito, la hipérbole, y el lapsus Deusus',
      tipo: 'expressao',
      priority: 1,
      status: 'feita',
      why: 'Expressões: néctar dos deuses — mito × hipérbole de gosto; ≠ suco de gôndola; peça néctar à parte; Valeu !!!',
      whyEn: 'Sayings: nectar of the gods — myth × taste hyperbole; ≠ juice carton; word néctar on its own sheet; Valeu !!!',
      whyEs: 'Dichos: néctar de los dioses — mito × hipérbole; ≠ néctar de caja; palabra néctar aparte; ¡Valeu !!!',
      suggestedSlug: exprPost.slug,
      doneHref: HREF_EXPR,
      seriesHint: 'expressoes-ditados',
      sources: [HREF_PAL, '/posts/post-inspecao-animal-abelha.html', palPost.sourceUrl],
      notes: 'Cap. ' + exprPost.seriesOrder + ' — Deusus = deuses; sem teologia, sem marca.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (néctar cluster)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(
      items,
      {
        id: 'nectar',
        word: 'néctar',
        simple:
          'Gr. néktar — suco da flor. Gatilho Nectar / Inectar. ≠ caixa de suco ≠ injetar. Mito em néctar dos deuses. Valeu !!!',
        simpleEn:
          'Gk. néktar — floral nectar. Trigger Nectar / Inectar. ≠ juice carton ≠ inject. Myth on nectar of the gods. Valeu !!!',
        simpleEs:
          'Gr. néktar — jugo de la flor. Gatillo Nectar / Inectar. ≠ caja ≠ inyectar. Mito en néctar de los dioses. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_PAL
      },
      ['fruto', 'flor', 'planta', 'abelha']
    );
    upsertGuia(
      items,
      {
        id: 'nectar-dos-deuses',
        word: 'néctar dos deuses',
        simple:
          'Expressão — mito grego × hipérbole de gosto; gatilho Deusus; ≠ suco de gôndola; palavra néctar à parte. Valeu !!!',
        simpleEn:
          'Saying — Greek myth × taste hyperbole; slip Deusus; ≠ juice carton; word néctar on its own sheet. Valeu !!!',
        simpleEs:
          'Expresión — mito griego × hipérbole; lapsus Deusus; ≠ néctar de caja; palabra néctar aparte. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_EXPR
      },
      ['nectar', 'fruto']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (néctar cluster)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (néctar cluster)');
    } else {
      console.warn('Aviso: glossário sem alteração');
    }
  }

  for (const post of [palPost, exprPost]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', post.slug, e.message);
    }
  }

  console.log('OK Cap.', palPost.seriesOrder, palPost.title);
  console.log('OK Cap.', exprPost.seriesOrder, exprPost.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
