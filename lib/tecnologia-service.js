'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

const TECNOLOGIA_PATH = path.join(ROOT, 'content', 'tecnologia.json');

const CATEGORIES = [
  { id: 'lema', label: 'Lema' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'rede', label: 'Rede' },
  { id: 'software', label: 'Software' },
  { id: 'programacao', label: 'Programação' },
  { id: 'atividade', label: 'Actividade' },
  { id: 'pessoas', label: 'Pessoas' }
];

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeItem(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const slug = String(raw.slug || raw.id || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) return null;
  const href = String(raw.href || '').trim();
  if (!href) return null;
  return {
    id: String(raw.id || slug),
    slug,
    nome: String(raw.nome || slug),
    nomeEn: String(raw.nomeEn || raw.nome || slug),
    nomeEs: String(raw.nomeEs || raw.nome || slug),
    kicker: String(raw.kicker || ''),
    kickerEn: String(raw.kickerEn || raw.kicker || ''),
    kickerEs: String(raw.kickerEs || raw.kicker || ''),
    summary: String(raw.summary || ''),
    summaryEn: String(raw.summaryEn || raw.summary || ''),
    summaryEs: String(raw.summaryEs || raw.summary || ''),
    category: String(raw.category || '').trim().toLowerCase() || 'software',
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    href,
    featured: Boolean(raw.featured)
  };
}

function readTecnologia() {
  try {
    const data = JSON.parse(fs.readFileSync(TECNOLOGIA_PATH, 'utf8') || '{}');
    const items = Array.isArray(data.items) ? data.items : [];
    return {
      updatedAt: data.updatedAt || null,
      disclaimer:
        data.disclaimer ||
        'Catálogo educacional de ofício técnico. Não é manual de montagem nem metáfora de pessoas.',
      items: items.map(normalizeItem).filter(Boolean)
    };
  } catch (e) {
    return { updatedAt: null, disclaimer: '', items: [] };
  }
}

function listTags(items) {
  const set = new Set();
  items.forEach((it) => (it.tags || []).forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

function listCategories(items) {
  const used = new Set(items.map((it) => it.category).filter(Boolean));
  return CATEGORIES.filter((c) => used.has(c.id));
}

module.exports = {
  CATEGORIES,
  escapeHtml,
  readTecnologia,
  listTags,
  listCategories
};
