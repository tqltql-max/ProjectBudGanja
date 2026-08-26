'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');
const {
  readAnimais,
  getAnimalUrl,
  listTags,
  isProducaoAnimal,
  escapeHtml
} = require('../lib/animais-service.js');
const { animalLocalePayload } = require('../lib/animais-i18n.js');

const GENERATED_MARKER = '<!-- generated:animais -->';
const OUT_DIR = path.join(ROOT, 'animais');

const ICON_HEAD = `    <link rel="icon" href="/imagens/favicon-32.v${ASSET_VERSION}.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-48.v${ASSET_VERSION}.png" sizes="48x48" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.v${ASSET_VERSION}.png" sizes="16x16" type="image/png">
    <link rel="icon" href="/imagens/icon-192.v${ASSET_VERSION}.png" sizes="192x192" type="image/png">
    <link rel="shortcut icon" href="/favicon.v${ASSET_VERSION}.ico" sizes="any">
    <link rel="icon" href="/favicon.v${ASSET_VERSION}.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.v${ASSET_VERSION}.png">
    <link rel="manifest" href="/manifest.json?v=${ASSET_VERSION}">
    <meta name="theme-color" content="#0a2230">`;

const SCRIPTS = `  <script src="/js/app-version-check.js?v=${ASSET_VERSION}"></script>
    <script src="/js/i18n-data.js?v=${ASSET_VERSION}"></script>
    <script src="/js/i18n.js?v=${ASSET_VERSION}"></script>
    <script src="/js/ferramentas-nav-data.js?v=${ASSET_VERSION}"></script>
    <script src="/js/layout.js?v=${ASSET_VERSION}"></script>`;

function pageShell(opts) {
  const { title, description, canonical, bodyPage, mainClass, bodyHtml, extraScripts } = opts;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    ${GENERATED_MARKER}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(description)}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://inspetorbudganja.com.br${canonical}">
    <meta property="og:image" content="https://inspetorbudganja.com.br/imagens/og-default.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <link rel="canonical" href="https://inspetorbudganja.com.br${canonical}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="BudGanja">
${ICON_HEAD}
    <link rel="stylesheet" href="/css/style.css?v=${ASSET_VERSION}">
    <title>${escapeHtml(title)}</title>
</head>
<body data-page="${escapeHtml(bodyPage)}">
    <div id="site-header"></div>

    <main id="main-content" class="${escapeHtml(mainClass)}">
${bodyHtml}
    </main>

    <div id="site-footer"></div>
${SCRIPTS}
${extraScripts || ''}
</body>
</html>
`;
}

function buildHub(catalog) {
  const tags = listTags(catalog.animals);
  const tagOptions = ['<option value="" data-i18n="pages.animais.allTags">Todas as tags</option>']
    .concat(tags.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`))
    .join('\n                    ');

  const cards = catalog.animals
    .slice()
    .sort((a, b) => a.nomePopular.localeCompare(b.nomePopular, 'pt'))
    .map((a) => {
      const loc = animalLocalePayload(a);
      const tagAttrs = (a.tags || []).join(' ');
      const cat = isProducaoAnimal(a) ? 'producao' : 'companhia';
      const searchBlob = [
        loc['pt-BR'].nomePopular,
        loc.en.nomePopular,
        loc.es.nomePopular,
        a.nomeCientifico,
        a.familia,
        cat,
        ...(a.tags || [])
      ]
        .join(' ')
        .toLowerCase();
      const badge = isProducaoAnimal(a)
        ? '<span class="animal-card-badge" data-i18n="pages.animais.badgeProducao">Produção</span>'
        : '<span class="animal-card-badge" data-i18n="pages.animais.badgeCompanhia">Companhia</span>';
      return `                <article class="animal-card" data-tags="${escapeHtml(tagAttrs)}" data-category="${escapeHtml(cat)}" data-search="${escapeHtml(searchBlob)}" data-nome-pt="${escapeHtml(loc['pt-BR'].nomePopular)}" data-nome-en="${escapeHtml(loc.en.nomePopular)}" data-nome-es="${escapeHtml(loc.es.nomePopular)}" data-summary-pt="${escapeHtml(loc['pt-BR'].summary)}" data-summary-en="${escapeHtml(loc.en.summary)}" data-summary-es="${escapeHtml(loc.es.summary)}">
                    <a class="animal-card-link" href="${escapeHtml(getAnimalUrl(a))}">
                        <h2 class="animal-card-title" data-animal-nome>${escapeHtml(a.nomePopular)}</h2>
                        <p class="animal-card-sci"><em>${escapeHtml(a.nomeCientifico)}</em></p>
                        <p class="animal-card-summary" data-animal-summary>${escapeHtml(a.summary)}</p>
                        ${badge}
                    </a>
                </article>`;
    })
    .join('\n');

  const body = `        <header class="animais-hub-header">
            <p class="article-eyebrow" data-i18n="pages.animais.eyebrow">Catálogo</p>
            <h1 data-i18n="pages.animais.title">Animais</h1>
            <p class="secao-subtitulo" data-i18n="pages.animais.subtitle">Fichas educacionais: criação, companhia e a linha que separa o animal / produto fresco dos derivados industriais de risco.</p>
        </header>

        <aside class="animais-disclaimer" role="note">
            <strong data-i18n="pages.animais.disclaimerStrong">Aviso educacional.</strong> <span data-i18n="pages.animais.disclaimer">${escapeHtml(catalog.disclaimer)}</span>
        </aside>

        <div class="animais-toolbar">
            <label class="animais-search-label" for="animais-search" data-i18n="pages.animais.searchLabel">Buscar</label>
            <input type="search" id="animais-search" class="animais-search" placeholder="Nome popular, científico ou tag…" data-i18n-placeholder="pages.animais.searchPlaceholder" autocomplete="off">
            <label class="animais-filter-label" for="animais-category" data-i18n="pages.animais.categoryLabel">Eixo</label>
            <select id="animais-category" class="animais-tag-filter">
                <option value="" data-i18n="pages.animais.allCategories">Todos</option>
                <option value="producao" data-i18n="pages.animais.catProducao">Produção / indústria</option>
                <option value="companhia" data-i18n="pages.animais.catCompanhia">Companhia</option>
            </select>
            <label class="animais-filter-label" for="animais-tag" data-i18n="pages.animais.tagLabel">Tag</label>
            <select id="animais-tag" class="animais-tag-filter">
                    ${tagOptions}
            </select>
            <p class="animais-count" id="animais-count" aria-live="polite"></p>
        </div>

        <div class="animais-grid" id="animais-grid">
${cards}
        </div>

        <p class="animais-empty" id="animais-empty" hidden data-i18n="pages.animais.empty">Nenhum animal corresponde aos filtros.</p>

        <p class="animais-related"><a href="/plantas/" data-i18n="pages.animais.relatedPlants">Plantas</a> · <a href="/biblioteca/inspecoes/#inspecoes-animais" data-i18n="pages.animais.relatedInspections">Inspeções</a> · <a href="/biblioteca/inspecoes/#inspecoes-derivados" data-i18n="pages.animais.relatedDerivatives">Derivados de risco</a></p>`;

  return pageShell({
    title: 'Animais | Inspetor BudGanja',
    description:
      'Catálogo de animais: criação, companhia e ligação com derivados industriais de risco — fichas educacionais BudGanja.',
    canonical: '/animais/',
    bodyPage: 'animais',
    mainClass: 'conteudo-interno animais-hub',
    bodyHtml: body,
    extraScripts: `    <script src="/js/animais-hub.js?v=${ASSET_VERSION}"></script>\n`
  });
}

function buildAnimalPage(animal, catalog) {
  const tags = (animal.tags || [])
    .map((t) => `<span class="animal-tag">${escapeHtml(t)}</span>`)
    .join(' ');
  const localeJson = JSON.stringify(animalLocalePayload(animal)).replace(/</g, '\\u003c');
  const relatedInspections = Array.isArray(animal.relatedInspections)
    ? animal.relatedInspections.filter((r) => r && r.href && r.label)
    : [];
  const relatedScienceBlock = relatedInspections.length
    ? `            <div class="animal-related-science">
                <h3 data-i18n="pages.animais.relatedScience">Leituras inspecionadas no laboratório</h3>
                <ul class="info-list">
${relatedInspections
  .map((r) => {
    const labelEn = escapeHtml(r.labelEn || r.label);
    const labelEs = escapeHtml(r.labelEs || r.label);
    return `                    <li><a href="${escapeHtml(r.href)}" data-animal-related-label data-label-pt="${escapeHtml(r.label)}" data-label-en="${labelEn}" data-label-es="${labelEs}">${escapeHtml(r.label)}</a></li>`;
  })
  .join('\n')}
                </ul>
            </div>`
    : '';

  const axis = isProducaoAnimal(animal) ? 'Produção / indústria' : 'Companhia';

  const body = `        <script type="application/json" id="animal-i18n-data">${localeJson}</script>
        <nav class="animal-breadcrumb" data-i18n-aria="pages.animais.breadcrumb" aria-label="Navegação">
            <a href="/animais/" data-i18n="pages.animais.animalsLink">Animais</a>
            <span aria-hidden="true">/</span>
            <span data-animal-nome>${escapeHtml(animal.nomePopular)}</span>
        </nav>

        <header class="article-header animal-header">
            <p class="article-eyebrow">${escapeHtml(animal.familia || 'Animal')} · ${escapeHtml(axis)}</p>
            <h1 data-animal-nome>${escapeHtml(animal.nomePopular)}</h1>
            <p class="animal-sci"><em>${escapeHtml(animal.nomeCientifico)}</em></p>
            <p class="page-intro" data-animal-summary>${escapeHtml(animal.summary)}</p>
            <div class="animal-tags">${tags}</div>
        </header>

        <aside class="animais-disclaimer" role="note">
            <strong data-i18n="pages.animais.disclaimerStrong">Aviso educacional.</strong> <span data-i18n="pages.animais.disclaimer">${escapeHtml(catalog.disclaimer)}</span>
        </aside>

        <section class="info-panel">
            <h2 data-i18n="pages.animais.partsUsed">Produtos / partes</h2>
            <ul class="info-list" data-animal-parts></ul>
        </section>

        <section class="info-panel">
            <h2 data-i18n="pages.animais.traditionalUses">Criação e usos</h2>
            <ul class="info-list" data-animal-uses></ul>
        </section>

        <section class="info-panel" id="animal-cuidados">
            <h2 data-i18n="pages.animais.cautions">Cuidados</h2>
            <p data-animal-cautions>${escapeHtml(animal.cautions)}</p>
${relatedScienceBlock}
        </section>

        <section class="info-panel">
            <h2 data-i18n="pages.animais.continueLab">Continuar no laboratório</h2>
            <ul class="info-list">
                <li><a href="/animais/" data-i18n="pages.animais.backCatalog">Voltar ao catálogo</a></li>
                <li><a href="/plantas/" data-i18n="pages.animais.relatedPlants">Catálogo de plantas</a></li>
                <li><a href="/biblioteca/inspecoes/#inspecoes-animais" data-i18n="pages.animais.relatedInspections">Inspeções de animais</a></li>
                <li><a href="/biblioteca/inspecoes/#inspecoes-derivados" data-i18n="pages.animais.relatedDerivatives">Derivados de risco</a></li>
            </ul>
        </section>`;

  const desc =
    animal.summary ||
    animal.nomePopular + ' (' + animal.nomeCientifico + ') — ficha educacional de animais.';

  return pageShell({
    title: animal.nomePopular + ' | Inspetor BudGanja',
    description: desc.slice(0, 160),
    canonical: getAnimalUrl(animal),
    bodyPage: 'animal',
    mainClass: 'article-page relatorio-container animal-ficha',
    bodyHtml: body,
    extraScripts: ''
  });
}

function cleanGenerated(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      const indexPath = path.join(full, 'index.html');
      if (fs.existsSync(indexPath)) {
        const head = fs.readFileSync(indexPath, 'utf8').slice(0, 200);
        if (head.includes(GENERATED_MARKER)) {
          fs.rmSync(full, { recursive: true, force: true });
        }
      }
    } else if (ent.name === 'index.html') {
      const head = fs.readFileSync(full, 'utf8').slice(0, 200);
      if (head.includes(GENERATED_MARKER)) fs.unlinkSync(full);
    }
  }
}

function buildAnimais() {
  const catalog = readAnimais();
  if (!catalog.animals.length) {
    console.warn('build:animais — nenhum registo em content/animais.json');
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  cleanGenerated(OUT_DIR);

  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), buildHub(catalog), 'utf8');

  catalog.animals.forEach((animal) => {
    const dir = path.join(OUT_DIR, animal.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildAnimalPage(animal, catalog), 'utf8');
  });

  console.log('build:animais — hub +', catalog.animals.length, 'fichas em /animais/');
}

buildAnimais();
