'use strict';
const fs = require('fs');
const path = require('path');
const { buildPostHtml } = require('../lib/posts-service.js');
const slug = process.argv[2];
if (!slug) {
  console.error('uso: node scripts/regen-one-post.js <slug>');
  process.exit(1);
}
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
const post = posts.find((p) => p.slug === slug);
if (!post) {
  console.error('slug não encontrado:', slug);
  process.exit(1);
}
const filename = post.filename || 'posts/post-' + slug + '.html';
fs.writeFileSync(path.join(__dirname, '..', filename), buildPostHtml(post));
console.log('Generated', filename);
