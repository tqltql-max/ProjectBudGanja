'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

const PLANTAS_PATH = path.join(ROOT, 'content', 'plantas.json');

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readPlantas() {
  try {
    const data = JSON.parse(fs.readFileSync(PLANTAS_PATH, 'utf8') || '{}');
    const plants = Array.isArray(data.plants) ? data.plants : [];
    return {
      updatedAt: data.updatedAt || null,
      disclaimer:
        data.disclaimer ||
        'Conteúdo educacional. Não substitui orientação profissional de saúde.',
      plants: plants.map(normalizePlant).filter(Boolean)
    };
  } catch (e) {
    return { updatedAt: null, disclaimer: '', plants: [] };
  }
}

function normalizePlant(p) {
  if (!p || typeof p !== 'object') return null;
  const slug = String(p.slug || p.id || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) return null;
  return {
    id: String(p.id || slug),
    slug,
    nomePopular: String(p.nomePopular || slug),
    nomeCientifico: String(p.nomeCientifico || ''),
    familia: String(p.familia || ''),
    summary: String(p.summary || ''),
    partsUsed: Array.isArray(p.partsUsed) ? p.partsUsed.map(String) : [],
    traditionalUses: Array.isArray(p.traditionalUses) ? p.traditionalUses.map(String) : [],
    cautions: String(p.cautions || ''),
    tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
    relatedUnifesp: Boolean(p.relatedUnifesp),
    relatedInspections: Array.isArray(p.relatedInspections)
      ? p.relatedInspections
          .filter((r) => r && typeof r === 'object' && r.href && r.label)
          .map((r) => ({
            href: String(r.href),
            label: String(r.label),
            labelEn: r.labelEn ? String(r.labelEn) : undefined,
            labelEs: r.labelEs ? String(r.labelEs) : undefined
          }))
      : [],
    cover: p.cover || null,
    url: '/plantas/' + slug + '/',
    hubCategory: String(p.hubCategory || '').trim().toLowerCase()
  };
}

function isFrutoPlant(plant) {
  return plant && String(plant.hubCategory || '').toLowerCase() === 'fruto';
}

function listByHub(plants, hub) {
  const list = Array.isArray(plants) ? plants : [];
  if (hub === 'fruto') return list.filter(isFrutoPlant);
  return list.filter((p) => !isFrutoPlant(p));
}

function getPlantUrl(plant) {
  return plant.url || '/plantas/' + plant.slug + '/';
}

function listTags(plants) {
  const set = new Set();
  plants.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

module.exports = {
  PLANTAS_PATH,
  readPlantas,
  normalizePlant,
  isFrutoPlant,
  listByHub,
  getPlantUrl,
  listTags,
  escapeHtml
};
