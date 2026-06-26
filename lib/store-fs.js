const fs = require('fs');
const path = require('path');

function createFsStore(root) {
  const postsPath = path.join(root, 'posts.json');
  const pagesPath = path.join(root, 'content', 'pages.json');
  const sitePath = path.join(root, 'content', 'site.json');
  const sessionsPath = path.join(root, 'content', 'sessions.json');
  const uploadsDir = path.join(root, 'uploads');

  if (!fs.existsSync(uploadsDir)) {
    try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch (e) { /* ignore */ }
  }

  function readJson(file, fallback) {
    try {
      return JSON.parse(fs.readFileSync(file, 'utf8') || '');
    } catch (e) {
      return fallback;
    }
  }

  return {
    async getPosts() {
      return readJson(postsPath, []);
    },
    async setPosts(posts) {
      fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf8');
    },
    async getPages() {
      return readJson(pagesPath, null);
    },
    async setPages(pages) {
      const dir = path.dirname(pagesPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');
    },
    async getSite() {
      return readJson(sitePath, null);
    },
    async setSite(site) {
      const dir = path.dirname(sitePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(sitePath, JSON.stringify(site, null, 2), 'utf8');
    },
    async getSessions() {
      return readJson(sessionsPath, {});
    },
    async setSessions(sessions) {
      const dir = path.dirname(sessionsPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(sessionsPath, JSON.stringify(sessions), 'utf8');
    },
    async saveUpload(name, buffer) {
      const out = path.join(uploadsDir, name);
      fs.writeFileSync(out, buffer);
      return `/uploads/${name}`;
    },
    async getUpload(name) {
      const fp = path.join(uploadsDir, name);
      if (!fs.existsSync(fp)) return null;
      const buf = fs.readFileSync(fp);
      const ext = path.extname(name).toLowerCase();
      const types = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' };
      return { buffer: buf, contentType: types[ext] || 'application/octet-stream' };
    }
  };
}

module.exports = { createFsStore };
