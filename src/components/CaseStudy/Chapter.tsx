import styles from './CaseStudy.module.css';

interface ChapterProps {
  title: string;
  children: React.ReactNode;
}

export function Chapter({ title, children }: ChapterProps) {
  return (
    <section className={styles.chapter}>
      <h2 className={styles.chapterTitle}>{title}</h2>
      <div className={styles.chapterContent}>{children}</div>
    </section>
  );
}
