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
                {/* Folder back */}
                <div className={styles.folderBack} aria-hidden="true" />

                {/* Folder front */}
                <div className={styles.folderFace} aria-hidden="true">
                  <div className={styles.folderTab} />
                  <motion.div
                    className={styles.folderBody}
                    animate={isHovered ? 'hover' : 'closed'}
                    variants={{
                      closed: { skewX: 0 },
                      hover: prefersReducedMotion ? { skewX: 0 } : { skewX: -4 },
                    }}
                    transition={folderTransition}
                  />
                </div>

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
