'use strict';

/**
 * Remove referências a loja parceira / links /loja/ do conteúdo dos posts na store + posts.json.
 * Não regenera texto a partir dos builders — só limpa strings existentes.
 */

require('../lib/load-env.js');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { createAppStore } = require('../lib/create-store.js');
const { normalizePosts } = require('../lib/posts-service.js');

function stripLojaRefs(text) {
  let s = String(text || '');
  s = s.replace(/Equipamentos verificados \(loja parceira\)/gi, 'Equipamentos verificados');
  s = s.replace(/Loja parceira · /gi, '');
  s = s.replace(/Loja parceira/gi, 'Materiais');
  s = s.replace(/\[([^\]]+)\]\(\/loja\/#[^)]+\)/g, '$1');
  s = s.replace(/<a href="\/loja\/#[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, '$1');
  s = s.replace(/<aside class="equip-loja-materials[\s\S]*?<\/aside>/gi, '');
  return s;
}

async function run() {
  const postsPath = path.join(ROOT, 'posts.json');
  let filePosts = [];
  try {
    filePosts = JSON.parse(fs.readFileSync(postsPath, 'utf8') || '[]');
  } catch (e) {
    filePosts = [];
  }

  const store = await createAppStore({ root: ROOT, netlify: false });
  const storePosts = normalizePosts(await store.getPosts());
  const bySlug = new Map();
  filePosts.forEach((p) => {
    if (p && p.slug) bySlug.set(p.slug, p);
  });
  storePosts.forEach((p) => {
    if (p && p.slug) bySlug.set(p.slug, p);
  });

  let changed = 0;
  const next = Array.from(bySlug.values()).map((p) => {
    const raw = p.content_raw || p.content || '';
    const cleaned = stripLojaRefs(raw);
    if (cleaned === raw) return p;
    changed += 1;
    return Object.assign({}, p, { content_raw: cleaned });
  });

  const normalized = normalizePosts(next);
  await store.setPosts(normalized);
  fs.writeFileSync(postsPath, JSON.stringify(normalized, null, 2), 'utf8');
  console.log('strip-loja-parceira-from-posts: %d posts actualizados; total=%d', changed, normalized.length);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
