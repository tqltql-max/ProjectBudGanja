'use strict';

const { jsonResponse } = require('./_helpers.js');
const { createRateLimiter, getClientKey } = require('../rate-limit.js');
const { lookupEtymology, sanitizeWord } = require('../etymology-lookup.js');

const etymLimiter = createRateLimiter({ prefix: 'etym', windowMs: 60 * 1000, maxAttempts: 40 });

async function match(ctx) {
  const { url, method, req, headers } = ctx;
  if (url !== '/api/etymology' || method !== 'GET') return null;

  const query = req.query
    ? (typeof req.query === 'string' ? new URLSearchParams(req.query) : new URLSearchParams(req.query))
    : new URLSearchParams();
  const word = sanitizeWord(query.get('q') || query.get('word') || '');
  if (!word) return jsonResponse(400, { error: 'palavra em falta' });

  const clientKey = getClientKey(req, headers);
  if (etymLimiter.isLimited(clientKey)) {
    return jsonResponse(429, { error: 'muitas consultas de étimo' });
  }
  etymLimiter.record(clientKey);

  try {
    const found = await lookupEtymology(word);
    if (!found || !found.text) {
      return jsonResponse(200, { ok: true, word: word, text: '', href: '', source: '' });
    }
    return jsonResponse(200, {
      ok: true,
      word: word,
      text: found.text,
      href: found.href || '',
      source: found.source || ''
    });
  } catch (e) {
    return jsonResponse(502, { error: 'étimo indisponível' });
  }
}

module.exports = { match };
