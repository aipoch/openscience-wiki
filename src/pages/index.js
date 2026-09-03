import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.tagline">
            A local-first AI workspace for reproducible scientific research
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="intro">
            <Translate id="homepage.readDocs">Read the documentation</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const guides = [
    {
      id: 'getting-started',
      title: translate({id: 'homepage.guides.gettingStarted.title', message: 'Get started'}),
      description: translate({
        id: 'homepage.guides.gettingStarted.description',
        message:
          'Install the desktop app and configure the agent, model, notebook runtimes, and data location.',
      }),
      to: 'getting-started/installation',
    },
    {
      id: 'workspace',
      title: translate({id: 'homepage.guides.workspace.title', message: 'Research workspace'}),
      description: translate({
        id: 'homepage.guides.workspace.description',
        message:
          'Work with conversations, attachments, previews, permissions, notebooks, and provenance records.',
      }),
      to: 'workspace/conversation',
    },
    {
      id: 'settings',
      title: translate({id: 'homepage.guides.settings.title', message: 'Settings and reference'}),
      description: translate({
        id: 'homepage.guides.settings.description',
        message: 'Configure all 13 settings panels and find any action in the control index.',
      }),
      to: 'settings/overview',
    },
  ];

  return (
    <Layout
      title={translate({id: 'homepage.meta.title', message: 'Open Science documentation'})}
      description={translate({
        id: 'homepage.meta.description',
        message:
          'Operating, configuration, and research reproducibility guides for AIPOCH Open Science',
      })}>
      <HomepageHeader />
      <main>
        <section className={styles.guideSection}>
          <div className="container">
            <div className="row">
              {guides.map((guide) => (
                <div className="col col--4" key={guide.id}>
                  <Link className={styles.guideCard} to={guide.to}>
                    <Heading as="h2">{guide.title}</Heading>
                    <p>{guide.description}</p>
                    <span>
                      <Translate id="homepage.openGuide">Open guide →</Translate>
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
