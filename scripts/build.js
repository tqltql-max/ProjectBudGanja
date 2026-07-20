const path = require('path');
const { execSync } = require('child_process');
const { ROOT } = require('../lib/paths.js');
const { publishStaticAssets } = require('../lib/publish-static.js');

async function exportDbFirst() {
  try {
    require('../lib/load-env.js');
    const { exportDbToStaticFiles } = require('../lib/sync-db-files.js');
    await exportDbToStaticFiles(ROOT);
  } catch (e) {
    console.warn('Aviso export-db:', e.message);
  }
}

function runStep(label, script) {
  console.log('\n→ ' + label);
  execSync('node ' + path.join(ROOT, 'scripts', script), { cwd: ROOT, stdio: 'inherit' });
}

function runBuildSteps() {
  try {
    runStep('build:pwa-icons', 'generate-pwa-icons.js');
  } catch (e) {
    console.warn('Aviso build:pwa-icons:', e.message);
  }

  try {
    runStep('generate:calculadoras', 'generate-calculadoras-pages.js');
  } catch (e) {
    console.warn('Aviso generate:calculadoras:', e.message);
  }

  try {
    runStep('sync:cultivo-weeks', 'sync-cultivo-weeks.js');
  } catch (e) {
    console.error('ERRO sync:cultivo-weeks:', e.message);
    throw e;
  }

  try {
    runStep('sync:pages', 'sync-pages-from-html.js');
  } catch (e) {
    console.warn('Aviso sync:pages:', e.message);
  }

  try {
    publishStaticAssets(ROOT);
  } catch (e) {
    console.warn('Aviso publish:static:', e.message);
  }

  try {
    runStep('sync:pages-to-db', 'sync-pages-to-db.js');
  } catch (e) {
    console.warn('Aviso sync:pages-to-db:', e.message);
  }

  try {
    runStep('stamp:pesquisa-series', 'stamp-pesquisa-series.js');
  } catch (e) {
    console.warn('Aviso stamp:pesquisa-series:', e.message);
  }

  try {
    runStep('build:posts', 'regenerate-posts.js');
  } catch (e) {
    console.warn('Aviso build:posts:', e.message);
  }

  try {
    runStep('build:guia', 'build-guia-cultivo.js');
  } catch (e) {
    console.warn('Aviso build:guia:', e.message);
  }

  try {
    runStep('build:youtube', 'build-youtube-feed.js');
  } catch (e) {
    console.warn('Aviso build:youtube:', e.message);
  }

  try {
    runStep('build:jardimhg', 'build-jardimhg-catalog.js');
  } catch (e) {
    console.warn('Aviso build:jardimhg:', e.message);
  }

  try {
    runStep('build:radio', 'build-radio-playlist.js');
  } catch (e) {
    console.warn('Aviso build:radio:', e.message);
  }

  try {
    runStep('sync:i18n-data', 'sync-i18n-data.js');
  } catch (e) {
    console.warn('Aviso sync:i18n-data:', e.message);
  }

  try {
    runStep('sync:ferramentas-nav', 'sync-ferramentas-nav.js');
  } catch (e) {
    console.warn('Aviso sync:ferramentas-nav:', e.message);
  }

  try {
    runStep('sync:loja-data', 'sync-loja-data.js');
  } catch (e) {
    console.warn('Aviso sync:loja-data:', e.message);
  }

  try {
    runStep('build:search', 'build-search-index.js');
  } catch (e) {
    console.warn('Aviso build:search:', e.message);
  }

  try {
    runStep('build:sitemap', 'build-sitemap.js');
  } catch (e) {
    console.warn('Aviso build:sitemap:', e.message);
  }

  try {
    runStep('build:assetlinks', 'build-assetlinks.js');
  } catch (e) {
    console.warn('Aviso build:assetlinks:', e.message);
  }

  try {
    runStep('stamp:assets', 'stamp-assets.js');
  } catch (e) {
    console.warn('Aviso stamp:assets:', e.message);
  }

  // Depois de posts/guia/stamp — evita que templates antigos voltem a pôr o favicon SVG errado.
  try {
    runStep('sync:icon-head', 'sync-icon-head.js');
  } catch (e) {
    console.warn('Aviso sync:icon-head:', e.message);
  }

  console.log('\nBuild concluído: ficheiros estáticos e índices gerados.');
}

exportDbFirst().then(runBuildSteps).catch((e) => {
  console.warn('export-db falhou:', e.message);
  runBuildSteps();
});
