'use strict';

const fs = require('fs');
const path = require('path');

async function getSqlStoreIfAvailable(root) {
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return null;
  const dbPath = path.join(root, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return null;
  const { createSqlStore } = require('./store-sql.js');
  return createSqlStore(root);
}

async function exportDbToStaticFiles(root) {
  const store = await getSqlStoreIfAvailable(root);
  if (!store) return false;

  const { exportStaticFiles } = require('./api-handler.js');
  await exportStaticFiles(root, store, { skipPages: true });

  const feed = await store.getYoutubeFeed();
  if (feed) {
    const out = path.join(root, 'content', 'youtube-feed.json');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify(feed, null, 2), 'utf8');
  }

  const sorteios = await store.getSorteios();
  fs.writeFileSync(path.join(root, 'sorteios.json'), JSON.stringify(sorteios, null, 2), 'utf8');

  const guia = await store.getGuiaCultivo();
  if (guia) {
    fs.writeFileSync(path.join(root, 'content', 'guia-cultivo.json'), JSON.stringify(guia, null, 2), 'utf8');
  }

  console.log('export-db: ficheiros JSON sincronizados a partir da base de dados');
  return true;
}

async function persistJsonPayloadToDb(root, kind, payload) {
  const store = await getSqlStoreIfAvailable(root);
  if (!store) return false;
  if (kind === 'guia' && store.setGuiaCultivo) await store.setGuiaCultivo(payload);
  else if (kind === 'youtube' && store.setYoutubeFeed) await store.setYoutubeFeed(payload);
  else return false;
  return true;
}

module.exports = {
  getSqlStoreIfAvailable,
  exportDbToStaticFiles,
  persistJsonPayloadToDb
};
