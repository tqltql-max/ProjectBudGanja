'use strict';

/**
 * Injeta / actualiza a inspeção MovReCam em posts.json a partir do builder.
 * Uso: node scripts/upsert-movrecam-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMovrecamInspectionPost } = require('../lib/channel-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');

const post = buildMovrecamInspectionPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
const idx = posts.findIndex((p) => p.slug === post.slug);

if (idx >= 0) {
  posts[idx] = Object.assign({}, posts[idx], post);
  console.log('Actualizado', post.slug, 'em índice', idx);
} else {
  posts.unshift(post);
  console.log('Inserido', post.slug, 'no início');
}

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

const embeds = (post.content_raw.match(/@youtube\s+/g) || []).length;
console.log(
  'OK:',
  post.title,
  '| embeds @youtube:',
  embeds,
  '| content_raw',
  (post.content_raw || '').length,
  'chars'
);
