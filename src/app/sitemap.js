// src/app/sitemap.js
import { client } from '@/sanity/lib/client';

export default async function sitemap() {
  const baseUrl = 'https://freshianjeri.com';

  // Get all artwork slugs from Sanity
  const artworks = await client.fetch(`
    *[_type == "artwork"] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  // Map artworks to sitemap entries
  const artworkUrls = artworks.map((artwork) => ({
    url: `${baseUrl}/artworks/${artwork.slug}`,
    lastModified: new Date(artwork._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/artworks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  return [...routes, ...artworkUrls];
}