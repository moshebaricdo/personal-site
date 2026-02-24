import Link from 'next/link';
import { projects } from '@/data/projects';
import { ExternalIcon } from '../icons/ExternalIcon';
import styles from './ProjectList.module.css';

interface ProjectListProps {
  includeArchive?: boolean;
}

export function ProjectList({ includeArchive = false }: ProjectListProps) {
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
      {includeArchive && (
        <li className={`${styles.item} ${styles.archiveItem}`}>
          <Link href="/archive" className={styles.link}>
            <span className={styles.title}>Archive</span>
            <span className={styles.meta}>
              <span className={styles.description}>Previous work and experiments</span>
              <span className={styles.badges}>
                <span className={styles.badge} title="Media">
                  <ImageIcon />
                </span>
              </span>
            </span>
            <span className={styles.iconWrapper} aria-hidden="true">
              <span className={`${styles.folderIcon} ${styles.folderClosed}`}>
                <FolderClosedIcon />
              </span>
              <span className={`${styles.folderIcon} ${styles.folderOpen}`}>
                <FolderOpenIcon />
              </span>
            </span>
          </Link>
        </li>
      )}
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

function FolderClosedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={16}
      height={16}
    >
      <path d="M3 7.5a2.5 2.5 0 0 1 2.5-2.5h2.2c.7 0 1.1-.2 1.5-.7l.5-.7c.4-.5.8-.7 1.5-.7h6.9a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 18.6 19H5.5A2.5 2.5 0 0 1 3 16.5v-9z" />
      <path d="M3 9.5h18" />
    </svg>
  );
}

function FolderOpenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={16}
      height={16}
    >
      <path d="M3 8.5a2.5 2.5 0 0 1 2.5-2.5h2.2c.7 0 1.1-.2 1.5-.7l.5-.7c.4-.5.8-.7 1.5-.7h6.9a2.5 2.5 0 0 1 2.2 1.3" />
      <path d="M2.6 11.5a2 2 0 0 1 1.9-1.5h15.8a1.8 1.8 0 0 1 1.7 2.4l-1.4 4.4a2.6 2.6 0 0 1-2.5 1.9H5.4A2.6 2.6 0 0 1 3 16.9z" />
    </svg>
  );
}
