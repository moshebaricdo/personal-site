import styles from './page.module.css';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { ProjectList } from '@/components/ProjectList';
import { ArchiveLink } from '@/components/ArchiveLink';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <Nav />
        <Hero />
        <div className={`separator ${styles.heroSeparator}`} />
        
        <Section id="work" title="Recent Work" className={styles.workSection}>
          <ProjectList />
          <ArchiveLink />
        </Section>
        
      </div>
    </main>
  );
}
