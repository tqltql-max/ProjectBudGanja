(function (global) {
  'use strict';

  var PHASE_LABELS = {
    planejamento: 'Planejamento',
    germinacao: 'Germinação',
    vegetativo: 'Vegetativo',
    floracao: 'Floração',
    colheita: 'Colheita'
  };

  var ACTION_LABELS = {
    rega: 'Rega',
    adubo: 'Adubo',
    obs: 'Nota',
    treino: 'Treino',
    roteiro: 'Roteiro'
  };

  var CALCULATOR_LABELS = {
    ph: 'Calculadora pH',
    ec: 'Calculadora EC',
    vpd: 'Calculadora VPD',
    dli: 'Calculadora DLI',
    diluicao: 'Calculadora de diluição',
    'super-solo': 'Calculadora Super Solo',
    'volume-vaso': 'Volume do vaso',
    energia: 'Custo de energia',
    'watts-m2': 'Watts por m²',
    luximetro: 'Luxímetro'
  };

  function formatDate(iso) {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return '—';
    }
  }

  function daysSincePlanted(plantedAt) {
    if (!plantedAt) return 0;
    var start = new Date(plantedAt);
    if (isNaN(start.getTime())) return 0;
    return Math.max(0, Math.floor((Date.now() - start.getTime()) / (24 * 60 * 60 * 1000)));
  }

  function formatMetricsPlain(metrics) {
    if (!metrics || typeof metrics !== 'object') return '';
    var parts = [];
    if (metrics.ph != null) parts.push('pH ' + metrics.ph);
    if (metrics.ec != null) parts.push('EC ' + metrics.ec);
    if (metrics.temp != null) parts.push(metrics.temp + ' °C');
    if (metrics.rh != null) parts.push('RH ' + metrics.rh + '%');
    if (metrics.vpd != null) parts.push('VPD ' + metrics.vpd);
    if (metrics.dli != null) parts.push('DLI ' + metrics.dli);
    if (metrics.ppfd != null) parts.push('PPFD ' + metrics.ppfd);
    if (metrics.lux != null) parts.push(metrics.lux + ' lux');
    return parts.join(' · ');
  }

  function entryActionLabel(entry) {
    var type = entry && entry.actionType;
    return ACTION_LABELS[type] || ACTION_LABELS.obs;
  }

  function buildGrowMarkdown(log, cultivoState, options) {
    var opts = options || {};
    var title = opts.title || (log && log.name) || 'Pesquisa';
    var phaseLabel = PHASE_LABELS[(log && log.phase) || ''] || (log && log.phase) || '—';
    var plants = log && log.plantCount != null ? log.plantCount : 1;
    var lines = [
      '# ' + title,
      '',
      '> Pesquisa de cultivo documentada no Diário de Cultivo — Inspetor BudGanja',
      '> Submetida em ' + new Date().toLocaleDateString('pt-BR'),
      '',
      '## Metadados',
      '',
      '| Campo | Valor |',
      '|-------|-------|',
      '| Espécie / linha | ' + ((log && log.species) || '—') + ' |',
      '| Ambiente | ' + ((log && log.environment) || '—') + ' |',
      '| Substrato | ' + ((log && log.substrate) || '—') + ' |',
      '| Fase | ' + phaseLabel + ' |',
      '| Plantas | ' + plants + ' |',
      '| Início | ' + formatDate(log && log.plantedAt) + ' |',
      '| Dia | ' + daysSincePlanted(log && log.plantedAt) + ' |',
      ''
    ];

    var guide = (log && log.customGuide ? String(log.customGuide).trim() : '')
      || (cultivoState && cultivoState.customGuide ? String(cultivoState.customGuide).trim() : '');
    if (guide) {
      lines.push('## Roteiro geral', '', guide, '');
    }

    lines.push('## Registos do diário', '');
    var entries = (log && Array.isArray(log.entries) ? log.entries : [])
      .slice()
      .sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });

    if (!entries.length) {
      lines.push('_Sem registos no diário._', '');
    } else {
      entries.forEach(function (entry) {
        lines.push('### ' + entry.date + ' — ' + entryActionLabel(entry));
        if (entry.text) lines.push('', entry.text);
        var metrics = formatMetricsPlain(entry.metrics);
        if (metrics) lines.push('', '**Métricas:** ' + metrics);
        if (entry.source === 'calculator' && entry.metrics && entry.metrics.calculator) {
          lines.push('', '_Fonte: ' + (CALCULATOR_LABELS[entry.metrics.calculator] || entry.metrics.calculator) + '_');
        }
        if (Array.isArray(entry.photos) && entry.photos.length) {
          lines.push('');
          entry.photos.forEach(function (url) { lines.push('![](' + url + ')'); });
        }
        lines.push('');
      });
    }

    lines.push('---', '', '_Publicação sujeita a revisão editorial do laboratório._');
    return lines.join('\n');
  }

  function growHasPublishableContent(log, cultivoState) {
    var entries = log && Array.isArray(log.entries) ? log.entries : [];
    if (entries.length > 0) return true;
    var guide = (log && log.customGuide ? String(log.customGuide).trim() : '')
      || (cultivoState && cultivoState.customGuide ? String(cultivoState.customGuide).trim() : '');
    return guide.length >= 20;
  }

  global.BudGanjaCultivoMarkdown = {
    buildGrowMarkdown: buildGrowMarkdown,
    growHasPublishableContent: growHasPublishableContent,
    PHASE_LABELS: PHASE_LABELS,
    ACTION_LABELS: ACTION_LABELS
  };
})(window);
