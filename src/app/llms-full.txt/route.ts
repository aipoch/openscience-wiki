import { source } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  const sections = await Promise.all(
    source.getPages().map(async (page) => {
      const body = await page.data.getText('processed');
      return `# ${page.data.title}\n\n${body}`;
    }),
  );

  return new Response(sections.join('\n\n---\n\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
