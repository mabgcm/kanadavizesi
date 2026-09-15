import assert from 'node:assert/strict';
import { SITE_URL } from '../lib/content.ts';

// Run against production after deployment: this includes Vercel's domain layer.
for (const origin of ['https://kanadavizesi.ca', SITE_URL]) {
  for (const path of [
    '/',
    '/rehberler/turkiyeden-kanadaya-nasil-gidilir',
    '/robots.txt',
    '/sitemap.xml',
  ]) {
    let url = new URL(path, origin);
    const visited = new Set();
    let completed = false;
    for (let hop = 0; hop < 4; hop++) {
      assert(
        !visited.has(url.href),
        `Redirect loop: ${[...visited, url.href].join(' -> ')}`,
      );
      visited.add(url.href);
      const res = await fetch(url, {
        redirect: 'manual',
        signal: AbortSignal.timeout(15000),
      });
      await res.body?.cancel();
      if (res.status >= 300 && res.status < 400) {
        assert(res.headers.get('location'), `Missing Location: ${url}`);
        url = new URL(res.headers.get('location'), url);
        assert(
          ['kanadavizesi.ca', 'www.kanadavizesi.ca'].includes(url.hostname),
          `Unexpected destination: ${url}`,
        );
        continue;
      }
      assert.equal(res.status, 200, `${url}: HTTP status`);
      assert.equal(
        url.href,
        new URL(path, SITE_URL).href,
        'Must finish at canonical www URL',
      );
      completed = true;
      console.log(
        `PASS ${origin}${path}: ${visited.size - 1} redirects -> 200`,
      );
      break;
    }
    assert(completed, `Too many redirects: ${origin}${path}`);
  }
}
