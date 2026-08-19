import * as pagesHandler from '../../lib/cloudflare-pages-handler.js';

const handleCloudflarePagesRequest =
  pagesHandler.handleCloudflarePagesRequest ||
  (pagesHandler.default && pagesHandler.default.handleCloudflarePagesRequest);

export async function onRequest(context) {
  return handleCloudflarePagesRequest(context, { kind: 'uploads' });
}
