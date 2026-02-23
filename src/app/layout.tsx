import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import '@/styles/globals.css';
import 'dialkit/styles.css';
import { DialKitRoot } from '@/components/DialKitRoot';
import { BackToTop } from '@/components/BackToTop';

const siteUrl = 'https://moshebari.com';
const siteName = 'Moshe Bari';
const defaultDescription = 'Product designer crafting thoughtful digital experiences.';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Moshe Bari — Product Designer',
    template: '%s — Moshe Bari',
  },
  description: defaultDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Moshe Bari — Product Designer',
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Moshe Bari — Product Designer',
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Moshe Bari',
    jobTitle: 'Senior Product Designer',
    url: siteUrl,
    sameAs: [
      'https://github.com/moshebari',
      'https://linkedin.com/in/moshebari',
      'https://x.com/moshebari',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    inLanguage: 'en-US',
  };

  return (
    <html lang="en" className={newsreader.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <DialKitRoot />
        <BackToTop />
      </body>
    </html>
  );
}
