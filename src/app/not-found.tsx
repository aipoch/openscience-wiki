import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="text-sm font-semibold text-fd-primary">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-fd-muted-foreground">
          The requested documentation page does not exist.
        </p>
        <Link
          className="mt-7 inline-flex rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground"
          href="/docs"
        >
          Return to the documentation
        </Link>
      </div>
    </main>
  );
}
