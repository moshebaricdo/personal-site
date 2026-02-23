import styles from './CaseStudy.module.css';

interface ChapterProps {
  title: string;
  counter?: string;
  className?: string;
  children: React.ReactNode;
}

export function Chapter({ title, counter, className, children }: ChapterProps) {
  return (
    <section className={`${styles.chapter} ${styles.textLoadIn}${className ? ` ${className}` : ''}`}>
      <div className={styles.chapterHeader}>
        <h2 className={styles.chapterTitle}>{title}</h2>
        {counter && (
          <div className={styles.chapterMeta}>
            <span className={styles.chapterDivider} aria-hidden="true" />
            <span className={styles.chapterCounter}>{counter}</span>
          </div>
        )}
      </div>
      <div className={styles.chapterContent}>{children}</div>
    </section>
  );
}
