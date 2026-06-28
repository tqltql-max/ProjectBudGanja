'use strict';

function parseJson(val, fallback) {
  try {
    return JSON.parse(val || '');
  } catch (e) {
    return fallback;
  }
}

async function countCultivoGrows(db, userId) {
  const result = await db.execute({
    sql: 'SELECT COUNT(*) AS c FROM cultivo_grows WHERE user_id = ?',
    args: [userId]
  });
  return Number(result.rows[0] && result.rows[0].c) || 0;
}

async function loadCultivoSettings(db, userId) {
  const result = await db.execute({
    sql: `SELECT phase, phase_started_at, active_grow_id, custom_guide, guide_week_notes, updated_at
          FROM cultivo_settings WHERE user_id = ?`,
    args: [userId]
  });
  const row = result.rows[0];
  if (!row) return null;
  return {
    phase: row.phase || '',
    phaseStartedAt: row.phase_started_at || null,
    activeGrowLogId: row.active_grow_id || '',
    customGuide: row.custom_guide || '',
    guideWeekNotes: parseJson(row.guide_week_notes, {}),
    updatedAt: row.updated_at || null
  };
}

async function loadCultivoGrows(db, userId) {
  const growsResult = await db.execute({
    sql: `SELECT id, name, planted_at, phase, plant_count, species, environment, substrate, custom_guide, guide_week_notes, created_at, updated_at
          FROM cultivo_grows WHERE user_id = ? ORDER BY created_at ASC`,
    args: [userId]
  });
  const entriesResult = await db.execute({
    sql: `SELECT id, grow_id, entry_date, text, source, action_type, metrics_json, photos_json, created_at
          FROM cultivo_entries WHERE user_id = ? ORDER BY entry_date DESC, created_at DESC`,
    args: [userId]
  });
  const entriesByGrow = {};
  for (const row of entriesResult.rows) {
    const growId = row.grow_id;
    if (!entriesByGrow[growId]) entriesByGrow[growId] = [];
    entriesByGrow[growId].push({
      id: row.id,
      date: row.entry_date,
      text: row.text || '',
      source: row.source || 'manual',
      actionType: row.action_type || 'obs',
      metrics: parseJson(row.metrics_json, {}),
      photos: parseJson(row.photos_json, []),
      createdAt: row.created_at
    });
  }
  return growsResult.rows.map((row) => ({
    id: row.id,
    name: row.name || '',
    plantedAt: row.planted_at || null,
    phase: row.phase || 'germinacao',
    plantCount: row.plant_count != null ? row.plant_count : 1,
    species: row.species || '',
    environment: row.environment || '',
    substrate: row.substrate || '',
    customGuide: row.custom_guide || '',
    guideWeekNotes: parseJson(row.guide_week_notes, {}),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    entries: entriesByGrow[row.id] || []
  }));
}

function migrateGlobalGuideToGrows(state) {
  if (!state || !Array.isArray(state.growLogs) || !state.growLogs.length) return;
  const globalGuide = String(state.customGuide || '').trim();
  const globalNotes = state.guideWeekNotes && typeof state.guideWeekNotes === 'object'
    ? state.guideWeekNotes
    : {};
  const hasGlobal = globalGuide || Object.keys(globalNotes).length > 0;
  if (!hasGlobal) return;
  const targetId = state.activeGrowLogId || state.growLogs[0].id;
  const target = state.growLogs.find((g) => g.id === targetId) || state.growLogs[0];
  if (!target) return;
  if (!String(target.customGuide || '').trim() && globalGuide) {
    target.customGuide = globalGuide;
  }
  if (!target.guideWeekNotes || !Object.keys(target.guideWeekNotes).length) {
    target.guideWeekNotes = Object.assign({}, globalNotes);
  }
  state.customGuide = '';
  state.guideWeekNotes = {};
}

async function loadCultivoPlanTasks(db, userId) {
  const result = await db.execute({
    sql: `SELECT id, label, done, tool_href, sort_order, due_at, action_type, grow_id, created_at
          FROM cultivo_plan_tasks WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC`,
    args: [userId]
  });
  return result.rows.map((row) => ({
    id: row.id,
    label: row.label || '',
    done: !!row.done,
    toolHref: row.tool_href || '',
    dueAt: row.due_at || '',
    actionType: row.action_type || '',
    growId: row.grow_id || ''
  }));
}

async function loadCultivoState(db, userId) {
  const [settings, growLogs, planTasks] = await Promise.all([
    loadCultivoSettings(db, userId),
    loadCultivoGrows(db, userId),
    loadCultivoPlanTasks(db, userId)
  ]);
  const state = {
    phase: settings && settings.phase ? settings.phase : '',
    phaseStartedAt: settings ? settings.phaseStartedAt : null,
    activeGrowLogId: settings ? settings.activeGrowLogId : '',
    customGuide: settings ? settings.customGuide : '',
    guideWeekNotes: settings ? settings.guideWeekNotes : {},
    growLogs,
    planTasks,
    updatedAt: settings ? settings.updatedAt : null
  };
  migrateGlobalGuideToGrows(state);
  return state;
}

async function saveCultivoState(db, userId, state) {
  const now = new Date().toISOString();
  migrateGlobalGuideToGrows(state);
  await db.execute({
    sql: `INSERT INTO cultivo_settings (user_id, phase, phase_started_at, active_grow_id, custom_guide, guide_week_notes, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET
            phase = excluded.phase,
            phase_started_at = excluded.phase_started_at,
            active_grow_id = excluded.active_grow_id,
            custom_guide = excluded.custom_guide,
            guide_week_notes = excluded.guide_week_notes,
            updated_at = excluded.updated_at`,
    args: [
      userId,
      state.phase || '',
      state.phaseStartedAt || null,
      state.activeGrowLogId || '',
      '',
      '{}',
      now
    ]
  });

  await db.execute({ sql: 'DELETE FROM cultivo_entries WHERE user_id = ?', args: [userId] });
  await db.execute({ sql: 'DELETE FROM cultivo_grows WHERE user_id = ?', args: [userId] });
  await db.execute({ sql: 'DELETE FROM cultivo_plan_tasks WHERE user_id = ?', args: [userId] });

  const growLogs = Array.isArray(state.growLogs) ? state.growLogs : [];
  for (const grow of growLogs) {
    if (!grow || !grow.id) continue;
    await db.execute({
      sql: `INSERT INTO cultivo_grows (id, user_id, name, planted_at, phase, plant_count, species, environment, substrate, custom_guide, guide_week_notes, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        grow.id,
        userId,
        grow.name || '',
        grow.plantedAt || null,
        grow.phase || 'germinacao',
        Math.max(1, Math.min(99, parseInt(grow.plantCount, 10) || 1)),
        String(grow.species || '').slice(0, 120),
        String(grow.environment || '').slice(0, 40),
        String(grow.substrate || '').slice(0, 80),
        String(grow.customGuide || '').slice(0, 8000),
        JSON.stringify(grow.guideWeekNotes && typeof grow.guideWeekNotes === 'object' ? grow.guideWeekNotes : {}),
        grow.createdAt || now,
        grow.updatedAt || now
      ]
    });
    const entries = Array.isArray(grow.entries) ? grow.entries : [];
    for (const entry of entries) {
      if (!entry || !entry.id) continue;
      await db.execute({
        sql: `INSERT INTO cultivo_entries (id, grow_id, user_id, entry_date, text, source, action_type, metrics_json, photos_json, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          entry.id,
          grow.id,
          userId,
          entry.date || now.slice(0, 10),
          entry.text || '',
          entry.source || 'manual',
          entry.actionType || 'obs',
          JSON.stringify(entry.metrics || {}),
          JSON.stringify(Array.isArray(entry.photos) ? entry.photos : []),
          entry.createdAt || now
        ]
      });
    }
  }

  const planTasks = Array.isArray(state.planTasks) ? state.planTasks : [];
  for (let index = 0; index < planTasks.length; index++) {
    const task = planTasks[index];
    if (!task || !task.id) continue;
    await db.execute({
      sql: `INSERT INTO cultivo_plan_tasks (id, user_id, label, done, tool_href, sort_order, due_at, action_type, grow_id, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        task.id,
        userId,
        task.label || '',
        task.done ? 1 : 0,
        task.toolHref || '',
        index,
        task.dueAt || null,
        task.actionType || '',
        task.growId || '',
        now
      ]
    });
  }

  return Object.assign({}, state, { updatedAt: now });
}

module.exports = {
  countCultivoGrows,
  loadCultivoState,
  saveCultivoState
};
