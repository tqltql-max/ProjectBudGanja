'use strict';

require('../lib/load-env.js');
const { ROOT } = require('../lib/paths.js');
const { createSqlStore } = require('../lib/store-sql.js');
const { initDatabaseOnce, getDbClient } = require('../lib/db/client.js');
const { renderEmailTemplate, listEmailTemplates } = require('../lib/email-templates.js');
const {
  enqueueEmail,
  processEmailQueue,
  sendWelcomeEmail,
  getSmtpCredentials
} = require('../lib/email-service.js');

const TEST_USER_ID = '__test_email_' + Date.now();

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
  console.log('=== Testes e-mail transacional ===\n');
  await initDatabaseOnce(ROOT);
  const db = getDbClient(ROOT);
  const store = await createSqlStore(ROOT);

  assert('templates registados', listEmailTemplates().includes('welcome'));
  const welcome = renderEmailTemplate('welcome', { name: 'Tiago' });
  assert('render welcome', welcome.subject.includes('Bem-vindo') && welcome.text.includes('Tiago'));

  const now = new Date().toISOString();
  await db.execute({
    sql: `INSERT INTO users (id, email, name, picture, provider, profile_json, is_admin, created_at, updated_at)
          VALUES (?, ?, ?, '', 'google', '{}', 0, ?, ?)`,
    args: [TEST_USER_ID, TEST_USER_ID + '@test.local', 'Teste Email', now, now]
  });

  try {
    const queued = await enqueueEmail(store, {
      template: 'welcome',
      to: TEST_USER_ID + '@test.local',
      toName: 'Teste',
      vars: { name: 'Teste' },
      idempotencyKey: 'welcome:' + TEST_USER_ID
    });
    assert('enfileirar welcome', queued.ok && queued.queued);

    const dup = await enqueueEmail(store, {
      template: 'welcome',
      to: TEST_USER_ID + '@test.local',
      toName: 'Teste',
      vars: { name: 'Teste' },
      idempotencyKey: 'welcome:' + TEST_USER_ID
    });
    assert('idempotência', dup.duplicate === true);

    const stats = await store.getEmailQueueStats();
    assert('stats pending', stats.pending >= 1);

    if (getSmtpCredentials().configured) {
      const processed = await processEmailQueue(store, { limit: 5, delayMs: 0 });
      assert('processar fila', processed.ok && processed.sent >= 1);
    } else {
      const skipped = await processEmailQueue(store, { limit: 5 });
      assert('sem SMTP bloqueia envio', skipped.error === 'smtp_not_configured');
    }

    const welcomeResult = await sendWelcomeEmail(store, {
      id: TEST_USER_ID,
      email: TEST_USER_ID + '@test.local',
      name: 'Teste Email'
    });
    assert('sendWelcomeEmail', welcomeResult.ok || welcomeResult.duplicate);
  } finally {
    await db.execute({ sql: 'DELETE FROM email_outbox WHERE payload_json LIKE ?', args: ['%' + TEST_USER_ID + '%'] });
    await db.execute({ sql: 'DELETE FROM email_outbox WHERE idempotency_key LIKE ?', args: ['%:' + TEST_USER_ID] });
    await db.execute({ sql: 'DELETE FROM users WHERE id = ?', args: [TEST_USER_ID] });
  }

  console.log('\n' + passed + ' passaram, ' + failed + ' falharam.');
  process.exit(failed ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
