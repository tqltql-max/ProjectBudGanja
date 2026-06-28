'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
require('../lib/load-env.js');
const { ROOT } = require('../lib/paths.js');

const dbPath = path.join(ROOT, 'data', 'budganja.db');
const externalRoot = process.env.BUDGANJA_BACKUP_DIR
  || path.join(os.homedir(), 'BudGanjaBackups');
const minHours = Number(process.env.BUDGANJA_BACKUP_MIN_HOURS || 20);
const stampFile = path.join(externalRoot, '.last-backup-stamp.json');

if (!fs.existsSync(dbPath)) {
  console.error('Base não encontrada:', dbPath);
  process.exit(1);
}

function shouldRun() {
  if (!fs.existsSync(stampFile)) return true;
  try {
    const prev = JSON.parse(fs.readFileSync(stampFile, 'utf8'));
    const dbStat = fs.statSync(dbPath);
    if (prev.mtimeMs !== dbStat.mtimeMs) return true;
    const ageH = (Date.now() - (prev.at || 0)) / 3600000;
    return ageH >= minHours;
  } catch (e) {
    return true;
  }
}

if (!shouldRun()) {
  console.log('db:backup:schedule — sem alterações recentes, ignorado.');
  process.exit(0);
}

execSync('node scripts/db-backup-external.js', { cwd: ROOT, stdio: 'inherit' });

try {
  if (!fs.existsSync(externalRoot)) fs.mkdirSync(externalRoot, { recursive: true });
  fs.writeFileSync(
    stampFile,
    JSON.stringify({ at: Date.now(), mtimeMs: fs.statSync(dbPath).mtimeMs }, null, 2),
    'utf8'
  );
} catch (e) { /* ignore */ }
