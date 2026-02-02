import Link from 'next/link';
import styles from './CaseStudy.module.css';

export function BackLink() {
  return (
    <Link href="/" className={styles.backLink}>
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 8H3M7 4L3 8l4 4" />
      </svg>
      <span>Home</span>
    </Link>
  );
}
