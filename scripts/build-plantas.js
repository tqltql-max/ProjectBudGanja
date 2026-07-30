'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');
const {
  readPlantas,
  getPlantUrl,
  listTags,
  escapeHtml
} = require('../lib/plantas-service.js');

const GENERATED_MARKER = '<!-- generated:plantas -->';
const OUT_DIR = path.join(ROOT, 'plantas');

const ICON_HEAD = `    <link rel="icon" href="/imagens/favicon-32.v${ASSET_VERSION}.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-48.v${ASSET_VERSION}.png" sizes="48x48" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.v${ASSET_VERSION}.png" sizes="16x16" type="image/png">
    <link rel="icon" href="/imagens/icon-192.v${ASSET_VERSION}.png" sizes="192x192" type="image/png">
    <link rel="shortcut icon" href="/favicon.v${ASSET_VERSION}.ico" sizes="any">
    <link rel="icon" href="/favicon.v${ASSET_VERSION}.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.v${ASSET_VERSION}.png">
    <link rel="manifest" href="/manifest.json?v=${ASSET_VERSION}">
    <meta name="theme-color" content="#a68628">`;

const SCRIPTS = `  <script src="/js/app-version-check.js?v=${ASSET_VERSION}"></script>
    <script src="/js/i18n-data.js?v=${ASSET_VERSION}"></script>
    <script src="/js/i18n.js?v=${ASSET_VERSION}"></script>
    <script src="/js/ferramentas-nav-data.js?v=${ASSET_VERSION}"></script>
    <script src="/js/layout.js?v=${ASSET_VERSION}"></script>`;

function pageShell(opts) {
  const {
    title,
    description,
    canonical,
    bodyPage,
    mainClass,
    bodyHtml,
    extraScripts
  } = opts;
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
  const tags = listTags(catalog.plants);
  const tagOptions = ['<option value="">Todas as tags</option>']
    .concat(tags.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`))
    .join('\n                    ');

  const cards = catalog.plants
    .slice()
    .sort((a, b) => a.nomePopular.localeCompare(b.nomePopular, 'pt'))
    .map((p) => {
      const tagAttrs = (p.tags || []).join(' ');
      const searchBlob = [p.nomePopular, p.nomeCientifico, p.familia, ...(p.tags || [])]
        .join(' ')
        .toLowerCase();
      const unifesp = p.relatedUnifesp
        ? '<span class="planta-card-badge">UNIFESP</span>'
        : '';
      return `                <article class="planta-card" data-tags="${escapeHtml(tagAttrs)}" data-search="${escapeHtml(searchBlob)}">
                    <a class="planta-card-link" href="${escapeHtml(getPlantUrl(p))}">
                        <h2 class="planta-card-title">${escapeHtml(p.nomePopular)}</h2>
                        <p class="planta-card-sci"><em>${escapeHtml(p.nomeCientifico)}</em></p>
                        <p class="planta-card-summary">${escapeHtml(p.summary)}</p>
                        ${unifesp}
                    </a>
                </article>`;
    })
    .join('\n');

  const body = `        <header class="plantas-hub-header">
            <p class="article-eyebrow">Catálogo</p>
            <h1>Plantas fitoterápicas</h1>
            <p class="secao-subtitulo">Fichas educacionais de espécies usadas na medicina popular e na fitoterapia brasileira — usos tradicionais, partes usadas e cuidados editoriais.</p>
        </header>

        <aside class="plantas-disclaimer" role="note">
            <strong>Aviso educacional.</strong> ${escapeHtml(catalog.disclaimer)}
        </aside>

        <div class="plantas-toolbar">
            <label class="plantas-search-label" for="plantas-search">Buscar</label>
            <input type="search" id="plantas-search" class="plantas-search" placeholder="Nome popular, científico ou tag…" autocomplete="off">
            <label class="plantas-filter-label" for="plantas-tag">Tag</label>
            <select id="plantas-tag" class="plantas-tag-filter">
                    ${tagOptions}
            </select>
            <p class="plantas-count" id="plantas-count" aria-live="polite"></p>
        </div>

        <div class="plantas-grid" id="plantas-grid">
${cards}
        </div>

        <p class="plantas-empty" id="plantas-empty" hidden>Nenhuma planta corresponde aos filtros.</p>

        <p class="plantas-related"><a href="/biblioteca/unifesp/">Curso UNIFESP</a> · <a href="/biblioteca/inspecoes/">Inspeções</a> · <a href="/cultivo/">Diário de cultivo</a></p>`;

  return pageShell({
    title: 'Plantas fitoterápicas | Inspetor BudGanja',
    description:
      'Catálogo curado de plantas medicinais e fitoterápicas do Brasil — fichas educacionais com usos tradicionais e cuidados.',
    canonical: '/plantas/',
    bodyPage: 'plantas',
    mainClass: 'conteudo-interno plantas-hub',
    bodyHtml: body,
    extraScripts: `    <script src="/js/plantas-hub.js?v=${ASSET_VERSION}"></script>\n`
  });
}

function buildPlantPage(plant, catalog) {
  const parts = (plant.partsUsed || [])
    .map((x) => `<li>${escapeHtml(x)}</li>`)
    .join('\n                    ');
  const uses = (plant.traditionalUses || [])
    .map((x) => `<li>${escapeHtml(x)}</li>`)
    .join('\n                    ');
  const tags = (plant.tags || [])
    .map((t) => `<span class="planta-tag">${escapeHtml(t)}</span>`)
    .join(' ');

  const unifespBlock = plant.relatedUnifesp
    ? `        <section class="info-panel">
            <h2>Formação UNIFESP</h2>
            <p>Esta espécie está ligada ao eixo do curso de extensão UNIFESP sobre cannabis medicinal.</p>
            <div class="home-pillar-actions">
                <a class="botao botao-home" href="/biblioteca/unifesp/">Hub UNIFESP</a>
                <a class="botao botao-home botao-home--secondary" href="/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html">Inspeção do curso</a>
            </div>
        </section>`
    : '';

  const body = `        <nav class="planta-breadcrumb" aria-label="Navegação">
            <a href="/plantas/">Plantas</a>
            <span aria-hidden="true">/</span>
            <span>${escapeHtml(plant.nomePopular)}</span>
        </nav>

        <header class="article-header planta-header">
            <p class="article-eyebrow">${escapeHtml(plant.familia || 'Fitoterapia')}</p>
            <h1>${escapeHtml(plant.nomePopular)}</h1>
            <p class="planta-sci"><em>${escapeHtml(plant.nomeCientifico)}</em></p>
            <p class="page-intro">${escapeHtml(plant.summary)}</p>
            <div class="planta-tags">${tags}</div>
        </header>

        <aside class="plantas-disclaimer" role="note">
            <strong>Aviso educacional.</strong> ${escapeHtml(catalog.disclaimer)}
        </aside>

        <section class="info-panel">
            <h2>Partes usadas</h2>
            <ul class="info-list">
                    ${parts || '<li>—</li>'}
            </ul>
        </section>

        <section class="info-panel">
            <h2>Usos tradicionais</h2>
            <ul class="info-list">
                    ${uses || '<li>—</li>'}
            </ul>
        </section>

        <section class="info-panel">
            <h2>Cuidados</h2>
            <p>${escapeHtml(plant.cautions)}</p>
        </section>

${unifespBlock}

        <section class="info-panel">
            <h2>Continuar no laboratório</h2>
            <ul class="info-list">
                <li><a href="/plantas/">Voltar ao catálogo</a></li>
                <li><a href="/biblioteca/unifesp/">Curso UNIFESP</a></li>
                <li><a href="/biblioteca/inspecoes/">Inspeções</a></li>
                <li><a href="/calculadoras/">Ferramentas de cultivo</a></li>
                <li><a href="/cultivo/">Diário de cultivo</a></li>
            </ul>
        </section>`;

  const desc =
    plant.summary ||
    plant.nomePopular + ' (' + plant.nomeCientifico + ') — ficha educacional de fitoterapia.';

  return pageShell({
    title: plant.nomePopular + ' | Inspetor BudGanja',
    description: desc.slice(0, 160),
    canonical: getPlantUrl(plant),
    bodyPage: 'planta',
    mainClass: 'article-page relatorio-container planta-ficha',
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

function buildPlantas() {
  const catalog = readPlantas();
  if (!catalog.plants.length) {
    console.warn('build:plantas — nenhum registo em content/plantas.json');
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  cleanGenerated(OUT_DIR);

  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), buildHub(catalog), 'utf8');

  catalog.plants.forEach((plant) => {
    const dir = path.join(OUT_DIR, plant.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildPlantPage(plant, catalog), 'utf8');
  });

  console.log('build:plantas — hub +', catalog.plants.length, 'fichas em /plantas/');
}

buildPlantas();
