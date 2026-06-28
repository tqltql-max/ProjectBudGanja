function toggleVasoForm() {
  const forma = document.getElementById('vaso-forma').value;
  document.getElementById('vaso-retangular').classList.toggle('panel-hidden', forma !== 'retangular');
  document.getElementById('vaso-cilindrico').classList.toggle('panel-hidden', forma !== 'cilindrico');
}

function calcularVolumeVaso() {
  const forma = document.getElementById('vaso-forma').value;
  const alt = parseFloat(document.getElementById('vaso-alt').value);
  let volumeCm3 = 0;

  if (isNaN(alt) || alt <= 0) {
    document.getElementById('resultado-vaso').innerHTML = '<p class="result-error">Por favor, insira a altura do vaso.</p>';
    return;
  }

  if (forma === 'retangular') {
    const comp = parseFloat(document.getElementById('vaso-comp').value);
    const larg = parseFloat(document.getElementById('vaso-larg').value);
    if (isNaN(comp) || isNaN(larg) || comp <= 0 || larg <= 0) {
      document.getElementById('resultado-vaso').innerHTML = '<p class="result-error">Por favor, insira comprimento e largura.</p>';
      return;
    }
    volumeCm3 = comp * larg * alt;
  } else {
    const diametro = parseFloat(document.getElementById('vaso-diametro').value);
    if (isNaN(diametro) || diametro <= 0) {
      document.getElementById('resultado-vaso').innerHTML = '<p class="result-error">Por favor, insira o diâmetro.</p>';
      return;
    }
    const raio = diametro / 2;
    volumeCm3 = Math.PI * raio * raio * alt;
  }

  const litros = volumeCm3 / 1000;
  const galoes = litros * 0.264172;
  let recomendacao = '';

  if (litros < 3) recomendacao = 'Ideal para mudas e clones enraizados';
  else if (litros < 7) recomendacao = 'Bom para vegetativo inicial';
  else if (litros < 15) recomendacao = 'Adequado para ciclo vegetativo completo';
  else if (litros < 30) recomendacao = 'Ótimo para ciclo completo (veg + flora)';
  else recomendacao = 'Excelente para plantas grandes e autoflores em ciclo longo';

  document.getElementById('resultado-vaso').innerHTML =
    '<div class="result-box">' +
    '<p class="result-value-xl">' + litros.toFixed(1) + ' litros</p>' +
    '<p class="result-muted">' + galoes.toFixed(1) + ' galões</p>' +
    '<p class="result-warning">' + recomendacao + '</p>' +
    '</div>';
  if (window.BudGanjaDiaryBridge) {
    window.BudGanjaDiaryBridge.attachSaveBar(document.getElementById('resultado-vaso'), {
      calculator: 'volume-vaso',
      text: 'Vaso: ' + litros.toFixed(1) + ' L — ' + recomendacao
    });
  }
}

document.addEventListener('DOMContentLoaded', toggleVasoForm);
