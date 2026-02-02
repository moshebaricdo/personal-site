'use client';

import { useState } from 'react';
import styles from './CaseStudy.module.css';

interface FigureData {
  caption: string;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}

interface FigureStackProps {
  figures: FigureData[];
}

export function FigureStack({ figures }: FigureStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Loop through figures
  const goNext = () => setActiveIndex((i) => (i + 1) % figures.length);

  // Get position relative to active (with wrapping)
  const getStackPosition = (index: number) => {
    let pos = index - activeIndex;
    if (pos < 0) pos += figures.length;
    return pos;
  };

  return (
    <div className={styles.figureStack}>
      <span className={styles.stackCounter}>
        {activeIndex + 1} / {figures.length}
      </span>
      
      <div className={styles.figureStackContainer}>
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
      
      <figcaption className={styles.figureCaption}>
        {figures[activeIndex].caption}
      </figcaption>
    </div>
  );
}
