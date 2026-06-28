'use strict';

/**
 * Verificação completa antes de publicar: testes + build.
 * Uso: npm run verify
 */

const { execSync } = require('child_process');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

function run(label, cmd) {
  console.log('\n→ ' + label);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

try {
  run('test:lib', 'node scripts/test-lib-unit.js');
  run('test:db', 'node scripts/test-db-persistence.js');
  run('test:cultivo', 'node scripts/test-cultivo-persistence.js');
  run('test:cultivo-submissions', 'node scripts/test-cultivo-submissions.js');
  run('test:users-admin', 'node scripts/test-users-admin.js');
  run('build', 'node scripts/build.js');
  console.log('\nverify: OK — testes e build concluídos.');
} catch (e) {
  console.error('\nverify: FALHOU');
  process.exit(1);
}
