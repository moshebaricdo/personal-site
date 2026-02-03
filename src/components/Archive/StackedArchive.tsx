'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import styles from './Archive.module.css';

type CategorySlug = 'brand' | 'product' | 'print';

interface ArchiveItem {
  id: number;
  aspectRatio?: '4/3' | '3/2' | '1/1';
}

interface CategoryData {
  name: string;
  slug: CategorySlug;
  items: ArchiveItem[];
}

const categories: CategoryData[] = [
  { 
    name: 'Brand', 
    slug: 'brand', 
    items: [
      { id: 1 }, { id: 2, aspectRatio: '3/2' }, { id: 3, aspectRatio: '1/1' },
      { id: 4 }, { id: 5, aspectRatio: '3/2' }, { id: 6 },
      { id: 7, aspectRatio: '1/1' }, { id: 8 },
    ]
  },
  { 
    name: 'Product', 
    slug: 'product', 
    items: [
      { id: 9 }, { id: 10, aspectRatio: '3/2' }, { id: 11 },
      { id: 12, aspectRatio: '1/1' }, { id: 13 }, { id: 14, aspectRatio: '3/2' },
      { id: 15 }, { id: 16, aspectRatio: '1/1' }, { id: 17 },
      { id: 18, aspectRatio: '3/2' }, { id: 19 }, { id: 20 },
    ]
  },
  { 
    name: 'Print', 
    slug: 'print', 
    items: [
      { id: 21 }, { id: 22, aspectRatio: '1/1' }, { id: 23, aspectRatio: '3/2' },
      { id: 24 }, { id: 25, aspectRatio: '1/1' }, { id: 26 },
    ]
  },
];

const folderTransition = {
  duration: 0.18,
  ease: [0, 0, 0.2, 1] as const,
};

export function StackedArchive() {
  const [openFolder, setOpenFolder] = useState<CategorySlug | null>(null);
  const [hoveredFolder, setHoveredFolder] = useState<CategorySlug | null>(null);
  const [recentlyClosed, setRecentlyClosed] = useState<CategorySlug | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const activeCategory = useMemo(() => 
    categories.find(c => c.slug === openFolder),
    [openFolder]
  );

  // Handle folder toggle with close cooldown
  const handleFolderClick = useCallback((slug: CategorySlug) => {
    setOpenFolder((prev) => {
      if (prev === slug) {
        // Closing: set cooldown to suppress hover
        setRecentlyClosed(slug);
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = setTimeout(() => {
          setRecentlyClosed(null);
        }, 800);
        return null;
      }
      return slug;
    });
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openFolder) {
        setRecentlyClosed(openFolder);
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = setTimeout(() => {
          setRecentlyClosed(null);
        }, 300);
        setOpenFolder(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openFolder]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Determine variant: open > hover (unless recently closed) > closed
  const getVariant = (slug: CategorySlug) => {
    if (openFolder === slug) return 'open';
    if (hoveredFolder === slug && recentlyClosed !== slug) return 'hover';
    return 'closed';
  };

  return (
    <section className={styles.folderArchive}>
      <div className={styles.foldersRow}>
        {categories.map((category) => {
          const isOpen = openFolder === category.slug;
          const panelId = `folder-panel-${category.slug}`;
          const variant = getVariant(category.slug);

          return (
            <button
              key={category.slug}
              className={styles.folderButton}
              onClick={() => handleFolderClick(category.slug)}
              onMouseEnter={() => setHoveredFolder(category.slug)}
              onMouseLeave={() => setHoveredFolder(null)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label={`${isOpen ? 'Close' : 'Open'} ${category.name} folder, ${category.items.length} items`}
            >
              <div className={styles.folderVisual}>
                {/* Folder back (visible when front folds) */}
                <div className={styles.folderBack} aria-hidden="true" />

                {/* Folder front */}
                <div className={styles.folderFace} aria-hidden="true">
                  <div className={styles.folderTab} />
                  <motion.div
                    className={styles.folderBody}
                    animate={variant}
                    variants={{
                      closed: prefersReducedMotion
                        ? { skewX: 0 }
                        : { skewX: 0 },
                      hover: prefersReducedMotion
                        ? { skewX: 0 }
                        : { skewX: -4 },
                      open: prefersReducedMotion
                        ? { skewX: 0 }
                        : { skewX: -4 },
                    }}
                    transition={folderTransition}
                  />
                </div>

                {/* Tag label */}
                <motion.span
                  className={styles.folderTag}
                  animate={variant}
                  variants={{
                    closed: prefersReducedMotion
                      ? { skewX: 0 }
                      : { skewX: 0 },
                    hover: prefersReducedMotion
                      ? { skewX: 0 }
                      : { skewX: -5 },
                    open: prefersReducedMotion
                      ? { skewX: 0 }
                      : { skewX: -5 },
                  }}
                  transition={folderTransition}
                >
                  {category.name} · {category.items.length}
                </motion.span>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {openFolder && activeCategory && (
          <motion.div
            key={openFolder}
            id={`folder-panel-${openFolder}`}
            className={styles.folderPanel}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
          >
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <span className={styles.panelName}>{activeCategory.name}</span>
                <span className={styles.panelCount}>{activeCategory.items.length} items</span>
              </div>

              <button
                type="button"
                className={styles.panelClose}
                onClick={() => setOpenFolder(null)}
              >
                Close
              </button>
            </div>

            <div className={styles.dealtGrid}>
              {activeCategory.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={styles.dealtCard}
                  style={{ aspectRatio: item.aspectRatio || '4/3' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.02,
                    ease: [0, 0, 0.2, 1],
                  }}
                >
                  <PlaceholderIcon />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PlaceholderIcon() {
  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
      className={styles.placeholderIcon}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}
