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
            <a href="/calculadoras/" class="calc-app-back" aria-label="Voltar para Ferramentas">&larr;</a>
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
    <link rel="icon" href="/imagens/icon-192.png" sizes="192x192" type="image/png">
    <link rel="icon" href="/imagens/favicon-48.png" sizes="48x48" type="image/png">
    <link rel="icon" href="/imagens/favicon-32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.png" sizes="16x16" type="image/png">
    <link rel="shortcut icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
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
        <h1>Ferramentas</h1>
        <nav class="calc-apps-grid calc-apps-grid--all" aria-label="Ferramentas">`;

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
    <meta name="description" content="Ferramentas do Inspetor BudGanja — Super Calc, luxímetro e Super Solo.">
    <meta property="og:title" content="Ferramentas | Inspetor BudGanja">
    <meta property="og:description" content="Super Calc, luxímetro e Super Solo — ferramentas numéricas para cultivo.">
    <meta property="og:type" content="website">
    <link rel="icon" href="/imagens/icon-192.png" sizes="192x192" type="image/png">
    <link rel="icon" href="/imagens/favicon-48.png" sizes="48x48" type="image/png">
    <link rel="icon" href="/imagens/favicon-32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.png" sizes="16x16" type="image/png">
    <link rel="shortcut icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#3d5c28">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="BudGanja">
    <link rel="stylesheet" href="/css/style.css">
    <title>Ferramentas | Inspetor BudGanja</title>
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

function removeStaleCalcPages() {
  const activeSlugs = new Set(
    CALCULADORAS.filter((c) => !c.customPage).map((c) => c.slug + '.html')
  );
  activeSlugs.add('index.html');
  if (!fs.existsSync(CALC_DIR)) return;
  for (const name of fs.readdirSync(CALC_DIR)) {
    if (!name.endsWith('.html') || name === 'cultivo-lab.html' || name === 'luximetro.html') continue;
    if (!activeSlugs.has(name)) {
      fs.unlinkSync(path.join(CALC_DIR, name));
      console.log('Removida calculadora obsoleta:', name);
    }
  }
}

function generate() {
  if (!fs.existsSync(CALC_DIR)) {
    fs.mkdirSync(CALC_DIR, { recursive: true });
  }

  removeStaleCalcPages();

  let generated = 0;

  CALCULADORAS.forEach((calc) => {
    if (calc.customPage) return;
    const filePath = path.join(CALC_DIR, calc.slug + '.html');
    fs.writeFileSync(filePath, buildCalcPage(calc), 'utf8');
    generated += 1;
  });

  fs.writeFileSync(path.join(CALC_DIR, 'index.html'), buildHubIndex(), 'utf8');

  console.log('Ferramentas: index + ' + generated + ' páginas geradas em calculadoras/');
}

generate();
