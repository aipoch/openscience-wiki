import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function Logo() {
  return (
    <span className="flex items-center gap-2.5 font-semibold tracking-tight">
      <span
        aria-hidden="true"
        className="relative grid size-7 place-items-center rounded-full border border-fd-primary/40"
      >
        <span className="size-2 rounded-full bg-fd-primary" />
      </span>
      <span>AIPOCH</span>
      <span className="hidden text-fd-muted-foreground sm:inline">/</span>
      <span className="hidden font-normal text-fd-muted-foreground sm:inline">
        Open Science
      </span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/aipoch/open-science',
    nav: {
      title: <Logo />,
      transparentMode: 'top',
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'Install',
        url: '/docs/getting-started/installation',
      },
      {
        text: 'Troubleshooting',
        url: '/docs/reference/troubleshooting',
      },
      {
        text: 'AIPOCH.com',
        url: 'https://aipoch.com',
        external: true,
      },
    ],
  };
}
