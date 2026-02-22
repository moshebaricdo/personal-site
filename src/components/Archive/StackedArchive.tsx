'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { categories, CategorySlug } from './data';
import styles from './Archive.module.css';

const folderTransition = {
  duration: 0.18,
  ease: [0, 0, 0.2, 1] as const,
};

const previewTransition = {
  duration: 0.24,
  ease: [0, 0, 0.2, 1] as const,
};

export function StackedArchive() {
  const [hoveredFolder, setHoveredFolder] = useState<CategorySlug | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={styles.folderArchive}>
      <div className={styles.foldersRow}>
        {categories.map((category) => {
          const isHovered = hoveredFolder === category.slug;

          return (
            <Link
              key={category.slug}
              href={`/archive/${category.slug}`}
              className={styles.folderButton}
              onMouseEnter={() => setHoveredFolder(category.slug)}
              onMouseLeave={() => setHoveredFolder(null)}
              aria-label={`View ${category.name} archive, ${category.items.length} items`}
            >
              <div className={styles.folderVisual}>
                {/* Folder back layer (tab + panel) */}
                <div className={styles.folderBackLayer} aria-hidden="true">
                  <div className={styles.folderBackTab} />
                  <div className={styles.folderBackPanel} />
                </div>

                {/* Preview card peeks out on hover */}
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
                    <span className={styles.peekGlyph} />
                  </motion.div>
                </div>

                {/* Folder front layer (panel only) */}
                <motion.div
                  className={styles.folderFace}
                  aria-hidden="true"
                  animate={isHovered ? 'hover' : 'closed'}
                  variants={{
                    closed: { skewX: 0 },
                    hover: prefersReducedMotion ? { skewX: 0 } : { skewX: -4 },
                  }}
                  transition={folderTransition}
                >
                  <div className={styles.folderFrontPanel} />
                </motion.div>

                {/* Tag label */}
                <motion.span
                  className={styles.folderTag}
                  animate={isHovered ? 'hover' : 'closed'}
                  variants={{
                    closed: { skewX: 0 },
                    hover: prefersReducedMotion ? { skewX: 0 } : { skewX: -5 },
                  }}
                  transition={folderTransition}
                >
                  {category.name} · {category.items.length}
                </motion.span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
