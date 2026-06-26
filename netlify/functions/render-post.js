const path = require('path');
const { connectLambda } = require('@netlify/blobs');
const { createBlobStore } = require('../../lib/store-blobs.js');
const { normalizePosts, buildPostHtml } = require('../../lib/posts-service.js');
const { ensureBlobSeed } = require('../../lib/seed-blobs.js');

const ROOT = path.resolve(__dirname, '../..');

exports.handler = async (event) => {
  connectLambda(event);

  const slug = (event.queryStringParameters && event.queryStringParameters.slug) || '';
  if (!slug) {
    return { statusCode: 400, body: 'Missing slug' };
  }

  const store = createBlobStore();
  await ensureBlobSeed(store, ROOT);

  const posts = normalizePosts(await store.getPosts());
  const post = posts.find((p) => p.slug === slug);
  if (!post || post.published === false) {
    return { statusCode: 404, headers: { 'Content-Type': 'text/plain' }, body: '404 Not Found' };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=60'
    },
    body: buildPostHtml(post)
  };
};
