function calcularEnergia() {
  const watts = parseFloat(document.getElementById('watts').value);
  const horas = parseFloat(document.getElementById('horas-dia').value);
  const preco = parseFloat(document.getElementById('preco-kwh').value);

  if (isNaN(watts) || isNaN(horas) || isNaN(preco) || watts <= 0 || horas <= 0 || preco <= 0) {
    document.getElementById('resultado-energia').innerHTML = '<p class="result-error">Por favor, insira valores válidos.</p>';
    return;
  }

  const kwhDia = (watts * horas) / 1000;
  const kwhMes = kwhDia * 30;
  const custoDia = kwhDia * preco;
  const custoMes = kwhMes * preco;
  const custoAno = custoMes * 12;

  document.getElementById('resultado-energia').innerHTML =
    '<div class="result-box">' +
    '<p class="result-value-lg">Custo mensal: R$ ' + custoMes.toFixed(2) + '</p>' +
    '<p class="result-muted">Consumo diário: ' + kwhDia.toFixed(2) + ' kWh (R$ ' + custoDia.toFixed(2) + '/dia)</p>' +
    '<p class="result-muted">Consumo mensal: ' + kwhMes.toFixed(1) + ' kWh</p>' +
    '<p class="result-muted">Custo anual estimado: R$ ' + custoAno.toFixed(2) + '</p>' +
    '</div>';
  if (window.BudGanjaDiaryBridge) {
    window.BudGanjaDiaryBridge.attachSaveBar(document.getElementById('resultado-energia'), {
      calculator: 'energia',
      text: 'Energia: ' + watts + 'W × ' + horas + 'h/dia — R$ ' + custoMes.toFixed(2) + '/mês'
    });
  }
}
