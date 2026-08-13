import { notFound } from 'next/navigation';
import { source } from '@/lib/source';

export const revalidate = false;

export async function GET(
  _request: Request,
  context: RouteContext<'/llms.mdx/docs/[[...slug]]'>,
) {
  const params = await context.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return new Response(await page.data.getText('processed'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
