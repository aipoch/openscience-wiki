import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

import {defaultLocale, locales} from '../i18n.config.mjs';

// Run after a complete two-locale build. The override also tests Git-free builds.
const root = fileURLToPath(new URL('../', import.meta.url));
const build = resolve(process.env.DOCS_SEO_BUILD_DIR || join(root, 'build'));
const origin = 'https://aipoch.com';
const base = '/docs/';
const read = (file) => readFile(file, 'utf8');
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) => tag);
const attribute = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const locations = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
const localeBase = (locale) => `${base}${locale === defaultLocale ? '' : `${locale}/`}`;

function outputFile(url) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, origin);
  assert.ok(parsed.pathname.startsWith(base));
  return join(build, parsed.pathname.slice(base.length), parsed.pathname.endsWith('/') ? 'index.html' : '');
}

async function documents(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const relative = join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await documents(join(directory, entry.name), relative));
    else if (/\.mdx?$/.test(entry.name)) files.push(relative);
  }
  return files;
}

const sitemapUrls = locales.map((locale) => `${origin}${localeBase(locale)}sitemap.xml`);
const sitemaps = new Map(await Promise.all(sitemapUrls.map(async (url) => [url, await read(outputFile(url))])));
const pageUrls = [...sitemaps.values()].flatMap(locations);
const pages = new Map(await Promise.all(pageUrls.map(async (url) => [url, await read(outputFile(url))])));

test('sitemap index discovers exactly all configured locale sitemaps', async () => {
  const index = await read(join(build, 'sitemap-index.xml'));
  assert.match(index, /<sitemapindex\s+xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  assert.deepEqual(locations(index).sort(), [...sitemapUrls].sort());
  assert.equal(new Set(pageUrls).size, pageUrls.length, 'sitemaps must not duplicate page URLs');
});

test('every sitemap URL has matching canonical, Open Graph URL, and reciprocal hreflang', () => {
  for (const [url, html] of pages) {
    assert.ok(url.endsWith('/'), url);
    assert.equal(new URL(url).search, '');
    const links = tags(html, 'link');
    const canonical = links.filter((tag) => attribute(tag, 'rel') === 'canonical');
    assert.equal(canonical.length, 1, url);
    assert.equal(attribute(canonical[0], 'href'), url);
    const metas = tags(html, 'meta');
    const og = metas.filter((tag) => attribute(tag, 'property') === 'og:url');
    assert.equal(og.length, 1, url);
    assert.equal(attribute(og[0], 'content'), url);
    assert.ok(!metas.some((tag) => attribute(tag, 'name') === 'robots' && /noindex/.test(attribute(tag, 'content'))), url);

    const alternates = links.filter((tag) => attribute(tag, 'hreflang'));
    assert.deepEqual(alternates.map((tag) => attribute(tag, 'hreflang')).sort(), [...locales, 'x-default'].sort(), url);
    const pairs = alternates.map((tag) => [attribute(tag, 'hreflang'), attribute(tag, 'href')]);
    const selfLocale = attribute(metas.find((tag) => attribute(tag, 'name') === 'docusaurus_locale') || '', 'content');
    assert.equal(new Map(pairs).get(selfLocale), url);
    assert.equal(new Map(pairs).get('x-default'), new Map(pairs).get(defaultLocale));
    for (const [, target] of pairs) {
      assert.ok(pages.has(target), `${url}: alternate ${target} must exist in a sitemap`);
      const reciprocal = tags(pages.get(target), 'link').filter((tag) => attribute(tag, 'hreflang'));
      assert.deepEqual(reciprocal.map((tag) => [attribute(tag, 'hreflang'), attribute(tag, 'href')]).sort(), [...pairs].sort(), target);
    }
  }
});

for (const locale of locales) {
  test(`${locale}: every document has its own content date in the sitemap`, async () => {
    const directory = join(root, locale === defaultLocale ? 'docs' : `i18n/${locale}/docusaurus-plugin-content-docs/current`);
    const xml = sitemaps.get(`${origin}${localeBase(locale)}sitemap.xml`);
    const entries = new Map([...xml.matchAll(/<url>(.*?)<\/url>/gs)].map(([, entry]) => [locations(entry)[0], entry]));
    assert.doesNotMatch(entries.get(`${origin}${localeBase(locale)}`), /<lastmod>/, 'home pages must not fall back to Git or build dates');
    for (const [url, entry] of entries) {
      if (url.includes('/category/')) assert.doesNotMatch(entry, /<lastmod>/, url);
    }
    const files = await documents(directory);
    assert.ok(files.length > 0);
    for (const file of files) {
      const content = await read(join(directory, file));
      const frontMatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
      assert.ok(frontMatter, file);
      const date = frontMatter.match(/^last_update:\r?\n\s+date: ['"]?(\d{4}-\d{2}-\d{2})['"]?\s*$/m)?.[1];
      assert.ok(date, `${locale}/${file}: provide an explicit content date for Git-free builds`);
      assert.equal(new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10), date);
      assert.ok(date <= new Date().toISOString().slice(0, 10), file);
      const slug = frontMatter.match(/^slug:\s*\/?([^\s]+)\s*$/m)?.[1] || file.replace(/\.mdx?$/, '');
      const url = `${origin}${localeBase(locale)}${slug.replace(/\/$/, '')}/`;
      assert.ok(entries.has(url), `${file}: document is missing from the sitemap`);
      assert.equal(entries.get(url).match(/<lastmod>([^<]+)<\/lastmod>/)?.[1], date, url);
    }
  });
}
