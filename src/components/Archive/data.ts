export type CategorySlug = 'brand' | 'product' | 'print';

export interface ArchiveItem {
  id: number;
  caption: string;
  aspectRatio?: '4/3' | '3/2' | '1/1' | '2/3';
}

export interface CategoryData {
  name: string;
  slug: CategorySlug;
  items: ArchiveItem[];
}

export const categories: CategoryData[] = [
  {
    name: 'Brand',
    slug: 'brand',
    items: [
      { id: 1, caption: 'Brand guidelines cover' },
      { id: 2, caption: 'Logo lockups', aspectRatio: '3/2' },
      { id: 3, caption: 'Icon system', aspectRatio: '1/1' },
      { id: 4, caption: 'Color palette exploration' },
      { id: 5, caption: 'Typography specimens', aspectRatio: '3/2' },
      { id: 6, caption: 'Business card design' },
      { id: 7, caption: 'Brand pattern', aspectRatio: '1/1' },
      { id: 8, caption: 'Stationery suite' },
    ],
  },
  {
    name: 'Product',
    slug: 'product',
    items: [
      { id: 9, caption: 'Dashboard overview' },
      { id: 10, caption: 'Onboarding flow', aspectRatio: '3/2' },
      { id: 11, caption: 'Settings panel' },
      { id: 12, caption: 'Profile card', aspectRatio: '1/1' },
      { id: 13, caption: 'Data visualization' },
      { id: 14, caption: 'Mobile navigation', aspectRatio: '3/2' },
      { id: 15, caption: 'Notification center' },
      { id: 16, caption: 'Empty state', aspectRatio: '1/1' },
      { id: 17, caption: 'Search results' },
      { id: 18, caption: 'Detail view', aspectRatio: '3/2' },
      { id: 19, caption: 'Component library' },
      { id: 20, caption: 'Dark mode variant' },
    ],
  },
  {
    name: 'Print',
    slug: 'print',
    items: [
      { id: 21, caption: 'Event poster' },
      { id: 22, caption: 'Album artwork', aspectRatio: '1/1' },
      { id: 23, caption: 'Magazine spread', aspectRatio: '3/2' },
      { id: 24, caption: 'Exhibition catalog' },
      { id: 25, caption: 'Vinyl sleeve', aspectRatio: '1/1' },
      { id: 26, caption: 'Zine cover' },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return categories.find(c => c.slug === slug);
}
