const { getStore } = require('@netlify/blobs');

const DATA_STORE = 'budganja-data';
const UPLOADS_STORE = 'budganja-uploads';

function createBlobStore() {
  const data = getStore(DATA_STORE);
  const uploads = getStore(UPLOADS_STORE);

  return {
    async getPosts() {
      return (await data.get('posts', { type: 'json' })) || [];
    },
    async setPosts(posts) {
      await data.setJSON('posts', posts);
    },
    async getPages() {
      return await data.get('pages', { type: 'json' });
    },
    async setPages(pages) {
      await data.setJSON('pages', pages);
    },
    async getSite() {
      return await data.get('site', { type: 'json' });
    },
    async setSite(site) {
      await data.setJSON('site', site);
    },
    async getSessions() {
      return (await data.get('sessions', { type: 'json' })) || {};
    },
    async setSessions(sessions) {
      await data.setJSON('sessions', sessions);
    },
    async getUserSessions() {
      return (await data.get('user-sessions', { type: 'json' })) || {};
    },
    async setUserSessions(sessions) {
      await data.setJSON('user-sessions', sessions);
    },
    async getUsers() {
      return (await data.get('users', { type: 'json' })) || {};
    },
    async setUsers(users) {
      await data.setJSON('users', users);
    },
    async getOAuthStates() {
      return (await data.get('oauth-states', { type: 'json' })) || {};
    },
    async setOAuthStates(states) {
      await data.setJSON('oauth-states', states);
    },
    async getSorteios() {
      return (await data.get('sorteios', { type: 'json' })) || [];
    },
    async setSorteios(entries) {
      await data.setJSON('sorteios', entries);
    },
    async getSorteioConfig() {
      return await data.get('sorteio-config', { type: 'json' });
    },
    async setSorteioConfig(config) {
      await data.setJSON('sorteio-config', config);
    },
    async getGuiaCultivo() {
      return await data.get('guia-cultivo', { type: 'json' });
    },
    async setGuiaCultivo(guia) {
      await data.setJSON('guia-cultivo', guia);
    },
    async getYoutubeFeed() {
      return await data.get('youtube-feed', { type: 'json' });
    },
    async setYoutubeFeed(feed) {
      await data.setJSON('youtube-feed', feed);
    },
    async saveUpload(name, buffer) {
      const safeRel = String(name || '').replace(/\\/g, '/').replace(/^\/+/, '');
      if (!safeRel || safeRel.includes('..')) {
        throw new Error('invalid upload path');
      }
      await uploads.set(safeRel, buffer, { metadata: { uploadedAt: new Date().toISOString() } });
      return `/uploads/${safeRel}`;
    },
    async getUpload(name) {
      const safeRel = String(name || '').replace(/\\/g, '/').replace(/^\/+/, '');
      if (!safeRel || safeRel.includes('..')) return null;
      const blob = await uploads.get(safeRel, { type: 'blob' });
      if (!blob) return null;
      const buffer = Buffer.from(await blob.arrayBuffer());
      const ext = safeRel.slice(safeRel.lastIndexOf('.')).toLowerCase();
      const types = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
        '.mov': 'video/quicktime'
      };
      return { buffer, contentType: types[ext] || 'application/octet-stream' };
    },
    async listUploads(prefix) {
      const safePrefix = String(prefix || '').replace(/\\/g, '/').replace(/^\/+/, '');
      if (safePrefix.includes('..')) return [];
      const names = [];
      if (typeof uploads.list !== 'function') return names;
      let cursor;
      do {
        const page = await uploads.list({ prefix: safePrefix, cursor });
        const blobs = (page && page.blobs) || [];
        for (let i = 0; i < blobs.length; i++) {
          const key = blobs[i] && blobs[i].key;
          if (key) names.push(String(key));
        }
        cursor = page && page.cursor;
      } while (cursor);
      return names;
    },
    async deleteUpload(name) {
      const safeRel = String(name || '').replace(/\\/g, '/').replace(/^\/+/, '');
      if (!safeRel || safeRel.includes('..')) return false;
      if (typeof uploads.delete !== 'function') return false;
      await uploads.delete(safeRel);
      return true;
    }
  };
}

module.exports = { createBlobStore, DATA_STORE };
