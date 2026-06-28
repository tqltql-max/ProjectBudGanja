const DEFAULT_SORTEIO_CONFIG = {
  ativo: false,
  emBreve: true,
  titulo: 'Sorteio de inauguração — Inspetor BudGanja',
  descricao: 'O primeiro sorteio do laboratório será a clonadora caseira com pote de sorvete documentada no site — bucha de louça, bombinha 24 h. Inscrições em breve.',
  dataSorteio: 'Data a definir',
  googleFormUrl: '',
  manualUrl: '/equipamentos/clonadora-6-estacas.html',
  premios: [
    { id: 'clonadora-aeroponica', label: 'Clonadora caseira com pote de sorvete' }
  ]
};

function parseGoogleFormUrl(input) {
  const raw = String(input || '').trim();
  if (!raw) {
    return { googleFormUrl: '', googleFormEmbedUrl: '', canEmbed: false };
  }

  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.toLowerCase();

    if (host === 'forms.gle') {
      return { googleFormUrl: raw, googleFormEmbedUrl: '', canEmbed: false };
    }

    if (host === 'docs.google.com' && parsed.pathname.includes('/forms/')) {
      let base = raw.split('?')[0].split('#')[0].replace(/\/edit$/, '/viewform');
      if (!base.endsWith('/viewform')) {
        base = base.replace(/\/$/, '') + '/viewform';
      }
      return {
        googleFormUrl: base,
        googleFormEmbedUrl: base + '?embedded=true',
        canEmbed: true
      };
    }
  } catch (e) { /* invalid url */ }

  return { googleFormUrl: '', googleFormEmbedUrl: '', canEmbed: false };
}

function normalizeSorteioConfig(raw) {
  const config = Object.assign({}, DEFAULT_SORTEIO_CONFIG, raw || {});
  config.ativo = config.ativo === true;
  config.emBreve = config.emBreve === true;
  config.titulo = String(config.titulo || DEFAULT_SORTEIO_CONFIG.titulo).trim();
  config.descricao = String(config.descricao || DEFAULT_SORTEIO_CONFIG.descricao).trim();
  config.dataSorteio = String(config.dataSorteio || '').trim();
  config.manualUrl = String(config.manualUrl || '').trim();
  const google = parseGoogleFormUrl(raw && raw.googleFormUrl != null ? raw.googleFormUrl : config.googleFormUrl);
  config.googleFormUrl = google.googleFormUrl;
  config.googleFormEmbedUrl = google.googleFormEmbedUrl;
  config.googleFormCanEmbed = google.canEmbed;
  config.premios = Array.isArray(config.premios) && config.premios.length
    ? config.premios.map((item, index) => ({
      id: String(item.id || 'premio-' + (index + 1)).trim(),
      label: String(item.label || 'Prêmio ' + (index + 1)).trim()
    })).filter((item) => item.label)
    : DEFAULT_SORTEIO_CONFIG.premios.slice();
  return config;
}

async function readSorteioConfigFromStore(store, fsFallback) {
  let config = null;
  if (store.getSorteioConfig) {
    config = await store.getSorteioConfig();
  }
  if (!config && fsFallback) {
    try {
      config = JSON.parse(require('fs').readFileSync(
        require('path').join(fsFallback, 'content', 'sorteio.json'),
        'utf8'
      ));
    } catch (e) { /* ignore */ }
  }
  return normalizeSorteioConfig(config);
}

async function writeSorteioConfigToStore(store, payload, fsFallback) {
  const config = normalizeSorteioConfig(payload);
  if (store.setSorteioConfig) {
    await store.setSorteioConfig(config);
  }
  if (fsFallback) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(fsFallback, 'content', 'sorteio.json');
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2), 'utf8');
  }
  return config;
}

function resolvePremio(config, premioId) {
  const premios = config.premios || [];
  if (premios.length === 1) {
    return premios[0];
  }
  const found = premios.find((item) => item.id === premioId);
  return found || null;
}

module.exports = {
  DEFAULT_SORTEIO_CONFIG,
  parseGoogleFormUrl,
  normalizeSorteioConfig,
  readSorteioConfigFromStore,
  writeSorteioConfigToStore,
  resolvePremio
};
