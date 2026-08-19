'use strict';

const UPLOAD_TYPES = {
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

function safeKey(name) {
  const safeRel = String(name || '').replace(/\\/g, '/').replace(/^\/+/, '');
  if (!safeRel || safeRel.includes('..')) return '';
  return safeRel;
}

function contentTypeFor(key) {
  const ext = key.slice(key.lastIndexOf('.')).toLowerCase();
  return UPLOAD_TYPES[ext] || 'application/octet-stream';
}

function toBuffer(body) {
  if (!body) return Buffer.alloc(0);
  if (Buffer.isBuffer(body)) return body;
  if (body instanceof Uint8Array) return Buffer.from(body);
  return Buffer.from(body);
}

function createR2UploadStore(bucket) {
  return {
    async saveUpload(name, buffer) {
      const key = safeKey(name);
      if (!key) throw new Error('invalid upload path');
      const body = toBuffer(buffer);
      await bucket.put(key, body, {
        httpMetadata: { contentType: contentTypeFor(key) }
      });
      return '/uploads/' + key;
    },
    async getUpload(name) {
      const key = safeKey(name);
      if (!key) return null;
      const obj = await bucket.get(key);
      if (!obj) return null;
      const buffer = Buffer.from(await obj.arrayBuffer());
      return { buffer, contentType: contentTypeFor(key) };
    },
    async listUploads(prefix) {
      const safePrefix = safeKey(prefix);
      if (String(prefix || '') && !safePrefix) return [];
      const names = [];
      let cursor;
      do {
        const page = await bucket.list({ prefix: safePrefix || undefined, cursor });
        const objects = (page && page.objects) || [];
        for (let i = 0; i < objects.length; i++) {
          if (objects[i] && objects[i].key) names.push(String(objects[i].key));
        }
        cursor = page && page.truncated ? page.cursor : null;
      } while (cursor);
      return names;
    },
    async deleteUpload(name) {
      const key = safeKey(name);
      if (!key) return false;
      await bucket.delete(key);
      return true;
    }
  };
}

function createNoopUploadStore() {
  async function unavailable() {
    throw new Error('Uploads indisponíveis. Crie o bucket R2 budganja-uploads e ligue-o em wrangler.toml.');
  }
  return {
    saveUpload: unavailable,
    getUpload: async function () { return null; },
    listUploads: async function () { return []; },
    deleteUpload: async function () { return false; }
  };
}

module.exports = { createR2UploadStore, createNoopUploadStore };
