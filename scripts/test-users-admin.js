'use strict';

require('../lib/load-env.js');
const { ROOT } = require('../lib/paths.js');
const { createSqlStore } = require('../lib/store-sql.js');
const { getDbClient, initDatabaseOnce } = require('../lib/db/client.js');
const {
  listUsersForAdmin,
  getUserDetailForAdmin,
  setUserAdmin,
  resolveAdminAccess
} = require('../lib/users-admin-service.js');

const TEST_USER_ID = '__test_users_admin__' + Date.now();
const TEST_USER_ID_2 = '__test_users_admin2__' + Date.now();

let passed = 0;
let failed = 0;

function assert(name, condition, detail) {
  if (condition) {
    passed += 1;
    console.log('  OK  ' + name);
  } else {
    failed += 1;
    console.error(' FAIL ' + name + (detail ? ' — ' + detail : ''));
  }
}

async function run() {
  console.log('=== Testes admin utilizadores (SQL) ===\n');
  await initDatabaseOnce(ROOT);
  const db = getDbClient(ROOT);
  const store = await createSqlStore(ROOT);

  const now = new Date().toISOString();
  await db.execute({
    sql: `INSERT INTO users (id, email, name, picture, provider, profile_json, is_admin, created_at, updated_at)
          VALUES (?, ?, ?, '', 'google', ?, 0, ?, ?)`,
    args: [
      TEST_USER_ID,
      TEST_USER_ID + '@test.local',
      'Utilizador Teste',
      JSON.stringify({ displayName: 'Utilizador Teste', age: 25, experience: 'iniciante' }),
      now,
      now
    ]
  });
  await db.execute({
    sql: `INSERT INTO users (id, email, name, picture, provider, profile_json, is_admin, created_at, updated_at)
          VALUES (?, ?, ?, '', 'google', '{}', 0, ?, ?)`,
    args: [TEST_USER_ID_2, TEST_USER_ID_2 + '@test.local', 'Outro', now, now]
  });

  try {
    const list = await listUsersForAdmin(store, 'test_users_admin');
    assert('listar utilizadores', list.ok && list.users.some((u) => u.id === TEST_USER_ID));

    const detail = await getUserDetailForAdmin(store, TEST_USER_ID);
    assert('detalhe utilizador', detail.ok && detail.user.email.includes('@test.local'));
    assert('campos perfil', detail.user.profileFields && detail.user.profileFields.experience);

    const grant = await setUserAdmin(store, TEST_USER_ID, true, { userId: TEST_USER_ID_2 });
    assert('conceder admin', grant.ok && grant.user.adminGranted);

    const row = await store.getUserByIdAdmin(TEST_USER_ID);
    const access = resolveAdminAccess(row);
    assert('acesso admin na BD', access.isAdmin && access.adminSource === 'db');

    const revoke = await setUserAdmin(store, TEST_USER_ID, false, { userId: TEST_USER_ID_2 });
    assert('revogar admin', revoke.ok && !revoke.user.adminGranted);

    const grant2 = await setUserAdmin(store, TEST_USER_ID_2, true, { userId: TEST_USER_ID });
    assert('conceder admin a segundo utilizador', grant2.ok && grant2.user.adminGranted);
    const revoke2 = await setUserAdmin(store, TEST_USER_ID_2, false, { userId: TEST_USER_ID });
    assert('revogar segundo admin', revoke2.ok);

    const mockStore = {
      async getUsers() {
        return {
          mock_user: {
            id: 'mock_user',
            email: 'mock@example.com',
            name: 'Mock User',
            picture: '',
            provider: 'google',
            isAdmin: false,
            createdAt: now,
            updatedAt: now,
            profile: { displayName: 'Mock', age: 30 }
          }
        };
      },
      async setUsers(users) {
        mockStore._users = users;
      },
      async getSorteios() { return []; },
      async getLojaOrders() { return []; }
    };
    const mockList = await listUsersForAdmin(mockStore, 'mock@');
    assert('fallback getUsers — listar', mockList.ok && mockList.users.length === 1);
    const mockDetail = await getUserDetailForAdmin(mockStore, 'mock_user');
    assert('fallback getUsers — detalhe', mockDetail.ok && mockDetail.user.email === 'mock@example.com');
  } finally {
    await db.execute({ sql: 'DELETE FROM users WHERE id IN (?, ?)', args: [TEST_USER_ID, TEST_USER_ID_2] });
  }

  console.log('\n' + passed + ' passaram, ' + failed + ' falharam.');
  process.exit(failed ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
