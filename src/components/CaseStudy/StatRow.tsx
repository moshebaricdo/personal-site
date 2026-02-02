import styles from './CaseStudy.module.css';

interface Stat {
  value: string;
  label: string;
}

interface StatRowProps {
  stats: Stat[];
}

export function StatRow({ stats }: StatRowProps) {
  return (
    <div className={styles.statRow}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.stat}>
          <span className={styles.statValue}>{stat.value}</span>
          <span className={styles.statLabel}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
