function formatDatePtBR(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch (e) {
    return iso;
  }
}

function slugify(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'post';
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function parseCookies(header) {
  const cookies = {};
  String(header || '').split(';').forEach((part) => {
    const idx = part.indexOf('=');
    if (idx === -1) return;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (key) cookies[key] = decodeURIComponent(val);
  });
  return cookies;
}

function cookieHeader(name, value, maxAgeSec, secure) {
  const parts = [
    `${name}=${value}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax'
  ];
  if (maxAgeSec != null) parts.push(`Max-Age=${maxAgeSec}`);
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

function getAdminUser() {
  return process.env.ADMIN_USER || 'admin';
}

function getAdminPass() {
  return process.env.RESEARCH_PASS || 'test123';
}

function isSecureRequest(headers) {
  if (headers['x-forwarded-proto'] === 'https') return true;
  if (String(process.env.URL || '').startsWith('https://')) return true;
  return false;
}

module.exports = {
  formatDatePtBR,
  slugify,
  escapeHtml,
  escapeAttr,
  parseCookies,
  cookieHeader,
  getAdminUser,
  getAdminPass,
  isSecureRequest
};
