'use strict';

/**
 * Menções da família Klink em títulos públicos (canal Tamara + Amyr).
 * Só o que o título nomeia — sem inventar vida privada.
 *
 * Avó Ana Francesca: nomeou o barco Sardinha (fontes públicas: O Globo, Correio Braziliense).
 */

const FAMILY_SERIES = [
  {
    id: 'familia-pai',
    label: 'Pai · Amyr',
    labelEn: 'Father · Amyr',
    labelEs: 'Padre · Amyr'
  },
  {
    id: 'familia-avo',
    label: 'Avó · Sardinha',
    labelEn: 'Grandmother · Sardinha',
    labelEs: 'Abuela · Sardinha'
  },
  {
    id: 'familia-mae',
    label: 'Mãe · Marina',
    labelEn: 'Mother · Marina',
    labelEs: 'Madre · Marina'
  },
  {
    id: 'familia-irmas',
    label: 'Irmãs',
    labelEn: 'Sisters',
    labelEs: 'Hermanas'
  },
  {
    id: 'sardinha',
    label: 'Sardinha (barco)',
    labelEn: 'Sardinha (boat)',
    labelEs: 'Sardinha (barco)'
  }
];

function familyTagsFromTitle(title) {
  const t = String(title || '');
  const tags = [];
  const hasSardinha = /sardinha/i.test(t);
  const hasAvo =
    /vov[oó]|v[oó][\s-]*vlog|av[oó]\b|ana\s+francesca/i.test(t) || hasSardinha;
  const hasPai =
    /\bamyr\b|\bpais\b|\bpai\b|paratii|exemplo dos pais|entrevista com meus pais/i.test(t);
  const hasMae = /\bm[aã]e\b|marina\s+bandeira|meus pais/i.test(t);
  const hasIrmas = /g[eê]meas|laura\b|marina helena|irm[aã]/i.test(t);

  if (hasPai) tags.push('familia-pai');
  if (hasAvo) tags.push('familia-avo');
  if (hasMae) tags.push('familia-mae');
  if (hasIrmas) tags.push('familia-irmas');
  if (hasSardinha) tags.push('sardinha');
  return tags;
}

function familySeriesOptionsFromVideos(videos, channel) {
  const counts = {};
  (videos || []).forEach((v) => {
    const tags = v.family || familyTagsFromTitle(v.title);
    tags.forEach((id) => {
      counts[id] = (counts[id] || 0) + 1;
    });
  });
  return FAMILY_SERIES.filter((c) => counts[c.id]).map((c) => ({
    id: c.id,
    channel: channel || 'tamara',
    label: c.label,
    labelEn: c.labelEn,
    labelEs: c.labelEs,
    count: counts[c.id]
  }));
}

module.exports = {
  FAMILY_SERIES,
  familyTagsFromTitle,
  familySeriesOptionsFromVideos
};
