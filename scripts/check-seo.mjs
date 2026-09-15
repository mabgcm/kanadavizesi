import assert from 'node:assert/strict';
import http from 'node:http';
import https from 'node:https';
import { articles, SITE_URL } from '../lib/content.ts';

const base = process.env.SEO_BASE_URL || 'http://localhost:3100';
const ua =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const get = (path, options = {}) =>
  fetch(new URL(path, base), { headers: { 'User-Agent': ua }, ...options });
const attr = (html, tag, attribute, value, output = 'content') => {
  const tags = html.match(new RegExp(`<${tag}\\b[^>]*>`, 'g')) || [];
  return tags
    .filter((t) => t.includes(`${attribute}="${value}"`))
    .map((t) => t.match(new RegExp(`${output}="([^"]*)"`))?.[1]);
};
const scripts = (html) =>
  [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].flatMap((m) => {
    const data = JSON.parse(m[1]);
    assert.equal(data['@context'], 'https://schema.org');
    return data['@graph'] || [data];
  });
const robots = await (await get('/robots.txt')).text();
assert(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
assert(robots.includes('OAI-SearchBot'));
assert(!robots.includes('Disallow: /\n'));
const sitemapResponse = await get('/sitemap.xml');
assert.equal(sitemapResponse.status, 200);
const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.equal(urls.length, new Set(urls).size, 'Duplicate sitemap URLs');
for (const a of articles)
  assert.equal(
    urls.includes(SITE_URL + a.path),
    a.contentStatus === 'complete',
    `Sitemap publication state: ${a.path}`,
  );
const links = new Set();
const titles = new Set();
const descriptions = new Set();
for (const url of urls) {
  const path = new URL(url).pathname;
  const response = await get(path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert(/<html[^>]*lang="tr"/.test(html), `${path}: Turkish language`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one H1`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), `${path}: unique title`);
  titles.add(title);
  const [description] = attr(html, 'meta', 'name', 'description');
  assert(
    description && !descriptions.has(description),
    `${path}: unique description`,
  );
  descriptions.add(description);
  assert.deepEqual(
    attr(html, 'link', 'rel', 'canonical', 'href').map((v) => new URL(v).href),
    [new URL(path, SITE_URL).href],
    `${path}: canonical`,
  );
  assert(
    !attr(html, 'meta', 'name', 'robots').some((v) => v?.includes('noindex')),
    `${path}: indexable`,
  );
  assert(
    attr(html, 'meta', 'name', 'googlebot').some((v) =>
      v?.includes('max-image-preview:large'),
    ),
    `${path}: large preview`,
  );
  assert.deepEqual(attr(html, 'meta', 'property', 'og:locale'), ['tr_TR']);
  assert.deepEqual(
    attr(html, 'meta', 'property', 'og:url').map((v) => new URL(v).href),
    [new URL(path, SITE_URL).href],
  );
  assert.deepEqual(attr(html, 'meta', 'name', 'twitter:card'), [
    'summary_large_image',
  ]);
  const graph = scripts(html);
  assert(graph.some((n) => n['@type'] === 'WebSite'));
  assert(graph.some((n) => n['@type'] === 'Organization'));
  if (articles.some((a) => a.path === path && a.contentStatus === 'complete')) {
    const article = graph.find((n) => n['@type'] === 'Article');
    assert(
      article && article.inLanguage === 'tr-TR' && article.publisher['@id'],
      `${path}: article entity`,
    );
    assert(graph.some((n) => n['@type'] === 'BreadcrumbList'));
  }
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    const target = new URL(href, url);
    if (target.origin === SITE_URL) links.add(target.pathname);
  }
}
for (const a of articles.filter((a) => a.contentStatus === 'starter')) {
  const res = await get(a.path);
  assert.equal(res.status, 200, a.path);
  const html = await res.text();
  assert(
    attr(html, 'meta', 'name', 'robots').some((v) => v?.includes('noindex')),
    `${a.path}: draft noindex`,
  );
  assert(
    attr(html, 'meta', 'name', 'googlebot').some((v) => v?.includes('noindex')),
    `${a.path}: Google draft noindex`,
  );
  assert(
    !scripts(html).some((n) => n['@type'] === 'Article'),
    `${a.path}: draft Article schema`,
  );
  links.delete(a.path);
}
const query = await (await get('/rehberler?q=vize')).text();
assert(
  attr(query, 'meta', 'name', 'robots').some((v) => v?.includes('noindex')),
);
assert.deepEqual(attr(query, 'link', 'rel', 'canonical', 'href'), [
  `${SITE_URL}/rehberler`,
]);
for (const path of links)
  assert.equal((await get(path)).status, 200, `Internal link: ${path}`);
const missing = await get('/bu-sayfa-yok-seo-test');
assert.equal(missing.status, 404, 'Real 404 status');
assert((await missing.text()).includes('noindex'));
// Node fetch does not preserve a custom Host header; use the HTTP client here.
const redirect = await new Promise((resolve, reject) => {
  const url = new URL('/rehberler', base);
  const client = url.protocol === 'https:' ? https : http;
  client
    .get(url, { headers: { Host: new URL(SITE_URL).host } }, (response) => {
      response.resume();
      resolve(response);
    })
    .on('error', reject);
});
assert.equal(
  redirect.statusCode,
  200,
  'Canonical www host must serve content, never redirect back to apex',
);
assert.equal(redirect.headers.location, undefined);
const api = await get('/api/on-degerlendirme');
assert(api.headers.get('x-robots-tag')?.includes('noindex'));
const image = await get('/og.png');
assert.equal(image.status, 200);
assert(image.headers.get('content-type')?.includes('image/png'));
const png = Buffer.from(await image.arrayBuffer());
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
console.log(
  `SEO PASS: ${urls.length} indexable URLs, ${articles.filter((a) => a.contentStatus === 'starter').length} noindex drafts; metadata, schema, internal links, query canonical, real 404, canonical host response, API and 1200×630 image.`,
);
