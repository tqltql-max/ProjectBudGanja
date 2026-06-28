(function () {
  'use strict';

  var Engine = window.BudGanjaCultivoLabEngine;
  if (!Engine) return;

  var MODES = [
    {
      id: 'vpd',
      label: 'VPD',
      hint: 'Déficit de pressão de vapor',
      fields: [
        { id: 'temp', label: 'Temperatura (°C)', type: 'number', step: '0.1', placeholder: '25' },
        { id: 'rh', label: 'Umidade (%)', type: 'number', step: '0.1', placeholder: '60' }
      ],
      calc: function (v) { return Engine.calcVpd(v.temp, v.rh); }
    },
    {
      id: 'dli',
      label: 'DLI',
      hint: 'Integral de luz diária',
      fields: [
        { id: 'ppfd', label: 'PPFD (μmol/m²/s)', type: 'number', step: '1', placeholder: '600' },
        { id: 'hours', label: 'Fotoperíodo (h/dia)', type: 'number', step: '0.5', min: '0', max: '24', placeholder: '18' }
      ],
      calc: function (v) { return Engine.calcDli(v.ppfd, v.hours); }
    },
    {
      id: 'ph',
      label: 'pH',
      hint: 'Faixa ideal por meio',
      fields: [
        { id: 'medium', label: 'Meio de cultivo', type: 'select', options: [
          { value: 'solo', label: 'Solo / Super Solo' },
          { value: 'coco', label: 'Fibra de Coco' },
          { value: 'hidro', label: 'Hidroponia' }
        ] },
        { id: 'ph', label: 'pH medido', type: 'number', step: '0.1', min: '0', max: '14', placeholder: '6.2' }
      ],
      calc: function (v) { return Engine.calcPh(v.medium, v.ph); }
    },
    {
      id: 'ec',
      label: 'EC',
      hint: 'Condutividade eléctrica',
      fields: [
        { id: 'ec', label: 'EC (mS/cm)', type: 'number', step: '0.01', placeholder: '1.5' }
      ],
      calc: function (v) { return Engine.calcEc(v.ec); }
    },
    {
      id: 'diluicao',
      label: 'Diluição',
      hint: 'Reduzir concentração',
      fields: [
        { id: 'from', label: 'EC actual (mS/cm)', type: 'number', step: '0.1', placeholder: '2.0' },
        { id: 'to', label: 'EC alvo (mS/cm)', type: 'number', step: '0.1', placeholder: '1.5' }
      ],
      calc: function (v) { return Engine.calcDiluicao(v.from, v.to); }
    },
    {
      id: 'volume',
      label: 'Vaso',
      hint: 'Volume do recipiente',
      fields: [
        { id: 'shape', label: 'Formato', type: 'select', options: [
          { value: 'retangular', label: 'Retangular' },
          { value: 'cilindrico', label: 'Cilíndrico' }
        ] },
        { id: 'length', label: 'Comprimento (cm)', type: 'number', step: '0.1', placeholder: '30', showIf: 'retangular' },
        { id: 'width', label: 'Largura (cm)', type: 'number', step: '0.1', placeholder: '30', showIf: 'retangular' },
        { id: 'diameter', label: 'Diâmetro (cm)', type: 'number', step: '0.1', placeholder: '25', showIf: 'cilindrico' },
        { id: 'height', label: 'Altura (cm)', type: 'number', step: '0.1', placeholder: '30' }
      ],
      calc: function (v) {
        return Engine.calcVolume(v.shape, v.length, v.width, v.diameter, v.height);
      }
    },
    {
      id: 'watts-m2',
      label: 'W/m²',
      hint: 'Potência por área',
      fields: [
        { id: 'watts', label: 'Potência da luz (W)', type: 'number', step: '1', placeholder: '300' },
        { id: 'length', label: 'Comprimento área (cm)', type: 'number', step: '1', placeholder: '120' },
        { id: 'width', label: 'Largura área (cm)', type: 'number', step: '1', placeholder: '120' }
      ],
      calc: function (v) { return Engine.calcWattsM2(v.watts, v.length, v.width); }
    },
    {
      id: 'energia',
      label: 'Energia',
      hint: 'Custo eléctrico',
      fields: [
        { id: 'watts', label: 'Potência total (W)', type: 'number', step: '1', placeholder: '300' },
        { id: 'hours', label: 'Horas por dia', type: 'number', step: '0.5', min: '0', max: '24', placeholder: '18' },
        { id: 'price', label: 'Preço kWh (R$)', type: 'number', step: '0.01', placeholder: '0.85' }
      ],
      calc: function (v) { return Engine.calcEnergia(v.watts, v.hours, v.price); }
    }
  ];

  var currentMode = 'vpd';
  var valuesByMode = {};

  function $(id) {
    return document.getElementById(id);
  }

  function getMode(id) {
    return MODES.find(function (m) { return m.id === id; }) || MODES[0];
  }

  function fieldKey(modeId, fieldId) {
    return modeId + ':' + fieldId;
  }

  function stashCurrentValues() {
    var mode = getMode(currentMode);
    if (!valuesByMode[currentMode]) valuesByMode[currentMode] = {};
    mode.fields.forEach(function (field) {
      var el = $('cl-field-' + field.id);
      if (el) valuesByMode[currentMode][field.id] = el.value;
    });
  }

  function restoreValues(modeId) {
    var stored = valuesByMode[modeId] || {};
    var mode = getMode(modeId);
    mode.fields.forEach(function (field) {
      var el = $('cl-field-' + field.id);
      if (el && stored[field.id] != null) el.value = stored[field.id];
    });
  }

  function updateConditionalFields() {
    var mode = getMode(currentMode);
    mode.fields.forEach(function (field) {
      if (!field.showIf) return;
      var wrap = document.querySelector('[data-field-wrap="' + field.id + '"]');
      if (!wrap) return;
      var shapeEl = $('cl-field-shape');
      var shape = shapeEl ? shapeEl.value : 'retangular';
      wrap.hidden = field.showIf !== shape;
    });
  }

  function renderFields() {
    var panel = $('cultivo-lab-fields');
    var mode = getMode(currentMode);
    if (!panel) return;
    panel.innerHTML = mode.fields.map(function (field) {
      var attrs = 'id="cl-field-' + field.id + '" class="cultivo-lab-input"';
      if (field.step) attrs += ' step="' + field.step + '"';
      if (field.min != null) attrs += ' min="' + field.min + '"';
      if (field.max != null) attrs += ' max="' + field.max + '"';
      if (field.placeholder) attrs += ' placeholder="' + field.placeholder + '"';
      var inputHtml = '';
      if (field.type === 'select') {
        inputHtml = '<select ' + attrs + ' class="cultivo-lab-input select-dark">' +
          field.options.map(function (opt) {
            return '<option value="' + opt.value + '">' + opt.label + '</option>';
          }).join('') +
          '</select>';
      } else {
        inputHtml = '<input type="' + field.type + '" ' + attrs + ' inputmode="decimal">';
      }
      var hidden = field.showIf ? ' data-field-wrap="' + field.id + '"' : '';
      var hiddenAttr = field.showIf && field.showIf !== 'retangular' ? ' hidden' : '';
      return '<label class="cultivo-lab-field"' + hidden + hiddenAttr + '>' +
        '<span class="cultivo-lab-field-label">' + field.label + '</span>' +
        inputHtml +
        '</label>';
    }).join('');

    panel.querySelectorAll('input, select').forEach(function (el) {
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          runCalculate();
        }
      });
      if (el.id === 'cl-field-shape') {
        el.addEventListener('change', updateConditionalFields);
      }
    });

    restoreValues(currentMode);
    updateConditionalFields();
  }

  function renderModeButtons() {
    var nav = $('cultivo-lab-modes');
    if (!nav) return;
    nav.innerHTML = MODES.map(function (mode) {
      return '<button type="button" class="cultivo-lab-mode-btn' +
        (mode.id === currentMode ? ' is-active' : '') +
        '" data-mode="' + mode.id + '" title="' + mode.hint + '">' +
        mode.label + '</button>';
    }).join('');
    nav.querySelectorAll('[data-mode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchMode(btn.getAttribute('data-mode'));
      });
    });
  }

  function switchMode(modeId) {
    if (!getMode(modeId)) return;
    stashCurrentValues();
    currentMode = modeId;
    var mode = getMode(modeId);
    var hint = $('cultivo-lab-mode-hint');
    if (hint) hint.textContent = mode.hint;
    renderModeButtons();
    renderFields();
    clearResult();
    if (history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.set('mode', modeId);
      history.replaceState({}, '', url.pathname + url.search);
    }
  }

  function readValues() {
    var mode = getMode(currentMode);
    var values = {};
    mode.fields.forEach(function (field) {
      var el = $('cl-field-' + field.id);
      if (!el || (field.showIf && el.closest('[hidden]'))) return;
      values[field.id] = el.value;
    });
    valuesByMode[currentMode] = Object.assign({}, values);
    return values;
  }

  function clearResult() {
    var display = $('cultivo-lab-display');
    var detail = $('cultivo-lab-detail');
    var resultBox = $('cultivo-lab-result-box');
    if (display) display.textContent = '—';
    if (detail) detail.innerHTML = '';
    if (resultBox) resultBox.innerHTML = '';
  }

  function showResult(result) {
    var display = $('cultivo-lab-display');
    var detail = $('cultivo-lab-detail');
    var resultBox = $('cultivo-lab-result-box');
    if (!display || !detail) return;

    if (result.error) {
      display.textContent = 'Erro';
      detail.innerHTML = '<p class="result-error">' + result.error + '</p>';
      if (resultBox) resultBox.innerHTML = '';
      return;
    }

    display.textContent = result.primary;
    detail.innerHTML = result.lines.map(function (line) {
      return '<p class="cultivo-lab-detail-line' +
        (result.statusClass && line === result.lines[0] ? ' ' + result.statusClass : '') +
        '">' + line + '</p>';
    }).join('');

    if (resultBox) {
      resultBox.innerHTML =
        '<div class="result-box">' +
        '<p class="result-value-xl">' + result.primary + '</p>' +
        result.lines.map(function (line) {
          return '<p class="result-muted">' + line + '</p>';
        }).join('') +
        '</div>';
      if (result.diary && window.BudGanjaDiaryBridge) {
        window.BudGanjaDiaryBridge.attachSaveBar(resultBox, result.diary);
      }
    }
  }

  function runCalculate() {
    var mode = getMode(currentMode);
    var values = readValues();
    var result = mode.calc(values);
    showResult(result);
  }

  function initFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var mode = params.get('mode');
    if (mode && getMode(mode)) currentMode = mode;
  }

  function init() {
    initFromUrl();
    renderModeButtons();
    renderFields();
    var calcBtn = $('cultivo-lab-calc');
    if (calcBtn) calcBtn.addEventListener('click', runCalculate);
    var clearBtn = $('cultivo-lab-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        valuesByMode[currentMode] = {};
        renderFields();
        clearResult();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
