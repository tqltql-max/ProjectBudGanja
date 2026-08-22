'use strict';

/**
 * Injeta «link × Klink» na série Palavras.
 * Uso: node scripts/upsert-palavra-link-klink-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildLinkKlinkPost } = require('../lib/link-klink-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function upsertGuiaItem(items, entry) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'relacao' || x.id === 'relação');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

async function main() {
  const post = stampFiles(buildLinkKlinkPost());
  const href = '/posts/post-' + post.slug + '.html';

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);
  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-link-klink';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Link · Klink — orelha cola, étimo corta',
      titleEn: 'Link · Klink — the ear glues, the etymon cuts',
      titleEs: 'Link · Klink — el oído pega, el étimo corta',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: link (elo EN) × sobrenome Klink da Tamara; URL soa a «Tamara link»; metáfora ≠ origem.',
      whyEn: 'Words: link (EN chain-ring) × Tamara’s surname Klink; URL reads as “Tamara link”; metaphor ≠ origin.',
      whyEs: 'Palabras: link (eslabón EN) × apellido Klink de Tamara; URL suena a «Tamara link»; metáfora ≠ origen.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Tamara_Klink',
        'https://pt.wikipedia.org/wiki/Amyr_Klink',
        '/posts/post-inspecao-tamara-klink.html',
        '/posts/post-inspecao-palavra-relacao.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — palavra ≠ pessoa; K ≠ prefixo de link.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-link-klink)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const shared = {
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Link no PT é empréstimo do inglês (elo de corrente / hiperligação), do nórdico hlekkr. Klink é apelido germânico (trinco, lugar ou ravina) — tipo onomástico, não biografia da Tamara.',
      curiosities:
        'tamaraklink.com soa a «Tamara link». O laboratório aceita a metáfora de elo (caminho/passar) e recusa o étimo. Alemão link = esquerda — falso amigo. Coronel Klink = outro mapa.',
      historyEn:
        'Portuguese link is an English loan (chain-ring / hyperlink), from Old Norse hlekkr. Klink is a Germanic-type surname (latch, place or ravine) — onomastic type, not Tamara’s biography.',
      curiositiesEn:
        'tamaraklink.com reads as “Tamara link”. The lab accepts the craft metaphor and refuses the etymon. German link = left — false friend.',
      historyEs:
        'Link en PT es préstamo del inglés (eslabón / hipervínculo), del nórdico hlekkr. Klink es apellido germánico (pestillo, lugar o barranco) — tipo onomástico, no biografía.',
      curiositiesEs:
        'tamaraklink.com suena a «Tamara link». El laboratorio acepta la metáfora y rechaza el étimo. Alemán link = izquierda — falso amigo.'
    };
    upsertGuiaItem(items, {
      id: 'link',
      word: 'link',
      simple:
        'Loanword EN: elo / hiperligação. A orelha cola no Klink da Tamara; o étimo corta. Metáfora de caminho ≠ origem do apelido.',
      simpleEn: 'EN loan: chain-ring / hyperlink. The ear glues it to Tamara’s Klink; the etymon cuts. Craft metaphor ≠ surname origin.',
      simpleEs: 'Préstamo EN: eslabón / hipervínculo. El oído lo pega al Klink de Tamara; el étimo corta. Metáfora ≠ origen.',
      ...shared
    });
    upsertGuiaItem(items, {
      id: 'klink',
      word: 'Klink',
      simple:
        'Sobrenome de Tamara e Amyr. Tipo germânico (trinco / lugar / ravina). ≠ link inglês; ≠ alemão link «esquerda». Palavra ≠ pessoa.',
      simpleEn: 'Surname of Tamara and Amyr. Germanic type (latch / place / ravine). ≠ English link; ≠ German link “left”. Word ≠ person.',
      simpleEs: 'Apellido de Tamara y Amyr. Tipo germánico. ≠ link inglés; ≠ alemán link «izquierda». Palabra ≠ persona.',
      ...shared
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (link / Klink)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const hrefGloss = '/posts/post-inspecao-palavra-link.html';
    const block =
      '    link: { tone: "craft", category: "Elo", mundane: "Hiperligação / elo de corrente (loan EN).", gloss: "EN link ← nórdico hlekkr — elo. A orelha cola no Klink da Tamara; o étimo corta; metáfora de caminho ≠ origem; Valeu !!!", href: "' +
      hrefGloss +
      '", en: "link / hyperlink", es: "enlace", fr: "lien", it: "link", de: "Link (≠ link=esquerda)", el: "σύνδεσμος", la: "nexus", yo: "asopọ", sw: "kiungo", gez: "link", nl: "link", pl: "link", ru: "ссылка", uk: "посилання", zh: "链接", ja: "リンク", ko: "링크", ar: "رابط", he: "קישור", hi: "लिंक", tr: "bağlantı", sv: "länk", da: "link", no: "lenke", fi: "linkki", cs: "odkaz", ro: "link", hu: "link", ca: "enllaç", gl: "ligazón", eu: "esteka", gn: "joaju", qu: "t\'inki", eo: "ligilo", vi: "liên kết", id: "tautan", th: "ลิงก์", hr: "poveznica", sk: "odkaz", ga: "nasc", cy: "dolen", ha: "mahaɗi", am: "አገናኝ", fa: "پیوند", bn: "লিংক", zu: "isixhumanisi" },\n' +
      '    klink: { tone: "craft", gloss: "Sobrenome Tamara/Amyr — tipo germânico (trinco/lugar/ravina); ≠ link EN; ≠ DE link esquerda; palavra ≠ pessoa.", href: "' +
      hrefGloss +
      '", en: "Klink (surname)", es: "Klink (apellido)" },\n' +
      '    "tamara klink": { gloss: "Pessoa: ver ficha de legado. A palavra link × o apelido: esta ficha.", href: "/posts/post-inspecao-tamara-klink.html", en: "Tamara Klink", es: "Tamara Klink" },\n';

    if (/    link:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    link:\s*\{[\s\S]*?\},/, block.split('\n')[0].trimEnd() + ',');
      console.log('Glossário actualizado (link · existente)');
    } else {
      const inserted = insertAfterKey(gloss, 'relação', block) || insertAfterKey(gloss, 'relacao', block);
      if (inserted) {
        gloss = inserted;
        console.log('Glossário actualizado (link · após relação)');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
      }
    }
    await writeJsonRetry(GLOSS_FILE, gloss);
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
