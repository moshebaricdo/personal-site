import { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { StackedArchive } from '@/components/Archive';
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
      <div className="container">
        <Nav />
        
        <header className={`${styles.header} text-load-in`}>
          <h1 className={styles.title}>Archive</h1>
          <p className={styles.subtitle}>
            Previous work and experiments
          </p>
        </header>

        <div className={`separator ${styles.heroSeparator}`} />

        <StackedArchive />
        
        <div className={styles.pageBottom} />
      </div>
    </main>
  );
}
