(function (global) {
  'use strict';

  function num(value) {
    const n = parseFloat(value);
    return isNaN(n) ? null : n;
  }

  function calcVpd(temp, rh) {
    const T = num(temp);
    const RH = num(rh);
    if (T == null || RH == null) return { error: 'Informe temperatura e humidade válidas.' };
    const SVP = 0.6108 * Math.exp((17.27 * T) / (T + 237.3));
    const VPD = SVP * (1 - (RH / 100));
    let status = '';
    let statusClass = 'status-info';
    if (VPD < 0.4) {
      status = 'Muito baixo — risco de doenças';
      statusClass = 'status-danger';
    } else if (VPD < 0.8) {
      status = 'Baixo — ideal para propagação';
      statusClass = 'status-ok';
    } else if (VPD < 1.2) {
      status = 'Ideal — ótimo para vegetativo';
      statusClass = 'status-ok';
    } else if (VPD < 1.6) {
      status = 'Alto — bom para floração';
      statusClass = 'status-warn';
    } else {
      status = 'Muito alto — estresse hídrico';
      statusClass = 'status-danger';
    }
    return {
      primary: 'VPD: ' + VPD.toFixed(2) + ' kPa',
      lines: [status],
      statusClass: statusClass,
      diary: {
        calculator: 'vpd',
        text: 'VPD ' + VPD.toFixed(2) + ' kPa (' + T + '°C, ' + RH + '% RH) — ' + status,
        metrics: { vpd: Math.round(VPD * 100) / 100, temp: Math.round(T), rh: Math.round(RH) }
      }
    };
  }

  function calcDli(ppfd, horas) {
    const p = num(ppfd);
    const h = num(horas);
    if (p == null || h == null || p <= 0 || h <= 0 || h > 24) {
      return { error: 'Informe PPFD e fotoperíodo válidos (máx. 24 h).' };
    }
    const dli = (p * h * 3600) / 1000000;
    let status = '';
    let statusClass = 'status-info';
    if (dli < 6) {
      status = 'Muito baixo — insuficiente para a maioria das plantas';
      statusClass = 'status-danger';
    } else if (dli < 15) {
      status = 'Baixo — adequado para clones e mudas';
      statusClass = 'status-info';
    } else if (dli < 25) {
      status = 'Moderado — bom para vegetativo inicial';
      statusClass = 'status-ok';
    } else if (dli < 40) {
      status = 'Ideal — ótimo para vegetativo e floração';
      statusClass = 'status-ok';
    } else if (dli < 55) {
      status = 'Alto — excelente com CO₂ suplementar';
      statusClass = 'status-warn';
    } else {
      status = 'Muito alto — risco de estresse luminoso';
      statusClass = 'status-danger';
    }
    return {
      primary: 'DLI: ' + dli.toFixed(1) + ' mol/m²/dia',
      lines: [status, p + ' μmol/m²/s × ' + h + ' h/dia'],
      statusClass: statusClass,
      diary: {
        calculator: 'dli',
        text: 'DLI ' + dli.toFixed(1) + ' mol/m²/dia (' + p + ' PPFD, ' + h + 'h) — ' + status,
        metrics: { dli: Math.round(dli * 10) / 10 }
      }
    };
  }

  function calcVolume(forma, comp, larg, diametro, alt) {
    const h = num(alt);
    if (h == null || h <= 0) return { error: 'Informe a altura do vaso.' };
    let volumeCm3 = 0;
    if (forma === 'retangular') {
      const c = num(comp);
      const l = num(larg);
      if (c == null || l == null || c <= 0 || l <= 0) {
        return { error: 'Informe comprimento e largura válidos.' };
      }
      volumeCm3 = c * l * h;
    } else {
      const d = num(diametro);
      if (d == null || d <= 0) return { error: 'Informe o diâmetro válido.' };
      const raio = d / 2;
      volumeCm3 = Math.PI * raio * raio * h;
    }
    const litros = volumeCm3 / 1000;
    const galoes = litros * 0.264172;
    let recomendacao = '';
    if (litros < 3) recomendacao = 'Ideal para mudas e clones enraizados';
    else if (litros < 7) recomendacao = 'Bom para vegetativo inicial';
    else if (litros < 15) recomendacao = 'Adequado para ciclo vegetativo completo';
    else if (litros < 30) recomendacao = 'Ótimo para ciclo completo (veg + flora)';
    else recomendacao = 'Excelente para plantas grandes e autoflores em ciclo longo';
    return {
      primary: litros.toFixed(1) + ' litros',
      lines: [galoes.toFixed(1) + ' galões', recomendacao],
      statusClass: 'status-ok',
      diary: {
        calculator: 'volume-vaso',
        text: 'Vaso: ' + litros.toFixed(1) + ' L — ' + recomendacao
      }
    };
  }

  function calcEc(ec) {
    const value = num(ec);
    if (value == null || value <= 0) return { error: 'Informe um EC válido.' };
    const ppm500 = value * 500;
    const ppm700 = value * 700;
    let status = '';
    let statusClass = 'status-info';
    if (value < 0.8) {
      status = 'Baixo — pode indicar deficiência nutricional';
      statusClass = 'status-info';
    } else if (value < 1.2) {
      status = 'Ideal para propagação';
      statusClass = 'status-ok';
    } else if (value < 2.0) {
      status = 'Ideal para vegetativo';
      statusClass = 'status-ok';
    } else if (value < 2.5) {
      status = 'Ideal para floração';
      statusClass = 'status-warn';
    } else {
      status = 'Alto — risco de queima nutricional';
      statusClass = 'status-danger';
    }
    return {
      primary: 'EC: ' + value.toFixed(2) + ' mS/cm',
      lines: ['PPM (500): ' + ppm500.toFixed(0), 'PPM (700): ' + ppm700.toFixed(0), status],
      statusClass: statusClass,
      diary: {
        calculator: 'ec',
        text: 'EC ' + value.toFixed(2) + ' mS/cm — ' + status,
        metrics: { ec: Math.round(value * 10) / 10 }
      }
    };
  }

  function calcDiluicao(concentracao, alvo) {
    const c = num(concentracao);
    const a = num(alvo);
    if (c == null || a == null || c <= 0 || a <= 0) return { error: 'Informe concentrações válidas.' };
    if (c <= a) {
      return {
        primary: 'Sem diluição necessária',
        lines: ['A concentração actual já está no alvo ou abaixo.'],
        statusClass: 'status-warn'
      };
    }
    const fator = c / a;
    return {
      primary: 'Fator: ' + fator.toFixed(2) + '×',
      lines: [
        'Adicione ' + ((fator - 1) * 100).toFixed(0) + '% de água',
        'Por cada 1 L da solução, acrescente ' + (fator - 1).toFixed(2) + ' L de água'
      ],
      statusClass: 'status-ok',
      diary: {
        calculator: 'diluicao',
        text: 'Diluição ' + c.toFixed(2) + ' → ' + a.toFixed(2) + ' (fator ' + fator.toFixed(2) + 'x)'
      }
    };
  }

  function calcPh(meio, ph) {
    const value = num(ph);
    if (value == null || value < 0 || value > 14) return { error: 'Informe um pH entre 0 e 14.' };
    const faixas = {
      solo: { min: 6.0, max: 7.0, nome: 'Solo / Super Solo' },
      coco: { min: 5.5, max: 6.5, nome: 'Fibra de Coco' },
      hidro: { min: 5.5, max: 6.0, nome: 'Hidroponia' }
    };
    const faixa = faixas[meio] || faixas.coco;
    let status = '';
    let statusClass = 'status-ok';
    let acao = '';
    if (value < faixa.min - 0.5) {
      status = 'Muito ácido';
      statusClass = 'status-danger';
      acao = 'Use pH Up — ajuste gradualmente.';
    } else if (value < faixa.min) {
      status = 'Levemente ácido';
      statusClass = 'status-warn';
      acao = 'Use pH Up para elevar levemente.';
    } else if (value <= faixa.max) {
      status = 'Na faixa ideal!';
      statusClass = 'status-ok';
      acao = 'Nenhum ajuste necessário.';
    } else if (value <= faixa.max + 0.5) {
      status = 'Levemente alcalino';
      statusClass = 'status-warn';
      acao = 'Use pH Down para reduzir levemente.';
    } else {
      status = 'Muito alcalino';
      statusClass = 'status-danger';
      acao = 'Use pH Down — ajuste gradualmente.';
    }
    return {
      primary: 'pH ' + value.toFixed(1) + ' · ' + faixa.nome,
      lines: [status, 'Faixa ideal: ' + faixa.min.toFixed(1) + ' – ' + faixa.max.toFixed(1), acao],
      statusClass: statusClass,
      diary: {
        calculator: 'ph',
        text: 'pH ' + value.toFixed(1) + ' em ' + faixa.nome + ' — ' + status,
        metrics: { ph: Math.round(value * 10) / 10 }
      }
    };
  }

  function calcEnergia(watts, horas, preco) {
    const w = num(watts);
    const h = num(horas);
    const p = num(preco);
    if (w == null || h == null || p == null || w <= 0 || h <= 0 || p <= 0) {
      return { error: 'Informe potência, horas e preço válidos.' };
    }
    const kwhDia = (w * h) / 1000;
    const kwhMes = kwhDia * 30;
    const custoDia = kwhDia * p;
    const custoMes = kwhMes * p;
    const custoAno = custoMes * 12;
    return {
      primary: 'R$ ' + custoMes.toFixed(2) + ' / mês',
      lines: [
        kwhDia.toFixed(2) + ' kWh/dia (R$ ' + custoDia.toFixed(2) + ')',
        kwhMes.toFixed(1) + ' kWh/mês',
        'Anual estimado: R$ ' + custoAno.toFixed(2)
      ],
      statusClass: 'status-ok',
      diary: {
        calculator: 'energia',
        text: 'Energia: ' + w + 'W × ' + h + 'h/dia — R$ ' + custoMes.toFixed(2) + '/mês'
      }
    };
  }

  function calcWattsM2(watts, comp, larg) {
    const w = num(watts);
    const c = num(comp);
    const l = num(larg);
    if (w == null || c == null || l == null || w <= 0 || c <= 0 || l <= 0) {
      return { error: 'Informe potência e dimensões válidas.' };
    }
    const areaM2 = (c / 100) * (l / 100);
    const wm2 = w / areaM2;
    let status = '';
    let statusClass = 'status-info';
    if (wm2 < 150) {
      status = 'Insuficiente — crescimento fraco';
      statusClass = 'status-danger';
    } else if (wm2 < 250) {
      status = 'Mínimo — vegetativo com LED eficiente';
      statusClass = 'status-info';
    } else if (wm2 < 400) {
      status = 'Bom — adequado para a maioria dos cultivos';
      statusClass = 'status-ok';
    } else if (wm2 < 600) {
      status = 'Ótimo — floração de alta performance';
      statusClass = 'status-ok';
    } else {
      status = 'Muito alto — verifique distância e temperatura';
      statusClass = 'status-warn';
    }
    return {
      primary: wm2.toFixed(0) + ' W/m²',
      lines: ['Área: ' + areaM2.toFixed(2) + ' m² (' + c + '×' + l + ' cm)', status, 'Valores para LEDs modernos.'],
      statusClass: statusClass,
      diary: {
        calculator: 'watts-m2',
        text: wm2.toFixed(0) + ' W/m² (' + w + 'W em ' + areaM2.toFixed(2) + ' m²) — ' + status
      }
    };
  }

  global.BudGanjaCultivoLabEngine = {
    calcVpd: calcVpd,
    calcDli: calcDli,
    calcVolume: calcVolume,
    calcEc: calcEc,
    calcDiluicao: calcDiluicao,
    calcPh: calcPh,
    calcEnergia: calcEnergia,
    calcWattsM2: calcWattsM2
  };
})(window);
