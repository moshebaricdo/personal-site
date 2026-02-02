import Link from 'next/link';
import { projects } from '@/data/projects';
import { ExternalIcon } from '../icons/ExternalIcon';
import styles from './ProjectList.module.css';

export function ProjectList() {
  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li key={project.slug} className={styles.item}>
          <Link
            href={project.url}
            className={styles.link}
            target={project.external ? '_blank' : undefined}
            rel={project.external ? 'noopener noreferrer' : undefined}
          >
            <span className={styles.title}>{project.title}</span>
            <span className={styles.meta}>
              <span className={styles.description}>{project.description}</span>
              <span className={styles.badges}>
                <span className={styles.badge} title="Case Study">
                  <TextIcon />
                </span>
                <span className={styles.badge} title="Media">
                  <ImageIcon />
                </span>
              </span>
            </span>
            {project.external ? (
              <ExternalIcon className={styles.externalIcon} />
            ) : (
              <Arrow className={styles.arrow} />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function TextIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7V4h16v3" />
      <path d="M12 4v16" />
      <path d="M8 20h8" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
