'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

const ANIMAIS_PATH = path.join(ROOT, 'content', 'animais.json');

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeAnimal(a) {
  if (!a || typeof a !== 'object') return null;
  const slug = String(a.slug || a.id || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) return null;
  const hubCategory = String(a.hubCategory || '')
    .trim()
    .toLowerCase();
  return {
    id: String(a.id || slug),
    slug,
    nomePopular: String(a.nomePopular || slug),
    nomeCientifico: String(a.nomeCientifico || ''),
    familia: String(a.familia || ''),
    hubCategory: hubCategory || undefined,
    summary: String(a.summary || ''),
    partsUsed: Array.isArray(a.partsUsed) ? a.partsUsed.map(String) : [],
    traditionalUses: Array.isArray(a.traditionalUses) ? a.traditionalUses.map(String) : [],
    cautions: String(a.cautions || ''),
    tags: Array.isArray(a.tags) ? a.tags.map(String) : [],
    relatedUnifesp: Boolean(a.relatedUnifesp),
    relatedInspections: Array.isArray(a.relatedInspections)
      ? a.relatedInspections
          .filter((r) => r && typeof r === 'object' && r.href && r.label)
          .map((r) => ({
            href: String(r.href),
            label: String(r.label),
            labelEn: r.labelEn ? String(r.labelEn) : undefined,
            labelEs: r.labelEs ? String(r.labelEs) : undefined
          }))
      : [],
    cover: a.cover || null,
    url: '/animais/' + slug + '/'
  };
}

function readAnimais() {
  try {
    const data = JSON.parse(fs.readFileSync(ANIMAIS_PATH, 'utf8') || '{}');
    const animals = Array.isArray(data.animals) ? data.animals : [];
    return {
      updatedAt: data.updatedAt || null,
      disclaimer:
        data.disclaimer ||
        'Conteúdo educacional. Não substitui orientação profissional.',
      animals: animals.map(normalizeAnimal).filter(Boolean)
    };
  } catch (e) {
    return { updatedAt: null, disclaimer: '', animals: [] };
  }
}

function getAnimalUrl(animal) {
  return animal.url || '/animais/' + animal.slug + '/';
}

function listTags(animals) {
  const set = new Set();
  animals.forEach((a) => (a.tags || []).forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

function isProducaoAnimal(animal) {
  return animal && String(animal.hubCategory || '').toLowerCase() === 'producao';
}

module.exports = {
  ANIMAIS_PATH,
  readAnimais,
  normalizeAnimal,
  getAnimalUrl,
  listTags,
  isProducaoAnimal,
  escapeHtml
};
