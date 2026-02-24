'use client';

import { useState, useEffect } from 'react';
import styles from './BackToTop.module.css';

const SCROLL_THRESHOLD = 100;

function getScrollY(): number {
  if (typeof window === 'undefined') return 0;
  return window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
}

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = getScrollY();
      setIsVisible(scrollY > SCROLL_THRESHOLD);
    };

    // Check initial state after a brief delay to ensure DOM is ready
    handleScroll();
    
    // Also check after a short delay for any layout shifts
    const timeoutId = setTimeout(handleScroll, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={styles.backToTop}
      onClick={scrollToTop}
      data-visible={isVisible}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      disabled={!isVisible}
      type="button"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.label}>Top</span>
    </button>
  );
}
