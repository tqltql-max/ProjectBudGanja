'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

let cached = null;

function loadFungosI18n() {
  if (cached) return cached;
  const file = path.join(ROOT, 'content', 'fungos-i18n.json');
  try {
    cached = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    cached = { disclaimerEn: '', disclaimerEs: '', fungi: {} };
  }
  return cached;
}

function localizedFungoFields(fungo, loc) {
  const map = loadFungosI18n();
  const entry = (map.fungi && map.fungi[fungo.slug]) || {};
  if (loc === 'en') {
    return {
      nomePopular: entry.nomePopularEn || fungo.nomePopular,
      summary: entry.summaryEn || fungo.summary,
      partsUsed: entry.partsUsedEn || fungo.partsUsed,
      traditionalUses: entry.traditionalUsesEn || fungo.traditionalUses,
      cautions: entry.cautionsEn || fungo.cautions
    };
  }
  if (loc === 'es') {
    return {
      nomePopular: entry.nomePopularEs || fungo.nomePopular,
      summary: entry.summaryEs || fungo.summary,
      partsUsed: entry.partsUsedEs || fungo.partsUsed,
      traditionalUses: entry.traditionalUsesEs || fungo.traditionalUses,
      cautions: entry.cautionsEs || fungo.cautions
    };
  }
  return {
    nomePopular: fungo.nomePopular,
    summary: fungo.summary,
    partsUsed: fungo.partsUsed,
    traditionalUses: fungo.traditionalUses,
    cautions: fungo.cautions
  };
}

function fungoLocalePayload(fungo) {
  return {
    'pt-BR': localizedFungoFields(fungo, 'pt-BR'),
    en: localizedFungoFields(fungo, 'en'),
    es: localizedFungoFields(fungo, 'es')
  };
}

module.exports = {
  loadFungosI18n,
  localizedFungoFields,
  fungoLocalePayload
};
