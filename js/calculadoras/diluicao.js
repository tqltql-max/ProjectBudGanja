function calcularDiluicao() {
  const concentracao = parseFloat(document.getElementById('concentracao').value);
  const alvo = parseFloat(document.getElementById('alvo').value);

  if (isNaN(concentracao) || isNaN(alvo) || concentracao <= 0 || alvo <= 0) {
    document.getElementById('resultado-diluicao').innerHTML = '<p class="result-error">Por favor, insira valores válidos.</p>';
    return;
  }

  if (concentracao <= alvo) {
    document.getElementById('resultado-diluicao').innerHTML = '<p class="result-warning">A concentração atual já está menor ou igual ao alvo. Não é necessário diluir.</p>';
    return;
  }

  const fatorDiluicao = concentracao / alvo;

  document.getElementById('resultado-diluicao').innerHTML =
    '<div class="result-box">' +
    '<p class="result-value-lg">Fator de diluição: ' + fatorDiluicao.toFixed(2) + 'x</p>' +
    '<p class="result-muted">Adicione ' + ((fatorDiluicao - 1) * 100).toFixed(0) + '% de água</p>' +
    '<p class="result-note">* Para cada 1L da solução atual, adicione ' + (fatorDiluicao - 1).toFixed(2) + 'L de água</p>' +
    '</div>';
  if (window.BudGanjaDiaryBridge) {
    window.BudGanjaDiaryBridge.attachSaveBar(document.getElementById('resultado-diluicao'), {
      calculator: 'diluicao',
      text: 'Diluição ' + concentracao.toFixed(2) + ' → ' + alvo.toFixed(2) + ' (fator ' + fatorDiluicao.toFixed(2) + 'x)'
    });
  }
}
