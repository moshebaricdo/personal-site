'use client';

import { useDetailLevel, type DetailLevel } from './DetailLevelContext';
import styles from './CaseStudy.module.css';

const levels: { level: DetailLevel; title: string; lines: number }[] = [
  { level: 'brief', title: 'Brief', lines: 1 },
  { level: 'standard', title: 'Standard', lines: 2 },
  { level: 'detailed', title: 'Detailed', lines: 3 },
];

const LINE_WIDTH = 14;
const LINE_HEIGHT = 1.5;
const LINE_GAP = 3;
const MAX_LINES = 3;
const SVG_HEIGHT = MAX_LINES * LINE_HEIGHT + (MAX_LINES - 1) * LINE_GAP;

function DensityIcon({ lines }: { lines: number }) {
  return (
    <svg
      width="16"
      height={SVG_HEIGHT}
      viewBox={`0 0 16 ${SVG_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {Array.from({ length: lines }, (_, i) => (
        <rect
          key={i}
          x={(16 - LINE_WIDTH) / 2}
          y={i * (LINE_HEIGHT + LINE_GAP)}
          width={LINE_WIDTH}
          height={LINE_HEIGHT}
          rx={0.75}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

const SEG_LINE_WIDTH = 12;
const SEG_LINE_HEIGHT = 2;
const SEG_LINE_GAP = 2.5;
const SEG_ICON_SIZE = 18;

function SegmentedDensityIcon({ lines }: { lines: number }) {
  const totalHeight = lines * SEG_LINE_HEIGHT + (lines - 1) * SEG_LINE_GAP;
  const startY = (SEG_ICON_SIZE - totalHeight) / 2;

  return (
    <svg
      width={SEG_ICON_SIZE}
      height={SEG_ICON_SIZE}
      viewBox={`0 0 ${SEG_ICON_SIZE} ${SEG_ICON_SIZE}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {Array.from({ length: lines }, (_, i) => (
        <rect
          key={i}
          x={(SEG_ICON_SIZE - SEG_LINE_WIDTH) / 2}
          y={startY + i * (SEG_LINE_HEIGHT + SEG_LINE_GAP)}
          width={SEG_LINE_WIDTH}
          height={SEG_LINE_HEIGHT}
          rx={1}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export function DetailToggle() {
  const { level, setLevel } = useDetailLevel();
  const activeIndex = levels.findIndex(l => l.level === level);

  return (
    <>
      {/* Icon buttons (hidden — preserved for potential reuse) */}
      <div className={styles.detailToggle} role="group" aria-label="Detail level">
        {levels.map(({ level: l, title, lines }) => (
          <button
            key={l}
            className={styles.detailToggleButton}
            data-active={level === l || undefined}
            onClick={() => setLevel(l)}
            title={title}
            aria-label={title}
            aria-pressed={level === l}
          >
            <DensityIcon lines={lines} />
          </button>
        ))}
      </div>

      {/* Segmented control */}
      <div
        className={styles.segmentedControl}
        role="group"
        aria-label="Detail level"
      >
        <div
          className={styles.segmentedIndicator}
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {levels.map(({ level: l, title, lines }) => (
          <button
            key={l}
            className={styles.segmentedButton}
            data-active={level === l || undefined}
            onClick={() => setLevel(l)}
            title={title}
            aria-label={title}
            aria-pressed={level === l}
          >
            <SegmentedDensityIcon lines={lines} />
          </button>
        ))}
      </div>
    </>
  );
}
