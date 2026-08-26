'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

const ATIVIDADES_PATH = path.join(ROOT, 'content', 'atividades.json');

const CATEGORIES = [
  { id: 'fundadora', label: 'Fundadora' },
  { id: 'lema', label: 'Lema REM' },
  { id: 'ritmo', label: 'Ritmo' },
  { id: 'agua', label: 'Água' },
  { id: 'corpo', label: 'Corpo' },
  { id: 'oficio', label: 'Ofício' },
  { id: 'pausa', label: 'Pausa' }
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
    category: String(raw.category || '').trim().toLowerCase() || 'ritmo',
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    href,
    featured: Boolean(raw.featured),
    met: String(raw.met || ''),
    intensity: String(raw.intensity || ''),
    intensityEn: String(raw.intensityEn || raw.intensity || ''),
    intensityEs: String(raw.intensityEs || raw.intensity || ''),
    remR: String(raw.remR || ''),
    remREn: String(raw.remREn || raw.remR || ''),
    remREs: String(raw.remREs || raw.remR || ''),
    remE: String(raw.remE || ''),
    remEEn: String(raw.remEEn || raw.remE || ''),
    remEEs: String(raw.remEEs || raw.remE || ''),
    remM: String(raw.remM || ''),
    remMEn: String(raw.remMEn || raw.remM || ''),
    remMEs: String(raw.remMEs || raw.remM || '')
  };
}

function readAtividades() {
  try {
    const data = JSON.parse(fs.readFileSync(ATIVIDADES_PATH, 'utf8') || '{}');
    const items = Array.isArray(data.items) ? data.items : [];
    return {
      updatedAt: data.updatedAt || null,
      disclaimer:
        data.disclaimer ||
        'Catálogo educacional de actividades físicas com MET e REM de ofício. Não é plano de treino.',
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
  readAtividades,
  listTags,
  listCategories
};
