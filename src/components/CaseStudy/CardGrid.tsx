import styles from './CaseStudy.module.css';

interface CardGridProps {
  children: React.ReactNode;
}

export function CardGrid({ children }: CardGridProps) {
  return <div className={styles.cardGrid}>{children}</div>;
}
