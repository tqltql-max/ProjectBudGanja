'use strict';

/**
 * Injeta par «mão esquerda / mão direita» na série Palavras.
 * Uso: node scripts/upsert-palavra-mao-esquerda-direita-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildMaoEsquerdaDireitaPost
} = require('../lib/palavras-inspecoes-posts.js');

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

function upsertGuiaEntry(items, entry, afterId) {
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = afterId ? items.findIndex((x) => x.id === afterId) : -1;
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
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
  const post = buildMaoEsquerdaDireitaPost();
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
    const sugId = 'palavra-mao-esquerda-direita';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Mão esquerda / mão direita — complementaridade do ofício',
      titleEn: 'Left hand / right hand — complementarity of craft',
      titleEs: 'Mano izquierda / mano derecha — complementariedad del oficio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: «mão esquerda» / «mão direita» (*manus*) — complementaridade de ofício; secção mão direita × coração (gesto × cuidado); anti-estigma.',
      whyEn: 'Words: “mão esquerda” / “mão direita” (*manus*) — craft complementarity; right hand × heart (gesture × care); anti-stigma.',
      whyEs: 'Palabras: «mão esquerda» / «mão direita» (*manus*) — complementariedad de oficio; mano derecha × corazón (gesto × cuidado); anti-estigma.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        'https://pt.wikipedia.org/wiki/M%C3%A3o',
        'https://pt.wiktionary.org/wiki/esquerda',
        'https://pt.wiktionary.org/wiki/direita',
        'https://en.wiktionary.org/wiki/manus#Latin',
        'https://pt.wikipedia.org/wiki/Cora%C3%A7%C3%A3o',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-backspace.html',
        '/posts/post-inspecao-palavra-esquerdo.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html',
        '/vida/',
        '/vida/diario/'
      ],
      notes: 'Par único Cap. 25 — complementaridade de ofício; secção mão direita × coração; evitar preconceito «sinistra».'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-mao-esquerda-direita)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const shared = {
      group: 'lexico',
      fromTitle: false,
      href
    };
    upsertGuiaEntry(
      items,
      Object.assign(
        {
          id: 'mao',
          word: 'Mão',
          simple:
            'Latim *manus* — ferramenta do gesto: cultivar, escrever, teclar; no BudGanja entra no par esquerda × direita.',
          simpleEn:
            'Latin *manus* — tool of gesture: grow, write, type; in BudGanja enters the left × right pair.',
          simpleEs:
            'Latín *manus* — herramienta del gesto: cultivar, escribir, teclear; en BudGanja entra en el par izquierda × derecha.'
        },
        shared
      ),
      'maconha'
    );
    upsertGuiaEntry(
      items,
      Object.assign(
        {
          id: 'esquerda',
          word: 'Esquerda',
          simple:
            'Lado esquerdo / mão esquerda — no BudGanja, papel de ofício (apoiar, estabilizar) sem moral «sinistra».',
          simpleEn:
            'Left side / left hand — in BudGanja, a craft role (support, stabilize) without “sinistra” moral stigma.',
          simpleEs:
            'Lado izquierdo / mano izquierda — en BudGanja, papel de oficio (apoyar, estabilizar) sin moral «sinistra».'
        },
        shared
      ),
      'emocao'
    );
    upsertGuiaEntry(
      items,
      Object.assign(
        {
          id: 'direita',
          word: 'Direita',
          simple:
            'Lado direito / mão direita — ofício (executar, precisar); elo metáfora mão direita × coração (gesto × cuidado), sem moral dualista.',
          simpleEn:
            'Right side / right hand — craft (execute, refine); metaphor right hand × heart (gesture × care), no moral dualism.',
          simpleEs:
            'Lado derecho / mano derecha — oficio (ejecutar, precisar); metáfora mano derecha × corazón (gesto × cuidado), sin dualismo moral.'
        },
        shared
      ),
      'diamba'
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (mão / esquerda / direita)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
