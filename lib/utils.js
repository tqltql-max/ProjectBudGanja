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

function cookieHeader(name, value, maxAgeSec, secure, sameSite) {
  const parts = [
    `${name}=${value}`,
    'HttpOnly',
    'Path=/',
    'SameSite=' + (sameSite || 'Strict')
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

function getAdminEmails() {
  const raw = String(process.env.ADMIN_EMAILS || '').trim();
  if (!raw) return new Set();
  return new Set(
    raw.split(',')
      .map((email) => String(email || '').trim().toLowerCase())
      .filter(Boolean)
  );
}

function isHttpsConnection(headers) {
  const proto = String((headers && headers['x-forwarded-proto']) || '').split(',')[0].trim().toLowerCase();
  return proto === 'https';
}

function isSecureRequest(headers) {
  return isHttpsConnection(headers);
}

function isProductionSite() {
  const siteUrl = String(process.env.SITE_URL || process.env.URL || '').toLowerCase();
  if (!siteUrl) return false;
  if (/localhost|127\.0\.0\.1/.test(siteUrl)) return false;
  return true;
}

function getGoogleClientId() {
  return String(process.env.GOOGLE_CLIENT_ID || '').trim();
}

function getGoogleClientSecret() {
  return String(process.env.GOOGLE_CLIENT_SECRET || '').trim();
}

function getSiteBaseUrl(headers) {
  const fromEnv = String(process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  const host = headers && (headers['x-forwarded-host'] || headers.host);
  if (!host) return 'http://localhost:8080';
  const proto = isHttpsConnection(headers) ? 'https' : 'http';
  return proto + '://' + String(host).split(',')[0].trim();
}

function getGoogleOAuthOrigins() {
  const base = String(process.env.SITE_URL || process.env.URL || 'https://inspetorbudganja.com.br').replace(/\/$/, '');
  const origins = new Set([base, 'http://localhost:8080']);
  try {
    const u = new URL(base);
    if (u.hostname.startsWith('www.')) {
      origins.add(u.protocol + '//' + u.hostname.slice(4));
    } else {
      origins.add(u.protocol + '//www.' + u.hostname);
    }
  } catch (e) { /* ignore */ }
  return Array.from(origins);
}

function getGoogleRedirectUri(headers) {
  return getSiteBaseUrl(headers) + '/api/auth/google/callback';
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
  getAdminEmails,
  isSecureRequest,
  isHttpsConnection,
  isProductionSite,
  getGoogleClientId,
  getGoogleClientSecret,
  getSiteBaseUrl,
  getGoogleOAuthOrigins,
  getGoogleRedirectUri
};
