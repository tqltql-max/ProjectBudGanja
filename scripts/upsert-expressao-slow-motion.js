'use strict';

/**
 * Injeta a expressão «slow motion» e refresca o elo em tempo.
 * Uso: node scripts/upsert-expressao-slow-motion.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildSlowMotionPost, WIKI, WIKI_PT, WIKT } = require('../lib/slow-motion-inspecao-post.js');
const { buildTempoPost } = require('../lib/tempo-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-slow-motion.html';

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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || []).map((id) => items.findIndex((x) => x.id === id)).find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

function keepTempoOrder(posts) {
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-tempo');
  const order = existing && Number(existing.seriesOrder) ? Number(existing.seriesOrder) : undefined;
  return stampFiles(buildTempoPost(order));
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
  list.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', list.map((p) => p.slug).join(', '));
}

function patchGlossary(gloss) {
  const block =
    '    "slow motion": { tone: "craft", category: "Ecrã", mundane: "Movimento aparente mais lento no ecrã; também figura de dia atrasado.", gloss: "Loan EN — esticar o gesto no ecrã, não o relógio; calco câmera/câmara lenta; motion ≠ emotion; ≠ time-lapse; Valeu !!!", href: "/posts/post-inspecao-expressao-slow-motion.html", en: "slow motion", es: "cámara lenta" },\n' +
    '    slowmotion: { gloss: "Cola de teclado de slow motion. Corte na ficha da expressão.", href: "/posts/post-inspecao-expressao-slow-motion.html", en: "slowmotion (glued)", es: "slowmotion" },\n' +
    '    "slo-mo": { gloss: "Corte oral de slow motion. Corte na ficha da expressão.", href: "/posts/post-inspecao-expressao-slow-motion.html", en: "slo-mo", es: "slo-mo" },\n' +
    '    "câmera lenta": { gloss: "Calco BR de slow motion. Corte na ficha da expressão.", href: "/posts/post-inspecao-expressao-slow-motion.html", en: "slow motion (calque)", es: "cámara lenta" },\n' +
    '    "camera lenta": { gloss: "Grafia sem acento de câmera lenta — ver slow motion.", href: "/posts/post-inspecao-expressao-slow-motion.html", en: "slow motion (unaccented)", es: "camara lenta" },\n' +
    '    "câmara lenta": { gloss: "Calco PT-PT de slow motion. Corte na ficha da expressão.", href: "/posts/post-inspecao-expressao-slow-motion.html", en: "slow motion (PT calque)", es: "cámara lenta" },\n';

  if (/    "slow motion":\s*\{/.test(gloss)) {
    console.log('Glossário: slow motion já existia — bloco não duplicado');
    return gloss;
  }
  if (/    lento:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    lento:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else if (/    "loop infinito":\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    "loop infinito":\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else {
    console.warn('Aviso: glossário — ponto de inserção não encontrado');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-slow-motion-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const post = stampFiles(buildSlowMotionPost());
  const tempo = keepTempoOrder(posts);
  upsertPost(posts, post);
  upsertPost(posts, tempo);
  await writeJsonRetry(POSTS_FILE, posts);

  for (const item of [post, tempo]) {
    try {
      writeHtml(item);
    } catch (e) {
      console.warn('Aviso HTML', item.slug, e.message);
    }
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, tempo);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-slow-motion';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'slow motion — o gesto esticado no ecrã; motion ≠ emotion',
      titleEn: 'slow motion — the gesture stretched on screen; motion ≠ emotion',
      titleEs: 'slow motion — el gesto estirado en pantalla; motion ≠ emotion',
      tipo: 'expressao',
      priority: 1,
      status: 'feita',
      why: 'Expressões: slow motion — loan EN / câmera lenta; ≠ emotion ≠ time-lapse; irmã tempo.',
      whyEn: 'Sayings: slow motion — EN loan / câmera lenta; ≠ emotion ≠ time-lapse; sister tempo.',
      whyEs: 'Dichos: slow motion — préstamo EN / câmera lenta; ≠ emotion ≠ time-lapse; hermana tempo.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'expressoes-ditados',
      sources: [
        HREF,
        WIKT,
        WIKI,
        WIKI_PT,
        '/posts/post-inspecao-palavra-tempo.html',
        '/posts/post-inspecao-palavra-emocao.html',
        '/posts/post-inspecao-filme-the-matrix.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — ecrã primeiro; o relógio não para.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (expressao-slow-motion)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'slow-motion',
        word: 'slow motion',
        simple:
          'Loan EN: esticar o gesto no ecrã, não o relógio. Calco: câmera / câmara lenta. Motion ≠ emotion. Contrário: time-lapse. Irmã: tempo. Valeu !!!',
        simpleEn:
          'EN loan: stretch the gesture on screen, not the clock. Calque: câmera / câmara lenta. Motion ≠ emotion. Inverse: time-lapse. Sister: tempo. Valeu !!!',
        simpleEs:
          'Préstamo EN: estirar el gesto en pantalla, no el reloj. Calco: câmera / câmara lenta. Motion ≠ emotion. Contrario: time-lapse. Hermana: tempo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['tempo', 'loop-infinito', 'emocao']
    );
    upsertItem(
      items,
      {
        id: 'camera-lenta',
        word: 'câmera lenta',
        simple:
          'Calco de slow motion. A câmara pode ser rápida; o ecrã é que atrasa. Corte na ficha slow motion. Valeu !!!',
        simpleEn:
          'Calque of slow motion. The camera may be fast; the screen is what lags. Cut on the slow motion sheet. Valeu !!!',
        simpleEs:
          'Calco de slow motion. La cámara puede ser rápida; la pantalla es la que atrasa. Corte en la ficha slow motion. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['slow-motion', 'tempo']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (slow-motion · câmera lenta)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (slow motion)');
    }
  }

  try {
    await syncSql([post, tempo]);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
