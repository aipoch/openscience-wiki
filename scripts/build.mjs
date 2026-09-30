import {spawnSync} from 'node:child_process';
import {readdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {addAlternateRefs, createSitemapIndex} from '../src/plugins/locale-sitemap-utils.cjs';
import {patchDocumentMetadata} from '../src/plugins/seo-metadata.cjs';
import {defaultLocale, localeConfigs, locales} from '../i18n.config.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = fileURLToPath(new URL('../node_modules/@docusaurus/core/bin/docusaurus.mjs', import.meta.url));

// Production and development use different route chunk names. A build must not
// overwrite the registry being watched by an already-open development preview.
const args = process.argv.slice(2);
const hasLocale = args.some((arg) => arg === '--locale' || arg.startsWith('--locale='));
const explicitLocale = args.find((arg) => arg === '--locale')
  ? args[args.indexOf('--locale') + 1]
  : args.find((arg) => arg.startsWith('--locale='))?.slice('--locale='.length);

function buildContext(locale) {
  return {
    siteConfig: {url: 'https://aipoch.com'},
    i18n: {currentLocale: locale, defaultLocale, locales, localeConfigs},
  };
}

function patchLocaleSitemap(locale) {
  const outputDirectory = join(root, 'build', locale === defaultLocale ? '' : locale);
  const sitemapPath = join(outputDirectory, 'sitemap.xml');
  try {
    const sitemap = readFileSync(sitemapPath, 'utf8');
    writeFileSync(sitemapPath, addAlternateRefs(sitemap, buildContext(locale)));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

function patchLocaleMetadata(locale) {
  const outputDirectory = join(root, 'build', locale === defaultLocale ? '' : locale);
  const visit = (directory) => {
    for (const entry of readdirSync(directory, {withFileTypes: true})) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile() && entry.name.endsWith('.html')) {
        const html = readFileSync(file, 'utf8');
        const patched = patchDocumentMetadata(html, {locale});
        if (patched !== html) writeFileSync(file, patched);
      }
    }
  };
  if (statSync(outputDirectory, {throwIfNoEntry: false})) visit(outputDirectory);
}

// Search-local caches its first language pipeline at module scope. Separate
// processes prevent one edition's tokenizer leaking into the next build.
// Explicit locale base URLs preserve subdirectories for single-locale builds.
for (const locale of hasLocale ? [null] : locales) {
  const buildLocale = locale || explicitLocale || defaultLocale;
  const result = spawnSync(process.execPath, [cli, 'build', ...args, ...(locale ? ['--locale',locale] : [])], {
    cwd: root,
    stdio: 'inherit',
    env: {...process.env, DOCUSAURUS_GENERATED_FILES_DIR_NAME: '.docusaurus-build'},
  });
  if (result.error) console.error(result.error.message);
  if (result.status !== 0) process.exit(result.status ?? 1);
  patchLocaleSitemap(buildLocale);
  patchLocaleMetadata(buildLocale);
}

// Recreate the index after all locale builds have completed. This keeps the
// index correct even though each locale is built in a separate child process.
writeFileSync(join(root, 'build', 'sitemap-index.xml'), createSitemapIndex(buildContext(defaultLocale)));
