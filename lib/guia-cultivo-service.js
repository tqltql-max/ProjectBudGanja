const fs = require('fs');
const path = require('path');

function videoDisplayTitle(video) {
  if (!video) return 'Vídeo do YouTube';
  const custom = video.customTitle != null ? String(video.customTitle).trim() : '';
  if (custom) return custom;
  return String(video.title || 'Vídeo do YouTube').trim() || 'Vídeo do YouTube';
}

async function readGuiaCultivoFromStore(store, fsFallback) {
  let data = null;

  if (store.getGuiaCultivo) {
    data = await store.getGuiaCultivo();
  }

  if (!data && fsFallback) {
    try {
      data = JSON.parse(fs.readFileSync(
        path.join(fsFallback, 'content', 'guia-cultivo.json'),
        'utf8'
      ));
    } catch (e) { /* ignore */ }
  }

  if (!data || !data.chapters || !data.videos) {
    return null;
  }

  return data;
}

function injectGuiaInline(root) {
  writeGuiaRedirectPage(root);
  return true;
}

function writeGuiaRedirectPage(root) {
  const htmlPath = path.join(root, 'guia', 'cultivo-basico.html');
  const { ASSET_VERSION } = require('./asset-version.js');
  const v = ASSET_VERSION;
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="O Guia de Cultivo Básico passou a ser uma série de inspeções técnicas na biblioteca do Inspetor BudGanja.">
    <meta property="og:title" content="Guia de Cultivo Básico | Inspetor BudGanja">
    <meta property="og:description" content="Série de inspeções com relatórios científicos e vídeos do canal @InspetorBudGanja.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="/imagens/icon-512.png">
    <link rel="icon" href="/imagens/icon-192.png?v=${v}" sizes="192x192" type="image/png">
    <link rel="icon" href="/imagens/favicon-48.png?v=${v}" sizes="48x48" type="image/png">
    <link rel="icon" href="/imagens/favicon-32.png?v=${v}" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.png?v=${v}" sizes="16x16" type="image/png">
    <link rel="shortcut icon" href="/favicon.ico?v=${v}" sizes="any">
    <link rel="icon" href="/favicon.svg?v=${v}" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.png?v=${v}">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#3d5c28">
    <link rel="stylesheet" href="/css/style.css?v=${v}">
    <meta http-equiv="refresh" content="0; url=/biblioteca/inspecoes/">
    <link rel="canonical" href="/biblioteca/inspecoes/">
    <title>Guia de Cultivo Básico | Inspetor BudGanja</title>
    <script>location.replace('/biblioteca/inspecoes/');</script>
</head>
<body data-page="guia-cultivo">
    <div id="site-header"></div>
    <main id="main-content" class="conteudo">
        <p>Redirecionando para a <a href="/biblioteca/inspecoes/">biblioteca de inspeções</a>…</p>
    </main>
    <div id="site-footer"></div>
    <script src="/js/app-version-check.js?v=${v}"></script>
    <script src="/js/i18n-data.js?v=${v}"></script>
    <script src="/js/i18n.js?v=${v}"></script>
    <script src="/js/layout.js?v=${v}"></script>
</body>
</html>
`;
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  fs.writeFileSync(htmlPath, html, 'utf8');
  return true;
}

async function writeGuiaCultivoToStore(store, data, fsFallback) {
  data.updatedAt = new Date().toISOString();

  if (store.setGuiaCultivo) {
    await store.setGuiaCultivo(data);
  }

  if (fsFallback) {
    const outPath = path.join(fsFallback, 'content', 'guia-cultivo.json');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
    injectGuiaInline(fsFallback);
  }

  return data;
}

async function updateGuiaVideo(store, videoId, payload, fsFallback) {
  const id = String(videoId || '').trim();
  if (!id) return { error: 'video id required', status: 400 };

  const data = await readGuiaCultivoFromStore(store, fsFallback);
  if (!data || !data.videos || !data.videos[id]) {
    return { error: 'video not found', status: 404 };
  }

  const video = Object.assign({}, data.videos[id]);

  if (payload.customTitle != null) {
    const customTitle = String(payload.customTitle).trim();
    if (customTitle) video.customTitle = customTitle;
    else delete video.customTitle;
  }

  data.videos[id] = video;
  await writeGuiaCultivoToStore(store, data, fsFallback);

  return { ok: true, video, status: 200 };
}

module.exports = {
  videoDisplayTitle,
  readGuiaCultivoFromStore,
  writeGuiaCultivoToStore,
  updateGuiaVideo,
  injectGuiaInline,
  writeGuiaRedirectPage
};
