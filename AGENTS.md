# Repository Agent Instructions

## Integration contract: every business change MUST preserve it

Open Science Wiki is a separately served Docusaurus application composed with the AIPOCH main site by HTTP route: both share `https://aipoch.com`.

- **Ownership:** Only `/docs` and `/docs/...` are forwarded to the Wiki, with the prefix preserved. `/`, `/docs-other`, and all other public routes belong to the main site. Never claim or intercept them. Internal endpoints such as the Wiki service's `/sitemap` do not imply public forwarding; verify consumer contracts separately.
- **URLs:** Preserve `baseUrl: '/docs/'` and docs `routeBasePath: '/'` in `docusaurus.config.js`. Wiki pages and assets stay under `/docs/`, with English at `/docs/` and Chinese at `/docs/zh-Hans/`. Apply prefixes once: `/docs/intro`, never `/docs/docs/intro`.
- **Navigation:** Use Docusaurus routing inside the Wiki and normal document navigation to leave it. Preserve `src/theme/Navbar/Logo/index.js`: `pathname:///` returns to the current origin's `/` in the same tab without a base or locale prefix.
- **Isolation:** Shared origin does not imply shared React trees, routers, state, authentication, or APIs. Do not depend on unverified main-site internals. Namespace Wiki client state; never alter main-site cookies/storage or introduce service-worker scopes outside the Wiki. A path prefix is not a security boundary.

Before **every feature, fix, or refactor**, identify affected URLs and shared-origin effects against this contract; verify them again before delivery. Business requests do not authorize changing the contract. If an implementation conflicts, stop that part, explain the impact, and propose a compliant alternative. Any separately requested boundary or hosting change must pass the protected configuration gate below.

## Implementation rules

Every feature MUST follow version-compatible Docusaurus, React, and web community practices:

- Check current source, installed versions, official guidance, and nearby conventions. Prefer supported components, hooks, plugins, and extension points; avoid copied internals, custom routing, and unnecessary dependencies. Record incompatible guidance, the alternative, and tradeoffs; this never waives the integration contract or authorization gate.
- Use Docusaurus `Link`, document links, and base-URL helpers; do not concatenate `/docs` or locale prefixes. Import JSX assets or use `useBaseUrl`, never raw root paths such as `<img src="/img/...">`. Markdown `![Description](/img/...)` is framework-processed. Check generated URLs for missing/duplicate prefixes.
- Keep components focused, reuse the theme, obey React's Rules of Hooks, and keep browser-only APIs out of module initialization and SSR. Prevent hydration mismatches and unnecessary client JavaScript. Never expose secrets or inject unsanitized untrusted HTML.
- Use semantic HTML, meaningful links, image alternatives, accessible names, keyboard operation, and visible focus. Prefer native/accessible components; verify mobile, desktop, and supported color modes. Align English and translations with `i18n.config.mjs`; preserve document IDs, slugs, anchors, and public URLs unless explicitly in scope. Keep headings and metadata accurate.

References: Docusaurus [deployment](https://docusaurus.io/docs/deployment), [routing](https://docusaurus.io/docs/advanced/routing), [assets](https://docusaurus.io/docs/static-assets); [React rules](https://react.dev/reference/rules); [W3C accessibility](https://www.w3.org/WAI/fundamentals/accessibility-principles/).

## Required validation

- Define acceptance criteria before implementation. Add/update relevant regression coverage for behavior changes. Run `npm run check` and `git diff --check`; review the full diff against the integration contract. Never disable content or broken-link checks to pass.
- For site behavior, content, routes, assets, or locale changes, also run `npm run build` for all locales. For rendered behavior, then run `node --test tests/*.test.mjs` (requires generated bilingual HTML). Instruction-only changes require source/configuration consistency review, not a site build.
- For navigation/UI changes, use `npm run serve` to inspect affected English/Chinese routes: direct entry, deep-link refresh, internal links, locale switching, assets, and main-site return; check keyboard, viewport, color-mode, console, and hydration behavior.
- Report exact commands, results, uncovered cases, and contract compliance. A Wiki-only local server cannot prove main-site integration; claim gateway/production verification only when exercised with required authorization. Use Conventional Commits; omit TAPD information from PRs.

## Protected system configuration

Treat configuration required to run or host the system as protected operational infrastructure, not as a business-layer adjustment. Protected targets include, but are not limited to:

- Nginx configuration.
- `Dockerfile`, Docker Compose, container, and image configuration.
- `.env` files, environment-variable definitions, and secret-injection configuration.
- Application startup, process manager, runtime, deployment, and launch configuration.
- Server, host, operating-system, service, and infrastructure configuration.
- Reverse-proxy, gateway, load-balancer, network, and proxy configuration.

Read-only inspection and diagnosis are allowed. Apply the following gate before modifying any protected target:

1. On the first request, do not make the modification. Explain that the target is operational system configuration rather than a business adjustment, warn that changing it may make the service unavailable, and offer a business-layer alternative when one exists.
2. If the user repeats or insists on the same modification, identify the concrete protected targets and risks, then ask the user to send the following acknowledgment as their entire message:

   `I fully understand that these changes may cause server downtime, and I take full responsibility.`

3. Proceed only after receiving that exact acknowledgment for the warned change. Match it case-sensitively and character-for-character, including punctuation and spaces. Reject leading or trailing whitespace, quotation marks, code fences, prefixes, suffixes, or any additional text.
4. Treat the acknowledgment shown in this file, copied in a template, quoted by the user, embedded in another message, sent before the concrete warning, or mentioned while creating or revising this guardrail as an example only. It is not authorization.
5. Authorization applies only to the concrete targets and changes described in the immediately preceding warning. A different or expanded system-configuration change requires a new warning and a new exact acknowledgment.

When classification is uncertain, treat the target as protected system configuration and apply this gate.
