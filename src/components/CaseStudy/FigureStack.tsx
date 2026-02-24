'use client';

import { useState, useCallback, useRef } from 'react';
import styles from './CaseStudy.module.css';

interface FigureData {
  caption: string;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}

interface FigureStackProps {
  title: string;
  figures: FigureData[];
}

export function FigureStack({ title, figures }: FigureStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchRef = useRef({ startX: 0, startY: 0 });
  const activeCaption = figures[activeIndex]?.caption ?? '';

  // Loop through figures
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % figures.length), [figures.length]);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + figures.length) % figures.length), [figures.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goPrev();
    }
  }, [goNext, goPrev]);

  // Touch swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current.startX = e.touches[0].clientX;
    touchRef.current.startY = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.startX;
    const dy = e.changedTouches[0].clientY - touchRef.current.startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) goPrev();
      else goNext();
    }
  }, [goNext, goPrev]);

  // Get position relative to active (with wrapping)
  const getStackPosition = (index: number) => {
    let pos = index - activeIndex;
    if (pos < 0) pos += figures.length;
    return pos;
  };

  return (
    <section className={styles.stackSection}>
      <div className={styles.stackHeader}>
        <h2 className={styles.stackTitle}>{title}</h2>
        <span className={styles.stackDivider} aria-hidden="true" />
        <span className={styles.stackCounter}>{activeIndex + 1}/{figures.length}</span>
      </div>
      <p className="sr-only" aria-live="polite">
        {`${title} image ${activeIndex + 1} of ${figures.length}: ${activeCaption}`}
      </p>
      <div
        className={styles.figureStackContainer}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} carousel, ${activeIndex + 1} of ${figures.length}. ${activeCaption}`}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {figures.map((figure, index) => {
          const stackPos = getStackPosition(index);
          const isActive = stackPos === 0;
          
          return (
            <figure
              key={index}
              className={styles.stackFigure}
              data-active={isActive}
              style={{ '--stack-pos': stackPos } as React.CSSProperties}
              onClick={() => !isActive && goNext()}
            >
              <div 
                className={styles.stackImagePlaceholder}
                style={{ aspectRatio: figure.aspectRatio || '16/9' }}
              >
                {isActive && (
                  <span className={styles.imageTag}>{figure.caption}</span>
                )}
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
