'use strict';

/**
 * Injeta / actualiza a inspeção CANABinALL em posts.json a partir do builder.
 * Uso: node scripts/upsert-canabinall-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildCanabinallInspectionPost } = require('../lib/channel-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');

const post = buildCanabinallInspectionPost();
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
const idx = posts.findIndex((p) => p.slug === post.slug);

if (idx >= 0) {
  posts[idx] = Object.assign({}, posts[idx], post);
  console.log('Actualizado', post.slug, 'em índice', idx);
} else {
  const afterMovrecam = posts.findIndex((p) => p.slug === 'inspecao-canal-movrecam');
  if (afterMovrecam >= 0) {
    posts.splice(afterMovrecam + 1, 0, post);
    console.log('Inserido', post.slug, 'após MovReCam');
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'no início');
  }
}

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
console.log(
  'OK:',
  post.title,
  '|',
  post.videoCount || '',
  'content_raw',
  (post.content_raw || '').length,
  'chars'
);
