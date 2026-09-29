const XHTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';

function escapeXml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  })[character]);
}

function localePageUrl(url, sourceLocale, targetLocale, context) {
  const source = context.i18n.localeConfigs[sourceLocale];
  const target = context.i18n.localeConfigs[targetLocale];
  const parsed = new URL(url);
  const sourceBase = source.baseUrl;
  const relativePath = parsed.pathname.startsWith(sourceBase)
    ? parsed.pathname.slice(sourceBase.length)
    : parsed.pathname.replace(/^\//, '');
  return new URL(`${target.baseUrl}${relativePath}`, target.url || context.siteConfig.url).href;
}

function addAlternateRefs(xml, context) {
  const sourceLocale = context.i18n.currentLocale;
  const htmlLangs = Object.fromEntries(context.i18n.locales.map((locale) => [
    locale,
    context.i18n.localeConfigs[locale].htmlLang,
  ]));
  const namespace = ` xmlns:xhtml="${XHTML_NAMESPACE}"`;
  const withNamespace = xml.includes('xmlns:xhtml=')
    ? xml
    : xml.replace('<urlset ', `<urlset${namespace} `);
  return withNamespace.replace(/<url>([\s\S]*?)<\/url>/g, (whole, entry) => {
    const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!loc || entry.includes('hreflang=')) return whole;
    const alternates = context.i18n.locales.map((locale) =>
      `    <xhtml:link rel="alternate" hreflang="${escapeXml(htmlLangs[locale])}" href="${escapeXml(localePageUrl(loc, sourceLocale, locale, context))}"/>`,
    );
    const defaultUrl = localePageUrl(loc, sourceLocale, context.i18n.defaultLocale, context);
    alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(defaultUrl)}"/>`);
    return `<url>${entry}\n${alternates.join('\n')}\n  </url>`;
  });
}

function createSitemapIndex(context) {
  const entries = context.i18n.locales.map((locale) => {
    const config = context.i18n.localeConfigs[locale];
    const location = new URL(`${config.baseUrl}sitemap.xml`, config.url || context.siteConfig.url).href;
    return `  <sitemap><loc>${location}</loc></sitemap>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</sitemapindex>\n`;
}

module.exports = {addAlternateRefs, createSitemapIndex};
