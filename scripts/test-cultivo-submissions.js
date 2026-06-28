'use strict';

require('../lib/load-env.js');
const { ROOT } = require('../lib/paths.js');
const { createSqlStore } = require('../lib/store-sql.js');
const { getDbClient, initDatabaseOnce } = require('../lib/db/client.js');
const { saveCultivoState } = require('../lib/db/cultivo-repos.js');
const {
  submitGrowForPublication,
  listUserSubmissions,
  listAdminSubmissions,
  approveSubmission,
  rejectSubmission
} = require('../lib/cultivo-submissions-service.js');
const { deletePost } = require('../lib/posts-service.js');

const TEST_USER_ID = '__test_submissions__' + Date.now();

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
  console.log('=== Testes submissões de pesquisas (SQL) ===\n');
  await initDatabaseOnce(ROOT);
  const db = getDbClient(ROOT);
  const store = await createSqlStore(ROOT);

  const now = new Date().toISOString();
  await db.execute({
    sql: `INSERT INTO users (id, email, name, picture, provider, profile_json, created_at, updated_at)
          VALUES (?, ?, ?, '', 'google', '{}', ?, ?)
          ON CONFLICT(id) DO NOTHING`,
    args: [TEST_USER_ID, TEST_USER_ID + '@test.local', 'Teste Submissões', now, now]
  });

  const growId = 'g' + Date.now();
  const state = {
    phase: 'vegetativo',
    activeGrowLogId: growId,
    customGuide: 'Roteiro geral de teste para submissão',
    growLogs: [{
      id: growId,
      name: 'Pesquisa submissão teste',
      species: 'Capsicum annuum',
      plantedAt: now,
      phase: 'vegetativo',
      entries: [{
        id: 'e1',
        date: now.slice(0, 10),
        text: 'Primeiro registo de campo',
        source: 'manual',
        photos: []
      }]
    }],
    planTasks: []
  };

  let submissionId = null;
  let postSlug = null;

  try {
    await saveCultivoState(db, TEST_USER_ID, state);

    const empty = await submitGrowForPublication(store, TEST_USER_ID, { growId: 'missing' });
    assert('grow inexistente', !empty.ok && empty.status === 404);

    const submit = await submitGrowForPublication(store, TEST_USER_ID, {
      growId,
      title: 'Pesquisa de teste automático',
      excerpt: 'Resumo de teste'
    });
    assert('submeter pesquisa', submit.ok && submit.submission && submit.submission.status === 'pending');
    submissionId = submit.submission && submit.submission.id;

    const dup = await submitGrowForPublication(store, TEST_USER_ID, { growId, title: 'Duplicado' });
    assert('bloquear submissão duplicada', !dup.ok && dup.status === 409);

    const userList = await listUserSubmissions(store, TEST_USER_ID, growId);
    assert('listar submissões do utilizador', userList.length >= 1 && userList[0].growId === growId);

    const adminPending = await listAdminSubmissions(store, 'pending');
    assert('admin vê pendentes', adminPending.some((row) => row.id === submissionId));

    const reject = await rejectSubmission(store, submissionId, 'Conteúdo insuficiente para teste');
    assert('rejeitar submissão', reject.ok && reject.submission.status === 'rejected');

    const resubmit = await submitGrowForPublication(store, TEST_USER_ID, {
      growId,
      title: 'Pesquisa reenviada',
      excerpt: 'Segunda tentativa'
    });
    assert('reenviar após rejeição', resubmit.ok);
    submissionId = resubmit.submission.id;

    const approve = await approveSubmission(
      store,
      submissionId,
      { title: 'Pesquisa aprovada teste', published: false },
      async () => {},
      async () => {},
      ROOT
    );
    assert('aprovar submissão', approve.ok && approve.submission.status === 'approved');
    assert('criar post', approve.post && approve.post.slug);
    postSlug = approve.post && approve.post.slug;

    const afterApprove = await submitGrowForPublication(store, TEST_USER_ID, { growId });
    assert('bloquear após aprovação', !afterApprove.ok && afterApprove.status === 409);
  } finally {
    if (postSlug) {
      try {
        await deletePost(store, postSlug);
      } catch (e) { /* ignore */ }
    }
    if (submissionId) {
      await db.execute({ sql: 'DELETE FROM cultivo_submissions WHERE id = ?', args: [submissionId] });
    }
    await db.execute({ sql: 'DELETE FROM cultivo_entries WHERE user_id = ?', args: [TEST_USER_ID] });
    await db.execute({ sql: 'DELETE FROM cultivo_grows WHERE user_id = ?', args: [TEST_USER_ID] });
    await db.execute({ sql: 'DELETE FROM cultivo_settings WHERE user_id = ?', args: [TEST_USER_ID] });
    await db.execute({ sql: 'DELETE FROM users WHERE id = ?', args: [TEST_USER_ID] });
  }

  console.log('\n' + passed + ' passaram, ' + failed + ' falharam.');
  process.exit(failed ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
