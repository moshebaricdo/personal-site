'use client';

import { useCallback, useRef, useState } from 'react';
import styles from './RingIndicator.module.css';

interface RingIndicatorProps {
  count: number;
  activeIndex: number;
  onChangeIndex: (index: number) => void;
}

// Spacing between tick centers in pixels (tick width + gap)
const TICK_SPACING = 9;
// Minimum drag distance before it counts as a drag vs a click
const DRAG_THRESHOLD = 5;

export function RingIndicator({ count, activeIndex, onChangeIndex }: RingIndicatorProps) {
  const [isDragging, setIsDragging] = useState(false);
  const pointerDown = useRef(false);
  const didDrag = useRef(false);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(0);
  const pointerId = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Offset so the active tick is always at the center
  const offset = (((count - 1) / 2) - activeIndex) * TICK_SPACING;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerDown.current = true;
    didDrag.current = false;
    dragStartX.current = e.clientX;
    dragStartIndex.current = activeIndex;
    pointerId.current = e.pointerId;
  }, [activeIndex]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!pointerDown.current) return;

    const dx = e.clientX - dragStartX.current;

    // Once past threshold, commit to dragging
    if (!didDrag.current && Math.abs(dx) > DRAG_THRESHOLD) {
      didDrag.current = true;
      setIsDragging(true);
      // Now capture pointer so drag continues even if cursor leaves ticks
      if (containerRef.current && pointerId.current !== null) {
        containerRef.current.setPointerCapture(pointerId.current);
      }
    }

    if (!didDrag.current) return;

    const indexDelta = Math.round(-dx / TICK_SPACING);
    const newIndex = Math.max(0, Math.min(count - 1, dragStartIndex.current + indexDelta));

    if (newIndex !== activeIndex) {
      onChangeIndex(newIndex);
    }
  }, [activeIndex, count, onChangeIndex]);

  const handlePointerUp = useCallback(() => {
    pointerDown.current = false;
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  const handleTickClick = useCallback((index: number) => {
    // Only navigate on clean click (no drag occurred)
    if (!didDrag.current) {
      onChangeIndex(index);
    }
  }, [onChangeIndex]);

  return (
    <div
      ref={containerRef}
      className={styles.ring}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      data-dragging={isDragging}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={count - 1}
      aria-valuenow={activeIndex}
      aria-label="Image navigator"
      tabIndex={0}
    >
      <div
        className={styles.track}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={styles.tickSlot}>
            <button
              className={styles.tick}
              data-active={i === activeIndex}
              onClick={() => handleTickClick(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
