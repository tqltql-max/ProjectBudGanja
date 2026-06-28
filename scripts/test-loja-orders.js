'use strict';

require('../lib/load-env.js');

const fs = require('fs');
const path = require('path');
const http = require('http');

const { ROOT } = require('../lib/paths.js');
const { isDevModeEnabled } = require('../lib/site-dev-mode.js');
const { validateLojaOrderPayload, createLojaOrder } = require('../lib/loja-orders-service.js');
const { LOJA_CATALOG, resolveOrderPackage } = require('../lib/loja-catalog.js');

const BASE = 'http://localhost:8080';
const TIMEOUT = 8000;

function fail(msg) {
  return { ok: false, message: msg };
}

function pass(msg) {
  return { ok: true, message: msg };
}

function httpRequest(method, urlPath, body, headers) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'localhost',
      port: 8080,
      path: urlPath,
      method,
      timeout: TIMEOUT,
      headers: Object.assign(
        { 'Content-Type': 'application/json' },
        headers || {},
        data ? { 'Content-Length': Buffer.byteLength(data) } : {}
      )
    };
    const req = http.request(opts, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString('utf8');
        let json = null;
        try { json = JSON.parse(text); } catch (e) { /* ignore */ }
        resolve({ status: res.statusCode, headers: res.headers, text, json });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('timeout: ' + urlPath));
    });
    if (data) req.write(data);
    req.end();
  });
}

function memoryStore(initial) {
  let rows = Array.isArray(initial) ? initial.slice() : [];
  return {
    getLojaOrders: async () => rows.slice(),
    setLojaOrders: async (next) => {
      rows = Array.isArray(next) ? next.slice() : [];
    }
  };
}

function validPayload(overrides) {
  return Object.assign({
    productId: 'clonadora-6',
    packageId: 'montagem',
    nome: 'Cliente Teste',
    email: 'teste@example.com',
    telefone: '(11) 98765-4321',
    cidade: 'São Paulo',
    estado: 'SP',
    mensagem: 'Pedido de teste automatizado.',
    aceite: true
  }, overrides || {});
}

function testCatalog() {
  const results = [];
  if (!LOJA_CATALOG.projects || LOJA_CATALOG.projects.length < 2) {
    results.push(fail('Catálogo deve ter pelo menos 2 projetos'));
    return results;
  }
  ['clonadora-6', 'clonadora-12'].forEach(function (id) {
    const project = LOJA_CATALOG.projects.find(function (p) { return p.id === id; });
    if (!project) {
      results.push(fail('Projeto em falta: ' + id));
      return;
    }
    const opts = project.orderOffer && project.orderOffer.packageOptions;
    if (!opts || opts.length < 2) {
      results.push(fail(id + ': packageOptions incompleto'));
      return;
    }
    const montagem = resolveOrderPackage(project, 'montagem');
    const completa = resolveOrderPackage(project, 'completa');
    if (!montagem || !completa) {
      results.push(fail(id + ': resolveOrderPackage falhou'));
      return;
    }
    results.push(pass(id + ': catálogo e pacotes OK'));
  });
  return results;
}

function testValidation() {
  const results = [];
  const ok = validateLojaOrderPayload(validPayload());
  if (!ok.ok) {
    results.push(fail('Payload válido rejeitado: ' + ok.error));
  } else {
    results.push(pass('Validação aceita payload completo'));
  }

  const noPackage = validateLojaOrderPayload(validPayload({ packageId: 'invalido' }));
  if (noPackage.ok) {
    results.push(fail('Pacote inválido deveria falhar'));
  } else {
    results.push(pass('Pacote inválido rejeitado'));
  }

  const noAceite = validateLojaOrderPayload(validPayload({ aceite: false }));
  if (noAceite.ok) {
    results.push(fail('Aceite obrigatório deveria falhar'));
  } else {
    results.push(pass('Aceite obrigatório validado'));
  }

  return results;
}

async function testCreateOrder() {
  const store = memoryStore([]);
  const result = await createLojaOrder(store, validPayload({ packageId: 'completa', productId: 'clonadora-12' }));
  if (!result.ok) return [fail('createLojaOrder falhou: ' + result.error)];
  const rows = await store.getLojaOrders();
  if (!rows.length) return [fail('Encomenda não gravada na store')];
  const row = rows[0];
  if (row.packageId !== 'completa' || row.productId !== 'clonadora-12') {
    return [fail('Campos package/product incorretos na store')];
  }
  return [pass('createLojaOrder grava pacote e produto')];
}

function testGeneratedAssets() {
  const results = [];
  const files = [
    'js/loja-data.js',
    'js/loja-order-ui.js',
    'js/loja-order-callout.js',
    'js/loja-admin.js',
    'loja-admin.html',
    'loja/encomenda.html',
    'loja/index.html'
  ];
  files.forEach(function (rel) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) {
      results.push(fail('Ficheiro em falta: ' + rel));
      return;
    }
    const text = fs.readFileSync(full, 'utf8');
    if (rel.endsWith('.html') && !text.includes('id="site-header"')) {
      results.push(fail(rel + ' sem #site-header'));
      return;
    }
    if (rel === 'js/loja-data.js' && !text.includes('__LOJA_CATALOG__')) {
      results.push(fail('loja-data.js sem __LOJA_CATALOG__'));
      return;
    }
    if (rel === 'loja/encomenda.html' && !text.includes('encomenda-packages')) {
      results.push(fail('encomenda.html sem selector de pacotes'));
      return;
    }
    if (rel === 'loja/index.html' && !text.includes('loja-order-ui.js')) {
      results.push(fail('loja/index.html sem loja-order-ui.js'));
      return;
    }
    results.push(pass(rel + ' OK'));
  });

  const equipPages = [
    'equipamentos/index.html',
    'equipamentos/clonadora-6-estacas.html',
    'equipamentos/clonadora-12-estacas.html'
  ];
  equipPages.forEach(function (rel) {
    const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    if (!text.includes('data-loja-order=')) {
      results.push(fail(rel + ' sem data-loja-order'));
      return;
    }
    if (!text.includes('loja-order-callout.js')) {
      results.push(fail(rel + ' sem loja-order-callout.js'));
      return;
    }
    results.push(pass(rel + ' callout OK'));
  });

  return results;
}

async function testHttp() {
  const results = [];
  if (isDevModeEnabled()) {
    results.push(pass('HTTP skip — SITE_DEV_MODE ativo (loja bloqueada para visitantes)'));
    return results;
  }
  let serverUp = true;
  try {
    await httpRequest('GET', '/');
  } catch (e) {
    serverUp = false;
    results.push(fail('Servidor offline em ' + BASE + ' — ' + e.message));
    return results;
  }

  const pages = [
    '/loja/',
    '/loja/encomenda.html?produto=clonadora-6',
    '/equipamentos/clonadora-6-estacas.html',
    '/equipamentos/clonadora-12-estacas.html'
  ];
  for (const urlPath of pages) {
    try {
      const res = await httpRequest('GET', urlPath);
      if (res.status !== 200) {
        results.push(fail(urlPath + ' → HTTP ' + res.status));
        continue;
      }
      if (urlPath === '/loja/' && !res.text.includes('loja-order-ui.js')) {
        results.push(fail(urlPath + ' sem loja-order-ui.js'));
        continue;
      }
      if (urlPath.includes('encomenda') && !res.text.includes('encomenda-packages')) {
        results.push(fail(urlPath + ' sem selector de pacotes'));
        continue;
      }
      if (urlPath.includes('/equipamentos/') && !res.text.includes('data-loja-order')) {
        results.push(fail(urlPath + ' sem callout de encomenda'));
        continue;
      }
      results.push(pass(urlPath + ' → 200'));
    } catch (e) {
      results.push(fail(urlPath + ' → ' + e.message));
    }
  }

  try {
    const adminPage = await httpRequest('GET', '/loja-admin.html');
    if (adminPage.status === 200) {
      results.push(fail('loja-admin.html acessível sem autenticação'));
    } else if (adminPage.status === 302 || adminPage.status === 301 || adminPage.status === 401) {
      results.push(pass('loja-admin.html protegido (' + adminPage.status + ')'));
    } else {
      results.push(fail('loja-admin.html resposta inesperada: ' + adminPage.status));
    }
  } catch (e) {
    results.push(fail('loja-admin.html → ' + e.message));
  }

  try {
    const list = await httpRequest('GET', '/api/loja/encomendas');
    if (list.status !== 401) {
      results.push(fail('/api/loja/encomendas deveria exigir auth (401), obteve ' + list.status));
    } else {
      results.push(pass('/api/loja/encomendas protegido'));
    }
  } catch (e) {
    results.push(fail('/api/loja/encomendas → ' + e.message));
  }

  try {
    const bad = await httpRequest('POST', '/api/loja/encomenda', validPayload({ packageId: 'invalido' }));
    if (bad.status !== 400) {
      results.push(fail('POST pacote inválido deveria ser 400, obteve ' + bad.status));
    } else {
      results.push(pass('POST rejeita pacote inválido'));
    }
  } catch (e) {
    results.push(fail('POST pacote inválido → ' + e.message));
  }

  if (serverUp) {
    try {
      const good = await httpRequest('POST', '/api/loja/encomenda', validPayload({
        productId: 'clonadora-6',
        packageId: 'montagem',
        email: 'loja-test-' + Date.now() + '@example.com'
      }));
      if (good.status !== 201) {
        results.push(fail('POST encomenda válida deveria ser 201, obteve ' + good.status + ' — ' + (good.json && good.json.error)));
      } else if (!good.json || !good.json.id) {
        results.push(fail('POST encomenda válida sem id na resposta'));
      } else {
        results.push(pass('POST encomenda válida → 201 (' + good.json.id + ')'));
      }
    } catch (e) {
      results.push(fail('POST encomenda válida → ' + e.message));
    }
  }

  return results;
}

async function main() {
  const sections = [
    ['Catálogo', testCatalog()],
    ['Validação', testValidation()],
    ['Store', await testCreateOrder()],
    ['Assets', testGeneratedAssets()],
    ['HTTP', await testHttp()]
  ];

  const failures = [];
  console.log('\n=== Teste encomendas loja ===\n');
  sections.forEach(function (pair) {
    const title = pair[0];
    const items = pair[1];
    console.log('[' + title + ']');
    items.forEach(function (item) {
      console.log('  ' + (item.ok ? '✓' : '✗') + ' ' + item.message);
      if (!item.ok) failures.push('[' + title + '] ' + item.message);
    });
    console.log('');
  });

  if (failures.length) {
    console.log('Falharam ' + failures.length + ' verificação(ões).\n');
    process.exit(1);
  }
  console.log('Todas as verificações passaram.\n');
}

main().catch(function (e) {
  console.error(e);
  process.exit(1);
});
