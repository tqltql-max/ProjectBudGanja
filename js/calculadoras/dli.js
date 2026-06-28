function calcularDLI() {
  const ppfd = parseFloat(document.getElementById('ppfd').value);
  const horas = parseFloat(document.getElementById('fotoperiodo').value);

  if (isNaN(ppfd) || isNaN(horas) || ppfd <= 0 || horas <= 0 || horas > 24) {
    document.getElementById('resultado-dli').innerHTML = '<p class="result-error">Por favor, insira valores válidos.</p>';
    return;
  }

  const dli = (ppfd * horas * 3600) / 1000000;
  let status = '';
  let colorClass = '';

  if (dli < 6) {
    status = 'Muito baixo - Insuficiente para a maioria das plantas';
    colorClass = 'status-danger';
  } else if (dli < 15) {
    status = 'Baixo - Adequado para clones e mudas';
    colorClass = 'status-info';
  } else if (dli < 25) {
    status = 'Moderado - Bom para vegetativo inicial';
    colorClass = 'status-ok';
  } else if (dli < 40) {
    status = 'Ideal - ótimo para vegetativo e floração';
    colorClass = 'status-ok';
  } else if (dli < 55) {
    status = 'Alto - Excelente com CO₂ suplementar';
    colorClass = 'status-warn';
  } else {
    status = 'Muito alto - Risco de estresse luminoso';
    colorClass = 'status-danger';
  }

  document.getElementById('resultado-dli').innerHTML =
    '<div class="result-box">' +
    '<p class="result-value-xl">DLI: ' + dli.toFixed(1) + ' mol/m²/dia</p>' +
    '<p class="result-warning-override ' + colorClass + '">' + status + '</p>' +
    '<p class="result-note">* ' + ppfd + ' μmol/m²/s × ' + horas + 'h/dia</p>' +
    '</div>';
  if (window.BudGanjaDiaryBridge) {
    window.BudGanjaDiaryBridge.attachSaveBar(document.getElementById('resultado-dli'), {
      calculator: 'dli',
      text: 'DLI ' + dli.toFixed(1) + ' mol/m²/dia (' + ppfd + ' PPFD, ' + horas + 'h) — ' + status,
      metrics: { dli: Math.round(dli * 10) / 10 }
    });
  }
}
