'use strict';

require('../lib/load-env.js');
const { ROOT } = require('../lib/paths.js');
const { getDbClient, initDatabaseOnce } = require('../lib/db/client.js');
const { saveCultivoState, loadCultivoState } = require('../lib/db/cultivo-repos.js');

const TEST_USER_ID = '__test_cultivo__' + Date.now();

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
  console.log('=== Testes cultivo (SQL) ===\n');
  await initDatabaseOnce(ROOT);
  const db = getDbClient(ROOT);

  const now = new Date().toISOString();
  await db.execute({
    sql: `INSERT INTO users (id, email, name, picture, provider, profile_json, created_at, updated_at)
          VALUES (?, ?, ?, '', 'google', '{}', ?, ?)
          ON CONFLICT(id) DO NOTHING`,
    args: [TEST_USER_ID, TEST_USER_ID + '@test.local', 'Teste Cultivo', now, now]
  });

  const growId = 'g' + Date.now();
  const state = {
    phase: 'vegetativo',
    phaseStartedAt: now,
    activeGrowLogId: growId,
    customGuide: 'Notas gerais de teste',
    guideWeekNotes: { '1': 'Semana 1 ok' },
    growLogs: [{
      id: growId,
      name: 'Pesquisa teste',
      species: 'Lycopersicon esculentum',
      plantedAt: now,
      phase: 'vegetativo',
      plantCount: 3,
      createdAt: now,
      updatedAt: now,
      entries: [{
        id: 'e1',
        date: now.slice(0, 10),
        text: 'Rega de teste',
        source: 'manual',
        actionType: 'rega',
        metrics: { ph: 6.2, ec: 1.1 },
        photos: [],
        createdAt: now
      }]
    }],
    planTasks: [{
      id: 't1',
      label: 'Rega amanhã',
      done: false,
      toolHref: '',
      dueAt: now.slice(0, 10),
      actionType: 'rega',
      growId: growId
    }]
  };

  try {
    await saveCultivoState(db, TEST_USER_ID, state);
    const loaded = await loadCultivoState(db, TEST_USER_ID);
    assert('load settings phase', loaded.phase === 'vegetativo');
    assert('grow count', loaded.growLogs.length === 1);
    assert('grow species', loaded.growLogs[0].species === 'Lycopersicon esculentum');
    assert('grow plantCount', loaded.growLogs[0].plantCount === 3);
    assert('entry count', loaded.growLogs[0].entries.length === 1);
    assert('entry metrics ph', loaded.growLogs[0].entries[0].metrics.ph === 6.2);
    assert('plan task', loaded.planTasks.length === 1 && loaded.planTasks[0].label === 'Rega amanhã');
    assert('guide week notes', loaded.guideWeekNotes['1'] === 'Semana 1 ok');
  } finally {
    await db.execute({ sql: 'DELETE FROM cultivo_entries WHERE user_id = ?', args: [TEST_USER_ID] });
    await db.execute({ sql: 'DELETE FROM cultivo_grows WHERE user_id = ?', args: [TEST_USER_ID] });
    await db.execute({ sql: 'DELETE FROM cultivo_plan_tasks WHERE user_id = ?', args: [TEST_USER_ID] });
    await db.execute({ sql: 'DELETE FROM cultivo_settings WHERE user_id = ?', args: [TEST_USER_ID] });
    await db.execute({ sql: 'DELETE FROM users WHERE id = ?', args: [TEST_USER_ID] });
  }

  console.log('\n' + passed + ' OK, ' + failed + ' FAIL');
  process.exit(failed ? 1 : 0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
