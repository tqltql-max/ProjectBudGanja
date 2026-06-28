'use strict';

const { createRateLimiter, getClientKey } = require('./rate-limit.js');

const loginLimiter = createRateLimiter({
  prefix: 'login',
  windowMs: 15 * 60 * 1000,
  maxAttempts: 8
});

function isLoginRateLimited(key) {
  return loginLimiter.isLimited(key);
}

function recordLoginFailure(key) {
  loginLimiter.record(key);
}

function clearLoginAttempts(key) {
  loginLimiter.clear(key);
}

module.exports = {
  getClientKey,
  isLoginRateLimited,
  recordLoginFailure,
  clearLoginAttempts,
  MAX_ATTEMPTS: loginLimiter.maxAttempts,
  WINDOW_MS: loginLimiter.windowMs
};
