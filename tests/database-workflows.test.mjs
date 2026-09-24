import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import test from 'node:test';
import {locales} from '../i18n.config.mjs';

const build = process.env.DOCS_BUILD_DIR || 'build';
const workflows = {
  'public-omics-data': ['ena-runs', 'omics-discovery'],
  'protein-sequence-search': ['sequence-search', 'blast-jobs', 'blast-report'],
  'gene-set-enrichment': ['gene-set-enrichment'],
  'reference-genome-check': ['reference-genome'],
};
const oldEnglish = [
  'data-source-catalog', 'retrieve-a-record-and-verify-its-identity',
  'start-with-one-known-identifier', 'choose-a-query-and-inspect-the-result',
  'connect-openalex-and-follow-citation-links', 'look-up-a-doi-and-its-related-research-records',
  'handle-a-returned-record-empty-match-or-error', 'string-network',
  'find-operation-parameters', 'actual-local-queries', 'empty-partial-and-failed-responses',
];
const oldChinese = [
  '\u6570\u636e\u6e90\u76ee\u5f55', '\u83b7\u53d6\u8bb0\u5f55\u5e76\u6838\u5bf9\u8eab\u4efd', '\u4ece\u4e00\u4e2a\u5df2\u77e5\u6807\u8bc6\u5f00\u59cb', '\u9009\u62e9\u67e5\u8be2\u5e76\u68c0\u67e5\u7ed3\u679c',
  '\u8fde\u63a5-openalex-\u5e76\u8ffd\u8e2a\u5f15\u7528\u5173\u7cfb', '\u67e5\u8be2-doi-\u53ca\u5173\u8054\u7814\u7a76\u8bb0\u5f55', '\u67e5\u8be2\u7ed3\u679c\u4e0e\u62a5\u9519\u600e\u4e48\u5904\u7406',
  'string-network', '\u67e5\u627e\u64cd\u4f5c\u53c2\u6570', '\u672c\u5730\u5b9e\u9645\u67e5\u8be2', '\u7a7a\u7ed3\u679c\u90e8\u5206\u7ed3\u679c\u4e0e\u9519\u8bef',
];
const article = (file) => {
  const html = readFileSync(file, 'utf8');
  const body = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(body, `Missing article: ${file}`);
  return body;
};

for (const locale of locales) {
  test(`${locale}: database overview preserves bookmarks and leads to complete workflow articles`, () => {
    const prefix = locale === 'en' ? '' : `${locale}/`;
    const overview = article(`${build}/${prefix}tools/databases/index.html`);
    for (const id of [...(locale.startsWith('zh-') ? oldChinese : oldEnglish), ...Object.values(workflows).flat()]) {
      assert.ok(overview.includes(`id="${id}"`), `Lost database bookmark: ${id}`);
    }
    assert.ok(overview.includes('id="connect-database"'));
    const registry = JSON.parse(readFileSync('static/examples/capabilities/connector-catalog-v0.33.1.json', 'utf8'));
    for (const connector of registry.filter((c) => c.id !== 'molecule')) {
      assert.ok(overview.includes(`<code>${connector.id}</code>`), `Missing data source: ${connector.id}`);
    }
    for (const [slug, anchors] of Object.entries(workflows)) {
      assert.ok(overview.includes(`href="/docs/${prefix}workflows/${slug}/"`));
      const body = article(`${build}/${prefix}workflows/${slug}/index.html`);
      for (const id of anchors) assert.ok(body.includes(`id="${id}"`), `${slug} missing ${id}`);
      assert.ok(body.includes(`/docs/${prefix}tools/databases/#connect-database`), `${slug}: missing setup link`);
      const images = [...body.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((m) => m[1]);
      assert.ok(images.length >= 2, `${slug}: walkthrough screenshots missing`);
      for (const url of images) {
        assert.ok(url.startsWith(`/docs/${prefix}assets/images/`));
        assert.ok(!overview.includes(url), `${slug}: case screenshot is still duplicated in the overview`);
        assert.ok(existsSync(`${build}/${url.slice('/docs/'.length)}`));
      }
      const downloads = [...body.matchAll(/href="(\/docs\/(?:[a-zA-Z-]+\/)?examples\/[^"#?]+)"/g)].map((m) => m[1]);
      assert.ok(downloads.length >= 3, `${slug}: source and result downloads missing`);
      for (const url of downloads) assert.ok(existsSync(`${build}/${url.slice('/docs/'.length)}`));
    }
  });
}

for (const locale of locales) {
  test(`${locale}: multiple sequence alignment exposes its setup, screenshots and raw evidence`, () => {
    const prefix = locale === 'en' ? '' : `${locale}/`;
    const body = article(`${build}/${prefix}workflows/multiple-sequence-alignment/index.html`);
    for (const id of ['alignment-inputs', 'alignment-job', 'alignment-results', 'alignment-interpretation']) {
      assert.ok(body.includes(`id="${id}"`), `Missing alignment step: ${id}`);
    }
    assert.ok(body.includes(`/docs/${prefix}tools/databases/#connect-database`));
    const images = [...body.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((m) => m[1]);
    assert.ok(images.length >= 2);
    for (const url of images) assert.ok(existsSync(`${build}/${url.slice('/docs/'.length)}`));
    for (const name of ['hemoglobin_alpha_human_mouse_bovine.fasta', 'hemoglobin_alpha_clustalo.aln', 'clustalo_submission_receipt.json', 'hemoglobin_alpha_conservation_report.md']) {
      assert.ok(body.includes(`/examples/v0331/${name}`), `Missing evidence download: ${name}`);
      assert.ok(existsSync(`static/examples/v0331/${name}`));
    }
  });
}

test('Clustal worked-example counts match the raw alignment and input sequences', () => {
  const fasta = readFileSync('static/examples/v0331/hemoglobin_alpha_human_mouse_bovine.fasta', 'utf8');
  const sequences = Object.fromEntries(fasta.trim().split('>').filter(Boolean).map((record) => {
    const [name, ...lines] = record.trim().split('\n');
    return [name.split(/\s+/)[0], lines.join('')];
  }));
  const alignment = {};
  for (const line of readFileSync('static/examples/v0331/hemoglobin_alpha_clustalo.aln', 'utf8').split('\n')) {
    const match = line.match(/^(\S+)\s+([A-Z-]+)\s+\d+\s*$/);
    if (match) alignment[match[1]] = (alignment[match[1]] || '') + match[2];
  }
  assert.deepEqual(Object.keys(alignment).sort(), Object.keys(sequences).sort());
  for (const [name, seq] of Object.entries(alignment)) assert.equal(seq.replaceAll('-', ''), sequences[name]);
  const rows = Object.values(alignment);
  assert.equal(rows.length, 3);
  assert.ok(rows.every((seq) => seq.length === 142));
  const conserved = [...rows[0]].filter((residue, column) => residue !== '-' && rows.every((seq) => seq[column] === residue)).length;
  assert.equal(conserved, 116);
  assert.ok(rows.every((seq) => !seq.includes('-')));
});
