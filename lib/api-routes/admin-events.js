'use strict';

const { getAdminSession } = require('../admin-access.js');
const eventBus = require('../admin-event-bus.js');
const { mergeGuiaInspecoesPosts } = require('../merge-guia-inspecoes.js');

async function match(ctx) {
  const { url, method, store, cookie, res: rawRes } = ctx;

  if (url !== '/api/admin/stream' || method !== 'GET') return null;

  const session = await getAdminSession(store, cookie);
  if (!session) return { status: 401, headers: { 'Content-Type': 'application/json' }, body: '{"error":"authentication required"}' };

  // SSE — resposta é tratada directamente no objecto res nativo
  const res = rawRes;
  if (!res) return null;

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'
  });
  res.write(': connected\n\n');

  // Enviar stats iniciais
  try {
    const posts = mergeGuiaInspecoesPosts(await store.getPosts());
    const total = posts.length;
    const published = posts.filter((p) => p.published !== false).length;
    const drafts = total - published;
    const byCategory = {};
    posts.forEach((p) => { const c = p.category || 'pesquisa'; byCategory[c] = (byCategory[c] || 0) + 1; });
    res.write('event: stats\ndata: ' + JSON.stringify({ total, published, drafts, byCategory }) + '\n\n');
  } catch (e) { /* ignorar */ }

  eventBus.subscribe(res);

  // Heartbeat a cada 25s para manter a ligação
  const hb = setInterval(() => {
    try { res.write(': heartbeat\n\n'); } catch (e) { clearInterval(hb); }
  }, 25000);

  res.on('close', () => clearInterval(hb));

  // Retornar null indica que a resposta já foi enviada directamente
  return null;
}

module.exports = { match };
