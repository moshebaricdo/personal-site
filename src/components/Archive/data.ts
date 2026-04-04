export interface ArchiveItem {
  id: number;
  caption: string;
  aspectRatio?: '4/3' | '1/1' | '2/3';
}

export interface ArchiveFolder {
  name: string;
  slug: string;
  items: ArchiveItem[];
}

export const folders: ArchiveFolder[] = [
  {
    name: 'DSCO',
    slug: 'dsco',
    items: [
      { id: 1, caption: 'Component library overview' },
      { id: 2, caption: 'Token system', aspectRatio: '4/3' },
      { id: 3, caption: 'Icon set specimens', aspectRatio: '1/1' },
      { id: 4, caption: 'Color palette exploration' },
      { id: 5, caption: 'Typography scale', aspectRatio: '4/3' },
      { id: 6, caption: 'Button variants' },
      { id: 7, caption: 'Form patterns', aspectRatio: '1/1' },
      { id: 8, caption: 'Dark mode tokens' },
    ],
  },
  {
    name: 'Web Lab',
    slug: 'web-lab',
    items: [
      { id: 9, caption: 'Editor prototype' },
      { id: 10, caption: 'AI assist panel', aspectRatio: '4/3' },
      { id: 11, caption: 'Code completion UI' },
      { id: 12, caption: 'Preview pane', aspectRatio: '1/1' },
      { id: 13, caption: 'Onboarding flow' },
      { id: 14, caption: 'Student workspace', aspectRatio: '4/3' },
    ],
  },
  {
    name: 'Code.org',
    slug: 'code-org',
    items: [
      { id: 15, caption: 'Page builder modules' },
      { id: 16, caption: 'Hero explorations', aspectRatio: '4/3' },
      { id: 17, caption: 'Navigation redesign' },
      { id: 18, caption: 'Mobile responsive views', aspectRatio: '2/3' },
      { id: 19, caption: 'Campaign landing page' },
      { id: 20, caption: 'Illustration system', aspectRatio: '1/1' },
      { id: 21, caption: 'Event page template', aspectRatio: '4/3' },
    ],
  },
  {
    name: 'Explorations',
    slug: 'explorations',
    items: [
      { id: 22, caption: 'Brand guidelines cover' },
      { id: 23, caption: 'Logo lockups', aspectRatio: '4/3' },
      { id: 24, caption: 'Business card design' },
      { id: 25, caption: 'Stationery suite' },
      { id: 26, caption: 'Social templates', aspectRatio: '1/1' },
    ],
  },
  {
    name: 'Print',
    slug: 'print',
    items: [
      { id: 27, caption: 'Event poster' },
      { id: 28, caption: 'Album artwork', aspectRatio: '1/1' },
      { id: 29, caption: 'Magazine spread', aspectRatio: '4/3' },
      { id: 30, caption: 'Exhibition catalog' },
      { id: 31, caption: 'Vinyl sleeve', aspectRatio: '1/1' },
      { id: 32, caption: 'Zine cover' },
    ],
  },
];

export function getFolderBySlug(slug: string): ArchiveFolder | undefined {
  return folders.find((f) => f.slug === slug);
}

// Legacy aliases — keeps StackedArchive, Scrapbook, and [category] page compiling
export type CategorySlug = string;
export type CategoryData = ArchiveFolder;
export const categories = folders;
export function getCategoryBySlug(slug: string) {
  return getFolderBySlug(slug);
}
