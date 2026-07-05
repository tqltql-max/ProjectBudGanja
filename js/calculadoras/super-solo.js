/** Receita e densidades — Calculadora Super Solo (planilha BudGanja + extensões). */
const SUPER_SOLO_COMPONENTS = [
  { id: 'bokashi', name: 'Bokashi', gramsPerL: 10, density: 0.6, benefit: 'Ativador biológico e microrganismos.', doseRange: '10–20 g/L' },
  { id: 'humus-minhoca', name: 'Húmus de Minhoca', gramsPerL: 15, density: 0.5, benefit: 'Matéria orgânica, nutrientes solúveis e microbiota benéfica.', doseRange: '10–20 g/L' },
  { id: 'torta-mamona', name: 'Torta de Mamona', gramsPerL: 5, density: 0.7, benefit: 'Fonte de Nitrogênio (N).', doseRange: '5 g/L' },
  { id: 'farinha-osso', name: 'Farinha de Osso', gramsPerL: 5, density: 0.8, benefit: 'Fonte de Fósforo (P) e Cálcio (Ca).', doseRange: '5 g/L' },
  { id: 'po-rocha', name: 'Pó de Rocha', gramsPerL: 3, density: 1.5, benefit: 'Remineralização e resistência.', doseRange: '3–5 g/L' },
  { id: 'biochar', name: 'Biochar (Carvão)', gramsPerL: 10, density: 0.4, benefit: 'Retenção hídrica e abrigo microbiano.', doseRange: '10 g/L (~3% vol.)' },
  { id: 'gesso', name: 'Gesso Agrícola', gramsPerL: 2, density: 1.2, benefit: 'Fornece Enxofre e Cálcio.', doseRange: '1–2 g/L' },
  { id: 'calcario', name: 'Calcário Dolomítico', gramsPerL: 4, density: 1.3, benefit: 'Estabilização de pH e Magnésio.', doseRange: '2–4 g/L' },
  { id: 'torta-neem', name: 'Torta de Neem', gramsPerL: 2, density: 0.6, benefit: 'Proteção contra pragas de solo.', doseRange: '2 g/L' },
  { id: 'farinha-algas', name: 'Farinha de Algas', gramsPerL: 5, density: 0.5, benefit: 'Bioestimulante e micronutrientes.', doseRange: '5 g/L' }
];

function fmtGrams(n) {
  return n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
}

function fmtDecimal(n, digits) {
  return n.toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function getSelectedComponents() {
  return SUPER_SOLO_COMPONENTS.filter(function (c) {
    const el = document.getElementById('ss-comp-' + c.id);
    return el && el.checked;
  });
}

function setAllComponents(checked) {
  SUPER_SOLO_COMPONENTS.forEach(function (c) {
    const el = document.getElementById('ss-comp-' + c.id);
    if (el) el.checked = checked;
  });
}

function buildResumo(volume) {
  return fmtDecimal(volume, 0) + ' L';
}

function calcularSuperSolo() {
  const volume = parseFloat(document.getElementById('ss-volume').value);
  const out = document.getElementById('resultado-super-solo');
  const selected = getSelectedComponents();

  if (isNaN(volume) || volume <= 0) {
    out.innerHTML = '<p class="result-error">Informe um volume total de substrato válido (litros).</p>';
    return;
  }

  if (!selected.length) {
    out.innerHTML = '<p class="result-error">Selecione pelo menos um componente para calcular.</p>';
    return;
  }

  let totalGrams = 0;
  let totalMl = 0;
  let items = '';

  selected.forEach(function (c) {
    const totalG = c.gramsPerL * volume;
    const totalMlC = (c.gramsPerL / c.density) * volume;
    totalGrams += totalG;
    totalMl += totalMlC;

    items +=
      '<li class="super-solo-result-item">' +
      '<span class="super-solo-result-name">' + c.name + '</span>' +
      '<span class="super-solo-result-qty">' + fmtGrams(totalG) + ' g · ' + fmtDecimal(totalMlC, 0) + ' ml</span>' +
      '</li>';
  });

  out.innerHTML =
    '<div class="result-box super-solo-result">' +
    '<p class="super-solo-result-volume">' + buildResumo(volume) + '</p>' +
    '<ul class="super-solo-result-list">' + items + '</ul>' +
    '<p class="super-solo-result-total">Total · <strong>' + fmtGrams(totalGrams) + ' g</strong> · ' + fmtDecimal(totalMl, 0) + ' ml</p>' +
    '</div>';
  if (window.BudGanjaDiaryBridge) {
    window.BudGanjaDiaryBridge.attachSaveBar(out, {
      calculator: 'super-solo',
      text: 'Super solo ' + buildResumo(volume) + ' — ' + selected.length + ' componentes, ' + fmtGrams(totalGrams) + ' g total',
      metrics: {
        volume: Math.round(volume),
        components: selected.length,
        grams: Math.round(totalGrams)
      }
    });
  }
}

function renderComponentPicker() {
  const wrap = document.getElementById('ss-components');
  if (!wrap) return;

  let html = '';
  SUPER_SOLO_COMPONENTS.forEach(function (c) {
    html +=
      '<label class="super-solo-comp-item" for="ss-comp-' + c.id + '">' +
      '<input type="checkbox" id="ss-comp-' + c.id + '" name="ss-comp-' + c.id + '" value="' + c.id + '" checked>' +
      '<span class="super-solo-comp-copy">' +
      '<span class="super-solo-comp-name">' + c.name + '</span>' +
      '<span class="super-solo-comp-benefit">' + c.benefit + '</span>' +
      '<span class="super-solo-comp-dose">' + c.gramsPerL + ' g/L · ' + c.doseRange + '</span>' +
      '</span></label>';
  });
  wrap.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function () {
  renderComponentPicker();

  const selectAll = document.getElementById('ss-select-all');
  const selectNone = document.getElementById('ss-select-none');
  if (selectAll) selectAll.addEventListener('click', function () { setAllComponents(true); });
  if (selectNone) selectNone.addEventListener('click', function () { setAllComponents(false); });
});
