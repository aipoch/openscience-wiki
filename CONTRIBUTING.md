# Collaborating on the Wiki

## Get the working copy

Clone the official repository:

```bash
git clone https://github.com/aipoch/openscience-wiki.git
cd openscience-wiki
git switch main
npm ci
npm run start:zh
```

Use Node.js 22 LTS or another version satisfying `package.json` (20 or newer). A local documentation preview does not need Open-Science installed or a model login. Product verification does require the actual app and appropriate authorized accounts.

`start:zh` previews only Simplified Chinese; `start` and `start:en` preview only English. Switching to another language on a development port returns a missing page. For multilingual review, run the full `npm run build` without `--locale`, then `npm run serve -- --host 127.0.0.1 --port 3025 --no-open`. Stop any development server using port 3025 first. All configured language paths, including `/docs/intro/`, `/docs/zh-Hans/intro/` and `/docs/ja/intro/`, will then work on that port. Rebuild after content edits and refresh the page. See [translation maintenance](i18n/README.md) for source editions, draft status and checks.

## Take one task

1. Read `AGENTS.md`, the relevant articles, and the current source or release evidence. Identify affected routes and verify the main-site integration contract before editing.
2. Create a focused task branch from current `main`. Preserve the repository history.
3. Update English and Simplified Chinese instructions together, and keep other translations structurally aligned. Follow [translation maintenance](i18n/README.md); do not promote machine translations to reviewed editions without language review.
4. Use the product name Open-Science, real public research inputs, and actual English-interface screenshots. Write the user action, expected result and recovery steps before supporting evidence.
5. Preserve limitations and distinguish source review, visual inspection, independent calculation and actual product execution. Keep private handoffs, raw evidence and internal audit records outside the public repository.

## Keep tutorials separate from internal review records

Public articles explain user actions, prerequisites, expected results and useful recovery steps. Keep pending-verification lists, test coverage inventories, rerun dates and editorial debugging history in private review records, outside `docs/`, translated articles and `static/`. Release notes describe product changes, not the Wiki team's testing progress.

When a test reveals a user-facing requirement or known issue, document the condition, its effect and the action the reader can take. Preserve actual product states and scientific limitations. Removing an internal audit note must never turn an incomplete operation into a claimed success. Keep screenshots and example outputs consistent with the steps and outcomes described.

## Validate and submit

```bash
npm run check
npm run build
node --test tests/docs-editorial.test.mjs tests/search-index.test.mjs
npm run serve
```

Use the repository's `npm run build`, `build:en` or `build:zh` scripts for validation. They keep build-generated files in `.docusaurus-build`, separate from the running preview's `.docusaurus` directory. Running `docusaurus build` directly while a preview is open can replace its route registry and break chapter links.

The development server normally uses port 3000; the built preview normally uses 3000 as well, so stop the other server or choose another port. Search needs a production build; inspect both `/docs/intro/` and `/docs/zh-Hans/intro/` in the local built preview. Windows users do not need Nginx or Docker for this flow. Additional inherited Nginx checks are for maintainers with that local runtime.

Push a review branch and open a PR targeting `aipoch/openscience-wiki:main`. Explain the resulting behavior, relevant checks, route compatibility and remaining limits. Do not merge or trigger publication as part of preparing the PR; follow `AGENTS.md` for deployment and live changes.

## Data and screenshots

In Chinese article tables, omit the final Chinese full stop (`。`) from each cell. Keep punctuation between sentences, and preserve code, filenames, URLs and version numbers. Apply the same convention to Simplified and Traditional Chinese. Use concise problem/check tables for troubleshooting when each issue has a corresponding action.

Do not commit keys, tokens, account exports, SSH settings, personal application databases, raw sessions or unreviewed logs. Review screenshots for visible secrets and unrelated content. Place approved chapter images in `static/img/open-science/`; files in this public repository are publicly accessible. Keep large recordings outside Git and share only through a team-approved private channel.

Use real English interfaces for both Open-Science and every visible operating-system or external-app surface: installers, file pickers, save dialogs, Settings, notification controls and text-editor menus/status bars. An English report inside a Chinese system window does not meet this requirement. Preserve real research content and filenames; do not translate pixels or synthesize screenshots. Use a suitable authorized test environment for recaptures and record version changes. This English-interface requirement supersedes the older handoff exception that allowed Chinese native UI.

Use ordinary Markdown image syntax for chapter screenshots in `static/img/open-science/`. The site applies the shared frame, padding and light shadow in both languages automatically. Do not add another frame or shadow to the image file. Existing native captures with external shadows use the reviewed window rectangles in `src/components/Screenshot/window-crops.json`; add an entry only after confirming that the crop removes no application content. Intentional detail views should use the shared `Screenshot` component and keep their existing access to the complete original. Small screenshots retain their natural size.

Store chapter screenshots as WebP, preserving their pixel dimensions, transparency and color profile. Prefer lossless compression; for dense captures that remain large, use high-quality compression and inspect small text at full size before accepting the result. Aim for about 100 KB per screenshot, without shrinking readable evidence just to meet that target. For example, use `cwebp -lossless -m 6 -exact -metadata icc input.png -o output.webp`, or compare `cwebp -q 90 -m 6 -sharp_yuv -exact -metadata icc input.png -o output.webp`. See the [encoder options](https://developers.google.com/speed/webp/docs/cwebp). Update every locale, complete-image link and window-crop entry when replacing an image. Keep SVG artwork, original research-output downloads and the PNG social-sharing image in their original formats.

Mark a concrete input-to-result walkthrough once at its start with `<p className="example-label"><strong>Worked example</strong> A specific task name</p>`. Use `Example` for a standalone prompt or configuration sample, with the corresponding label and meaning in Chinese. Reuse the existing introduction to explain the input and scope; identify sample-specific numbers as results of that example. These labels are ordinary paragraphs, so they do not create table-of-contents entries. Convert legacy example-prefixed headings to descriptive task headings with this same paragraph label, preserving their existing bookmark targets. For a collapsed case, place its label before the disclosure and use an action-oriented summary. Do not repeat labels within one continuous case. Leave routine installation, settings, reference tables and screenshots unlabelled unless they contain a separate case.

## Integration and publication

Preserve official deployment automation, the `/docs/` boundary, existing main-site return behavior and the legacy sitemap endpoints. Keep old document URLs and section bookmarks reachable through the shared redirect maps when reorganizing articles. Use the generated locale sitemap index for all configured editions. Local site checks do not prove the external gateway contract; merging or publishing requires the separate process in `AGENTS.md`.
