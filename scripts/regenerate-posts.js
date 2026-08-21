const fs = require('fs');
const path = require('path');
const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
const { publishStaticAssets } = require('../lib/publish-static.js');
const { mergeGuiaInspecoesPosts } = require('../lib/merge-guia-inspecoes.js');
const { ROOT } = require('../lib/paths.js');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');
const postsPath = path.join(ROOT, 'posts.json');
const posts = mergeGuiaInspecoesPosts(JSON.parse(fs.readFileSync(postsPath, 'utf8')));

const keep = new Set(posts.map((p) => p.filename));

/** HTML leftover slugs that should redirect instead of being deleted. */
const POST_REDIRECTS = [
  {
    from: 'posts/post-inspecao-palavra-xioomi.html',
    to: '/posts/post-inspecao-palavra-xiaomi.html',
    label: 'Xiaomi'
  }
];
for (const r of POST_REDIRECTS) keep.add(r.from);

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
  writeFileRetrySync(out, buildPostHtml(post), 'utf8');
  console.log('Generated', post.filename);
}

publishStaticAssets(ROOT);

for (const r of POST_REDIRECTS) {
  const out = path.join(ROOT, r.from);
  const html =
    '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n' +
    '<meta charset="UTF-8">\n' +
    '<meta http-equiv="refresh" content="0; url=' +
    r.to +
    '">\n' +
    '<link rel="canonical" href="' +
    r.to +
    '">\n' +
    '<title>' +
    r.label +
    '</title>\n' +
    '<script>location.replace(' +
    JSON.stringify(r.to) +
    ');</script>\n' +
    '</head>\n<body>\n<p>A ficha certa é <a href="' +
    r.to +
    '">' +
    r.label +
    '</a>.</p>\n</body>\n</html>\n';
  fs.mkdirSync(path.dirname(out), { recursive: true });
  writeFileRetrySync(out, html, 'utf8');
  console.log('Redirect', r.from, '→', r.to);
}

console.log('posts-public.json and listing pages updated');
