(function (global) {
  'use strict';

  var CALCULATOR_LABELS = {
    ph: 'Calculadora pH',
    ec: 'Calculadora EC',
    vpd: 'Calculadora VPD',
    dli: 'Calculadora DLI',
    diluicao: 'Diluição',
    'super-solo': 'Super Solo',
    'volume-vaso': 'Volume do vaso',
    energia: 'Energia',
    'watts-m2': 'W/m²',
    luximetro: 'Luxímetro'
  };

  var ENTRY_ACTIONS = [
    { id: 'rega', icon: '💧', label: 'Rega' },
    { id: 'adubo', icon: '🧪', label: 'Adubo' },
    { id: 'obs', icon: '📝', label: 'Nota' },
    { id: 'treino', icon: '✂️', label: 'Treino' },
    { id: 'roteiro', icon: '📋', label: 'Roteiro' }
  ];

  var MIN_USER_AGE = 18;
  var CULTIVO_ONBOARDING_KEY = 'budganja_cultivo_onboarding_v1';
  var DEFAULT_AVATAR = '/imagens/avatars/leaf.svg';
  var PRESET_AVATARS = [
    { id: 'leaf', label: 'Folha', src: '/imagens/avatars/leaf.svg' },
    { id: 'seedling', label: 'Muda', src: '/imagens/avatars/seedling.svg' },
    { id: 'bud', label: 'Flor', src: '/imagens/avatars/bud.svg' },
    { id: 'greenhouse', label: 'Estufa', src: '/imagens/avatars/greenhouse.svg' },
    { id: 'water', label: 'Rega', src: '/imagens/avatars/water.svg' },
    { id: 'lab', label: 'Laboratório', src: '/imagens/avatars/lab.svg' },
    { id: 'sun', label: 'Luz', src: '/imagens/avatars/sun.svg' },
    { id: 'inspector', label: 'Inspetor', src: '/imagens/avatars/inspector.svg' }
  ];

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDate(iso) {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  function todayDateInputValue() {
    return new Date().toISOString().slice(0, 10);
  }

  function cloneGrowLogs(logs) {
    if (!Array.isArray(logs)) return [];
    return logs.map(function (log) {
      return {
        id: log.id,
        name: log.name,
        plantedAt: log.plantedAt,
        phase: log.phase,
        createdAt: log.createdAt,
        entries: Array.isArray(log.entries)
          ? log.entries.map(function (entry) {
            return {
              id: entry.id,
              date: entry.date,
              text: entry.text,
              source: entry.source,
              actionType: entry.actionType || 'obs',
              metrics: entry.metrics && typeof entry.metrics === 'object' ? Object.assign({}, entry.metrics) : {},
              photos: Array.isArray(entry.photos) ? entry.photos.slice() : [],
              createdAt: entry.createdAt
            };
          })
          : []
      };
    });
  }

  function createGrowLogObject(name, plantedAt, phase) {
    var now = new Date().toISOString();
    var planted = plantedAt || now;
    var plantedDate = new Date(planted);
    return {
      id: 'g' + Date.now(),
      name: String(name || '').trim().slice(0, 80) || 'Cultivo',
      plantedAt: isNaN(plantedDate.getTime()) ? now : plantedDate.toISOString(),
      phase: phase || 'germinacao',
      entries: [],
      createdAt: now
    };
  }

  function growWeekNumber(plantedAt, entryDate) {
    var start = new Date(plantedAt);
    var entry = new Date(String(entryDate) + 'T12:00:00');
    if (isNaN(start.getTime()) || isNaN(entry.getTime())) return 1;
    var diff = entry.getTime() - start.getTime();
    return Math.max(1, Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1);
  }

  function growWeekDayRange(weekNum) {
    var dayStart = (weekNum - 1) * 7 + 1;
    var dayEnd = weekNum * 7;
    return 'dias ' + dayStart + '–' + dayEnd;
  }

  function formatMetricsPlain(metrics) {
    if (!metrics || typeof metrics !== 'object') return '';
    var parts = [];
    if (metrics.ph != null) parts.push('pH ' + metrics.ph);
    if (metrics.ec != null) parts.push('EC ' + metrics.ec);
    if (metrics.temp != null) parts.push(metrics.temp + '°C');
    if (metrics.rh != null) parts.push(metrics.rh + '% RH');
    if (metrics.vpd != null) parts.push('VPD ' + metrics.vpd + ' kPa');
    if (metrics.dli != null) parts.push('DLI ' + metrics.dli);
    if (metrics.ppfd != null) parts.push('PPFD ' + metrics.ppfd);
    if (metrics.lux != null) parts.push(metrics.lux + ' lux');
    return parts.join(' · ');
  }

  function daysSincePlanted(plantedAt) {
    var start = new Date(plantedAt);
    if (isNaN(start.getTime())) return 0;
    return Math.floor((Date.now() - start.getTime()) / (24 * 60 * 60 * 1000));
  }

  function formatEntrySource(source) {
    if (source === 'calculator') return 'Calculadora';
    if (source === 'week-note') return 'Nota do roteiro';
    if (source === 'system') return 'Sistema';
    return 'Manual';
  }

  function csvEscape(value) {
    var s = value == null ? '' : String(value);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  global.BudGanjaCultivoShared = {
    CALCULATOR_LABELS: CALCULATOR_LABELS,
    ENTRY_ACTIONS: ENTRY_ACTIONS,
    MIN_USER_AGE: MIN_USER_AGE,
    CULTIVO_ONBOARDING_KEY: CULTIVO_ONBOARDING_KEY,
    DEFAULT_AVATAR: DEFAULT_AVATAR,
    PRESET_AVATARS: PRESET_AVATARS,
    escapeHtml: escapeHtml,
    formatDate: formatDate,
    todayDateInputValue: todayDateInputValue,
    cloneGrowLogs: cloneGrowLogs,
    createGrowLogObject: createGrowLogObject,
    growWeekNumber: growWeekNumber,
    growWeekDayRange: growWeekDayRange,
    formatMetricsPlain: formatMetricsPlain,
    daysSincePlanted: daysSincePlanted,
    formatEntrySource: formatEntrySource,
    csvEscape: csvEscape
  };
})(window);
