'use strict';

/**
 * Caderno Mortal Kombat + palavras do game / HUD.
 * Uso: node scripts/upsert-mortal-kombat-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildMortalKombatCadernoPost,
  YT,
  WIKI_1992,
  WIKI_FAT,
  WIKI_MK2
} = require('../lib/mortal-kombat-inspecao-post.js');
const { buildMortalKombatPalavrasPosts } = require('../lib/mortal-kombat-palavras-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const JOGO_HREF = '/posts/post-inspecao-jogo-mortal-kombat.html';

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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertGuia(items, entry) {
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else items.push(entry);
}

function nextJogoOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'cadernos-jogo')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function glossLine(key, href, gloss, en, es) {
  return (
    '    ' +
    key +
    ': { tone: "caution", category: "Jogo", mundane: "' +
    gloss.replace(/"/g, '\\"') +
    '", gloss: "' +
    gloss.replace(/"/g, '\\"') +
    '", href: "' +
    href +
    '", en: "' +
    en +
    '", es: "' +
    es +
    '" },\n'
  );
}

function patchGlossary(gloss) {
  const block =
    glossLine(
      'fight',
      '/posts/post-inspecao-palavra-fight.html',
      'Grito que abre o round no MK; ≠ briga na rua; Valeu !!!',
      'Fight (announcer)',
      'Fight (anunciador)'
    ) +
    glossLine(
      'round',
      '/posts/post-inspecao-palavra-round.html',
      'Unidade da luta no HUD; boca Raund; Valeu !!!',
      'round (match unit)',
      'round / asalto'
    ) +
    glossLine(
      'raund',
      '/posts/post-inspecao-palavra-round.html',
      'Fala viva de round — ver ficha Round.',
      'round (living Raund)',
      'Raund'
    ) +
    glossLine(
      'finish',
      '/posts/post-inspecao-palavra-finish.html',
      'Aviso MK (Finish Him/Her); não é o fim da pessoa; Valeu !!!',
      'Finish (prompt)',
      'Finish / Acábalo'
    ) +
    glossLine(
      'fatality',
      '/posts/post-inspecao-palavra-fatality.html',
      'Fecho letal nomeado MK; boca Fatallitty; sem golpes; Valeu !!!',
      'Fatality',
      'Fatality'
    ) +
    glossLine(
      'fatallitty',
      '/posts/post-inspecao-palavra-fatality.html',
      'Fala viva de Fatality — ver ficha.',
      'Fatality (living)',
      'Fatallitty'
    ) +
    glossLine(
      'brutality',
      '/posts/post-inspecao-palavra-brutality.html',
      'Fecho irmão da Fatality; boca Brutalititi; Valeu !!!',
      'Brutality',
      'Brutality'
    ) +
    glossLine(
      'brutalititi',
      '/posts/post-inspecao-palavra-brutality.html',
      'Fala viva de Brutality — ver ficha.',
      'Brutality (living)',
      'Brutalititi'
    ) +
    glossLine(
      'babality',
      '/posts/post-inspecao-palavra-babality.html',
      'Fecho satírico MK II (bebé); boca babalitity; Valeu !!!',
      'Babality',
      'Babality'
    ) +
    glossLine(
      'babalitity',
      '/posts/post-inspecao-palavra-babality.html',
      'Fala viva de Babality — ver ficha.',
      'Babality (living)',
      'babalitity'
    ) +
    glossLine(
      'hp',
      '/posts/post-inspecao-palavra-hp.html',
      'Hit points — barra de HUD; ≠ Vida do laboratório; Valeu !!!',
      'HP / hit points',
      'HP'
    ) +
    glossLine(
      'mana',
      '/posts/post-inspecao-palavra-mana.html',
      'Reserva de magia no HUD; ≠ rito; Valeu !!!',
      'mana / MP',
      'maná / MP'
    ) +
    glossLine(
      'energia',
      '/posts/post-inspecao-palavra-vida-energia.html',
      'Meter de HUD (stamina/especial); par da vida-barra; Valeu !!!',
      'energy (meter)',
      'energía (HUD)'
    ) +
    glossLine(
      '"vida energia"',
      '/posts/post-inspecao-palavra-vida-energia.html',
      'Par HUD: barra de HP × meter; ≠ Vida do laboratório; Valeu !!!',
      'life × energy (HUD)',
      'vida × energía (HUD)'
    ) +
    glossLine(
      '"vida × energia"',
      '/posts/post-inspecao-palavra-vida-energia.html',
      'Par HUD: barra de HP × meter; ≠ Vida do laboratório; Valeu !!!',
      'life × energy (HUD)',
      'vida × energía (HUD)'
    ) +
    glossLine(
      'vidaenergia',
      '/posts/post-inspecao-palavra-vida-energia.html',
      'Forma colada de vida energia (HUD) — ≠ ficha Vida.',
      'life-energy (HUD, glued)',
      'vidaenergia (HUD)'
    ) +
    glossLine(
      'kombat',
      JOGO_HREF,
      'Marca Mortal Kombat (K); boca Konbat; caderno 4; Valeu !!!',
      'Kombat',
      'Kombat'
    ) +
    glossLine(
      'konbat',
      JOGO_HREF,
      'Fala viva de Kombat — ver caderno Mortal Kombat.',
      'Kombat (living Konbat)',
      'Konbat'
    );

  if (/    fight:\s*\{/.test(gloss)) {
    gloss = gloss.replace(
      /    fight:\s*\{[\s\S]*?konbat:\s*\{[\s\S]*?\},\r?\n/,
      block
    );
  } else if (/    skill:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    skill:\s*\{[\s\S]*?\},\r?\n)/, '$1' + block);
  }
  return gloss;
}

async function syncSql(list) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  list.forEach((p) => upsertPost(posts, p));
  await store.setPosts(posts);
  console.log('SQL store actualizado');
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-mortal-kombat-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 60000
    });
  } catch (e) {
    console.warn('Aviso capas:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const jogoOrder = 4;
  const jogo = stampFiles(buildMortalKombatCadernoPost(jogoOrder));
  const palavras = buildMortalKombatPalavrasPosts().map((p, i) => {
    p.seriesOrder = 250 + i;
    return stampFiles(p);
  });
  const list = [jogo].concat(palavras);

  list.forEach((p) => upsertPost(posts, p));
  await writeJsonRetry(POSTS_FILE, posts);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'jogo-mortal-kombat-caderno-4',
      title: 'Mortal Kombat — caderno 4, o fliperama e as palavras',
      titleEn: 'Mortal Kombat — notebook 4, the cabinet and the words',
      titleEs: 'Mortal Kombat — cuaderno 4, el fliperama y las palabras',
      tipo: 'jogo',
      priority: 1,
      status: 'feita',
      why: 'Caderno 4: MK 1992; léxico Fight/Round/Finish/Fatality/Brutality/Babality + HUD; sem golpes.',
      whyEn: 'Notebook 4: MK 1992 lexicon + HUD; no move list.',
      whyEs: 'Cuaderno 4: léxico MK 1992 + HUD; sin golpes.',
      suggestedSlug: jogo.slug,
      doneHref: JOGO_HREF,
      seriesHint: 'cadernos-jogo',
      sources: [WIKI_1992, WIKI_FAT, WIKI_MK2, YT, JOGO_HREF],
      notes: 'Cap. ' + jogo.seriesOrder
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const guiaRows = [
      {
        id: 'fight',
        word: 'Fight',
        simple: 'Grito que abre o round no Mortal Kombat — não é briga na rua.',
        href: '/posts/post-inspecao-palavra-fight.html'
      },
      {
        id: 'round',
        word: 'Round',
        simple: 'Unidade da luta no HUD; fala viva Raund.',
        href: '/posts/post-inspecao-palavra-round.html'
      },
      {
        id: 'finish',
        word: 'Finish',
        simple: 'Aviso Finish Him/Her no MK — não é o fim da pessoa.',
        href: '/posts/post-inspecao-palavra-finish.html'
      },
      {
        id: 'fatality',
        word: 'Fatality',
        simple: 'Fecho letal nomeado (boca Fatallitty). Sem lista de golpes.',
        href: '/posts/post-inspecao-palavra-fatality.html'
      },
      {
        id: 'brutality',
        word: 'Brutality',
        simple: 'Fecho irmão da Fatality (boca Brutalititi).',
        href: '/posts/post-inspecao-palavra-brutality.html'
      },
      {
        id: 'babality',
        word: 'Babality',
        simple: 'Fecho satírico MK II — o rival vira bebé (boca babalitity).',
        href: '/posts/post-inspecao-palavra-babality.html'
      },
      {
        id: 'hp',
        word: 'HP',
        simple: 'Hit points — barra de HUD. Não é a Vida do laboratório.',
        href: '/posts/post-inspecao-palavra-hp.html'
      },
      {
        id: 'mana',
        word: 'Mana',
        simple: 'Reserva de magia no HUD — contador, não rito.',
        href: '/posts/post-inspecao-palavra-mana.html'
      },
      {
        id: 'vida-energia',
        word: 'vida × energia',
        simple: 'Duas barras do HUD. A Vida do laboratório é outra ficha.',
        href: '/posts/post-inspecao-palavra-vida-energia.html'
      }
    ];
    guiaRows.forEach((row) => {
      upsertGuia(items, {
        id: row.id,
        word: row.word,
        simple: row.simple,
        simpleEn: row.simple,
        simpleEs: row.simple,
        group: 'lexico',
        fromTitle: false,
        href: row.href
      });
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let g = fs.readFileSync(GLOSS_FILE, 'utf8');
    g = patchGlossary(g);
    fs.writeFileSync(GLOSS_FILE, g);
    console.log('Glossário actualizado');
  }

  try {
    list.forEach(writeHtml);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  try {
    await syncSql(list);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', list.length, 'fichas');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
