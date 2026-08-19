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
    runStep('optimize:hero', 'optimize-hero.js');
  } catch (e) {
    console.warn('Aviso optimize:hero:', e.message);
  }

  try {
    runStep('build:og-images', 'generate-og-images.js');
  } catch (e) {
    console.warn('Aviso build:og-images:', e.message);
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
    // Garante data-i18n nos hubs antes de sync:pages (fonte = HTML).
    runStep('wire:i18n', 'wire-html-i18n.js');
  } catch (e) {
    console.warn('Aviso wire:i18n:', e.message);
  }

  try {
    runStep('sync:pages', 'sync-pages-from-html.js');
  } catch (e) {
    console.warn('Aviso sync:pages:', e.message);
  }

  try {
    runStep('build:apresentacao-pdf', 'generate-apresentacao-pdf.js');
  } catch (e) {
    console.warn('Aviso build:apresentacao-pdf:', e.message);
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
    runStep('build:paulinho', 'build-paulinho-catalog.js');
  } catch (e) {
    console.warn('Aviso build:paulinho:', e.message);
  }

  try {
    runStep('build:zangado', 'build-zangado-catalog.js');
  } catch (e) {
    console.warn('Aviso build:zangado:', e.message);
  }

  try {
    runStep('build:tamara', 'build-tamara-klink-catalog.js');
  } catch (e) {
    console.warn('Aviso build:tamara:', e.message);
  }

  try {
    runStep('build:amyr', 'build-amyr-klink-catalog.js');
  } catch (e) {
    console.warn('Aviso build:amyr:', e.message);
  }

  try {
    runStep('build:videos-hub', 'build-videos-hub.js');
  } catch (e) {
    console.warn('Aviso build:videos-hub:', e.message);
  }

  try {
    runStep('build:radio', 'build-radio-playlist.js');
  } catch (e) {
    console.warn('Aviso build:radio:', e.message);
  }

  try {
    runStep('sync:vida-poemas', 'sync-vida-poemas.js');
  } catch (e) {
    console.warn('Aviso sync:vida-poemas:', e.message);
  }

  try {
    runStep('sync:i18n-data', 'sync-i18n-data.js');
  } catch (e) {
    console.warn('Aviso sync:i18n-data:', e.message);
  }

  try {
    runStep('sync:page-translations', 'sync-page-translations.js');
  } catch (e) {
    console.warn('Aviso sync:page-translations:', e.message);
  }

  try {
    runStep('sync:ferramentas-nav', 'sync-ferramentas-nav.js');
  } catch (e) {
    console.warn('Aviso sync:ferramentas-nav:', e.message);
  }

  try {
    runStep('build:plantas', 'build-plantas.js');
  } catch (e) {
    console.warn('Aviso build:plantas:', e.message);
  }

  try {
    runStep('build:animais', 'build-animais.js');
  } catch (e) {
    console.warn('Aviso build:animais:', e.message);
  }

  try {
    runStep('build:fungos', 'build-fungos.js');
  } catch (e) {
    console.warn('Aviso build:fungos:', e.message);
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
