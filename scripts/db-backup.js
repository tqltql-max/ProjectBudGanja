'use strict';

const fs = require('fs');
const path = require('path');
require('../lib/load-env.js');
const { ROOT } = require('../lib/paths.js');

const dbPath = path.join(ROOT, 'data', 'budganja.db');
const backupDir = path.join(ROOT, 'data', 'backups');

if (!fs.existsSync(dbPath)) {
  console.error('Base de dados não encontrada:', dbPath);
  console.error('Execute primeiro: npm run db:migrate');
  process.exit(1);
}

if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const dest = path.join(backupDir, 'budganja-' + stamp + '.db');
fs.copyFileSync(dbPath, dest);
console.log('Backup criado:', dest);
