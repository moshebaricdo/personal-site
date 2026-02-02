import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Moshe Bari — Product Designer',
    template: '%s — Moshe Bari',
  },
  description: 'Product designer crafting thoughtful digital experiences.',
  metadataBase: new URL('https://moshebari.com'),
  openGraph: {
    title: 'Moshe Bari — Product Designer',
    description: 'Product designer crafting thoughtful digital experiences.',
    url: 'https://moshebari.com',
    siteName: 'Moshe Bari',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moshe Bari — Product Designer',
    description: 'Product designer crafting thoughtful digital experiences.',
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
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/signifier-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
