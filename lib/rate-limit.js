'use strict';

const buckets = new Map();

function createRateLimiter(options) {
  const windowMs = options.windowMs || 15 * 60 * 1000;
  const maxAttempts = options.maxAttempts || 10;
  const prefix = options.prefix || 'default';

  function keyFor(clientKey) {
    return prefix + ':' + clientKey;
  }

  function isLimited(clientKey) {
    const now = Date.now();
    const entry = buckets.get(keyFor(clientKey));
    if (!entry) return false;
    if (now - entry.firstAt > windowMs) {
      buckets.delete(keyFor(clientKey));
      return false;
    }
    return entry.count >= maxAttempts;
  }

  function record(clientKey) {
    const now = Date.now();
    const k = keyFor(clientKey);
    const entry = buckets.get(k) || { count: 0, firstAt: now };
    if (now - entry.firstAt > windowMs) {
      entry.count = 0;
      entry.firstAt = now;
    }
    entry.count += 1;
    buckets.set(k, entry);
  }

  function clear(clientKey) {
    buckets.delete(keyFor(clientKey));
  }

  return { isLimited, record, clear, windowMs, maxAttempts };
}

function getClientKey(req, headers) {
  const forwarded = (headers && (headers['x-forwarded-for'] || headers['X-Forwarded-For'])) || '';
  const ip = String(forwarded).split(',')[0].trim()
    || (req && req.socket && req.socket.remoteAddress)
    || 'unknown';
  return ip;
}

module.exports = { createRateLimiter, getClientKey };
