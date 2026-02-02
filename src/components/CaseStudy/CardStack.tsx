'use client';

import { useState } from 'react';
import styles from './CaseStudy.module.css';

interface CardData {
  title: string;
  body: string;
}

interface CardStackProps {
  cards: CardData[];
}

export function CardStack({ cards }: CardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Loop through cards
  const goNext = () => setActiveIndex((i) => (i + 1) % cards.length);

  // Get position relative to active (with wrapping)
  const getStackPosition = (index: number) => {
    let pos = index - activeIndex;
    if (pos < 0) pos += cards.length;
    return pos;
  };

  return (
    <div className={styles.cardStack}>
      <span className={styles.stackCounter}>
        {activeIndex + 1} / {cards.length}
      </span>
      
      <div className={styles.stackContainer}>
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
    </div>
  );
}
