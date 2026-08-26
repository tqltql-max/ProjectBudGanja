'use strict';

/**
 * Injeta / actualiza O Magnata (2007) na série Artes · cinema.
 * Uso: node scripts/upsert-filme-o-magnata-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildOMagnataPost } = require('../lib/o-magnata-inspecao-post.js');
const { buildChoraoPost } = require('../lib/pessoas-historia-inspecoes-posts.js');

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

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
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
  console.log('SQL store actualizado:', list.map((p) => p.slug).join(', '));
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-o-magnata-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa', e.message);
  }

  const filme = buildOMagnataPost();
  const chorao = buildChoraoPost();
  const list = [filme, chorao];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + filme.slug + '.html';
  const choraoHref = '/posts/post-' + chorao.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'arte-o-magnata',
      title: 'O Magnata (2007) — filme e elo com Chorão',
      titleEn: 'O Magnata (2007) — film and link to Chorão',
      titleEs: 'O Magnata (2007) — película y vínculo con Chorão',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Longa brasileiro com roteiro de Chorão; cruzar representação urbana com a ficha Pessoas — obra primeiro.',
      whyEn: 'Brazilian feature with Chorão’s screenplay; cross urban representation with the People sheet — work first.',
      whyEs: 'Largometraje brasileño con guion de Chorão; cruzar representación urbana con la ficha Personas — obra primero.',
      suggestedSlug: filme.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        filme.sourceUrl,
        'https://www.gullane.com.br/projetos/o-magnata',
        choraoHref,
        '/posts/post-inspecao-arte-so-os-loucos-sabem.html'
      ],
      notes: 'Foco na obra, não na biografia (já em Pessoas). Preço × valor; não forçar cannabis no enredo.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-o-magnata)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(items, {
      id: 'o-magnata',
      word: 'O Magnata',
      simple:
        'Filme brasileiro de 2007 (Johnny Araújo; roteiro de Chorão). No site, inspeção em Artes — skate, rock e preço × valor; biografia na ficha Pessoas.',
      simpleEn:
        '2007 Brazilian film (Johnny Araújo; screenplay by Chorão). On the site, an Arts inspection — skate, rock and price vs value; biography on the People sheet.',
      simpleEs:
        'Filme brasileño de 2007 (Johnny Araújo; guion de Chorão). En el sitio, inspección en Artes — skate, rock y precio × valor; biografía en la ficha Personas.',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'O Magnata estreou em 15 de novembro de 2007 (Gullane / Buena Vista). Roteiro de Chorão; estreia de Johnny Araújo em longa. A ficha de Artes lê a obra; a de Pessoas inspeciona o letrista.',
      curiosities:
        'Tese do laboratório: preço × valor. Trilha Charlie Brown Jr. — outra obra, outra ficha.',
      historyEn:
        'O Magnata opened on 15 November 2007 (Gullane / Buena Vista). Screenplay by Chorão; Johnny Araújo’s feature debut. The Arts sheet reads the film; People inspects the lyricist.',
      curiositiesEn:
        'Lab thesis: price vs value. Charlie Brown Jr. score is another work, another sheet.',
      historyEs:
        'O Magnata se estrenó el 15 de noviembre de 2007 (Gullane / Buena Vista). Guion de Chorão; estreno de Johnny Araújo en largometraje. Artes lee la obra; Personas inspecciona al letrista.',
      curiositiesEs:
        'Tesis del laboratorio: precio × valor. Banda sonora de Charlie Brown Jr. — otra obra, otra ficha.'
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (o-magnata)');
  }

  try {
    await syncSql(list);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  list.forEach((p) => {
    try {
      writeHtml(p);
    } catch (e) {
      console.warn('Aviso HTML', p.slug, e.message);
    }
  });

  list.forEach((p) => console.log('OK:', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
