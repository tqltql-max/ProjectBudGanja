'use strict';

const { jsonResponse } = require('./_helpers.js');
const { getAdminSession } = require('../admin-access.js');
const { initDatabaseOnce } = require('../db/client.js');
const { ROOT } = require('../paths.js');

// Tabelas expostas no painel — tabelas sensíveis (users, sessions, oauth, migrations) ficam fora
const ALLOWED_TABLES = new Set([
  'post_series',
  'calculators',
  'nav_sections',
  'nav_groups',
  'nav_items',
  'footer_links',
  'footer_groups',
  'footer_group_links',
  'guia_chapters',
  'guia_videos',
  'sorteio_prizes',
  'sorteio_entries',
  'loja_orders'
]);

// Colunas que renderizam como checkbox (INTEGER 0/1)
const BOOL_COLS = new Set([
  'published', 'active', 'done', 'featured', 'mega', 'mega_compact', 'is_admin'
]);

// Colunas que renderizam como textarea longa
const TEXTAREA_COLS = new Set([
  'content_raw', 'content_md', 'body', 'scripts', 'head_extra',
  'custom_guide', 'guide_week_notes', 'profile_json', 'metrics_json'
]);

function isAllowed(table) {
  return ALLOWED_TABLES.has(String(table || ''));
}

async function getSchema(db, table) {
  const r = await db.execute(`PRAGMA table_info('${table}')`);
  return r.rows.map((row) => ({
    name: row.name,
    type: String(row.type || 'TEXT').toUpperCase(),
    notnull: !!row.notnull,
    dflt: row.dflt_value,
    pk: Number(row.pk) > 0,
    bool: BOOL_COLS.has(row.name),
    textarea: TEXTAREA_COLS.has(row.name) || String(row.name).endsWith('_json')
  }));
}

async function match(ctx) {
  const { url, method, cookie, bodyRaw, root } = ctx;
  if (!url.startsWith('/api/admin/tables')) return null;

  const session = await getAdminSession(ctx.store, cookie);
  if (!session) return jsonResponse(401, { error: 'authentication required' });

  const db = await initDatabaseOnce(root || ROOT);

  // GET /api/admin/tables — lista tabelas com contagens e schema resumido
  if (url === '/api/admin/tables' && method === 'GET') {
    const list = [];
    for (const table of ALLOWED_TABLES) {
      try {
        const cnt = await db.execute(`SELECT COUNT(*) AS c FROM ${table}`);
        const schema = await getSchema(db, table);
        const pk = schema.find((c) => c.pk) || schema[0];
        list.push({ name: table, count: Number(cnt.rows[0].c) || 0, pk: pk ? pk.name : 'id' });
      } catch (e) {
        list.push({ name: table, count: 0, pk: 'id', error: e.message });
      }
    }
    list.sort((a, b) => a.name.localeCompare(b.name));
    return jsonResponse(200, list);
  }

  // GET /api/admin/tables/:table — schema + rows paginados
  const listMatch = url.match(/^\/api\/admin\/tables\/([^/]+)(\?.*)?$/);
  if (listMatch && method === 'GET') {
    const table = decodeURIComponent(listMatch[1]);
    if (!isAllowed(table)) return jsonResponse(403, { error: 'table not allowed' });
    const qs = ctx.req.query || '';
    const params = new URLSearchParams(qs);
    const limit = Math.min(Number(params.get('limit') || 50), 200);
    const offset = Number(params.get('offset') || 0);
    try {
      const schema = await getSchema(db, table);
      const total = await db.execute(`SELECT COUNT(*) AS c FROM ${table}`);
      const rows = await db.execute(`SELECT * FROM ${table} LIMIT ${limit} OFFSET ${offset}`);
      return jsonResponse(200, {
        schema,
        rows: rows.rows,
        total: Number(total.rows[0].c) || 0,
        limit,
        offset
      });
    } catch (e) {
      return jsonResponse(500, { error: e.message });
    }
  }

  // POST /api/admin/tables/:table — criar registo
  const createMatch = url.match(/^\/api\/admin\/tables\/([^/]+)$/);
  if (createMatch && method === 'POST') {
    const table = decodeURIComponent(createMatch[1]);
    if (!isAllowed(table)) return jsonResponse(403, { error: 'table not allowed' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const schema = await getSchema(db, table);

      // Filtrar colunas: excluir PKs auto (INTEGER pk sem valor fornecido)
      const cols = schema.filter((c) => {
        if (c.pk && c.type === 'INTEGER' && payload[c.name] == null) return false;
        return payload[c.name] != null;
      });

      if (!cols.length) return jsonResponse(400, { error: 'no fields provided' });

      const colNames = cols.map((c) => c.name).join(', ');
      const placeholders = cols.map(() => '?').join(', ');
      const args = cols.map((c) => {
        const v = payload[c.name];
        if (c.bool) return v ? 1 : 0;
        if (c.type === 'INTEGER') return v === '' ? null : Number(v);
        return v == null ? null : String(v);
      });

      await db.execute({ sql: `INSERT INTO ${table} (${colNames}) VALUES (${placeholders})`, args });
      return jsonResponse(201, { ok: true });
    } catch (e) {
      return jsonResponse(500, { error: e.message });
    }
  }

  // PUT /api/admin/tables/:table/:pk — actualizar registo
  const putMatch = url.match(/^\/api\/admin\/tables\/([^/]+)\/([^/]+)$/);
  if (putMatch && method === 'PUT') {
    const table = decodeURIComponent(putMatch[1]);
    const pkVal = decodeURIComponent(putMatch[2]);
    if (!isAllowed(table)) return jsonResponse(403, { error: 'table not allowed' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const schema = await getSchema(db, table);
      const pkCol = schema.find((c) => c.pk) || schema[0];

      const cols = schema.filter((c) => !c.pk && payload[c.name] !== undefined);
      if (!cols.length) return jsonResponse(400, { error: 'no fields to update' });

      const sets = cols.map((c) => `${c.name} = ?`).join(', ');
      const args = cols.map((c) => {
        const v = payload[c.name];
        if (c.bool) return v ? 1 : 0;
        if (c.type === 'INTEGER') return v === '' ? null : Number(v);
        return v == null ? null : String(v);
      });
      args.push(pkVal);

      await db.execute({ sql: `UPDATE ${table} SET ${sets} WHERE ${pkCol.name} = ?`, args });
      return jsonResponse(200, { ok: true });
    } catch (e) {
      return jsonResponse(500, { error: e.message });
    }
  }

  // DELETE /api/admin/tables/:table/:pk — remover registo
  const delMatch = url.match(/^\/api\/admin\/tables\/([^/]+)\/([^/]+)$/);
  if (delMatch && method === 'DELETE') {
    const table = decodeURIComponent(delMatch[1]);
    const pkVal = decodeURIComponent(delMatch[2]);
    if (!isAllowed(table)) return jsonResponse(403, { error: 'table not allowed' });
    try {
      const schema = await getSchema(db, table);
      const pkCol = schema.find((c) => c.pk) || schema[0];
      await db.execute({ sql: `DELETE FROM ${table} WHERE ${pkCol.name} = ?`, args: [pkVal] });
      return jsonResponse(200, { ok: true });
    } catch (e) {
      return jsonResponse(500, { error: e.message });
    }
  }

  return null;
}

module.exports = { match, ALLOWED_TABLES };
