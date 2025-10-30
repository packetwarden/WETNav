// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllEventIds } from '@/lib/eventData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wetnav.patelhari.com';
  const lastUpdate = new Date('2025-01-30'); // Update this date when content changes

  // Get all event IDs for dynamic routes
  const eventIds = getAllEventIds();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastUpdate,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/top-events`,
      lastModified: lastUpdate,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/windows-events`,
      lastModified: lastUpdate,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/guides/sysmon`,
      lastModified: lastUpdate,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/guides/tools`,
      lastModified: lastUpdate,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastUpdate,
      priority: 0.7,
    },
  ];

  // Dynamic event routes - removed changeFrequency as it's deprecated
  const eventRoutes: MetadataRoute.Sitemap = eventIds.map((id) => ({
    url: `${baseUrl}/event/${id}`,
    lastModified: lastUpdate,
    priority: 0.8,
  }));

  return [...staticRoutes, ...eventRoutes];
}
