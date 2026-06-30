'use strict';

require('../lib/load-env.js');
const { ROOT } = require('../lib/paths.js');
const { createAppStore } = require('../lib/create-store.js');
const { processEmailQueue, getSmtpCredentials } = require('../lib/email-service.js');

(async () => {
  const limit = Number(process.argv[2]) || 25;
  if (!getSmtpCredentials().configured) {
    console.error('SMTP não configurado. Defina GMAIL_USER e GMAIL_APP_PASSWORD no .env');
    process.exit(1);
  }
  const store = await createAppStore({ root: ROOT, netlify: false });
  const result = await processEmailQueue(store, { limit, delayMs: 350 });
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
