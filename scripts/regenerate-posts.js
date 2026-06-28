const fs = require('fs');
const path = require('path');
const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
const { publishStaticAssets } = require('../lib/publish-static.js');
const { mergeGuiaInspecoesPosts } = require('../lib/merge-guia-inspecoes.js');
const { ROOT } = require('../lib/paths.js');
const postsPath = path.join(ROOT, 'posts.json');
const posts = mergeGuiaInspecoesPosts(JSON.parse(fs.readFileSync(postsPath, 'utf8')));

const keep = new Set(posts.map((p) => p.filename));

function cleanPostFiles(dir, prefix) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? prefix + '/' + entry.name : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanPostFiles(full, rel);
    } else if (entry.isFile() && entry.name.startsWith('post-') && entry.name.endsWith('.html') && !keep.has(rel)) {
      fs.unlinkSync(full);
      console.log('Removed', rel);
    }
  }
}

cleanPostFiles(ROOT, '');

for (const post of posts) {
  if (post.published === false) continue;
  const out = path.join(ROOT, post.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(post), 'utf8');
  console.log('Generated', post.filename);
}

publishStaticAssets(ROOT);
console.log('posts-public.json and listing pages updated');
