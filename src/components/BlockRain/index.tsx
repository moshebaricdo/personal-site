'use client';

import { useEffect, useRef } from 'react';
import type { Engine, Body } from 'matter-js';
import styles from './BlockRain.module.css';

// Brand palette
const COLORS = ['#4C42CF', '#E11970', '#F46800', '#34BD43'];

const BLOCKS_PER_BURST = 22;
const SPAWN_INTERVAL_MS = 70;
// How long the pile rests before the floor drops away
const REST_DURATION_MS = 3200;

type FallingBlock = {
  body: Body;
  el: HTMLDivElement;
  halfWidth: number;
  halfHeight: number;
  // Offset from the body's center of mass to the geometric center of the
  // bounding box, in body-local coordinates. Zero for simple rectangles;
  // nonzero for compound bodies (C-blocks) whose centroid is off-center.
  offsetX: number;
  offsetY: number;
};

type Session = {
  engine: Engine;
  Matter: typeof import('matter-js');
  blocks: FallingBlock[];
  statics: Body[];
  rafId: number;
  timers: ReturnType<typeof setTimeout>[];
  teardownTimer: ReturnType<typeof setTimeout> | null;
  floorRemoved: boolean;
};

/**
 * Full-viewport overlay of "code block" shapes that rain down and pile up
 * in the bottom corners, driven by a Matter.js rigid-body simulation.
 * Trigger a burst by incrementing the `trigger` prop.
 */
export function BlockRain({ trigger }: { trigger: number }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<Session | null>(null);

  useEffect(() => {
    if (trigger === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Desktop only: skip tablet/mobile viewports and touch-primary devices
    // (touch taps can still fire mouseenter)
    if (
      !window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)')
        .matches
    ) {
      return;
    }

    let cancelled = false;

    const run = async () => {
      const Matter = await import('matter-js');
      if (cancelled || !overlayRef.current) return;

      const session = sessionRef.current?.floorRemoved === false
        ? sessionRef.current
        : startSession(Matter, overlayRef.current, sessionRef);

      spawnBurst(session, overlayRef.current!);

      // Reset the rest timer so re-hovers extend the pile's lifetime
      if (session.teardownTimer) clearTimeout(session.teardownTimer);
      session.teardownTimer = setTimeout(() => {
        releaseFloor(session);
      }, BLOCKS_PER_BURST * SPAWN_INTERVAL_MS + REST_DURATION_MS);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [trigger]);

  // Full cleanup on unmount only
  useEffect(() => {
    return () => {
      if (sessionRef.current) destroySession(sessionRef.current, sessionRef);
    };
  }, []);

  return <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />;
}

function startSession(
  Matter: typeof import('matter-js'),
  overlay: HTMLDivElement,
  sessionRef: React.MutableRefObject<Session | null>
): Session {
  // A previous session may still be draining off-screen; clear it
  if (sessionRef.current) destroySession(sessionRef.current, sessionRef);

  const { Engine, Bodies, Composite } = Matter;
  const engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.0012 } });

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Invisible floor and outer walls; thick enough that fast bodies can't tunnel
  const floor = Bodies.rectangle(vw / 2, vh + 60, vw * 2, 120, { isStatic: true });
  const leftWall = Bodies.rectangle(-60, vh / 2, 120, vh * 4, { isStatic: true });
  const rightWall = Bodies.rectangle(vw + 60, vh / 2, 120, vh * 4, { isStatic: true });
  const statics = [floor, leftWall, rightWall];
  Composite.add(engine.world, statics);

  const session: Session = {
    engine,
    Matter,
    blocks: [],
    statics,
    rafId: 0,
    timers: [],
    teardownTimer: null,
    floorRemoved: false,
  };

  let lastTime = performance.now();
  const step = (time: number) => {
    const delta = Math.min(time - lastTime, 33);
    lastTime = time;
    Engine.update(engine, delta);

    for (let i = session.blocks.length - 1; i >= 0; i--) {
      const block = session.blocks[i];
      const { x, y } = block.body.position;
      const angle = block.body.angle;

      // Cull blocks that have fallen through the released floor
      if (y - block.halfHeight > window.innerHeight + 200) {
        block.el.remove();
        Composite.remove(engine.world, block.body);
        session.blocks.splice(i, 1);
        continue;
      }

      // Rotate the centroid→geometric-center offset into world space
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const cx = x + block.offsetX * cos - block.offsetY * sin;
      const cy = y + block.offsetX * sin + block.offsetY * cos;

      block.el.style.transform = `translate3d(${cx - block.halfWidth}px, ${
        cy - block.halfHeight
      }px, 0) rotate(${angle}rad)`;
    }

    if (session.floorRemoved && session.blocks.length === 0) {
      destroySession(session, sessionRef);
      return;
    }
    session.rafId = requestAnimationFrame(step);
  };
  session.rafId = requestAnimationFrame(step);

  sessionRef.current = session;
  return session;
}

function spawnBurst(session: Session, overlay: HTMLDivElement) {
  const vw = window.innerWidth;

  for (let i = 0; i < BLOCKS_PER_BURST; i++) {
    const timer = setTimeout(() => {
      // Bias spawns into the outer margins so piles form in the corners,
      // away from the content column
      const leftSide = i % 2 === 0;
      const zone = Math.min(vw * 0.22, 320);
      const x = leftSide
        ? 30 + Math.random() * zone
        : vw - 30 - Math.random() * zone;

      addBlock(session, overlay, x);
    }, i * SPAWN_INTERVAL_MS);
    session.timers.push(timer);
  }
}

const BODY_OPTIONS = {
  restitution: 0.08,
  friction: 0.9,
  frictionStatic: 1.2,
  density: 0.002,
};

function addBlock(session: Session, overlay: HTMLDivElement, x: number) {
  const { Bodies, Composite, Body } = session.Matter;

  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const y = -100 - Math.random() * 320;
  const angle = (Math.random() - 0.5) * 0.6;

  const roll = Math.random();
  let svg: string;
  let width: number;
  let height: number;
  let body: Body;
  let offsetX = 0;
  let offsetY = 0;

  if (roll < 0.25) {
    // C-shaped wrapper block ("play together") with a real hollow mouth,
    // built as a compound body: spine + top arm + bottom arm
    width = 84 + Math.random() * 44;
    const armH = 26;
    const spineW = 18;
    const bottomH = 18;
    const mouthH = 24 + Math.random() * 32;
    height = armH + mouthH + bottomH;
    svg = cBlockSvg(width, height, armH, spineW, bottomH, color);

    const parts = [
      Bodies.rectangle(width / 2, armH / 2, width, armH, BODY_OPTIONS),
      Bodies.rectangle(spineW / 2, armH + mouthH / 2, spineW, mouthH, BODY_OPTIONS),
      Bodies.rectangle(width / 2, armH + mouthH + bottomH / 2, width, bottomH, BODY_OPTIONS),
    ];
    body = session.Matter.Body.create({ parts, ...BODY_OPTIONS });

    // Body.create places position at the center of mass, which sits left of
    // the bounding-box center because of the spine. Record the difference.
    offsetX = width / 2 - body.position.x;
    offsetY = height / 2 - body.position.y;

    Body.setPosition(body, { x, y });
    Body.setAngle(body, angle);
  } else {
    let variant: 'stack' | 'hat' | 'cap';
    if (roll < 0.7) variant = 'stack';
    else if (roll < 0.85) variant = 'hat';
    else variant = 'cap';

    if (variant === 'hat') {
      width = 70 + Math.random() * 40;
      height = 30 + Math.random() * 8;
      svg = hatBlockSvg(width, height, color);
    } else if (variant === 'cap') {
      width = 44 + Math.random() * 36;
      height = 26 + Math.random() * 6;
      svg = capBlockSvg(width, height, color);
    } else {
      width = 48 + Math.random() * 80;
      height = 26 + Math.random() * 10;
      const withPill = width >= 84 && Math.random() < 0.6;
      svg = stackBlockSvg(width, height, color, withPill);
    }

    body = Bodies.rectangle(x, y, width, height, { ...BODY_OPTIONS, angle });
  }

  Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
  Composite.add(session.engine.world, body);

  const el = document.createElement('div');
  el.className = styles.block;
  el.innerHTML = svg;
  overlay.appendChild(el);

  session.blocks.push({
    body,
    el,
    halfWidth: width / 2,
    halfHeight: height / 2,
    offsetX,
    offsetY,
  });
}

const R = 4; // corner radius
const D = 4; // notch/tab depth

/** Top edge, left to right, with the standard notch. */
function topNotch(w: number): string {
  return `M ${R} 0 H 12 l 4 ${D} h 16 l 4 -${D} H ${w - R} a ${R} ${R} 0 0 1 ${R} ${R}`;
}

/** Bottom edge, right to left, with the protruding tab. */
function bottomTab(w: number, h: number): string {
  return `V ${h - R} a ${R} ${R} 0 0 1 -${R} ${R} H 36 l -4 ${D} h -16 l -4 -${D} H ${R} a ${R} ${R} 0 0 1 -${R} -${R}`;
}

function wrapSvg(w: number, svgH: number, inner: string): string {
  return `<svg width="${w}" height="${svgH}" viewBox="0 0 ${w} ${svgH}" fill="none" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

/** Standard stack block: notch on top, tab on the bottom. */
function stackBlockSvg(w: number, h: number, color: string, withPill: boolean): string {
  const path = `${topNotch(w)} ${bottomTab(w, h)} V ${R} a ${R} ${R} 0 0 1 ${R} -${R} Z`;

  let pill = '';
  if (withPill) {
    const px = w * 0.38;
    const ph = h - 12;
    pill = `<rect x="${px}" y="6" width="${w - px - 7}" height="${ph}" rx="${
      ph / 2
    }" fill="rgba(0,0,0,0.28)"/>`;
  }

  return wrapSvg(w, h + D, `<path d="${path}" fill="${color}"/>${pill}`);
}

/** Hat block ("when run"): flat rounded top with no notch, tab on the bottom. */
function hatBlockSvg(w: number, h: number, color: string): string {
  const path = [
    `M ${R} 0`,
    `H ${w - R}`,
    `a ${R} ${R} 0 0 1 ${R} ${R}`,
    bottomTab(w, h),
    `V ${R}`,
    `a ${R} ${R} 0 0 1 ${R} -${R}`,
    'Z',
  ].join(' ');
  return wrapSvg(w, h + D, `<path d="${path}" fill="${color}"/>`);
}

/** Cap block ("end"): notch on top, flat rounded bottom, nothing connects below. */
function capBlockSvg(w: number, h: number, color: string): string {
  const path = [
    topNotch(w),
    `V ${h - R}`,
    `a ${R} ${R} 0 0 1 -${R} ${R}`,
    `H ${R}`,
    `a ${R} ${R} 0 0 1 -${R} -${R}`,
    `V ${R}`,
    `a ${R} ${R} 0 0 1 ${R} -${R}`,
    'Z',
  ].join(' ');
  return wrapSvg(w, h, `<path d="${path}" fill="${color}"/>`);
}

/**
 * C-shaped wrapper block ("play together"): top arm with notch, hollow mouth
 * with an inner tab, bottom arm with the closing tab.
 */
function cBlockSvg(
  w: number,
  h: number,
  armH: number,
  spineW: number,
  bottomH: number,
  color: string
): string {
  const mouthTop = armH;
  const mouthBottom = h - bottomH;
  const ir = 3; // inner corner radius
  const path = [
    topNotch(w),
    // right edge of top arm, down to the mouth
    `V ${mouthTop - R}`,
    `a ${R} ${R} 0 0 1 -${R} ${R}`,
    // underside of top arm, right to left, with the inner tab
    `H ${spineW + 36} l -4 ${D} h -16 l -4 -${D} H ${spineW + ir}`,
    `a ${ir} ${ir} 0 0 0 -${ir} ${ir}`,
    // inner spine edge down to the bottom arm
    `V ${mouthBottom - ir}`,
    `a ${ir} ${ir} 0 0 0 ${ir} ${ir}`,
    // top of bottom arm, left to right
    `H ${w - R}`,
    `a ${R} ${R} 0 0 1 ${R} ${R}`,
    bottomTab(w, h),
    `V ${R}`,
    `a ${R} ${R} 0 0 1 ${R} -${R}`,
    'Z',
  ].join(' ');
  return wrapSvg(w, h + D, `<path d="${path}" fill="${color}"/>`);
}

/** Remove the floor so the pile falls through the bottom of the viewport. */
function releaseFloor(session: Session) {
  if (session.floorRemoved) return;
  session.floorRemoved = true;
  const { Composite } = session.Matter;
  for (const body of session.statics) {
    Composite.remove(session.engine.world, body);
  }
  // Nudge the pile so it doesn't fall as one perfectly rigid sheet
  for (const block of session.blocks) {
    session.Matter.Body.setAngularVelocity(
      block.body,
      (Math.random() - 0.5) * 0.06
    );
  }
}

function destroySession(
  session: Session,
  sessionRef: React.MutableRefObject<Session | null>
) {
  cancelAnimationFrame(session.rafId);
  session.timers.forEach(clearTimeout);
  if (session.teardownTimer) clearTimeout(session.teardownTimer);
  for (const block of session.blocks) {
    block.el.remove();
  }
  session.Matter.Engine.clear(session.engine);
  if (sessionRef.current === session) {
    sessionRef.current = null;
  }
}
