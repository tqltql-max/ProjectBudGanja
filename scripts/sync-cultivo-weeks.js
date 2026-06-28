'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { PHASE_WEEK_GUIDES } = require('../lib/cultivo-phase-weeks.js');

const outPath = path.join(ROOT, 'js', 'cultivo-phase-weeks-data.js');
const body = [
  '// Gerado por scripts/sync-cultivo-weeks.js — não editar manualmente',
  'window.__CULTIVO_PHASE_WEEKS__ = ' + JSON.stringify(PHASE_WEEK_GUIDES, null, 2) + ';',
  ''
].join('\n');

fs.writeFileSync(outPath, body, 'utf8');
console.log('Cultivo weeks synced → js/cultivo-phase-weeks-data.js');
