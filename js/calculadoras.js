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

  document.getElementById('resultado').innerHTML = `
    <div class="result-box">
      <p class="result-value-xl">VPD: ${VPD.toFixed(2)} kPa</p>
      <p class="result-warning-override ${colorClass}">${status}</p>
    </div>
  `;
}

function calcularSuperSolo() {
  const volume = parseFloat(document.getElementById('volume').value);

  if (isNaN(volume) || volume <= 0) {
    document.getElementById('resultado-super-solo').innerHTML = '<p class="result-error">Por favor, insira um volume válido.</p>';
    return;
  }

  const ingredientes = {
    'Base (solo/terra)': volume * 0.4,
    'Composto': volume * 0.3,
    'Castanha (castanha de índia/perlita)': volume * 0.1,
    'Farinha de osso': volume * 0.05,
    'Farinha de krill/camarão': volume * 0.05,
    'Kelp (alga marinha)': volume * 0.03,
    'Calcário (dolomítico)': volume * 0.04,
    'Gesso agrícola': volume * 0.02,
    'Perlita': volume * 0.01
  };

  let resultadoHTML = '<div class="result-box"><h4 class="result-title">Ingredientes para ' + volume + ' litros:</h4><ul class="result-list">';

  for (const [ingrediente, quantidade] of Object.entries(ingredientes)) {
    resultadoHTML += `<li class="result-list-item">
      <span>${ingrediente}:</span>
      <span class="result-primary">${quantidade.toFixed(2)} litros</span>
    </li>`;
  }

  resultadoHTML += '</ul><p class="result-note">* Proporções baseadas em receitas de super solo orgânico. Ajuste conforme necessário.</p></div>';
  document.getElementById('resultado-super-solo').innerHTML = resultadoHTML;
}

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

  document.getElementById('resultado-ec').innerHTML = `
    <div class="result-box">
      <p class="result-value-lg">EC: ${ec.toFixed(2)} mS/cm</p>
      <p class="result-muted">PPM (500): ${ppm500.toFixed(0)} ppm</p>
      <p class="result-muted">PPM (700): ${ppm700.toFixed(0)} ppm</p>
      <p class="result-warning-override ${colorClass}">${status}</p>
    </div>
  `;
}

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

  document.getElementById('resultado-diluicao').innerHTML = `
    <div class="result-box">
      <p class="result-value-lg">Fator de diluição: ${fatorDiluicao.toFixed(2)}x</p>
      <p class="result-muted">Adicione ${((fatorDiluicao - 1) * 100).toFixed(0)}% de água</p>
      <p class="result-note">* Para cada 1L da solução atual, adicione ${(fatorDiluicao - 1).toFixed(2)}L de água</p>
    </div>
  `;
}

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

  document.getElementById('resultado-dli').innerHTML = `
    <div class="result-box">
      <p class="result-value-xl">DLI: ${dli.toFixed(1)} mol/m²/dia</p>
      <p class="result-warning-override ${colorClass}">${status}</p>
      <p class="result-note">* ${ppfd} μmol/m²/s × ${horas}h/dia</p>
    </div>
  `;
}

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

  document.getElementById('resultado-vaso').innerHTML = `
    <div class="result-box">
      <p class="result-value-xl">${litros.toFixed(1)} litros</p>
      <p class="result-muted">${galoes.toFixed(1)} galões</p>
      <p class="result-warning">${recomendacao}</p>
    </div>
  `;
}

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

  document.getElementById('resultado-ph').innerHTML = `
    <div class="result-box">
      <p class="result-value-lg">pH ${ph.toFixed(1)} em ${faixa.nome}</p>
      <p class="result-warning-override ${colorClass}">${status}</p>
      <p class="result-muted">Faixa ideal: ${faixa.min.toFixed(1)} - ${faixa.max.toFixed(1)}</p>
      <p class="result-note">${acao}</p>
    </div>
  `;
}

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

  document.getElementById('resultado-energia').innerHTML = `
    <div class="result-box">
      <p class="result-value-lg">Custo mensal: R$ ${custoMes.toFixed(2)}</p>
      <p class="result-muted">Consumo diário: ${kwhDia.toFixed(2)} kWh (R$ ${custoDia.toFixed(2)}/dia)</p>
      <p class="result-muted">Consumo mensal: ${kwhMes.toFixed(1)} kWh</p>
      <p class="result-muted">Custo anual estimado: R$ ${custoAno.toFixed(2)}</p>
    </div>
  `;
}

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

  document.getElementById('resultado-watts').innerHTML = `
    <div class="result-box">
      <p class="result-value-xl">${wm2.toFixed(0)} W/m²</p>
      <p class="result-muted">Área: ${areaM2.toFixed(2)} m² (${comp}×${larg} cm)</p>
      <p class="result-warning-override ${colorClass}">${status}</p>
      <p class="result-note">* Valores para LEDs modernos. HPS/MH podem precisar de mais W/m².</p>
    </div>
  `;
}
