'use strict';

require('../lib/load-env.js');

const { ROOT } = require('../lib/paths.js');
const { createSqlStore } = require('../lib/store-sql.js');
const { handleApiRequest } = require('../lib/api-handler.js');
const { initDatabaseOnce, getDbClient } = require('../lib/db/client.js');
const { getAdminUser, getAdminPass } = require('../lib/utils.js');

const TEST_PREFIX = '__test_api_contract__';

let passed = 0;
let failed = 0;

function assert(name, condition, detail) {
  if (condition) {
    passed += 1;
    console.log('  OK  ' + name);
    return;
  }
  failed += 1;
  console.error(' FAIL ' + name + (detail ? ' — ' + detail : ''));
}

function parseJsonBody(response) {
  try {
    return JSON.parse(response.body || '{}');
  } catch (e) {
    return {};
  }
}

function hasNoSnakeCaseKeys(obj, forbiddenKeys) {
  if (!obj || typeof obj !== 'object') return true;
  return forbiddenKeys.every((key) => !Object.prototype.hasOwnProperty.call(obj, key));
}

async function callApi(store, method, path, body, cookie, query) {
  return handleApiRequest({
    method,
    path,
    headers: cookie ? { cookie } : {},
    body: body ? JSON.stringify(body) : '',
    query: query || ''
  }, {
    store,
    root: ROOT,
    fsFallback: ROOT
  });
}

async function run() {
  console.log('=== Teste de contrato da API (nomenclatura canônica) ===\n');

  await initDatabaseOnce(ROOT);
  const db = getDbClient(ROOT);
  const store = await createSqlStore(ROOT);

  const testUserId = TEST_PREFIX + '-user-' + Date.now();
  const testSorteioId = TEST_PREFIX + '-sorteio-' + Date.now();
  const testOrderId = TEST_PREFIX + '-order-' + Date.now();

  const existingSorteios = await store.getSorteios();
  const existingOrders = await store.getLojaOrders();

  try {
    const now = new Date().toISOString();

    const nextSorteios = existingSorteios.concat([{
      id: testSorteioId,
      user_id: testUserId,
      nome: 'Contrato API',
      email: 'contract-api@example.test',
      cpf: '12345678909',
      cpf_formatado: '123.456.789-09',
      telefone: '11999999999',
      cidade: 'Sao Paulo',
      estado: 'SP',
      instagram: 'contract',
      premio_id: 'premio-api',
      premio_label: 'Premio API',
      created_at: now
    }]);
    await store.setSorteios(nextSorteios);

    const nextOrders = existingOrders.concat([{
      id: testOrderId,
      product_id: 'clonadora-6',
      product_title: 'Clonadora 6',
      package_id: 'montagem',
      package_label: 'Montagem',
      package_price_note: 'Sem bomba',
      nome: 'Contrato API',
      email: 'contract-api@example.test',
      telefone: '11999999999',
      cidade: 'Sao Paulo',
      estado: 'SP',
      mensagem: 'Teste',
      user_id: testUserId,
      status: 'novo',
      created_at: now
    }]);
    await store.setLojaOrders(nextOrders);

    await store.setUsers({
      [testUserId]: {
        id: testUserId,
        google_id: 'google-' + testUserId,
        email: 'contract-api@example.test',
        name: 'Contrato API',
        picture: '',
        provider: 'google',
        local_password_hash: '',
        profile: { displayName: 'Contrato API', age: 25 },
        is_admin: false,
        created_at: now,
        updated_at: now
      }
    });

    const login = await callApi(store, 'POST', '/api/login', {
      username: getAdminUser(),
      password: getAdminPass()
    });
    assert('login admin', login.status === 200, 'status=' + login.status);
    const cookie = (login.setCookies && login.setCookies[0] ? String(login.setCookies[0]).split(';')[0] : '');
    assert('cookie de admin', !!cookie);

    const sorteiosRes = await callApi(store, 'GET', '/api/sorteios', null, cookie);
    assert('GET /api/sorteios status', sorteiosRes.status === 200, 'status=' + sorteiosRes.status);
    const sorteios = parseJsonBody(sorteiosRes);
    const sorteio = Array.isArray(sorteios) ? sorteios.find((row) => row.id === testSorteioId) : null;
    assert('sorteio de teste presente', !!sorteio);
    assert('sorteio camelCase', sorteio && sorteio.userId && sorteio.cpfFormatado && sorteio.premioId && sorteio.premioLabel && sorteio.createdAt);
    assert('sorteio sem snake_case', hasNoSnakeCaseKeys(sorteio, ['user_id', 'cpf_formatado', 'premio_id', 'premio_label', 'created_at']));

    const ordersRes = await callApi(store, 'GET', '/api/loja/encomendas', null, cookie);
    assert('GET /api/loja/encomendas status', ordersRes.status === 200, 'status=' + ordersRes.status);
    const orders = parseJsonBody(ordersRes);
    const order = Array.isArray(orders) ? orders.find((row) => row.id === testOrderId) : null;
    assert('encomenda de teste presente', !!order);
    assert('loja camelCase', order && order.productId && order.productTitle && order.packageId && order.packageLabel && order.packagePriceNote && order.userId && order.createdAt);
    assert('loja sem snake_case', hasNoSnakeCaseKeys(order, ['product_id', 'product_title', 'package_id', 'package_label', 'package_price_note', 'user_id', 'created_at']));

    const usersRes = await callApi(store, 'GET', '/api/admin/users', null, cookie, 'q=' + encodeURIComponent(TEST_PREFIX));
    assert('GET /api/admin/users status', usersRes.status === 200, 'status=' + usersRes.status);
    const usersPayload = parseJsonBody(usersRes);
    const user = usersPayload && Array.isArray(usersPayload.users)
      ? usersPayload.users.find((row) => row.id === testUserId)
      : null;
    assert('utilizador de teste presente', !!user);
    assert('users camelCase', user && Object.prototype.hasOwnProperty.call(user, 'displayName') && Object.prototype.hasOwnProperty.call(user, 'profileComplete') && Object.prototype.hasOwnProperty.call(user, 'createdAt'));
    assert('users sem snake_case', hasNoSnakeCaseKeys(user, ['display_name', 'profile_complete', 'created_at', 'is_admin']));
  } finally {
    await db.execute({ sql: 'DELETE FROM users WHERE id = ?', args: [testUserId] });
    await store.setSorteios(existingSorteios.filter((row) => row.id !== testSorteioId));
    await store.setLojaOrders(existingOrders.filter((row) => row.id !== testOrderId));
  }

  console.log('\n=== Resultado: ' + passed + ' OK, ' + failed + ' falhas ===');
  if (failed > 0) process.exit(1);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});