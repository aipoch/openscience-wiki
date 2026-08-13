'use client';

import { renderMermaidSVG } from 'beautiful-mermaid';
import { useMemo } from 'react';

export function Mermaid({ chart }: { chart: string }) {
  const result = useMemo(() => {
    try {
      return {
        svg: renderMermaidSVG(chart, {
          bg: 'var(--color-fd-background)',
          fg: 'var(--color-fd-foreground)',
          transparent: true,
        }),
        error: null,
      };
    } catch (error) {
      return {
        svg: null,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }, [chart]);

  if (result.error) {
    return (
      <pre className="overflow-auto rounded-xl border bg-fd-muted p-4 text-sm">
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <div
      className="my-6 overflow-x-auto rounded-2xl border bg-fd-card p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: result.svg ?? '' }}
    />
  );
}
