// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllEventIds } from '@/lib/eventData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wetnavigator.com';

  // Get all event IDs for dynamic routes
  const eventIds = getAllEventIds();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/top-events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic event routes
  const eventRoutes: MetadataRoute.Sitemap = eventIds.map((id) => ({
    url: `${baseUrl}/event/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...eventRoutes];
}
