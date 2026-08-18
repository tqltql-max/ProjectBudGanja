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
  'content/guia-palavras.json',
  'content/youtube-feed.json',
  'content/videos-hub.json',
  'content/channels/paulinholoko.json',
  'content/channels/zangadoreview.json',
  'content/channels/movrecam-professores.json',
  'content/channels/williamdavismd.json',
  'content/channels/davis-video-themes.json',
  'content/inspecoes-sugestoes.json',
  'content/palavras-duplo-sentido.json',
  'content/sorteio.json',
  'content/vida-cultivos.json',
  'content/vida-poemas.json',
  'content/plantas.json'
]);

const UPLOAD_MEDIA_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.mp4', '.webm', '.mov']);

const PROTECTED_HTML = new Set([
  'admin.html',
  'pesquisas-admin.html',
  'usuarios-admin.html',
  'sorteios-admin.html',
  'info/apresentacao-unifesp.html',
  'info/apresentacao-unifesp-print.html'
]);

/**
 * HTML só para utilizadores autenticados (conta Google / sessão de user)
 * ou admin. Redireciona para /entrar.html — não para o login do Inspetor.
 */
const AUTH_PROTECTED_HTML = new Set([
  'biblioteca/index.html'
]);

/** HTML admin + documentos institucionais privados (PDF da apresentação UNIFESP). */
const PROTECTED_PATHS = new Set([
  ...PROTECTED_HTML,
  'info/apresentacao-inspetor-budganja-unifesp.pdf'
]);

const AUTH_PROTECTED_PATHS = new Set([
  ...AUTH_PROTECTED_HTML
]);

function normalizePageFile(pageFile) {
  return String(pageFile || '').replace(/\\/g, '/').replace(/^\/+/, '').toLowerCase();
}

function isBlockedStaticPath(pageFile) {
  const normalized = normalizePageFile(pageFile);
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
    if (!UPLOAD_MEDIA_EXT.has(ext)) return true;
  }
  return false;
}

function isProtectedHtml(pageFile) {
  return PROTECTED_HTML.has(normalizePageFile(pageFile));
}

function isProtectedPath(pageFile) {
  return PROTECTED_PATHS.has(normalizePageFile(pageFile));
}

function isAuthProtectedHtml(pageFile) {
  return AUTH_PROTECTED_HTML.has(normalizePageFile(pageFile));
}

function isAuthProtectedPath(pageFile) {
  return AUTH_PROTECTED_PATHS.has(normalizePageFile(pageFile));
}

module.exports = {
  BLOCKED_STATIC,
  PUBLIC_CONTENT_FILES,
  PROTECTED_HTML,
  PROTECTED_PATHS,
  AUTH_PROTECTED_HTML,
  AUTH_PROTECTED_PATHS,
  isBlockedStaticPath,
  isProtectedHtml,
  isProtectedPath,
  isAuthProtectedHtml,
  isAuthProtectedPath
};
