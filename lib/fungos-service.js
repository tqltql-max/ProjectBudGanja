'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

const FUNGOS_PATH = path.join(ROOT, 'content', 'fungos.json');

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readFungos() {
  try {
    const data = JSON.parse(fs.readFileSync(FUNGOS_PATH, 'utf8') || '{}');
    const fungi = Array.isArray(data.fungi) ? data.fungi : [];
    return {
      updatedAt: data.updatedAt || null,
      disclaimer:
        data.disclaimer ||
        'Conteúdo educacional. Não substitui orientação profissional.',
      fungi: fungi.map(normalizeFungo).filter(Boolean)
    };
  } catch (e) {
    return { updatedAt: null, disclaimer: '', fungi: [] };
  }
}

function normalizeFungo(p) {
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
    reino: String(p.reino || 'Fungi'),
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
    url: '/fungos/' + slug + '/'
  };
}

function getFungoUrl(fungo) {
  return fungo.url || '/fungos/' + fungo.slug + '/';
}

function listTags(fungi) {
  const set = new Set();
  fungi.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

module.exports = {
  FUNGOS_PATH,
  readFungos,
  getFungoUrl,
  listTags,
  escapeHtml
};
