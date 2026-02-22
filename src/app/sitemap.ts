import type { MetadataRoute } from 'next';
import { categories } from '@/components/Archive/data';
import { projects } from '@/data/projects';

const baseUrl = 'https://moshebari.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}${project.url}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const archiveCategoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/archive/${category.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...archiveCategoryRoutes];
}
