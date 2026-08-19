import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { handleCloudflarePagesRequest } = require('../../lib/cloudflare-pages-handler.js');

export async function onRequest(context) {
  return handleCloudflarePagesRequest(context, { kind: 'uploads' });
}
