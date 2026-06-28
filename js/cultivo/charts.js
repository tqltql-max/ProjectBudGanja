(function (global) {
  'use strict';

  var METRICS = [
    { key: 'ph', label: 'pH', min: 0, max: 14, color: '#6ecf9a' },
    { key: 'ec', label: 'EC', min: 0, max: 5, color: '#7eb8ff' },
    { key: 'temp', label: '°C', min: 0, max: 40, color: '#ffb86b' },
    { key: 'rh', label: 'RH %', min: 0, max: 100, color: '#c9a0ff' }
  ];

  function collectMetricSeries(entries, key) {
    if (!Array.isArray(entries)) return [];
    return entries
      .filter(function (entry) {
        return entry.metrics && entry.metrics[key] != null && !isNaN(Number(entry.metrics[key]));
      })
      .sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); })
      .map(function (entry) {
        return { date: entry.date, value: Number(entry.metrics[key]) };
      });
  }

  function computeMetricStats(entries) {
    var stats = {};
    METRICS.forEach(function (metric) {
      var series = collectMetricSeries(entries, metric.key);
      if (!series.length) return;
      var values = series.map(function (point) { return point.value; });
      var sum = values.reduce(function (acc, val) { return acc + val; }, 0);
      stats[metric.key] = {
        label: metric.label,
        count: values.length,
        avg: Math.round((sum / values.length) * 10) / 10,
        min: Math.min.apply(null, values),
        max: Math.max.apply(null, values),
        latest: values[values.length - 1]
      };
    });
    return stats;
  }

  function renderSparkline(series, metric) {
    if (!series.length) return '';
    var width = 220;
    var height = 56;
    var pad = 6;
    var min = metric.min;
    var max = metric.max;
    var values = series.map(function (point) { return point.value; });
    var dataMin = Math.min.apply(null, values);
    var dataMax = Math.max.apply(null, values);
    if (dataMin === dataMax) {
      dataMin -= 1;
      dataMax += 1;
    }
    var points = series.map(function (point, index) {
      var x = pad + (index / Math.max(1, series.length - 1)) * (width - pad * 2);
      var ratio = (point.value - dataMin) / (dataMax - dataMin);
      var y = height - pad - ratio * (height - pad * 2);
      return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    var last = series[series.length - 1];
    return (
      '<svg class="cultivo-metric-chart" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + metric.label + ' ao longo do tempo">' +
      '<polyline fill="none" stroke="' + metric.color + '" stroke-width="2" points="' + points + '"></polyline>' +
      '</svg>' +
      '<p class="cultivo-metric-chart-meta"><strong>' + metric.label + '</strong> · último ' + last.value +
      ' · média ' + (Math.round((values.reduce(function (a, b) { return a + b; }, 0) / values.length) * 10) / 10) + '</p>'
    );
  }

  function renderMetricsCharts(container, log) {
    if (!container || !log) return;
    var entries = Array.isArray(log.entries) ? log.entries : [];
    var blocks = METRICS.map(function (metric) {
      var series = collectMetricSeries(entries, metric.key);
      if (!series.length) return '';
      return '<div class="cultivo-metric-chart-card">' + renderSparkline(series, metric) + '</div>';
    }).filter(Boolean);
    if (!blocks.length) {
      container.hidden = true;
      container.innerHTML = '';
      return;
    }
    container.hidden = false;
    container.innerHTML =
      '<div class="cultivo-metrics-charts-head"><h3>Evolução das métricas</h3>' +
      '<p class="field-hint">Com base nos registos com pH, EC, temperatura ou RH.</p></div>' +
      '<div class="cultivo-metrics-charts-grid">' + blocks.join('') + '</div>';
  }

  function renderCompareHtml(currentLog, otherLog) {
    var currentStats = computeMetricStats((currentLog && currentLog.entries) || []);
    var otherStats = computeMetricStats((otherLog && otherLog.entries) || []);
    var keys = Object.keys(currentStats).concat(Object.keys(otherStats))
      .filter(function (key, index, arr) { return arr.indexOf(key) === index; });
    if (!keys.length) {
      return '<p class="perfil-plano-empty">Nenhuma das pesquisas tem métricas comparáveis ainda.</p>';
    }
    var rows = keys.map(function (key) {
      var a = currentStats[key];
      var b = otherStats[key];
      return '<tr>' +
        '<th scope="row">' + (a ? a.label : (b ? b.label : key)) + '</th>' +
        '<td>' + (a ? a.avg + ' (n=' + a.count + ')' : '—') + '</td>' +
        '<td>' + (b ? b.avg + ' (n=' + b.count + ')' : '—') + '</td>' +
        '</tr>';
    }).join('');
    return (
      '<table class="cultivo-compare-table">' +
      '<thead><tr><th>Métrica</th><th>' + escapeHtml(currentLog.name || 'Actual') + '</th><th>' +
      escapeHtml(otherLog.name || 'Outra') + '</th></tr></thead><tbody>' + rows + '</tbody></table>'
    );
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  global.BudGanjaCultivoCharts = {
    collectMetricSeries: collectMetricSeries,
    computeMetricStats: computeMetricStats,
    renderMetricsCharts: renderMetricsCharts,
    renderCompareHtml: renderCompareHtml
  };
})(window);
