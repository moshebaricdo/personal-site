'use client';

import { useDialKit } from 'dialkit';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Nav } from '@/components/Nav';
import { CaseStudyCover } from './CaseStudyCover';
import styles from './CaseStudy.module.css';

interface CaseStudyTopProps {
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}

export function CaseStudyTop({ aspectRatio = '16/9' }: CaseStudyTopProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const controls = useDialKit('Case Study Top', {
    sticky: {
      top: [0, 0, 48],
      overlayHeight: [88, 32, 220],
      headingOffset: [40, 0, 160],
      stopOffset: [310, -240, 900],
    },
    cover: {
      bleedDesktop: [40, 0, 160],
    },
    blur: {
      layerHeight: [120, 56, 240],
      strength: [16, 0, 28],
      startOpacity: [0.8, 0, 1],
      midOpacity: [0.4, 0, 1],
      midStop: [55, 30, 90],
      maskCutoff: [50, 35, 95],
      fadeStart: [0.7, 0, 0.9],
      fadeEnd: [1, 0.1, 1],
    },
    fade: {
      start: [0.2, 0, 0.9],
      end: [0.6, 0.1, 1],
      minOpacity: [0, 0, 1],
    },
    entry: {
      distance: [10, 0, 40],
      duration: [0.28, 0.1, 1],
      delay: [0.03, 0, 0.4],
    },
  });

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start start', 'end start'],
  });
  const coverOpacity = useTransform(scrollYProgress, (value) => {
    const start = Math.min(controls.fade.start, controls.fade.end - 0.001);
    const end = Math.max(controls.fade.end, start + 0.001);
    const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
    return 1 - t * (1 - controls.fade.minOpacity);
  });
  const blurOpacity = useTransform(scrollYProgress, (value) => {
    const start = Math.min(controls.blur.fadeStart, controls.blur.fadeEnd - 0.001);
    const end = Math.max(controls.blur.fadeEnd, start + 0.001);
    const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
    return 1 - t;
  });
  const stickyTrackHeight = Math.max(
    0,
    controls.sticky.overlayHeight + controls.sticky.stopOffset
  );

  const styleVars = {
    '--cs-nav-sticky-top': `${controls.sticky.top}px`,
    '--cs-hero-heading-offset': `${controls.sticky.headingOffset}px`,
    '--cs-cover-bleed-desktop': `${controls.cover.bleedDesktop}px`,
    '--cs-blur-band-height': `${controls.blur.layerHeight}px`,
    '--cs-blur-strength': `${controls.blur.strength}px`,
    '--cs-blur-start-opacity': controls.blur.startOpacity,
    '--cs-blur-mid-opacity': controls.blur.midOpacity,
    '--cs-blur-mid-stop': `${controls.blur.midStop}%`,
    '--cs-blur-mask-cutoff': `${controls.blur.maskCutoff}%`,
  } as React.CSSProperties;

  return (
    <div className={styles.heroTop} style={styleVars} ref={rootRef}>
      <div
        className={styles.stickyTrack}
        style={{ height: stickyTrackHeight, marginBottom: -stickyTrackHeight }}
      >
        <div
          className={styles.navOverlay}
          style={{
            top: controls.sticky.top,
            height: controls.sticky.overlayHeight,
          }}
        >
          <Nav />
        </div>
        <motion.div
          className={styles.blurOverlay}
          aria-hidden="true"
          style={{
            top: controls.sticky.top,
            height: controls.blur.layerHeight,
            marginTop: -controls.sticky.overlayHeight,
            opacity: blurOpacity,
          }}
        />
      </div>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -controls.entry.distance }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: controls.entry.duration,
                delay: controls.entry.delay,
                ease: [0, 0, 0.2, 1],
              }
        }
        style={{ opacity: coverOpacity }}
      >
        <CaseStudyCover aspectRatio={aspectRatio} />
      </motion.div>
    </div>
  );
}
