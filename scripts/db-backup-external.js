'use strict';

/**
 * Cópia da base SQLite para fora do repositório (backup de segurança local).
 * Destino padrão: %USERPROFILE%/BudGanjaBackups/ (Windows) ou ~/BudGanjaBackups/
 *
 * Uso: node scripts/db-backup-external.js
 *      npm run db:backup:external
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
require('../lib/load-env.js');
const { ROOT } = require('../lib/paths.js');

const dbPath = path.join(ROOT, 'data', 'budganja.db');
const externalRoot = process.env.BUDGANJA_BACKUP_DIR
  || path.join(os.homedir(), 'BudGanjaBackups');

if (!fs.existsSync(dbPath)) {
  console.error('Base de dados não encontrada:', dbPath);
  console.error('Execute primeiro: npm run db:migrate');
  process.exit(1);
}

if (!fs.existsSync(externalRoot)) {
  fs.mkdirSync(externalRoot, { recursive: true });
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const dest = path.join(externalRoot, 'budganja-' + stamp + '.db');
fs.copyFileSync(dbPath, dest);
console.log('Backup externo criado:', dest);
