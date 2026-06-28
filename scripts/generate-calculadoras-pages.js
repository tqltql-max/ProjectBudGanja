'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const {
  CALCULADORAS,
  getCalculadoraUrl
} = require('../lib/calculadoras-registry.js');
const { getGuiaPostUrl } = require('../lib/calculadoras-guias.js');
const { CALC_ICONS } = require('../lib/ferramentas-nav.js');

const CALC_DIR = path.join(ROOT, 'calculadoras');
const GENERATED_MARKER = '<!-- generated:calculadoras -->';

const FORMS = {
  vpd: `
                <div class="calculator">
                    <label for="temp">Temperatura (°C):</label>
                    <input type="number" id="temp" step="0.1" placeholder="Ex: 25">
                    <label for="umidade">Umidade (%):</label>
                    <input type="number" id="umidade" step="0.1" placeholder="Ex: 60">
                    <button type="button" onclick="calcularVPD()" class="botao">Calcular VPD</button>
                    <div id="resultado"></div>
                </div>
                <details class="calculator-reference">
                    <summary>Faixas de referência VPD</summary>
                    <div class="reference-table reference-table--compact">
                        <table>
                            <thead><tr><th>Fase</th><th>VPD ideal (kPa)</th></tr></thead>
                            <tbody>
                                <tr><td><strong>Clones / Mudas</strong></td><td>0,4 – 0,8</td></tr>
                                <tr><td><strong>Vegetação</strong></td><td>0,8 – 1,2</td></tr>
                                <tr><td><strong>Floração</strong></td><td>1,0 – 1,5</td></tr>
                            </tbody>
                        </table>
                        <p class="reference-note">O VPD indica quanto a planta consegue transpirar. Valores muito baixos favorecem fungos; muito altos causam estresse hídrico.</p>
                    </div>
                </details>`,
  dli: `
                <div class="calculator">
                    <label for="ppfd">PPFD (μmol/m²/s):</label>
                    <input type="number" id="ppfd" step="1" placeholder="Ex: 600">
                    <label for="fotoperiodo">Fotoperíodo (horas/dia):</label>
                    <input type="number" id="fotoperiodo" step="0.5" min="0" max="24" placeholder="Ex: 18">
                    <button type="button" onclick="calcularDLI()" class="botao">Calcular DLI</button>
                    <div id="resultado-dli"></div>
                </div>`,
  'super-solo': `
                <div class="calculator super-solo-calculator">
                    <p class="calculator-section-label">Configuração do cultivo</p>
                    <label for="ss-volume">Volume total de substrato (litros):</label>
                    <input type="number" id="ss-volume" step="0.1" min="0.1" value="45" placeholder="Ex: 45">

                    <p class="calculator-section-label">Componentes da receita</p>
                    <p class="calculator-hint">Marque apenas o que vai usar no super solo.</p>
                    <div class="super-solo-comp-actions">
                        <button type="button" id="ss-select-all" class="botao botao-home botao-home--secondary super-solo-comp-btn">Marcar todos</button>
                        <button type="button" id="ss-select-none" class="botao botao-home botao-home--secondary super-solo-comp-btn">Desmarcar todos</button>
                    </div>
                    <div class="super-solo-components" id="ss-components" aria-label="Selecionar componentes"></div>

                    <button type="button" onclick="calcularSuperSolo()" class="botao">Calcular Ingredientes</button>
                    <div id="resultado-super-solo"></div>
                </div>`,
  'volume-vaso': `
                <div class="calculator">
                    <label for="vaso-forma">Formato do vaso:</label>
                    <select id="vaso-forma" class="select-dark select-dark-spaced" onchange="toggleVasoForm()">
                        <option value="retangular">Retangular</option>
                        <option value="cilindrico">Cilíndrico</option>
                    </select>
                    <div id="vaso-retangular">
                        <label for="vaso-comp">Comprimento (cm):</label>
                        <input type="number" id="vaso-comp" step="0.1" placeholder="Ex: 30">
                        <label for="vaso-larg">Largura (cm):</label>
                        <input type="number" id="vaso-larg" step="0.1" placeholder="Ex: 30">
                    </div>
                    <div id="vaso-cilindrico" class="panel-hidden">
                        <label for="vaso-diametro">Diâmetro (cm):</label>
                        <input type="number" id="vaso-diametro" step="0.1" placeholder="Ex: 25">
                    </div>
                    <label for="vaso-alt">Altura (cm):</label>
                    <input type="number" id="vaso-alt" step="0.1" placeholder="Ex: 30">
                    <button type="button" onclick="calcularVolumeVaso()" class="botao">Calcular Volume</button>
                    <div id="resultado-vaso"></div>
                </div>`,
  ec: `
                <div class="calculator">
                    <label for="ec-ppm">EC (mS/cm):</label>
                    <input type="number" id="ec-ppm" step="0.01" placeholder="Ex: 1.5">
                    <button type="button" onclick="calcularEC()" class="botao">Converter para PPM</button>
                    <div id="resultado-ec"></div>
                </div>`,
  diluicao: `
                <div class="calculator">
                    <label for="concentracao">Concentração atual (EC):</label>
                    <input type="number" id="concentracao" step="0.1" placeholder="Ex: 2.0">
                    <label for="alvo">EC alvo (mS/cm):</label>
                    <input type="number" id="alvo" step="0.1" placeholder="Ex: 1.5">
                    <button type="button" onclick="calcularDiluicao()" class="botao">Calcular Diluição</button>
                    <div id="resultado-diluicao"></div>
                </div>`,
  ph: `
                <div class="calculator">
                    <label for="ph-meio">Meio de cultivo:</label>
                    <select id="ph-meio" class="select-dark select-dark-spaced">
                        <option value="solo">Solo / Super Solo</option>
                        <option value="coco">Fibra de Coco</option>
                        <option value="hidro">Hidroponia</option>
                    </select>
                    <label for="ph-valor">pH medido:</label>
                    <input type="number" id="ph-valor" step="0.1" min="0" max="14" placeholder="Ex: 6.2">
                    <button type="button" onclick="calcularPH()" class="botao">Verificar pH</button>
                    <div id="resultado-ph"></div>
                </div>`,
  energia: `
                <div class="calculator">
                    <label for="watts">Potência total (watts):</label>
                    <input type="number" id="watts" step="1" placeholder="Ex: 300">
                    <label for="horas-dia">Horas por dia:</label>
                    <input type="number" id="horas-dia" step="0.5" min="0" max="24" placeholder="Ex: 18">
                    <label for="preco-kwh">Preço do kWh (R$):</label>
                    <input type="number" id="preco-kwh" step="0.01" placeholder="Ex: 0.85">
                    <button type="button" onclick="calcularEnergia()" class="botao">Calcular Custo</button>
                    <div id="resultado-energia"></div>
                </div>`,
  'watts-m2': `
                <div class="calculator">
                    <label for="watts-luz">Potência da luz (watts):</label>
                    <input type="number" id="watts-luz" step="1" placeholder="Ex: 300">
                    <label for="area-comp">Comprimento da área (cm):</label>
                    <input type="number" id="area-comp" step="1" placeholder="Ex: 120">
                    <label for="area-larg">Largura da área (cm):</label>
                    <input type="number" id="area-larg" step="1" placeholder="Ex: 120">
                    <button type="button" onclick="calcularWattsM2()" class="botao">Calcular W/m²</button>
                    <div id="resultado-watts"></div>
                </div>`
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function getCalcLabel(calc) {
  return calc.shortTitle || calc.title;
}

function getCalcTileLabel(calc) {
  return calc.tileLabel || calc.shortTitle || calc.title;
}

function buildCalcAppHeader(calc) {
  const icon = CALC_ICONS[calc.slug] || '🧮';
  const label = getCalcLabel(calc);
  const guiaUrl = getGuiaPostUrl(calc.slug);
  const guiaBtn = guiaUrl
    ? '            <a href="' + guiaUrl + '" class="calc-app-guia-btn">Guia</a>\n'
    : '';

  return `
        <header class="calc-app-header">
            <a href="/calculadoras/" class="calc-app-back" aria-label="Voltar para calculadoras">&larr;</a>
            <div class="calc-app-header-main">
                <span class="calc-app-icon" aria-hidden="true">${icon}</span>
                <h1>${escapeHtml(label)}</h1>
            </div>
${guiaBtn}        </header>
        <details class="calc-app-about">
            <summary>Sobre</summary>
            <p class="calc-app-about-text">${escapeHtml(calc.description)}</p>
        </details>`;
}

function buildCalcPage(calc) {
  const form = FORMS[calc.slug];
  if (!form) {
    throw new Error('Formulário não definido para: ' + calc.slug);
  }

  const url = '/calculadoras/' + calc.slug + '.html';
  const scriptTag = calc.script
    ? '    <script src="/js/calculadoras/' + calc.script + '"></script>\n'
    : '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    ${GENERATED_MARKER}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(calc.description)}">
    <meta property="og:title" content="${escapeHtml(calc.title)} | Inspetor BudGanja">
    <meta property="og:description" content="${escapeHtml(calc.description)}">
    <meta property="og:type" content="website">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/imagens/favicon-32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.png" sizes="16x16" type="image/png">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#3d5c28">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="BudGanja">
    <link rel="stylesheet" href="/css/style.css">
    <title>${escapeHtml(getCalcLabel(calc))} | Inspetor BudGanja</title>
</head>
<body data-page="${escapeHtml(calc.dataPage || 'calculadora')}">
    <div id="site-header"></div>

    <main id="main-content" class="conteudo calc-app-page">
${buildCalcAppHeader(calc)}

        <div class="calc-app-body">
            <div class="card calc-app-card">
${form}
            </div>
        </div>
    </main>

    <div id="site-footer"></div>
    <script src="/js/ferramentas-nav-data.js"></script>
    <script src="/js/layout.js"></script>
    <script src="/js/cultivo-diary-bridge.js"></script>
${scriptTag}</body>
</html>
`;
}

function buildHubIndex() {
  let body = `
    <main id="main-content" class="conteudo calc-hub">
        <h1>Calculadoras</h1>
        <nav class="calc-apps-grid calc-apps-grid--all" aria-label="Calculadoras">`;

  CALCULADORAS.forEach((calc) => {
    const href = getCalculadoraUrl(calc);
    const icon = CALC_ICONS[calc.slug] || '🧮';
    const label = getCalcTileLabel(calc);
    const featured = calc.featured ? ' calc-app-tile--featured' : '';
    const tip = escapeHtml(calc.description || '');
    const titleAttr = tip ? ` title="${tip}"` : '';
    body += `
            <a href="${href}" class="calc-app-tile calc-app-tile--${calc.slug}${featured}"${titleAttr}>
                <span class="calc-app-tile-icon-wrap" aria-hidden="true">
                    <span class="calc-app-tile-icon">${icon}</span>
                </span>
                <span class="calc-app-tile-label">${escapeHtml(label)}</span>
                ${tip ? `<span class="app-tile-tip" role="tooltip">${tip}</span>` : ''}
            </a>`;
  });

  body += `
        </nav>
    </main>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    ${GENERATED_MARKER}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Calculadoras do Inspetor BudGanja — utilitários para cultivo vegetal: VPD, DLI, EC, luxímetro e mais.">
    <meta property="og:title" content="Calculadoras | Inspetor BudGanja">
    <meta property="og:description" content="Utilitários para cultivo vegetal: VPD, DLI, EC, luxímetro e mais.">
    <meta property="og:type" content="website">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/imagens/favicon-32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.png" sizes="16x16" type="image/png">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#3d5c28">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="BudGanja">
    <link rel="stylesheet" href="/css/style.css">
    <title>Calculadoras | Inspetor BudGanja</title>
</head>
<body data-page="calculadora">
    <div id="site-header"></div>
${body}
    <div id="site-footer"></div>
    <script src="/js/ferramentas-nav-data.js"></script>
    <script src="/js/layout.js"></script>
</body>
</html>
`;
}

function generate() {
  if (!fs.existsSync(CALC_DIR)) {
    fs.mkdirSync(CALC_DIR, { recursive: true });
  }

  let generated = 0;

  CALCULADORAS.forEach((calc) => {
    if (calc.customPage) return;
    const filePath = path.join(CALC_DIR, calc.slug + '.html');
    fs.writeFileSync(filePath, buildCalcPage(calc), 'utf8');
    generated += 1;
  });

  fs.writeFileSync(path.join(CALC_DIR, 'index.html'), buildHubIndex(), 'utf8');

  console.log('Calculadoras: index + ' + generated + ' páginas geradas em calculadoras/');
}

generate();
