import styles from './CaseStudy.module.css';

interface CaseStudyCoverProps {
  label?: string;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}

export function CaseStudyCover({
  label,
  aspectRatio = '16/9',
}: CaseStudyCoverProps) {
  return (
    <figure className={styles.cover}>
      <div className={styles.coverFrame} style={{ aspectRatio }}>
        {label && <span className={styles.coverLabel}>{label}</span>}
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
    </figure>
  );
}
