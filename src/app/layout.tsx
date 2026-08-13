import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aipoch.com'),
  title: {
    default: 'Open Science Documentation | AIPOCH',
    template: '%s | AIPOCH Open Science',
  },
  description:
    'Product, operation, and reproducibility guides for AIPOCH Open Science.',
  icons: {
    icon: '/img/favicon.ico',
  },
  openGraph: {
    title: 'AIPOCH Open Science Documentation',
    description:
      'Install, operate, inspect, and reproduce research work in Open Science.',
    type: 'website',
    siteName: 'AIPOCH Open Science',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
