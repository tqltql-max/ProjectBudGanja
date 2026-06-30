'use strict';

const BLOCKED_STATIC = new Set([
  '.env',
  '.env.example',
  'posts.json',
  'sorteios.json',
  'package.json',
  'package-lock.json',
  'netlify.toml',
  'content/sessions.json',
  'content/user-sessions.json',
  'content/oauth-states.json',
  'content/users.json',
  'content/pages.json',
  'content/site.json'
]);

const PUBLIC_CONTENT_FILES = new Set([
  'content/guia-cultivo.json',
  'content/youtube-feed.json',
  'content/sorteio.json'
]);

const UPLOAD_IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);

const PROTECTED_HTML = new Set([
  'admin.html',
  'pesquisas-admin.html',
  'usuarios-admin.html',
  'sorteios-admin.html',
  'loja-admin.html',
  'emails-admin.html'
]);

function isBlockedStaticPath(pageFile) {
  const normalized = String(pageFile || '').replace(/\\/g, '/').replace(/^\/+/, '').toLowerCase();
  if (!normalized) return true;
  if (normalized.startsWith('.well-known/')) return false;
  if (normalized.startsWith('.')) return true;
  if (normalized.startsWith('_')) return true;
  if (normalized.includes('..')) return true;
  if (normalized.startsWith('lib/') || normalized.startsWith('node_modules/') || normalized.startsWith('deploy/') || normalized.startsWith('scripts/') || normalized.startsWith('server/')) {
    return true;
  }
  if (normalized.startsWith('netlify/')) return true;
  if (BLOCKED_STATIC.has(normalized)) return true;
  if (normalized.startsWith('content/') && !PUBLIC_CONTENT_FILES.has(normalized)) return true;
  if (normalized.startsWith('uploads/')) {
    const ext = normalized.slice(normalized.lastIndexOf('.'));
    if (!UPLOAD_IMAGE_EXT.has(ext)) return true;
  }
  return false;
}

function isProtectedHtml(pageFile) {
  return PROTECTED_HTML.has(String(pageFile || '').replace(/\\/g, '/').replace(/^\/+/, '').toLowerCase());
}

module.exports = {
  BLOCKED_STATIC,
  PUBLIC_CONTENT_FILES,
  isBlockedStaticPath,
  isProtectedHtml
};
