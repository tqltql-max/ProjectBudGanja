const fs = require('fs');
const path = require('path');
const { extractCultivoFields } = require('./cultivo-user-service.js');
const { mergeGuiaInspecoesPosts } = require('./merge-guia-inspecoes.js');

function createFsStore(root) {
  const postsPath = path.join(root, 'posts.json');
  const pagesPath = path.join(root, 'content', 'pages.json');
  const sitePath = path.join(root, 'content', 'site.json');
  const sessionsPath = path.join(root, 'content', 'sessions.json');
  const userSessionsPath = path.join(root, 'content', 'user-sessions.json');
  const usersPath = path.join(root, 'content', 'users.json');
  const oauthStatesPath = path.join(root, 'content', 'oauth-states.json');
  const sorteiosPath = path.join(root, 'sorteios.json');
  const sorteioAlertsPath = path.join(root, 'sorteio-alerts.json');
  const sorteioConfigPath = path.join(root, 'content', 'sorteio.json');
  const lojaOrdersPath = path.join(root, 'loja-orders.json');
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
      return mergeGuiaInspecoesPosts(readJson(postsPath, []));
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
    async getUserSessions() {
      return readJson(userSessionsPath, {});
    },
    async setUserSessions(sessions) {
      const dir = path.dirname(userSessionsPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(userSessionsPath, JSON.stringify(sessions), 'utf8');
    },
    async getUsers() {
      return readJson(usersPath, {});
    },
    async setUsers(users) {
      const dir = path.dirname(usersPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf8');
    },
    async getOAuthStates() {
      return readJson(oauthStatesPath, {});
    },
    async setOAuthStates(states) {
      const dir = path.dirname(oauthStatesPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(oauthStatesPath, JSON.stringify(states), 'utf8');
    },
    async getSorteios() {
      return readJson(sorteiosPath, []);
    },
    async setSorteios(entries) {
      fs.writeFileSync(sorteiosPath, JSON.stringify(entries, null, 2), 'utf8');
    },
    async getSorteioConfig() {
      return readJson(sorteioConfigPath, null);
    },
    async setSorteioConfig(config) {
      const dir = path.dirname(sorteioConfigPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(sorteioConfigPath, JSON.stringify(config, null, 2), 'utf8');
    },
    async getSorteioAlertSubscribers() {
      return readJson(sorteioAlertsPath, []);
    },
    async getSorteioAlertSubscriber(userId) {
      const list = readJson(sorteioAlertsPath, []);
      return list.find((item) => item.userId === userId && item.active !== false) || null;
    },
    async subscribeSorteioAlert(subscriber) {
      const list = readJson(sorteioAlertsPath, []).filter((item) => item.userId !== subscriber.userId);
      list.unshift(subscriber);
      fs.writeFileSync(sorteioAlertsPath, JSON.stringify(list, null, 2), 'utf8');
    },
    async unsubscribeSorteioAlert(userId) {
      const list = readJson(sorteioAlertsPath, []).map((item) => {
        if (item.userId !== userId) return item;
        return Object.assign({}, item, { active: false });
      });
      fs.writeFileSync(sorteioAlertsPath, JSON.stringify(list, null, 2), 'utf8');
    },
    async getLojaOrders() {
      return readJson(lojaOrdersPath, []);
    },
    async setLojaOrders(orders) {
      fs.writeFileSync(lojaOrdersPath, JSON.stringify(orders, null, 2), 'utf8');
    },
    async getGuiaCultivo() {
      return readJson(path.join(root, 'content', 'guia-cultivo.json'), null);
    },
    async setGuiaCultivo(guia) {
      const file = path.join(root, 'content', 'guia-cultivo.json');
      const dir = path.dirname(file);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file, JSON.stringify(guia, null, 2), 'utf8');
    },
    async getYoutubeFeed() {
      return readJson(path.join(root, 'content', 'youtube-feed.json'), null);
    },
    async setYoutubeFeed(feed) {
      const file = path.join(root, 'content', 'youtube-feed.json');
      const dir = path.dirname(file);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file, JSON.stringify(feed, null, 2), 'utf8');
    },
    async countCultivoGrows(userId) {
      const users = await readJson(usersPath, {});
      const extracted = extractCultivoFields(users[userId] && users[userId].profile);
      return Array.isArray(extracted.growLogs) ? extracted.growLogs.length : 0;
    },
    async getCultivoState(userId) {
      const users = await readJson(usersPath, {});
      return extractCultivoFields(users[userId] && users[userId].profile);
    },
    async setCultivoState(userId, state) {
      const users = await readJson(usersPath, {});
      const user = users[userId];
      if (!user) return state;
      user.profile = Object.assign(user.profile || {}, state || {});
      user.updatedAt = new Date().toISOString();
      users[userId] = user;
      const dir = path.dirname(usersPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf8');
      return state;
    },
    async createCultivoSubmission(submission) {
      const file = path.join(root, 'data', 'cultivo-submissions.json');
      const list = readJson(file, []);
      list.push(submission);
      const dir = path.dirname(file);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');
      return submission;
    },
    async getCultivoSubmissionById(id) {
      const file = path.join(root, 'data', 'cultivo-submissions.json');
      const list = readJson(file, []);
      return list.find((row) => row.id === id) || null;
    },
    async findActiveCultivoSubmission(userId, growId) {
      const file = path.join(root, 'data', 'cultivo-submissions.json');
      const list = readJson(file, []);
      return list
        .filter((row) => row.userId === userId && row.growId === growId && (row.status === 'pending' || row.status === 'approved'))
        .sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt)))[0] || null;
    },
    async listCultivoSubmissionsByUser(userId, growId) {
      const file = path.join(root, 'data', 'cultivo-submissions.json');
      let list = readJson(file, []).filter((row) => row.userId === userId);
      if (growId) list = list.filter((row) => row.growId === growId);
      return list.sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt)));
    },
    async listCultivoSubmissionsAdmin(status) {
      const file = path.join(root, 'data', 'cultivo-submissions.json');
      let list = readJson(file, []);
      if (status) list = list.filter((row) => row.status === status);
      return list.sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt)));
    },
    async updateCultivoSubmission(id, patch) {
      const file = path.join(root, 'data', 'cultivo-submissions.json');
      const list = readJson(file, []);
      const idx = list.findIndex((row) => row.id === id);
      if (idx < 0) return null;
      list[idx] = Object.assign({}, list[idx], patch);
      fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');
      return list[idx];
    },
    async listUsersAdmin(query) {
      const users = readJson(usersPath, {});
      const q = String(query || '').trim().toLowerCase();
      let list = Object.values(users || {});
      if (q) {
        list = list.filter((u) =>
          String(u.email || '').toLowerCase().includes(q)
          || String(u.name || '').toLowerCase().includes(q)
          || String(u.id || '').toLowerCase().includes(q)
        );
      }
      return list.map((user) => {
        const safeUser = Object.assign({}, user);
        delete safeUser.localPasswordHash;
        delete safeUser.resetTokenHash;
        delete safeUser.resetTokenExpiresAt;
        const extracted = extractCultivoFields(user.profile);
        const growLogs = Array.isArray(extracted.growLogs) ? extracted.growLogs : [];
        const entryCount = growLogs.reduce((sum, g) => sum + (Array.isArray(g.entries) ? g.entries.length : 0), 0);
        const planTasks = Array.isArray(extracted.planTasks) ? extracted.planTasks : [];
        return Object.assign({}, safeUser, {
          isAdmin: !!user.isAdmin,
          growCount: growLogs.length,
          entryCount: entryCount,
          submissionCount: 0,
          planTaskCount: planTasks.length
        });
      }).sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
    },
    async getUserByIdAdmin(userId) {
      const users = readJson(usersPath, {});
      const user = users[userId];
      if (!user) return null;
      const safeUser = Object.assign({}, user);
      delete safeUser.localPasswordHash;
      delete safeUser.resetTokenHash;
      delete safeUser.resetTokenExpiresAt;
      const extracted = extractCultivoFields(user.profile);
      const growLogs = Array.isArray(extracted.growLogs) ? extracted.growLogs : [];
      const entryCount = growLogs.reduce((sum, g) => sum + (Array.isArray(g.entries) ? g.entries.length : 0), 0);
      const planTasks = Array.isArray(extracted.planTasks) ? extracted.planTasks : [];
      return Object.assign({}, safeUser, {
        isAdmin: !!user.isAdmin,
        growCount: growLogs.length,
        entryCount: entryCount,
        planTaskCount: planTasks.length
      });
    },
    async setUserAdminFlag(userId, isAdmin) {
      const users = readJson(usersPath, {});
      const user = users[userId];
      if (!user) return null;
      user.isAdmin = !!isAdmin;
      user.updatedAt = new Date().toISOString();
      users[userId] = user;
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf8');
      return users[userId];
    },
    async countAdminUsers() {
      const users = readJson(usersPath, {});
      return Object.values(users || {}).filter((u) => u.isAdmin).length;
    },
    async listUserGrowsSummary(userId) {
      const users = readJson(usersPath, {});
      const extracted = extractCultivoFields(users[userId] && users[userId].profile);
      const growLogs = Array.isArray(extracted.growLogs) ? extracted.growLogs : [];
      return growLogs.map((g) => ({
        id: g.id,
        name: g.name || '',
        phase: g.phase || '',
        species: g.species || '',
        plantedAt: g.plantedAt,
        plantCount: g.plantCount != null ? g.plantCount : 1,
        createdAt: g.createdAt,
        entryCount: Array.isArray(g.entries) ? g.entries.length : 0
      }));
    },
    async listUserSubmissionsSummary() {
      return [];
    },
    async listSorteioEntriesByEmail(email) {
      const normalized = String(email || '').trim().toLowerCase();
      const list = readJson(sorteiosPath, []);
      return list.filter((e) => String(e.email || '').toLowerCase() === normalized).slice(0, 50);
    },
    async listLojaOrdersByEmail(email) {
      const normalized = String(email || '').trim().toLowerCase();
      const list = readJson(lojaOrdersPath, []);
      return list.filter((o) => String(o.email || '').toLowerCase() === normalized).slice(0, 50);
    },
    async getSorteioAlertForUser(userId) {
      const list = readJson(sorteioAlertsPath, []);
      const row = list.find((item) => item.userId === userId && item.active !== false);
      return row || null;
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
      return { buffer: buf, contentType: types[ext] || 'application/octet-stream' };
    }
  };
}

module.exports = { createFsStore };
