'use strict';

/**
 * Enriquece a pesquisa "tomate" existente para testes do hub de cartões.
 * Uso: node scripts/seed-cultivo-tomate-demo.js
 */

require('../lib/load-env.js');
const { ROOT } = require('../lib/paths.js');
const { initDatabaseOnce, getDbClient } = require('../lib/db/client.js');
const { loadCultivoState, saveCultivoState } = require('../lib/db/cultivo-repos.js');

async function run() {
  await initDatabaseOnce(ROOT);
  const db = getDbClient(ROOT);

  const match = await db.execute({
    sql: `SELECT user_id, id FROM cultivo_grows
          WHERE LOWER(name) LIKE '%tomate%' OR LOWER(species) LIKE '%tomate%'
          ORDER BY updated_at DESC LIMIT 1`
  });
  const row = match.rows[0];
  if (!row) {
    console.log('Nenhuma pesquisa de tomate encontrada — nada a fazer.');
    return;
  }

  const userId = row.user_id;
  const growId = row.id;
  const state = await loadCultivoState(db, userId);
  const log = (state.growLogs || []).find((g) => g.id === growId);
  if (!log) {
    console.log('Grow tomate não encontrado no estado do utilizador.');
    return;
  }

  const planted = new Date();
  planted.setDate(planted.getDate() - 12);
  const plantedIso = planted.toISOString();
  const now = new Date().toISOString();

  log.name = 'Tomate hidropónico';
  log.species = 'Solanum lycopersicum';
  log.phase = 'germinacao';
  log.plantCount = 3;
  log.environment = 'indoor';
  log.substrate = 'hidroponia';
  log.plantedAt = plantedIso;
  log.updatedAt = now;
  log.entries = [
    {
      id: 'e-demo-1',
      date: plantedIso.slice(0, 10),
      text: 'Sementes colocadas em cubos de lã de rocha — ambiente estável.',
      source: 'manual',
      actionType: 'obs',
      metrics: { temp: 24, rh: 68 },
      photos: [],
      createdAt: plantedIso
    },
    {
      id: 'e-demo-2',
      date: new Date(planted.getTime() + 5 * 86400000).toISOString().slice(0, 10),
      text: 'Primeira radícula visível — luz fraca ligada 18 h.',
      source: 'manual',
      actionType: 'obs',
      metrics: {},
      photos: [],
      createdAt: now
    },
    {
      id: 'e-demo-3',
      date: new Date().toISOString().slice(0, 10),
      text: 'Rega com pH 6,0 — folhas cotiledonares abertas.',
      source: 'manual',
      actionType: 'rega',
      metrics: { ph: 6.0, ec: 0.8, temp: 25, rh: 65 },
      photos: [],
      createdAt: now
    }
  ];

  state.activeGrowLogId = growId;
  state.phase = log.phase;
  state.phaseStartedAt = plantedIso;

  const hasPlan = (state.planTasks || []).some((t) => t.growId === growId);
  if (!hasPlan) {
    state.planTasks = (state.planTasks || []).concat([
      {
        id: 't-demo-1',
        label: 'Medir VPD na germinação',
        done: false,
        toolHref: '/calculadoras/cultivo-lab.html?mode=vpd',
        dueAt: new Date().toISOString().slice(0, 10),
        actionType: 'obs',
        growId: growId
      },
      {
        id: 't-demo-2',
        label: 'Preparar vasos de destino',
        done: true,
        toolHref: '',
        dueAt: '',
        actionType: '',
        growId: growId
      }
    ]);
  }

  await saveCultivoState(db, userId, state);
  console.log('Pesquisa demo actualizada:', log.name, '(' + growId + ')');
  console.log('  · 3 registos no diário, 3 plantas, germinação dia 12');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
