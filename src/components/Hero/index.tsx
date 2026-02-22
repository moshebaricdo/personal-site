'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

export function Hero() {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    try {
      await navigator.clipboard.writeText('hello@moshebari.com');
      button.blur();
      setIsCopied(true);

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <header className={styles.hero}>
      <h1 className={styles.heading}>Moshe Bari</h1>
      
      <div className={styles.bioGroup}>
        <p className={styles.bio}>
          Senior Product Designer at{' '}
          <a href="https://code.org" className={styles.inlineLink} target="_blank" rel="noopener noreferrer">
            Code.org
          </a>
          , where I lead design systems and shape learning tools used by millions of 
          students and teachers.
        </p>

        <p className={styles.bio}>
          Over the past decade, I've collaborated with Amazon, Paramount, Lloyds of 
          London, Hulu, PepsiCo, and others.
        </p>

        <p className={styles.bio}>
          For inquiries or collaboration, reach out at{' '}
          <span className={styles.emailCopy}>
            <button
              type="button"
              className={`${styles.inlineLink} ${styles.emailCopyButton}`}
              onClick={handleCopyEmail}
              aria-label={isCopied ? 'Email copied to clipboard' : 'Copy email address'}
            >
              <span>hello@moshebari.com</span>
              <span className={styles.copyIcon} aria-hidden="true">
                {isCopied ? <CheckIcon /> : <CopyIcon />}
              </span>
            </button>
          </span>
          <span className={styles.emailPeriod} aria-hidden="true">
            .
          </span>
        </p>
      </div>
    </header>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true">
      <rect
        x="9"
        y="9"
        width="12"
        height="12"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M15 5H7c-1.1 0-2 .9-2 2v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true">
      <path
        d="M20 7L10 17l-5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
