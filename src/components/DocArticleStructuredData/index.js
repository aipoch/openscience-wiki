import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {applyTrailingSlash} from '@docusaurus/utils-common';
import {localeConfigs} from '../../../i18n.config.mjs';

const organizationId = 'https://aipoch.com/#organization';
const productId = 'https://aipoch.com/#open-science';

function absoluteUrl(siteUrl, pathname) {
  return new URL(pathname, siteUrl).href;
}

export default function DocArticleStructuredData() {
  const {i18n, siteConfig} = useDocusaurusContext();
  const {metadata, frontMatter} = useDoc();
  const localeConfig = localeConfigs[i18n.currentLocale];
  const canonical = absoluteUrl(siteConfig.url, applyTrailingSlash(metadata.permalink, {
    trailingSlash: siteConfig.trailingSlash,
    baseUrl: siteConfig.baseUrl,
  }));
  const docsHome = absoluteUrl(siteConfig.url, localeConfig.baseUrl);
  const dateModified = frontMatter.last_update?.date;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${canonical}#techarticle`,
    url: canonical,
    mainEntityOfPage: {'@id': canonical},
    headline: metadata.title,
    description: metadata.description,
    inLanguage: localeConfig.htmlLang,
    author: {'@id': organizationId},
    publisher: {'@id': organizationId},
    isPartOf: {'@id': `${docsHome}#website`},
    about: {'@id': productId},
    ...(dateModified ? {dateModified} : {}),
  };

  return <Head>
    <script type="application/ld+json">{JSON.stringify(schema)}</script>
  </Head>;
}
