import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import test from 'node:test';
import {defaultLocale, localeConfigs, locales} from '../i18n.config.mjs';

const build = process.env.DOCS_BUILD_DIR || 'build';
const origin = 'https://aipoch.com';

test('every published locale exports its canonical article bodies with source links', async () => {
  for (const locale of locales) {
    const directory = join(build, locale === defaultLocale ? '' : locale);
    const baseUrl = localeConfigs[locale].baseUrl;
    const output = await readFile(join(directory, 'llms-full.txt'), 'utf8');
    const sitemap = await readFile(join(directory, 'sitemap.xml'), 'utf8');
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    const sources = [...output.matchAll(/^Source: (\S+)\nLanguage: (\S+)\n/gm)];
    const sourceUrls = sources.map((match) => match[1]);
    assert.equal(new Set(sourceUrls).size, sources.length, `${locale}: duplicate articles`);
    assert.ok(sources.length > 100, `${locale}: incomplete documentation export`);
    for (const source of sources) {
      assert.equal(source[2], locale);
      assert.ok(source[1].startsWith(`${origin}${baseUrl}`), source[1]);
      assert.ok(locations.includes(source[1]), source[1]);
    }
    for (const location of locations) {
      const route = new URL(location).pathname.slice(baseUrl.length);
      const html = await readFile(join(directory, route, 'index.html'), 'utf8');
      if (/class="[^"]*\btheme-doc-markdown\b/.test(html)) {
        assert.ok(sourceUrls.includes(location), `${locale}: missing ${location}`);
      }
    }
    assert.ok(sourceUrls.includes(`${origin}${baseUrl}guides/research-packages/`));
    assert.ok(sourceUrls.includes(`${origin}${baseUrl}guides/installation/`));
    assert.ok(output.includes('Platform: windows'), `${locale}: missing Windows instructions`);
    assert.ok(output.includes('Platform: linux'), `${locale}: missing Linux instructions`);
    assert.ok(output.includes('.science'), `${locale}: missing package documentation`);
    assert.doesNotMatch(output, /Source: https:\/\/aipoch\.com\/docs\/docs\//);
  }
});

test('the documentation index discovers the English full text without adding it to sitemaps', async () => {
  const index = await readFile(join(build, 'llms.txt'), 'utf8');
  assert.ok(index.includes(`${origin}/docs/llms-full.txt`));
  for (const locale of locales) {
    const directory = join(build, locale === defaultLocale ? '' : locale);
    const sitemap = await readFile(join(directory, 'sitemap.xml'), 'utf8');
    assert.doesNotMatch(sitemap, /<loc>[^<]*llms-full\.txt<\/loc>/);
  }
});
