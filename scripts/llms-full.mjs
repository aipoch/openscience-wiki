import {readFile, realpath, writeFile} from 'node:fs/promises';
import {isAbsolute, join, relative, resolve} from 'node:path';
import {parse, parseFragment} from 'parse5';

const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const children = (node) => node.childNodes || [];
const hasClass = (node, name) => (attr(node, 'class') || '').split(/\s+/).includes(name);
const all = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...children(node).flatMap((child) => all(child, predicate)),
];
const text = (node) => node.nodeName === '#text' ? node.value : children(node).map(text).join('');

function codeText(node) {
  if (node.nodeName === '#text') return node.value;
  if (node.tagName === 'br') return '\n';
  const value = children(node).map(codeText).join('');
  // Prism renders one token-line element per line, often ending it with <br>.
  return hasClass(node, 'token-line') && !value.endsWith('\n') ? `${value}\n` : value;
}

function publicUrl(value, source) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value, source);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function articleText(article, source) {
  const codeBlocks = [];
  const omitted = new Set(['script', 'style', 'button', 'input', 'select', 'textarea', 'nav', 'aside', 'svg', 'template', 'noscript']);

  function render(node) {
    if (node.nodeName === '#text') return node.value.replace(/\s+/g, ' ');
    if (omitted.has(node.tagName) || hasClass(node, 'hash-link') || attr(node, 'aria-hidden') === 'true') return '';
    const inner = () => children(node).map(render).join('');
    const block = (value) => `\n\n${value.trim()}\n\n`;
    if (node.tagName === 'pre') {
      const code = all(node, (item) => item.tagName === 'code')[0] || node;
      const value = codeText(code).replace(/\r\n/g, '\n');
      const language = `${attr(code, 'class') || ''} ${attr(node, 'class') || ''}`.match(/\blanguage-([\w+-]+)/)?.[1] || '';
      const longest = Math.max(0, ...(value.match(/`+/g) || []).map((item) => item.length));
      const fence = '`'.repeat(Math.max(3, longest + 1));
      const marker = `\0code-${codeBlocks.length}\0`;
      codeBlocks.push(`${fence}${language}\n${value}${value.endsWith('\n') ? '' : '\n'}${fence}`);
      return block(marker);
    }
    if (/^h[1-6]$/.test(node.tagName || '')) return block(`${'#'.repeat(Number(node.tagName[1]))} ${inner()}`);
    if (node.tagName === 'code') {
      const value = inner();
      const fence = '`'.repeat(Math.max(1, ...(value.match(/`+/g) || []).map((item) => item.length + 1)));
      return `${fence}${value}${fence}`;
    }
    if (node.tagName === 'a') {
      const label = inner().trim();
      const url = publicUrl(attr(node, 'href'), source);
      return label && url ? `[${label}](${url})` : label;
    }
    if (node.tagName === 'img') {
      const url = publicUrl(attr(node, 'src'), source);
      return url ? `![${attr(node, 'alt') || 'Image'}](${url})` : '';
    }
    if (node.tagName === 'br') return '\n';
    if (node.tagName === 'hr') return block('---');
    if (node.tagName === 'ul' || node.tagName === 'ol') {
      const start = Number.parseInt(attr(node, 'start') || '1', 10) || 1;
      return block(children(node).filter((item) => item.tagName === 'li').map((item, index) => {
        const prefix = node.tagName === 'ol' ? `${start + index}. ` : '- ';
        return prefix + render(item).trim().replace(/\n/g, `\n${' '.repeat(prefix.length)}`);
      }).join('\n'));
    }
    if (node.tagName === 'table') {
      const rows = all(node, (item) => item.tagName === 'tr');
      const lines = rows.flatMap((row, index) => {
        const cells = children(row).filter((item) => item.tagName === 'td' || item.tagName === 'th');
        const line = `| ${cells.map((cell) => render(cell).trim().replace(/\n+/g, '; ').replace(/\|/g, '\\|')).join(' | ')} |`;
        return index === 0 && cells.some((cell) => cell.tagName === 'th')
          ? [line, `| ${cells.map(() => '---').join(' | ')} |`]
          : [line];
      });
      return block(lines.join('\n'));
    }
    if (attr(node, 'data-doc-platform')) {
      // PlatformGuide keeps non-selected platforms hidden in SSR HTML for search.
      return block(`Platform: ${attr(node, 'data-doc-platform')}\n\n${inner()}`);
    }
    if (['p', 'div', 'section', 'article', 'header', 'blockquote', 'details', 'summary', 'figure', 'figcaption'].includes(node.tagName)) return block(inner());
    return inner();
  }

  return render(article)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+(?=\n)/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .replace(/\0code-(\d+)\0/g, (_, index) => codeBlocks[Number(index)]);
}

function contentDate(document, fallback) {
  const values = [];
  for (const script of all(document, (node) => node.tagName === 'script' && attr(node, 'type') === 'application/ld+json')) {
    let data;
    try { data = JSON.parse(text(script)); } catch { continue; }
    const visit = (value) => {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') {
        if ([value['@type']].flat().includes('TechArticle')) values.push(value.dateModified);
        if (value['@graph']) visit(value['@graph']);
      }
    };
    visit(data);
  }
  return [...values, fallback].find((value) => typeof value === 'string'
    && /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value) && Number.isFinite(Date.parse(value)));
}

function staysWithin(root, target) {
  const path = relative(root, target);
  return !path.startsWith('..') && !isAbsolute(path);
}

/** Export indexed documentation articles from one locale's completed HTML build. */
export async function writeLocaleFullText({outDir, siteUrl, baseUrl, locale}) {
  const origin = new URL(siteUrl).origin;
  const base = new URL(baseUrl, origin).pathname;
  if (!base.startsWith('/docs/') || !base.endsWith('/')) throw new Error(`Invalid documentation base URL: ${baseUrl}`);
  const root = await realpath(outDir);
  const sitemap = parseFragment(await readFile(join(root, 'sitemap.xml'), 'utf8'));
  if (!all(sitemap, (node) => node.tagName === 'urlset').length) throw new Error('Expected a locale URL sitemap');
  const entries = all(sitemap, (node) => node.tagName === 'url').map((entry) => ({
    source: text(children(entry).find((node) => node.tagName === 'loc') || {}).trim(),
    lastmod: text(children(entry).find((node) => node.tagName === 'lastmod') || {}).trim(),
  })).sort((a, b) => a.source < b.source ? -1 : a.source > b.source ? 1 : 0);
  if (!entries.length) throw new Error('The locale sitemap contains no page URLs');
  const seen = new Set();
  const articles = [];
  let skipped = 0;
  for (const {source, lastmod} of entries) {
    const url = new URL(source);
    if (url.origin !== origin || !url.pathname.startsWith(base) || !url.pathname.endsWith('/') || url.search || url.hash) {
      throw new Error(`Sitemap page is outside the locale documentation scope: ${source}`);
    }
    const route = decodeURIComponent(url.pathname.slice(base.length));
    if (/[\\\0:]/.test(route) || route.split('/').some((part) => part === '.' || part === '..')) throw new Error(`Unsafe documentation path: ${source}`);
    if (seen.has(source)) throw new Error(`Duplicate sitemap page: ${source}`);
    seen.add(source);
    const file = await realpath(resolve(root, route, 'index.html'));
    if (!staysWithin(root, file)) throw new Error(`Documentation file escapes output directory: ${source}`);
    const document = parse(await readFile(file, 'utf8'));
    const meta = all(document, (node) => node.tagName === 'meta');
    const excluded = meta.some((node) => /^(robots|googlebot)$/i.test(attr(node, 'name') || '')
      && /\b(noindex|none)\b/i.test(attr(node, 'content') || ''));
    const redirect = meta.some((node) => (attr(node, 'http-equiv') || '').toLowerCase() === 'refresh');
    const canonical = all(document, (node) => node.tagName === 'link' && (attr(node, 'rel') || '').split(/\s+/).includes('canonical'));
    if (excluded || redirect || canonical.length !== 1 || attr(canonical[0], 'href') !== source) {
      skipped += 1;
      continue;
    }
    const article = all(document, (node) => hasClass(node, 'theme-doc-markdown'))[0];
    if (!article) {
      if (!route) { skipped += 1; continue; }
      throw new Error(`Indexed page is missing its documentation article: ${source}`);
    }
    // The theme places translation provenance immediately before the article
    // body. Preserve the actual notice and its English-source link, not UI asides.
    const translationNotes = all(document, (node) => node.tagName === 'aside'
      && (attr(node, 'class') || '').split(/\s+/).some((name) => /^translationNote(?:_|$)/.test(name)));
    const body = [
      ...translationNotes.map((note) => articleText({childNodes: children(note)}, source)),
      articleText(article, source),
    ].filter(Boolean).join('\n\n');
    if (!body) throw new Error(`Documentation article is empty: ${source}`);
    const updated = contentDate(document, lastmod);
    articles.push(`Source: ${source}\nLanguage: ${locale}${updated ? `\nLast updated: ${updated}` : ''}\n\n${body}`);
  }
  if (!articles.length) throw new Error(`No documentation articles were exported for ${locale}`);
  const output = `# AIPOCH Open-Science Documentation (${locale})\n\nDocumentation article text extracted from the rendered pages. Images are represented by their descriptions and URLs; linked files are not embedded. Each article retains its source URL and available content modification date.\n\n${articles.join('\n\n---\n\n')}\n`;
  await writeFile(join(root, 'llms-full.txt'), output);
  return {articleCount: articles.length, skipped, bytes: Buffer.byteLength(output)};
}
