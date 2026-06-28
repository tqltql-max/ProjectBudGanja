'use strict';

const { isHttpsConnection } = require('./utils.js');

const CSP = "default-src 'self'; img-src 'self' data: https://i.ytimg.com https://http2.mlstatic.com https://lh3.googleusercontent.com https://www.gstatic.com; script-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/client; style-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/style; connect-src 'self' https://accounts.google.com/gsi/ https://oauth2.googleapis.com https://generativelanguage.googleapis.com; frame-src https://www.youtube-nocookie.com https://www.youtube.com https://docs.google.com https://accounts.google.com/gsi/; base-uri 'self'; form-action 'self'";

function applySecurityHeaders(res, headers, options) {
  const opts = options || {};
  const secure = isHttpsConnection(headers || {});

  res.setHeader('Content-Security-Policy', CSP);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(self), camera=(self)');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

  if (secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  if (opts.noStore) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
  }

  if (opts.noIndex) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  }
}

module.exports = { applySecurityHeaders, CSP };
