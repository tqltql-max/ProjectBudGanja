'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

const I18N_PATH = path.join(ROOT, 'content', 'animais-i18n.json');

let cache = null;

function loadI18n() {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(I18N_PATH, 'utf8') || '{}');
  } catch (e) {
    cache = { animals: {} };
  }
  return cache;
}

function localizedAnimalFields(animal, loc) {
  const bundle = loadI18n();
  const entry = (bundle.animals && bundle.animals[animal.slug]) || {};
  const isEn = loc === 'en';
  const isEs = loc === 'es';
  return {
    nomePopular: isEn
      ? entry.nomePopularEn || animal.nomePopular
      : isEs
        ? entry.nomePopularEs || animal.nomePopular
        : animal.nomePopular,
    summary: isEn
      ? entry.summaryEn || animal.summary
      : isEs
        ? entry.summaryEs || animal.summary
        : animal.summary,
    partsUsed: isEn
      ? entry.partsUsedEn || animal.partsUsed || []
      : isEs
        ? entry.partsUsedEs || animal.partsUsed || []
        : animal.partsUsed || [],
    traditionalUses: isEn
      ? entry.traditionalUsesEn || animal.traditionalUses || []
      : isEs
        ? entry.traditionalUsesEs || animal.traditionalUses || []
        : animal.traditionalUses || [],
    cautions: isEn
      ? entry.cautionsEn || animal.cautions
      : isEs
        ? entry.cautionsEs || animal.cautions
        : animal.cautions
  };
}

function animalLocalePayload(animal) {
  const bundle = loadI18n();
  return {
    'pt-BR': localizedAnimalFields(animal, 'pt-BR'),
    en: localizedAnimalFields(animal, 'en'),
    es: localizedAnimalFields(animal, 'es'),
    disclaimerEn: bundle.disclaimerEn || '',
    disclaimerEs: bundle.disclaimerEs || ''
  };
}

module.exports = {
  localizedAnimalFields,
  animalLocalePayload,
  loadI18n
};
