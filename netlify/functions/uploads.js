const { connectLambda } = require('@netlify/blobs');
const { createBlobStore } = require('../../lib/store-blobs.js');

exports.handler = async (event) => {
  connectLambda(event);

  const name = (event.queryStringParameters && event.queryStringParameters.name)
    || (event.path || '').replace(/^.*\/uploads\//, '');

  if (!name || name.includes('..') || name.includes('/')) {
    return { statusCode: 400, body: 'Invalid filename' };
  }

  const store = createBlobStore();
  const file = await store.getUpload(name);
  if (!file) {
    return { statusCode: 404, body: 'Not found' };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': file.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable'
    },
    body: file.buffer.toString('base64'),
    isBase64Encoded: true
  };
};
