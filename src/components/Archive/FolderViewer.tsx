'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArchiveFolder } from './data';
import styles from './Archive.module.css';

interface FolderViewerProps {
  folder: ArchiveFolder;
}

const STACK_OFFSET = 3;
const MAX_EDGES = 4;

export function FolderViewer({ folder }: FolderViewerProps) {
  const items = folder.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const tabStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [folder.slug]);

  const canGoBack = activeIndex > 0;
  const canGoForward = activeIndex < items.length - 1;

  const goBack = useCallback(() => {
    if (canGoBack) setActiveIndex((i) => i - 1);
  }, [canGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward) setActiveIndex((i) => i + 1);
  }, [canGoForward]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (
        t instanceof HTMLElement &&
        (t.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))
      )
        return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goForward();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goBack, goForward]);

  useEffect(() => {
    const strip = tabStripRef.current;
    if (!strip) return;
    const tab = strip.querySelector(
      '[data-active="true"]'
    ) as HTMLElement | null;
    if (tab)
      tab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
  }, [activeIndex]);

  const activeItem = items[activeIndex];
  const edgeCount = Math.min(MAX_EDGES, items.length - activeIndex - 1);

  return (
    <div className={styles.folderInterior}>
      {/* Desktop: tabs + card stack */}
      <div className={styles.desktopViewer}>
        <div ref={tabStripRef} className={styles.tabStrip} role="tablist">
          {items.map((item, i) => (
            <button
              key={item.id}
              className={styles.fileTab}
              role="tab"
              aria-selected={i === activeIndex}
              data-active={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              title={item.caption}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className={styles.cardArea}>
          <div className={styles.cardStack}>
            {items.map((item, i) => {
              const distance = i - activeIndex;
              const isActive = distance === 0;
              const isAfter = distance > 0;
              const isBefore = distance < 0;

              return (
                <motion.div
                  key={item.id}
                  className={styles.fileCard}
                  initial={false}
                  animate={{
                    y: isAfter
                      ? Math.min(distance * STACK_OFFSET, 12)
                      : isBefore
                        ? -12
                        : 0,
                    zIndex: isActive
                      ? 100
                      : isAfter
                        ? 50 - distance
                        : 0,
                    opacity: isBefore ? 0 : 1,
                    scale: isActive
                      ? 1
                      : isAfter
                        ? Math.max(0.98, 1 - distance * 0.005)
                        : 1,
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: 'spring', bounce: 0.15, duration: 0.3 }
                  }
                  style={{
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div
                    className={styles.cardImage}
                    style={{ aspectRatio: item.aspectRatio || '4/3' }}
                  >
                    <PlaceholderIcon />
                  </div>
                  {isActive && (
                    <span className={styles.cardCaption}>
                      {activeItem.caption}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {edgeCount > 0 && (
            <div className={styles.stackEdges} aria-hidden="true">
              {Array.from({ length: edgeCount }, (_, i) => (
                <div
                  key={i}
                  className={styles.stackEdge}
                  style={{ opacity: 1 - i * 0.25 }}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.itemCounter}>
          <button
            className={styles.counterNav}
            onClick={goBack}
            disabled={!canGoBack}
            aria-label="Previous item"
          >
            <ArrowIcon direction="left" />
          </button>
          <span className={styles.counterLabel}>
            {activeIndex + 1} / {items.length}
          </span>
          <button
            className={styles.counterNav}
            onClick={goForward}
            disabled={!canGoForward}
            aria-label="Next item"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className={styles.mobileStack}>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.mobileCard}
            style={{ aspectRatio: item.aspectRatio || '4/3' }}
          >
            <PlaceholderIcon />
            <span className={styles.cardCaption}>{item.caption}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderIcon() {
  return (
    <svg
      width="48"
      height="48"
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

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === 'left' ? (
        <path d="M13 8H3M7 12L3 8L7 4" />
      ) : (
        <path d="M3 8H13M9 4L13 8L9 12" />
      )}
    </svg>
  );
}
