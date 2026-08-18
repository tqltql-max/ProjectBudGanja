'use strict';

/**
 * Injeta Friends e How I Met Your Mother como fichas Artes SEPARADAS.
 * Uso: node scripts/upsert-friends-himym-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildFriendsPost, buildHimymPost } = require('../lib/friends-himym-inspecoes-posts.js');
const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');

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

function upsertEntry(items, key, entry) {
  const i = items.findIndex((x) => x[key] === entry[key]);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else items.push(entry);
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

function writeHtml(post) {
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

async function main() {
  ['generate-friends-cover.js', 'generate-himym-cover.js'].forEach((script) => {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 40000
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  });

  const friends = buildFriendsPost();
  const himym = buildHimymPost();
  const list = [friends, himym];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const friendsHref = '/posts/post-' + friends.slug + '.html';
  const himymHref = '/posts/post-' + himym.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertEntry(items, 'id', {
      id: 'arte-serie-friends',
      title: 'Friends — a turma de 1994 e a série que é o texto',
      titleEn: 'Friends — the 1994 ensemble and the series as the text',
      titleEs: 'Friends — la tropa de 1994 y la serie como texto',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes: Friends (1994–2004) — Crane / Kauffman; a série é a génese. Ficha própria.',
      whyEn: 'Arts: Friends (1994–2004) — Crane / Kauffman; the series is the origin. Own sheet.',
      whyEs: 'Artes: Friends (1994–2004) — Crane / Kauffman; la serie es el origen. Ficha propia.',
      suggestedSlug: friends.slug,
      doneHref: friendsHref,
      seriesHint: 'artes-cultura',
      sources: [friends.sourceUrl, himymHref, 'https://www.youtube.com/watch?v=sLisEEwYZvw'],
      notes: 'Separado de How I Met Your Mother. Sitcom ≠ manual. Pessoa ≠ personagem.'
    });
    upsertEntry(items, 'id', {
      id: 'arte-serie-how-i-met-your-mother',
      title: 'How I Met Your Mother — o relato, o tempo e a série de 2005',
      titleEn: 'How I Met Your Mother — the telling, time and the 2005 series',
      titleEs: 'How I Met Your Mother — el relato, el tiempo y la serie de 2005',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes: How I Met Your Mother (2005–2014) — Bays / Thomas; a série é a génese. Ficha própria.',
      whyEn: 'Arts: How I Met Your Mother (2005–2014) — Bays / Thomas; the series is the origin. Own sheet.',
      whyEs: 'Artes: How I Met Your Mother (2005–2014) — Bays / Thomas; la serie es el origen. Ficha propia.',
      suggestedSlug: himym.slug,
      doneHref: himymHref,
      seriesHint: 'artes-cultura',
      sources: [himym.sourceUrl, friendsHref, 'https://www.youtube.com/watch?v=cjJLEYMzpjc'],
      notes: 'Separado de Friends. Sitcom ≠ manual de conquista. Final = recepção.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (duas fichas separadas)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertEntry(items, 'id', {
      id: 'friends',
      word: 'Friends',
      simple:
        'Sitcom de 1994–2004; no site, inspeção em Artes — Crane / Kauffman; a série é o texto. Ficha própria, distinta de How I Met Your Mother.',
      simpleEn:
        '1994–2004 sitcom; on the site, an Arts inspection — Crane / Kauffman; the series is the text. Own sheet, distinct from How I Met Your Mother.',
      simpleEs:
        'Sitcom de 1994–2004; en el sitio, inspección en Artes — Crane / Kauffman. Ficha propia, distinta de How I Met Your Mother.',
      group: 'lexico',
      fromTitle: false,
      href: friendsHref
    });
    upsertEntry(items, 'id', {
      id: 'how-i-met-your-mother',
      word: 'How I Met Your Mother',
      simple:
        'Sitcom de 2005–2014; no site, inspeção em Artes — Bays / Thomas; relato e tempo. Ficha própria, distinta de Friends.',
      simpleEn:
        '2005–2014 sitcom; on the site, an Arts inspection — Bays / Thomas; telling and time. Own sheet, distinct from Friends.',
      simpleEs:
        'Sitcom de 2005–2014; en el sitio, inspección en Artes — Bays / Thomas. Ficha propia, distinta de Friends.',
      group: 'lexico',
      fromTitle: false,
      href: himymHref
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado');
  }

  list.forEach(writeHtml);

  try {
    const { publishStaticAssets } = require('../lib/publish-static.js');
    publishStaticAssets(ROOT);
    console.log('Listagens actualizadas');
  } catch (e) {
    console.warn('Aviso listagens', e.message);
  }

  list.forEach((p) => console.log('OK:', p.title));
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
