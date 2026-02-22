'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ArchiveLink.module.css';

export function ArchiveLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Link 
        href="/archive" 
        className={styles.link}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className={styles.label}>Archive</span>
        <span className={styles.meta}>
          <span className={styles.description}>
            Previous work and experiments
          </span>
          <span className={styles.badges}>
            <span className={styles.badge} title="Media">
              <ImageIcon />
            </span>
          </span>
        </span>
        <div className={styles.iconWrapper}>
          <AnimatePresence initial={false}>
            {isHovered ? (
              <motion.div
                key="open"
                className={styles.icon}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FolderOpenIcon />
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                className={styles.icon}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FolderClosedIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </div>
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

function FolderClosedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.closedIcon}
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
      className={styles.openIcon}
    >
      <path d="M3 8.5a2.5 2.5 0 0 1 2.5-2.5h2.2c.7 0 1.1-.2 1.5-.7l.5-.7c.4-.5.8-.7 1.5-.7h6.9a2.5 2.5 0 0 1 2.2 1.3" />
      <path d="M2.6 11.5a2 2 0 0 1 1.9-1.5h15.8a1.8 1.8 0 0 1 1.7 2.4l-1.4 4.4a2.6 2.6 0 0 1-2.5 1.9H5.4A2.6 2.6 0 0 1 3 16.9z" />
    </svg>
  );
}
