'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

let cached = null;

function loadPostI18n() {
  if (cached) return cached;
  const file = path.join(ROOT, 'content', 'post-i18n.json');
  try {
    cached = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    cached = {};
  }
  return cached;
}

/** Overlay title/excerpt/content locale fields from content/post-i18n.json. */
function applyPostI18nOverlay(posts) {
  const map = loadPostI18n();
  return (posts || []).map((p) => {
    const loc = map[p.slug];
    if (!loc) return p;
    const out = Object.assign({}, p);
    if (loc.titleEn) out.titleEn = loc.titleEn;
    if (loc.titleEs) out.titleEs = loc.titleEs;
    if (loc.excerptEn) out.excerptEn = loc.excerptEn;
    if (loc.excerptEs) out.excerptEs = loc.excerptEs;
    if (loc.contentEn) out.contentEn = loc.contentEn;
    if (loc.contentEs) out.contentEs = loc.contentEs;
    return out;
  });
}

module.exports = {
  loadPostI18n,
  applyPostI18nOverlay
};
