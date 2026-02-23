import styles from './CaseStudy.module.css';

interface CaseStudyHeroProps {
  tag?: string;
  title: string;
  hook: string;
  meta: {
    role: string;
    timeline: string;
    scope: string;
  };
}

export function CaseStudyHero({ tag, title, hook, meta }: CaseStudyHeroProps) {
  return (
    <header className={`${styles.hero} ${styles.textLoadIn}`}>
      {tag && <p className={styles.tag}>{tag}</p>}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.hook}>{hook}</p>
      
      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Role</dt>
          <dd className={styles.metaValue}>{meta.role}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Timeline</dt>
          <dd className={styles.metaValue}>{meta.timeline}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Scope</dt>
          <dd className={styles.metaValue}>{meta.scope}</dd>
        </div>
      </dl>
    </header>
  );
}
