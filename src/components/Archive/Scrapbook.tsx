'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CategoryData, ArchiveItem } from './data';
import { RingIndicator } from './RingIndicator';
import styles from './Scrapbook.module.css';

interface ScrapbookProps {
  category: CategoryData;
}

// Generate consistent random values for each item based on its id
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function getItemRotation(item: ArchiveItem): number {
  const rotationSeed = seededRandom(item.id);
  return (rotationSeed - 0.5) * 24; // -12 to +12 degrees
}

// Fixed pixel spacing between image centers
const IMAGE_SPACING = 500;
// Minimum drag distance to distinguish from a click
const DRAG_THRESHOLD = 5;
// Snap at 30% of spacing (150px) — loosened from the default 50%
const SNAP_BIAS = 0.7;

/** How many images to advance for a given drag delta */
function calcSnapShift(delta: number): number {
  const raw = -delta / IMAGE_SPACING;
  return raw > 0
    ? Math.floor(raw + SNAP_BIAS)
    : Math.ceil(raw - SNAP_BIAS);
}

export function Scrapbook({ category }: ScrapbookProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const dragDeltaRef = useRef(0);
  const dragRef = useRef({
    startX: 0,
    startIndex: 0,
    pointerId: null as number | null,
    didDrag: false,
  });

  const items = category.items;
  const canGoBack = activeIndex > 0;
  const canGoForward = activeIndex < items.length - 1;

  const goBack = useCallback(() => {
    if (canGoBack) setActiveIndex(i => i - 1);
  }, [canGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward) setActiveIndex(i => i + 1);
  }, [canGoForward]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goForward();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goBack, goForward]);

  // Stage drag handlers
  const handleStagePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    dragRef.current = {
      startX: e.clientX,
      startIndex: activeIndex,
      pointerId: e.pointerId,
      didDrag: false,
    };
  }, [activeIndex]);

  const handleStagePointerMove = useCallback((e: React.PointerEvent) => {
    if (dragRef.current.pointerId === null) return;
    if (e.pointerId !== dragRef.current.pointerId) return;

    const dx = e.clientX - dragRef.current.startX;

    // Commit to drag after threshold
    if (!dragRef.current.didDrag && Math.abs(dx) > DRAG_THRESHOLD) {
      dragRef.current.didDrag = true;
      setIsDragging(true);
      stageRef.current?.setPointerCapture(e.pointerId);
    }

    if (dragRef.current.didDrag) {
      dragDeltaRef.current = dx;
      setDragDelta(dx);
    }
  }, []);

  const handleStagePointerUp = useCallback(() => {
    if (dragRef.current.didDrag) {
      const delta = dragDeltaRef.current;
      const shift = calcSnapShift(delta);
      const newIndex = Math.max(0, Math.min(items.length - 1, dragRef.current.startIndex + shift));
      setActiveIndex(newIndex);
    }

    dragRef.current = { ...dragRef.current, pointerId: null, didDrag: false };
    dragDeltaRef.current = 0;
    setIsDragging(false);
    setDragDelta(0);
  }, [items.length]);

  // Projected index during drag — ring indicator follows in real time
  const projectedIndex = isDragging
    ? Math.max(0, Math.min(items.length - 1,
        dragRef.current.startIndex + calcSnapShift(dragDelta)
      ))
    : activeIndex;

  return (
    <div className={styles.scrapbook}>
      {/* Main scrapbook area - full width */}
      <div
        ref={stageRef}
        className={styles.stage}
        data-dragging={isDragging}
        onPointerDown={handleStagePointerDown}
        onPointerMove={handleStagePointerMove}
        onPointerUp={handleStagePointerUp}
        onPointerCancel={handleStagePointerUp}
      >
        {/* Left navigation zone - cursor only */}
        <div
          className={styles.navZone}
          data-direction="prev"
          data-disabled={!canGoBack}
          onClick={goBack}
          role="button"
          tabIndex={canGoBack ? 0 : -1}
          aria-label="Previous image"
        />

        {/* Desktop: Images positioned from center with fixed spacing */}
        <div className={styles.imagesContainer}>
          {items.map((item, index) => {
            const distance = index - activeIndex;

            const isActive = distance === 0;
            const isVisible = Math.abs(distance) <= 3;

            // Rotation: active is 0, others use seeded random
            const rotation = isActive ? 0 : getItemRotation(item);

            // Scale: active is 1, others are smaller
            const scale = isActive ? 1 : 0.75;

            // Fixed pixel spacing + drag offset while dragging
            const xOffset = distance * IMAGE_SPACING + (isDragging ? dragDelta : 0);

            return (
              <motion.div
                key={item.id}
                className={styles.slide}
                data-active={isActive}
                animate={{
                  x: xOffset,
                  rotate: rotation,
                  scale: scale,
                  zIndex: isActive ? 10 : 5 - Math.abs(distance),
                }}
                transition={
                  isDragging
                    ? { duration: 0 }
                    : prefersReducedMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 300, damping: 30 }
                }
                style={{
                  visibility: isVisible ? 'visible' : 'hidden',
                }}
              >
                <div
                  className={styles.image}
                  style={{ aspectRatio: item.aspectRatio || '4/3' }}
                >
                  {isVisible && <PlaceholderIcon />}
                  {isVisible && (
                    <span className={styles.imageTag}>{item.caption}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right navigation zone - cursor only */}
        <div
          className={styles.navZone}
          data-direction="next"
          data-disabled={!canGoForward}
          onClick={goForward}
          role="button"
          tabIndex={canGoForward ? 0 : -1}
          aria-label="Next image"
        />
      </div>

      {/* Mobile: Simple vertical stack (outside stage so it renders) */}
      <div className={styles.mobileStack}>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.stackImage}
            style={{ aspectRatio: item.aspectRatio || '4/3' }}
          >
            <PlaceholderIcon />
            <span className={styles.imageTag}>{item.caption}</span>
          </div>
        ))}
      </div>

      {/* Ring indicator — follows projectedIndex during drag */}
      <RingIndicator
        count={items.length}
        activeIndex={projectedIndex}
        onChangeIndex={setActiveIndex}
      />
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
