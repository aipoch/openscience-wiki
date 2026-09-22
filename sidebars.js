// @ts-check
const outlines = {guides: require('./src/data/guides-outline.json'), ...require('./src/data/section-outlines.json')};
const written = (id) => outlines[id].groups.flatMap((group) => group.chapters)
  .filter((chapter) => chapter.contentStatus === 'written').map((chapter) => chapter.currentDoc);
const section = (id, label, extra = []) => ({
  type: 'category', label, collapsed: false, collapsible: false,
  customProps: {section: id, outlineReview: true},
  items: [...new Set([...extra, ...written(id)])],
});
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {tutorialSidebar: [
  section('guides', 'Guides', ['intro', 'settings/overview']),
  section('workflows', 'Workflows'),
  section('tools', 'Explore tools'),
  section('skills', 'Skills'),
  section('specialists', 'Specialists'),
  section('reference', 'Reference', ['reference/index', 'reference/control-index',
    'reference/example-data', 'reference/connector-operations',
    'changelog/v0.32.0', 'changelog/v0.31.1', 'changelog/v0.31.0', 'changelog/v0.30.2', 'changelog/v0.30.1', 'changelog/v0.30.0', 'changelog/v0.29.0', 'changelog/v0.28.0', 'changelog/v0.27.0', 'changelog/v0.26.0', 'changelog/v0.25.1']),
]};
export default sidebars;
