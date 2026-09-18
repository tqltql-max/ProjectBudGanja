'use strict';

const PLACEHOLDER_LA = /^(bucket|roots|hat|arm|bed|gears|magic|special|senior|seal|wise|secret|tea|ladybug|monster|monsters|team|family|soil|leaf|leaves|seed|plant|plants)$/i;

function clipEtym(text) {
  const raw = String(text || '').replace(/\s+/g, ' ').trim();
  if (!raw) return '';
  if (raw.length <= 420) return raw;
  let cut = raw.slice(0, 420);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '));
  if (stop > 180) cut = cut.slice(0, stop + 1);
  else {
    const space = cut.lastIndexOf(' ');
    if (space > 180) cut = cut.slice(0, space);
  }
  return cut.replace(/[.,;:\s]+$/, '') + '…';
}

function foldKey(value) {
  return String(value || '')
    .trim()
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/\s+/g, ' ');
}

function variantsOf(word) {
  const raw = String(word || '').trim();
  if (!raw) return [];
  const folded = foldKey(raw);
  const out = [raw, raw.toLocaleLowerCase('pt-BR'), folded];
  if (folded.length > 4 && folded.endsWith('s')) out.push(folded.slice(0, -1));
  if (folded.length > 5 && folded.endsWith('es')) out.push(folded.slice(0, -2));
  if (folded.length > 6 && folded.endsWith('mente')) out.push(folded.slice(0, -5));
  const first = folded.split(' ')[0];
  if (first && first !== folded) out.push(first);
  return out.filter(Boolean);
}

let index = null;

function loadIndex() {
  if (index) return index;
  index = new Map();
  let guia = { items: [] };
  try {
    guia = require('../content/guia-palavras.json');
  } catch (e) {
    return index;
  }
  (guia.items || []).forEach(function (item) {
    const text = clipEtym(item && item.history);
    if (!text) return;
    const rec = {
      text: text,
      href: item.href || '/guia/palavras.html',
      source: 'Laboratório'
    };
    [item.word, item.id].filter(Boolean).forEach(function (key) {
      variantsOf(key).forEach(function (variant) {
        const k = foldKey(variant);
        if (k && !index.has(k)) index.set(k, rec);
      });
    });
  });
  return index;
}

function lookupLabEtymology(word) {
  const map = loadIndex();
  const keys = variantsOf(word).map(foldKey);
  for (let i = 0; i < keys.length; i++) {
    const hit = map.get(keys[i]);
    if (hit) return hit;
  }
  return null;
}

function isRealEtymonLang(value, en) {
  const raw = String(value || '').trim();
  if (!raw) return false;
  if (PLACEHOLDER_LA.test(raw)) return false;
  if (en && raw.toLocaleLowerCase('en') === String(en).trim().toLocaleLowerCase('en')) return false;
  return true;
}

module.exports = {
  clipEtym,
  foldKey,
  variantsOf,
  lookupLabEtymology,
  isRealEtymonLang,
  loadIndex
};
