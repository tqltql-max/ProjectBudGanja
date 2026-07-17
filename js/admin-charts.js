/* Admin Charts — SVG puro, sem dependências externas */
(function () {
  'use strict';

  /* ── Sparkline ── */
  function sparkline(data, w, h, color) {
    if (!data || data.length < 2) return '';
    const max = Math.max(...data) || 1;
    const min = Math.min(...data);
    const range = max - min || 1;
    const step = w / (data.length - 1);
    const pts = data.map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * h * 0.85 - h * 0.075;
      return x + ',' + y;
    });
    const fill = pts.map((p, i) => i === 0 ? 'M ' + p : 'L ' + p).join(' ');
    const area = fill + ' L ' + (w) + ',' + h + ' L 0,' + h + ' Z';
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" style="overflow:visible">' +
      '<defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' + color + '" stop-opacity=".25"/><stop offset="100%" stop-color="' + color + '" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="' + area + '" fill="url(#sg)"/>' +
      '<path d="' + fill + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
      '</svg>';
  }

  /* ── Bar chart ── */
  function barChart(data, w, h, color) {
    // data: [{label, value, color?}]
    if (!data || !data.length) return '';
    const max = Math.max(...data.map((d) => d.value)) || 1;
    const gap = 4;
    const barW = (w - gap * (data.length - 1)) / data.length;
    const bars = data.map((d, i) => {
      const bh = Math.max(2, (d.value / max) * (h - 20));
      const x = i * (barW + gap);
      const y = h - 20 - bh;
      const c = d.color || color || '#5ab43c';
      return '<rect x="' + x + '" y="' + y + '" width="' + barW + '" height="' + bh + '" rx="3" fill="' + c + '" opacity=".85">' +
        '<title>' + d.label + ': ' + d.value + '</title>' +
        '</rect>' +
        '<text x="' + (x + barW / 2) + '" y="' + (h - 4) + '" text-anchor="middle" font-size="10" fill="rgba(255,255,255,.5)">' + d.label.slice(0, 4) + '</text>';
    }).join('');
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' + bars + '</svg>';
  }

  /* ── Donut chart ── */
  function donut(slices, r) {
    // slices: [{label, value, color}]
    if (!slices || !slices.length) return '';
    const total = slices.reduce((a, s) => a + (s.value || 0), 0) || 1;
    const cx = r + 4, cy = r + 4;
    const size = (r + 4) * 2;
    const innerR = r * 0.6;
    let angle = -Math.PI / 2;
    const paths = slices.map((s) => {
      const sweep = (s.value / total) * Math.PI * 2;
      const x1 = cx + r * Math.cos(angle);
      const y1 = cy + r * Math.sin(angle);
      angle += sweep;
      const x2 = cx + r * Math.cos(angle);
      const y2 = cy + r * Math.sin(angle);
      const large = sweep > Math.PI ? 1 : 0;
      const xi1 = cx + innerR * Math.cos(angle - sweep);
      const yi1 = cy + innerR * Math.sin(angle - sweep);
      const xi2 = cx + innerR * Math.cos(angle);
      const yi2 = cy + innerR * Math.sin(angle);
      return '<path d="M ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x2 + ' ' + y2 +
        ' L ' + xi2 + ' ' + yi2 + ' A ' + innerR + ' ' + innerR + ' 0 ' + large + ' 0 ' + xi1 + ' ' + yi1 + ' Z"' +
        ' fill="' + s.color + '"><title>' + s.label + ': ' + s.value + '</title></path>';
    }).join('');
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' + paths + '</svg>';
  }

  /* ── Inject charts on admin.html dashboard ── */
  function buildWeeklyData(posts) {
    const weeks = 8;
    const now = Date.now();
    const data = new Array(weeks).fill(0);
    posts.forEach((p) => {
      if (!p.date) return;
      const age = (now - new Date(p.date).getTime()) / (7 * 24 * 3600 * 1000);
      const idx = Math.floor(age);
      if (idx >= 0 && idx < weeks) data[weeks - 1 - idx]++;
    });
    return data;
  }

  function buildCategoryData(posts) {
    const map = { inspecao: 0, pesquisa: 0, equipamento: 0 };
    const labels = { inspecao: 'Inspeções', pesquisa: 'Pesquisas', equipamento: 'Equip.' };
    const colors = { inspecao: '#5ab43c', pesquisa: '#4a9fdb', equipamento: '#e5a22b' };
    posts.forEach((p) => { const c = p.category || 'pesquisa'; if (map[c] !== undefined) map[c]++; });
    return Object.entries(map).map(([k, v]) => ({ label: labels[k], value: v, color: colors[k] }));
  }

  window.adminRenderCharts = function (posts) {
    const el = document.getElementById('admin-charts');
    if (!el) return;

    const weekly = buildWeeklyData(posts);
    const catData = buildCategoryData(posts);
    const totalPublished = posts.filter((p) => p.published !== false).length;
    const totalDrafts = posts.filter((p) => p.published === false).length;

    const donutData = [
      { label: 'Publicadas', value: totalPublished, color: '#5ab43c' },
      { label: 'Rascunhos', value: totalDrafts, color: '#7a9968' }
    ];

    el.innerHTML =
      '<div class="admin-chart-card">' +
        '<div class="admin-chart-label">Atividade (8 semanas)</div>' +
        sparkline(weekly, 180, 48, '#5ab43c') +
      '</div>' +
      '<div class="admin-chart-card">' +
        '<div class="admin-chart-label">Por categoria</div>' +
        barChart(catData, 160, 64, '#5ab43c') +
      '</div>' +
      '<div class="admin-chart-card admin-chart-card--center">' +
        '<div class="admin-chart-label">Estado</div>' +
        donut(donutData, 28) +
        '<div class="admin-chart-donut-legend">' +
          donutData.map((d) => '<span><span style="color:' + d.color + '">■</span> ' + d.label + ' (' + d.value + ')</span>').join('') +
        '</div>' +
      '</div>';
  };

  window.AdminCharts = { sparkline, barChart, donut, buildWeeklyData, buildCategoryData };
})();
