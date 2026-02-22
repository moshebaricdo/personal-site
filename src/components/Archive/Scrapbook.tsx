'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDialKit } from 'dialkit';
import { motion, useReducedMotion } from 'motion/react';
import { categories, CategoryData, ArchiveItem } from './data';
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

function getItemRotation(
  item: ArchiveItem,
  skewRange: number,
  alternationStrength: number
): number {
  const randomUnit = seededRandom(item.id) * 2 - 1;
  const alternatingUnit = item.id % 2 === 0 ? 1 : -1;
  const blendedUnit =
    randomUnit * (1 - alternationStrength) + alternatingUnit * alternationStrength;

  return blendedUnit * skewRange;
}

const DEFAULT_SPACING = 40;
const DEFAULT_DRAG_THRESHOLD = 5;
const DEFAULT_SNAP_BIAS = 0.7;
const DEFAULT_RANDOM_SKEW = 0;
const DEFAULT_VISIBLE_RANGE = 3;
const DEFAULT_INACTIVE_SCALE = 0.65;
const DEFAULT_ACTIVE_SCALE = 1.07;
const DEFAULT_INACTIVE_OPACITY = 0.8;
const DEFAULT_MOBILE_GAP = 16;
const DEFAULT_PATH_CURVE = 0;
const DEFAULT_PATH_WAVE_AMPLITUDE = 0;
const DEFAULT_PATH_WAVE_FREQUENCY = 1.3;
const DEFAULT_REFERENCE_ASPECT = 4 / 3;
const BASE_IMAGE_WIDTH = 460;

function getAspectRatioValue(aspectRatio?: ArchiveItem['aspectRatio']): number {
  if (!aspectRatio) return DEFAULT_REFERENCE_ASPECT;
  const [width, height] = aspectRatio.split('/').map(Number);
  if (!width || !height) return DEFAULT_REFERENCE_ASPECT;
  return width / height;
}

/** How many images to advance for a given drag delta */
function calcSnapShift(delta: number, imageSpacing: number, snapBias: number): number {
  const safeSpacing = Math.max(1, imageSpacing);
  const raw = -delta / safeSpacing;
  return raw > 0
    ? Math.floor(raw + snapBias)
    : Math.ceil(raw - snapBias);
}

function getDistanceOffset(
  distance: number,
  activeNeighborGap: number,
  inactiveGap: number
): number {
  if (distance === 0) return 0;

  const direction = Math.sign(distance);
  const steps = Math.abs(distance);
  const tailSteps = Math.max(0, steps - 1);

  return direction * (activeNeighborGap + tailSteps * inactiveGap);
}

function getBalancedDistanceOffset(
  distance: number,
  activeIndex: number,
  itemScales: number[],
  activeNeighborGap: number,
  inactiveGap: number
): number {
  if (distance === 0) return 0;

  const direction = Math.sign(distance);
  const steps = Math.abs(distance);
  let offset = 0;
  let previousIndex = activeIndex;

  for (let step = 1; step <= steps; step += 1) {
    const currentIndex = activeIndex + direction * step;
    const gap = step === 1 ? activeNeighborGap : inactiveGap;
    const previousWidth = BASE_IMAGE_WIDTH * itemScales[previousIndex];
    const currentWidth = BASE_IMAGE_WIDTH * itemScales[currentIndex];
    offset += (previousWidth + currentWidth) / 2 + gap;
    previousIndex = currentIndex;
  }

  return direction * offset;
}

export function Scrapbook({ category }: ScrapbookProps) {
  const controls = useDialKit('Archive Scrapbook', {
    layout: {
      activeNeighborGap: [DEFAULT_SPACING, 0, 900],
      inactiveGap: [DEFAULT_SPACING, 0, 900],
      balanceGapsByScale: true,
      mobileGap: [DEFAULT_MOBILE_GAP, 4, 40],
      activeScale: [DEFAULT_ACTIVE_SCALE, 0.5, 1.5],
      inactiveScale: [DEFAULT_INACTIVE_SCALE, 0.5, 1],
      inactiveScaleStep: [0.2, 0, 0.4],
      inactiveScaleMin: [0.3, 0.1, 1],
      inactiveOpacity: [DEFAULT_INACTIVE_OPACITY, 0.15, 1],
      inactiveOpacityStep: [0.28, 0, 0.35],
      inactiveOpacityMin: [0.07, 0.05, 1],
      visibleRange: [DEFAULT_VISIBLE_RANGE, 1, 6],
    },
    captions: {
      showInactive: false,
    },
    rotation: {
      randomSkew: [DEFAULT_RANDOM_SKEW, 0, 24],
      alternationStrength: [0, 0, 1],
      activeRotation: [0, -30, 30],
    },
    path: {
      rotate: [0, -20, 20],
      skewX: [0, -20, 20],
      skewY: [0, -20, 20],
      verticalOffset: [0, -140, 140],
      curve: [DEFAULT_PATH_CURVE, -240, 240],
      waveAmplitude: [DEFAULT_PATH_WAVE_AMPLITUDE, 0, 280],
      waveFrequency: [DEFAULT_PATH_WAVE_FREQUENCY, 0, 4],
      wavePhase: [0, -3.14, 3.14],
    },
    effects: {
      inactiveBlur: [20, 0, 30],
      blurStep: [10, 0, 16],
      maxBlur: [30, 0, 40],
    },
    optics: {
      normalizeInactiveByAspect: true,
      referenceAspect: [DEFAULT_REFERENCE_ASPECT, 1, 2],
      normalizationStrength: [0.7, 0, 1.5],
    },
    drag: {
      threshold: [DEFAULT_DRAG_THRESHOLD, 0, 24],
      snapBias: [DEFAULT_SNAP_BIAS, 0.35, 0.95],
    },
    motion: {
      spring: {
        type: 'spring',
        visualDuration: 0.25,
        bounce: 0.25,
      },
    },
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
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
  const categoryIndex = categories.findIndex((entry) => entry.slug === category.slug);
  const prevCategory =
    categories[
      (categoryIndex - 1 + categories.length) % categories.length
    ];
  const nextCategory = categories[(categoryIndex + 1) % categories.length];
  const canGoBack = activeIndex > 0;
  const canGoForward = activeIndex < items.length - 1;

  const goBack = useCallback(() => {
    if (canGoBack) setActiveIndex(i => i - 1);
  }, [canGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward) setActiveIndex(i => i + 1);
  }, [canGoForward]);

  // Avoid mount-time fan-out from stacked default transforms.
  useEffect(() => {
    setHasMounted(true);
  }, []);

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
    if (!dragRef.current.didDrag && Math.abs(dx) > controls.drag.threshold) {
      dragRef.current.didDrag = true;
      setIsDragging(true);
      stageRef.current?.setPointerCapture(e.pointerId);
    }

    if (dragRef.current.didDrag) {
      dragDeltaRef.current = dx;
      setDragDelta(dx);
    }
  }, [controls.drag.threshold]);

  const handleStagePointerUp = useCallback(() => {
    if (dragRef.current.didDrag) {
      const delta = dragDeltaRef.current;
      const shift = calcSnapShift(
        delta,
        controls.layout.activeNeighborGap,
        controls.drag.snapBias
      );
      const newIndex = Math.max(0, Math.min(items.length - 1, dragRef.current.startIndex + shift));
      setActiveIndex(newIndex);
    }

    dragRef.current = { ...dragRef.current, pointerId: null, didDrag: false };
    dragDeltaRef.current = 0;
    setIsDragging(false);
    setDragDelta(0);
  }, [controls.drag.snapBias, controls.layout.activeNeighborGap, items.length]);

  // Projected index during drag — ring indicator follows in real time
  const projectedIndex = isDragging
    ? Math.max(0, Math.min(items.length - 1,
        dragRef.current.startIndex +
          calcSnapShift(
            dragDelta,
            controls.layout.activeNeighborGap,
            controls.drag.snapBias
          )
      ))
    : activeIndex;
  const pathRotateRad = (controls.path.rotate * Math.PI) / 180;
  const pathSkewXRad = (controls.path.skewX * Math.PI) / 180;
  const pathSkewYRad = (controls.path.skewY * Math.PI) / 180;
  const pathCos = Math.cos(pathRotateRad);
  const pathSin = Math.sin(pathRotateRad);
  const pathTanX = Math.tan(pathSkewXRad);
  const pathTanY = Math.tan(pathSkewYRad);
  const itemScales = items.map((item, index) => {
    const distance = index - activeIndex;
    const distanceAbs = Math.abs(distance);
    if (distance === 0) return controls.layout.activeScale;

    const aspectValue = getAspectRatioValue(item.aspectRatio);
    const inactiveScaleByDistance = Math.max(
      controls.layout.inactiveScaleMin,
      controls.layout.inactiveScale -
        Math.max(0, distanceAbs - 1) * controls.layout.inactiveScaleStep
    );
    const areaCompensationBase = Math.sqrt(
      aspectValue / controls.optics.referenceAspect
    );
    const opticalCompensation = controls.optics.normalizeInactiveByAspect
      ? 1 + (areaCompensationBase - 1) * controls.optics.normalizationStrength
      : 1;

    return inactiveScaleByDistance * opticalCompensation;
  });

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
            const isVisible = Math.abs(distance) <= controls.layout.visibleRange;

            // Rotation: active is 0, others use seeded random
            const rotation = isActive
              ? controls.rotation.activeRotation
              : getItemRotation(
                  item,
                  controls.rotation.randomSkew,
                  controls.rotation.alternationStrength
                );

            // Scale: active is 1, others are smaller
            const distanceAbs = Math.abs(distance);
            const scale = itemScales[index];
            const inactiveOpacityByDistance = Math.max(
              controls.layout.inactiveOpacityMin,
              controls.layout.inactiveOpacity -
                Math.max(0, distanceAbs - 1) * controls.layout.inactiveOpacityStep
            );
            const opacity = isActive ? 1 : inactiveOpacityByDistance;
            const inactiveBlurByDistance = Math.min(
              controls.effects.maxBlur,
              controls.effects.inactiveBlur +
                Math.max(0, distanceAbs - 1) * controls.effects.blurStep
            );
            const blurPx = isActive ? 0 : inactiveBlurByDistance;

            // Base path before path transforms
            const baseX =
              (controls.layout.balanceGapsByScale
                ? getBalancedDistanceOffset(
                    distance,
                    activeIndex,
                    itemScales,
                    controls.layout.activeNeighborGap,
                    controls.layout.inactiveGap
                  )
                : getDistanceOffset(
                    distance,
                    controls.layout.activeNeighborGap,
                    controls.layout.inactiveGap
                  )) + (isDragging ? dragDelta : 0);
            const baseY =
              distance * controls.path.verticalOffset +
              Math.pow(Math.abs(distance), 2) * controls.path.curve * 0.1 +
              Math.sin(
                distance * controls.path.waveFrequency + controls.path.wavePhase
              ) *
                controls.path.waveAmplitude;
            const skewedX = baseX + pathTanX * baseY;
            const skewedY = baseY + pathTanY * baseX;
            const xOffset = skewedX * pathCos - skewedY * pathSin;
            const yOffset = skewedX * pathSin + skewedY * pathCos;

            return (
              <motion.div
                key={item.id}
                className={styles.slide}
                data-active={isActive}
                initial={false}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  rotate: rotation,
                  scale: scale,
                  opacity: opacity,
                  zIndex: isActive ? 10 : 5 - Math.abs(distance),
                }}
                transition={
                  isDragging || !hasMounted
                    ? { duration: 0 }
                    : prefersReducedMotion
                      ? { duration: 0 }
                      : controls.motion.spring
                }
                style={{
                  visibility: isVisible ? 'visible' : 'hidden',
                  filter: `blur(${blurPx}px)`,
                }}
              >
                <div
                  className={styles.image}
                  style={{ aspectRatio: item.aspectRatio || '4/3' }}
                >
                  {isVisible && <PlaceholderIcon />}
                  {isVisible && (isActive || controls.captions.showInactive) && (
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
      <div
        className={styles.mobileStack}
        style={{ '--mobile-stack-gap': `${controls.layout.mobileGap}px` } as React.CSSProperties}
      >
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

      <div className={styles.bottomControlsContainer}>
        <div className={styles.bottomControls}>
          <Link
            href={`/archive/${prevCategory.slug}`}
            className={styles.categoryNavLink}
            data-direction="prev"
          >
            <ArrowIcon direction="left" />
            <span>{prevCategory.name}</span>
          </Link>

          {/* Ring indicator — follows projectedIndex during drag */}
          <RingIndicator
            count={items.length}
            activeIndex={projectedIndex}
            onChangeIndex={setActiveIndex}
          />

          <Link
            href={`/archive/${nextCategory.slug}`}
            className={styles.categoryNavLink}
            data-direction="next"
          >
            <span>{nextCategory.name}</span>
            <ArrowIcon direction="right" />
          </Link>
        </div>
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
