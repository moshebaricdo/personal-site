# Moshe Bari — Portfolio

A minimalist product designer portfolio built with Next.js and vanilla CSS.

## Design Philosophy

This portfolio follows design principles inspired by elite product designers:

- **Restraint over decoration** — Every element earns its place
- **Whitespace is design** — Generous spacing creates focus
- **Color as reward** — Monochrome base with color on interaction
- **One signature interaction** — Quality over quantity

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Vanilla CSS with CSS Modules
- **Animations:** Framer Motion
- **Components:** [Bloom Menu](https://joshpuckett.me/bloom) for iOS-style menus
- **Typography:** Signifier (serif) + System fonts (sans)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page
│   └── work/               # Project case study pages
│       └── [slug]/
├── components/             # React components
│   ├── Hero/               # Profile header
│   ├── Section/            # Content sections
│   ├── ProjectList/        # Work listings
│   ├── SocialLinks/        # Social icons
│   ├── BloomMenu/          # iOS-style menu integration
│   └── icons/              # SVG icon components
├── data/                   # Content data
│   ├── projects.ts         # Project entries
│   └── writing.ts          # Article entries
├── lib/                    # Utility functions
│   └── utils.ts
└── styles/                 # Global styles
    ├── globals.css         # Base styles + imports
    ├── reset.css           # CSS reset
    └── tokens.css          # Design tokens (colors, spacing, etc.)

public/
├── fonts/                  # Custom font files (woff2)
├── images/                 # Image assets
│   ├── avatar.jpg          # Profile photo
│   └── projects/           # Project images by slug
└── videos/                 # Video assets for projects
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Adding Content

### Projects

Edit `src/data/projects.ts`:

```ts
export const projects: Project[] = [
  {
    slug: 'project-name',
    title: 'Project Title',
    description: 'Brief description of the work.',
    url: '/work/project-name',
  },
];
```

### Project Case Studies

Create `src/app/work/[slug]/page.tsx` for detailed case studies.

### Images

1. Add profile photo: `public/images/avatar.jpg`
2. Add project images: `public/images/projects/{slug}/`

## Design System

The design system is documented in `.cursor/rules/`:

- `design-principles.mdc` — Core philosophy
- `typography.mdc` — Font stack, sizes, weights
- `color-system.mdc` — Palette, dark mode
- `spacing-layout.mdc` — Whitespace, containers
- `components.mdc` — Component patterns
- `interactions.mdc` — Hover states, animations

## Integrations

### Bloom Menu

Pre-configured iOS-style menu component:

```tsx
import { BloomMenu, BloomMenuItem } from '@/components/BloomMenu';

<BloomMenu>
  <BloomMenuItem onSelect={() => {}}>Edit</BloomMenuItem>
  <BloomMenuItem onSelect={() => {}}>Share</BloomMenuItem>
</BloomMenu>
```

## License

Private portfolio — not for redistribution.
