import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Section({ id, title, className, children }: SectionProps) {
  return (
    <section id={id} className={[styles.section, className].filter(Boolean).join(' ')}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
