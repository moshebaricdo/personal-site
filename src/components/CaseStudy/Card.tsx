import styles from './CaseStudy.module.css';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardBody}>{children}</p>
    </article>
  );
}
