'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from 'motion/react';
import { folders } from './data';
import { FolderViewer } from './FolderViewer';
import styles from './Archive.module.css';

const folderTransition = {
  duration: 0.18,
  ease: [0, 0, 0.2, 1] as const,
};

const previewTransition = {
  duration: 0.24,
  ease: [0, 0, 0.2, 1] as const,
};

const layoutTransition = {
  layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
};

export function FolderArchive() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const openFolder = openSlug
    ? folders.find((f) => f.slug === openSlug)
    : null;

  // Close on Escape (capture so it fires before viewer arrow handlers)
  useEffect(() => {
    if (!openSlug) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setOpenSlug(null);
      }
    };
    window.addEventListener('keydown', handler, { capture: true });
    return () =>
      window.removeEventListener('keydown', handler, { capture: true });
  }, [openSlug]);

  // Sync open state to URL hash for deep-linking / back button
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && folders.find((f) => f.slug === hash)) {
      setOpenSlug(hash);
    }
  }, []);

  useEffect(() => {
    if (openSlug) {
      window.history.pushState(null, '', `#${openSlug}`);
    } else if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, [openSlug]);

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.slice(1);
      const match = hash ? folders.find((f) => f.slug === hash) : null;
      setOpenSlug(match ? hash : null);
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const handleOpen = useCallback((slug: string) => {
    setOpenSlug(slug);
    setHoveredFolder(null);
  }, []);

  return (
    <section className={`${styles.archive} text-load-in`}>
      <LayoutGroup>
        {/* Folder grid — stays in DOM but fades when a folder is open */}
        <motion.div
          className={`${styles.foldersGrid} ${openSlug ? styles.foldersGridHidden : ''}`}
          animate={{
            opacity: openSlug ? 0 : 1,
            scale: openSlug ? 0.97 : 1,
          }}
          transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
        >
          {folders.map((folder) => {
            const isHovered = hoveredFolder === folder.slug;

            return (
              <button
                key={folder.slug}
                className={styles.folderButton}
                onClick={() => handleOpen(folder.slug)}
                onMouseEnter={() => setHoveredFolder(folder.slug)}
                onMouseLeave={() => setHoveredFolder(null)}
                aria-label={`Open ${folder.name} folder, ${folder.items.length} items`}
              >
                <motion.div
                  layoutId={`folder-${folder.slug}`}
                  className={styles.folderVisual}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 6,
                  }}
                  transition={layoutTransition}
                >
                  <div className={styles.folderBackLayer} aria-hidden="true">
                    <div className={styles.folderBackTab} />
                    <div className={styles.folderBackPanel} />
                  </div>

                  <div className={styles.folderContent} aria-hidden="true">
                    <motion.div
                      className={styles.peekImage}
                      animate={isHovered ? 'hover' : 'closed'}
                      variants={{
                        closed: prefersReducedMotion
                          ? { y: 30, opacity: 1, rotate: -1.5 }
                          : { y: 40, opacity: 0.4, rotate: -1.5 },
                        hover: prefersReducedMotion
                          ? { y: 0, opacity: 0.9, rotate: -2.5 }
                          : { y: -15, opacity: 1, rotate: 2.5 },
                      }}
                      transition={previewTransition}
                    >
                      <span className={styles.peekOverlay} />
                    </motion.div>
                  </div>

                  <motion.div
                    className={styles.folderFace}
                    aria-hidden="true"
                    animate={isHovered ? 'hover' : 'closed'}
                    variants={{
                      closed: { skewX: 0 },
                      hover: prefersReducedMotion
                        ? { skewX: 0 }
                        : { skewX: -4 },
                    }}
                    transition={folderTransition}
                  >
                    <div className={styles.folderFrontPanel} />
                  </motion.div>

                  <motion.span
                    className={styles.folderTag}
                    animate={isHovered ? 'hover' : 'closed'}
                    variants={{
                      closed: { skewX: 0 },
                      hover: prefersReducedMotion
                        ? { skewX: 0 }
                        : { skewX: -5 },
                    }}
                    transition={folderTransition}
                  >
                    {folder.name} · {folder.items.length}
                  </motion.span>
                </motion.div>
              </button>
            );
          })}
        </motion.div>

        {/* Open folder — morphs from the clicked card via layoutId */}
        <AnimatePresence>
          {openSlug && openFolder && (
            <motion.div
              key={openSlug}
              className={styles.openFolderWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                layoutId={`folder-${openSlug}`}
                className={styles.openFolder}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 6,
                }}
                transition={layoutTransition}
              >
                <div className={styles.openFolderHeader}>
                  <span className={styles.openFolderTitle}>
                    {openFolder.name}
                    <span className={styles.openFolderCount}>
                      {openFolder.items.length}
                    </span>
                  </span>
                  <button
                    className={styles.openFolderClose}
                    onClick={() => setOpenSlug(null)}
                    aria-label="Close folder"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div className={styles.openFolderBody}>
                  <FolderViewer folder={openFolder} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
