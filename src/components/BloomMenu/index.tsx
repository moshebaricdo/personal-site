'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BloomMenu.module.css';

interface BloomMenuProps {
  children?: React.ReactNode;
}

export function BloomMenu({ children }: BloomMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [canWave, setCanWave] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleClick = () => {
    if (isOpen) {
      // Closing - prevent wave from triggering
      setCanWave(false);
    }
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Re-enable waving on fresh hover
    setCanWave(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Only wave if hovered AND allowed
  const shouldWave = isHovered && canWave && !isOpen;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {/* Trigger button - always visible */}
      <button
        className={styles.trigger}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-open={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <div className={styles.iconContainer}>
          <motion.div
            className={styles.iconWrapper}
            animate={{ 
              rotate: shouldWave ? [0, 16, -8, 10, 0] : 0,
            }}
            transition={{ 
              rotate: shouldWave ? {
                duration: 0.5,
                ease: 'easeInOut',
              } : { duration: 0.15 }
            }}
            style={{ transformOrigin: 'bottom center' }}
          >
            <HandIcon />
          </motion.div>
        </div>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div className={styles.content}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BloomMenuItem({ 
  children, 
  onSelect,
  icon,
}: { 
  children: React.ReactNode;
  onSelect?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button className={styles.item} onClick={onSelect}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}

function HandIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
