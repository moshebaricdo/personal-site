'use client';

import { useState, useCallback, useRef } from 'react';
import styles from './CaseStudy.module.css';

interface CardData {
  title: string;
  body: string;
}

interface CardStackProps {
  title: string;
  cards: CardData[];
}

export function CardStack({ title, cards }: CardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchRef = useRef({ startX: 0, startY: 0 });

  // Loop through cards
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % cards.length), [cards.length]);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + cards.length) % cards.length), [cards.length]);

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
    if (pos < 0) pos += cards.length;
    return pos;
  };

  return (
    <section className={styles.stackSection}>
      <div className={styles.stackHeader}>
        <h2 className={styles.stackTitle}>{title}</h2>
        <span className={styles.stackDivider} aria-hidden="true" />
        <span className={styles.stackCounter}>{activeIndex + 1}/{cards.length}</span>
      </div>
      <div
        className={styles.stackContainer}
        tabIndex={0}
        role="region"
        aria-label={`${title} carousel, ${activeIndex + 1} of ${cards.length}`}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((card, index) => {
          const stackPos = getStackPosition(index);
          const isActive = stackPos === 0;
          
          return (
            <article
              key={index}
              className={styles.stackCard}
              data-active={isActive}
              style={{ '--stack-pos': stackPos } as React.CSSProperties}
              onClick={() => !isActive && goNext()}
            >
              <h3 className={styles.stackCardTitle}>{card.title}</h3>
              <p className={styles.stackCardBody}>{card.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
