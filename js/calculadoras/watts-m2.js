function calcularWattsM2() {
  const watts = parseFloat(document.getElementById('watts-luz').value);
  const comp = parseFloat(document.getElementById('area-comp').value);
  const larg = parseFloat(document.getElementById('area-larg').value);

  if (isNaN(watts) || isNaN(comp) || isNaN(larg) || watts <= 0 || comp <= 0 || larg <= 0) {
    document.getElementById('resultado-watts').innerHTML = '<p class="result-error">Por favor, insira valores válidos.</p>';
    return;
  }

  const areaM2 = (comp / 100) * (larg / 100);
  const wm2 = watts / areaM2;
  let status = '';
  let colorClass = '';

  if (wm2 < 150) {
    status = 'Insuficiente - Pode resultar em crescimento fraco';
    colorClass = 'status-danger';
  } else if (wm2 < 250) {
    status = 'Mínimo - Adequado para vegetativo com LED eficiente';
    colorClass = 'status-info';
  } else if (wm2 < 400) {
    status = 'Bom - Adequado para a maioria dos cultivos';
    colorClass = 'status-ok';
  } else if (wm2 < 600) {
    status = 'Ótimo - Excelente para floração de alta performance';
    colorClass = 'status-ok';
  } else {
    status = 'Muito alto - Verifique distância e temperatura';
    colorClass = 'status-warn';
  }

  document.getElementById('resultado-watts').innerHTML =
    '<div class="result-box">' +
    '<p class="result-value-xl">' + wm2.toFixed(0) + ' W/m²</p>' +
    '<p class="result-muted">Área: ' + areaM2.toFixed(2) + ' m² (' + comp + '×' + larg + ' cm)</p>' +
    '<p class="result-warning-override ' + colorClass + '">' + status + '</p>' +
    '<p class="result-note">* Valores para LEDs modernos. HPS/MH podem precisar de mais W/m².</p>' +
    '</div>';
  if (window.BudGanjaDiaryBridge) {
    window.BudGanjaDiaryBridge.attachSaveBar(document.getElementById('resultado-watts'), {
      calculator: 'watts-m2',
      text: wm2.toFixed(0) + ' W/m² (' + watts + 'W em ' + areaM2.toFixed(2) + ' m²) — ' + status
    });
  }
}
