const fetch = require('node-fetch');

// Simple whitelist of hostnames allowed to be proxied. Adjust as needed.
const ALLOWED_HOSTS = [
  'assets.ctfassets.net',
  'images.ctfassets.net',
];

// Cache TTL in seconds (7 days)
const CACHE_TTL = 7 * 24 * 60 * 60;

// Helper to extract hostname from a URL safely
function getHostname(url) {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return null;
  }
}

exports.handler = async function (event, context) {
  const url = event.queryStringParameters && event.queryStringParameters.url;

  if (!url) {
    return {
      statusCode: 400,
      body: 'Missing "url" query parameter',
    };
  }

  const hostname = getHostname(url);
  if (!hostname || !ALLOWED_HOSTS.includes(hostname)) {
    return {
      statusCode: 403,
      body: 'Host not allowed',
    };
  }

  try {
    // Forward range requests from client to origin to support seeking
    const rangeHeader = event.headers && (event.headers.range || event.headers.Range);

    const fetchOptions = {
      method: 'GET',
      headers: {
        'User-Agent': 'Netlify-Audio-Proxy/1.0',
      },
      // allow size streaming by not setting a body
    };

    if (rangeHeader) fetchOptions.headers.Range = rangeHeader;

    const res = await fetch(url, fetchOptions);

    // Build response headers
    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const contentLength = res.headers.get('content-length');
    const acceptRanges = res.headers.get('accept-ranges') || 'bytes';
    const etag = res.headers.get('etag');
    const lastModified = res.headers.get('last-modified');

    // We will stream binary data as base64 because Netlify Functions (Lambda) require it
    const buffer = await res.arrayBuffer();
    const body = Buffer.from(buffer).toString('base64');

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': `public, max-age=${CACHE_TTL}, stale-while-revalidate=${Math.floor(CACHE_TTL / 2)}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Accept-Ranges': acceptRanges,
    };

    if (contentLength) headers['Content-Length'] = contentLength;
    if (etag) headers['ETag'] = etag;
    if (lastModified) headers['Last-Modified'] = lastModified;

    // If origin returned a Partial Content status, forward it
    const statusCode = res.status === 206 ? 206 : 200;

    return {
      statusCode,
      headers,
      isBase64Encoded: true,
      body,
    };
  } catch (err) {
    console.error('Audio proxy error:', err);
    return {
      statusCode: 502,
      body: 'Error fetching remote audio',
    };
  }
};
