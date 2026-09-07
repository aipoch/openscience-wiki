# Repository Agent Instructions

## Project nature and main-site integration

Open Science Wiki is the Docusaurus documentation site for AIPOCH Open Science. It is integrated with the AIPOCH main website through path-based routing composition: two separately served applications share the public origin `https://aipoch.com`.

- The public gateway forwards only the `/docs` route namespace (`/docs` and `/docs/...`) to this Wiki. The domain root `/` and all other public routes belong to the main website. A similar prefix such as `/docs-other` is outside the Wiki namespace.
- The integration preserves the `/docs/` prefix when forwarding Wiki requests. The current `docusaurus.config.js` sets `url: 'https://aipoch.com'`, `baseUrl: '/docs/'`, and the docs plugin's `routeBasePath: '/'`. The deployment prefix is applied once: `docs/intro.mdx` becomes `/docs/intro`, not `/docs/docs/intro`.
- English is served under `/docs/`; Simplified Chinese is served under `/docs/zh-Hans/`. Pages, generated scripts, styles, images, and other Wiki assets must resolve within `/docs/`, including locale-specific paths where applicable.
- This is integration at the HTTP routing boundary. Do not assume the Wiki shares the main site's React tree, client router, application state, authentication, or backend APIs merely because it shares the domain.
- Navigation within the Wiki should use Docusaurus routing and locale handling. Navigation to the main site must leave the Wiki client router through a normal document navigation. Preserve the existing navbar logo contract in `src/theme/Navbar/Logo/index.js`: `pathname:///` returns to the current origin's `/` in the same tab, without adding the Wiki base path or locale.
- Container endpoints do not define public gateway routes. For example, `nginx/default.conf` serves `/sitemap` inside the Wiki service, but this does not make `https://aipoch.com/sitemap` a Wiki-owned route or imply public forwarding outside `/docs`. Verify any main-site consumer or gateway contract separately.

Treat this routing boundary as a compatibility requirement for every feature. Read the current configuration and relevant implementation before making assumptions; changing the boundary or its hosting configuration remains subject to the protected system-configuration gate below.

## Community best practices for every feature

Every agent-authored feature must follow established community best practices appropriate to the repository's installed Docusaurus, React, and web-platform versions. Apply these requirements to each feature:

1. **Use supported framework patterns.** Check version-compatible official documentation and nearby repository conventions before implementation. Prefer built-in Docusaurus components, hooks, plugins, and supported extension points over custom routing, copied framework internals, or unnecessary dependencies. Keep changes focused. If a documented approach is incompatible, record the reason, chosen alternative, and tradeoffs in the delivery notes.
2. **Respect base paths and locales.** Use Docusaurus `Link`, document links, and base-URL helpers as appropriate to the API being used. Avoid manually concatenating `/docs` or locale prefixes. In JSX, import static assets or resolve them with `useBaseUrl`; a raw `<img src="/img/...">` targets the main site's root. Markdown asset syntax such as `![Description](/img/...)` is processed by Docusaurus and is different from raw JSX. Inspect the resulting URLs for missing or duplicated prefixes.
3. **Preserve rendering and maintainability.** Keep components focused, reuse the theme and existing design conventions, and obey React's Rules of Hooks. Keep browser-only APIs out of module initialization and server rendering; use SSR-safe framework APIs or an appropriate client-only lifecycle. Do not introduce hydration mismatches or unnecessary client JavaScript for static content.
4. **Build accessible, responsive interfaces.** Use semantic HTML, meaningful link text and image alternatives, keyboard-operable controls, visible focus states, and accessible names. Check affected layouts on narrow and wide viewports and in supported color modes. Prefer native elements and existing accessible components before custom interaction code.
5. **Preserve documentation quality and compatibility.** Keep English source content and corresponding translations aligned with `i18n.config.mjs` and the established content structure. Preserve existing document IDs, slugs, anchors, and public URLs unless a change is explicitly part of the task. Use accurate headings and metadata, and keep links, assets, and locale switching functional.
6. **Respect the shared origin.** Do not assume a path prefix is a security boundary. Avoid broad service-worker scopes or changes to shared cookies and storage that could affect the main site; namespace any new Wiki-owned client state. Never embed secrets in client bundles or generated pages. Treat untrusted content safely and avoid unsanitized HTML injection.
7. **Verify observable behavior.** Define acceptance criteria before implementation and add or update relevant regression coverage for behavior changes. Use the validation requirements below and report actual results, limitations, and any justified departure from these practices. A claim that code follows “best practices” is not a substitute for evidence.

Use authoritative guidance rather than treating these instructions as a frozen copy of framework documentation:

- [Docusaurus deployment and base URL](https://docusaurus.io/docs/deployment)
- [Docusaurus routing and escaping SPA navigation](https://docusaurus.io/docs/advanced/routing)
- [Docusaurus static assets](https://docusaurus.io/docs/static-assets)
- [React rules](https://react.dev/reference/rules)
- [W3C accessibility fundamentals](https://www.w3.org/WAI/fundamentals/accessibility-principles/)

## Validation and delivery evidence

- Run `npm run check` for documentation and feature changes. For site behavior, content, routing, assets, or locale changes, also run `npm run build` to validate all published locales. Fix relevant failures; do not disable the existing content or broken-link checks to make a build pass.
- After building, run `node --test tests/*.test.mjs` for changes affecting rendered behavior; the existing navbar logo tests require generated English and Chinese HTML. Add focused tests where the changed behavior is not already covered.
- For navigation or UI changes, serve the production build with `npm run serve` and inspect the affected English and Chinese routes: direct entry, deep-link refresh, internal links, locale switching, asset loading, and return to the main-site root. Check applicable keyboard, viewport, color-mode, console, and hydration behavior. A Wiki-only local server does not host the main site, so distinguish a correct root link from verified main-site integration.
- For agent-instruction-only changes, check the instructions against the current source and configuration, run `npm run check` and `git diff --check`, and review the full diff. A site build or browser test is required only if the change also affects the site.
- Report the exact validation commands and outcomes. Distinguish local build or rendered-output evidence from public gateway or production verification; do not claim the latter without exercising that environment under the required authorization.
- Use Conventional Commits. Keep pull-request descriptions focused on the change and validation; do not include TAPD information.

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
