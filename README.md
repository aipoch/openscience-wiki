# Open Science Wiki

This repository contains the official operating and reproducibility documentation for [AIPOCH Open Science](https://github.com/aipoch/open-science). The site uses [Docusaurus](https://docusaurus.io/), and AIPOCH.com can sync the current Wiki pages and product screenshots from this repository.

English is the default language and is served from `/docs/`. Simplified Chinese is available at `/docs/zh-Hans/`. The locale registry and translation layout allow maintainers to add more languages without changing existing document URLs.

## Content structure

- `docs/` contains the English documentation source; `docs/intro.mdx` is served at `/docs/intro`.
- `i18n/<locale>/docusaurus-plugin-content-docs/current/` contains translated documentation with the same file structure as `docs/`.
- Each `_category_.json` file sets a sidebar section label and description.
- `static/img/open-science/` contains screenshots captured from a running Open Science installation.
- `src/pages/` and `src/css/` contain the localized home page and AIPOCH theme changes.
- `i18n.config.mjs` defines the default language and every published locale.
- `scripts/check-english.mjs` keeps the README and default source content in English.
- `scripts/check-i18n.mjs` checks document parity and required interface translations.

## Run locally

Use Node.js 20 or later.

```bash
npm install
npm start
```

The development server opens [http://localhost:3000/docs/](http://localhost:3000/docs/). Use a locale-specific development command when you only need one language:

```bash
npm run start:en
npm run start:zh
```

Test all published languages before releasing:

```bash
npm run check
npm run build
npm run serve
```

## Run the production container

Build and start the Nginx runtime with Docker Compose:

```bash
docker compose up --build -d
```

The generated sitemap is available as an XML API at
`http://localhost:3002/sitemap`. Set `PORT` to publish the container on a
different host port. The repository-managed Nginx configuration serves this
endpoint directly without a redirect.

## Edit documentation

Add or update a Markdown file under `docs/`, then set its `sidebar_position` in front matter. Keep sibling positions unique. Store product captures in `static/img/open-science/` and reference them with a public path:

```md
![Describe the visible application state](/img/open-science/example.png)
```

Run `npm run check` before committing. The production build runs the same checks and stops when default source content contains Chinese text, a translated document is missing, or a required interface translation is absent.

## Add another language

1. Add the Docusaurus locale code, label, HTML language, and direction to `i18n.config.mjs`.
2. Run `npm run write-translations -- --locale <locale>` to create the shared interface files.
3. Copy `docs/` to `i18n/<locale>/docusaurus-plugin-content-docs/current/` and keep every relative path unchanged.
4. Translate the copied documents and interface message values.
5. Build the site and inspect the new locale locally before publishing.

## Related repositories

- [AIPOCH Open Science](https://github.com/aipoch/open-science)
- [Open Science Wiki](https://github.com/aipoch/openscience-wiki)
