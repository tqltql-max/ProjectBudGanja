'use strict';

function parseSorteioDate(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (!/^\d{4}-\d{2}/.test(raw)) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

function formatSorteioDateTime(value) {
  const d = parseSorteioDate(value);
  if (d) {
    return d.toLocaleString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  return String(value || '').trim();
}

function toDatetimeLocalValue(value) {
  const d = parseSorteioDate(value);
  if (!d) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return (
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    'T' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes())
  );
}

function fromDatetimeLocalValue(value) {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '';
  return d.toISOString();
}

function formatAdminTableDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso);
    const date = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return date + ' · ' + time;
  } catch (e) {
    return String(iso);
  }
}

function slugifyPremio(label, index) {
  const base = String(label || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return base || 'premio-' + (index + 1);
}

if (typeof window !== 'undefined') {
  window.SorteioUtils = {
    parseSorteioDate,
    formatSorteioDateTime,
    toDatetimeLocalValue,
    fromDatetimeLocalValue,
    formatAdminTableDate,
    slugifyPremio
  };
}
