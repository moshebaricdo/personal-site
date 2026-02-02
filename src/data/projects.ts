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
    description: 'The design system behind 80M+ students and teachers.',
    url: '/projects/dsco',
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    description: 'Another project with a concise description of the work.',
    url: '/projects/project-two',
  },
  // Add more projects here
];
