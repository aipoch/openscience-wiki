import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SectionIcon from '../components/DocumentationNavigation/SectionIcon';
import styles from './index.module.css';

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const docsHomeUrl =
    currentLocale === 'en'
      ? 'https://aipoch.com/docs/'
      : `https://aipoch.com/docs/${currentLocale}/`;
  const pageTitle = translate({
    id: 'homepage.meta.title',
    message: 'Open-Science Documentation',
  });
  const pageDescription = translate({
    id: 'homepage.meta.description',
    message: 'Documentation for AIPOCH Open-Science: installation, workspace and model setup, reproducibility, research workflows, skills, tools, CLI and API reference.',
  });
  const documentationSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://aipoch.com/#organization',
        name: 'AIPOCH',
        url: 'https://aipoch.com',
        logo: 'https://statics.aipoch.com/public/f/image/og-bfe41bdd.webp',
        sameAs: [
          'https://github.com/aipoch',
          'https://www.linkedin.com/company/pochai/',
          'https://www.youtube.com/@AIPOCH_AI',
          'https://x.com/aipoch_ai',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://aipoch.com/docs/#website',
        url: 'https://aipoch.com/docs/',
        name: 'Open-Science Wiki',
        inLanguage: currentLocale,
        publisher: {'@id': 'https://aipoch.com/#organization'},
        about: {'@id': 'https://aipoch.com/#open-science'},
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://aipoch.com/docs/#webpage',
        url: docsHomeUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: currentLocale,
        isPartOf: {'@id': 'https://aipoch.com/docs/#website'},
        about: {'@id': 'https://aipoch.com/#open-science'},
        publisher: {'@id': 'https://aipoch.com/#organization'},
        breadcrumb: {'@id': 'https://aipoch.com/docs/#breadcrumb'},
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://aipoch.com/docs/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'AIPOCH',
            item: 'https://aipoch.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Documentation',
            item: docsHomeUrl,
          },
        ],
      },
    ],
  };
  const leadPoints = [
    {
      title: translate({id: 'homepage.lead.model.title', message: 'Model choice'}),
      description: translate({id: 'homepage.lead.model.description', message: 'connect to supported model providers, a custom gateway, or a compatible local model server.'}),
    },
    {
      title: translate({id: 'homepage.lead.provenance.title', message: 'Local storage and provenance'}),
      description: translate({id: 'homepage.lead.provenance.description', message: 'project data and research outputs are stored locally, with available code, inputs, and execution records accessible for review.'}),
    },
    {
      title: translate({id: 'homepage.lead.guides.title', message: 'Practical guides'}),
      description: translate({id: 'homepage.lead.guides.description', message: 'set up your workspace, follow research workflows, and learn how to inspect and share your results.'}),
    },
  ];
  const steps = [
    {
      title: translate({id: 'homepage.steps.install.title', message: 'Install Open-Science'}),
      description: translate({id: 'homepage.steps.install.description', message: 'Choose your operating system.'}),
      to: 'guides/installation/',
    },
    {
      title: translate({id: 'homepage.steps.setup.title', message: 'Set up your workspace'}),
      description: translate({id: 'homepage.steps.setup.description', message: 'Connect a model and prepare your runtimes.'}),
      to: 'guides/onboarding/',
    },
    {
      title: translate({id: 'homepage.steps.firstResult.title', message: 'Create your first result'}),
      description: translate({id: 'homepage.steps.firstResult.description', message: 'Follow a project from input to saved output.'}),
      to: 'guides/first-project/',
    },
  ];
  const sections = [
    {
      id: 'guides',
      title: translate({id: 'homepage.sections.guides.title', message: 'Guides'}),
      description: translate({id: 'homepage.sections.guides.description', message: 'Projects, conversations, files and workspace settings.'}),
      to: 'intro/',
    },
    {
      id: 'workflows',
      title: translate({id: 'homepage.sections.workflows.title', message: 'Research workflows'}),
      description: translate({id: 'homepage.sections.workflows.description', message: 'Follow worked examples with real research data.'}),
      to: 'workflows/journal-club/',
    },
    {
      id: 'tools',
      title: translate({id: 'homepage.sections.tools.title', message: 'Explore tools'}),
      description: translate({id: 'homepage.sections.tools.description', message: 'Find databases, inspect files and run calculations.'}),
      to: 'tools/overview/',
    },
    {
      id: 'skills',
      title: translate({id: 'homepage.sections.skills.title', message: 'Skills'}),
      description: translate({id: 'homepage.sections.skills.description', message: 'Find, use and create reusable research methods.'}),
      to: 'skills/overview/',
    },
    {
      id: 'specialists',
      title: translate({id: 'homepage.sections.specialists.title', message: 'Specialists'}),
      description: translate({id: 'homepage.sections.specialists.description', message: 'Delegate focused tasks and review the results.'}),
      to: 'specialists/overview/',
    },
    {
      id: 'reference',
      title: translate({id: 'homepage.sections.reference.title', message: 'Reference'}),
      description: translate({id: 'homepage.sections.reference.description', message: 'Look up controls, file formats, the CLI and APIs.'}),
      to: 'reference/',
    },
  ];
  const topics = [
    {title: translate({id: 'homepage.topics.reproducibility', message: 'Reproducibility'}), to: 'guides/reproducibility/'},
    {title: translate({id: 'homepage.topics.packages', message: '.science research packages'}), to: 'guides/research-packages/'},
    {title: translate({id: 'homepage.topics.marketplace', message: 'Skill marketplace'}), to: 'skills/marketplace/'},
  ];

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <Head>
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">{JSON.stringify(documentationSchema)}</script>
      </Head>
      <main className={styles.home}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.marker} aria-hidden="true" />
              <Translate id="homepage.eyebrow">Documentation</Translate>
            </p>
            <Heading as="h1" className={styles.title}>Open-Science Documentation</Heading>
            <p className={styles.description}>
              <Translate id="homepage.lead">
                AIPOCH Open-Science is an open-source, local-first AI research workbench.
              </Translate>
            </p>
            <ul className={styles.leadList}>
              {leadPoints.map((point) => (
                <li key={point.title}>
                  <strong>{point.title}</strong> &mdash; {point.description}
                </li>
              ))}
            </ul>
            <div className={styles.actions}>
              <Link className={styles.primaryLink} to="intro/">
                <Translate id="homepage.readDocs">Read the documentation</Translate>
                <Arrow />
              </Link>
              <Link className={styles.textLink} to="guides/troubleshooting/">
                <Translate id="homepage.troubleshooting">Troubleshooting</Translate>
              </Link>
            </div>
          </div>
          <nav className={styles.getStarted} aria-labelledby="start-heading">
            <Heading as="h2" id="start-heading" className={styles.startTitle}>
              <Translate id="homepage.startHeading">Start here</Translate>
            </Heading>
            <ol className={styles.steps}>
              {steps.map((step, index) => (
                <li key={step.to}>
                  <Link className={styles.stepLink} to={step.to}>
                    <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                    <span className={styles.stepCopy}>
                      <strong>{step.title}</strong>
                      <span>{step.description}</span>
                    </span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        <section className={styles.directory} aria-labelledby="browse-heading">
          <Heading as="h2" id="browse-heading" className={styles.sectionTitle}>
            <Translate id="homepage.browseHeading">Explore the documentation</Translate>
          </Heading>
          <ul className={styles.sectionGrid}>
            {sections.map((section) => (
              <li key={section.id}>
                <Link className={styles.sectionLink} to={section.to}>
                  <span className={styles.sectionIcon}><SectionIcon section={section.id} /></span>
                  <div className={styles.sectionCopy}>
                    <Heading as="h3">{section.title}</Heading>
                    <p>{section.description}</p>
                  </div>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <nav className={styles.topics} aria-labelledby="topics-heading">
          <Heading as="h2" id="topics-heading" className={styles.topicsTitle}>
            <Translate id="homepage.topicsHeading">Go further</Translate>
          </Heading>
          <ul className={styles.topicLinks}>
            {topics.map((topic) => (
              <li key={topic.to}>
                <Link className={styles.topicLink} to={topic.to}>
                  <span>{topic.title}</span><Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </Layout>
  );
}
