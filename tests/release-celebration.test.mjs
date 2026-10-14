import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const build = resolve(process.env.DOCS_BUILD_DIR || join(root, 'build'));
const locales = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'fr', 'ru', 'de', 'es'];

for (const locale of locales) {
  test(`${locale} release celebration renders readable content before client animation`, async () => {
    const dir = locale === 'en' ? build : join(build, locale);
    const html = await readFile(join(dir, 'changelog/v1-0-0/index.html'), 'utf8');
    assert.match(html, /data-release-celebration="true" data-playing="false"/);
    assert.ok(html.includes('🎉 Open-Science 1.0'));
    const start = html.indexOf('data-release-celebration=');
    const introduction = html.slice(start, html.indexOf('<h2', start));
    assert.ok(introduction.includes('Open-Science 1.0'));
    assert.doesNotMatch(introduction, /<button\b/, 'The celebration has no playback controls');
    assert.ok(!html.includes('data-release-confetti'), 'The decorative overlay waits for client motion preference');
    const other = await readFile(join(dir, 'guides/installation/index.html'), 'utf8');
    assert.ok(!other.includes('data-release-celebration'), 'Other articles remain unchanged');
  });
}
