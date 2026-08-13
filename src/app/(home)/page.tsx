import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenText,
  Camera,
  Code2,
  FileText,
  FolderTree,
  SlidersHorizontal,
  Wrench,
} from 'lucide-react';

const guides = [
  {
    title: 'Get started',
    description: 'Install the desktop app, finish setup, and create a project.',
    href: '/docs/getting-started/installation',
    icon: BookOpenText,
  },
  {
    title: 'Workspace',
    description: 'Use sessions, files, previews, notebooks, and provenance records.',
    href: '/docs/workspace/home-projects',
    icon: FolderTree,
  },
  {
    title: 'Settings',
    description: 'Configure models, agents, permissions, runtimes, and storage.',
    href: '/docs/settings/overview',
    icon: SlidersHorizontal,
  },
  {
    title: 'Reference',
    description: 'Find every control, supported format, shortcut, and known fix.',
    href: '/docs/reference/control-index',
    icon: Wrench,
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_14%,color-mix(in_srgb,var(--color-fd-primary)_14%,transparent),transparent_42%),linear-gradient(to_bottom,transparent,var(--color-fd-muted)_115%)]" />
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 pb-16 pt-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-28">
          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.18em] text-fd-primary">
              OPEN SCIENCE DOCUMENTATION
            </p>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Research software you can inspect, run, and reproduce.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-fd-muted-foreground sm:text-xl">
              Learn every page and control in AIPOCH Open Science, from local
              setup to agent sessions, notebook runs, file previews, and
              provenance review.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-fd-primary px-5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
              >
                Read the documentation
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://github.com/aipoch/open-science"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border bg-fd-background/70 px-5 text-sm font-medium transition-colors hover:bg-fd-accent"
              >
                <Code2 className="size-4" />
                View source
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-fd-primary/10 blur-3xl" />
            <div className="overflow-hidden rounded-2xl border bg-fd-card p-2 shadow-2xl shadow-fd-primary/10 sm:p-3">
              <Image
                src="/img/open-science/conversation-completed.png"
                alt="A completed Open Science research conversation"
                width={1440}
                height={900}
                priority
                className="rounded-xl border"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-fd-card/30">
        <div className="mx-auto grid max-w-[1480px] divide-y px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-10">
          <div className="flex items-center gap-4 py-7 sm:px-6">
            <FileText className="size-5 text-fd-primary" />
            <div><strong className="block text-xl">25</strong><span className="text-sm text-fd-muted-foreground">task-focused guides</span></div>
          </div>
          <div className="flex items-center gap-4 py-7 sm:px-6">
            <Camera className="size-5 text-fd-primary" />
            <div><strong className="block text-xl">56</strong><span className="text-sm text-fd-muted-foreground">verified interface captures</span></div>
          </div>
          <div className="flex items-center gap-4 py-7 sm:px-6">
            <BookOpenText className="size-5 text-fd-primary" />
            <div><strong className="block text-xl">v0.14.0</strong><span className="text-sm text-fd-muted-foreground">documented application version</span></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-fd-primary">
            Find your next task
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Follow the product from setup to audit.
          </h2>
          <p className="mt-4 text-lg leading-8 text-fd-muted-foreground">
            Each guide names the visible controls, explains what changes, and
            shows the matching interface state.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.title}
                href={guide.href}
                className="group rounded-2xl border bg-fd-card p-6 transition-[border-color,transform,box-shadow] hover:-translate-y-1 hover:border-fd-primary/40 hover:shadow-lg"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-fd-primary/10 text-fd-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-8 text-lg font-semibold">{guide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                  {guide.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fd-primary">
                  Open guide
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-2 px-5 py-8 text-sm text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span>AIPOCH Open Science documentation.</span>
          <span>Built from tested product behavior and repository evidence.</span>
        </div>
      </footer>
    </main>
  );
}
