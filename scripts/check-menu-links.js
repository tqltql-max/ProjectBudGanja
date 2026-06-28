'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const { ROOT } = require('../lib/paths.js');
const BASE = 'http://localhost:8080';

function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(BASE + urlPath, { timeout: 8000 }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        resolve({
          url: urlPath,
          status: res.statusCode,
          body: Buffer.concat(chunks).toString('utf8')
        });
      });
    }).on('error', (e) => resolve({ url: urlPath, status: 'ERR', error: e.message }));
  });
}

function collectHrefs(html) {
  const hrefs = new Set();
  const re = /\bhref=["']([^"'#?]+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const h = m[1];
    if (!/^https?:\/\//i.test(h) && !h.startsWith('mailto:')) hrefs.add(h);
  }
  return hrefs;
}

function walkNav(items, hrefs) {
  (items || []).forEach((item) => {
    if (item.href) hrefs.add(item.href);
    if (item.children) walkNav(item.children, hrefs);
  });
}

async function main() {
  const siteRaw = fs.readFileSync(path.join(ROOT, 'content', 'site.json'), 'utf8').replace(/^\uFEFF/, '');
  const site = JSON.parse(siteRaw);
  const indexRes = await fetchUrl('/');
  const hrefs = collectHrefs(indexRes.body);
  walkNav(site.nav, hrefs);
  walkNav(site.footerLinks, hrefs);
  (site.footerGroups || []).forEach((g) => walkNav(g.links, hrefs));

  const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts-public.json'), 'utf8'));
  posts.slice(0, 6).forEach((p) => {
    if (p.url) hrefs.add(p.url.startsWith('/') ? p.url.slice(1) : p.url);
    if (p.filename) hrefs.add(p.filename);
  });

  const paths = [...hrefs].sort();
  const results = await Promise.all(paths.map((h) => {
    const p = h.startsWith('/') ? h : '/' + h;
    return fetchUrl(p);
  }));

  const bad = results.filter((r) => r.status !== 200);
  console.log('Links testados:', paths.length);
  console.log('OK:', results.filter((r) => r.status === 200).length);
  if (bad.length) {
    console.log('\nCOM ERRO:');
    bad.forEach((r) => console.log(' ', r.status, r.url, r.error || ''));
    process.exit(1);
  }
  console.log('Nenhum link com erro.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
