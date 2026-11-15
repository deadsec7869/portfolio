import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadConfigFromFile } from 'vite';

const source = await readFile('index.html', 'utf8');
const png = await readFile('dist/og-image.png');
assert.equal(png.subarray(1, 4).toString(), 'PNG');
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);

const saved = Object.fromEntries(['VITE_SITE_URL', 'VERCEL_PROJECT_PRODUCTION_URL', 'VERCEL_URL'].map(key => [key, process.env[key]]));
try {
  for (const key of Object.keys(saved)) delete process.env[key];
  process.env.VITE_SITE_URL = 'http://127.0.0.1:5173';
  const loaded = await loadConfigFromFile({ command: 'build', mode: 'production' });
  const plugin = loaded.config.plugins.find(item => item?.name === 'portfolio-social-metadata');
  const transformed = plugin.transformIndexHtml(source);
  assert.ok(transformed.includes('content="http://127.0.0.1:5173/og-image.png"'));
  assert.ok(transformed.includes('property="og:url" content="http://127.0.0.1:5173/"'));
  assert.ok(transformed.includes('rel="canonical" href="http://127.0.0.1:5173/"'));
  assert.equal((transformed.match(/http:\/\/127\.0\.0\.1:5173\/og-image.png/g) || []).length, 2);
  assert.ok(transformed.includes('summary_large_image'));
  console.log('PASS: 1200×630 PNG, absolute OpenGraph/Twitter image URLs, canonical URL, and og:url.');
  console.log('VERDICT: PASS');
} finally {
  for (const [key, value] of Object.entries(saved)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
