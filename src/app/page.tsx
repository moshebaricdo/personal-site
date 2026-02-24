import styles from './page.module.css';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { ProjectList } from '@/components/ProjectList';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <Nav />
        <div className="text-load-in">
          <Hero />
        </div>
        <div className={`separator ${styles.heroSeparator}`} />
        
        <Section id="work" title="Recent Work" className={`${styles.workSection} text-load-in`}>
          <ProjectList includeArchive />
        </Section>
        
      </div>
    </main>
  );
}
