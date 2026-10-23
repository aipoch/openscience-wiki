import assert from 'node:assert/strict';
import {mkdtemp, mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {writeLocaleFullText} from '../scripts/llms-full.mjs';

const siteUrl = 'https://aipoch.com';

async function fixture(t, {baseUrl = '/docs/', locale = 'en', pages = []} = {}) {
  const outDir = await mkdtemp(join(tmpdir(), 'wiki-llms-full-'));
  t.after(() => rm(outDir, {recursive: true, force: true}));
  for (const page of pages) {
    const directory = join(outDir, page.route);
    await mkdir(directory, {recursive: true});
    const source = page.source || `${siteUrl}${baseUrl}${page.route}`;
    await writeFile(join(directory, 'index.html'), `<!doctype html><html><head><link rel="canonical" href="${page.canonical || source}">${page.head || ''}</head><body><nav>OUTSIDE NAVIGATION</nav>${page.landing ? '<main>Documentation home</main>' : `<article>${page.articlePrelude || ''}<div class="theme-doc-markdown markdown">${page.body || '<h1>Guide</h1><p>Article text.</p>'}</div></article>`}<footer>OUTSIDE FOOTER</footer></body></html>`);
  }
  await writeFile(join(outDir, 'sitemap.xml'), `<?xml version="1.0"?><urlset>${pages.map((page) => `<url><loc>${page.source || `${siteUrl}${baseUrl}${page.route}`}</loc>${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}</url>`).join('')}</urlset>`);
  return {outDir, siteUrl, baseUrl, locale};
}

test('exports rendered article structure without UI, retaining literal code and blank lines', async (t) => {
  const options = await fixture(t, {pages: [{route: 'guide/', body: `<h1>Guide<a class="hash-link" href="#guide">ANCHOR UI</a></h1><p>Check <code>a &lt; b</code>.</p><pre><code class="language-python"><span>x = 1 &lt; 2</span>\n\n\nprint(&quot;ok&quot;)\n</code><button>COPY UI</button></pre><details><summary>Requirements</summary><p>Collapsed instructions stay available.</p></details><script>SECRET SCRIPT</script><style>CSS RULE</style>`}]});
  const result = await writeLocaleFullText(options);
  const output = await readFile(join(options.outDir, 'llms-full.txt'), 'utf8');
  assert.equal(result.articleCount, 1);
  assert.match(output, /# Guide/);
  assert.ok(output.includes('`a < b`'));
  assert.ok(output.includes('```python\nx = 1 < 2\n\n\nprint("ok")\n```'));
  assert.match(output, /Requirements[\s\S]*Collapsed instructions stay available/);
  assert.doesNotMatch(output, /OUTSIDE NAVIGATION|OUTSIDE FOOTER|ANCHOR UI|COPY UI|SECRET SCRIPT|CSS RULE/);
  assert.equal(result.bytes, Buffer.byteLength(output));
});

test('keeps lists, tables, absolute links and image descriptions', async (t) => {
  const options = await fixture(t, {pages: [{route: 'guides/example/', body: `<h1>Example</h1><ol start="3"><li>First item</li><li>Second item<ul><li>Nested item</li></ul></li></ol><table><thead><tr><th>Name</th><th>Output</th></tr></thead><tbody><tr><td>QC</td><td><a href="../results/#table">Saved table</a></td></tr></tbody></table><p><a href="#limits">Limits</a> <a href="javascript:alert(1)">Unsafe action</a></p><img alt="QC screenshot" src="../../img/qc.webp">`}]});
  await writeLocaleFullText(options);
  const output = await readFile(join(options.outDir, 'llms-full.txt'), 'utf8');
  assert.match(output, /3\. First item/);
  assert.match(output, /4\. Second item/);
  assert.match(output, /- Nested item/);
  assert.ok(output.includes('| Name | Output |\n| --- | --- |'));
  assert.ok(output.includes('[Saved table](https://aipoch.com/docs/guides/results/#table)'));
  assert.ok(output.includes('[Limits](https://aipoch.com/docs/guides/example/#limits)'));
  assert.ok(output.includes('![QC screenshot](https://aipoch.com/docs/img/qc.webp)'));
  assert.doesNotMatch(output, /javascript:/);
});

test('retains all platform instructions, including hidden non-default platforms', async (t) => {
  const options = await fixture(t, {pages: [{route: 'platforms/', body: '<h1>Platforms</h1><div data-doc-platform="macos"><p>Mac instructions.</p></div><div hidden data-doc-platform="windows"><p>Windows instructions.</p></div><div hidden data-doc-platform="linux"><p>Linux instructions.</p></div>'}]});
  await writeLocaleFullText(options);
  const output = await readFile(join(options.outDir, 'llms-full.txt'), 'utf8');
  for (const platform of ['macos', 'windows', 'linux']) assert.ok(output.includes(`Platform: ${platform}`));
  assert.match(output, /Windows instructions/);
  assert.match(output, /Linux instructions/);
});

test('preserves Prism token-line boundaries, indentation and pre-level language', async (t) => {
  const options = await fixture(t, {pages: [{route: 'code/', body: '<h1>Code</h1><pre class="prism-code language-python"><code class="codeBlockLines"><div class="token-line"><span>if 1 &lt; 2:</span><br></div><div class="token-line"><span>    print(&quot;ok&quot;)</span><br></div><div class="token-line"><br></div><div class="token-line"><span>print(&quot;done&quot;)</span><br></div></code></pre><pre><code><span class="token-line">first</span><span class="token-line">second\n</span></code></pre>'}]});
  await writeLocaleFullText(options);
  const output = await readFile(join(options.outDir, 'llms-full.txt'), 'utf8');
  assert.ok(output.includes('```python\nif 1 < 2:\n    print("ok")\n\nprint("done")\n```'));
  assert.ok(output.includes('```\nfirst\nsecond\n```'));
});

test('retains a translation notice outside the body without inventing one for other pages', async (t) => {
  const options = await fixture(t, {baseUrl: '/docs/fr/', locale: 'fr', pages: [
    {route: 'guides/draft/', articlePrelude: '<aside class="translationNote_ab12">Automatic translation. Consult the English original if a step is unclear. <a href="/docs/guides/draft/" lang="en">English</a></aside><aside>OTHER ASIDE UI</aside>', body: '<h1>Draft guide</h1><p>Translated instructions.</p>'},
    {route: 'guides/reviewed/', body: '<h1>Reviewed guide</h1><p>Reviewed instructions.</p>'},
  ]});
  await writeLocaleFullText(options);
  const output = await readFile(join(options.outDir, 'llms-full.txt'), 'utf8');
  assert.equal((output.match(/Automatic translation\./g) || []).length, 1);
  assert.ok(output.includes('[English](https://aipoch.com/docs/guides/draft/)'));
  assert.ok(output.indexOf('Automatic translation.') < output.indexOf('# Draft guide'));
  assert.doesNotMatch(output, /OTHER ASIDE UI/);
  const reviewed = output.slice(output.indexOf('Source: https://aipoch.com/docs/fr/guides/reviewed/'));
  assert.doesNotMatch(reviewed, /Automatic translation|\[English\]/);
});

test('uses per-article source and real dates for a locale, without adding a build date', async (t) => {
  const options = await fixture(t, {baseUrl: '/docs/zh-Hans/', locale: 'zh-Hans', pages: [
    {route: 'guides/one/', lastmod: '2026-09-01', head: '<script type="application/ld+json">{"@graph":[{"@type":"TechArticle","dateModified":"2026-10-12"}]}</script>', body: '<h1>\u4e2d\u6587\u6587\u6863</h1><p>\u9002\u7528\u7248\u672c v1.0.0\u3002</p>'},
    {route: 'guides/two/', lastmod: '2026-09-28'},
    {route: 'guides/three/'},
  ]});
  await writeLocaleFullText(options);
  const output = await readFile(join(options.outDir, 'llms-full.txt'), 'utf8');
  assert.match(output, /Source: https:\/\/aipoch.com\/docs\/zh-Hans\/guides\/one\//);
  assert.equal((output.match(/Language: zh-Hans/g) || []).length, 3);
  assert.match(output, /Last updated: 2026-10-12/);
  assert.match(output, /Last updated: 2026-09-28/);
  assert.equal((output.match(/Last updated:/g) || []).length, 2);
  assert.match(output, /\u9002\u7528\u7248\u672c v1\.0\.0/u);
  assert.doesNotMatch(output, /2026-09-01|Generated at|Build date|latest version/);
  await writeLocaleFullText(options);
  assert.equal(await readFile(join(options.outDir, 'llms-full.txt'), 'utf8'), output);
});

test('skips landing, noindex, redirects and pages with a different canonical', async (t) => {
  const options = await fixture(t, {pages: [
    {route: '', landing: true},
    {route: 'guide/'},
    {route: 'private/', head: '<meta name="robots" content="noindex, follow">', body: '<p>NOINDEX CONTENT</p>'},
    {route: 'redirect/', head: '<meta http-equiv="refresh" content="0;url=/docs/guide/">', body: '<p>REDIRECT CONTENT</p>'},
    {route: 'duplicate/', canonical: 'https://aipoch.com/docs/guide/', body: '<p>DUPLICATE CONTENT</p>'},
  ]});
  const result = await writeLocaleFullText(options);
  assert.equal(result.articleCount, 1);
  assert.equal(result.skipped, 4);
  const output = await readFile(join(options.outDir, 'llms-full.txt'), 'utf8');
  assert.doesNotMatch(output, /NOINDEX CONTENT|REDIRECT CONTENT|DUPLICATE CONTENT/);
});

test('fails closed on missing inputs and unsafe or foreign sitemap paths', async (t) => {
  const options = await fixture(t, {pages: [{route: 'guide/'}]});
  await rm(join(options.outDir, 'sitemap.xml'));
  await assert.rejects(writeLocaleFullText(options), /ENOENT/);
  for (const source of ['https://foreign.example/docs/guide/', 'https://aipoch.com/docs-other/guide/', 'https://aipoch.com/docs/%2e%2e%2foutside/', 'https://aipoch.com/docs/C%3A/secret/']) {
    await writeFile(join(options.outDir, 'sitemap.xml'), `<urlset><url><loc>${source}</loc></url></urlset>`);
    await assert.rejects(writeLocaleFullText(options), /outside the locale documentation scope|Unsafe documentation path/);
  }
  await writeFile(join(options.outDir, 'sitemap.xml'), '<urlset><url><loc>https://aipoch.com/docs/missing/</loc></url></urlset>');
  await assert.rejects(writeLocaleFullText(options), /ENOENT/);
});
