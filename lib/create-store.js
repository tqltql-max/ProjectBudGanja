'use strict';

function loadFsStore() {
  return require('./store-fs.js').createFsStore;
}

function loadBlobStore() {
  return require('./store-blobs.js').createBlobStore;
}

function loadSqlStore() {
  return require('./store-sql.js').createSqlStore;
}

function loadBlobSeed() {
  return require('./seed-blobs.js').ensureBlobSeed;
}

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
  const bound = {
    saveUpload: uploads.saveUpload.bind(uploads),
    getUpload: uploads.getUpload.bind(uploads)
  };
  if (typeof uploads.listUploads === 'function') {
    bound.listUploads = uploads.listUploads.bind(uploads);
  }
  if (typeof uploads.deleteUpload === 'function') {
    bound.deleteUpload = uploads.deleteUpload.bind(uploads);
  }
  return Object.assign({}, store, bound);
}

async function createAppStore(options) {
  const root = options.root;
  const netlify = !!options.netlify;
  const backend = resolveStoreBackend({ netlify });

  if (backend === 'fs') {
    return loadFsStore()(root);
  }

  if (backend === 'blobs') {
    const store = loadBlobStore()();
    if (root) {
      try {
        await loadBlobSeed()(store, root);
      } catch (e) {
        console.warn('seed blobs:', e && e.message);
      }
    }
    return store;
  }

  try {
    const sqlStore = await loadSqlStore()(root);
    if (netlify) {
      const blobStore = loadBlobStore()();
      return bindUploads(sqlStore, blobStore);
    }
    const fsStore = loadFsStore()(root);
    return bindUploads(sqlStore, fsStore);
  } catch (e) {
    if (!netlify) throw e;
    console.warn('sql store falhou, a usar blobs:', e && e.message);
    const store = loadBlobStore()();
    if (root) {
      try {
        await loadBlobSeed()(store, root);
      } catch (seedErr) {
        console.warn('seed blobs:', seedErr && seedErr.message);
      }
    }
    return store;
  }

}

module.exports = {
  createAppStore,
  resolveStoreBackend,
  hasRemoteDatabase
};
