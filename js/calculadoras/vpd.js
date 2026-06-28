function calcularVPD() {
  const T = parseFloat(document.getElementById('temp').value);
  const RH = parseFloat(document.getElementById('umidade').value);

  if (isNaN(T) || isNaN(RH)) {
    document.getElementById('resultado').innerHTML = '<p class="result-error">Por favor, insira valores válidos.</p>';
    return;
  }

  const SVP = 0.6108 * Math.exp((17.27 * T) / (T + 237.3));
  const VPD = SVP * (1 - (RH / 100));

  let status = '';
  let colorClass = '';

  if (VPD < 0.4) {
    status = 'Muito baixo - Risco de doenças';
    colorClass = 'status-info';
  } else if (VPD < 0.8) {
    status = 'Baixo - Ideal para propagação';
    colorClass = 'status-ok';
  } else if (VPD < 1.2) {
    status = 'Ideal - ótimo para vegetativo';
    colorClass = 'status-ok';
  } else if (VPD < 1.6) {
    status = 'Alto - Bom para floração';
    colorClass = 'status-warn';
  } else {
    status = 'Muito alto - Estresse hídrico';
    colorClass = 'status-danger';
  }

  document.getElementById('resultado').innerHTML =
    '<div class="result-box">' +
    '<p class="result-value-xl">VPD: ' + VPD.toFixed(2) + ' kPa</p>' +
    '<p class="result-warning-override ' + colorClass + '">' + status + '</p>' +
    '</div>';
  if (window.BudGanjaDiaryBridge) {
    window.BudGanjaDiaryBridge.attachSaveBar(document.getElementById('resultado'), {
      calculator: 'vpd',
      text: 'VPD ' + VPD.toFixed(2) + ' kPa (' + T + '°C, ' + RH + '% RH) — ' + status,
      metrics: { vpd: Math.round(VPD * 100) / 100, temp: Math.round(T), rh: Math.round(RH) }
    });
  }
}
