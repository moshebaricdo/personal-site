export interface Project {
  slug: string;
  title: string;
  description: string;
  url: string;
  external?: boolean;
  image?: string;
  video?: string;
}

export const projects: Project[] = [
  {
    slug: 'dsco',
    title: 'DSCO',
    description: 'The design system supporting 100M+ students and teachers.',
    url: '/projects/dsco',
  },
  {
    slug: 'web-lab-2',
    title: 'Web Lab 2',
    description: 'An AI-powered IDE for the next generation of coders.',
    url: '/projects/web-lab-2',
  },
  {
    slug: 'code-org-cms',
    title: 'Code.org',
    description: 'Reimagining the marketing site with a modular page builder.',
    url: '/projects/code-org-cms',
  },
];
