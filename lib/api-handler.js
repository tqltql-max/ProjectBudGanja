const fs = require('fs');
const path = require('path');
const { mergeGuiaInspecoesPosts } = require('./merge-guia-inspecoes.js');
const {
  normalizePosts,
  getPublicPosts,
  toPublicFeedItem,
  buildPostHtml
} = require('./posts-service.js');
const {
  getSession,
  createSession,
  destroySession,
  setSessionCookie,
  clearSessionCookie,
  checkCredentials
} = require('./auth-service.js');
const { getAdminSession, getAdminAccess } = require('./admin-access.js');
const {
  readSiteFromStore,
  listPagesMeta,
  getPage,
  updatePage,
  writeSite,
  renderManagedPage,
  injectPlaceholder,
  buildHtmlFromPage,
  PAGE_REGISTRY
} = require('./content-service.js');
const { buildPostsCardsHtml } = require('./posts-service.js');
const { listSorteios, createSorteioEntry, deleteSorteioEntry } = require('./sorteios-service.js');
const {
  listAlertSubscribers,
  getAlertStatus,
  subscribeToSorteioAlerts,
  unsubscribeFromSorteioAlerts,
  broadcastSorteioAlerts
} = require('./sorteio-alerts-service.js');
const { listLojaOrders, createLojaOrder } = require('./loja-orders-service.js');
const { readSorteioConfigFromStore, writeSorteioConfigToStore } = require('./sorteio-config.js');
const { readGuiaCultivoFromStore, updateGuiaVideo } = require('./guia-cultivo-service.js');
const {
  getClientKey,
  isLoginRateLimited,
  recordLoginFailure,
  clearLoginAttempts
} = require('./login-rate-limit.js');
const { createRateLimiter } = require('./rate-limit.js');
const { getGoogleClientId, getGoogleClientSecret, getGoogleOAuthOrigins, getGoogleRedirectUri } = require('./utils.js');
const {
  createUserSession,
  destroyUserSession,
  getUserSession,
  setUserSessionCookie,
  clearUserSessionCookie,
  verifyGoogleIdToken,
  exchangeGoogleAuthCode,
  createOAuthState,
  setOAuthStateCookie,
  clearOAuthStateCookie,
  readOAuthState,
  buildGoogleAuthUrl,
  upsertGoogleUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  publicUserView
} = require('./user-auth-service.js');
const { getCultivoForUser, updateCultivoForUser, publicCultivoView } = require('./cultivo-user-service.js');
const { saveOAuthState, consumeOAuthState, safeReturnPath } = require('./oauth-state-service.js');

const sorteioLimiter = createRateLimiter({ prefix: 'sorteio', windowMs: 15 * 60 * 1000, maxAttempts: 6 });
const sorteioAlertLimiter = createRateLimiter({ prefix: 'sorteio-alert', windowMs: 60 * 60 * 1000, maxAttempts: 10 });
const sorteioBroadcastLimiter = createRateLimiter({ prefix: 'sorteio-broadcast', windowMs: 60 * 60 * 1000, maxAttempts: 5 });
const lojaOrderLimiter = createRateLimiter({ prefix: 'loja-order', windowMs: 15 * 60 * 1000, maxAttempts: 5 });

const ALLOWED_UPLOAD_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);

const MAX_BODY_BYTES = 2 * 1024 * 1024;
const MAX_UPLOAD_BYTES = 6 * 1024 * 1024;

async function triggerRebuild() {
  const hook = process.env.NETLIFY_BUILD_HOOK || process.env.BUILD_HOOK_URL;
  if (!hook) return;
  try {
    await fetch(hook, { method: 'POST' });
  } catch (e) { /* ignore */ }
}

function jsonResponse(status, obj, extraHeaders) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, extraHeaders || {});
  const setCookies = [];
  if (headers['Set-Cookie']) {
    setCookies.push(headers['Set-Cookie']);
    delete headers['Set-Cookie'];
  }
  return {
    status,
    headers,
    setCookies,
    body: JSON.stringify(obj)
  };
}

function redirectResponse(status, location, extraHeaders, setCookies) {
  return {
    status,
    headers: Object.assign({ Location: location }, extraHeaders || {}),
    setCookies: setCookies || [],
    body: ''
  };
}

function parseBody(raw, isBase64) {
  if (!raw) return '';
  if (isBase64) return Buffer.from(raw, 'base64').toString('utf8');
  return raw;
}

async function exportStaticFiles(root, store, options) {
  if (!root) return;
  const skipPages = options && options.skipPages;
  const posts = mergeGuiaInspecoesPosts(await store.getPosts());
  await store.setPosts(posts);

  const feed = getPublicPosts(posts).map(toPublicFeedItem);
  fs.writeFileSync(path.join(root, 'posts-public.json'), JSON.stringify(feed, null, 2), 'utf8');

  for (const post of posts) {
    if (post.published === false) continue;
    fs.writeFileSync(path.join(root, post.filename), buildPostHtml(post), 'utf8');
  }

  const pages = await store.getPages();
  if (pages && !skipPages) {
    for (const entry of PAGE_REGISTRY) {
      const page = pages[entry.file];
      if (!page) continue;
      let body = page.body || '';
      if (entry.file === 'biblioteca/pesquisas/index.html') {
        body = injectPlaceholder(body, '<!-- POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'pesquisa'));
      } else if (entry.file === 'equipamentos/index.html') {
        body = injectPlaceholder(body, '<!-- EQUIPMENT_POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'equipamento'));
      } else if (entry.file === 'biblioteca/inspecoes/index.html') {
        body = injectPlaceholder(body, '<!-- INSPECTION_POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'inspecao'));
      }
      page.body = body;
      fs.writeFileSync(path.join(root, entry.file), buildHtmlFromPage(page), 'utf8');
    }
    fs.writeFileSync(path.join(root, 'content', 'pages.json'), JSON.stringify(pages, null, 2), 'utf8');
  }

  const site = await store.getSite();
  if (site) {
    fs.writeFileSync(path.join(root, 'content', 'site.json'), JSON.stringify(site, null, 2), 'utf8');
  }
}

async function handleApiRequest(req, options) {
  const store = options.store;
  const root = options.root || null;
  const fsFallback = options.fsFallback || root;
  const method = (req.method || 'GET').toUpperCase();
  const url = req.path || '/';
  const headers = req.headers || {};
  const cookie = headers.cookie || headers.Cookie || '';

  let bodyRaw = '';
  try {
    bodyRaw = parseBody(req.body, req.isBase64Encoded);
    const maxBody = url === '/api/upload' ? MAX_UPLOAD_BYTES : MAX_BODY_BYTES;
    if (bodyRaw.length > maxBody) {
      return jsonResponse(413, { error: url === '/api/upload' ? 'imagem muito grande (máx. ~4 MB)' : 'body too large' });
    }
  } catch (e) {
    return jsonResponse(400, { error: 'invalid body' });
  }

  const routeCtx = {
    req,
    url,
    method,
    store,
    cookie,
    bodyRaw,
    headers,
    root,
    fsFallback,
    exportStaticFiles,
    triggerRebuild
  };
  const routeModules = [
    require('./api-routes/posts.js')
  ];
  for (const mod of routeModules) {
    const routed = await mod.match(routeCtx);
    if (routed) return routed;
  }

  if (url === '/api/login' && method === 'POST') {
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const username = String(payload.username || '').trim();
      const password = String(payload.password || '');
      const clientKey = getClientKey(req, headers);
      if (isLoginRateLimited(clientKey)) {
        return jsonResponse(429, { error: 'Muitas tentativas. Aguarde cerca de 15 minutos.' });
      }
      if (checkCredentials(username, password)) {
        clearLoginAttempts(clientKey);
        const token = await createSession(store, username);
        return jsonResponse(200, { ok: true, username }, {
          'Set-Cookie': setSessionCookie(headers, token)
        });
      }
      recordLoginFailure(clientKey);
      return jsonResponse(401, { error: 'Credenciais inválidas' });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  if (url === '/api/logout' && method === 'POST') {
    const adminAccess = await getAdminAccess(store, cookie);
    const setCookies = [clearSessionCookie(headers)];
    if (adminAccess && adminAccess.via === 'password') {
      await destroySession(store, adminAccess.token);
    } else {
      const session = await getSession(store, cookie);
      if (session) await destroySession(store, session.token);
    }
    if (adminAccess && adminAccess.via === 'google') {
      await destroyUserSession(store, adminAccess.token);
      setCookies.push(clearUserSessionCookie(headers));
    }
    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      setCookies: setCookies,
      body: JSON.stringify({ ok: true })
    };
  }

  if (url === '/api/me' && method === 'GET') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { authenticated: false });
    return jsonResponse(200, { authenticated: true, username: session.username, via: session.via || 'password' });
  }

  if (url === '/api/auth/config' && method === 'GET') {
    const googleClientId = getGoogleClientId();
    const redirectUri = getGoogleRedirectUri(headers);
    return jsonResponse(200, {
      googleEnabled: !!googleClientId,
      googleClientId: googleClientId || null,
      googleRedirectEnabled: !!(googleClientId && getGoogleClientSecret()),
      redirectUri,
      requiredOrigins: getGoogleOAuthOrigins(),
      requiredRedirectUris: [redirectUri]
    });
  }

  if (url === '/api/auth/google/start' && method === 'GET') {
    const clientId = getGoogleClientId();
    const clientSecret = getGoogleClientSecret();
    if (!clientId || !clientSecret) {
      return redirectResponse(302, '/entrar.html?error=redirect_not_configured');
    }
    const redirectUri = getGoogleRedirectUri(headers);
    const state = createOAuthState();
    const queryParams = new URLSearchParams(req.query || '');
    const returnTo = safeReturnPath(queryParams.get('returnTo'));
    await saveOAuthState(store, state, { returnTo });
    const authUrl = buildGoogleAuthUrl(clientId, redirectUri, state);
    return redirectResponse(302, authUrl, {}, [setOAuthStateCookie(headers, state)]);
  }

  if (url === '/api/auth/google/callback' && method === 'GET') {
    const clientId = getGoogleClientId();
    const clientSecret = getGoogleClientSecret();
    const params = new URLSearchParams(req.query || '');
    const error = params.get('error');
    if (error) {
      return redirectResponse(302, '/entrar.html?error=' + encodeURIComponent(error));
    }
    const code = params.get('code');
    const state = params.get('state');
    const savedState = await consumeOAuthState(store, state);
    const cookieState = readOAuthState(cookie);
    const stateOk = !!(state && savedState) || !!(state && cookieState && state === cookieState);
    if (!code || !stateOk) {
      return redirectResponse(302, '/entrar.html?error=invalid_state', {}, [clearOAuthStateCookie(headers)]);
    }
    if (!clientId || !clientSecret) {
      return redirectResponse(302, '/entrar.html?error=redirect_not_configured', {}, [clearOAuthStateCookie(headers)]);
    }
    const redirectUri = getGoogleRedirectUri(headers);
    const googleUser = await exchangeGoogleAuthCode(code, clientId, clientSecret, redirectUri);
    if (!googleUser) {
      return redirectResponse(302, '/entrar.html?error=invalid_client', {}, [clearOAuthStateCookie(headers)]);
    }
    const user = await upsertGoogleUser(store, googleUser);
    const token = await createUserSession(store, user.id);
    const returnTo = savedState ? safeReturnPath(savedState.returnTo) : '/perfil.html';
    return redirectResponse(302, returnTo, {}, [
      clearOAuthStateCookie(headers),
      setUserSessionCookie(headers, token)
    ]);
  }

  if (url === '/api/auth/google' && method === 'POST') {
    const clientId = getGoogleClientId();
    if (!clientId) {
      return jsonResponse(503, { error: 'Login com Google não configurado. Defina GOOGLE_CLIENT_ID no servidor.' });
    }
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const credential = String(payload.credential || '').trim();
      if (!credential) return jsonResponse(400, { error: 'Credencial Google em falta.' });
      const googleUser = await verifyGoogleIdToken(credential, clientId);
      if (!googleUser) return jsonResponse(401, { error: 'Não foi possível validar a conta Google.' });
      const user = await upsertGoogleUser(store, googleUser);
      const token = await createUserSession(store, user.id);
      return jsonResponse(200, { ok: true, user: publicUserView(user) }, {
        'Set-Cookie': setUserSessionCookie(headers, token)
      });
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  if (url === '/api/user/logout' && method === 'POST') {
    const session = await getUserSession(store, cookie);
    await destroyUserSession(store, session && session.token);
    return jsonResponse(200, { ok: true }, { 'Set-Cookie': clearUserSessionCookie(headers) });
  }

  if (url === '/api/user/me' && method === 'GET') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { authenticated: false });
    const user = await getUserById(store, session.userId);
    if (!user) return jsonResponse(401, { authenticated: false });
    return jsonResponse(200, Object.assign({ authenticated: true }, publicUserView(user)));
  }

  if (url === '/api/user/profile' && method === 'PUT') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const user = await updateUserProfile(store, session.userId, payload);
      if (!user) return jsonResponse(404, { error: 'utilizador não encontrado' });
      return jsonResponse(200, { ok: true, user: publicUserView(user) });
    } catch (e) {
      if (e && e.code === 'underage') {
        return jsonResponse(403, { error: 'O site é exclusivo para maiores de 18 anos.' });
      }
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  if (url === '/api/cultivo' && method === 'GET') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const user = await getUserById(store, session.userId);
    if (!user) return jsonResponse(404, { error: 'utilizador não encontrado' });
    const cultivo = await getCultivoForUser(store, session.userId);
    return jsonResponse(200, { ok: true, cultivo: publicCultivoView(cultivo) });
  }

  if (url === '/api/cultivo' && method === 'PUT') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const cultivo = await updateCultivoForUser(store, session.userId, payload);
      const user = await getUserById(store, session.userId);
      return jsonResponse(200, {
        ok: true,
        cultivo: publicCultivoView(cultivo),
        user: user ? publicUserView(user) : null
      });
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  if (url === '/api/cultivo/photo' && method === 'POST') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      let data = String(payload.data || '');
      if (!data) return jsonResponse(400, { error: 'imagem em falta' });
      const m = data.match(/^data:(image\/(?:png|jpeg|jpg|webp));base64,(.+)$/i);
      if (!m) return jsonResponse(400, { error: 'formato de imagem inválido' });
      const mime = m[1].toLowerCase();
      const b64 = m[2];
      const buf = Buffer.from(b64, 'base64');
      if (buf.length > 3 * 1024 * 1024) {
        return jsonResponse(413, { error: 'imagem muito grande (máx. 3 MB)' });
      }
      const extMap = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/jpg': '.jpg', 'image/webp': '.webp' };
      const ext = extMap[mime] || '.jpg';
      const userId = String(session.userId || 'user').replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
      const uniqueName = 'cultivo-' + userId + '-' + Date.now() + ext;
      const publicUrl = await store.saveUpload(uniqueName, buf);
      return jsonResponse(201, { ok: true, url: publicUrl });
    } catch (e) {
      return jsonResponse(400, { error: 'upload inválido' });
    }
  }

  if (url === '/api/user/profile/avatar' && method === 'PUT') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const avatarUrl = payload && payload.avatarUrl != null ? String(payload.avatarUrl) : '';
      const user = await updateUserAvatar(store, session.userId, avatarUrl);
      if (!user) return jsonResponse(404, { error: 'utilizador não encontrado' });
      return jsonResponse(200, { ok: true, user: publicUserView(user) });
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  if (url === '/api/user/avatar' && method === 'POST') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      let data = String(payload.data || '');
      if (!data) return jsonResponse(400, { error: 'imagem em falta' });
      const m = data.match(/^data:(image\/(?:png|jpeg|jpg|webp));base64,(.+)$/i);
      if (!m) return jsonResponse(400, { error: 'formato de imagem inválido' });
      const mime = m[1].toLowerCase();
      const b64 = m[2];
      const buf = Buffer.from(b64, 'base64');
      if (buf.length > 2 * 1024 * 1024) {
        return jsonResponse(413, { error: 'imagem muito grande (máx. 2 MB)' });
      }
      const extMap = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/jpg': '.jpg', 'image/webp': '.webp' };
      const ext = extMap[mime] || '.jpg';
      const userId = String(session.userId || 'user').replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
      const uniqueName = 'avatar-' + userId + '-' + Date.now() + ext;
      const publicUrl = await store.saveUpload(uniqueName, buf);
      const user = await updateUserAvatar(store, session.userId, publicUrl);
      if (!user) return jsonResponse(404, { error: 'utilizador não encontrado' });
      return jsonResponse(201, { ok: true, url: publicUrl, user: publicUserView(user) });
    } catch (e) {
      return jsonResponse(400, { error: 'upload inválido' });
    }
  }

  if (url === '/api/upload' && method === 'POST') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const filename = String(payload.filename || 'image').replace(/[^a-zA-Z0-9\-_.]/g, '_');
      let data = String(payload.data || '');
      if (!data) return jsonResponse(400, { error: 'filename and data required' });
      const m = data.match(/^data:(.+);base64,(.+)$/);
      const b64 = m ? m[2] : data;
      const buf = Buffer.from(b64, 'base64');
      if (buf.length > 5 * 1024 * 1024) return jsonResponse(413, { error: 'file too large' });
      const ext = (path.extname(filename) || '.png').toLowerCase();
      if (!ALLOWED_UPLOAD_EXT.has(ext)) {
        return jsonResponse(400, { error: 'tipo de arquivo não permitido' });
      }
      const base = path.basename(filename, path.extname(filename)).replace(/[^a-zA-Z0-9\-_]/g, '_');
      const uniqueName = base + '-' + Date.now() + ext;
      const publicUrl = await store.saveUpload(uniqueName, buf);
      return jsonResponse(201, { url: publicUrl });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  if (url === '/api/sorteio' && method === 'GET') {
    const config = await readSorteioConfigFromStore(store, fsFallback);
    return jsonResponse(200, config);
  }

  if (url === '/api/guia-cultivo' && method === 'GET') {
    const guia = await readGuiaCultivoFromStore(store, fsFallback);
    if (!guia) return jsonResponse(404, { error: 'guia not found' });
    return jsonResponse(200, guia);
  }

  const guiaVideoMatch = url.match(/^\/api\/guia-cultivo\/videos\/([^/]+)$/);
  if (guiaVideoMatch && method === 'PUT') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const videoId = decodeURIComponent(guiaVideoMatch[1]);
      const result = await updateGuiaVideo(store, videoId, payload, fsFallback || root);
      return jsonResponse(result.status || 500, result.ok ? { ok: true, video: result.video } : { error: result.error });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  if (url === '/api/youtube-feed' && method === 'GET') {
    if (store.getYoutubeFeed) {
      const feed = await store.getYoutubeFeed();
      if (feed) return jsonResponse(200, feed);
    }
    try {
      const feedPath = path.join(fsFallback || root || process.cwd(), 'content', 'youtube-feed.json');
      const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
      return jsonResponse(200, feed);
    } catch (e) {
      return jsonResponse(404, { error: 'youtube feed not found' });
    }
  }

  if (url === '/api/sorteio' && method === 'PUT') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const config = await writeSorteioConfigToStore(store, payload, fsFallback);
      return jsonResponse(200, { ok: true, config });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  if (url === '/api/sorteios' && method === 'GET') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const entries = await listSorteios(store);
    return jsonResponse(200, entries);
  }

  if (url === '/api/sorteios' && method === 'POST') {
    const sorteioKey = getClientKey(req, headers);
    if (sorteioLimiter.isLimited(sorteioKey)) {
      return jsonResponse(429, { error: 'Muitas inscrições. Aguarde cerca de 15 minutos.' });
    }
    try {
      const config = await readSorteioConfigFromStore(store, fsFallback);
      const payload = JSON.parse(bodyRaw || '{}');
      const userSession = await getUserSession(store, cookie);
      const result = await createSorteioEntry(store, payload, config, {
        userId: userSession && userSession.userId
      });
      if (!result.ok) sorteioLimiter.record(sorteioKey);
      return jsonResponse(result.status || 500, result.ok ? { ok: true, id: result.entry.id } : { error: result.error });
    } catch (e) {
      sorteioLimiter.record(sorteioKey);
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  if (url === '/api/sorteio-alerts/me' && method === 'GET') {
    const userSession = await getUserSession(store, cookie);
    if (!userSession) return jsonResponse(401, { authenticated: false, subscribed: false });
    const status = await getAlertStatus(store, userSession.userId);
    return jsonResponse(200, Object.assign({ authenticated: true }, status));
  }

  if (url === '/api/sorteio-alerts' && method === 'POST') {
    const alertKey = getClientKey(req, headers);
    if (sorteioAlertLimiter.isLimited(alertKey)) {
      return jsonResponse(429, { error: 'Muitas tentativas. Aguarde cerca de 1 hora.' });
    }
    const userSession = await getUserSession(store, cookie);
    if (!userSession) {
      return jsonResponse(401, { error: 'É necessário entrar com a conta Google.', loginRequired: true });
    }
    const user = await getUserById(store, userSession.userId);
    if (!user) return jsonResponse(401, { error: 'Conta não encontrada.', loginRequired: true });
    const result = await subscribeToSorteioAlerts(store, user);
    if (!result.ok) sorteioAlertLimiter.record(alertKey);
    return jsonResponse(
      result.status || 500,
      result.ok
        ? { ok: true, subscribed: true, alreadySubscribed: !!result.alreadySubscribed, message: result.message, notify: result.notify }
        : { error: result.error }
    );
  }

  if (url === '/api/sorteio-alerts/me' && method === 'DELETE') {
    const userSession = await getUserSession(store, cookie);
    if (!userSession) return jsonResponse(401, { error: 'É necessário entrar com a conta Google.' });
    const result = await unsubscribeFromSorteioAlerts(store, userSession.userId);
    return jsonResponse(result.status || 500, result.ok ? { ok: true, message: result.message } : { error: result.error });
  }

  if (url === '/api/sorteio-alerts' && method === 'GET') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const subscribers = await listAlertSubscribers(store);
    return jsonResponse(200, subscribers);
  }

  if (url === '/api/sorteio-alerts/broadcast' && method === 'POST') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const broadcastKey = getClientKey(req, headers);
    if (sorteioBroadcastLimiter.isLimited(broadcastKey)) {
      return jsonResponse(429, { error: 'Limite de envios. Aguarde cerca de 1 hora antes de reenviar.' });
    }
    try {
      const config = await readSorteioConfigFromStore(store, fsFallback);
      const result = await broadcastSorteioAlerts(store, config);
      if (!result.ok) {
        if (result.status === 503) sorteioBroadcastLimiter.record(broadcastKey);
        return jsonResponse(result.status || 500, { error: result.error });
      }
      if (result.sent > 0) sorteioBroadcastLimiter.record(broadcastKey);
      return jsonResponse(200, {
        ok: true,
        sent: result.sent,
        failed: result.failed,
        total: result.total,
        message: result.message,
        failures: result.failures
      });
    } catch (e) {
      return jsonResponse(500, { error: 'Não foi possível enviar os avisos.' });
    }
  }

  const sorteioMatch = url.match(/^\/api\/sorteios\/([^/]+)$/);
  if (sorteioMatch && method === 'DELETE') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const id = decodeURIComponent(sorteioMatch[1]);
    const result = await deleteSorteioEntry(store, id);
    return jsonResponse(result.status || 500, result.ok ? { ok: true } : { error: result.error });
  }

  if (url === '/api/loja/encomendas' && method === 'GET') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const orders = await listLojaOrders(store);
    return jsonResponse(200, orders);
  }

  if (url === '/api/loja/encomenda' && method === 'POST') {
    const orderKey = getClientKey(req, headers);
    if (lojaOrderLimiter.isLimited(orderKey)) {
      return jsonResponse(429, { error: 'Muitas tentativas. Aguarde cerca de 15 minutos.' });
    }
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const userSession = await getUserSession(store, cookie);
      const result = await createLojaOrder(store, payload, {
        userId: userSession && userSession.userId
      });
      if (!result.ok) lojaOrderLimiter.record(orderKey);
      return jsonResponse(
        result.status || 500,
        result.ok
          ? { ok: true, id: result.id, message: result.message, notify: result.notify }
          : { error: result.error }
      );
    } catch (e) {
      lojaOrderLimiter.record(orderKey);
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  if (url === '/api/site' && method === 'GET') {
    const site = await readSiteFromStore(store, fsFallback);
    return jsonResponse(200, site);
  }

  if (url === '/api/site' && method === 'PUT') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const result = await writeSite(store, payload, fsFallback);
      if (result.ok && root) await exportStaticFiles(root, store);
      if (result.ok) await triggerRebuild();
      return jsonResponse(200, { ok: true, site: result.site });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  if (url === '/api/pages' && method === 'GET') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const meta = await listPagesMeta(store, fsFallback);
    return jsonResponse(200, meta);
  }

  const pageMatch = url.match(/^\/api\/pages\/([^/]+)$/);
  if (pageMatch) {
    const pageId = decodeURIComponent(pageMatch[1]);
    if (method === 'GET') {
      const session = await getAdminSession(store, cookie);
      if (!session) return jsonResponse(401, { error: 'authentication required' });
      const page = await getPage(store, pageId, fsFallback);
      if (!page) return jsonResponse(404, { error: 'page not found' });
      return jsonResponse(200, page);
    }
    if (method === 'PUT') {
      const session = await getAdminSession(store, cookie);
      if (!session) return jsonResponse(401, { error: 'authentication required' });
      try {
        const payload = JSON.parse(bodyRaw || '{}');
        const result = await updatePage(store, pageId, payload, fsFallback);
        if (result.ok && root) {
          const posts = mergeGuiaInspecoesPosts(await store.getPosts());
          const html = buildHtmlFromPage(result.page);
          if (pageId === 'biblioteca/pesquisas/index.html' || pageId === 'equipamentos/index.html' || pageId === 'biblioteca/inspecoes/index.html') {
            const rendered = renderManagedPage(result.page, posts, pageId);
            fs.writeFileSync(path.join(root, pageId), rendered, 'utf8');
          } else {
            fs.writeFileSync(path.join(root, pageId), html, 'utf8');
          }
          await exportStaticFiles(root, store);
        }
        if (result.ok) await triggerRebuild();
        return jsonResponse(result.status || 500, result.ok ? { ok: true, page: result.page } : { error: result.error });
      } catch (e) {
        return jsonResponse(400, { error: 'invalid payload' });
      }
    }
    return jsonResponse(405, { error: 'method not allowed' });
  }

  return jsonResponse(404, { error: 'not found' });
}

module.exports = { handleApiRequest, exportStaticFiles, triggerRebuild };
