'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

let cached = null;

function loadPlantasI18n() {
  if (cached) return cached;
  const file = path.join(ROOT, 'content', 'plantas-i18n.json');
  try {
    cached = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    cached = { disclaimerEn: '', disclaimerEs: '', plants: {} };
  }
  return cached;
}

function localizedPlantFields(plant, loc) {
  const map = loadPlantasI18n();
  const entry = (map.plants && map.plants[plant.slug]) || {};
  if (loc === 'en') {
    return {
      nomePopular: entry.nomePopularEn || plant.nomePopular,
      summary: entry.summaryEn || plant.summary,
      partsUsed: entry.partsUsedEn || plant.partsUsed,
      traditionalUses: entry.traditionalUsesEn || plant.traditionalUses,
      cautions: entry.cautionsEn || plant.cautions
    };
  }
  if (loc === 'es') {
    return {
      nomePopular: entry.nomePopularEs || plant.nomePopular,
      summary: entry.summaryEs || plant.summary,
      partsUsed: entry.partsUsedEs || plant.partsUsed,
      traditionalUses: entry.traditionalUsesEs || plant.traditionalUses,
      cautions: entry.cautionsEs || plant.cautions
    };
  }
  return {
    nomePopular: plant.nomePopular,
    summary: plant.summary,
    partsUsed: plant.partsUsed,
    traditionalUses: plant.traditionalUses,
    cautions: plant.cautions
  };
}

function plantLocalePayload(plant) {
  return {
    'pt-BR': localizedPlantFields(plant, 'pt-BR'),
    en: localizedPlantFields(plant, 'en'),
    es: localizedPlantFields(plant, 'es')
  };
}

function catalogDisclaimers() {
  const map = loadPlantasI18n();
  return {
    'pt-BR': null, // filled from plantas.json at build time
    en: map.disclaimerEn || '',
    es: map.disclaimerEs || ''
  };
}

module.exports = {
  loadPlantasI18n,
  localizedPlantFields,
  plantLocalePayload,
  catalogDisclaimers
};
