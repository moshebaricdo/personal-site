'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useReducedMotion } from 'motion/react';
import { folders } from './data';
import styles from './InfiniteCanvas.module.css';

/* ─────────────────────────────────────────────────────────
 * CANVAS TUNING
 *
 * One "tile" holds every archive item scattered around a
 * central hole (where the page header sits). Tiles repeat
 * in every direction, so the canvas pans forever.
 * ───────────────────────────────────────────────────────── */

const TILE_W = 3200; // world px, width of one repeating tile
const TILE_H = 2200; // world px, height of one repeating tile

const MIN_SCALE = 0.6; // limited zoom out
const MAX_SCALE = 1.5; // limited zoom in

const WHEEL_ZOOM_SENSITIVITY = 0.0025; // ctrl+wheel / trackpad pinch
const KEY_PAN_STEP = 90; // px per arrow key press
const KEY_ZOOM_STEP = 1.18; // multiplier per +/- press

const FRICTION = 0.92; // inertia decay per frame
const MIN_FLING_SPEED = 0.08; // px/frame below which inertia stops
const FOCUS_EASE = 0.16; // per-frame approach rate when centering a focused item

/* Layout: the hole in the middle of the tile keeps the initial
 * view clear for the page header, matching the mockup. */
const GRID_COLS = 8;
const GRID_ROWS = 5;
const HOLE_RX = 640; // ellipse radii of the empty center, world px
const HOLE_RY = 430;
const LAYOUT_SEED = 20260728;

interface PlacedItem {
  id: number;
  caption: string;
  folder: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RATIOS: Record<string, number> = {
  '4/3': 4 / 3,
  '1/1': 1,
  '2/3': 2 / 3,
};

/** Deterministic scatter: jittered grid cells, skipping the center hole. */
const placedItems: PlacedItem[] = (() => {
  const flat = folders.flatMap((folder) =>
    folder.items.map((item) => ({ ...item, folder: folder.name }))
  );

  const rand = mulberry32(LAYOUT_SEED);
  const cellW = TILE_W / GRID_COLS;
  const cellH = TILE_H / GRID_ROWS;

  const cells: { cx: number; cy: number }[] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const cx = (col + 0.5) * cellW;
      const cy = (row + 0.5) * cellH;
      const dx = (cx - TILE_W / 2) / HOLE_RX;
      const dy = (cy - TILE_H / 2) / HOLE_RY;
      if (dx * dx + dy * dy < 1) continue;
      cells.push({ cx, cy });
    }
  }

  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  return flat.map((item, index) => {
    const cell = cells[index % cells.length];
    const ratio = (item.aspectRatio && RATIOS[item.aspectRatio]) || 3 / 2;
    const w = Math.round(200 + rand() * 90);
    const h = Math.round(w / ratio);
    return {
      id: item.id,
      caption: item.caption,
      folder: item.folder,
      x: Math.round(cell.cx + (rand() - 0.5) * 90 - w / 2),
      y: Math.round(cell.cy + (rand() - 0.5) * 70 - h / 2),
      w,
      h,
    };
  });
})();

interface TileRange {
  i0: number;
  i1: number;
  j0: number;
  j1: number;
}

export function InfiniteCanvas() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);

  // Camera lives in refs so panning never re-renders React.
  const camera = useRef({ x: 0, y: 0, s: 1 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const velocity = useRef({ x: 0, y: 0 });
  const pinchDistance = useRef(0);
  const rafId = useRef(0);
  const [range, setRange] = useState<TileRange>({ i0: -1, i1: 1, j0: -1, j1: 1 });
  const [panning, setPanning] = useState(false);

  const stopAnimation = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = 0;
  }, []);

  /** Push camera to the DOM and virtualize which tile copies exist. */
  const applyCamera = useCallback(() => {
    const container = containerRef.current;
    const world = worldRef.current;
    if (!container || !world) return;

    const { x, y, s } = camera.current;
    world.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;

    const vw = container.clientWidth;
    const vh = container.clientHeight;
    const next: TileRange = {
      i0: Math.floor(-x / (TILE_W * s)),
      i1: Math.floor((vw - x) / (TILE_W * s)),
      j0: Math.floor(-y / (TILE_H * s)),
      j1: Math.floor((vh - y) / (TILE_H * s)),
    };
    setRange((prev) =>
      prev.i0 === next.i0 && prev.i1 === next.i1 && prev.j0 === next.j0 && prev.j1 === next.j1
        ? prev
        : next
    );
  }, []);

  const zoomAt = useCallback(
    (fx: number, fy: number, nextScale: number) => {
      const cam = camera.current;
      const s = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
      cam.x = fx - (fx - cam.x) * (s / cam.s);
      cam.y = fy - (fy - cam.y) * (s / cam.s);
      cam.s = s;
      applyCamera();
    },
    [applyCamera]
  );

  /** Smoothly bring a world-space point to the viewport center. */
  const centerOnWorldPoint = useCallback(
    (wx: number, wy: number) => {
      const container = containerRef.current;
      if (!container) return;
      stopAnimation();

      const cam = camera.current;
      const tx = container.clientWidth / 2 - wx * cam.s;
      const ty = container.clientHeight / 2 - wy * cam.s;

      if (reducedMotion) {
        cam.x = tx;
        cam.y = ty;
        applyCamera();
        return;
      }

      const step = () => {
        cam.x += (tx - cam.x) * FOCUS_EASE;
        cam.y += (ty - cam.y) * FOCUS_EASE;
        applyCamera();
        if (Math.abs(tx - cam.x) > 0.5 || Math.abs(ty - cam.y) > 0.5) {
          rafId.current = requestAnimationFrame(step);
        } else {
          cam.x = tx;
          cam.y = ty;
          applyCamera();
          rafId.current = 0;
        }
      };
      rafId.current = requestAnimationFrame(step);
    },
    [applyCamera, reducedMotion, stopAnimation]
  );

  const startInertia = useCallback(() => {
    if (reducedMotion) return;
    const step = () => {
      const cam = camera.current;
      const v = velocity.current;
      v.x *= FRICTION;
      v.y *= FRICTION;
      if (Math.hypot(v.x, v.y) < MIN_FLING_SPEED) {
        rafId.current = 0;
        return;
      }
      cam.x += v.x;
      cam.y += v.y;
      applyCamera();
      rafId.current = requestAnimationFrame(step);
    };
    rafId.current = requestAnimationFrame(step);
  }, [applyCamera, reducedMotion]);

  /* Initial framing: the tile's empty center under the page header. */
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cam = camera.current;
    cam.x = container.clientWidth / 2 - TILE_W / 2;
    cam.y = container.clientHeight / 2 - TILE_H / 2;
    applyCamera();

    const onResize = () => applyCamera();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [applyCamera]);

  /* Wheel must be non-passive to prevent page scroll/browser zoom. */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopAnimation();
      const factor = e.deltaMode === 1 ? 16 : 1;
      if (e.ctrlKey || e.metaKey) {
        const rect = container.getBoundingClientRect();
        zoomAt(
          e.clientX - rect.left,
          e.clientY - rect.top,
          camera.current.s * Math.exp(-e.deltaY * factor * WHEEL_ZOOM_SENSITIVITY)
        );
      } else {
        camera.current.x -= e.deltaX * factor;
        camera.current.y -= e.deltaY * factor;
        applyCamera();
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [applyCamera, stopAnimation, zoomAt]);

  useEffect(() => stopAnimation, [stopAnimation]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      stopAnimation();
      containerRef.current?.setPointerCapture(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      velocity.current = { x: 0, y: 0 };
      if (pointers.current.size === 2) {
        const [a, b] = [...pointers.current.values()];
        pinchDistance.current = Math.hypot(a.x - b.x, a.y - b.y);
      }
      setPanning(true);
    },
    [stopAnimation]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const prev = pointers.current.get(e.pointerId);
      if (!prev) return;
      const next = { x: e.clientX, y: e.clientY };
      pointers.current.set(e.pointerId, next);
      const cam = camera.current;

      if (pointers.current.size === 1) {
        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        cam.x += dx;
        cam.y += dy;
        velocity.current.x = velocity.current.x * 0.6 + dx * 0.4;
        velocity.current.y = velocity.current.y * 0.6 + dy * 0.4;
        applyCamera();
      } else if (pointers.current.size === 2) {
        const [a, b] = [...pointers.current.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const rect = containerRef.current!.getBoundingClientRect();
        const mx = (a.x + b.x) / 2 - rect.left;
        const my = (a.y + b.y) / 2 - rect.top;
        if (pinchDistance.current > 0) {
          zoomAt(mx, my, cam.s * (dist / pinchDistance.current));
        }
        pinchDistance.current = dist;
      }
    },
    [applyCamera, zoomAt]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!pointers.current.delete(e.pointerId)) return;
      pinchDistance.current = 0;
      if (pointers.current.size === 0) {
        setPanning(false);
        startInertia();
      }
    },
    [startInertia]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.target !== e.currentTarget) return;
      const container = containerRef.current;
      if (!container) return;
      const cam = camera.current;
      const cx = container.clientWidth / 2;
      const cy = container.clientHeight / 2;

      switch (e.key) {
        case 'ArrowLeft':
          cam.x += KEY_PAN_STEP;
          break;
        case 'ArrowRight':
          cam.x -= KEY_PAN_STEP;
          break;
        case 'ArrowUp':
          cam.y += KEY_PAN_STEP;
          break;
        case 'ArrowDown':
          cam.y -= KEY_PAN_STEP;
          break;
        case '+':
        case '=':
          zoomAt(cx, cy, cam.s * KEY_ZOOM_STEP);
          e.preventDefault();
          return;
        case '-':
        case '_':
          zoomAt(cx, cy, cam.s / KEY_ZOOM_STEP);
          e.preventDefault();
          return;
        case '0':
          cam.s = 1;
          cam.x = cx - TILE_W / 2;
          cam.y = cy - TILE_H / 2;
          break;
        default:
          return;
      }
      e.preventDefault();
      stopAnimation();
      applyCamera();
    },
    [applyCamera, stopAnimation, zoomAt]
  );

  /* Tile copies beyond the canonical one are purely decorative. */
  const echoTiles: [number, number][] = [];
  for (let j = range.j0; j <= range.j1; j++) {
    for (let i = range.i0; i <= range.i1; i++) {
      if (i !== 0 || j !== 0) echoTiles.push([i, j]);
    }
  }

  return (
    <section
      ref={containerRef}
      className={styles.canvas}
      data-panning={panning || undefined}
      role="region"
      aria-label="Archive canvas"
      aria-describedby="archive-canvas-instructions"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      <p id="archive-canvas-instructions" className={styles.srOnly}>
        An endlessly repeating canvas of {placedItems.length} archive images.
        Drag or use arrow keys to pan, pinch or press plus and minus to zoom,
        press zero to reset the view. Press Tab to move through the images.
      </p>

      <div ref={worldRef} className={styles.world}>
        {/* Canonical tile: holds the real, focusable items. */}
        <ul className={styles.tile} role="list" aria-label="Archive images">
          {placedItems.map((item, index) => (
            <li
              key={item.id}
              className={styles.item}
              style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
            >
              <figure
                className={styles.figure}
                role="img"
                tabIndex={0}
                aria-label={`${item.caption} — ${item.folder}. Image ${index + 1} of ${placedItems.length}.`}
                onFocus={() =>
                  centerOnWorldPoint(item.x + item.w / 2, item.y + item.h / 2)
                }
              >
                <span className={styles.placeholder} />
                <figcaption className={styles.caption} aria-hidden="true">
                  {item.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {echoTiles.map(([i, j]) => (
          <div
            key={`${i},${j}`}
            className={styles.tile}
            aria-hidden="true"
            style={{ transform: `translate(${i * TILE_W}px, ${j * TILE_H}px)` }}
          >
            {placedItems.map((item) => (
              <div
                key={item.id}
                className={styles.item}
                style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
              >
                <span className={styles.placeholder} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
