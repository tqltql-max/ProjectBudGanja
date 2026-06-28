function calcularPH() {
  const meio = document.getElementById('ph-meio').value;
  const ph = parseFloat(document.getElementById('ph-valor').value);

  if (isNaN(ph) || ph < 0 || ph > 14) {
    document.getElementById('resultado-ph').innerHTML = '<p class="result-error">Por favor, insira um pH válido (0-14).</p>';
    return;
  }

  const faixas = {
    solo: { min: 6.0, max: 7.0, nome: 'Solo / Super Solo' },
    coco: { min: 5.5, max: 6.5, nome: 'Fibra de Coco' },
    hidro: { min: 5.5, max: 6.0, nome: 'Hidroponia' }
  };

  const faixa = faixas[meio];
  let status = '';
  let colorClass = '';
  let acao = '';

  if (ph < faixa.min - 0.5) {
    status = 'Muito ácido';
    colorClass = 'status-danger';
    acao = 'Use pH Up para elevar. Diferença grande — ajuste gradualmente.';
  } else if (ph < faixa.min) {
    status = 'Levemente ácido';
    colorClass = 'status-warn';
    acao = 'Use pH Up para elevar levemente.';
  } else if (ph <= faixa.max) {
    status = 'Na faixa ideal!';
    colorClass = 'status-ok';
    acao = 'Nenhum ajuste necessário.';
  } else if (ph <= faixa.max + 0.5) {
    status = 'Levemente alcalino';
    colorClass = 'status-warn';
    acao = 'Use pH Down para reduzir levemente.';
  } else {
    status = 'Muito alcalino';
    colorClass = 'status-danger';
    acao = 'Use pH Down para reduzir. Diferença grande — ajuste gradualmente.';
  }

  document.getElementById('resultado-ph').innerHTML =
    '<div class="result-box">' +
    '<p class="result-value-lg">pH ' + ph.toFixed(1) + ' em ' + faixa.nome + '</p>' +
    '<p class="result-warning-override ' + colorClass + '">' + status + '</p>' +
    '<p class="result-muted">Faixa ideal: ' + faixa.min.toFixed(1) + ' - ' + faixa.max.toFixed(1) + '</p>' +
    '<p class="result-note">' + acao + '</p>' +
    '</div>';
  if (window.BudGanjaDiaryBridge) {
    window.BudGanjaDiaryBridge.attachSaveBar(document.getElementById('resultado-ph'), {
      calculator: 'ph',
      text: 'pH ' + ph.toFixed(1) + ' em ' + faixa.nome + ' — ' + status,
      metrics: { ph: Math.round(ph * 10) / 10 }
    });
  }
}
