const {readFile, writeFile} = require('node:fs/promises');
const {join} = require('node:path');
const {addAlternateRefs, createSitemapIndex} = require('./locale-sitemap-utils.cjs');

module.exports = function localeSitemap(context) {
  return {
    name: 'wiki-locale-sitemap',
    async postBuild({outDir}) {
      const sitemapPath = join(outDir, 'sitemap.xml');
      try {
        const sitemap = await readFile(sitemapPath, 'utf8');
        await writeFile(sitemapPath, addAlternateRefs(sitemap, context));
      } catch (error) {
        // Docusaurus runs plugin postBuild hooks before the sitemap plugin has
        // finished in some locale builds. The build wrapper patches the file
        // after the child process exits, when the sitemap is guaranteed to be
        // present. Preserve unrelated filesystem errors.
        if (error.code !== 'ENOENT') throw error;
      }

      if (context.i18n.currentLocale === context.i18n.defaultLocale) {
        await writeFile(join(outDir, 'sitemap-index.xml'), createSitemapIndex(context));
      }
    },
  };
};
