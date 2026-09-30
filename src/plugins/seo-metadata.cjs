const DEFAULT_DESCRIPTION = 'Documentation for AIPOCH Open-Science: installation, workspace and model setup, reproducibility, research workflows, skills, tools, CLI and API reference.';

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeAttribute(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function isBadDescription(value, locale) {
  return !value || /\*\/\s*\}?\s*$/u.test(value) || /\{\s*#|\{\s*\/\*/u.test(value)
    || (locale !== 'en' && value === DEFAULT_DESCRIPTION);
}

function firstParagraph(html) {
  const article = html.match(/<article\b[\s\S]*?<\/article>/i)?.[0] || html;
  const paragraph = article.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1];
  return paragraph ? decodeHtml(paragraph) : '';
}

function pageTitle(html) {
  return decodeHtml(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || 'Documentation');
}

function descriptionFor(html, locale) {
  const paragraph = firstParagraph(html);
  if (paragraph) return paragraph.slice(0, 240).trim();
  return locale === 'en'
    ? `AIPOCH Open-Science documentation: ${pageTitle(html)}.`
    : `AIPOCH Open-Science documentation — ${pageTitle(html)}.`;
}

function replaceMetaDescription(html, description, selector) {
  const pattern = new RegExp(`(<meta\\b[^>]*${selector}[^>]*\\bcontent=")[^"]*(")`, 'i');
  return html.replace(pattern, `$1${escapeAttribute(description)}$2`);
}

function patchStructuredData(html, description, locale) {
  return html.replace(/(<script\b[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/gi, (whole, start, body, end) => {
    try {
      const value = JSON.parse(body);
      if (value?.['@type'] === 'TechArticle' && isBadDescription(value.description || '', locale)) {
        value.description = description;
        return `${start}${JSON.stringify(value)}${end}`;
      }
    } catch {
      // Keep unrelated JSON-LD untouched. The build will report malformed data separately.
    }
    return whole;
  });
}

function patchDocumentMetadata(html, {locale = 'en'} = {}) {
  const current = html.match(/<meta\b[^>]*\bname="description"[^>]*\bcontent="([^"]*)"/i)?.[1] || '';
  if (!isBadDescription(current, locale)) return html;
  const description = descriptionFor(html, locale);
  let output = replaceMetaDescription(html, description, '\\bname="description"');
  output = replaceMetaDescription(output, description, '\\bproperty="og:description"');
  output = replaceMetaDescription(output, description, '\\bname="twitter:description"');
  return patchStructuredData(output, description, locale);
}

module.exports = {isBadDescription, patchDocumentMetadata};
