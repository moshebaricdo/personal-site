---
name: build-case-study
description: Build case study pages for the portfolio using established components and patterns. Use when creating a new case study, project page, or when the user mentions adding a new project to their portfolio.
---

# Building Case Studies

This skill guides you through creating case study pages for the portfolio using the established component library and design patterns.

## Quick Start

1. Create a new page at `src/app/projects/[slug]/page.tsx`
2. Use the component imports below
3. Follow the narrative structure
4. Add the project to `src/data/projects.ts`

## Component Imports

```tsx
import { Nav } from '@/components/Nav';
import {
  CaseStudyHero,
  Chapter,
  CardStack,
  FigureStack,
  NextCaseStudy,
} from '@/components/CaseStudy';
import styles from '@/components/CaseStudy/CaseStudy.module.css';
```

## Page Template

```tsx
export default function [ProjectName]CaseStudy() {
  return (
    <main className="container">
      <Nav />

      <CaseStudyHero
        title="Compelling headline with impact metric"
        hook="One sentence expanding on the title with context."
        meta={{
          role: 'Your Role',
          timeline: 'YYYY–YYYY',
          scope: 'Key areas of work',
        }}
      />

      <div className={styles.heroSeparator} />

      {/* Context */}
      <Chapter title="Context" className={styles.firstSection}>
        <div className={styles.prose}>
          <p>Background and problem statement...</p>
        </div>
      </Chapter>

      {/* Approach - use CardStack for multiple approaches */}
      <CardStack
        title="Approach"
        cards={[
          { title: 'Approach 1', body: 'Description...' },
          { title: 'Approach 2', body: 'Description...' },
        ]}
      />

      {/* Impact */}
      <Chapter title="Impact">
        <div className={styles.prose}>
          <p>Metrics and outcomes...</p>
        </div>
      </Chapter>

      {/* Work - use FigureStack for visual artifacts */}
      <FigureStack
        title="Work"
        figures={[
          { caption: 'Description of artifact 1' },
          { caption: 'Description of artifact 2' },
        ]}
      />

      {/* Learnings */}
      <Chapter title="Learnings">
        <div className={styles.prose}>
          <ul>
            <li>Key learning 1</li>
            <li>Key learning 2</li>
          </ul>
        </div>
      </Chapter>

      <div className={styles.separator} />

      <NextCaseStudy
        title="Next Project Title"
        description="Brief description of the next case study."
        href="/projects/next-project-slug"
      />

      <div className={styles.pageBottom} />
    </main>
  );
}
```

## Narrative Structure

| Section | Purpose | Component |
|---------|---------|-----------|
| **Context** | Problem statement, background | `Chapter` with prose |
| **Approach** | How you tackled it (3-4 cards) | `CardStack` |
| **Impact** | Metrics, outcomes, results | `Chapter` with prose |
| **Work** | Visual artifacts, screenshots | `FigureStack` |
| **Learnings** | Key takeaways (2-3 bullets) | `Chapter` with prose |

## Component Reference

### CaseStudyHero
Main header with title, hook, and metadata.

```tsx
<CaseStudyHero
  title="string"      // Compelling headline
  hook="string"       // Expanded context (1 sentence)
  meta={{
    role: 'string',
    timeline: 'string',
    scope: 'string',
  }}
/>
```

### Chapter
Generic section wrapper with title.

```tsx
<Chapter title="Section Title" className={styles.firstSection}>
  <div className={styles.prose}>
    {/* Content */}
  </div>
</Chapter>
```

**Note**: Use `className={styles.firstSection}` only on the first chapter after the hero separator.

### CardStack
Interactive overlapping cards with keyboard navigation.

```tsx
<CardStack
  title="Section Title"
  cards={[
    { title: 'Card Title', body: 'Card content...' },
    // Add 3-4 cards
  ]}
/>
```

### FigureStack
Interactive overlapping images with captions.

```tsx
<FigureStack
  title="Section Title"
  figures={[
    { caption: 'Image caption', aspectRatio: '16/9' },
    // aspectRatio options: '16/9' | '4/3' | '3/2' | '1/1'
  ]}
/>
```

**Note**: Replace placeholder images by updating the `FigureStack` component or adding an `src` prop.

### NextCaseStudy
Link to the next case study at page bottom.

```tsx
<NextCaseStudy
  title="Project Title"
  description="Brief description"
  href="/projects/slug"
/>
```

## Spacing Classes

| Class | Usage |
|-------|-------|
| `styles.heroSeparator` | Divider after hero (has proper spacing) |
| `styles.separator` | Divider between sections |
| `styles.firstSection` | Add to first chapter after hero separator |
| `styles.prose` | Wrap paragraph/list content |
| `styles.pageBottom` | Bottom padding |

## Adding to Projects List

Update `src/data/projects.ts`:

```typescript
export const projects: Project[] = [
  // ... existing projects
  {
    slug: 'your-project-slug',
    title: 'Project Title',
    description: 'Brief description for homepage list.',
    url: '/projects/your-project-slug',
  },
];
```

## Writing Guidelines

1. **Headlines**: Include impact metrics ("100M+ users", "40% faster")
2. **Context**: 2 paragraphs max, focus on the problem
3. **Approach cards**: 3-4 cards, each with a clear title and 2-3 sentences
4. **Impact**: Lead with metrics, be specific
5. **Learnings**: 2-3 bullet points, actionable insights
6. **Keep it scannable**: Someone should understand the project in 60 seconds

## Checklist

- [ ] Page created at `src/app/projects/[slug]/page.tsx`
- [ ] Project added to `src/data/projects.ts`
- [ ] Hero has compelling title with metric
- [ ] Context explains the problem (not the solution)
- [ ] Approach has 3-4 cards
- [ ] Impact includes specific metrics
- [ ] Work has relevant visual artifacts
- [ ] Learnings are actionable insights
- [ ] NextCaseStudy points to correct next project
- [ ] `firstSection` class on first chapter after separator
