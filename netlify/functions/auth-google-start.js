'use strict';

require('../../lib/load-env.js');
const { handleGoogleStart, toNetlifyResponse } = require('../../lib/auth-google-start.js');

exports.handler = async (event) => {
  try {
    const query = event.rawQuery
      || (event.rawUrl && String(event.rawUrl).includes('?') ? String(event.rawUrl).split('?')[1] : '')
      || new URLSearchParams(event.queryStringParameters || {}).toString();
    return toNetlifyResponse(handleGoogleStart({
      headers: event.headers || {},
      query
    }));
  } catch (e) {
    return {
      statusCode: 302,
      headers: { Location: '/entrar.html?error=server_error', 'Cache-Control': 'no-store' },
      body: ''
    };
  }
};
