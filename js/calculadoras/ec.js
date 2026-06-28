function calcularEC() {
  const ec = parseFloat(document.getElementById('ec-ppm').value);

  if (isNaN(ec) || ec <= 0) {
    document.getElementById('resultado-ec').innerHTML = '<p class="result-error">Por favor, insira um valor válido.</p>';
    return;
  }

  const ppm500 = ec * 500;
  const ppm700 = ec * 700;
  let status = '';
  let colorClass = '';

  if (ec < 0.8) {
    status = 'Baixo - Pode indicar deficiência nutricional';
    colorClass = 'status-info';
  } else if (ec < 1.2) {
    status = 'Ideal para propagação';
    colorClass = 'status-ok';
  } else if (ec < 2.0) {
    status = 'Ideal para vegetativo';
    colorClass = 'status-ok';
  } else if (ec < 2.5) {
    status = 'Ideal para floração';
    colorClass = 'status-warn';
  } else {
    status = 'Alto - Risco de queima nutricional';
    colorClass = 'status-danger';
  }

  document.getElementById('resultado-ec').innerHTML =
    '<div class="result-box">' +
    '<p class="result-value-lg">EC: ' + ec.toFixed(2) + ' mS/cm</p>' +
    '<p class="result-muted">PPM (500): ' + ppm500.toFixed(0) + ' ppm</p>' +
    '<p class="result-muted">PPM (700): ' + ppm700.toFixed(0) + ' ppm</p>' +
    '<p class="result-warning-override ' + colorClass + '">' + status + '</p>' +
    '</div>';
  if (window.BudGanjaDiaryBridge) {
    window.BudGanjaDiaryBridge.attachSaveBar(document.getElementById('resultado-ec'), {
      calculator: 'ec',
      text: 'EC ' + ec.toFixed(2) + ' mS/cm — ' + status,
      metrics: { ec: Math.round(ec * 10) / 10 }
    });
  }
}
