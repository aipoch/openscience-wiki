// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import legacyDocRedirects from './src/data/legacy-doc-redirects.json';
import {themes as prismThemes} from 'prism-react-renderer';
import {defaultLocale, localeConfigs, locales, docsBaseUrl} from './i18n.config.mjs';
import screenshotImages from './src/remark/screenshot-images.js';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open-Science Wiki',
  tagline: 'A local-first AI workspace for reproducible scientific research',
  // Same file aipoch.com serves at /favicon.ico — 16/32/48 PNG-in-ICO.
  favicon: 'img/aipoch-favicon.ico',

  // Docusaurus emits og:title/description/image/url and twitter:card/image by
  // default. These are the site-level tags it does not derive on its own.
  // twitter:title/description are page-level and live in src/pages/index.js.
  headTags: [
    {tagName: 'meta', attributes: {property: 'og:type', content: 'website'}},
    {tagName: 'meta', attributes: {property: 'og:site_name', content: 'Open-Science Wiki'}},
    {tagName: 'meta', attributes: {name: 'twitter:site', content: '@AIPOCH_AI'}},
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    // Docusaurus 3.10.2's Rspack server bundle leaves route-registry
    // require.resolveWeak calls untransformed. Keep the stable Webpack path.
    faster: false,
  },

  // Set the production url of your site here
  url: 'https://aipoch.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: docsBaseUrl,
  // Keep generated URLs consistent with the directory URLs served by Nginx.
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'aipoch',
  projectName: 'openscience-wiki',

  onBrokenLinks: 'throw',

  themes: [['./src/plugins/localized-search.cjs', {
    hashed: 'filename',
    docsRouteBasePath: '/',
    indexDocs: true,
    indexBlog: false,
    indexPages: false,
    // Keep old bookmarks working without returning navigation-only bridge pages in search.
    ignoreFiles: [],
    highlightSearchTermsOnTargetPage: true,
    explicitSearchResultPath: true,
    searchBarShortcutHint: true,
    fuzzyMatchingDistance: 0,
  }]],

  // Preserve old bookmarks after the requested Changelog URL rename.
  // This produces static client redirects for each locale, without server changes.
  plugins: ['./src/plugins/locale-sitemap.cjs', ['@docusaurus/plugin-client-redirects', {
    redirects: [
      ...Object.entries(legacyDocRedirects).map(([from, to]) => ({from: `/${from}/`, to: `/${to}/`})),
      {from: '/releases/v0-26-0/', to: '/changelog/v0-26-0/'},
      {from: '/releases/v0-25-1/', to: '/changelog/v0-25-1/'},
      {from: '/category/reference-and-troubleshooting/', to: '/reference/'},
    ],
  }]],

  // Keep the locale registry separate so more overseas languages can be added
  // without changing the rest of the site configuration.
  i18n: {
    defaultLocale,
    locales,
    localeConfigs,
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          remarkPlugins: [screenshotImages],
          // Read explicit content dates even when Git is absent in Docker.
          showLastUpdateTime: true,
        },
        blog: false,
        sitemap: {
          lastmod: 'date',
          createSitemapItems: async ({defaultCreateSitemapItems, ...params}) => {
            // Missing dates must stay absent: the default fallback queries Git,
            // which is unavailable in the production Docker build context.
            const withExplicitDates = (routes) => routes.map((route) => ({
              ...route,
              metadata: {
                ...route.metadata,
                lastUpdatedAt: route.metadata?.lastUpdatedAt ?? null,
              },
              ...(route.routes && {routes: withExplicitDates(route.routes)}),
            }));
            const items = await defaultCreateSitemapItems({
              ...params,
              routes: withExplicitDates(params.routes),
            });
            // The client-side search page has no standalone search value.
            return items.filter((item) => !/\/search\/$/.test(item.url));
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/open-science/conversation-completed.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'AIPOCH',
        logo: {
          alt: 'AIPOCH',
          src: 'img/aipoch-logo.svg',
          srcDark: 'img/aipoch-logo-dark.svg',
        },
        items: [
          {
            href: 'https://aipoch.com/open-science',
            position: 'left',
            label: 'Open-Science',
          },
          {to: 'guides/installation', label: 'Install', position: 'left'},
          {
            to: 'guides/troubleshooting',
            label: 'Troubleshooting',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/aipoch/open-science',
            label: 'Open-Science GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Open-Science',
                to: '/',
              },
              {
                label: 'Control index',
                to: 'reference/control-index',
              },
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'Open-Science',
                href: 'https://github.com/aipoch/open-science',
              },
              {
                label: 'Wiki source',
                href: 'https://github.com/aipoch/openscience-wiki',
              },
              {
                label: 'Report an issue',
                href: 'https://github.com/aipoch/open-science/issues',
              },
            ],
          },
          {
            title: 'AIPOCH',
            items: [
              {
                label: 'Website',
                href: 'https://aipoch.com',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} AIPOCH · All Rights Reserved.`,
      },
      prism: {
        // AIPOCH style: code blocks stay dark in both light and dark mode
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
      },
    }),
};

export default config;
