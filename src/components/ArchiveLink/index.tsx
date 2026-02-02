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
                <BoxOpenIcon />
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
                <BoxClosedIcon />
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

function BoxClosedIcon() {
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
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function BoxOpenIcon() {
  return (
    <svg
      viewBox="0 0 640 640"
      fill="currentColor"
      className={styles.openIcon}
    >
      <path d="M293.8 421.8L304 397.9L304 547.5C301.3 546.5 298.7 545.4 296.2 543.9L136.2 452.5C121.2 444 112 428.1 112 410.9L112 359L248.5 437C265.1 446.5 286.3 439.4 293.8 421.8zM299.7 326.8L264.4 409.2L68.4 297.2L103.7 214.8L299.7 326.8zM128.2 192L296.2 96C311 87.6 329.1 87.6 343.8 96L511.8 192L320 301.6L128.2 192zM560 249.7L578.3 280.2C582.8 287.8 592.7 290.2 600.2 285.7C607.7 281.2 610.2 271.3 605.7 263.7L564.2 194.5C558.6 185.1 550.6 177.3 541.1 171.9L359.7 68.3C335.1 54.2 304.9 54.2 280.3 68.3L102 170.1C89.9 177 80.4 187.7 75 200.5L39 284.6C32.5 299.5 38.3 316.9 52.5 325L80.1 340.8L80.1 410.9C80.1 439.6 95.5 466.1 120.4 480.3L280.4 571.7C305 585.8 335.2 585.8 359.8 571.7L519.8 480.3C544.7 466.1 560.1 439.6 560.1 410.9L560.1 249.8zM336 329.3L528 219.5L528 410.9C528 428.1 518.8 444 503.8 452.6L343.8 544C341.3 545.4 338.6 546.6 336 547.6L336 329.3z"/>
    </svg>
  );
}
