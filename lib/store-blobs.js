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
    async getLojaOrders() {
      return (await data.get('loja-orders', { type: 'json' })) || [];
    },
    async setLojaOrders(orders) {
      await data.setJSON('loja-orders', orders);
    },
    async saveUpload(name, buffer) {
      await uploads.set(name, buffer, { metadata: { uploadedAt: new Date().toISOString() } });
      return `/uploads/${name}`;
    },
    async getUpload(name) {
      const blob = await uploads.get(name, { type: 'blob' });
      if (!blob) return null;
      const buffer = Buffer.from(await blob.arrayBuffer());
      const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
      const types = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' };
      return { buffer, contentType: types[ext] || 'application/octet-stream' };
    }
  };
}

module.exports = { createBlobStore, DATA_STORE };
