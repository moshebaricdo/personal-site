import styles from './page.module.css';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { ProjectList } from '@/components/ProjectList';

const isV1OnlyEnabled = (process.env.SITE_V1_ONLY ?? 'true') === 'true';

export default function HomePage() {
  if (isV1OnlyEnabled) {
    return (
      <main className={`${styles.main} ${styles.v1Main}`}>
        <div className={`container ${styles.v1Container}`}>
          <Nav />
          <div className={`${styles.v1Hero} text-load-in`}>
            <Hero />
          </div>
        </div>
      </main>
    );
  }

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
