import { Metadata } from 'next';
import Link from 'next/link';
import { InfiniteCanvas } from '@/components/Archive';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Archive',
  description: 'A visual collection of previous work spanning product and brand design.',
  alternates: {
    canonical: '/archive',
  },
};

export default function ArchivePage() {
  return (
    <main className={styles.main}>
      <InfiniteCanvas />

      <header className={`${styles.overlay} text-load-in`}>
        <h1 className={styles.title}>Archive</h1>
        <p className={styles.subtitle}>Previous work and experiments</p>
        <Link href="/" className={styles.homeLink}>
          Back to home
        </Link>
      </header>
    </main>
  );
}
