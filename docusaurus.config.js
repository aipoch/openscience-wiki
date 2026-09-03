// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import {defaultLocale, localeConfigs, locales} from './i18n.config.mjs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open Science Wiki',
  tagline: 'A local-first AI workspace for reproducible scientific research',
  // Same file aipoch.com serves at /favicon.ico — 16/32/48 PNG-in-ICO.
  favicon: 'img/aipoch-favicon.ico',

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
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'aipoch',
  projectName: 'openscience-wiki',

  onBrokenLinks: 'throw',

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
        },
        blog: false,
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
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Open Science Docs',
          },
          {to: 'getting-started/installation', label: 'Install', position: 'left'},
          {
            to: 'reference/troubleshooting',
            label: 'Troubleshooting',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/aipoch/open-science',
            label: 'Open Science GitHub',
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
                label: 'Open Science',
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
                label: 'Open Science',
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
