'use strict';

const { createFsStore } = require('./store-fs.js');
const { createBlobStore } = require('./store-blobs.js');
const { createSqlStore } = require('./store-sql.js');
const { ensureBlobSeed } = require('./seed-blobs.js');

function hasRemoteDatabase() {
  return Boolean(
    String(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || '').trim()
  );
}

function resolveStoreBackend(options) {
  const forced = String(process.env.STORE_BACKEND || '').trim().toLowerCase();
  if (forced === 'fs') return 'fs';
  if (forced === 'blobs') return 'blobs';
  if (forced === 'sql') return 'sql';

  if (options.netlify) {
    return hasRemoteDatabase() ? 'sql' : 'blobs';
  }

  return 'sql';
}

function bindUploads(store, uploads) {
  if (!uploads) return store;
  return Object.assign({}, store, {
    saveUpload: uploads.saveUpload.bind(uploads),
    getUpload: uploads.getUpload.bind(uploads)
  });
}

async function createAppStore(options) {
  const root = options.root;
  const netlify = !!options.netlify;
  const backend = resolveStoreBackend({ netlify });

  if (backend === 'fs') {
    return createFsStore(root);
  }

  if (backend === 'blobs') {
    const store = createBlobStore();
    if (root) await ensureBlobSeed(store, root);
    return store;
  }

  const sqlStore = await createSqlStore(root);

  if (netlify) {
    const blobStore = createBlobStore();
    return bindUploads(sqlStore, blobStore);
  }

  const fsStore = createFsStore(root);
  return bindUploads(sqlStore, fsStore);
}

module.exports = {
  createAppStore,
  resolveStoreBackend,
  hasRemoteDatabase
};
