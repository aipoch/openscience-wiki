# AIPOCH Open Science Documentation

This repository contains the official operating and reproducibility guides for [AIPOCH Open Science](https://github.com/aipoch/open-science). The site uses [Fumadocs](https://www.fumadocs.dev/) with the Next.js App Router.

The published source is English-only. Every guide is based on repository review and local product runs. The 56 interface captures in `public/img/open-science` show the application states described by the text.

## Run locally

Use Node.js 22 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To test the production output:

```bash
npm run check
npm run build
npm run start
```

## Repository structure

- `content/docs/` contains 25 Markdown and MDX guides.
- `content/docs/meta.json` and the section-level `meta.json` files set navigation order and labels.
- `public/img/open-science/` contains verified product captures shared by the guides and home page.
- `src/app/` contains the Next.js routes, Fumadocs layouts, search endpoint, and metadata routes.
- `src/components/` contains the shared MDX and Mermaid renderers.
- `scripts/check-english.mjs` rejects Chinese characters in repository text sources.
- `source.config.ts` configures Fumadocs MDX, directive admonitions, and Mermaid diagrams.

## Edit documentation

Add or update a Markdown file under `content/docs`, then place its slug in the matching `meta.json` file. Every document needs English `title` front matter. Add a short `description` when it helps search results and page metadata.

Store new product captures in `public/img/open-science` and reference them with an absolute public path:

```md
![Describe the visible application state](/img/open-science/example.png)
```

Run `npm run check` before committing. The command checks the English-only rule, ESLint, generated route types, and TypeScript.

## Related repositories

- [AIPOCH Open Science](https://github.com/aipoch/open-science)
- [Open Science documentation](https://github.com/aipoch/openscience-wiki)
